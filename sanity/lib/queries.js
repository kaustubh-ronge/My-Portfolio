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

/** All projects for the /projects listing — featured first, then newest. */
export const ALL_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)]
  | order(featured desc, createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    technologies,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    featured,
    createdAt,
    mainImage { ${imageFragment} }
  }
`);

/** Just the slugs — used by generateStaticParams. */
export const PROJECT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

/** A single project by slug for the detail page (full fields + gallery). */
export const PROJECT_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    technologies,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    featured,
    createdAt,
    mainImage { ${imageFragment} },
    galleryImages[]{ _key, ${imageFragment}, caption }
  }
`);
