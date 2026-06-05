import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsBackground } from "@/components/projects/ProjectsBackground";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

import { ProjectHero } from "./_components/ProjectHero";
import { ProjectOverview } from "./_components/ProjectOverview";
import { ProjectStats } from "./_components/ProjectStats";
import { ProjectTechStack } from "./_components/ProjectTechStack";
import { ProjectGallery } from "./_components/ProjectGallery";

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({ useCdn: false })
      .fetch(PROJECT_SLUGS_QUERY);
    return (slugs ?? []).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const { data } = await sanityFetch({
      query: PROJECT_QUERY,
      params: { slug },
      stega: false,
    });
    if (!data) return { title: "Project not found" };
    return {
      title: data.title,
      description: data.shortDescription,
    };
  } catch {
    return {};
  }
}

async function getProject(slug) {
  try {
    const { data } = await sanityFetch({
      query: PROJECT_QUERY,
      params: { slug },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch project:", error?.message);
    return null;
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const paragraphs = (project.fullDescription || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <ProjectsBackground />

      <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>

        {/* Case-study hero (two-column on desktop) */}
        <div className="mt-8">
          <ProjectHero project={project} />
        </div>

        {/* Overview + sidebar (two-column on desktop, stacks on mobile) */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <ProjectOverview
              paragraphs={paragraphs}
              fallback={project.shortDescription}
            />
          </div>
          <aside className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-24">
              <ProjectStats project={project} />
              <ProjectTechStack technologies={project.technologies} />
            </div>
          </aside>
        </div>

        {/* Gallery (full width) */}
        {project.galleryImages?.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="font-heading text-center text-2xl font-semibold tracking-tight">
                Gallery
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                A closer look at the project.
              </p>
            </Reveal>
            <div className="mt-8">
              <ProjectGallery images={project.galleryImages} />
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center border-t border-border/40 pt-10">
          <Button asChild variant="outline" className="group gap-2">
            <Link href="/projects">
              See more projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
