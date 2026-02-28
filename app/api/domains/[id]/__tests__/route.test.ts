import { DELETE } from "../route";

const { mockAuth, mockSelectWhere, mockDeleteWhere, mockDeleteDns } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockSelectWhere: vi.fn(),
  mockDeleteWhere: vi.fn(),
  mockDeleteDns: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  db: {
    select: () => ({ from: () => ({ where: mockSelectWhere }) }),
    delete: () => ({ where: mockDeleteWhere }),
  },
}));

vi.mock("@/lib/cloudflare", () => ({
  deleteDnsRecord: mockDeleteDns,
}));

function makeRequest(id: string) {
  const req = new Request("http://localhost", { method: "DELETE" });
  const params = Promise.resolve({ id });
  return DELETE(req, { params });
}

describe("DELETE /api/domains/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);
    const res = await makeRequest("d-1");
    expect(res.status).toBe(401);
  });

  it("returns 404 when domain not found or not owned", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([]);

    const res = await makeRequest("d-nonexistent");
    expect(res.status).toBe(404);
  });

  it("deletes CF records and DB row on success", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "test",
        userId: "user-1",
        cloudflareRecordIdA: "cf-a",
        cloudflareRecordIdAAAA: "cf-aaaa",
      },
    ]);
    mockDeleteDns.mockResolvedValue(undefined);
    mockDeleteWhere.mockResolvedValueOnce(undefined);

    const res = await makeRequest("d-1");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mockDeleteDns).toHaveBeenCalledWith("cf-a");
    expect(mockDeleteDns).toHaveBeenCalledWith("cf-aaaa");
    expect(mockDeleteWhere).toHaveBeenCalled();
  });

  it("still deletes DB row even if CF delete fails", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([
      {
        id: "d-1",
        name: "test",
        userId: "user-1",
        cloudflareRecordIdA: "cf-a",
        cloudflareRecordIdAAAA: null,
      },
    ]);
    mockDeleteDns.mockRejectedValueOnce(new Error("CF error"));
    mockDeleteWhere.mockResolvedValueOnce(undefined);

    const res = await makeRequest("d-1");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mockDeleteWhere).toHaveBeenCalled();
  });
});
