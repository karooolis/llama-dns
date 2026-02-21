import { GithubLogo, Tag, ArrowsClockwise } from "../icons";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-black py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tighter text-white md:text-4xl">
            How it works
          </h2>
          <p className="text-sm font-light text-neutral-500">
            Get up and running in less than 30 seconds.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Connector Line (Desktop Only) */}
          <div className="absolute top-10 left-0 z-0 hidden h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />

          <div className="group relative flex flex-col items-center text-center">
            <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-sm transition-colors duration-300 group-hover:border-white/25 group-hover:bg-[#0f0f0f]">
              <GithubLogo className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#151515] font-mono text-[10px] text-neutral-400">
                1
              </div>
            </div>
            <h3 className="mb-2 text-base font-medium tracking-tight text-white">
              Sign in with GitHub
            </h3>
            <p className="max-w-[200px] text-[13px] leading-relaxed font-light text-neutral-500">
              Secure authentication with your existing account.
            </p>
          </div>

          <div className="group relative flex flex-col items-center text-center">
            <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-sm transition-colors duration-300 group-hover:border-white/25 group-hover:bg-[#0f0f0f]">
              <Tag className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#151515] font-mono text-[10px] text-neutral-400">
                2
              </div>
            </div>
            <h3 className="mb-2 text-base font-medium tracking-tight text-white">
              Claim Subdomains
            </h3>
            <p className="max-w-[200px] text-[13px] leading-relaxed font-light text-neutral-500">
              Reserve up to 5 custom hostnames instantly.
            </p>
          </div>

          <div className="group relative flex flex-col items-center text-center">
            <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-sm transition-colors duration-300 group-hover:border-white/25 group-hover:bg-[#0f0f0f]">
              <ArrowsClockwise className="text-2xl text-white opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#151515] font-mono text-[10px] text-neutral-400">
                3
              </div>
            </div>
            <h3 className="mb-2 text-base font-medium tracking-tight text-white">Auto Update</h3>
            <p className="max-w-[200px] text-[13px] leading-relaxed font-light text-neutral-500">
              Sync IPs via simple HTTP GET requests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
