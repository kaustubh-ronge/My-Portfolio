import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

export function ProjectLinks({ githubUrl, liveDemoUrl, className }) {
  if (!githubUrl && !liveDemoUrl) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {liveDemoUrl && (
        <Button
          asChild
          className="gap-2 bg-linear-to-r from-indigo-500 via-fuchsia-500 to-sky-500 bg-size-[200%_auto] text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:bg-position-[100%_center] hover:shadow-fuchsia-500/40"
        >
          <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" />
            Live Demo
          </a>
        </Button>
      )}
      {githubUrl && (
        <Button asChild variant="outline" className="gap-2">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-4" />
            View Code
          </a>
        </Button>
      )}
    </div>
  );
}
