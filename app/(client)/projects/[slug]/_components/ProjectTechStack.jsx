import { Code2 } from "lucide-react";

import { GlassPanel } from "@/components/projects/GlassPanel";
import { TechIcon, techIconKey } from "@/components/icons/tech-icons";
import { Reveal } from "@/components/motion/reveal";

export function ProjectTechStack({ technologies = [] }) {
  if (!technologies.length) return null;

  return (
    <Reveal direction="up" delay={0.05}>
      <GlassPanel className="p-5">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Tech stack
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {technologies.map((t) => {
            const key = techIconKey(t);
            return (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-3 py-1.5 text-sm font-medium"
              >
                {key ? (
                  <TechIcon name={key} className="size-4" />
                ) : (
                  <Code2 className="size-4 text-muted-foreground" />
                )}
                {t}
              </li>
            );
          })}
        </ul>
      </GlassPanel>
    </Reveal>
  );
}
