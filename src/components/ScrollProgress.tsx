"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-accent" style={{ scaleX }} />;
}
