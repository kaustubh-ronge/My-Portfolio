"use client";

import { StarsBackgroundDemo } from "@/components/StarsBackground";

/**
 * Ambient page backdrop shared by the project routes. Reuses the same visual
 * language as the Hero (starfield + drifting gradient blobs) so the project
 * pages feel like part of the same system. Fixed and behind all content.
 */
export function ProjectsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <StarsBackgroundDemo />
      <div className="animate-blob absolute -top-32 -left-24 size-112 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="animate-blob absolute top-1/4 -right-24 size-104 rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:3s]" />
      <div className="animate-blob absolute bottom-0 left-1/3 size-96 rounded-full bg-sky-500/20 blur-3xl [animation-delay:6s]" />
    </div>
  );
}
