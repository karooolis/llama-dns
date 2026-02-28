import { MAX_DOMAINS, RESERVED_SUBDOMAINS } from "../constants";

describe("constants", () => {
  it("MAX_DOMAINS is 5", () => {
    expect(MAX_DOMAINS).toBe(5);
  });

  it("RESERVED_SUBDOMAINS contains key entries", () => {
    expect(RESERVED_SUBDOMAINS.has("www")).toBe(true);
    expect(RESERVED_SUBDOMAINS.has("api")).toBe(true);
    expect(RESERVED_SUBDOMAINS.has("admin")).toBe(true);
    expect(RESERVED_SUBDOMAINS.has("_dmarc")).toBe(true);
  });

  it("RESERVED_SUBDOMAINS has 33 entries", () => {
    expect(RESERVED_SUBDOMAINS.size).toBe(33);
  });

  it("RESERVED_SUBDOMAINS does not contain arbitrary strings", () => {
    expect(RESERVED_SUBDOMAINS.has("myserver")).toBe(false);
    expect(RESERVED_SUBDOMAINS.has("llamadns")).toBe(false);
    expect(RESERVED_SUBDOMAINS.has("random")).toBe(false);
  });
});
