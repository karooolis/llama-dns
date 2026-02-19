import {
  LinuxLogo,
  WifiHigh,
  DockerIcon,
  RaspberryPiIcon,
  SynologyIcon,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

const badges: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }[] = [
  { icon: LinuxLogo, label: "Linux" },
  { icon: DockerIcon, label: "Docker" },
  { icon: RaspberryPiIcon, label: "Raspberry Pi" },
  { icon: WifiHigh, label: "OpenWRT" },
  { icon: SynologyIcon, label: "Synology" },
];

export function Docs() {
  return (
    <section id="docs" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter text-white mb-3">
            Quick reference
          </h2>
          <p className="text-neutral-500 text-sm font-light mb-10">
            The full API in a few lines.
          </p>

          <div className="space-y-4">
            <div className="bento-card rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20">
                  GET
                </span>
                <span className="font-mono text-sm text-neutral-300">
                  /update
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light pl-[52px]">
                Update DNS record to your current IP. Pass{" "}
                <code className="text-neutral-400 bg-white/[0.04] px-1 rounded">
                  domains
                </code>{" "}
                and{" "}
                <code className="text-neutral-400 bg-white/[0.04] px-1 rounded">
                  token
                </code>{" "}
                as query params.
              </p>
            </div>

            <div className="bento-card rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20">
                  GET
                </span>
                <span className="font-mono text-sm text-neutral-300">
                  /update?ip=1.2.3.4
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light pl-[52px]">
                Set a specific IP address instead of auto-detecting from the
                request.
              </p>
            </div>

            <div className="bento-card rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-sky-500/10 text-sky-400/90 border border-sky-500/20">
                  GET
                </span>
                <span className="font-mono text-sm text-neutral-300">
                  /lookup?domain=my-server
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light pl-[52px]">
                Query the current IP for any LlamaDNS subdomain.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-white/[0.08] bg-[#050505] overflow-hidden shadow-xl">
            <div className="flex items-center border-b border-white/5 px-1 bg-white/[0.01]">
              <span className="px-4 py-3 text-[11px] font-medium text-white border-b border-white/30 tracking-wide">
                crontab
              </span>
              <span className="px-4 py-3 text-[11px] font-medium text-neutral-500 tracking-wide">
                Docker
              </span>
              <span className="px-4 py-3 text-[11px] font-medium text-neutral-500 tracking-wide">
                systemd
              </span>
            </div>

            <div className="p-5 font-mono text-[12px] leading-6 overflow-x-auto">
              <div className="text-neutral-600 italic mb-3">
                # Update every 5 minutes
              </div>
              <div className="text-neutral-300">
                <span className="text-amber-200/80">*/5</span>{" "}
                <span className="text-amber-200/80">*</span>{" "}
                <span className="text-amber-200/80">*</span>{" "}
                <span className="text-amber-200/80">*</span>{" "}
                <span className="text-amber-200/80">*</span>{" "}
                <span className="text-purple-400">curl</span> -s{" "}
                <span className="text-emerald-400/80">
                  &quot;https://{domain}/update\
                </span>
              </div>
              <div className="text-emerald-400/80 pl-4">
                ?domains=my-server\
              </div>
              <div className="text-emerald-400/80 pl-4">
                &amp;token=sk_...&quot;
              </div>
              <div className="mt-4 text-neutral-600 italic">
                # That&apos;s it. No daemon, no agent.
              </div>
            </div>
          </div>

          {/* Compatibility badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-[11px] text-neutral-400 font-medium hover:border-white/10 transition-colors"
              >
                <item.icon className="text-sm" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
