import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
import { NavAuthButtons } from "../components/nav-auth-buttons";
import { ClaimInputV2 } from "./claim-input-v2";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

export default async function Landing2() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group select-none">
            <Icon
              icon="solar:dns-linear"
              className="text-lg text-white/80 group-hover:text-white transition-colors"
            />
            <span className="font-semibold tracking-tight text-sm text-white/90">
              LlamaDNS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[13px] text-neutral-500">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it works
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Docs
            </a>
          </div>

          <NavAuthButtons />
        </div>
      </nav>

      {/* Hero — Split Layout */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-400 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="font-mono">v2.1</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-[1.05] text-white mb-6">
              DNS that keeps up
              <br />
              with your IP.
            </h1>

            <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-10 max-w-md font-light">
              Free dynamic DNS for developers. Claim a subdomain, point it at
              your server, and update it with a single HTTP request.
            </p>

            <ClaimInputV2 />

            <div className="flex items-center gap-6 text-[11px] text-neutral-500 font-medium">
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

          {/* Right: Terminal */}
          <div>
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

      {/* Separator */}
      <div className="max-w-7xl mx-auto h-px rule-fade" />

      {/* Features — Bento Grid */}
      <section id="features" className="py-24 md:py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-3">
              Built for developers.
            </h2>
            <p className="text-neutral-500 text-sm font-light max-w-md">
              Infrastructure primitives that just work. No vendor lock-in, no
              bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* API-first (wide) */}
            <div className="bento-card rounded-xl p-6 md:col-span-2">
              <div className="flex items-start justify-between mb-8">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70">
                  <Icon icon="solar:code-square-linear" width={20} />
                </div>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded">
                  REST
                </span>
              </div>
              <h3 className="text-white font-medium mb-2 tracking-tight">
                API-first design
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-sm font-light">
                Simple REST endpoints. Update DNS records with a GET request —
                works from cron jobs, shell scripts, or any HTTP client.
              </p>
              <div className="mt-6 rounded-lg bg-black/50 border border-white/5 p-4 font-mono text-xs text-neutral-400 overflow-x-auto">
                <span className="text-emerald-500/70">GET</span>{" "}
                <span className="text-neutral-300">/update</span>
                <span className="text-neutral-600">?domains=</span>
                <span className="text-amber-200/80">my-server</span>
                <span className="text-neutral-600">&amp;token=</span>
                <span className="text-neutral-500">sk_...</span>
              </div>
            </div>

            {/* Instant propagation */}
            <div className="bento-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 mb-8">
                <Icon icon="solar:clock-circle-linear" width={20} />
              </div>
              <h3 className="text-white font-medium mb-2 tracking-tight">
                60s propagation
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                Low TTL records mean your IP changes are live globally within a
                minute.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500/40" />
                </div>
                <span className="font-mono text-[11px] text-emerald-500/80">
                  TTL 60s
                </span>
              </div>
            </div>

            {/* SSL */}
            <div className="bento-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 mb-8">
                <Icon icon="solar:lock-keyhole-linear" width={20} />
              </div>
              <h3 className="text-white font-medium mb-2 tracking-tight">
                SSL ready
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                DNS-01 challenge support for Let&apos;s Encrypt. Valid certs for
                your home lab in minutes.
              </p>
            </div>

            {/* GitHub Auth */}
            <div className="bento-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 mb-8">
                <Icon icon="mdi:github" width={20} />
              </div>
              <h3 className="text-white font-medium mb-2 tracking-tight">
                GitHub login
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                Sign in with GitHub. No passwords. Your tokens live in your
                dashboard.
              </p>
            </div>

            {/* Open source */}
            <div className="bento-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 mb-8">
                <Icon icon="solar:star-linear" width={20} />
              </div>
              <h3 className="text-white font-medium mb-2 tracking-tight">
                Open source
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                MIT licensed. Audit the code, self-host, or contribute on
                GitHub.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto h-px rule-fade" />

      {/* How it works */}
      <section id="how-it-works" className="py-32 relative bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-white">
              How it works
            </h2>
            <p className="text-neutral-500 text-sm font-light">
              Get up and running in less than 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

            <div className="group relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-all duration-300">
                <Icon
                  icon="mdi:github"
                  className="text-2xl text-white opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center text-[10px] font-mono text-neutral-400">
                  1
                </div>
              </div>
              <h3 className="text-base font-medium text-white mb-2 tracking-tight">
                Sign in with GitHub
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[200px] font-light">
                Secure authentication with your existing account.
              </p>
            </div>

            <div className="group relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-all duration-300">
                <Icon
                  icon="solar:tag-linear"
                  className="text-2xl text-white opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center text-[10px] font-mono text-neutral-400">
                  2
                </div>
              </div>
              <h3 className="text-base font-medium text-white mb-2 tracking-tight">
                Claim Subdomains
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[200px] font-light">
                Reserve up to 5 custom hostnames instantly.
              </p>
            </div>

            <div className="group relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-all duration-300">
                <Icon
                  icon="solar:refresh-circle-linear"
                  className="text-2xl text-white opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center text-[10px] font-mono text-neutral-400">
                  3
                </div>
              </div>
              <h3 className="text-base font-medium text-white mb-2 tracking-tight">
                Auto Update
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[200px] font-light">
                Sync IPs via simple HTTP GET requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto h-px rule-fade" />

      {/* Docs / Quick Reference */}
      <section id="docs" className="py-24 md:py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Endpoints */}
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

          {/* Right: Example code + compatibility */}
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
              {[
                { icon: "simple-icons:linux", label: "Linux" },
                { icon: "simple-icons:docker", label: "Docker" },
                { icon: "mdi:raspberry-pi", label: "Raspberry Pi" },
                { icon: "mdi:router-wireless", label: "OpenWRT" },
                { icon: "simple-icons:synology", label: "Synology" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-[11px] text-neutral-400 font-medium hover:border-white/10 transition-colors"
                >
                  <Icon icon={item.icon} className="text-sm" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section
        id="integrations"
        className="py-32 border-t border-white/5 bg-black"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
            Integrations
          </h2>
          <p className="text-gray-500 text-sm mb-12">
            Compatible with your favorite tools and operating systems.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:linux"
                className="text-gray-400 text-lg group-hover:text-white transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Linux
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:docker"
                className="text-gray-400 text-lg group-hover:text-blue-400 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Docker
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:raspberry-pi"
                className="text-gray-400 text-lg group-hover:text-red-500 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Raspberry Pi
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="mdi:router-wireless"
                className="text-gray-400 text-lg group-hover:text-emerald-400 transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                OpenWRT
              </span>
            </div>
            <div className="group px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
              <Icon
                icon="simple-icons:synology"
                className="text-gray-400 text-lg group-hover:text-white transition-colors"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Synology
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-7xl mx-auto h-px rule-fade" />

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tighter text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {[
              {
                q: "Is LlamaDNS really free?",
                a: "Yes. LlamaDNS is 100% free for personal use and open source under the MIT license.",
              },
              {
                q: "How fast do changes propagate?",
                a: "DNS records update globally within 60 seconds thanks to low TTL settings.",
              },
              {
                q: "Do you support IPv6?",
                a: "Yes. Full AAAA record support. Update IPv4 and IPv6 addresses independently.",
              },
              {
                q: "How many subdomains can I have?",
                a: "Each account gets up to 5 subdomains on the free tier.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-lg border border-white/5 bg-white/[0.01] open:bg-white/[0.03] hover:border-white/[0.08] transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between p-4 text-[13px] font-medium text-neutral-300 tracking-tight">
                  {item.q}
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width={14}
                    className="text-neutral-600 group-open:rotate-180 transition-transform duration-300"
                  />
                </summary>
                <p className="px-4 pb-4 text-[13px] text-neutral-500 font-light leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="solar:dns-linear" className="text-sm text-white" />
                <span className="text-sm font-semibold text-neutral-200 tracking-tight">
                  LlamaDNS
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light leading-5">
                Open source dynamic DNS for the modern developer.
              </p>
            </div>

            <div className="md:col-span-3 grid grid-cols-3 gap-8 text-[13px]">
              <div className="flex flex-col gap-3">
                <span className="text-neutral-200 font-medium">Product</span>
                <a
                  href="#features"
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
                  href="#docs"
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
            <div className="text-[11px] text-neutral-600">
              &copy; {new Date().getFullYear()} LlamaDNS
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Icon icon="mdi:github" width={16} />
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Icon icon="mdi:twitter" width={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
