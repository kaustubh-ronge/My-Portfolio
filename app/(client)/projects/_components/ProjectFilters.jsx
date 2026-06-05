"use client";

import { cn } from "@/lib/utils";

export function ProjectFilters({ options, active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by technology"
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
              isActive
                ? "border-transparent bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20"
                : "border-border/60 bg-card/50 text-muted-foreground backdrop-blur hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
