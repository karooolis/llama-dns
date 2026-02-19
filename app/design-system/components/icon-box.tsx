import type { ReactNode } from "react";

interface IconBoxProps {
  size?: "sm" | "lg";
  children: ReactNode;
  className?: string;
}

export function IconBox({ size = "sm", children, className }: IconBoxProps) {
  if (size === "lg") {
    return (
      <div
        className={`w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-white/25 group-hover:bg-[#0f0f0f] transition-colors duration-300 ${className ?? ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/70 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
