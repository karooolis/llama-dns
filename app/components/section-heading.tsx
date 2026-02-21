interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className ?? ""}`}>
      <h2 className="mb-3 text-3xl font-semibold tracking-tighter text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="max-w-md text-sm font-light text-neutral-500">{subtitle}</p>}
    </div>
  );
}
