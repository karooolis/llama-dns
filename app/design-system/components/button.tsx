import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "secondary" | "primary" | "danger" | "ghost";
type ButtonSize = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  secondary:
    "border border-white/5 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/20 transition-all duration-300",
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  danger:
    "border border-white/[0.08] text-danger hover:bg-danger/10",
  ghost:
    "text-neutral-500 hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-3 py-1.5 text-sm",
  sm: "px-3 py-1.5 text-xs",
};

export function Button({
  variant = "secondary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md font-medium tracking-tight transition-colors disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
