import type { Metric } from "@/content/projects";
import { Rich } from "./Rich";

// A number, what it is, and how it was measured. The note stays visible.
export function MetricCard({ m, compact = false }: { m: Metric; compact?: boolean }) {
  return (
    <div className={`card ${compact ? "p-3.5" : "p-4"}`}>
      <div className={`tnum font-bold tracking-tight text-ink ${compact ? "text-[19px]" : "text-[22px] sm:text-[24px]"}`}>{m.value}</div>
      <div className={`mt-1 font-medium text-ink ${compact ? "text-[12.5px]" : "text-[13.5px]"}`}>{m.label}</div>
      {m.note && !compact ? (
        <div className="mt-1.5 text-[12px] leading-snug text-muted">
          <Rich text={m.note} />
        </div>
      ) : null}
    </div>
  );
}
