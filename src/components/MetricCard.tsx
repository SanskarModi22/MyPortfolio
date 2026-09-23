import type { Metric } from "@/content/projects";
import { Rich } from "./Rich";

// A number, what it is, and how it was measured. The note stays visible.
// `tone="accent"` is for the three headline numbers at the top of a case.
export function MetricCard({ m, compact = false, tone = "ink" }: { m: Metric; compact?: boolean; tone?: "ink" | "accent" }) {
  const value = tone === "accent" ? "text-accent" : "text-ink";
  return (
    <div className={`card ${compact ? "p-3.5" : "p-4 sm:p-5"}`}>
      <div className={`tnum font-bold tracking-tight ${value} ${compact ? "text-[19px]" : "text-[22px] sm:text-[26px]"}`}>{m.value}</div>
      <div className={`mt-1 font-medium text-ink ${compact ? "text-[12.5px]" : "text-[13.5px]"}`}>{m.label}</div>
      {m.note && !compact ? (
        <div className="mt-1.5 text-[12px] leading-snug text-muted">
          <Rich text={m.note} />
        </div>
      ) : null}
    </div>
  );
}
