import type { ReactNode } from "react";
import { DrawRule } from "./DrawRule";

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
        <h2 className="text-[22px] font-bold tracking-tight text-ink sm:text-[26px]">{title}</h2>
        {kicker ? <p className="mt-1 max-w-3xl text-[14.5px] leading-relaxed text-muted">{kicker}</p> : null}
        <DrawRule className="mt-3" />
      </div>
      {children}
    </section>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "warn" | "info" }) {
  const tones = {
    default: "border-line bg-surface-2 text-muted",
    accent: "border-accent/30 bg-accent-soft text-accent",
    warn: "border-warn/30 bg-warn-soft text-warn",
    info: "border-info/30 bg-info-soft text-info",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium leading-5 ${tones[tone]}`}>
      {children}
    </span>
  );
}
