"use client";

import { motion } from "motion/react";
import { Code2, Sparkles, Rocket } from "lucide-react";

import { Section, SectionHeading } from "./Section";
import { SkillsMarquee } from "./SkillsMarquee";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reveal } from "@/components/motion/reveal";
import { GradientText } from "@/components/motion/text-effects";
import { siteConfig } from "@/lib/site-config";

const TABS = [
  { value: "about", label: "About" },
  { value: "journey", label: "Journey" },
  { value: "interests", label: "Interests" },
  { value: "goals", label: "Goals" },
  { value: "technical", label: "Technical" },
];

function FloatingChip({ className, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="animate-float flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur">
        <Icon className="size-3.5 text-fuchsia-400" />
        {children}
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About me"
        title={
          <>
            A bit <GradientText>about me</GradientText>
          </>
        }
        subtitle="Designer-minded full stack developer who sweats the details."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-14 lg:grid-cols-[auto_1fr] lg:gap-16">
        {/* Left — circular profile */}
        <Reveal direction="left" className="flex justify-center">
          <div className="relative w-fit">
            {/* Rotating glow halo */}
            <div className="animate-spin-slow absolute -inset-4 rounded-full bg-linear-to-tr from-indigo-500 via-fuchsia-500 to-sky-500 opacity-30 blur-2xl" />
            {/* Gradient ring */}
            <div className="relative rounded-full bg-linear-to-br from-indigo-500 via-fuchsia-500 to-sky-500 p-[3px] shadow-2xl shadow-fuchsia-500/20">
              <Avatar className="size-60 border-4 border-background sm:size-72">
                <AvatarImage src="/profile.jpg" alt={siteConfig.name} />
                <AvatarFallback className="bg-card">
                  <GradientText className="font-heading text-6xl font-bold">
                    {siteConfig.initials}
                  </GradientText>
                </AvatarFallback>
              </Avatar>
            </div>

            <FloatingChip
              className="absolute -top-3 -right-3"
              icon={Sparkles}
              delay={0.3}
            >
              UI/UX
            </FloatingChip>
            <FloatingChip
              className="absolute top-1/2 -left-8"
              icon={Code2}
              delay={0.45}
            >
              Full Stack
            </FloatingChip>
            <FloatingChip
              className="absolute -bottom-3 right-4"
              icon={Rocket}
              delay={0.6}
            >
              Fast & Clean
            </FloatingChip>
          </div>
        </Reveal>

        {/* Right — tabs */}
        <Reveal direction="right" delay={0.1}>
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {siteConfig.about.title}
          </h3>

          <Tabs defaultValue="about" className="mt-6 gap-4">
            <div className="max-w-full overflow-x-auto">
              <TabsList variant="line" className="w-max">
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TABS.map((t) => (
              <TabsContent
                key={t.value}
                value={t.value}
                className="space-y-3 text-muted-foreground data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-500"
              >
                {siteConfig.about.tabs[t.value].map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>

      {/* Infinite skills carousel */}
      <div className="mx-auto mt-4 max-w-6xl">
        <p className="text-center text-xs font-medium tracking-widest text-muted-foreground/70 uppercase">
          Technologies I work with
        </p>
        <SkillsMarquee />
      </div>
    </Section>
  );
}
