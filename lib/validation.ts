import { RESERVED_SUBDOMAINS } from "./constants";

export const SUBDOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export function isValidSubdomain(name: string): boolean {
  return SUBDOMAIN_RE.test(name) && !RESERVED_SUBDOMAINS.has(name);
}
