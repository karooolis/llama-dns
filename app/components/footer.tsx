import { GlobeSimple, Coffee, GithubLogo, Star } from "./icons";

export function Footer() {
  return (
    <footer className="py-10 bg-[#020202]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-white/5 border border-white/5">
                <GlobeSimple className="text-sm text-white" />
              </div>
              <span className="text-sm font-semibold text-neutral-200 tracking-tight">
                LlamaDNS
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-6 font-light leading-5">
              Open-source dynamic DNS for the modern developer ecosystem.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 flex items-start text-[13px]">
            <div className="flex gap-32 md:pl-28">
              <div className="flex flex-col gap-3">
                <span className="text-neutral-200 font-medium">Product</span>
                <a
                  href="/landing#how-it-works"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  How it works
                </a>
                <a
                  href="/landing#integrations"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  Integrations
                </a>
                <a
                  href="/landing#faq"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-neutral-200 font-medium">Legal</span>
                <a
                  href="/privacy"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-2.5">
              <a
                href="https://github.com/llamadns"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:bg-white/5 hover:border-white/10 transition-all duration-200 bg-white/3 border-white/6 border rounded-md px-3 py-1.5"
              >
                <Star className="text-sm text-amber-400" />
                <span className="text-[11px] hover:text-white transition-colors font-medium text-neutral-400">
                  Star on GitHub
                </span>
              </a>
              <a
                href="https://buymeacoffee.com/karooolis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200 bg-amber-500/10 border-amber-500/20 border rounded-md px-3 py-1.5"
              >
                <Coffee className="text-amber-400 text-xs" />
                <span className="text-[11px] hover:text-white transition-colors font-medium text-neutral-400">
                  Buy me a coffee
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 text-[11px] text-neutral-600">
            <span>&copy; {new Date().getFullYear()} LlamaDNS</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-[11px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
