"use client";

import * as React from "react";
import { toast } from "sonner";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import { Reveal } from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/SocialLinks";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";

import { sendEmail } from "@/app/actions/send-email";

function ContactForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl border border-border/60 bg-card/60 px-8 py-12 shadow-xl backdrop-blur-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="ml-1 text-sm font-medium text-foreground/90">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Doe"
            autoComplete="name"
            className="h-12 border-border/50 bg-background/50 px-4 text-base shadow-sm transition-colors focus-visible:bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="ml-1 text-sm font-medium text-foreground/90">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            className="h-12 border-border/50 bg-background/50 px-4 text-base shadow-sm transition-colors focus-visible:bg-background"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="ml-1 text-sm font-medium text-foreground/90">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Let's build something"
          className="h-12 border-border/50 bg-background/50 px-4 text-base shadow-sm transition-colors focus-visible:bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="ml-1 text-sm font-medium text-foreground/90">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about your project, role or idea…"
          className="min-h-35 resize-y border-border/50 bg-background/50 p-4 text-base shadow-sm transition-colors focus-visible:bg-background"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 text-base font-medium text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-linear-to-br group-hover:from-indigo-500 group-hover:to-fuchsia-500 group-hover:text-white">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
    </>
  );

  if (href) {
    const isMail = href.startsWith("mailto");
    return (
      <a
        href={href}
        target={isMail ? undefined : "_blank"}
        rel={isMail ? undefined : "noopener noreferrer"}
        className="group flex items-center gap-3"
      >
        {content}
      </a>
    );
  }
  return <div className="group flex items-center gap-3">{content}</div>;
}

function InfoCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <h3 className="font-heading text-xl font-semibold tracking-tight">
        Open to opportunities
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        I'm currently available — let's connect.
      </p>

      <ul className="mt-5 space-y-2.5">
        {siteConfig.contact.statuses.map((status) => (
          <li key={status} className="flex items-center gap-2.5 text-sm">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
            {status}
          </li>
        ))}
      </ul>

      <Separator className="my-6" />

      <div className="space-y-4">
        <InfoRow icon={MapPin} label="Location" value={siteConfig.location} />
        <InfoRow
          icon={Mail}
          label="Email"
          value={siteConfig.email}
          href={siteConfig.social.email}
        />
        <InfoRow
          icon={GithubIcon}
          label="GitHub"
          value="@kaustubh-ronge"
          href={siteConfig.social.github}
        />
        <InfoRow
          icon={LinkedinIcon}
          label="LinkedIn"
          value="Kaustubh Ronge"
          href={siteConfig.social.linkedin}
        />
      </div>

      <Separator className="my-6" />

      <SocialLinks />
    </div>
  );
}

export function Contact() {
  return (
    <Section id="contact" className="bg-dots">
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Let's <GradientText>work together</GradientText>
          </>
        }
        subtitle="Have a project, role or idea in mind? My inbox is always open."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Reveal direction="left">
          <ContactForm />
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <InfoCard />
        </Reveal>
      </div>
    </Section>
  );
}
