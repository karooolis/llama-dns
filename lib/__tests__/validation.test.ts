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
});
