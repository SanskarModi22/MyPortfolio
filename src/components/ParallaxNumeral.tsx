"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// A huge, faint index numeral that drifts slower than the page — editorial depth.
export function ParallaxNumeral({ n }: { n: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -120]);
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      style={reduce ? undefined : { y }}
      className="pointer-events-none absolute -top-6 right-0 select-none font-mono text-[160px] font-medium leading-none tracking-tighter text-ink/[0.045] sm:text-[220px]"
    >
      {String(n).padStart(2, "0")}
    </motion.div>
  );
}
