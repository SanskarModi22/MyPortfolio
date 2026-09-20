import type { FlowNode } from "@/content/projects";

// A horizontal flowchart. Four nodes sit in one row joined by arrows
// (Problem → Diagnosis → Decision → Outcome, or the four-step method).
// Longer step sequences wrap into rows of four, numbered, each card carrying
// its own arrow to the next.

const KIND_LABEL: Record<FlowNode["kind"], string> = {
  problem: "Why",
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

// Card bodies are written one idea per sentence; render each sentence as a
// bullet. Fragments under 30 characters ("Then discounts.") join the bullet
// before them so no bullet reads as a stub.
const SENTENCE = /(?<=[.!?])\s+(?=[A-Z₹0-9"'“‘(])/;
export function bullets(body: string): string[] {
  const out: string[] = [];
  for (const s of body.split(SENTENCE)) {
    if (out.length && s.length < 30) out[out.length - 1] += " " + s;
    else out.push(s);
  }
  return out;
}

function Body({ text }: { text: string }) {
  const items = bullets(text);
  if (items.length < 2) return <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{text}</p>;
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[13.5px] leading-relaxed text-muted marker:text-faint">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}

function Node({ n, i, numbered }: { n: FlowNode; i: number; numbered: boolean }) {
  return (
    <div className={`flow-node flow-${n.kind} card h-full p-4 sm:p-5`}>
      <div className="flow-band" style={{ background: "var(--node)" }} />
      <div className="mt-3 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--node)" }}>
        {numbered ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ background: "var(--node)" }}>{i + 1}</span> : null}
        <span>{numbered ? `Step ${i + 1}` : KIND_LABEL[n.kind]}</span>
      </div>
      <h3 className="mt-2 text-[16px] font-semibold leading-snug text-ink">{n.title}</h3>
      <Body text={n.body} />
    </div>
  );
}

export function FlowStrip({ nodes, numbered = false }: { nodes: FlowNode[]; numbered?: boolean }) {
  if (nodes.length > 4) {
    // wrapping grid: arrow sits at each card's top-right corner, pointing on
    return (
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="The flow">
        {nodes.map((n, i) => (
          <li key={n.title} className="relative">
            <Node n={n} i={i} numbered />
            {i < nodes.length - 1 ? (
              <span aria-hidden className="absolute right-3 top-3 hidden lg:block"><Arrow /></span>
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  // cards take equal fractions; the arrow gutters between them stay auto-width
  const template = nodes.map(() => "minmax(0,1fr)").join(" auto ");
  return (
    <ol className="flow grid gap-2 md:gap-0" style={{ ["--flow-cols" as string]: template }} aria-label="How it went">
      {nodes.map((n, i) => (
        <li key={n.title} className="contents">
          <Node n={n} i={i} numbered={numbered} />
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
