import type { Metadata } from "next";
import { ResumeSheet } from "@/components/ResumeSheet";
import { resume } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "One page. The same record as the PDF cuts. ATS view shows exactly what a parser reads.",
};

export default function ResumePage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-5 pt-10 sm:pt-14">
        <p className="rise font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">Resume · one page</p>
        <h1 className="rise mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[40px]" style={{ animationDelay: "80ms" }}>
          {resume.name.first} {resume.name.last}
        </h1>
        <p className="rise mt-3 max-w-2xl text-[15px] leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
          The Product Manager cut, with every figure re-derived from production. The PDFs below are the same record condensed to one page each, for three roles. Switch to <em>ATS plain text</em> to see exactly what an applicant-tracking system reads, in the order it reads it.
        </p>
        <div className="rise mt-7" style={{ animationDelay: "240ms" }}>
          <ResumeSheet />
        </div>
      </div>
    </main>
  );
}
