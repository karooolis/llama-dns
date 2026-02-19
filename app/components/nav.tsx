import { auth } from "@/auth";
import { GlobeSimple } from "./icons";
import { NavAuthButtons } from "./nav-auth-buttons";
import { NavUserButtons } from "./nav-user-buttons";

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
          <NavUserButtons />
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
