"use client";

import { useRef } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

// A hairline that draws itself left-to-right as it scrolls into view.
export function DrawRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref, { amount: 0.5 });
  return <div ref={ref} aria-hidden className={`draw-rule ${seen ? "draw-rule-in" : ""} h-px origin-left bg-rule/60 ${className}`} />;
}
