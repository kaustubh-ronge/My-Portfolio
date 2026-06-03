"use client";

import { Marquee } from "@/components/motion/marquee";
import { TechIcon } from "@/components/icons/tech-icons";
import { siteConfig } from "@/lib/site-config";

function Pill({ name, icon }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 whitespace-nowrap shadow-sm backdrop-blur transition-colors hover:border-foreground/25 hover:bg-card">
      <TechIcon name={icon} className="size-5" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export function SkillsMarquee() {
  const half = Math.ceil(siteConfig.marquee.length / 2);
  const rowOne = siteConfig.marquee.slice(0, half);
  const rowTwo = siteConfig.marquee.slice(half);

  return (
    <div className="mt-16 flex flex-col gap-4">
      <Marquee duration={38}>
        {rowOne.map((t) => (
          <Pill key={t.name} name={t.name} icon={t.icon} />
        ))}
      </Marquee>
      <Marquee duration={46} reverse>
        {rowTwo.map((t) => (
          <Pill key={t.name} name={t.name} icon={t.icon} />
        ))}
      </Marquee>
    </div>
  );
}
