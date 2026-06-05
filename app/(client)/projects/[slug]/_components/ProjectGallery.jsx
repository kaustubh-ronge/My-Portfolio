"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { SanityImage } from "@/components/SanityImage";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images = [] }) {
  const [api, setApi] = React.useState(null);
  const [selected, setSelected] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!images.length) return null;
  const multiple = images.length > 1;

  return (
    <div className="mx-auto max-w-3xl">
      <Carousel setApi={setApi} opts={{ loop: multiple, align: "center" }}>
        <CarouselContent className="-ml-3">
          {images.map((img) => (
            <CarouselItem key={img._key} className="basis-full pl-3">
              <figure className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
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
                  <figcaption className="px-4 py-2.5 text-center text-sm text-muted-foreground">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        {multiple && (
          <>
            <CarouselPrevious className="left-3 bg-background/70 backdrop-blur" />
            <CarouselNext className="right-3 bg-background/70 backdrop-blur" />
          </>
        )}
      </Carousel>

      {multiple && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === selected
                    ? "w-6 bg-linear-to-r from-indigo-500 to-fuchsia-500"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {selected + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
