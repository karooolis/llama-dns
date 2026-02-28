import { GET, POST } from "../route";

const { mockAuth, mockSelectWhere, mockDeleteWhere, mockInsertValues } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockSelectWhere: vi.fn(),
  mockDeleteWhere: vi.fn(),
  mockInsertValues: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  db: {
    select: () => ({ from: () => ({ where: mockSelectWhere }) }),
    delete: () => ({ where: mockDeleteWhere }),
    insert: () => ({ values: mockInsertValues }),
  },
}));

describe("GET /api/token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns existing token", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    const existingToken = { token: "tok-123", userId: "user-1" };
    mockSelectWhere.mockResolvedValueOnce([existingToken]);

    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(existingToken);
  });

  it("auto-creates token if none exists", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockSelectWhere.mockResolvedValueOnce([]); // no existing token

    const newToken = { token: "tok-new", userId: "user-1" };
    mockInsertValues.mockReturnValueOnce({
      returning: () => Promise.resolve([newToken]),
    });

    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(newToken);
  });
});

describe("POST /api/token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when unauthenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);
    const res = await POST();
    expect(res.status).toBe(401);
  });

  it("regenerates token", async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: "user-1" } });
    mockDeleteWhere.mockResolvedValueOnce(undefined);

    const newToken = { token: "tok-regenerated", userId: "user-1" };
    mockInsertValues.mockReturnValueOnce({
      returning: () => Promise.resolve([newToken]),
    });

    const res = await POST();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(newToken);
    expect(mockDeleteWhere).toHaveBeenCalled();
  });
});
