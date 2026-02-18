import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="py-10 bg-[#020202]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-white/5 border border-white/5">
                <Icon icon="solar:dns-linear" className="text-sm text-white" />
              </div>
              <span className="text-sm font-semibold text-neutral-200 tracking-tight">
                LlamaDNS
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-6 font-light leading-5">
              Open source dynamic DNS for the modern developer ecosystem.
            </p>
            <a
              href="https://buymeacoffee.com/karooolis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200 bg-amber-500/10 border-amber-500/20 border rounded-md pt-1.5 pr-3 pb-1.5 pl-3"
            >
              <Icon
                icon="solar:cup-hot-linear"
                className="text-amber-400 text-xs"
              />
              <span className="text-[11px] hover:text-white transition-colors font-medium text-neutral-400">
                Buy me a coffee
              </span>
            </a>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-8 text-[13px]">
            <div className="flex flex-col gap-3">
              <span className="text-neutral-200 font-medium">Product</span>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                API
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Status
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-neutral-200 font-medium">Resources</span>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Discord
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-neutral-200 font-medium">Legal</span>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 text-[11px] text-neutral-600">
            <span>&copy; {new Date().getFullYear()} LlamaDNS</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems operational
            </span>
            <span className="flex items-center gap-1.5">
              Powered by Cloudflare
            </span>
          </div>
          <div className="flex gap-4 opacity-60">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Icon icon="mdi:github" width={16} />
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Icon icon="mdi:twitter" width={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
