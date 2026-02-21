import type { ReactNode } from "react";

interface BentoCardProps {
  size?: "default" | "compact";
  hover?: boolean;
  children: ReactNode;
  className?: string;
}

export function BentoCard({
  size = "default",
  hover = true,
  children,
  className,
}: BentoCardProps) {
  const sizeClasses =
    size === "compact" ? "rounded-lg p-4" : "rounded-xl p-6";

  return (
    <div className={`${hover ? "bento-card" : "bento-card-static"} ${sizeClasses} ${className ?? ""}`}>
      {children}
    </div>
  );
}
