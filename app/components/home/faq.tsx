"use client";

import { useState } from "react";
import { CaretDown } from "../icons";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const items = [
  {
    q: "Is LlamaDNS really free?",
    a: "Yes. LlamaDNS is 100% free for personal use and Open-source under the MIT license.",
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
    a: "Each account supports up to 5 subdomains.",
  },
  {
    q: "What does LlamaDNS actually do?",
    a: "It points a subdomain (like yourname.llamadns.org) to whatever IP address you choose. Think of it as a friendly, memorable name for your server.",
  },
  {
    q: "Why would I need dynamic DNS?",
    a: "Every time your router reconnects or your cloud server reboots, your IP address can change. Dynamic DNS keeps your domain pointed at the right place automatically, so you don't have to remember a new IP every time.",
  },
  {
    q: "Who's behind this?",
    a: 'Just me, <a href="https://karolisram.com" target="_blank" rel="noopener noreferrer">Karolis</a>, a software engineer who needed a simple dynamic DNS for my home lab and self-hosting experiments, so I built one.',
  },
  {
    q: "Why is it free?",
    a: "Honestly, because building it is fun. I wanted it to exist, and now it does.",
  },
];

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

function FaqItem({ item }: { item: (typeof items)[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`cursor-pointer rounded-lg border bg-white/3 transition-colors duration-200 ${
        isOpen ? "border-white/8 bg-white/5" : "border-white/5 hover:border-white/8"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-[15px] font-medium tracking-tight text-neutral-300"
      >
        {item.q}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: easeOutQuad }}
          className="ml-4 shrink-0"
        >
          <CaretDown width={14} height={14} className="text-neutral-600" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: easeOutQuad }
            }
            className="overflow-hidden"
          >
            <p
              className="px-4 pb-4 text-[13px] leading-relaxed font-light text-neutral-500 [&_a]:text-neutral-300 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:hover:text-white"
              dangerouslySetInnerHTML={{ __html: item.a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-black py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tighter text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {items.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
