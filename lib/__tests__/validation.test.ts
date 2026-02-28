import { SUBDOMAIN_RE, isValidSubdomain } from "../validation";

describe("SUBDOMAIN_RE", () => {
  it.each(["a", "abc", "my-project", "a1", "123", "a-b-c", "a".repeat(63)])(
    "matches valid subdomain: %s",
    (name) => {
      expect(SUBDOMAIN_RE.test(name)).toBe(true);
    },
  );

  it.each(["", "-abc", "abc-", "-", "ABC", "a_b", "a.b", "a ".repeat(1), "a".repeat(64)])(
    "rejects invalid subdomain: %s",
    (name) => {
      expect(SUBDOMAIN_RE.test(name)).toBe(false);
    },
  );

  it("rejects names with spaces", () => {
    expect(SUBDOMAIN_RE.test("my project")).toBe(false);
  });

  it("rejects names with special characters", () => {
    expect(SUBDOMAIN_RE.test("my@project")).toBe(false);
    expect(SUBDOMAIN_RE.test("my!project")).toBe(false);
    expect(SUBDOMAIN_RE.test("my+project")).toBe(false);
  });

  it("accepts single character names", () => {
    expect(SUBDOMAIN_RE.test("x")).toBe(true);
    expect(SUBDOMAIN_RE.test("5")).toBe(true);
  });

  it("accepts two character names", () => {
    expect(SUBDOMAIN_RE.test("ab")).toBe(true);
    expect(SUBDOMAIN_RE.test("a1")).toBe(true);
  });

  it("rejects double hyphens at start/end but allows in middle", () => {
    expect(SUBDOMAIN_RE.test("a--b")).toBe(true);
    expect(SUBDOMAIN_RE.test("--ab")).toBe(false);
    expect(SUBDOMAIN_RE.test("ab--")).toBe(false);
  });

  it("accepts max length (63 chars)", () => {
    expect(SUBDOMAIN_RE.test("a".repeat(63))).toBe(true);
  });

  it("rejects over max length (64 chars)", () => {
    expect(SUBDOMAIN_RE.test("a".repeat(64))).toBe(false);
  });
});

describe("isValidSubdomain", () => {
  it("returns true for valid, non-reserved names", () => {
    expect(isValidSubdomain("my-project")).toBe(true);
    expect(isValidSubdomain("cool123")).toBe(true);
  });

  it("returns false for invalid format", () => {
    expect(isValidSubdomain("-bad")).toBe(false);
    expect(isValidSubdomain("")).toBe(false);
  });

  it("returns false for reserved names", () => {
    expect(isValidSubdomain("www")).toBe(false);
    expect(isValidSubdomain("api")).toBe(false);
    expect(isValidSubdomain("admin")).toBe(false);
  });

  it("returns false for all reserved subdomains", () => {
    const reserved = ["mail", "smtp", "ftp", "dns", "cdn", "status", "blog", "docs", "_dmarc"];
    for (const name of reserved) {
      expect(isValidSubdomain(name)).toBe(false);
    }
  });

  it("returns true for names that look similar to reserved but aren't", () => {
    expect(isValidSubdomain("www2")).toBe(true);
    expect(isValidSubdomain("my-api")).toBe(true);
    expect(isValidSubdomain("admin2")).toBe(true);
  });
});
