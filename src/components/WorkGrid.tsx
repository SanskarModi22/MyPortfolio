"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { Theme, WorkCard } from "@/content/projects";
import { Chip } from "./Section";
import { Spotlight } from "./Spotlight";


export function WorkGrid({ items, themes }: { items: WorkCard[]; themes: Theme[] }) {
  const [active, setActive] = useState<Theme | "All">("All");
  const reduce = useReducedMotion();
  const visible = useMemo(() => (active === "All" ? items : items.filter((p) => p.themes.includes(active))), [active, items]);
  const chips: (Theme | "All")[] = ["All", ...themes.filter((t) => items.some((p) => p.themes.includes(t)))];

  return (
    <div>
      <LayoutGroup>
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter work by theme">
          {chips.map((t) => {
            const on = t === active;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t)}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${on ? "text-accent-ink" : "text-muted hover:text-ink"}`}
              >
                {on ? (
                  <motion.span layoutId="chip-bg" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-line" />
                )}
                <span className="relative">{t}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/work/${p.slug}`} className="block h-full">
                  <Spotlight className="h-full">
                    <div className="flex h-full flex-col p-5">
                      <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                        <span className="min-w-0 truncate">{p.themes.slice(0, 2).join(" · ")}</span>
                        <span className="shrink-0 whitespace-nowrap">{p.period.split(" · ").slice(0, 2).join(" · ")}</span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug text-ink">{p.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.short}</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {p.headline.slice(0, 3).map((m) => (
                          <div key={m.label} className="rounded-md border border-line bg-surface-2/60 px-2.5 py-2">
                            <div className="font-mono text-[15px] font-medium leading-tight text-ink">{m.value}</div>
                            <div className="mt-1 text-[11px] leading-tight text-muted">{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                      {p.teaser ? (
                        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
                          <div className="overflow-hidden">
                            <p className="serif-lesson pt-4 text-[17px] leading-snug text-ink">“{p.teaser}”</p>
                          </div>
                        </div>
                      ) : null}
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-2 text-[13px] font-semibold text-accent transition-[background-color,color,border-color,box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink group-hover:shadow-[0_12px_30px_-12px_var(--accent)]">
                          {p.cta ?? "Read the deep-dive"}
                          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                        {p.readMin ? <span className="font-mono text-[11px] text-faint">{p.readMin} min read</span> : null}
                      </div>
                    </div>
                  </Spotlight>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
