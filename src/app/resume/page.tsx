import type { Metadata } from "next";
import { ResumeSheet } from "@/components/ResumeSheet";
import { resume } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "One-page resume — identical to the PDF.",
};

export default function ResumePage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-5 pt-12 sm:pt-16">
        <p className="rise font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Resume · one page</p>
        <h1 className="rise mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[44px]" style={{ animationDelay: "80ms" }}>
          {resume.name.first} {resume.name.last}
        </h1>
        <p className="rise mt-4 max-w-2xl text-[16px] leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
          Identical to the PDF. Switch to the <em>ATS view</em> to see exactly what an applicant-tracking system reads.
        </p>
        <div className="rise mt-8" style={{ animationDelay: "240ms" }}>
          <ResumeSheet />
        </div>
      </div>
    </main>
  );
}
