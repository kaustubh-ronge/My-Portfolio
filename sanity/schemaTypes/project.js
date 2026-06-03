import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: RocketIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "links", title: "Links" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "One-liner shown on cards and previews.",
      type: "text",
      rows: 2,
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .max(180)
          .warning("Keep it under 180 characters for clean cards."),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      description: "Longer write-up for the future project detail page.",
      type: "text",
      rows: 6,
      group: "content",
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) =>
        rule.min(1).error("Add at least one technology."),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description:
        "Toggle ON to surface this project on the homepage (max 3 latest are shown).",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "projectStatus",
      title: "Project Status",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In Progress", value: "in-progress" },
          { title: "Planned", value: "planned" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      description: "Used as the homepage project card image.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (rule) =>
            rule.required().warning("Alt text improves SEO & accessibility."),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      description:
        "Screenshots for the future project detail page & image carousel.",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      group: "links",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "liveDemoUrl",
      title: "Live Demo URL",
      type: "url",
      group: "links",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Featured first, newest",
      name: "featuredDesc",
      by: [
        { field: "featured", direction: "desc" },
        { field: "createdAt", direction: "desc" },
      ],
    },
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "projectStatus",
      featured: "featured",
      media: "mainImage",
    },
    prepare({ title, status, featured, media }) {
      const flags = [
        featured ? "⭐ Featured" : null,
        status ? status.replace("-", " ") : null,
      ]
        .filter(Boolean)
        .join(" · ");
      return { title, subtitle: flags, media };
    },
  },
});

export default project;
