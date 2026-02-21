import Link from "next/link";
import { auth } from "@/auth";
import { GlobeSimple, GithubLogo } from "./icons";
import { NavAuthButtons } from "./nav-auth-buttons";
import { NavUserButtons } from "./nav-user-buttons";

export async function Nav() {
  const session = await auth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/8 bg-black">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5 select-none">
          <GlobeSimple className="text-lg text-white/80 transition-colors group-hover:text-white" />
          <span className="text-sm font-semibold tracking-tight text-white/90">LlamaDNS</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 text-[13px] text-neutral-500 md:flex">
          <Link href="/#how-it-works" className="transition-colors hover:text-white">
            How it works
          </Link>
          <Link href="/#integrations" className="transition-colors hover:text-white">
            Integrations
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-white">
            FAQ
          </Link>
          <a
            href="https://github.com/llamadns"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <GithubLogo className="text-base" />
          </a>
        </div>

        {session?.user ? <NavUserButtons /> : <NavAuthButtons />}
      </div>
    </nav>
  );
}
