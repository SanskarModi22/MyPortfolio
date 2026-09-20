"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Theme, WorkCard } from "@/content/projects";
import { Chip } from "./Section";

function Cover({ c }: { c: NonNullable<WorkCard["cover"]> }) {
  const tall = c.kind === "phone" || c.kind === "kiosk";
  const wide = c.kind === "diagram";
  return (
    <div className={`shrink-0 overflow-hidden border border-line ${wide ? "bg-white" : "bg-surface-2"} ${tall ? "h-[124px] w-[64px] rounded-[10px]" : "h-[84px] w-[128px] rounded-lg"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.src} alt="" aria-hidden loading="lazy" className={`h-full w-full ${wide ? "object-contain" : "object-cover"} ${c.kind === "photo" ? "object-center" : "object-top"}`} />
    </div>
  );
}

export function WorkGrid({ items, themes }: { items: WorkCard[]; themes: Theme[] }) {
  const [active, setActive] = useState<Theme | "All">("All");
  const visible = useMemo(() => (active === "All" ? items : items.filter((p) => p.themes.includes(active))), [active, items]);
  const chips: (Theme | "All")[] = ["All", ...themes.filter((t) => items.some((p) => p.themes.includes(t)))];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies by theme">
        {chips.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:border-rule hover:text-ink"}`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="card card-hover group flex h-full flex-col p-5">
              <div className="flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                <span className="min-w-0 truncate">{String(i + 1).padStart(2, "0")} · {p.themes.slice(0, 2).join(" · ")}</span>
                <span className="shrink-0">{p.period.split(" · ")[0]}</span>
              </div>
              <div className="mt-2.5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold leading-snug text-ink group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.short}</p>
                </div>
                {p.cover ? <Cover c={p.cover} /> : null}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {p.headline.slice(0, 3).map((m) => (
                  <div key={m.label} className="rounded-lg border border-line bg-surface-2/70 px-2.5 py-2">
                    <div className="tnum text-[14px] font-bold leading-tight text-ink">{m.value}</div>
                    <div className="mt-1 text-[10.5px] leading-tight text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex flex-wrap gap-1.5">{p.themes.slice(0, 3).map((t) => <Chip key={t}>{t}</Chip>)}</div>
                <span className="text-[13px] font-medium text-accent">Read →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
