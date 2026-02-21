"use client";

import { CheckCircle } from "../icons";
import { motion, useReducedMotion } from "motion/react";
import { ClaimInput } from "./claim-input";
import { Terminal } from "../terminal";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

function CloudflareLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 239 54"
      fill="none"
      role="img"
      aria-label="Cloudflare"
      className={className}
    >
      <g clipPath="url(#cf-clip)">
        <path
          d="M51.027 36.435l.378-1.33c.459-1.573.288-3.038-.477-4.105-.702-.986-1.872-1.564-3.293-1.636L20.727 29.02a.332.332 0 0 1-.276-.226.316.316 0 0 1 .1-.488c.09-.263.35-.47.62-.48l27.15-.343c3.222-.145 6.705-2.776 7.929-5.977l1.548-4.07a.513.513 0 0 0 .063-.343.468.468 0 0 0-.018-.19C56.05 8.954 48.985 3.014 40.553 3.014c-7.775 0-14.38 5.045-16.748 12.053-1.53-1.148-3.482-1.763-5.588-1.555-3.735.37-6.731 3.39-7.1 7.143a7.462 7.462 0 0 0 .207 2.794C5.23 23.63.344 28.649.344 34.807c0 .56.045 1.103.117 1.645a.568.568 0 0 0 .522.453l49.666.009h.018a.567.567 0 0 0 .36-.479Z"
          fill="#F6821F"
        />
        <path
          d="M59.99 17.736c-.251 0-.494.01-.746.018a.347.347 0 0 0-.117.028.378.378 0 0 0-.27.289l-1.062 3.671c-.459 1.574-.288 3.039.477 4.106.702.986 1.872 1.564 3.294 1.636l5.732.344a.33.33 0 0 1 .275.226.317.317 0 0 1-.1.488c-.09.262-.35.47-.62.479l-5.958.344c-3.23.153-6.722 2.776-7.946 5.977l-.432 1.13a.207.207 0 0 0 .28.434h.017l20.492.001a.565.565 0 0 0 .53-.398c.36-1.275.55-2.613.55-4.006 0-8.147-6.588-14.766-14.705-14.766Z"
          fill="#FBAD41"
        />
        <path
          d="M97.309 24.363h3.392v9.323h5.94v2.984H97.31V24.363Z"
          fill="currentColor"
        />
        <path
          d="M110.16 30.55v-.037c0-3.536 2.835-6.402 6.614-6.402 3.781 0 6.58 2.83 6.58 6.366v.036c0 3.536-2.835 6.402-6.615 6.402-3.78 0-6.579-2.83-6.579-6.366Zm9.728 0v-.037c0-1.772-1.277-3.327-3.15-3.327-1.853 0-3.095 1.51-3.095 3.29v.037c0 1.772 1.278 3.328 3.131 3.328 1.873 0 3.114-1.51 3.114-3.291Z"
          fill="currentColor"
        />
        <path
          d="M127.51 31.272V24.363h3.446v6.845c0 1.773.891 2.622 2.259 2.622 1.367 0 2.259-.805 2.259-2.532V24.372h3.446v6.827c0 3.979-2.258 5.715-5.741 5.715-3.483-.018-5.669-1.79-5.669-5.642Z"
          fill="currentColor"
        />
        <path
          d="M144.123 24.363h4.724c4.375 0 6.912 2.532 6.912 6.086v.036c0 3.553-2.574 6.194-6.984 6.194h-4.652V24.363Zm4.779 9.287c2.033 0 3.375-1.121 3.375-3.11v-.037c0-1.971-1.35-3.11-3.375-3.11h-1.386v6.257h1.386Z"
          fill="currentColor"
        />
        <path
          d="M160.689 24.363h9.81v2.984h-6.407v2.098h5.795v2.83h-5.795v4.395h-3.403V24.363Z"
          fill="currentColor"
        />
        <path
          d="M175.225 24.363h3.392v9.323h5.931v2.984h-9.323V24.363Z"
          fill="currentColor"
        />
        <path
          d="M193.429 24.273h3.276l5.219 12.397h-3.645l-.891-2.197h-4.724l-.873 2.197h-3.572l5.21-12.397Zm2.97 7.542l-1.368-3.5-1.386 3.5h2.754Z"
          fill="currentColor"
        />
        <path
          d="M206.289 24.363h5.796c1.871 0 3.168.497 3.987 1.338.719.705 1.088 1.655 1.088 2.867v.036c0 1.88-.999 3.129-2.519 3.78l2.924 4.295h-3.923l-2.467-3.725h-1.493v3.725h-3.393V24.363Zm5.633 5.905c1.152 0 1.82-.561 1.82-1.456v-.036c0-.968-.704-1.456-1.837-1.456h-2.223v2.957h2.223l.017-.009Z"
          fill="currentColor"
        />
        <path
          d="M222.057 24.363h9.853v2.903h-6.488v1.862h5.876v2.686h-5.876v1.953h6.578v2.903h-9.943V24.363Z"
          fill="currentColor"
        />
        <path
          d="M89.875 31.996a3.327 3.327 0 0 1-2.808 1.845c-1.853 0-3.131-1.546-3.131-3.328v-.036c0-1.772 1.241-3.291 3.096-3.291 1.394 0 2.465.868 2.915 2.043h3.582c-.576-2.93-3.132-5.118-6.462-5.118-3.78 0-6.614 2.866-6.614 6.402v.036c0 3.536 2.798 6.366 6.578 6.366 3.231 0 5.76-2.107 6.425-4.929h-3.581v.01Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="cf-clip">
          <rect
            width="231.908"
            height="35.929"
            fill="white"
            transform="translate(0.092 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: easeOutQuad },
  });

  return (
    <section className="pt-24 md:pt-36 pb-16 md:pb-20 bg-black relative overflow-hidden">
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

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-[11px] text-neutral-400 mb-8"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </span>
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
              <ClaimInput />
            </motion.div>

            <motion.div
              {...fadeUp(0.32)}
              className="flex items-center justify-center md:justify-start gap-6 text-[11px] text-neutral-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle className="text-emerald-500/80" />
                Free forever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="text-emerald-500/80" />
                No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="text-emerald-500/80" />
                Open-source
              </span>
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex-1 md:max-w-[45%] mt-12 md:mt-0 text-left"
          >
            <Terminal>
              <div className="space-y-3">
                {/* Command 1 */}
                <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <span className="text-emerald-500/70">$</span>
                    <span className="text-neutral-300">curl</span>{" "}
                    <span className="text-amber-200/80">
                      &quot;{domain}/update?domains=lab&amp;token=sk_...&quot;
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
            </Terminal>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center justify-center gap-3 mt-24 text-sm text-neutral-400"
        >
          Powered by
          <CloudflareLogo className="h-8 ml-0.5 w-auto" />
        </motion.div>
      </div>
    </section>
  );
}
