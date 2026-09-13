"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { resume, resumeAsPlainText } from "@/content/resume";
import { Rich } from "./Rich";
import { Tilt } from "./Tilt";
import { Magnetic } from "./Magnetic";

type View = "web" | "ats";

function SideHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 border-b border-line pb-1.5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-faint first:mt-0">{children}</h3>
  );
}

function Sheet() {
  const r = resume;
  return (
    <div className="sheet paper relative rounded-xl px-7 py-10 sm:px-12 sm:py-14">
      {/* name block */}
      <div className="text-center">
        <div className="text-[32px] leading-none tracking-tight sm:text-[38px]">
          <span className="font-normal text-muted">{r.name.first}</span> <span className="font-bold">{r.name.last}</span>
        </div>
        <div className="mt-3 text-[12.5px] text-muted">{r.subtitle}</div>
        <div className="mt-2 text-[12px] text-muted">
          <a className="hover:text-accent" href={`mailto:${r.contact.email}`}>{r.contact.email}</a>
          <span className="mx-2 text-faint">|</span>
          {r.contact.phone}
          <span className="mx-2 text-faint">|</span>
          <a className="hover:text-accent" href={r.contact.portfolio.href} target="_blank" rel="noreferrer">{r.contact.portfolio.label}</a>
          <span className="mx-2 text-faint">|</span>
          <a className="hover:text-accent" href={r.contact.linkedin.href} target="_blank" rel="noreferrer">{r.contact.linkedin.label}</a>
          <span className="mx-2 text-faint">|</span>
          <a className="hover:text-accent" href={r.contact.github.href} target="_blank" rel="noreferrer">{r.contact.github.label}</a>
        </div>
        <div className="mx-auto mt-6 h-px w-full bg-rule/50" />
      </div>

      <div className="mt-8 grid gap-10 text-[13px] leading-[1.7] sm:grid-cols-[29%_1fr] sm:gap-12">
        {/* sidebar */}
        <aside>
          <SideHead>Education</SideHead>
          {r.sidebar.education.map((e) => (
            <div key={e.head} className="mb-4">
              <div className="font-semibold">{e.head}</div>
              <div>{e.body}</div>
              <div className="text-[11.5px] text-muted">{e.meta}</div>
            </div>
          ))}
          <SideHead>Links</SideHead>
          {r.sidebar.links.map((l) => (
            <div key={l.head} className="mb-3">
              <div className="font-semibold">{l.head}</div>
              <a className="text-accent hover:underline" href={l.href} target="_blank" rel="noreferrer">{l.body}</a>
            </div>
          ))}
          <SideHead>Skills</SideHead>
          {r.sidebar.skills.map((s) => (
            <div key={s.head} className="mb-4">
              <div className="font-semibold">{s.head}</div>
              <div className="num-glow">{s.body}</div>
            </div>
          ))}
          <SideHead>Projects</SideHead>
          {r.sidebar.projects.map((p) => (
            <div key={p.head} className="mb-5">
              <div className="font-semibold">{p.head}</div>
              <div className="text-[11.5px] text-muted">{p.meta}</div>
              <div className="num-glow mt-0.5"><Rich text={p.body} /></div>
            </div>
          ))}
        </aside>

        {/* main */}
        <div>
          <SideHead>Summary</SideHead>
          <p>{r.summary}</p>
          <SideHead>Work Experience</SideHead>
          {r.roles.map((role) => (
            <div key={role.title} className="mb-7">
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[14px] font-semibold">{role.title}</div>
                <div className="shrink-0 text-[11.5px] text-muted">{role.date}</div>
              </div>
              <ul className="mt-1">
                {role.items.map((it, i) => (
                  <li
                    key={i}
                    className={`num-glow flex gap-2 ${it.kind === "sub" ? "mt-4 font-semibold" : it.kind === "leaf" ? "mt-1.5 pl-3" : "mt-2"}`}
                  >
                    <span className="shrink-0 text-muted">{it.kind === "leaf" ? "○" : "•"}</span>
                    <span><Rich text={it.text} /></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumeSheet() {
  const [view, setView] = useState<View>("web");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const reduce = useReducedMotion();

  async function openPdf() {
    if (running) return;
    if (reduce) {
      window.open(resume.pdfHref, "_blank", "noopener");
      return;
    }
    setRunning(true);
    for (let i = 0; i < resume.checklist.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 420));
    }
    setStep(resume.checklist.length);
    await new Promise((r) => setTimeout(r, 500));
    // Still inside Chrome's ~5 s user-activation window, so this is not a popup.
    window.open(resume.pdfHref, "_blank", "noopener");
    await new Promise((r) => setTimeout(r, 400));
    setRunning(false);
    setStep(-1);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Resume view" className="inline-flex rounded-full border border-line bg-surface p-0.5 text-[13px]">
          {(["web", "ats"] as View[]).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`relative rounded-full px-3.5 py-1.5 transition-colors ${view === v ? "text-accent-ink" : "text-muted hover:text-ink"}`}
            >
              {view === v ? <motion.span layoutId="resume-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
              <span className="relative">{v === "web" ? "Web view" : "ATS view"}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Magnetic>
            <button
              type="button"
              onClick={openPdf}
              disabled={running}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-[0_10px_30px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {running ? "Verifying…" : "Open the PDF"}
            </button>
          </Magnetic>
          <a href={resume.pdfHref} download className="rounded-md border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-rule">
            Download
          </a>
        </div>
      </div>

      <div className="relative">
        <Tilt max={4} className="block" disabled={running || view === "ats"}>
          <motion.div
            animate={running ? { scale: 0.985, y: -6 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {view === "web" ? (
                <motion.div key="web" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <Sheet />
                </motion.div>
              ) : (
                <motion.div key="ats" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-[6px] border border-line bg-surface">
                  {!reduce ? <div aria-hidden className="scanline pointer-events-none absolute inset-x-0 top-0 h-10" /> : null}
                  <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                    <span>plain text · what a parser reads</span>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-4 font-mono text-[12px] leading-[1.55] text-ink">{resumeAsPlainText()}</pre>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Tilt>

        {/* Pre-send checklist overlay — portaled to <body> so no transformed
            ancestor can become its containing block. */}
        {typeof document !== "undefined" ? createPortal(
        <AnimatePresence>
          {running ? (
            <motion.div
              key="check"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 px-4"
              aria-live="polite"
            >
              <div className="w-[min(92%,520px)] rounded-xl border border-line bg-surface p-5 shadow-2xl">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">checking the PDF</div>
                <ul className="mt-3 space-y-2 font-mono text-[12.5px]">
                  {resume.checklist.map((c, i) => {
                    const state = i < step ? "done" : i === step ? "run" : "wait";
                    return (
                      <li key={c.label} className={`flex items-start gap-2.5 transition-opacity ${state === "wait" ? "opacity-35" : "opacity-100"}`}>
                        <span className={`mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${state === "done" ? "border-accent bg-accent text-accent-ink" : state === "run" ? "border-accent text-accent" : "border-line text-faint"}`}>
                          {state === "done" ? "✓" : state === "run" ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> : ""}
                        </span>
                        <span>
                          <span className="text-ink">{c.label}</span>
                          <span className="block text-[11px] text-muted">{c.detail}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className={`mt-3 font-mono text-[12px] transition-opacity ${step >= resume.checklist.length ? "opacity-100" : "opacity-0"}`}>
                  <span className="text-accent">Ready</span> <span className="text-muted">— opening the PDF →</span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>, document.body) : null}
      </div>
    </div>
  );
}
