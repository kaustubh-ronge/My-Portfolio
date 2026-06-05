"use client";

import * as React from "react";
import { Rocket } from "lucide-react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";

const ALL = "All";

function EmptyState() {
  return (
    <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-dashed border-border/60 bg-card/30 p-10 text-center backdrop-blur">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
        <Rocket className="size-6" />
      </div>
      <h2 className="font-heading mt-4 text-lg font-semibold">
        No projects published yet
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Add projects in Sanity Studio and they'll show up here automatically.
      </p>
      <Button asChild variant="outline" className="mt-6">
        <a href="/studio" target="_blank" rel="noopener noreferrer">
          Open Sanity Studio
        </a>
      </Button>
    </div>
  );
}

export function ProjectsGrid({ projects = [] }) {
  const techOptions = React.useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.technologies ?? []).forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const [active, setActive] = React.useState(ALL);

  const filtered = React.useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => (p.technologies ?? []).includes(active)),
    [active, projects]
  );

  if (!projects.length) return <EmptyState />;

  return (
    <div>
      {techOptions.length > 2 && (
        <div className="mb-8">
          <ProjectFilters
            options={techOptions}
            active={active}
            onChange={setActive}
          />
        </div>
      )}

      {/* key re-triggers the stagger reveal when the filter changes */}
      <StaggerContainer
        key={active}
        amount={0.05}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <StaggerItem key={project._id} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No projects match{" "}
          <span className="font-medium text-foreground">{active}</span>.
        </p>
      )}
    </div>
  );
}
