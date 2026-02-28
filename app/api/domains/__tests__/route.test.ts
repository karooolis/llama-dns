import { GET, POST } from "../route";

const { mockAuth, mockSelectWhere, mockInsert } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockSelectWhere: vi.fn(),
  mockInsert: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  db: {
    select: () => ({ from: () => ({ where: mockSelectWhere }) }),
    insert: mockInsert,
  },
}));

describe("GET /api/domains", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns domains array", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    const mockDomains = [{ id: "d1", name: "test" }];
    mockSelectWhere.mockResolvedValueOnce(mockDomains);

    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mockDomains);
  });
});

describe("POST /api/domains", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "test" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid subdomain name", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "-invalid" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/Invalid subdomain/);
  });

  it("returns 400 for reserved name", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "www" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/reserved/);
  });

  it("returns 400 when max domains reached", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([{}, {}, {}, {}, {}]); // 5 existing

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "newdomain" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/Maximum/);
  });

  it("returns 409 for duplicate name", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([]); // no existing domains

    mockInsert.mockReturnValueOnce({
      values: () => ({
        returning: () => {
          throw new Error("duplicate key value");
        },
      }),
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "taken" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
    expect((await res.json()).error).toMatch(/already taken/);
  });

  it("returns 201 on success", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([]); // no existing domains

    const newDomain = { id: "d-new", name: "myserver", userId: "user-1" };
    mockInsert.mockReturnValueOnce({
      values: () => ({
        returning: () => Promise.resolve([newDomain]),
      }),
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "myserver" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(newDomain);
  });
});
