"use client";

import { Layout, Server, Database } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ICONS = { Layout, Server, Database };

export function Skills() {
  return (
    <Section id="skills" className="bg-dots">
      <SectionHeading
        eyebrow="Skills"
        title={
          <>
            My <GradientText>technology</GradientText> stack
          </>
        }
        subtitle="The tools and technologies I reach for to bring ideas to life."
      />

      <StaggerContainer className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {siteConfig.skillCategories.map((cat) => {
          const Icon = ICONS[cat.icon] ?? Layout;
          return (
            <StaggerItem key={cat.title} className="group relative h-full">
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-2xl hover:shadow-black/10">
                {/* Hover glow */}
                <div
                  className={cn(
                    "pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-linear-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30",
                    cat.accent
                  )}
                />
                {/* Top accent bar */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 bg-linear-to-r opacity-80",
                    cat.accent
                  )}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    cat.accent
                  )}
                >
                  <Icon className="size-6" />
                </div>

                <h3 className="font-heading mt-4 text-xl font-semibold tracking-tight">
                  {cat.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {cat.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground/90"
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full bg-linear-to-r",
                          cat.accent
                        )}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
