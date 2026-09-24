import Link from "next/link";
import type { Lens } from "@/content/profile";
import { Reveal } from "./Reveal";

// Three ways to read one record. A hiring manager for a product, growth or
// product-marketing role gets the pitch in their own terms, the three cases to
// open first, and the resume cut for that role. Same figures in every lens.
export function RoleLenses({ lenses }: { lenses: readonly Lens[] }) {
  return (
    <ol className="grid gap-3 lg:grid-cols-3">
      {lenses.map((l, i) => (
        <Reveal key={l.key} as="li" delay={i * 0.05}>
          <div className="card flex h-full flex-col p-5">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
              <span>Read it as a</span>
              <span>0{i + 1}</span>
            </div>
            <h3 className="mt-2 text-[19px] font-bold leading-snug tracking-tight text-ink">{l.title}</h3>
            <p className="mt-1 text-[13px] font-medium text-accent">{l.ask}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{l.pitch}</p>
            <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
              {l.cases.map((c) => (
                <li key={c.slug}>
                  <Link href={`/work/${c.slug}`} className="group flex items-center justify-between gap-3 px-3 py-2 text-[13px] hover:bg-surface-2">
                    <span className="min-w-0 truncate text-ink group-hover:text-accent">{c.title}</span>
                    <span className="tnum shrink-0 font-mono text-[12px] font-semibold text-ink">{c.figure}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <a href={l.resumeHref} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:border-rule">
                {l.resumeLabel} <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
