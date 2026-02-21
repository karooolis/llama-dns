import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "secondary" | "primary" | "danger" | "ghost";
type ButtonSize = "default" | "sm";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  secondary:
    "border border-white/5 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/20 transition-all duration-300",
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  danger:
    "border border-white/8 text-danger hover:bg-danger/10",
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
  const classes = `inline-block rounded-lg font-medium tracking-tight transition-colors disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`;

  if ("href" in props && props.href != null) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
