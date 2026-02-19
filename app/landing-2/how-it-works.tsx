"use client";

import { GithubLogo, Tag, ArrowsClockwise } from "@phosphor-icons/react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 relative bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-white">
            How it works
          </h2>
          <p className="text-neutral-500 text-sm font-light">
            Get up and running in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          <div className="group relative flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-all duration-300">
              <GithubLogo
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
              <Tag
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
              Reserve unlimited custom hostnames instantly.
            </p>
          </div>

          <div className="group relative flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-all duration-300">
              <ArrowsClockwise
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
  );
}
