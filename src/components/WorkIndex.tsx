"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CLUSTER } from "@/content/cluster";
import { THEMES, type Theme, type WorkCard } from "@/content/projects";
import { Chip } from "./Section";
import { ProjectGlyph } from "./ProjectGlyph";

// Scroll-driven project index. Each project is a tall step in the left column;
// the step crossing the viewport's focal band becomes active and the sticky
// card on the right reveals it — so scrolling the section walks through every
// project. Hover also activates; click opens the deep-dive.

const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function WorkIndex({ items }: { items: WorkCard[] }) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [themeHL, setThemeHL] = useState<Theme | null>(null);
  const rows = useRef<Map<string, HTMLLIElement>>(new Map());

  const figures = useMemo(() => Object.fromEntries(CLUSTER.map((n) => [n.slug, n])), []);
  const current = active ? items.find((i) => i.slug === active) ?? null : null;
  const index = current ? items.findIndex((i) => i.slug === current.slug) : -1;

  // The row under the viewport's focal line (48% down) is the active one.
  // A plain scroll handler: seven rect reads per event, no frame dependency.
  useEffect(() => {
    let last: string | null = null;
    const pick = () => {
      const focal = window.innerHeight * 0.48;
      let best: string | null = null, bestD = Infinity, first = Infinity, lastBottom = -Infinity;
      rows.current.forEach((el, slug) => {
        const r = el.getBoundingClientRect();
        first = Math.min(first, r.top); lastBottom = Math.max(lastBottom, r.bottom);
        const d = focal >= r.top && focal <= r.bottom ? 0 : Math.min(Math.abs(focal - r.top), Math.abs(focal - r.bottom));
        if (d < bestD) { bestD = d; best = slug; }
      });
      if (focal < first || focal > lastBottom) return; // outside the list: keep whatever is shown
      if (best && best !== last) { last = best; setActive(best); }
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => { window.removeEventListener("scroll", pick); window.removeEventListener("resize", pick); };
  }, [items]);

  function onRow(slug: string) {
    if (hoverable() || active === slug) router.push(`/work/${slug}`);
    else setActive(slug);
  }
  function onKey(e: KeyboardEvent<HTMLElement>, slug: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/work/${slug}`);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
      {/* ── Steps ─────────────────────────────────────────────────────── */}
      <ol className="idx divide-y divide-line rounded-2xl border border-line bg-surface">
        {items.map((p, i) => {
          const f = figures[p.slug];
          const isOn = active === p.slug;
          const dim = (active && !isOn) || (themeHL && !p.themes.includes(themeHL));
          return (
            <li
              key={p.slug}
              data-slug={p.slug}
              ref={(el) => {
                if (el) rows.current.set(p.slug, el);
                else rows.current.delete(p.slug);
              }}
              className={`idx-row ${isOn ? "idx-on" : ""} ${dim ? "idx-dim" : ""}`}
            >
              <div
                role="link"
                tabIndex={0}
                aria-describedby="work-panel"
                aria-current={isOn ? "true" : undefined}
                className="idx-hit grid cursor-pointer grid-cols-[2.2rem_1fr_auto] items-start gap-x-4 px-5 py-6 outline-none sm:px-6 lg:min-h-[38vh] lg:items-start lg:pt-8"
                onPointerEnter={(e) => { if (e.pointerType !== "touch") setActive(p.slug); }}
                onFocus={() => setActive(p.slug)}
                onClick={() => onRow(p.slug)}
                onKeyDown={(e) => onKey(e, p.slug)}
              >
                <span className="idx-num font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="idx-title block text-[19px] font-semibold leading-snug text-ink sm:text-[22px]">{p.title}</span>
                  <span className="mt-1.5 block text-[13.5px] text-muted">{p.cta ?? p.short}</span>
                </span>
                <span className="idx-fig text-right">
                  <span className="block font-mono text-[20px] font-medium leading-none tracking-tight text-ink sm:text-[26px]">{f?.value ?? p.headline[0]?.value}</span>
                  <span className="mt-1 block text-[11px] text-muted">{f?.label ?? p.headline[0]?.label}</span>
                </span>
                <span aria-hidden className="idx-arrow pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[18px] text-accent sm:right-6">→</span>
                {/* fills the tall step: a glyph for the project and its stack, desktop only */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between px-6 pb-5 lg:flex">
                  <span className="idx-stack max-w-[42%] font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">{p.stack.slice(0, 4).join(" · ")}</span>
                  <ProjectGlyph slug={p.slug} className="idx-glyph h-[168px] w-[336px]" />
                </div>
              </div>

              {/* phones: the active step expands inline (the card is desktop-only) */}
              {isOn ? (
                <div className="idx-expand border-t border-line px-5 pb-6 pt-4 sm:px-6 lg:hidden">
                  <p className="text-[14px] leading-relaxed text-muted">{p.short}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {p.headline.slice(0, 3).map((m) => (
                      <div key={m.label} className="rounded-md border border-line bg-surface-2/60 px-2.5 py-2">
                        <div className="font-mono text-[14px] font-medium leading-tight text-ink">{m.value}</div>
                        <div className="mt-1 text-[10.5px] leading-tight text-muted">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/work/${p.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink">
                    {p.cta ?? "Read the deep-dive"} <span aria-hidden>→</span>
                  </Link>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* ── Sticky card (desktop) ─────────────────────────────────────── */}
      <div id="work-panel" aria-live="polite" className="relative hidden min-h-[440px] rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24 lg:block lg:self-start">
        {current ? (
          <div key={current.slug} className="panel-swap">
            <div className="panel-row flex items-start justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              <span>{current.themes.join(" · ")}</span>
              <span className="shrink-0">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="panel-row mt-3 h-px w-full bg-line">
              <div className="h-px bg-accent transition-[width] duration-500 ease-out" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
            </div>
            <h3 className="panel-row mt-4 text-[22px] font-semibold leading-snug text-ink">{current.title}</h3>
            <p className="panel-row mt-2 text-[14.5px] leading-relaxed text-muted">{current.short}</p>
            <div className="panel-row mt-4 grid grid-cols-3 gap-2">
              {current.headline.slice(0, 3).map((m) => (
                <div key={m.label} className="rounded-md border border-line bg-surface-2/60 px-2.5 py-2">
                  <div className="font-mono text-[15px] font-medium leading-tight text-ink">{m.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="panel-row mt-4 flex flex-wrap gap-1.5">
              {current.stack.slice(0, 5).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <div className="panel-row mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`/work/${current.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink shadow-[0_12px_30px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5"
              >
                {current.cta ?? "Read the deep-dive"} <span aria-hidden>→</span>
              </Link>
              {current.readMin ? <span className="font-mono text-[11px] text-faint">{current.readMin} min read</span> : null}
            </div>
            {current.teaser ? <p className="panel-row serif-lesson mt-5 text-[19px] leading-snug text-ink">“{current.teaser}”</p> : null}
          </div>
        ) : (
          <div key="idle" className="panel-swap">
            <p className="panel-row serif-lesson text-[26px] leading-tight text-ink sm:text-[30px]">Six decisions, one rule: say what problem, for whom, and what number will tell us it worked.</p>
            <p className="panel-row mt-3 text-[14px] leading-relaxed text-muted">Scroll — each case takes its turn here. Click any row to read the constraint, the mechanism, the numbers and what I got wrong.</p>
            <div className="panel-row mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Themes</div>
            <div className="panel-row mt-2 flex flex-wrap gap-1.5" onMouseLeave={() => setThemeHL(null)}>
              {THEMES.filter((t) => items.some((i) => i.themes.includes(t))).map((t) => (
                <button key={t} type="button" onMouseEnter={() => setThemeHL(t)} onFocus={() => setThemeHL(t)} onBlur={() => setThemeHL(null)} className="rounded-full border border-line px-3 py-1 text-[12.5px] text-muted transition-colors hover:border-accent hover:text-accent">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
