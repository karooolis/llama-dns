import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { domains } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { deleteDnsRecord } from "@/lib/cloudflare";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [domain] = await db
    .select()
    .from(domains)
    .where(and(eq(domains.id, id), eq(domains.userId, session.user.id)));

  if (!domain) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Delete Cloudflare records
  const deletePromises: Promise<void>[] = [];
  if (domain.cloudflareRecordIdA) {
    deletePromises.push(deleteDnsRecord(domain.cloudflareRecordIdA));
  }
  if (domain.cloudflareRecordIdAAAA) {
    deletePromises.push(deleteDnsRecord(domain.cloudflareRecordIdAAAA));
  }
  await Promise.allSettled(deletePromises);

  await db.delete(domains).where(and(eq(domains.id, id), eq(domains.userId, session.user.id)));

  return NextResponse.json({ ok: true });
}
