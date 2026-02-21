"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

interface AccordionItemProps {
  trigger: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  trigger,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`rounded-lg border bg-white/3 cursor-pointer transition-colors duration-200 ${
        isOpen
          ? "border-white/8 bg-white/5"
          : "border-white/5 hover:border-white/8"
      } ${className ?? ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-[15px] font-medium text-neutral-300 tracking-tight text-left cursor-pointer"
      >
        {trigger}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: easeOutQuad }
          }
          className="shrink-0 ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width={14}
            height={14}
            fill="currentColor"
            className="text-neutral-600"
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
            }
            animate={{ height: "auto", opacity: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: easeOutQuad }
            }
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-[13px] text-neutral-500 font-light leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
