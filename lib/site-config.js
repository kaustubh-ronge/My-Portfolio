/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth for all personal/portfolio content.
 *  Edit the values below to make this portfolio yours. Nothing else needs to
 *  change for the copy, links, skills, experience and contact details.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Kaustubh Ronge",
  firstName: "Kaustubh",
  lastName: "Ronge",
  initials: "KR",
  role: "Full Stack Developer",
  // Words that rotate in the hero headline.
  rotatingRoles: [
    "Full Stack Developer",
    "Next.js Engineer",
    "Problem Solver",
    "UI/UX Enthusiast",
  ],
  // Phrases the hero "builds" — used by the typing effect.
  buildsTyping: [
    "Full Stack Applications",
    "Scalable Web Apps",
    "Delightful Interfaces",
    "Production-ready APIs",
  ],
  location: "India",
  email: "rongekaustubh@gmail.com",
  availability: "Available for work & internships",

  // ── Short copy ────────────────────────────────────────────────────────
  greeting: "Hi, I'm",
  description:
    "I craft fast, accessible and visually polished web experiences — from pixel-perfect interfaces to robust backends. I love turning ideas into products that feel effortless to use.",

  // ── Social / external links ─────────────────────────────────────────────
  // 👉 Replace these with your own URLs. Put your resume PDF in /public.
  social: {
    github: "https://github.com/kaustubh-ronge",
    linkedin: "https://www.linkedin.com/in/kaustubh-ronge-ba2733289/",
    twitter: "https://x.com/",
    email: "mailto:rongekaustubh@gmail.com",
    resume: "/resume.pdf",
  },

  // ── Header navigation (anchors to homepage sections) ────────────────────
  // Section links are absolute (/#id) so the shared header works from any
  // route; Projects points to its own page.
  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],

  // ── About section (tabbed content) ──────────────────────────────────────
  about: {
    // shown under the avatar
    title: "Turning caffeine into clean, scalable code.",
    tabs: {
      about: [
        "I'm a full stack developer who enjoys living at the intersection of thoughtful design and solid engineering. I care deeply about the small details that make a product feel premium.",
        "My toolkit centers on the JavaScript/TypeScript ecosystem — React and Next.js on the front, Node and modern databases on the back.",
      ],
      journey: [
        "I started with curiosity about how websites worked and quickly fell down the rabbit hole of building things for the web.",
        "Since then I've shipped projects end-to-end: designing schemas, building APIs, wiring auth, and obsessing over the front-end experience.",
      ],
      interests: [
        "Right now I'm exploring server actions, edge rendering, and animation-driven interfaces.",
        "I'm also fascinated by headless CMS architecture, type-safe data layers, and developer experience tooling.",
      ],
      goals: [
        "Short term: contribute to a high-impact product team and keep sharpening my craft.",
        "Long term: build products used by thousands and mentor other developers along the way.",
      ],
      technical: [
        "I value clean architecture, accessibility, and performance budgets.",
        "I enjoy type-safe end-to-end stacks, reusable component systems, and automating the boring parts.",
      ],
    },
  },

  // ── Skills marquee (infinite carousel) ──────────────────────────────────
  // `icon` keys map to brand icons in components/icons/tech-icons.jsx
  marquee: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Node.js", icon: "node" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Neon DB", icon: "neon" },
    { name: "Supabase", icon: "supabase" },
    { name: "Prisma ORM", icon: "prisma" },
    { name: "Drizzle ORM", icon: "drizzle" },
    { name: "Tailwind", icon: "tailwind" },
    { name: "Java", icon: "java" },
    { name: "Vercel", icon: "vercel" },
    { name: "Sanity CMS", icon: "sanity" },
    { name: "Auth.js", icon: "authjs" },
    { name: "Clerk", icon: "clerk" },
    { name: "Framer Motion", icon: "motion" },
  ],

  // ── Skills / technology cards ───────────────────────────────────────────
  // `icon` here is a lucide icon name resolved in the Skills component.
  skillCategories: [
    {
      title: "Frontend",
      icon: "Layout",
      accent: "from-sky-500 via-cyan-400 to-blue-500",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Responsive UI",
        "Framer Motion",
        "Animate UI",
        "Shadcn UI",
      ],
    },
    {
      title: "Backend",
      icon: "Server",
      accent: "from-emerald-500 via-green-400 to-teal-500",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Server Actions",
        "Prisma & Drizzle ORM",
        "Auth (Clerk & Auth.js)",
      ],
    },
    {
      title: "Database",
      icon: "Database",
      accent: "from-fuchsia-500 via-purple-400 to-violet-500",
      items: [
        "Neon DB",
        "Supabase",
        "MongoDB",
        "Prisma & Drizzle ORM",
        "Database Design",
      ],
    },
  ],

  // ── Experience / training timeline ──────────────────────────────────────
  experience: [
    {
      role: "Software Developer Intern",
      org: "WebVarad Solutions",
      type: "Internship",
      period: "December-1-2025 — April-15-2026",
      description:
        "Building and shipping features across the stack with React, Next.js and Node — from UI components to API endpoints.",
      highlights: ["React & Next.js", "REST APIs", "Server Actions"],
    },
    {
      role: "Vocational Training (Fullstack Developer Trainee)",
      org: "Fourise Software Solutions",
      type: "Vocational Training",
      period: "June-12-2024 — June-26-2024",
      description:
        "Hands-on training in modern full stack development, version control, and deploying production applications.",
      highlights: ["React", "Node JS", "MongoDB"],
    },
    {
      role: "Open Source & Personal Projects",
      org: "Self-driven",
      type: "Experience",
      period: "Ongoing",
      description:
        "Designing and building real-world projects end-to-end — practicing clean architecture, auth, and polished UI/UX.",
      highlights: ["Side projects", "UI/UX", "Problem solving"],
    },
  ],

  // ── Contact info card ───────────────────────────────────────────────────
  contact: {
    statuses: [
      "Open to Work",
      "Open to Internship Opportunities",
      "Open to Collaboration",
    ],
  },

  copyright: `© ${new Date().getFullYear()} Kaustubh Ronge. All rights reserved.`,
};

export default siteConfig;
