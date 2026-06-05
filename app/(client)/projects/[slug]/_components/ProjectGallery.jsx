"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SanityImage } from "@/components/SanityImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!images.length) return null;
  const multiple = images.length > 1;

  const next = () => setActiveIndex((i) => i + 1);
  const prev = () => setActiveIndex((i) => i - 1);

  const currentDataIndex =
    ((activeIndex % images.length) + images.length) % images.length;

  const handleDotClick = (i) => {
    let diff = i - currentDataIndex;
    // Determine shortest path for dot navigation
    if (diff > images.length / 2) diff -= images.length;
    else if (diff < -images.length / 2) diff += images.length;
    setActiveIndex((prevIdx) => prevIdx + diff);
  };

  // We render a fixed window of 5 items [-2, -1, 0, 1, 2] relative to the active index.
  // This guarantees smooth infinite looping and ensures Prev/Next exist even for 2 images.
  const offsets = multiple ? [-2, -1, 0, 1, 2] : [0];

  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="relative flex h-[350px] items-center justify-center overflow-hidden sm:h-[450px] md:h-[550px]">
        {offsets.map((offset) => {
          const absIndex = activeIndex + offset;
          const dataIndex =
            ((absIndex % images.length) + images.length) % images.length;
          const img = images[dataIndex];

          // Determine animation states based on offset
          let x = "0%";
          let scale = 0.5;
          let zIndex = 0;
          let filter = "blur(12px)";
          let opacity = 0;

          if (offset === 0) {
            x = "0%";
            scale = 1;
            zIndex = 10;
            filter = "blur(0px)";
            opacity = 1;
          } else if (offset === -1) {
            x = "-65%"; // Increased spacing
            scale = 0.75;
            zIndex = 5;
            filter = "blur(3px)";
            opacity = 0.6;
          } else if (offset === 1) {
            x = "65%"; // Increased spacing
            scale = 0.75;
            zIndex = 5;
            filter = "blur(3px)";
            opacity = 0.6;
          } else if (offset === -2) {
            x = "-110%";
            scale = 0.5;
            zIndex = 0;
            filter = "blur(8px)";
            opacity = 0;
          } else if (offset === 2) {
            x = "110%";
            scale = 0.5;
            zIndex = 0;
            filter = "blur(8px)";
            opacity = 0;
          }

          return (
            <motion.figure
              // Key strictly tied to the absolute index, so Framer Motion animates it across positions naturally
              key={absIndex}
              initial={false}
              animate={{ x, scale, zIndex, filter, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full max-w-[80%] overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur sm:max-w-[60%]"
              style={{ cursor: offset === 0 ? "default" : "pointer" }}
              onClick={() => {
                if (offset === -1) prev();
                if (offset === 1) next();
              }}
            >
              <div className="relative aspect-[16/10]">
                <SanityImage
                  value={img}
                  fill
                  width={1100}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
              {img.caption && (
                <figcaption className="bg-background/80 px-4 py-3 text-center text-sm text-muted-foreground backdrop-blur">
                  {img.caption}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>

      {multiple && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="pointer-events-auto size-12 rounded-full border-border/50 bg-background/50 text-foreground backdrop-blur transition-all hover:bg-background"
            >
              <ChevronLeft className="size-6" />
              <span className="sr-only">Previous Image</span>
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="pointer-events-auto size-12 rounded-full border-border/50 bg-background/50 text-foreground backdrop-blur transition-all hover:bg-background"
            >
              <ChevronRight className="size-6" />
              <span className="sr-only">Next Image</span>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {images.map((_, i) => {
                const isActive = i === currentDataIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={isActive}
                    onClick={() => handleDotClick(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      isActive
                        ? "w-10 bg-linear-to-r from-indigo-500 to-fuchsia-500 shadow-sm shadow-fuchsia-500/50"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    )}
                  />
                );
              })}
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {currentDataIndex + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

