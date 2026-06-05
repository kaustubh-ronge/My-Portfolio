import { Reveal } from "@/components/motion/reveal";

export function ProjectOverview({ paragraphs = [], fallback }) {
  const content = paragraphs.length
    ? paragraphs
    : fallback
      ? [fallback]
      : [];

  if (!content.length) return null;

  return (
    <Reveal>
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Overview
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
        {content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Reveal>
  );
}
