"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, Rocket, Code2, ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TYPE = {
  Internship: { icon: Briefcase, accent: "from-indigo-500 to-blue-500" },
  "Vocational Training": { icon: GraduationCap, accent: "from-fuchsia-500 to-purple-500" },
  Experience: { icon: Rocket, accent: "from-emerald-500 to-teal-500" },
};

export function ExperienceClient({ items }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show only 2 items by default, unless expanded
  const visibleItems = isExpanded ? items : items.slice(0, 3);

  return (
    <>
      <StaggerContainer key={isExpanded ? "expanded" : "collapsed"} className="relative mx-auto mt-14 max-w-3xl">
        {/* Timeline line */}
        <div className="absolute top-2 bottom-2 left-4 w-px bg-linear-to-b from-indigo-500 via-fuchsia-500 to-transparent" />

        <div className="space-y-8">
          {visibleItems.map((item) => {
            const meta = TYPE[item.type] ?? {
              icon: Code2,
              accent: "from-slate-500 to-slate-700",
            };
            const Icon = meta.icon;

            return (
              <StaggerItem key={item._id} className="relative pl-14">
                {/* Node */}
                <span
                  className={cn(
                    "absolute top-1 left-4 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-linear-to-br text-white shadow-lg ring-4 ring-background",
                    meta.accent
                  )}
                >
                  <Icon className="size-4" />
                </span>

                {/* Card */}
                <div className="group rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" className="rounded-md">
                      {item.type}
                    </Badge>
                    <span className="text-xs font-medium tracking-wide text-muted-foreground">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-heading mt-3 text-lg font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.org}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {item.highlights?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <Badge key={h} variant="outline" className="rounded-md">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </StaggerContainer>

      {items.length > 2 && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group rounded-full px-6 transition-all hover:bg-primary/15 hover:text-primary"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-2 size-4 transition-transform group-hover:-translate-y-1" />
              </>
            ) : (
              <>
                Show All Experiences <ChevronDown className="ml-2 size-4 transition-transform group-hover:translate-y-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
