interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`h-px w-full bg-white/6 ${className ?? ""}`} />;
}
