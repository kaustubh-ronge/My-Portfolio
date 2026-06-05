import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/projects/GlassPanel";
import { GradientText } from "@/components/motion/text-effects";

export function ProjectOverview({ paragraphs = [], fallback }) {
  const content = paragraphs.length
    ? paragraphs
    : fallback
      ? [fallback]
      : [];

  if (!content.length) return null;

  return (
    <Reveal>
      <GlassPanel className="relative p-8 sm:p-10">
        {/* Glow Accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 size-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <h2 className="font-heading text-3xl font-bold tracking-tight">
          Project <GradientText>Overview</GradientText>
        </h2>
        
        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground/90 sm:text-lg sm:leading-loose">
          {content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </GlassPanel>
    </Reveal>
  );
}
