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

function makeRequest(params: Record<string, string>, headers?: Record<string, string>) {
  const url = new URL("http://localhost/update");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return new NextRequest(url, { headers });
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

  it("routes auto-detected IPv6 to AAAA record", async () => {
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
    mockCreateDns.mockResolvedValueOnce("cf-aaaa-new");

    const res = await GET(
      makeRequest(
        { token: "tok-1", domains: "myserver" },
        { "x-forwarded-for": "2001:db8::1" },
      ),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "AAAA", "2001:db8::1");
    expect(mockCreateDns).not.toHaveBeenCalledWith("myserver", "A", expect.anything());
  });

  it("routes auto-detected IPv4 to A record", async () => {
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
    mockCreateDns.mockResolvedValueOnce("cf-a-new");

    const res = await GET(
      makeRequest(
        { token: "tok-1", domains: "myserver" },
        { "x-forwarded-for": "203.0.113.42" },
      ),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "A", "203.0.113.42");
  });

  it("returns 400 when no IP can be determined", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver" }),
    );
    expect(res.status).toBe(400);
    expect(await res.text()).toMatch(/could not determine IP/);
  });

  it("prefers cf-connecting-ip over x-forwarded-for", async () => {
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
      makeRequest(
        { token: "tok-1", domains: "myserver" },
        { "cf-connecting-ip": "10.0.0.1", "x-forwarded-for": "10.0.0.2" },
      ),
    );
    expect(res.status).toBe(200);
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "A", "10.0.0.1");
  });

  it("explicit ip param overrides auto-detected IP", async () => {
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
      makeRequest(
        { token: "tok-1", domains: "myserver", ip: "5.5.5.5" },
        { "x-forwarded-for": "10.0.0.2" },
      ),
    );
    expect(res.status).toBe(200);
    expect(mockCreateDns).toHaveBeenCalledWith("myserver", "A", "5.5.5.5");
  });

  it("updates existing AAAA record when IPv6 changes", async () => {
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
    mockUpdateDns.mockResolvedValueOnce(undefined);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "1.2.3.4", ipv6: "::2" }),
    );
    expect(res.status).toBe(200);
    expect(mockUpdateDns).toHaveBeenCalledWith("cf-aaaa", "myserver", "AAAA", "::2");
    expect(mockUpdateDns).not.toHaveBeenCalledWith("cf-a", expect.anything(), expect.anything(), expect.anything());
  });

  it("returns verbose CLEARED output", async () => {
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
    mockDeleteDns.mockResolvedValue(undefined);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", clear: "true", verbose: "true" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("myserver CLEARED");
  });

  it("returns verbose ERROR on Cloudflare failure", async () => {
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
    mockCreateDns.mockRejectedValueOnce(new Error("Cloudflare create failed"));

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "1.2.3.4", verbose: "true" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("myserver ERROR Cloudflare create failed");
  });

  it("returns KO (not verbose) on Cloudflare failure", async () => {
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
    mockCreateDns.mockRejectedValueOnce(new Error("Cloudflare create failed"));

    const res = await GET(
      makeRequest({ token: "tok-1", domains: "myserver", ip: "1.2.3.4" }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("KO");
  });

  it("stores correct values in DB on update", async () => {
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
    mockCreateDns.mockResolvedValueOnce("cf-new-a");

    await GET(makeRequest({ token: "tok-1", domains: "myserver", ip: "9.9.9.9" }));

    expect(mockUpdateSet).toHaveBeenCalledWith(
      expect.objectContaining({
        ipv4: "9.9.9.9",
        cloudflareRecordIdA: "cf-new-a",
      }),
    );
  });

  it("stores null IPs in DB on clear", async () => {
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

    await GET(makeRequest({ token: "tok-1", domains: "myserver", clear: "true" }));

    expect(mockUpdateSet).toHaveBeenCalledWith(
      expect.objectContaining({
        ipv4: null,
        ipv6: null,
        cloudflareRecordIdA: null,
        cloudflareRecordIdAAAA: null,
      }),
    );
  });

  it("handles verbose multi-domain with mixed results", async () => {
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
      makeRequest({
        token: "tok-1",
        domains: "server1,unknown",
        ip: "1.2.3.4",
        verbose: "true",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("server1 UPDATED 1.2.3.4\nunknown NOTFOUND");
  });

  it("trims and lowercases domain names", async () => {
    mockTokenWhere.mockResolvedValueOnce([{ token: "tok-1", userId: "user-1" }]);
    mockDomainWhere.mockResolvedValueOnce([]);

    const res = await GET(
      makeRequest({ token: "tok-1", domains: " MyServer ", ip: "1.2.3.4", verbose: "true" }),
    );
    expect(await res.text()).toBe("myserver NOTFOUND");
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
