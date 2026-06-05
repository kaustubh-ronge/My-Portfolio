import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries";

async function getFeaturedProjects() {
  try {
    const { data } = await sanityFetch({ query: FEATURED_PROJECTS_QUERY });
    return data ?? [];
  } catch (error) {
    // Dataset not configured yet / network issue — fail gracefully.
    console.error("Failed to fetch featured projects:", error?.message);
    return [];
  }
}

function EmptyState() {
  return (
    <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center backdrop-blur">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
        <Rocket className="size-6" />
      </div>
      <h3 className="font-heading mt-4 text-lg font-semibold">
        No featured projects yet
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Check back soon! I am currently working on some exciting projects and will be showcasing them here shortly.
      </p>
    </div>
  );
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Featured <GradientText>projects</GradientText>
          </>
        }
        subtitle="A selection of things I've designed, built and shipped."
      />

      {projects.length > 0 ? (
        <>
          <StaggerContainer className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project._id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-12 flex justify-center">
            {/* Prepared to route to /projects once that page is built. */}
            <Button asChild size="lg" variant="outline" className="group gap-2">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </Section>
  );
}
