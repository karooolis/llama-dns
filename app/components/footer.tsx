import Link from "next/link";
import { GlobeSimple, Star } from "./icons";

export function Footer() {
  return (
    <footer className="bg-[#020202] py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded border border-white/5 bg-white/5">
                <GlobeSimple className="text-sm text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-neutral-200">
                LlamaDNS
              </span>
            </div>
            <p className="mb-6 text-xs leading-5 font-light text-neutral-500">
              Open-source dynamic DNS for the modern developer ecosystem.
            </p>
          </div>

          <div className="col-span-1 flex items-start text-[13px] md:col-span-3">
            <div className="flex gap-32 md:pl-28">
              <div className="flex flex-col gap-3">
                <span className="font-medium text-neutral-200">Product</span>
                <Link
                  href="/#how-it-works"
                  className="text-neutral-500 transition-colors hover:text-white"
                >
                  How it works
                </Link>
                <Link
                  href="/#integrations"
                  className="text-neutral-500 transition-colors hover:text-white"
                >
                  Integrations
                </Link>
                <Link href="/#faq" className="text-neutral-500 transition-colors hover:text-white">
                  FAQ
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-medium text-neutral-200">Legal</span>
                <Link
                  href="/privacy"
                  className="text-neutral-500 transition-colors hover:text-white"
                >
                  Privacy
                </Link>
                <Link href="/terms" className="text-neutral-500 transition-colors hover:text-white">
                  Terms
                </Link>
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-2.5">
              <a
                href="https://github.com/llamadns"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/6 bg-white/3 px-3 py-1.5 transition-all duration-200 hover:border-white/10 hover:bg-white/5"
              >
                <Star className="text-sm text-amber-400" />
                <span className="text-[11px] font-medium text-neutral-400 transition-colors hover:text-white">
                  Star on GitHub
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <div className="flex items-center gap-4 text-[11px] text-neutral-600">
            <span>&copy; {new Date().getFullYear()} LlamaDNS</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-[11px] text-neutral-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
