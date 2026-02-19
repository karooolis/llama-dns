import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";
import { GlobeSimple } from "../landing-2/icons";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-white/[0.08] bg-black/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 font-semibold tracking-tight text-sm text-white/90">
          <GlobeSimple className="h-4 w-4" />
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
            <span className="text-sm text-neutral-500">{session.user.name}</span>
            <SignOutButton />
          </div>
        )}
      </div>
    </header>
  );
}
