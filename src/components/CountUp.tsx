"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Animates from 0 to `to` the first time the element scrolls into view.
// Respects prefers-reduced-motion by jumping straight to the final value.
export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1100, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const seen = useInViewOnce(ref, { amount: 0.4, fallbackMs: 1500 });

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
