import { ArrowUp, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-card/30">
      {/* Gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-500/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" className="group flex w-fit items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-indigo-500 via-fuchsia-500 to-sky-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25">
                {siteConfig.initials}
              </span>
              <span className="font-heading text-base font-semibold tracking-tight">
                {siteConfig.firstName}
                <span className="text-muted-foreground">.dev</span>
              </span>
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.role} building fast, accessible and delightful web
              experiences.
            </p>
            <SocialLinks size="icon-sm" />
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-sm font-semibold">Navigation</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading text-sm font-semibold">
              Let's build together
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Open to work, internships and collaboration.
            </p>
            <Button
              asChild
              className="mt-4 gap-2 bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
            >
              <a href={siteConfig.social.email}>Get in touch</a>
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {siteConfig.copyright}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Built with <Heart className="size-3 text-fuchsia-500" /> using Next.js
            & Sanity
          </p>
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            aria-label="Back to top"
            className="rounded-xl"
          >
            <a href="#home">
              <ArrowUp className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
