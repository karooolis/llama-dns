import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { domains } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { MAX_DOMAINS, RESERVED_SUBDOMAINS } from "@/lib/constants";

const SUBDOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userDomains = await db
    .select()
    .from(domains)
    .where(eq(domains.userId, session.user.id));

  return NextResponse.json(userDomains);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = (body.name as string)?.toLowerCase().trim();

  if (!name || !SUBDOMAIN_RE.test(name)) {
    return NextResponse.json(
      { error: "Invalid subdomain. Use lowercase letters, numbers, and hyphens." },
      { status: 400 }
    );
  }

  if (RESERVED_SUBDOMAINS.has(name)) {
    return NextResponse.json(
      { error: `"${name}" is reserved and cannot be claimed.` },
      { status: 400 }
    );
  }

  const existing = await db
    .select()
    .from(domains)
    .where(eq(domains.userId, session.user.id));

  if (existing.length >= MAX_DOMAINS) {
    return NextResponse.json(
      { error: `Maximum of ${MAX_DOMAINS} domains reached.` },
      { status: 400 }
    );
  }

  try {
    const [domain] = await db
      .insert(domains)
      .values({ name, userId: session.user.id })
      .returning();

    return NextResponse.json(domain, { status: 201 });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { error: `"${name}" is already taken.` },
        { status: 409 }
      );
    }
    throw err;
  }
}
