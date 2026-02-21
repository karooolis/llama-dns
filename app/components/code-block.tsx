import type { ReactNode } from "react";

interface CodeBlockProps {
  tabs?: string[];
  activeTab?: number;
  children: ReactNode;
  className?: string;
}

export function CodeBlock({ tabs, activeTab = 0, children, className }: CodeBlockProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/8 bg-[#050505] shadow-2xl ${className ?? ""}`}
    >
      {tabs ? (
        <div className="flex items-center border-b border-white/5 bg-white/1 px-1">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={`px-4 py-3 text-[11px] font-medium tracking-wide ${
                i === activeTab ? "border-b border-white/30 text-white" : "text-neutral-500"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="w-16" />
        </div>
      )}

      <div className="p-4 font-mono text-[12px] leading-6">{children}</div>
    </div>
  );
}
