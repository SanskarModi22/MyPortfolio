"use client";

import type { MouseEvent, ReactNode } from "react";

// Card with a cursor-following radial highlight. Pure CSS variables; no re-render.
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-xl border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-rule hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 65%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
