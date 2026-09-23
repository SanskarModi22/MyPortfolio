import { Reveal } from "./Reveal";

// The year in a handful of moments. A rail with a dot per moment: horizontal
// on wide screens, a vertical spine on phones. Replaces a bar chart whose
// shape asked more questions than it answered.
export type TimelineItem = { when: string; title: string; body: string };

export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="tl grid gap-7 md:gap-5" style={{ ["--tl-cols" as string]: items.length }} aria-label="Timeline">
      {items.map((t, i) => (
        <Reveal key={t.when} as="li" delay={i * 0.06} className="tl-item relative pl-7 md:pl-0 md:pt-8">
          <span aria-hidden className="tl-dot" />
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">{t.when}</div>
          <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">{t.title}</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{t.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
