import type { ReactNode } from "react";

interface BentoCardProps {
  size?: "default" | "compact";
  children: ReactNode;
  className?: string;
}

export function BentoCard({
  size = "default",
  children,
  className,
}: BentoCardProps) {
  const sizeClasses =
    size === "compact" ? "rounded-lg p-4" : "rounded-xl p-6";

  return (
    <div className={`bento-card ${sizeClasses} ${className ?? ""}`}>
      {children}
    </div>
  );
}
