import type { Metric } from "@/content/projects";
import { CountUp } from "./CountUp";
import { Rich } from "./Rich";

// A number, what it is, and how it was measured. The note is always visible —
// honesty isn't a hover state.
export function MetricCard({ m, compact = false }: { m: Metric; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-line bg-surface ${compact ? "p-3" : "p-4"}`}>
      <div className={`font-mono font-medium tracking-tight text-ink ${compact ? "text-xl" : "text-2xl sm:text-[28px]"}`}>
        {m.count ? (
          <CountUp to={m.count.to} prefix={m.count.prefix} suffix={m.count.suffix} decimals={m.count.decimals} />
        ) : (
          m.value
        )}
      </div>
      <div className={`mt-1 text-ink ${compact ? "text-[13px]" : "text-sm"}`}>{m.label}</div>
      {m.note && !compact ? (
        <div className="mt-1.5 text-[12.5px] leading-snug text-muted">
          <Rich text={m.note} />
        </div>
      ) : null}
    </div>
  );
}
