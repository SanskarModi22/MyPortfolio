// Per-project inline SVG glyphs: small abstract diagrams in the site's own
// language (hairlines, mono, one accent). They sit faintly inside each index
// step and draw themselves in when the step becomes active (see .glyph CSS).

const R = 240, H = 120;

function Fleet() {
  const agents = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    return { x: 120 + Math.cos(a) * 42, y: 60 + Math.sin(a) * 38, rx: 120 + Math.cos(a + 0.12) * 58, ry: 60 + Math.sin(a + 0.12) * 52 };
  });
  return (
    <>
      {agents.map((p, i) => (
        <g key={i}>
          <line className="g-draw" x1={120} y1={60} x2={p.x} y2={p.y} pathLength={1} style={{ animationDelay: `${i * 60}ms` }} />
          <line className="g-draw g-faint" x1={p.x} y1={p.y} x2={p.rx} y2={p.ry} pathLength={1} style={{ animationDelay: `${200 + i * 60}ms` }} />
          <circle className="g-node" cx={p.x} cy={p.y} r={3.2} style={{ animationDelay: `${i * 140}ms` }} />
          <circle className="g-dot" cx={p.rx} cy={p.ry} r={1.8} />
        </g>
      ))}
      <circle className="g-hub" cx={120} cy={60} r={9} />
      <circle className="g-accent-fill" cx={120} cy={60} r={2.6} />
      <text className="g-label" x={120} y={96} textAnchor="middle">7 cohorts · 1.17M buyers</text>
    </>
  );
}

function ToolGrid() {
  const cells = Array.from({ length: 100 }, (_, i) => ({ x: 75 + (i % 10) * 9, y: 18 + Math.floor(i / 10) * 8.6, i }));
  const lit = new Set([3, 17, 24, 41, 46, 58, 63, 77, 82, 95]);
  return (
    <>
      <rect className="g-frame" x={66} y={10} width={108} height={100} rx={8} />
      {cells.map((c) => (
        <rect key={c.i} className={`g-cell ${lit.has(c.i) ? "g-cell-on" : ""}`} x={c.x} y={c.y} width={5} height={5} rx={1} style={{ animationDelay: `${(c.i % 10) * 40 + Math.floor(c.i / 10) * 30}ms` }} />
      ))}
      <text className="g-label" x={120} y={118} textAnchor="middle">32,536 roots · 699,684 synonyms</text>
    </>
  );
}

function TwoAgents() {
  return (
    <>
      <rect className="g-frame" x={18} y={26} width={78} height={40} rx={9} />
      <line className="g-draw g-faint" x1={30} y1={40} x2={80} y2={40} pathLength={1} />
      <line className="g-draw g-faint" x1={30} y1={50} x2={68} y2={50} pathLength={1} style={{ animationDelay: "120ms" }} />
      <text className="g-label" x={57} y={78} textAnchor="middle">bill photo · ocr</text>
      {/* the gate */}
      <rect className="g-gate" x={112} y={30} width={16} height={42} rx={4} />
      <rect className="g-accent-fill" x={117} y={46} width={6} height={6} rx={1} />
      <line className="g-draw" x1={96} y1={46} x2={112} y2={46} pathLength={1} style={{ animationDelay: "250ms" }} />
      <line className="g-draw" x1={128} y1={46} x2={144} y2={46} pathLength={1} style={{ animationDelay: "400ms" }} />
      <text className="g-label" x={120} y={88} textAnchor="middle">2-party otp</text>
      {/* reply agent bubble */}
      <rect className="g-frame g-accent-stroke" x={144} y={40} width={78} height={40} rx={9} />
      <line className="g-draw" x1={156} y1={54} x2={210} y2={54} pathLength={1} style={{ animationDelay: "520ms" }} />
      <line className="g-draw" x1={156} y1={64} x2={192} y2={64} pathLength={1} style={{ animationDelay: "640ms" }} />
      <text className="g-label" x={183} y={96} textAnchor="middle">driver · routed stops</text>
    </>
  );
}

function Pipeline() {
  const ticks = Array.from({ length: 10 }, (_, i) => 28 + i * 20.4);
  return (
    <>
      <line className="g-draw" x1={20} y1={56} x2={220} y2={56} pathLength={1} />
      {ticks.map((x, i) => (
        <g key={i}>
          <line className="g-tick" x1={x} y1={50} x2={x} y2={62} />
          <circle className={`g-node ${i === 6 ? "g-node-warn" : ""}`} cx={x} cy={56} r={3} style={{ animationDelay: `${i * 90}ms` }} />
        </g>
      ))}
      {/* the guard bracket */}
      <path className="g-draw g-accent-stroke" d={`M ${ticks[4] - 8} 76 v 8 h ${ticks[7] - ticks[4] + 16} v -8`} pathLength={1} style={{ animationDelay: "700ms" }} />
      <text className="g-label" x={(ticks[4] + ticks[7]) / 2} y={98} textAnchor="middle">returns stack</text>
      <text className="g-label" x={ticks[6]} y={40} textAnchor="middle">rto</text>
    </>
  );
}

function Breaker() {
  return (
    <>
      <line className="g-draw" x1={18} y1={60} x2={84} y2={60} pathLength={1} />
      <circle className="g-node" cx={84} cy={60} r={3.5} />
      {/* lever: open in idle, closes when active (rotates) */}
      <line className="g-lever" x1={84} y1={60} x2={136} y2={60} />
      <circle className="g-node" cx={136} cy={60} r={3.5} style={{ animationDelay: "300ms" }} />
      <line className="g-draw g-after" x1={136} y1={60} x2={222} y2={60} pathLength={1} style={{ animationDelay: "500ms" }} />
      <rect className="g-frame" x={96} y={22} width={28} height={18} rx={4} />
      <text className="g-label" x={110} y={35} textAnchor="middle">mov</text>
      <text className="g-label" x={110} y={96} textAnchor="middle">3 minimums → one seller → none</text>
      {/* claims stack */}
      {[0, 1, 2].map((i) => (
        <rect key={i} className="g-cell g-cell-on" x={186} y={28 + i * 8} width={36} height={4} rx={1} style={{ animationDelay: `${600 + i * 120}ms` }} />
      ))}
    </>
  );
}

function Ledger() {
  return (
    <>
      <path className="g-draw" d="M 18 34 C 60 34, 70 60, 104 60" pathLength={1} />
      <path className="g-draw" d="M 18 86 C 60 86, 70 60, 104 60" pathLength={1} style={{ animationDelay: "120ms" }} />
      <text className="g-label" x={18} y={26}>subscribe</text>
      <text className="g-label" x={18} y={102}>own</text>
      {/* the one index */}
      <rect className="g-gate g-accent-stroke" x={104} y={44} width={40} height={32} rx={6} />
      <rect className="g-accent-fill" x={119} y={56} width={10} height={8} rx={1.5} />
      <path className="g-draw g-accent-stroke" d="M 121 56 v -3 a 3 3 0 0 1 6 0 v 3" pathLength={1} style={{ animationDelay: "500ms" }} />
      <text className="g-label" x={124} y={92} textAnchor="middle">one price sheet</text>
      <line className="g-draw" x1={144} y1={60} x2={196} y2={60} pathLength={1} style={{ animationDelay: "650ms" }} />
      <circle className="g-hub" cx={206} cy={60} r={9} />
      <text className="g-label" x={206} y={63.5} textAnchor="middle" style={{ fontSize: 8 }}>$</text>
    </>
  );
}

function Audit() {
  return (
    <>
      <line className="g-draw" x1={40} y1={20} x2={40} y2={100} pathLength={1} />
      {[32, 58, 84].map((y, i) => (
        <g key={i}>
          <line className="g-draw g-faint" x1={40} y1={y} x2={70} y2={y} pathLength={1} style={{ animationDelay: `${i * 120}ms` }} />
          <rect className="g-frame" x={70} y={y - 8} width={58} height={16} rx={3} />
          <line className="g-tick" x1={78} y1={y - 2} x2={112} y2={y - 2} />
          <line className="g-tick" x1={78} y1={y + 3} x2={100} y2={y + 3} />
        </g>
      ))}
      <text className="g-label" x={40} y={112} textAnchor="middle">catalogue · calls · carts</text>
      {/* scanning lens */}
      <g className="g-lens">
        <circle className="g-hub g-accent-stroke" cx={170} cy={32} r={12} />
        <line className="g-accent-stroke" x1={179} y1={41} x2={190} y2={52} />
      </g>
      <text className="g-label" x={176} y={96} textAnchor="middle">17 days</text>
    </>
  );
}

const GLYPHS: Record<string, () => React.ReactElement> = {
  "jit-pivot": Breaker,
  "contribution-turnaround": Pipeline,
  "whatsapp-channel": Fleet,
  "move-it-daas": TwoAgents,
  "vernacular-search": ToolGrid,
  "restaurant-tech-gtm": Ledger,
  "milkoreach": Audit,
};

export function ProjectGlyph({ slug, className = "" }: { slug: string; className?: string }) {
  const G = GLYPHS[slug];
  if (!G) return null;
  return (
    <svg viewBox={`0 0 ${R} ${H}`} className={`glyph ${className}`} aria-hidden fill="none" strokeLinecap="round" strokeLinejoin="round">
      <G />
    </svg>
  );
}
