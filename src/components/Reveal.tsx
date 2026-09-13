"use client";

import { useRef, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

// Scroll-triggered rise-in using a CSS transition (compositor-only: opacity +
// transform). Cheap enough to use everywhere; never leaves content hidden.
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const seen = useInViewOnce(ref);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${seen ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ["--reveal-y" as string]: `${y}px` }}
    >
      {children}
    </Tag>
  );
}
