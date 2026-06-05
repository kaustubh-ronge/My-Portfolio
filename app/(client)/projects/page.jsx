import { ProjectsBackground } from "@/components/projects/ProjectsBackground";
import { ProjectsHero } from "./_components/ProjectsHero";
import { ProjectsGrid } from "./_components/ProjectsGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

export const metadata = {
  title: "Projects",
  description: "A collection of things I've designed, built and shipped.",
};

async function getProjects() {
  try {
    const { data } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Failed to fetch projects:", error?.message);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <ProjectsBackground />
      <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <ProjectsHero count={projects.length} />
        <div className="mt-12">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </>
  );
}
