"use client";

import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "motion/react";
import { ClaimInputV2 } from "./claim-input-v2";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: easeOutQuad },
  });

  return (
    <section className="pt-24 md:pt-36 pb-16 md:pb-24 px-6 bg-black relative overflow-hidden">
      {/* Dot grid background */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOutQuad }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-400 mb-8"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="font-mono">v2.1</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-white mb-6"
            >
              Free dynamic DNS.
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="text-base md:text-lg text-neutral-400 leading-relaxed mb-8 font-light pr-14"
            >
              Claim a subdomain, point it at your server, and update it with a
              single HTTP request.
            </motion.p>

            <motion.div {...fadeUp(0.24)}>
              <ClaimInputV2 />
            </motion.div>

            <motion.div
              {...fadeUp(0.32)}
              className="flex items-center justify-center md:justify-start gap-6 text-[11px] text-neutral-500 font-medium"
            >
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
                Open-source
              </span>
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex-1 md:max-w-[45%] mt-12 md:mt-0 text-left"
          >
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
                </div>
                <div className="w-16" />
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-[12px] leading-6 space-y-3">
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
