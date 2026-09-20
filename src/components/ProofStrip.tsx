import type { Metric } from "@/content/projects";
import { Reveal } from "./Reveal";

// Six numbers, big, each with what it is and how it was measured.
export function ProofStrip({ items }: { items: Metric[] }) {
  return (
    <div className="card grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
      {items.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.05} className="p-4 sm:p-5">
          <div className="tnum text-[19px] font-bold leading-tight tracking-tight text-accent sm:text-[21px]">{m.value}</div>
          <div className="mt-2 text-[13px] font-medium leading-snug text-ink">{m.label}</div>
          {m.note ? <div className="mt-1 text-[11.5px] leading-snug text-faint">{m.note}</div> : null}
        </Reveal>
      ))}
    </div>
  );
}
