"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { THEMES, type WorkCard } from "@/content/projects";
import { WorkIndex } from "./WorkIndex";
import { WorkGrid } from "./WorkGrid";

type View = "index" | "cards";

// Two ways to browse the same seven projects. The choice is remembered per
// visitor; the index is the default.
export function WorkSwitch({ items }: { items: WorkCard[] }) {
  const [view, setView] = useState<View>("index");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("work-view");
    } catch {}
    if (stored === "cards") {
      const id = requestAnimationFrame(() => setView("cards"));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  function choose(v: View) {
    setView(v);
    try {
      localStorage.setItem("work-view", v);
    } catch {}
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-end">
        <div role="tablist" aria-label="Work view" className="inline-flex rounded-full border border-line bg-surface p-0.5 text-[13px]">
          {(["index", "cards"] as View[]).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => choose(v)}
              className={`relative rounded-full px-3.5 py-1.5 transition-colors ${view === v ? "text-accent-ink" : "text-muted hover:text-ink"}`}
            >
              {view === v ? <motion.span layoutId="work-view-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
              <span className="relative">{v === "index" ? "Index" : "Cards"}</span>
            </button>
          ))}
        </div>
      </div>
      {view === "index" ? <WorkIndex items={items} /> : <WorkGrid items={items} themes={THEMES} />}
    </div>
  );
}
