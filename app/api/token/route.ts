import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { apiTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [existing] = await db.select().from(apiTokens).where(eq(apiTokens.userId, session.user.id));

  if (!existing) {
    // Auto-create a token on first access
    const [token] = await db.insert(apiTokens).values({ userId: session.user.id }).returning();
    return NextResponse.json(token);
  }

  return NextResponse.json(existing);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delete old token(s)
  await db.delete(apiTokens).where(eq(apiTokens.userId, session.user.id));

  // Create new token
  const [token] = await db.insert(apiTokens).values({ userId: session.user.id }).returning();

  return NextResponse.json(token);
}
