interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`w-full h-px bg-white/[0.06] ${className ?? ""}`} />;
}
