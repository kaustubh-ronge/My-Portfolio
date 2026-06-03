import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

/**
 * Renders a Sanity image through next/image with hotspot-aware cropping and an
 * LQIP blur-up placeholder (when `metadata.lqip` is included in the query).
 */
export function SanityImage({
  value,
  width = 800,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
}) {
  if (!value?.asset) return null;

  const h = height ?? Math.round(width * 0.625);
  const src = urlFor(value)
    .width(width)
    .height(h)
    .fit("crop")
    .auto("format")
    .url();

  const lqip = value.asset?.metadata?.lqip;
  const placeholder = lqip ? "blur" : "empty";

  const common = {
    src,
    alt: value.alt || "",
    sizes,
    priority,
    placeholder,
    blurDataURL: lqip,
    className,
  };

  if (fill) {
    return <Image {...common} fill />;
  }
  return <Image {...common} width={width} height={h} />;
}
