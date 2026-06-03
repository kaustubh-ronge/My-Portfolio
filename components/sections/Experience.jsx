"use client";

import { Briefcase, GraduationCap, Rocket, Code2 } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import { Badge } from "@/components/ui/badge";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const TYPE = {
  Internship: { icon: Briefcase, accent: "from-indigo-500 to-blue-500" },
  Training: { icon: GraduationCap, accent: "from-fuchsia-500 to-purple-500" },
  Experience: { icon: Rocket, accent: "from-emerald-500 to-teal-500" },
};

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            My <GradientText>journey</GradientText> so far
          </>
        }
        subtitle="Internships, training and hands-on experience that shaped me."
      />

      <StaggerContainer className="relative mx-auto mt-14 max-w-3xl">
        {/* Timeline line */}
        <div className="absolute top-2 bottom-2 left-4 w-px bg-linear-to-b from-indigo-500 via-fuchsia-500 to-transparent" />

        <div className="space-y-8">
          {siteConfig.experience.map((item) => {
            const meta = TYPE[item.type] ?? {
              icon: Code2,
              accent: "from-slate-500 to-slate-700",
            };
            const Icon = meta.icon;

            return (
              <StaggerItem key={`${item.role}-${item.period}`} className="relative pl-14">
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
    </Section>
  );
}
