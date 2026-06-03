import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiPrisma,
  SiDrizzle,
  SiTailwindcss,
  SiVercel,
  SiSanity,
  SiClerk,
  SiFramer,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { Database, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * key -> { Icon, color }
 * `color: null` means the icon inherits `currentColor` (best for mono brands
 * like Next.js / Vercel / Prisma that must adapt to light & dark themes).
 */
export const techIcons = {
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs, color: null },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress, color: null },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  neon: { Icon: Database, color: "#00E599" },
  supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  prisma: { Icon: SiPrisma, color: null },
  drizzle: { Icon: SiDrizzle, color: "#C5F74F" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  java: { Icon: FaJava, color: "#F89820" },
  vercel: { Icon: SiVercel, color: null },
  sanity: { Icon: SiSanity, color: "#F03E2F" },
  authjs: { Icon: ShieldCheck, color: "#A855F7" },
  clerk: { Icon: SiClerk, color: "#6C47FF" },
  motion: { Icon: SiFramer, color: "#0055FF" },
};

export function TechIcon({ name, className }) {
  const entry = techIcons[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <Icon
      className={cn("size-5 shrink-0", className)}
      style={color ? { color } : undefined}
      aria-hidden="true"
    />
  );
}
