"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Image that drifts down slower than the page once its top reaches the
 * viewport top, so the following content slides up over it. The frame size
 * comes from `className` (the image covers it).
 */
export function ParallaxImage({ src, alt, className = "" }: { src: StaticImageData; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "35%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
