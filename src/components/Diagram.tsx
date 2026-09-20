"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { DiagramSpec, DNode, NodeKind } from "@/content/diagrams";

const DEFAULT_W = 160;
const DEFAULT_H = 62;

const KIND_STYLE: Record<NodeKind, { fill: string; stroke: string; dash?: string; rx: number }> = {
  agent: { fill: "var(--accent-soft)", stroke: "var(--accent)", rx: 10 },
  service: { fill: "var(--surface)", stroke: "var(--rule)", rx: 8 },
  store: { fill: "var(--surface-2)", stroke: "var(--rule)", rx: 8 },
  external: { fill: "var(--surface)", stroke: "var(--faint)", dash: "5 4", rx: 8 },
  guard: { fill: "var(--warn-soft)", stroke: "var(--warn)", rx: 8 },
  human: { fill: "var(--surface)", stroke: "var(--ink)", rx: 31 },
  ui: { fill: "var(--surface)", stroke: "var(--rule)", rx: 8 },
  tool: { fill: "var(--surface-2)", stroke: "var(--faint)", rx: 8 },
};

const LEGEND: { kind: NodeKind; label: string }[] = [
  { kind: "agent", label: "Model / automation" },
  { kind: "guard", label: "Guard rail" },
  { kind: "service", label: "System" },
  { kind: "store", label: "Data" },
  { kind: "external", label: "Third party" },
  { kind: "human", label: "Person" },
];

type Box = Required<Pick<DNode, "x" | "y" | "w" | "h">>;

function box(n: DNode): Box {
  return { x: n.x, y: n.y, w: n.w ?? DEFAULT_W, h: n.h ?? DEFAULT_H };
}

// Anchor on the side facing the other node; cubic bezier between anchors.
function edgePath(a: Box, b: Box) {
  const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const dx = bc.x - ac.x;
  const dy = bc.y - ac.y;
  let x1: number, y1: number, x2: number, y2: number, c1x: number, c1y: number, c2x: number, c2y: number;
  if (Math.abs(dx) > Math.abs(dy)) {
    x1 = dx > 0 ? a.x + a.w : a.x;
    y1 = ac.y;
    x2 = dx > 0 ? b.x : b.x + b.w;
    y2 = bc.y;
    const k = Math.max(28, Math.abs(x2 - x1) / 2) * Math.sign(dx || 1);
    c1x = x1 + k; c1y = y1; c2x = x2 - k; c2y = y2;
  } else {
    x1 = ac.x;
    y1 = dy > 0 ? a.y + a.h : a.y;
    x2 = bc.x;
    y2 = dy > 0 ? b.y : b.y + b.h;
    const k = Math.max(24, Math.abs(y2 - y1) / 2) * Math.sign(dy || 1);
    c1x = x1; c1y = y1 + k; c2x = x2; c2y = y2 - k;
  }
  const mid = {
    x: (x1 + 3 * c1x + 3 * c2x + x2) / 8,
    y: (y1 + 3 * c1y + 3 * c2y + y2) / 8,
  };
  return { d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`, mid };
}

export function Diagram({ spec, title }: { spec: DiagramSpec; title?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const reduce = useReducedMotion();

  const boxes = useMemo(() => Object.fromEntries(spec.nodes.map((n) => [n.id, box(n)])), [spec]);
  const edges = useMemo(
    () =>
      spec.edges.map((e, i) => ({ ...e, i, ...edgePath(boxes[e.from], boxes[e.to]) })),
    [spec, boxes],
  );

  const connected = useMemo(() => {
    if (!active) return null;
    const s = new Set<string>([active]);
    for (const e of spec.edges) {
      if (e.from === active) s.add(e.to);
      if (e.to === active) s.add(e.from);
    }
    return s;
  }, [active, spec]);

  const activeNode = spec.nodes.find((n) => n.id === active);

  function enter(id: string) {
    if (!pinned) setActive(id);
  }
  function leave() {
    if (!pinned) setActive(null);
  }
  function toggle(id: string) {
    if (pinned && active === id) {
      setPinned(false);
      setActive(null);
    } else {
      setPinned(true);
      setActive(id);
    }
  }

  return (
    <figure className="rounded-xl border border-line bg-surface">
      {title ? <figcaption className="border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{title}</figcaption> : null}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${spec.w} ${spec.h}`}
          className="block h-auto w-full min-w-[700px]"
          role="img"
          aria-label={title ?? "Architecture diagram"}
          onMouseLeave={leave}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--faint)" />
            </marker>
            <marker id="arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {edges.map((e) => {
            const on = active ? e.from === active || e.to === active : false;
            const dim = active ? !on : false;
            return (
              <g key={e.i} className={`dg-edge ${dim ? "dg-dim" : ""}`}>
                <path
                  d={e.d}
                  fill="none"
                  stroke={on ? "var(--accent)" : "var(--rule)"}
                  strokeWidth={on ? 2 : 1.25}
                  strokeDasharray={e.dashed ? "5 5" : undefined}
                  markerEnd={on ? "url(#arrow-on)" : "url(#arrow)"}
                />
                {!reduce ? (
                  <circle r={on ? 3 : 2.2} fill={on ? "var(--accent)" : "var(--faint)"} opacity={on ? 0.95 : 0.5}>
                    <animateMotion dur={`${3.2 + (e.i % 4) * 0.7}s`} repeatCount="indefinite" path={e.d} begin={`${(e.i % 5) * 0.45}s`} />
                  </circle>
                ) : null}
                {e.label ? (
                  <text
                    x={e.mid.x}
                    y={e.mid.y - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fill={on ? "var(--accent)" : "var(--muted)"}
                    stroke="var(--surface)"
                    strokeWidth="4"
                    paintOrder="stroke"
                  >
                    {e.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {spec.nodes.map((n) => {
            const b = boxes[n.id];
            const st = KIND_STYLE[n.kind];
            const isActive = active === n.id;
            const dim = connected ? !connected.has(n.id) : false;
            const subLines = n.sub ? n.sub.split("|") : [];
            const labelY = subLines.length === 0 ? b.y + b.h / 2 + 4.5 : subLines.length === 1 ? b.y + 26 : b.y + 22;
            return (
              <g
                key={n.id}
                className={`dg-node ${dim ? "dg-dim" : ""}`}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${n.label}${n.sub ? ": " + n.sub.replace("|", " ") : ""}`}
                onMouseEnter={() => enter(n.id)}
                onFocus={() => enter(n.id)}
                onBlur={leave}
                onClick={() => toggle(n.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    toggle(n.id);
                  }
                }}
              >
                {isActive && !reduce ? (
                  <rect className="dg-pulse" x={b.x} y={b.y} width={b.w} height={b.h} rx={st.rx} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                ) : null}
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx={st.rx}
                  fill={st.fill}
                  stroke={isActive ? "var(--accent)" : st.stroke}
                  strokeWidth={isActive ? 2 : 1.25}
                  strokeDasharray={st.dash}
                />
                <text x={b.x + b.w / 2} y={labelY} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-sans)">
                  {n.label}
                </text>
                {subLines.map((s, i) => (
                  <text key={i} x={b.x + b.w / 2} y={labelY + 14 + i * 12} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-sans)">
                    {s}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-h-[3.2rem] flex-1 text-sm leading-relaxed text-muted" aria-live="polite">
          {activeNode ? (
            <>
              <span className="font-semibold text-ink">{activeNode.label}</span>
              <span className="text-faint"> — </span>
              {spec.notes[activeNode.id]}
              {pinned ? <span className="ml-2 font-mono text-[10.5px] text-faint">(pinned · click again to release)</span> : null}
            </>
          ) : (
            <span className="text-faint">Hover or tap a component to see what it does and why it exists.</span>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-faint sm:max-w-[260px] sm:justify-end">
          {LEGEND.map((l) => (
            <li key={l.kind} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-3.5 rounded-[3px] border"
                style={{ background: KIND_STYLE[l.kind].fill, borderColor: KIND_STYLE[l.kind].stroke, borderStyle: KIND_STYLE[l.kind].dash ? "dashed" : "solid" }}
              />
              {l.label}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
