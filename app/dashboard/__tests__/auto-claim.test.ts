/* eslint-disable react-hooks/rules-of-hooks */
const { mockMutateAsync, mockReplace, mockSearchParams } = vi.hoisted(() => ({
  mockMutateAsync: vi.fn(),
  mockReplace: vi.fn(),
  mockSearchParams: { get: vi.fn() },
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock("@/queries/domains", () => ({
  useAddDomainMutation: () => ({ mutateAsync: mockMutateAsync }),
}));

// Minimal React hooks stubs for non-DOM testing
let effectCallback: (() => void) | null = null;
const refStore = { current: false, __initialized: false };

vi.mock("react", () => ({
  useEffect: (cb: () => void) => {
    effectCallback = cb;
  },
  useRef: (initial: boolean) => {
    if (!refStore.__initialized) {
      refStore.current = initial;
      refStore.__initialized = true;
    }
    return refStore;
  },
  useState: (initial: unknown) => {
    let value = initial;
    return [value, (v: unknown) => { value = v; }];
  },
}));

describe("useAutoClaim", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    effectCallback = null;
    refStore.current = false;
    refStore.__initialized = false;
  });

  async function importAndRun(claimName: string | null, domainsLoaded: boolean) {
    // Reset module cache to get fresh hook state
    vi.resetModules();
    mockSearchParams.get.mockReturnValue(claimName);
    mockMutateAsync.mockResolvedValue({});

    const { useAutoClaim } = await import("../use-auto-claim");
    useAutoClaim(domainsLoaded);

    if (effectCallback) {
      effectCallback();
      // Flush microtasks (for the .then/.catch)
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  it("calls mutateAsync with claim name when domains loaded", async () => {
    await importAndRun("my-project", true);
    expect(mockMutateAsync).toHaveBeenCalledWith("my-project");
  });

  it("replaces URL to /dashboard on success", async () => {
    await importAndRun("my-project", true);
    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });

  it("does not fire when claim param is absent", async () => {
    await importAndRun(null, true);
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("does not fire when domains not yet loaded", async () => {
    await importAndRun("my-project", false);
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("replaces URL on error too", async () => {
    mockMutateAsync.mockRejectedValueOnce(new Error("already taken"));

    vi.resetModules();
    mockSearchParams.get.mockReturnValue("taken");

    const { useAutoClaim } = await import("../use-auto-claim");
    useAutoClaim(true);

    if (effectCallback) {
      effectCallback();
      await new Promise((r) => setTimeout(r, 0));
    }

    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });

  it("does not fire when claim param is empty string", async () => {
    await importAndRun("", true);
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("passes exact claim name to mutateAsync", async () => {
    await importAndRun("my-cool-server", true);
    expect(mockMutateAsync).toHaveBeenCalledWith("my-cool-server");
  });

  it("only fires once (ref guard)", async () => {
    vi.resetModules();
    mockSearchParams.get.mockReturnValue("my-project");
    mockMutateAsync.mockResolvedValue({});

    const { useAutoClaim } = await import("../use-auto-claim");

    // First call
    useAutoClaim(true);
    if (effectCallback) effectCallback();

    // Second call (simulating StrictMode re-render)
    useAutoClaim(true);
    if (effectCallback) effectCallback();

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
  });
});
