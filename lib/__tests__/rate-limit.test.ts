import { rateLimit } from "../rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows first request with 29 remaining", () => {
    const result = rateLimit("test-key-1");
    expect(result).toEqual({ ok: true, remaining: 29 });
  });

  it("allows up to 30 requests", () => {
    const key = "test-key-2";
    let result;
    for (let i = 0; i < 30; i++) {
      result = rateLimit(key);
    }
    expect(result).toEqual({ ok: true, remaining: 0 });
  });

  it("blocks 31st request", () => {
    const key = "test-key-3";
    for (let i = 0; i < 30; i++) {
      rateLimit(key);
    }
    const result = rateLimit(key);
    expect(result).toEqual({ ok: false, remaining: 0 });
  });

  it("resets after window expires", () => {
    const key = "test-key-4";
    for (let i = 0; i < 30; i++) {
      rateLimit(key);
    }
    expect(rateLimit(key)).toEqual({ ok: false, remaining: 0 });

    vi.advanceTimersByTime(60_001);

    const result = rateLimit(key);
    expect(result).toEqual({ ok: true, remaining: 29 });
  });

  it("tracks different keys independently", () => {
    for (let i = 0; i < 30; i++) {
      rateLimit("key-a");
    }
    expect(rateLimit("key-a")).toEqual({ ok: false, remaining: 0 });

    const result = rateLimit("key-b");
    expect(result).toEqual({ ok: true, remaining: 29 });
  });
});
