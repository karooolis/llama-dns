import { Icon } from "@iconify/react";
import { ClaimInputV2 } from "./claim-input-v2";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

export function Hero() {
  return (
    <section className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-400 mb-8">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="font-mono">v2.1</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05] text-white mb-6">
            Free dynamic DNS.
          </h1>

          <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-8 font-light">
            Claim a subdomain, point it at your server, and update it with a
            single HTTP request.
          </p>

          <ClaimInputV2 />

          <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Icon
                icon="solar:check-circle-linear"
                className="text-emerald-500/80"
              />
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Icon
                icon="solar:check-circle-linear"
                className="text-emerald-500/80"
              />
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Icon
                icon="solar:check-circle-linear"
                className="text-emerald-500/80"
              />
              Open source
            </span>
          </div>
        </div>

        {/* Terminal */}
        <div className="max-w-2xl mx-auto mt-12 text-left">
          <div className="rounded-xl border border-white/[0.08] bg-[#050505] shadow-2xl overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                <Icon icon="solar:terminal-linear" className="text-xs" />
                terminal
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-[13px] leading-7 space-y-4">
              {/* Command 1 */}
              <div>
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <span className="text-emerald-500/70">$</span>
                  <span className="text-neutral-300">curl</span>{" "}
                  <span className="text-amber-200/80">
                    &quot;https://{domain}
                    /update?domains=lab&amp;token=sk_...&quot;
                  </span>
                </div>
                <div className="pl-5 text-neutral-500 text-xs">
                  <span className="text-emerald-400/70">
                    {`{"status":"ok"`}
                  </span>
                  <span className="text-neutral-600">,</span>{" "}
                  <span className="text-emerald-400/70">
                    {`"ip":"203.0.113.42"`}
                  </span>
                  <span className="text-neutral-600">,</span>{" "}
                  <span className="text-emerald-400/70">{`"ttl":60}`}</span>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* Command 2 */}
              <div>
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <span className="text-emerald-500/70">$</span>
                  <span className="text-neutral-300">dig</span>{" "}
                  <span className="text-sky-300/70">lab.{domain}</span>{" "}
                  <span className="text-neutral-500">+short</span>
                </div>
                <div className="pl-5 text-neutral-400 text-xs">
                  203.0.113.42
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* Prompt */}
              <div className="flex items-center gap-2 text-neutral-500">
                <span className="text-emerald-500/70">$</span>
                <span className="cursor-blink text-white/60">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
