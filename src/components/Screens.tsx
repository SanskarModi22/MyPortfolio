import type { Screen } from "@/content/projects";

// Product screens for a case: phones and kiosk screens side by side, desktop
// frames and photos wider. Each carries a one-line caption and, where a case
// shows a before and an after, a small tag on the frame.

const ASPECT: Record<Screen["kind"], string> = {
  phone: "aspect-[9/19.5]",
  kiosk: "aspect-[9/16]",
  desktop: "aspect-[16/10]",
  photo: "aspect-[4/3]",
  diagram: "aspect-[16/9]",
  square: "aspect-square",
};

const TAG: Record<NonNullable<Screen["tag"]>, string> = {
  before: "bg-danger text-white",
  after: "bg-accent text-accent-ink",
};

function Frame({ s }: { s: Screen }) {
  const tall = s.kind === "phone" || s.kind === "kiosk";
  const wide = s.kind === "diagram";
  const square = s.kind === "square";
  return (
    <figure className={`flex flex-col ${tall ? "w-[160px] shrink-0 sm:w-[186px]" : square ? "w-[200px] shrink-0 sm:w-[236px]" : wide ? "basis-full" : "min-w-0 flex-1 basis-[300px]"}`}>
      <div className={`relative overflow-hidden border border-line ${wide ? "bg-white" : "bg-surface-2"} ${s.kind === "phone" ? "rounded-[18px]" : "rounded-xl"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={s.alt} loading="lazy" className={`block w-full ${wide ? "object-contain" : "object-cover"} ${s.kind === "photo" ? "object-center" : "object-top"} ${ASPECT[s.kind]}`} />
        {s.tag ? (
          <span className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] shadow-sm ${TAG[s.tag]}`}>{s.tag}</span>
        ) : null}
      </div>
      <figcaption className="mt-2 text-[12px] leading-snug text-muted">{s.caption}</figcaption>
    </figure>
  );
}

export function Screens({ items }: { items: Screen[] }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap gap-4 sm:gap-5">
        {items.map((s, i) => (
          <Frame key={s.src + i} s={s} />
        ))}
      </div>
    </div>
  );
}
