import { format } from "date-fns";

import { GlassPanel } from "@/components/projects/GlassPanel";
import { getStatus } from "@/components/projects/status";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ProjectStats({ project }) {
  const status = getStatus(project.projectStatus);
  const techCount = (project.technologies ?? []).length;
  const galleryCount = (project.galleryImages ?? []).length;

  const rows = [
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", status.dot)} />
          {status.label}
        </span>
      ),
    },
    project.createdAt && {
      label: "Year",
      value: format(new Date(project.createdAt), "yyyy"),
    },
    techCount > 0 && { label: "Technologies", value: techCount },
    galleryCount > 0 && { label: "Screenshots", value: galleryCount },
    { label: "Featured", value: project.featured ? "Yes" : "No" },
  ].filter(Boolean);

  return (
    <Reveal direction="up">
      <GlassPanel className="p-5">
        <h3 className="font-heading text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          At a glance
        </h3>
        <dl className="mt-3 divide-y divide-border/40">
          {rows.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 text-sm"
            >
              <dt className="text-muted-foreground">{r.label}</dt>
              <dd className="font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </GlassPanel>
    </Reveal>
  );
}
