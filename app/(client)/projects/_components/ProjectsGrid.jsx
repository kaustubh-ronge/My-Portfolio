"use client";

import * as React from "react";
import { Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const ALL = "All";
const ITEMS_PER_PAGE = 6;

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
  const [currentPage, setCurrentPage] = React.useState(1);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  const filtered = React.useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => (p.technologies ?? []).includes(active)),
    [active, projects]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
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

      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${currentPage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StaggerContainer
            amount={0.05}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paginatedProjects.map((project) => (
              <StaggerItem key={project._id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No projects match{" "}
          <span className="font-medium text-foreground">{active}</span>.
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="size-9 rounded-full border-border/50 bg-background/50 backdrop-blur transition-all hover:bg-background"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous Page</span>
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="size-9 rounded-full border-border/50 bg-background/50 backdrop-blur transition-all hover:bg-background"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
}
