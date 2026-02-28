import { isValidSubdomain } from "./validation";

export type ClaimValidationResult =
  | { valid: true; redirectPath: string }
  | { valid: false; error: string };

export function validateAndBuildClaimRedirect(raw: string): ClaimValidationResult {
  const name = raw.trim().toLowerCase();

  if (!name) {
    return { valid: false, error: "Enter a subdomain name." };
  }

  if (!isValidSubdomain(name)) {
    return { valid: false, error: "Use lowercase letters, numbers, and hyphens. Must not start or end with a hyphen." };
  }

  return { valid: true, redirectPath: `/dashboard?claim=${encodeURIComponent(name)}` };
}
