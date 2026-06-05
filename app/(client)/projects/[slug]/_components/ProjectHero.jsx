import { format } from "date-fns";
import { Calendar, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SanityImage } from "@/components/SanityImage";
import { Reveal } from "@/components/motion/reveal";
import { getStatus } from "@/components/projects/status";
import { ProjectLinks } from "./ProjectLinks";
import { cn } from "@/lib/utils";

export function ProjectHero({ project }) {
  const status = getStatus(project.projectStatus);
  const techs = project.technologies ?? [];
  const hasImage = Boolean(project.mainImage?.asset);

  return (
    <div
      className={cn(
        "grid items-center gap-10",
        hasImage && "lg:grid-cols-2 lg:gap-14"
      )}
    >
      {/* Info */}
      <Reveal direction={hasImage ? "left" : "up"}>
        <div className="flex flex-wrap items-center gap-2">
          {project.featured && (
            <Badge className="gap-1 border-transparent bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white">
              <Star className="size-3" />
              Featured
            </Badge>
          )}
          <Badge variant="outline" className={cn(status.className)}>
            {status.label}
          </Badge>
          {project.createdAt && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {format(new Date(project.createdAt), "MMMM yyyy")}
            </span>
          )}
        </div>

        <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
          {project.shortDescription}
        </p>

        {techs.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {techs.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-md">
                {t}
              </Badge>
            ))}
          </div>
        )}

        <ProjectLinks
          githubUrl={project.githubUrl}
          liveDemoUrl={project.liveDemoUrl}
          className="mt-6"
        />
      </Reveal>

      {/* Image */}
      {hasImage && (
        <Reveal direction="right" delay={0.1} className="relative">
          <div className="pointer-events-none absolute inset-0 mx-auto my-auto size-3/4 rounded-full bg-linear-to-tr from-indigo-500/30 via-fuchsia-500/20 to-sky-500/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="relative aspect-video">
              <SanityImage
                value={project.mainImage}
                fill
                width={1100}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
