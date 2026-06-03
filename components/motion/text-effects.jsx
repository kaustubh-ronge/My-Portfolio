"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Multi-color animated gradient text. Pass your own gradient via `className`
 * (e.g. "from-sky-400 via-fuchsia-400 to-amber-300") or use the default.
 */
export function GradientText({ children, className, animate = true, ...props }) {
  return (
    <span
      className={cn(
        "bg-linear-to-r from-indigo-400 via-fuchsia-400 to-sky-400 text-gradient",
        animate && "animate-gradient-x",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Cycles through `words`, swapping with a vertical fade/blur transition.
 */
export function RotatingText({
  words = [],
  interval = 2200,
  className,
  gradient = true,
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  const current = words[index] ?? "";

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom")}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "inline-block whitespace-nowrap",
            gradient &&
              "bg-linear-to-r from-fuchsia-400 via-violet-400 to-sky-400 text-gradient animate-gradient-x",
            className
          )}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Typewriter effect that types a word, holds, deletes, then moves to the next.
 */
export function TypingText({
  words = [],
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  holdTime = 1500,
  gradient = true,
}) {
  const [display, setDisplay] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [phase, setPhase] = React.useState("typing"); // typing | holding | deleting

  React.useEffect(() => {
    if (words.length === 0) return;
    const full = words[wordIndex % words.length];
    let timeout;

    if (phase === "typing") {
      if (display.length < full.length) {
        timeout = setTimeout(
          () => setDisplay(full.slice(0, display.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), holdTime);
      }
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(full.slice(0, display.length - 1)),
          deletingSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, holdTime]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span
        className={cn(
          gradient &&
            "bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 text-gradient animate-gradient-x"
        )}
      >
        {display}
      </span>
      <motion.span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] self-stretch bg-current"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}
