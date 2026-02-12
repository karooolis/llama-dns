import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "./components/sign-in-button";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <main className="max-w-lg text-center">
        <h1 className="mb-2 text-4xl font-bold">LlamaDNS</h1>
        <p className="mb-8 text-lg text-muted">
          Free dynamic DNS for{" "}
          <span className="font-medium text-foreground">llamadns.org</span>.
          Claim a subdomain, update your IP with a simple API call.
        </p>

        <SignInButton />

        <div className="mt-12 space-y-4 text-left text-sm text-muted">
          <div className="rounded-lg border border-border p-4">
            <p className="mb-1 font-medium text-foreground">How it works</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Sign in with GitHub</li>
              <li>Claim up to 5 subdomains</li>
              <li>Update your IP via a simple HTTP GET</li>
            </ol>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="mb-1 font-medium text-foreground">Update API</p>
            <code className="text-xs break-all">
              curl &quot;https://llamadns.org/update?domains=myhost&amp;token=YOUR_TOKEN&quot;
            </code>
          </div>
        </div>
      </main>
    </div>
  );
}
