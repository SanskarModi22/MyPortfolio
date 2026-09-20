"use client";

import { useState } from "react";
import { resume, resumeAsPlainText } from "@/content/resume";
import { Rich } from "./Rich";

type View = "web" | "ats";

function Head({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 border-b border-rule pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink first:mt-0">{children}</h3>;
}

// One column. Standard section names. The PDF is this same component printed.
export function Sheet() {
  const r = resume;
  return (
    <div className="sheet paper rounded-xl px-7 py-9 text-[12.5px] leading-[1.55] sm:px-11 sm:py-12">
      <div>
        <div className="text-[30px] font-bold leading-none tracking-tight sm:text-[34px]">{r.name.first} {r.name.last}</div>
        <div className="mt-2 text-[12.5px] font-medium text-ink">{r.title}</div>
        <div className="mt-1.5 text-[11.5px] text-muted">
          <a className="hover:text-accent" href={`mailto:${r.contact.email}`}>{r.contact.email}</a>
          <span className="mx-1.5 text-faint">·</span>{r.contact.phone}
          <span className="mx-1.5 text-faint">·</span>{r.contact.location}
          <span className="mx-1.5 text-faint">·</span><a className="hover:text-accent" href={r.contact.portfolio.href} target="_blank" rel="noreferrer">{r.contact.portfolio.label}</a>
          <span className="mx-1.5 text-faint">·</span><a className="hover:text-accent" href={r.contact.linkedin.href} target="_blank" rel="noreferrer">{r.contact.linkedin.label}</a>
          <span className="mx-1.5 text-faint">·</span><a className="hover:text-accent" href={r.contact.github.href} target="_blank" rel="noreferrer">{r.contact.github.label}</a>
        </div>
      </div>

      <Head>Summary</Head>
      <p>{r.summary}</p>

      <div className="mt-3 grid grid-cols-5 gap-2 print:mt-2">
        {r.headline.map((s) => (
          <div key={s.label} className="rounded-md border border-line bg-surface-2/60 px-2 py-1.5 print:bg-white">
            <div className="tnum font-mono text-[12px] font-semibold leading-tight text-ink">{s.value}</div>
            <div className="mt-0.5 text-[9.5px] leading-tight text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <Head>Experience</Head>
      {r.roles.map((role) => (
        <div key={role.title + role.date} className="mb-3.5 break-inside-avoid">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[13px] font-semibold text-ink">
              {role.title} <span className="font-normal text-muted">| {role.org}, {role.location}</span>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-muted">{role.date}</div>
          </div>
          <ul className="mt-1 space-y-0.5">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 text-muted">•</span>
                <span><Rich text={b} /></span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Head>Skills</Head>
      <ul className="space-y-0.5">
        {r.skills.map((s) => (
          <li key={s.head}><span className="font-semibold text-ink">{s.head}:</span> {s.body}</li>
        ))}
      </ul>

      <Head>Projects</Head>
      <ul className="space-y-0.5">
        {r.projects.map((p) => (
          <li key={p.head}><span className="font-semibold text-ink">{p.head}</span> — <Rich text={p.body} /></li>
        ))}
      </ul>

      <Head>Education</Head>
      {r.education.map((e) => (
        <div key={e.degree}>
          <span className="font-semibold text-ink">{e.degree}</span> | {e.school} <span className="text-muted">| {e.meta}</span>
        </div>
      ))}
    </div>
  );
}

export function ResumeSheet() {
  const [view, setView] = useState<View>("web");
  return (
    <div>
      <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Resume view" className="inline-flex rounded-lg border border-line bg-surface p-0.5 text-[13px]">
          {(["web", "ats"] as View[]).map((v) => (
            <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)} className={`rounded-md px-3.5 py-1.5 font-medium transition-colors ${view === v ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}>
              {v === "web" ? "Formatted" : "ATS plain text"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={resume.pdfHref} target="_blank" rel="noreferrer" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">Open the PDF</a>
          <a href={resume.pdfHref} download className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-rule">Download</a>
        </div>
      </div>

      {view === "web" ? (
        <Sheet />
      ) : (
        <div className="card overflow-hidden">
          <div className="border-b border-line px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">plain text · what a parser reads, in this order</div>
          <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-4 font-mono text-[12px] leading-[1.55] text-ink">{resumeAsPlainText()}</pre>
        </div>
      )}
    </div>
  );
}
