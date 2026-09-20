// Orders a month across the tenure, as one bar chart with the three moments
// that explain the shape. Pure SVG; scales with its container.

export type ArcPoint = { m: string; v: number; note?: string };

export function ArcChart({ data, caption }: { data: ArcPoint[]; caption?: string }) {
  const W = 960, H = 300, padL = 44, padR = 16, padT = 44, padB = 46;
  const max = Math.max(...data.map((d) => d.v));
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const bw = innerW / data.length;
  const y = (v: number) => padT + innerH - (v / max) * innerH;
  const ticks = [0, 2000, 4000, 6000].filter((t) => t <= max * 1.05);

  return (
    <figure className="card p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[640px]" role="img" aria-label="Orders per month, October 2025 to September 2026">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
              <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill="var(--faint)">{t >= 1000 ? `${t / 1000}k` : t}</text>
            </g>
          ))}
          {data.map((d, i) => {
            const x = padL + i * bw + bw * 0.18;
            const w = bw * 0.64;
            const top = y(d.v);
            const hot = !!d.note;
            return (
              <g key={d.m}>
                <rect x={x} y={top} width={w} height={padT + innerH - top} rx="4" fill={hot ? "var(--accent)" : "var(--rule)"} opacity={hot ? 1 : 0.6} />
                <text x={x + w / 2} y={padT + innerH + 18} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--muted)">{d.m}</text>
                {hot ? (
                  <>
                    <text x={x + w / 2} y={top - 22} textAnchor="middle" fontSize="11.5" fontWeight="600" fontFamily="var(--font-sans)" fill="var(--ink)">{d.note}</text>
                    <text x={x + w / 2} y={top - 8} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--accent)">{d.v.toLocaleString("en-IN")}</text>
                  </>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
      {caption ? <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
