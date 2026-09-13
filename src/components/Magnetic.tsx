"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// The wrapped element leans a few pixels toward the cursor and springs back.
export function Magnetic({ children, strength = 0.28, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLSpanElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}
