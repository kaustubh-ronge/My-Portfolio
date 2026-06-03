"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      className={cn("rounded-xl", className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )
      ) : (
        <Sun className="size-4 opacity-0" />
      )}
    </Button>
  );
}

export default function HeaderClient({
  nav = siteConfig.nav,
  resume = siteConfig.social.resume,
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(nav[0]?.href);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.replace("#", "")))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-3"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-300",
          scrolled
            ? "h-14 border-border/60 bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-indigo-500 via-fuchsia-500 to-sky-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition-transform group-hover:scale-105">
            {siteConfig.initials}
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight max-sm:hidden">
            {siteConfig.firstName}
            <span className="text-muted-foreground">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden gap-1.5 bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90 sm:inline-flex"
          >
            <a href={resume} target="_blank" rel="noopener noreferrer" download>
              <Download className="size-4" />
              Resume
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon-sm" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="px-4 pt-4">Navigation</SheetTitle>
              <nav className="mt-2 flex flex-col px-2">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active === item.href
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4 p-4">
                <Button
                  asChild
                  className="w-full gap-1.5 bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
                >
                  <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="size-4" />
                    Download Resume
                  </a>
                </Button>
                <SocialLinks className="justify-center" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
