import { cn } from "@/lib/utils";

/**
 * A light, translucent "glass" surface. Intentionally softer than a solid
 * bordered box so the ambient background bleeds through and the panel reads as
 * part of the page rather than an isolated container.
 */
export function GlassPanel({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
