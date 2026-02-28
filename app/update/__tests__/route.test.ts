import { NextRequest } from "next/server";
import { GET } from "../route";

const {
  mockTokenWhere,
  mockDomainWhere,
  mockUpdateSet,
  mockCreateDns,
  mockUpdateDns,
  mockDeleteDns,
  mockRateLimit,
  queryCounter,
} = vi.hoisted(() => ({
  mockTokenWhere: vi.fn(),
  mockDomainWhere: vi.fn(),
  mockUpdateSet: vi.fn(),
  mockCreateDns: vi.fn(),
  mockUpdateDns: vi.fn(),
  mockDeleteDns: vi.fn(),
  mockRateLimit: vi.fn(),
  queryCounter: { value: 0 },
}));

vi.mock("@/lib/cloudflare", () => ({
  createDnsRecord: mockCreateDns,
  updateDnsRecord: mockUpdateDns,
  deleteDnsRecord: mockDeleteDns,
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: mockRateLimit,
}));

vi.mock("@/lib/db", () => ({
  db: {
    select: () => ({
      from: () => {
        if (queryCounter.value++ === 0) {
          return { where: mockTokenWhere };
        }
        return { where: mockDomainWhere };
      },
    }),
    update: () => ({
      set: (data: unknown) => {
        mockUpdateSet(data);
        return { where: vi.fn().mockResolvedValue(undefined) };
      },
    }),
  },
}));

function makeRequest(params: Record<string, string>) {
  const url = new URL("http://localhost/update");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return new NextRequest(url);
}

describe("GET /update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryCounter.value = 0;
    mockRateLimit.mockReturnValue({ ok: true, remaining: 29 });
  });

  it("returns 400 when missing token", async () => {
    const res = await GET(makeRequest({ domains: "test" }));
    expect(res.status).toBe(400);
    expect(await res.text()).toMatch(/missing token/);
  });

  it("returns 400 when missing domains", async () => {
    const res = await GET(makeRequest({ token: "tok-1" }));
    expect(res.status).toBe(400);
    expect(await res.text()).toMatch(/missing token or domains/);
  });

  it("returns 401 for invalid token", async () => {
    mockTokenWhere.mockResolvedValueOnce([]);

    const res = await GET(makeRequest({ token: "bad-token", domains: "test" }));
    expect(res.status).toBe(401);
    expect(await res.text()).toMatch(/invalid token/);
  });

  it("returns 429 when rate-limited", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockRateLimit.mockReturnValueOnce({ ok: false, remaining: 0 });

    const res = await GET(makeRequest({ token: "tok-1", domains: "test" }));
    expect(res.status).toBe(429);
    expect(await res.text()).toMatch(/rate limit/);
  });

  it("creates A record for new domain", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: null,
        ipv6: null,
        cloudflareRecordIdA: null,
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockCreateDns.mockResolvedValueOnce("cf-new");

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "1.2.3.4" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "A", "1.2.3.4");
  });

  it("updates existing A record when IP changes", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: "1.1.1.1",
        ipv6: null,
        cloudflareRecordIdA: "cf-existing",
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockUpdateDns.mockResolvedValueOnce(undefined);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "2.2.2.2" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockUpdateDns).toHaveBeenCalledWith("cf-existing", "myserver", "A", "2.2.2.2");
  });

  it("returns OK with no change when IP is the same", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: "1.2.3.4",
        ipv6: null,
        cloudflareRecordIdA: "cf-existing",
        cloudflareRecordIdAAAA: null,
      },
    ]);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "1.2.3.4" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockCreateDns).not.toHaveBeenCalled();
    expect(mockUpdateDns).not.toHaveBeenCalled();
  });

  it("creates AAAA record for IPv6", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: "1.2.3.4",
        ipv6: null,
        cloudflareRecordIdA: "cf-a",
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockCreateDns.mockResolvedValueOnce("cf-aaaa-new");

    const res = await GET(
      makeRequest({
        token: "tok-1",
        domains: "myserver",
        ip: "1.2.3.4",
        ipv6: "::1",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "AAAA", "::1");
  });

  it("deletes records when clear=true", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: "1.2.3.4",
        ipv6: "::1",
        cloudflareRecordIdA: "cf-a",
        cloudflareRecordIdAAAA: "cf-aaaa",
      },
    ]);
    mockDeleteDns.mockResolvedValue(undefined);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", clear: "true" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockDeleteDns).toHaveBeenCalledWith("cf-a");
    expect(mockDeleteDns).toHaveBeenCalledWith("cf-aaaa");
  });

  it("handles multi-domain bulk update", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "server1",
        userId: "user-1",
        ipv4: null,
        ipv6: null,
        cloudflareRecordIdA: null,
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockDomainWhere.mockResolvedValueOnce([]);
    mockCreateDns.mockResolvedValueOnce("cf-1");

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "server1,server2", ip: "1.2.3.4" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK\nKO");
  });

  it("returns verbose output", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: null,
        ipv6: null,
        cloudflareRecordIdA: null,
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockCreateDns.mockResolvedValueOnce("cf-new");

    const res = await GET(
      makeRequest({
        token: "tok-1",
        domains: "myserver",
        ip: "1.2.3.4",
        verbose: "true",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("myserver UPDATED 1.2.3.4");
  });

  it("returns verbose NOCHANGE output", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "myserver",
        userId: "user-1",
        ipv4: "1.2.3.4",
        ipv6: null,
        cloudflareRecordIdA: "cf-a",
        cloudflareRecordIdAAAA: null,
      },
    ]);

    const res = await GET(
      makeRequest({
        token: "tok-1",
        domains: "myserver",
        ip: "1.2.3.4",
        verbose: "true",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("myserver NOCHANGE 1.2.3.4");
  });

  it("returns verbose NOTFOUND for unknown domain", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([]);

    const res = await GET(
      makeRequest({
        token: "tok-1",
        domains: "unknown",
        ip: "1.2.3.4",
        verbose: "true",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("unknown NOTFOUND");
  });
});
