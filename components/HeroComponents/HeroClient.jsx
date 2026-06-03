"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Download, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CodeDemo } from "@/components/Code";
import { StarsBackgroundDemo } from "@/components/StarsBackground";
import { GradientText, TypingText } from "@/components/motion/text-effects";
import { SocialLinks } from "@/components/SocialLinks";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function HeroClient() {
  return (
    <>
      {/* Stars backdrop (existing custom component, untouched) */}
      <StarsBackgroundDemo />

      {/* Decorative color blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="animate-blob absolute -top-24 -left-24 size-112 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="animate-blob absolute top-1/3 -right-24 size-104 rounded-full bg-fuchsia-500/20 blur-3xl [animation-delay:3s]" />
        <div className="animate-blob absolute -bottom-32 left-1/3 size-96 rounded-full bg-sky-500/20 blur-3xl [animation-delay:6s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-24">
        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left"
        >
          {/* Availability */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {siteConfig.availability}
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
          >
            <span className="block text-muted-foreground/90 text-2xl font-medium sm:text-3xl">
              {siteConfig.greeting}
            </span>
            <GradientText className="from-indigo-400 via-fuchsia-400 to-sky-400">
              {siteConfig.name}
            </GradientText>
          </motion.h1>

          {/* Typing headline */}
          <motion.div
            variants={item}
            className="font-heading mt-4 flex flex-wrap items-baseline gap-x-3 text-2xl font-semibold tracking-tight sm:text-3xl xl:text-4xl"
          >
            <span>I build</span>
            <TypingText words={siteConfig.buildsTyping} />
          </motion.div>

          {/* Sub headline with gradient keywords */}
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            A{" "}
            <GradientText
              animate={false}
              className="from-sky-400 to-cyan-400 font-semibold"
            >
              Full Stack Developer
            </GradientText>{" "}
            crafting{" "}
            <GradientText
              animate={false}
              className="from-amber-400 to-orange-400 font-semibold"
            >
              fast
            </GradientText>
            ,{" "}
            <GradientText
              animate={false}
              className="from-fuchsia-400 to-pink-400 font-semibold"
            >
              accessible
            </GradientText>{" "}
            &{" "}
            <GradientText
              animate={false}
              className="from-emerald-400 to-teal-400 font-semibold"
            >
              beautiful
            </GradientText>{" "}
            web experiences.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/80"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="group gap-2 bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20 hover:opacity-90"
            >
              <a
                href={siteConfig.social.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>

          {/* Other socials */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span>Find me on</span>
            <SocialLinks size="icon-sm" variant="ghost" only={["twitter", "email"]} />
          </motion.div>
        </motion.div>

        {/* Right — existing code animation */}
        <motion.div
          initial={{ opacity: 0, x: 48, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto my-auto size-[85%] rounded-full bg-linear-to-tr from-indigo-500/30 via-fuchsia-500/20 to-sky-500/30 blur-3xl" />
          <div className="animate-float w-full max-w-md">
            <CodeDemo writing cursor duration={9000} delay={500} />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-muted-foreground/70 hover:text-foreground"
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </>
  );
}
