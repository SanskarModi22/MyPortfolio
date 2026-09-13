"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

// Pointer-driven 3D tilt with a soft glare. CSS variables only — no re-render
// per mouse move. Reduced-motion users get a static card (see globals.css).
export function Tilt({ children, max = 8, className = "", disabled = false, glare = true }: { children: ReactNode; max?: number; className?: string; disabled?: boolean; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || disabled) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt ${className}`}>
      <div className="tilt-inner relative">
        {children}
        {glare ? <div aria-hidden className="tilt-glare" /> : null}
      </div>
    </div>
  );
}
