import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { db } from "@/lib/db";
import { domains, apiTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Nav, Footer } from "../components";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard - LlamaDNS",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const queryClient = new QueryClient();

  const [userDomains, [token]] = await Promise.all([
    db.select().from(domains).where(eq(domains.userId, session.user.id)),
    db.select().from(apiTokens).where(eq(apiTokens.userId, session.user.id)),
  ]);

  queryClient.setQueryData(["domains"], userDomains);
  if (token) {
    queryClient.setQueryData(["token"], token);
  }

  return (
    <div className="flex min-h-screen flex-col bg-black pt-14">
      <Nav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-16 pb-24">
        <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-white">Dashboard</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <DashboardContent />
          </Suspense>
        </HydrationBoundary>
      </main>
      <div className="h-px w-full bg-white/6" />
      <Footer />
    </div>
  );
}
