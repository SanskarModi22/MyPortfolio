import type { Screen } from "@/content/projects";

// Product screens for a case: phones and kiosk screens side by side, desktop
// frames and photos wider. Each carries a one-line caption.

const ASPECT: Record<Screen["kind"], string> = {
  phone: "aspect-[9/19.5]",
  kiosk: "aspect-[9/16]",
  desktop: "aspect-[16/10]",
  photo: "aspect-[4/3]",
};

function Frame({ s }: { s: Screen }) {
  const tall = s.kind === "phone" || s.kind === "kiosk";
  return (
    <figure className={`flex flex-col ${tall ? "w-[160px] shrink-0 sm:w-[186px]" : "min-w-0 flex-1 basis-[300px]"}`}>
      <div className={`overflow-hidden border border-line bg-surface-2 ${s.kind === "phone" ? "rounded-[18px]" : "rounded-xl"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={s.alt} loading="lazy" className={`block w-full object-cover ${s.kind === "photo" ? "object-center" : "object-top"} ${ASPECT[s.kind]}`} />
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
