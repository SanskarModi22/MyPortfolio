// The resume. The web view and the PDF are the same document, so keep them in sync.
// **bold** marks emphasis in the rendered view.

export type ResumeLeaf = { kind: "sub" | "leaf" | "flat"; text: string };
export type ResumeRole = { title: string; date: string; items: ResumeLeaf[] };

export const resume = {
  name: { first: "Sanskar", last: "Modi" },
  subtitle: "Product Manager — Product, Growth & Go-to-market · B2B commerce, marketplaces, logistics, retail technology",
  contact: {
    email: "modisanskar5@gmail.com",
    phone: "+91-7905709124",
    portfolio: { label: "Portfolio", href: "https://sanskarmodi22.vercel.app" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/sanskar-modi-220a42151/" },
    github: { label: "GitHub", href: "https://github.com/SanskarModi22" },
  },
  pdfHref: "/resume.pdf",

  sidebar: {
    education: [
      { head: "B.Tech, Computer Science", body: "IIIT Sonepat · mentor institute: IIT Delhi · GPA 9.415 / 10", meta: "Jul 2020 – Jun 2024" },
    ],
    links: [
      { head: "Portfolio", body: "sanskarmodi22.vercel.app", href: "https://sanskarmodi22.vercel.app" },
      { head: "LinkedIn", body: "sanskar-modi-220a42151", href: "https://www.linkedin.com/in/sanskar-modi-220a42151/" },
      { head: "GitHub", body: "SanskarModi22", href: "https://github.com/SanskarModi22" },
    ],
    skills: [
      { head: "Product & growth", body: "Product strategy · PRDs · Roadmap prioritisation · Marketplace design · Pricing · Unit economics · Cohort segmentation · Funnel analysis · CAC and ROAS · Attribution" },
      { head: "GTM & commercial", body: "Go-to-market · Partnerships · Contract negotiation · Enterprise accounts (India, Saudi Arabia) · B2B SaaS · FMCG distribution · QSR · Logistics · WhatsApp Business API" },
      { head: "Technical", body: "SQL / PostgreSQL · Metabase · Python · TypeScript · React · Jira · Release management · AI coding assistants · Agent systems (Claude Agent SDK, MCP) · LLM cost governance" },
    ],
    projects: [
      {
        head: "MilkoReach — ordering app for a partner brand",
        meta: "2026 · built with an AI coding assistant",
        body: "Retailers near Kapila's distributors were not ordering. Built an assisted-ordering app in an evening; real purchase orders two days later. **Idea to first delivery in 17 days; 226 distributors mapped.**",
      },
      {
        head: "WhatsApp sales agent, first working version",
        meta: "1 Jul 2026 · one sitting",
        body: "Orchestrator, prompt layer, messaging, auth and policy engine, with a handover document. The AI pod made it production-grade from day three. **Reported ₹11,690 causal revenue** where a looser definition allowed ₹3,98,065.",
      },
      {
        head: "Trial-combo storefront",
        meta: "2026 · failed experiment",
        body: "A no-install, no-OTP storefront for low-price trial packs of unknown brands. Built end to end; **produced no meaningful orders.** Kept because the friction argument is sound and the result is honest.",
      },
    ],
  },

  summary:
    "Three years in Indian food and retail commerce, on both the merchant and the distribution side. Ran product, growth and engineering delivery for a team of 20 through a twenty-six-fold ramp in monthly orders, the pivot that followed when the courier model broke on unit economics, and an AI pod that put twenty agent systems into production. I define the value metric before we build, and I report the number that survives an audit.",

  roles: [
    {
      title: "Product Manager | Badho Technologies, Gurugram",
      date: "Oct 2025 – Sep 2026",
      items: [
        { kind: "flat", text: "Product, growth, engineering delivery, QA and the AI pod across a team of 20. Monthly orders 219 → 5,784 over the tenure; 242 releases of three apps from one monorepo; #1 spec author, 489 of 1,585 tickets. Company wound down Sep 2026." },
        { kind: "sub", text: "Badho Wholesale (JIT pivot) — commission marketplace → own-warehouse distributor" },
        { kind: "leaf", text: "Named the retention constraint in numbers (three per-brand minimums on one cart), then owned the operating model: warehouse and software specification, per-brand minimums replaced by a flat ₹75 fee waived above ₹500. **First order live in 12 days**; daily carts in the launch cities 4.5 → 45.5." },
        { kind: "sub", text: "Fulfilment economics — freight legibility, automated courier claims, a returns stack" },
        { kind: "leaf", text: "Two in five courier orders came back and every order lost money. Specified 34 of 42 fulfilment features: **return-to-origin 42.6% → 21.4%**, contribution per order **−₹196 → +₹36** (company P&L), median delivery 10.2 → 6.1 days, p90 28.2 → 10.1." },
        { kind: "sub", text: "WhatsApp acquisition — a channel built from nothing and measured honestly" },
        { kind: "leaf", text: "Seven-cohort exhaustive audience model over 1.17M buyers; **₹9.60 per app install** across 29,172 buyers on same-day attribution; template routing (~7× price gap) and in-house sending (₹0.145 → ₹0.115). Recommended stopping the spend when July ROAS came in at 1.12× against a 13% take rate." },
        { kind: "sub", text: "Delivery-as-a-Service (MOVE IT) — sold to the distributors on our own marketplace" },
        { kind: "leaf", text: "Joint product owner: OCR bill intake, two-party OTP handover, three-hop cash custody, pricing by vehicle class. Trips **259 → 438** quarter on quarter; seller businesses 4 → 43; ~4,100 bookings in 2026 at 73% completion." },
        { kind: "sub", text: "AI & agent programme — program-managed, not built" },
        { kind: "leaf", text: "Owned eleven epics for the four-person pod that shipped **20 production systems**; red-teamed the sales agent before launch; mandated per-model budget alerts. Specified vernacular search: **699,684 learned synonyms** on 32,536 roots." },
      ],
    },
    {
      title: "Product Manager, Founder's Office (part-time) | ONO Suite / DailyKit, Gurugram",
      date: "Jul 2024 – Sep 2026 · intern Jan – Jun 2024",
      items: [
        { kind: "flat", text: "Restaurant technology — self-ordering kiosks, ordering apps, POS integrations — for QSR chains in India and Saudi Arabia." },
        { kind: "leaf", text: "Authored the company pricing architecture (subscription vs ownership buyout, per kiosk / store / chain) and commercials for seven QSR brands; SPOC for a **34-kiosk Taco Bell India** estate with weekly client reporting." },
        { kind: "leaf", text: "Owned the **Herfy** Saudi account single-handed: 79 live kiosks, three renewals, a price rise closed while conceding six of seven legal redlines, a withholding-tax dispute resolved at a 17.65% gross-up." },
        { kind: "leaf", text: "Cold-pitched, scoped and signed **DOKA** (Riyadh, nine branches) at ~$7,000 under Saudi law; ran delivery to iOS release approval, incl. a five-step build-your-own-cake configurator over a 215-SKU menu." },
        { kind: "leaf", text: "Registered formal partnerships with GoFrugal and Petpooja; working relationships with Reelo, Razorpay, checkout.com, QueueBuster." },
      ],
    },
    {
      title: "Earlier — engineering",
      date: "2021 – Jun 2024",
      items: [
        { kind: "flat", text: "**Founding Software Engineer, Taxian** (Oct 2023 – Jun 2024): shipped a Flutter app to the Play Store reaching 500+ active users; led a team of five. Before that, full-stack and mobile development for clients in the USA, Canada and India; project team lead at OneAll Digital." },
      ],
    },
  ] as ResumeRole[],

  // Checks actually run on the PDF before publishing it.
  checklist: [
    { label: "Fits on one page", detail: "A4, nothing spills to a second page" },
    { label: "Reads cleanly as plain text", detail: "applicant-tracking systems get every line in order" },
    { label: "All key figures present", detail: "−₹196 → +₹36 · ₹9.60 · 42.6% → 21.4% · 12 days · 489 specs" },
    { label: "Links work", detail: "email · Portfolio · LinkedIn · GitHub" },
  ],
};

const strip = (s: string) => s.replace(/\*\*/g, "");

// What an ATS parser sees: the same content, in the PDF's reading order
// (whole sidebar, then the main column), with no formatting.
export function resumeAsPlainText(): string {
  const r = resume;
  const out: string[] = [];
  out.push(`${r.name.first} ${r.name.last}`, r.subtitle, `${r.contact.email} | ${r.contact.phone} | Portfolio | LinkedIn | GitHub`, "");
  out.push("EDUCATION");
  for (const e of r.sidebar.education) out.push(e.head, e.body, e.meta);
  out.push("", "LINKS");
  for (const l of r.sidebar.links) out.push(l.head, l.body);
  out.push("", "SKILLS");
  for (const s of r.sidebar.skills) out.push(s.head, s.body);
  out.push("", "PROJECTS");
  for (const p of r.sidebar.projects) out.push(p.head, p.meta, strip(p.body));
  out.push("", "SUMMARY", r.summary, "", "WORK EXPERIENCE");
  for (const role of r.roles) {
    out.push(`${role.title}  ${role.date}`);
    for (const it of role.items) out.push((it.kind === "leaf" ? "  ○ " : "• ") + strip(it.text));
  }
  return out.join("\n");
}
