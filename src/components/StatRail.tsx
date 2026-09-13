import type { Metric } from "@/content/projects";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

// Headline numbers as one continuous rail: big mono figures, hairline
// separators, no boxes-in-boxes. Each figure carries a one-line qualifier.
export function StatRail({ items }: { items: Metric[] }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_220px_at_20%_0%,var(--accent-soft),transparent_70%)] opacity-70" />
        <div className="relative flex items-center justify-between border-b border-line px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
          <span>In production</span>
          <span className="normal-case tracking-normal">live figures · each one says how it was measured</span>
        </div>
        <ol className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((m, i) => (
            <li
              key={m.label}
              className={`group relative px-5 py-6 sm:py-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""} ${i % 3 !== 0 ? "sm:border-l" : "sm:border-l-0"} ${i >= 3 ? "sm:border-t lg:border-t-0" : ""} ${i !== 0 ? "lg:border-l lg:border-line" : ""}`}
            >
              <div className="font-mono text-[30px] font-medium leading-none tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[36px]">
                {m.count ? <CountUp to={m.count.to} prefix={m.count.prefix} suffix={m.count.suffix} decimals={m.count.decimals} /> : m.value}
              </div>
              <div className="mt-3 text-[14px] leading-snug text-ink">{m.label}</div>
              {m.note ? <div className="mt-1 text-[12.5px] leading-snug text-muted">{m.note}</div> : null}
              <span aria-hidden className="absolute bottom-0 left-5 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-[calc(100%-2.5rem)]" />
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
