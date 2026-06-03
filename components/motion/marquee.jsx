"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite, seamless horizontal marquee. Renders its children twice and scrolls
 * one full copy width, so the loop has no visible seam. Pauses on hover.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  gap = "2rem",
  className,
}) {
  const trackStyle = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
    gap,
  };
  const groupStyle = { gap };

  return (
    <div
      className={cn(
        "group pause-on-hover mask-fade-x flex w-full overflow-hidden",
        className
      )}
    >
      <div className="flex w-max animate-marquee" style={trackStyle}>
        <div className="flex shrink-0 items-center" style={groupStyle}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={groupStyle}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
