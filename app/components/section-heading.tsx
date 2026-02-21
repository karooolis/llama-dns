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
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-500 text-sm font-light max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}
