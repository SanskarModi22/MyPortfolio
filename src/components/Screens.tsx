"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Screen } from "@/content/projects";

// Product screens for a case. Every capture sits in the same kind of frame so
// captures from different sources (app recordings, WhatsApp crops, desktop
// dashboards, photographs) read as one set: phones and kiosks get a device
// bezel, desktop captures get a window bar, photos and squares a plain card.
// Each carries a one-line caption and, where a case shows a before and an
// after, a small tag on the frame.
//
// Clicking any frame opens it in a lightbox: the capture at full size on a
// dark overlay, a second click or the Zoom button for native resolution with
// scrolling, arrows or ← → to move through the set, Esc or the backdrop to
// close. The frames themselves show a cover crop; the lightbox shows the
// whole image.

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

function ZoomHint() {
  return (
    <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
      </svg>
    </span>
  );
}

function Frame({ s, onOpen }: { s: Screen; onOpen: () => void }) {
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
          <ZoomHint />
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
          <ZoomHint />
        </div>
      </div>
    );
  } else {
    frame = (
      <div className={`relative overflow-hidden rounded-xl border border-line ${wide ? "bg-white" : "bg-surface-2"} ${ASPECT[s.kind]}`}>
        {s.tag ? <Tag tag={s.tag} /> : null}
        <Img s={s} fit={wide ? "contain" : "cover"} />
        <ZoomHint />
      </div>
    );
  }

  return (
    <figure className={`flex flex-col ${width}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open full size: ${s.caption || s.alt}`}
        className="group block w-full cursor-zoom-in rounded-xl text-left outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {frame}
      </button>
      <figcaption className="mt-2 text-[12px] leading-snug text-muted">{s.caption}</figcaption>
    </figure>
  );
}

function IconButton({ label, onClick, children, className = "" }: { label: string; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full bg-white/10 px-3 text-[13px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className}`}
    >
      {children}
    </button>
  );
}

function Lightbox({ items, index, onClose, onStep }: { items: Screen[]; index: number; onClose: () => void; onStep: (d: 1 | -1) => void }) {
  // zoom is remembered per capture, so moving to the next one starts fitted
  const [zoomAt, setZoomAt] = useState<number | null>(null);
  const zoom = zoomAt === index;
  const setZoom = useCallback((f: (v: boolean) => boolean) => setZoomAt((cur) => (f(cur === index) ? index : null)), [index]);
  const s = items[index];
  const many = items.length > 1;

  // keyboard, and no page scroll behind the overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && many) onStep(1);
      else if (e.key === "ArrowLeft" && many) onStep(-1);
      else if (e.key === "z" || e.key === "Z") setZoom((v) => !v);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep, many, setZoom]);

  return (
    <div role="dialog" aria-modal="true" aria-label={s.caption || s.alt} className="rise fixed inset-0 z-[100] flex flex-col bg-[#05070c]/95 text-white" style={{ animationDuration: "0.25s" }} onClick={onClose}>
      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 sm:px-5" onClick={(e) => e.stopPropagation()}>
        <div className="font-mono text-[11.5px] tracking-[0.12em] text-white/70">
          {many ? `${index + 1} / ${items.length}` : ""}
        </div>
        <div className="flex items-center gap-2">
          <IconButton label={zoom ? "Fit to screen" : "Zoom to full resolution"} onClick={() => setZoom((v) => !v)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              {zoom ? <path d="M21 21l-4.3-4.3M8 11h6" /> : <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />}
            </svg>
            <span className="hidden sm:inline">{zoom ? "Fit" : "Zoom"}</span>
          </IconButton>
          <IconButton label="Close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </IconButton>
        </div>
      </div>

      {/* the capture */}
      <div className={`relative min-h-0 flex-1 ${zoom ? "overflow-auto" : "overflow-hidden"}`}>
        <div className={`flex min-h-full min-w-full items-center justify-center ${zoom ? "p-4" : "h-full p-2 sm:p-4"}`} onClick={(e) => { e.stopPropagation(); setZoom((v) => !v); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`${zoom ? "h-auto w-auto max-w-none cursor-zoom-out" : "max-h-full max-w-full cursor-zoom-in object-contain"} rounded-lg bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] select-none`}
            draggable={false}
          />
        </div>

        {many ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-4">
              <IconButton label="Previous" onClick={() => onStep(-1)} className="pointer-events-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
              </IconButton>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4">
              <IconButton label="Next" onClick={() => onStep(1)} className="pointer-events-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </IconButton>
            </div>
          </>
        ) : null}
      </div>

      {/* caption */}
      <div className="shrink-0 px-4 pb-4 pt-2 text-center sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="mx-auto max-w-3xl text-[13.5px] leading-snug text-white/85">{s.caption || s.alt}</p>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
          {zoom ? "Full resolution · scroll to pan · click to fit" : "Click the image to zoom"}{many ? " · ← → to move" : ""} · Esc to close
        </p>
      </div>
    </div>
  );
}

export function Screens({ items }: { items: Screen[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap gap-4 sm:gap-5">
        {items.map((s, i) => (
          <Frame key={s.src + i} s={s} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Click any screen to see it full size</p>
      {open !== null ? createPortal(<Lightbox items={items} index={open} onClose={close} onStep={step} />, document.body) : null}
    </div>
  );
}
