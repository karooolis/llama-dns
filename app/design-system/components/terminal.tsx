import type { ReactNode } from "react";

interface TerminalProps {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Terminal({ actions, children, className }: TerminalProps) {
  return (
    <div className={`rounded-xl border border-white/[0.08] bg-[#050505] shadow-2xl overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {actions ?? <div className="w-16" />}
      </div>
      <div className="p-4 font-mono text-[12px] leading-6">
        {children}
      </div>
    </div>
  );
}
