import { auth } from "@/auth";
import { GlobeSimple } from "../landing-2/icons";
import { NavAuthButtons } from "./nav-auth-buttons";
import { SignOutButton } from "./sign-out-button";

export async function Nav() {
  const session = await auth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto h-14 flex items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 group select-none">
          <GlobeSimple className="text-lg text-white/80 group-hover:text-white transition-colors" />
          <span className="font-semibold tracking-tight text-sm text-white/90">
            LlamaDNS
          </span>
        </a>

        {session?.user ? (
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-7 w-7 rounded-full"
              />
            )}
            <span className="text-xs text-neutral-500 hidden sm:block">
              {session.user.name}
            </span>
            <SignOutButton />
          </div>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-8 text-[13px] text-neutral-500">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How it works
              </a>
              <a href="#docs" className="hover:text-white transition-colors">
                Docs
              </a>
            </div>
            <NavAuthButtons />
          </>
        )}
      </div>
    </nav>
  );
}
