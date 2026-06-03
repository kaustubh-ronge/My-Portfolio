import { defineQuery } from "next-sanity";

// Shared image projection (includes LQIP for blur-up placeholders).
const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`;

/**
 * Featured projects for the homepage.
 * Featured = true, newest first, limited to 3.
 */
export const FEATURED_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && featured == true]
  | order(createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    technologies,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    createdAt,
    mainImage { ${imageFragment} }
  }
`);

/** Total number of published projects (for the "View All" affordance). */
export const PROJECTS_COUNT_QUERY = defineQuery(/* groq */ `
  count(*[_type == "project" && defined(slug.current)])
`);
