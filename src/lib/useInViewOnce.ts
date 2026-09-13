"use client";

import { useEffect, useState, type RefObject } from "react";

// True once the element has entered the viewport — or after `fallbackMs`,
// whichever comes first. The fallback guarantees content is never stuck
// invisible if IntersectionObserver is late (scroll restoration, in-app
// browsers, programmatic jumps). Reduced-motion users get `true` immediately.
export function useInViewOnce(ref: RefObject<Element | null>, { amount = 0.08, fallbackMs = 1800 } = {}) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setSeen(true);
      io.disconnect();
      clearTimeout(t);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) finish();
      },
      { threshold: amount },
    );
    io.observe(el);
    // Already on screen at mount (above the fold) → reveal on the next frame.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) requestAnimationFrame(finish);
    const t = window.setTimeout(finish, fallbackMs);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [ref, amount, fallbackMs]);

  return seen;
}
