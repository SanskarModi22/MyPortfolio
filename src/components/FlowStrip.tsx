import type { FlowNode } from "@/content/projects";

// A horizontal flowchart: Problem → Diagnosis → Decision → Outcome.
// Cards joined by arrows; stacks vertically on phones.

const KIND_LABEL: Record<FlowNode["kind"], string> = {
  problem: "Problem",
  diagnosis: "Diagnosis",
  decision: "Decision",
  outcome: "Outcome",
  step: "",
};

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return vertical ? (
    <svg aria-hidden className="flow-arrow mx-auto h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v16M6 13l6 6 6-6" />
    </svg>
  ) : (
    <svg aria-hidden className="flow-arrow h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h16M13 6l6 6-6 6" />
    </svg>
  );
}

export function FlowStrip({ nodes, numbered = false }: { nodes: FlowNode[]; numbered?: boolean }) {
  // cards take equal fractions; the arrow gutters between them stay auto-width
  const template = nodes.map(() => "minmax(0,1fr)").join(" auto ");
  return (
    <ol className="flow grid gap-2 md:gap-0" style={{ ["--flow-cols" as string]: template }} aria-label="How it went">
      {nodes.map((n, i) => (
        <li key={n.title} className="contents">
          <div className={`flow-node flow-${n.kind} card h-full p-4 sm:p-5`}>
            <div className="flow-band" style={{ background: "var(--node)" }} />
            <div className="mt-3 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--node)" }}>
              {numbered ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ background: "var(--node)" }}>{i + 1}</span> : null}
              <span>{numbered ? `Step ${i + 1}` : KIND_LABEL[n.kind]}</span>
            </div>
            <h3 className="mt-2 text-[16px] font-semibold leading-snug text-ink">{n.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{n.body}</p>
          </div>
          {i < nodes.length - 1 ? (
            <>
              <div className="md:hidden"><Arrow vertical /></div>
              <div className="hidden px-2 md:flex md:items-center"><Arrow /></div>
            </>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
