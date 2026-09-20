// A bar chart over time with the few moments that explain its shape
// annotated. Pure SVG; scales with its container. Labels may be blank for
// dense series (one label per month over weekly bars, say).

export type ArcPoint = { m: string; v: number; note?: string };

function niceTicks(max: number, n = 4): number[] {
  const raw = max / n;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * pow).find((s) => s >= raw) ?? raw;
  const out: number[] = [];
  for (let t = 0; t <= max * 1.02; t += step) out.push(Number(t.toFixed(6)));
  return out;
}

export function ArcChart({
  data,
  caption,
  ariaLabel,
  unit = "",
  fmt,
}: {
  data: ArcPoint[];
  caption?: string;
  ariaLabel?: string;
  /** suffix for the y-axis ticks, e.g. "L" for lakhs */
  unit?: string;
  /** formatter for annotated bar values */
  fmt?: (v: number) => string;
}) {
  const W = 960, H = 300, padL = 48, padR = 16, padT = 44, padB = 46;
  const max = Math.max(...data.map((d) => d.v));
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const bw = innerW / data.length;
  const y = (v: number) => padT + innerH - (v / max) * innerH;
  const ticks = niceTicks(max);
  const tick = (t: number) => (t >= 1000 && !unit ? `${t / 1000}k` : `${t}${unit}`);
  const show = fmt ?? ((v: number) => v.toLocaleString("en-IN"));

  return (
    <figure className="card p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[640px]" role="img" aria-label={ariaLabel ?? "Bar chart over time"}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
              <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill="var(--faint)">{tick(t)}</text>
            </g>
          ))}
          {data.map((d, i) => {
            const x = padL + i * bw + bw * 0.18;
            const w = bw * 0.64;
            const top = y(d.v);
            const hot = !!d.note;
            return (
              <g key={i}>
                <rect x={x} y={top} width={w} height={padT + innerH - top} rx={Math.min(4, w / 2)} fill={hot ? "var(--accent)" : "var(--rule)"} opacity={hot ? 1 : 0.6} />
                {d.m ? (
                  <text x={x + w / 2} y={padT + innerH + 18} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--muted)">{d.m}</text>
                ) : null}
                {hot ? (
                  <>
                    <text x={x + w / 2} y={top - 22} textAnchor="middle" fontSize="11.5" fontWeight="600" fontFamily="var(--font-sans)" fill="var(--ink)">{d.note}</text>
                    <text x={x + w / 2} y={top - 8} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--accent)">{show(d.v)}</text>
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
