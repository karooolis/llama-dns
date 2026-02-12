import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold">
          LlamaDNS
        </a>
        {session?.user && (
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="text-sm text-muted">{session.user.name}</span>
            <SignOutButton />
          </div>
        )}
      </div>
    </header>
  );
}
