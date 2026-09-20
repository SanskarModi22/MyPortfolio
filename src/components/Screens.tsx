import type { Screen } from "@/content/projects";

// Product screens for a case. Every capture sits in the same kind of frame so
// captures from different sources (app recordings, WhatsApp crops, desktop
// dashboards, photographs) read as one set: phones and kiosks get a device
// bezel, desktop captures get a window bar, photos and squares a plain card.
// Each carries a one-line caption and, where a case shows a before and an
// after, a small tag on the frame.

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

function Tag({ tag }: { tag: NonNullable<Screen["tag"]> }) {
  return (
    <span className={`absolute left-2 top-2 z-10 rounded-md px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] shadow-sm ${TAG[tag]}`}>{tag}</span>
  );
}

function Img({ s, fit }: { s: Screen; fit: "cover" | "contain" }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={s.src} alt={s.alt} loading="lazy" className={`block h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${s.kind === "photo" ? "object-center" : "object-top"}`} />;
}

function Frame({ s }: { s: Screen }) {
  const tall = s.kind === "phone" || s.kind === "kiosk";
  const wide = s.kind === "diagram";
  const square = s.kind === "square";
  const width = tall ? "w-[168px] shrink-0 sm:w-[194px]" : square ? "w-[200px] shrink-0 sm:w-[236px]" : wide ? "basis-full" : "min-w-0 flex-1 basis-[300px]";

  let frame: React.ReactNode;
  if (tall) {
    // device bezel: dark shell, thin inner rim, screen clipped to the device radius
    frame = (
      <div className="relative rounded-[26px] bg-[#111318] p-[7px] shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className={`relative overflow-hidden rounded-[20px] bg-surface-2 ${ASPECT[s.kind]}`}>
          {s.tag ? <Tag tag={s.tag} /> : null}
          <Img s={s} fit="cover" />
        </div>
      </div>
    );
  } else if (s.kind === "desktop") {
    // window: a bar with three dots, then the capture
    frame = (
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <div className="flex h-6 items-center gap-1.5 border-b border-line bg-surface px-2.5">
          <span className="h-2 w-2 rounded-full bg-faint/60" />
          <span className="h-2 w-2 rounded-full bg-faint/60" />
          <span className="h-2 w-2 rounded-full bg-faint/60" />
        </div>
        <div className={`relative ${ASPECT[s.kind]}`}>
          {s.tag ? <Tag tag={s.tag} /> : null}
          <Img s={s} fit="cover" />
        </div>
      </div>
    );
  } else {
    frame = (
      <div className={`relative overflow-hidden rounded-xl border border-line ${wide ? "bg-white" : "bg-surface-2"} ${ASPECT[s.kind]}`}>
        {s.tag ? <Tag tag={s.tag} /> : null}
        <Img s={s} fit={wide ? "contain" : "cover"} />
      </div>
    );
  }

  return (
    <figure className={`flex flex-col ${width}`}>
      {frame}
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
