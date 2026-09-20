import { Sheet } from "@/components/ResumeSheet";

// Print target for the PDF: the sheet alone, no nav, no footer.
// Generated with headless Chrome — see scripts/pdf.sh.
export const metadata = { title: "Resume (print)", robots: { index: false } };

export default function ResumePrintPage() {
  return (
    <div className="print-root mx-auto max-w-[210mm] bg-white text-black">
      <Sheet />
    </div>
  );
}
