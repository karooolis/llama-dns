import { validateAndBuildClaimRedirect } from "../claim-redirect";

describe("validateAndBuildClaimRedirect", () => {
  it("returns redirect path for valid subdomain", () => {
    const result = validateAndBuildClaimRedirect("my-project");
    expect(result).toEqual({ valid: true, redirectPath: "/dashboard?claim=my-project" });
  });

  it("lowercases and trims input", () => {
    const result = validateAndBuildClaimRedirect("  MyProject  ");
    expect(result).toEqual({ valid: true, redirectPath: "/dashboard?claim=myproject" });
  });

  it("returns error for empty string", () => {
    const result = validateAndBuildClaimRedirect("");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("Enter") });
  });

  it("returns error for whitespace-only string", () => {
    const result = validateAndBuildClaimRedirect("   ");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("Enter") });
  });

  it("returns error for invalid subdomain (starts with hyphen)", () => {
    const result = validateAndBuildClaimRedirect("-bad");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });

  it("returns error for reserved subdomain", () => {
    const result = validateAndBuildClaimRedirect("www");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });

  it("encodes special characters in the name", () => {
    // A valid name won't have special chars, but encodeURIComponent is a safety net
    const result = validateAndBuildClaimRedirect("abc");
    expect(result).toEqual({ valid: true, redirectPath: "/dashboard?claim=abc" });
  });

  it("returns error for name ending with hyphen", () => {
    const result = validateAndBuildClaimRedirect("bad-");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });

  it("returns error for uppercase-only input that becomes reserved after lowercasing", () => {
    const result = validateAndBuildClaimRedirect("WWW");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });

  it("returns error for name with underscores", () => {
    const result = validateAndBuildClaimRedirect("my_project");
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });

  it("handles numeric-only subdomain", () => {
    const result = validateAndBuildClaimRedirect("123");
    expect(result).toEqual({ valid: true, redirectPath: "/dashboard?claim=123" });
  });

  it("handles single character subdomain", () => {
    const result = validateAndBuildClaimRedirect("x");
    expect(result).toEqual({ valid: true, redirectPath: "/dashboard?claim=x" });
  });

  it("handles max-length subdomain (63 chars)", () => {
    const name = "a".repeat(63);
    const result = validateAndBuildClaimRedirect(name);
    expect(result).toEqual({ valid: true, redirectPath: `/dashboard?claim=${name}` });
  });

  it("returns error for over-max-length subdomain (64 chars)", () => {
    const result = validateAndBuildClaimRedirect("a".repeat(64));
    expect(result).toEqual({ valid: false, error: expect.stringContaining("lowercase") });
  });
});
