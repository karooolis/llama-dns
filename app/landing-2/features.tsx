import { Icon } from "@iconify/react";

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
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

          <div className="bento-card rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 mb-8">
              <Icon icon="solar:star-linear" width={20} />
            </div>
            <h3 className="text-white font-medium mb-2 tracking-tight">
              Open-source
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-light">
              MIT licensed. Audit the code, self-host, or contribute on GitHub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
