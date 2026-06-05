import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";

export function ProjectsHero({ count = 0 }) {
  return (
    <Reveal>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <div className="mt-6 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur">
          Portfolio
        </span>
        <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          All <GradientText>projects</GradientText>
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          A collection of things I've designed, built and shipped — from full
          stack apps to polished front-end experiments.
        </p>
        {count > 0 && (
          <p className="mt-3 text-sm text-muted-foreground/70">
            {count} {count === 1 ? "project" : "projects"}
          </p>
        )}
      </div>
    </Reveal>
  );
}
