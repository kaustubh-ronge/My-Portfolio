"use client";

import * as React from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const directionOffset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Reveal a single element when it scrolls into view.
 */
export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.6,
  blur = true,
  once = true,
  amount = 0.3,
  className,
  ...props
}) {
  const Comp = motion[as] ?? motion.div;
  const offset = directionOffset[direction] ?? directionOffset.up;

  return (
    <Comp
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Container that staggers the reveal of its <StaggerItem> children.
 */
export function StaggerContainer({
  children,
  as = "div",
  className,
  delayChildren = 0.08,
  staggerChildren = 0.1,
  once = true,
  amount = 0.2,
  ...props
}) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren } },
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

export function StaggerItem({ children, as = "div", className, ...props }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp className={className} variants={staggerItemVariants} {...props}>
      {children}
    </Comp>
  );
}
