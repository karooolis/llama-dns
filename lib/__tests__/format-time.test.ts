import { timeAgo } from "../format-time";

describe("timeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for less than 60 seconds", () => {
    const date = new Date(Date.now() - 30_000).toISOString();
    expect(timeAgo(date)).toBe("just now");
  });

  it("returns 'just now' for 0 seconds", () => {
    const date = new Date(Date.now()).toISOString();
    expect(timeAgo(date)).toBe("just now");
  });

  it("returns '1m ago' at exactly 60 seconds", () => {
    const date = new Date(Date.now() - 60_000).toISOString();
    expect(timeAgo(date)).toBe("1m ago");
  });

  it("returns minutes for < 60 minutes", () => {
    const date = new Date(Date.now() - 45 * 60_000).toISOString();
    expect(timeAgo(date)).toBe("45m ago");
  });

  it("returns '1h ago' at exactly 60 minutes", () => {
    const date = new Date(Date.now() - 60 * 60_000).toISOString();
    expect(timeAgo(date)).toBe("1h ago");
  });

  it("returns hours for < 24 hours", () => {
    const date = new Date(Date.now() - 5 * 3600_000).toISOString();
    expect(timeAgo(date)).toBe("5h ago");
  });

  it("returns '1d ago' at exactly 24 hours", () => {
    const date = new Date(Date.now() - 24 * 3600_000).toISOString();
    expect(timeAgo(date)).toBe("1d ago");
  });

  it("returns days for < 30 days", () => {
    const date = new Date(Date.now() - 15 * 86400_000).toISOString();
    expect(timeAgo(date)).toBe("15d ago");
  });

  it("returns months for < 12 months", () => {
    const date = new Date(Date.now() - 90 * 86400_000).toISOString();
    expect(timeAgo(date)).toBe("3mo ago");
  });

  it("returns years for >= 12 months", () => {
    const date = new Date(Date.now() - 400 * 86400_000).toISOString();
    expect(timeAgo(date)).toBe("1y ago");
  });
});
