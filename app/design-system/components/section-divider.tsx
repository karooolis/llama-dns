interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`w-full h-px bg-white/6 ${className ?? ""}`} />;
}
