import type { ReactNode } from "react";
import { DrawRule } from "./DrawRule";

// Mirrors the resume: small grey caps header with a hairline rule beneath.
export function Section({
  id,
  title,
  kicker,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mb-6">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">{title}</h2>
        {kicker ? <p className="mt-1 text-sm text-faint">{kicker}</p> : null}
        <DrawRule className="mt-2" />
      </div>
      {children}
    </section>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "warn" }) {
  const tones = {
    default: "border-line bg-surface-2 text-muted",
    accent: "border-accent/30 bg-accent-soft text-accent",
    warn: "border-warn/30 bg-warn-soft text-warn",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  );
}
