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
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors duration-300 group-hover:border-white/25 group-hover:bg-[#0f0f0f] ${className ?? ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-white/85 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
