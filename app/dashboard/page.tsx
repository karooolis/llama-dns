import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { domainsQueryOptions } from "@/queries/domains";
import { tokenQueryOptions } from "@/queries/token";
import { Nav } from "../components/nav";
import { Footer } from "../landing-2/footer";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(domainsQueryOptions()),
    queryClient.prefetchQuery(tokenQueryOptions()),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-black pt-14">
      <Nav />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-white">Dashboard</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardContent />
        </HydrationBoundary>
      </main>
      <div className="w-full h-px bg-white/[0.06]" />
      <Footer />
    </div>
  );
}
