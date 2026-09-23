import type { Metric } from "@/content/projects";
import { Reveal } from "./Reveal";

// Four numbers, big, each a different kind of result: margin, conversion,
// acquisition cost, a business built. What a reader scans before anything else.
export function ProofStrip({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line lg:grid-cols-4">
      {items.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.05} className="bg-surface p-5 sm:p-6">
          <div className="tnum text-[24px] font-bold leading-tight tracking-tight text-accent sm:text-[28px]">{m.value}</div>
          <div className="mt-2 text-[13.5px] font-medium leading-snug text-ink">{m.label}</div>
          {m.note ? <div className="mt-1 text-[12px] leading-snug text-faint">{m.note}</div> : null}
        </Reveal>
      ))}
    </div>
  );
}
