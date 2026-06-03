import { cn } from "@/lib/utils";

/**
 * Standard section wrapper: gives every homepage section an id (for anchor
 * navigation), consistent vertical rhythm and a scroll offset so the fixed
 * header never covers the heading.
 */
export function Section({ id, className, children, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/** Small eyebrow + heading + subtitle block reused across sections. */
export function SectionHeading({ eyebrow, title, subtitle, className }) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground text-pretty sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
