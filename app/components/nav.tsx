import { auth } from "@/auth";
import { GlobeSimple, GithubLogo } from "./icons";
import { NavAuthButtons } from "./nav-auth-buttons";
import { NavUserButtons } from "./nav-user-buttons";

export async function Nav() {
  const session = await auth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-white/8">
      <div className="max-w-5xl mx-auto h-14 flex items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 group select-none">
          <GlobeSimple className="text-lg text-white/80 group-hover:text-white transition-colors" />
          <span className="font-semibold tracking-tight text-sm text-white/90">
            LlamaDNS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-12 text-[13px] text-neutral-500 absolute left-1/2 -translate-x-1/2">
          <a href="/landing#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="/landing#integrations" className="hover:text-white transition-colors">
            Integrations
          </a>
          <a href="/landing#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a
            href="https://github.com/llamadns"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <GithubLogo className="text-base" />
          </a>
        </div>

        {session?.user ? <NavUserButtons /> : <NavAuthButtons />}
      </div>
    </nav>
  );
}
