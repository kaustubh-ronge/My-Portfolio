import { ExternalLink, ArrowUpRight, ImageOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/social-icons";
import { SanityImage } from "@/components/SanityImage";
import { cn } from "@/lib/utils";

const STATUS = {
  completed: {
    label: "Completed",
    className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  },
  "in-progress": {
    label: "In Progress",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  },
  planned: {
    label: "Planned",
    className: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  },
};

export function ProjectCard({ project }) {
  const status = STATUS[project.projectStatus] ?? STATUS.completed;
  const techs = project.technologies ?? [];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-2xl hover:shadow-black/10">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {project.mainImage?.asset ? (
          <SanityImage
            value={project.mainImage}
            fill
            width={800}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-muted to-muted/40 text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent opacity-60" />
        <Badge
          variant="outline"
          className={cn("absolute top-3 left-3 backdrop-blur", status.className)}
        >
          {status.label}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {techs.slice(0, 4).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-md">
              {t}
            </Badge>
          ))}
          {techs.length > 4 && (
            <Badge variant="outline" className="rounded-md">
              +{techs.length - 4}
            </Badge>
          )}
        </div>

        <div className="mt-5 flex items-center gap-1 border-t border-border/50 pt-4">
          {project.githubUrl && (
            <Button asChild size="sm" variant="ghost" className="gap-1.5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveDemoUrl && (
            <Button asChild size="sm" variant="ghost" className="gap-1.5">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
                Live
              </a>
            </Button>
          )}
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
      </div>
    </div>
  );
}
