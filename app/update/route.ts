import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiTokens, domains } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createDnsRecord, updateDnsRecord, deleteDnsRecord } from "@/lib/cloudflare";
import { rateLimit } from "@/lib/rate-limit";

function text(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

function getClientIp(request: NextRequest): string | null {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const domainNames = params.get("domains");
  const token = params.get("token");
  const verbose = params.get("verbose") === "true";
  const clear = params.get("clear") === "true";

  if (!token || !domainNames) {
    return text("KO - missing token or domains parameter", 400);
  }

  // Validate token
  const [apiToken] = await db.select().from(apiTokens).where(eq(apiTokens.token, token));

  if (!apiToken) {
    return text("KO - invalid token", 401);
  }

  // Rate limit
  const rl = rateLimit(token);
  if (!rl.ok) {
    return text("KO - rate limit exceeded", 429);
  }

  const ipv4 = clear ? null : (params.get("ip") ?? getClientIp(request));
  const ipv6 = clear ? null : (params.get("ipv6") ?? null);

  if (!clear && !ipv4 && !ipv6) {
    return text("KO - could not determine IP address", 400);
  }

  const names = domainNames.split(",").map((n) => n.trim().toLowerCase());
  const results: string[] = [];

  for (const name of names) {
    // Find domain owned by this token's user
    const [domain] = await db
      .select()
      .from(domains)
      .where(and(eq(domains.name, name), eq(domains.userId, apiToken.userId)));

    if (!domain) {
      results.push(verbose ? `${name} NOTFOUND` : "KO");
      continue;
    }

    try {
      let newRecordIdA = domain.cloudflareRecordIdA;
      let newRecordIdAAAA = domain.cloudflareRecordIdAAAA;

      // Handle A record (IPv4)
      if (clear && domain.cloudflareRecordIdA) {
        await deleteDnsRecord(domain.cloudflareRecordIdA);
        newRecordIdA = null;
      } else if (ipv4 && ipv4 !== domain.ipv4) {
        if (domain.cloudflareRecordIdA) {
          await updateDnsRecord(domain.cloudflareRecordIdA, name, "A", ipv4);
        } else {
          newRecordIdA = await createDnsRecord(name, "A", ipv4);
        }
      }

      // Handle AAAA record (IPv6)
      if (clear && domain.cloudflareRecordIdAAAA) {
        await deleteDnsRecord(domain.cloudflareRecordIdAAAA);
        newRecordIdAAAA = null;
      } else if (ipv6 && ipv6 !== domain.ipv6) {
        if (domain.cloudflareRecordIdAAAA) {
          await updateDnsRecord(domain.cloudflareRecordIdAAAA, name, "AAAA", ipv6);
        } else {
          newRecordIdAAAA = await createDnsRecord(name, "AAAA", ipv6);
        }
      }

      const noChange = !clear && ipv4 === domain.ipv4 && (ipv6 ?? null) === domain.ipv6;

      // Update DB
      await db
        .update(domains)
        .set({
          ipv4: clear ? null : (ipv4 ?? domain.ipv4),
          ipv6: clear ? null : (ipv6 ?? domain.ipv6),
          cloudflareRecordIdA: newRecordIdA,
          cloudflareRecordIdAAAA: newRecordIdAAAA,
          updatedAt: new Date(),
        })
        .where(eq(domains.id, domain.id));

      if (verbose) {
        const status = clear ? "CLEARED" : noChange ? "NOCHANGE" : "UPDATED";
        const ips = [ipv4, ipv6].filter(Boolean).join(",");
        results.push(`${name} ${status}${ips ? ` ${ips}` : ""}`);
      } else {
        results.push("OK");
      }
    } catch (err) {
      results.push(
        verbose ? `${name} ERROR ${err instanceof Error ? err.message : "unknown"}` : "KO",
      );
    }
  }

  return text(results.join("\n"));
}
