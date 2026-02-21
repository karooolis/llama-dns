import type { ComponentType, ReactNode, SVGProps } from "react";

// --- StatusBadge ---

interface StatusBadgeProps {
  children: ReactNode;
  className?: string;
}

export function StatusBadge({ children, className }: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-[11px] text-neutral-400 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

// --- MethodBadge ---

interface MethodBadgeProps {
  method: string;
  color?: "green" | "blue";
  className?: string;
}

const methodColors = {
  green: "bg-emerald-500/10 text-emerald-400/90 border-emerald-500/20",
  blue: "bg-sky-500/10 text-sky-400/90 border-sky-500/20",
} as const;

export function MethodBadge({ method, color = "green", className }: MethodBadgeProps) {
  return (
    <span
      className={`rounded border px-2 py-0.5 font-mono text-[11px] font-medium ${methodColors[color]} ${className ?? ""}`}
    >
      {method}
    </span>
  );
}

// --- IntegrationBadge ---

interface IntegrationBadgeProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
}

export function IntegrationBadge({ icon: Icon, label, className }: IntegrationBadgeProps) {
  return (
    <span
      className={`flex items-center gap-2 rounded-lg border border-white/5 bg-white/2 px-3 py-1.5 text-[11px] font-medium text-neutral-400 transition-colors hover:border-white/10 ${className ?? ""}`}
    >
      <Icon className="text-sm" />
      {label}
    </span>
  );
}
