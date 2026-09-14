// The resume. The web view and the PDF are the same document, so keep them in sync.
// **bold** marks emphasis in the rendered view.

export type ResumeLeaf = { kind: "sub" | "leaf" | "flat"; text: string };
export type ResumeRole = { title: string; date: string; items: ResumeLeaf[] };
export type ResumeStat = { value: string; label: string };

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
        body: "Retailers near the brand's distributors were not ordering. Built the app in an evening; real purchase orders two days later. **17 days idea to first delivery, 226 distributors mapped.**",
      },
      {
        head: "WhatsApp sales agent, first working version",
        meta: "1 Jul 2026 · one sitting",
        body: "Request handling, prompts, messaging, auth and a policy layer, with a handover doc, in one sitting. **Reported ₹11,690 of revenue it actually caused** where a looser definition allowed ₹3,98,065.",
      },
      {
        head: "Trial-combo storefront",
        meta: "2026 · failed experiment",
        body: "Trial packs of unknown brands, no install, no verification before checkout. Built end to end; **produced no meaningful orders.**",
      },
    ],
  },

  // Tier one first: money and unit economics. Then the conversion steps. Nothing else.
  // Tier one first: money and unit economics. Then the one conversion step that matters.
  headline: [
    { value: "CM1 −26% → +11.5%", label: "contribution margin, Feb–Aug 2026" },
    { value: "46% → <1%", label: "delivery cost / order value" },
    { value: "12.7% → 19.4%", label: "commission taken" },
    { value: "₹13.7 L", label: "WhatsApp order value, same-day" },
    { value: "30% → 94%", label: "registration completion" },
  ] as ResumeStat[],

  summary:
    "Product manager in Indian B2B commerce. I pick the number that decides whether the business survives, move it, then query it and report what it says — including when the answer is unflattering. Product, growth and engineering delivery across a team of 20, two business-model changes in six months, and an AI pod that put twenty systems into production.",

  roles: [
    {
      title: "Program Manager, Engineering Delivery & Release | Badho Technologies, Gurugram",
      date: "Oct 2025 – Jan 2026",
      items: [
        { kind: "flat", text: "Hired to make engineering ship. Owned the release gate for three apps from one monorepo: **204 of 204 release merges** on the production branch, 242 versions from 7.153 to 8.255, and the release notes support ran on. **#1 spec author, 489 of 1,585 tickets**, 192 requirement docs. Ran QA, the Play Store side, and eleven epics for the four-person AI pod that shipped **20 production systems**. Bug inflow 114 → near zero monthly." },
      ],
    },
    {
      title: "Product Manager, Growth, PLG & Strategy | Badho Technologies, Gurugram",
      date: "Feb 2026 – Sep 2026",
      items: [
        { kind: "sub", text: "Unit economics — chose the metric, built the cascade, moved it" },
        { kind: "leaf", text: "No COGS to cascade from, so built it top-down: commission − discounts − delivery − marketing = CM1; support/brand-success = CM2; tech = CM3. Marketing sits above the line deliberately, since LTV could not amortise it. **CM1 −26.3% → +11.5% of order value**, in sequence: delivery **46% → <1%**, commission taken **12.7% → 19.4%**, discounts to 15.1% to buy growth then cut to **5.3%**. Return freight alone was **107% of the net loss**." },
        { kind: "sub", text: "Pricing and rewards — four experiments, then the query" },
        { kind: "leaf", text: "Cart coupons, item-level quantity discounts, ₹1 trial products, a funded base-price cut. Queried after: coupon usage **6.9% → 36.6%** of orders with conversion flat; a **37-minute config change cut item-coupon spend 45.7%** with no order loss. Built the discount-audit dashboard myself; its anomaly band surfaced **~₹81k** out of spec." },
        { kind: "sub", text: "Buyer app — made ordering easier, mostly by removing things" },
        { kind: "leaf", text: "Removed the signup form and the OTP tap: registration after phone verification **30% → 94%**, mid-form abandonment 21,064 per three weeks → 9. Language from shop location (wrong-language apps in non-Hindi states **38–46% → <1%**). Cart reminders, home tabs, a free-gift engine, a support tab with a named RM for **1.47M buyers**. Found our own DAU metric understating by **108%** and fixed it." },
        { kind: "sub", text: "WhatsApp channel — built, run and measured honestly" },
        { kind: "leaf", text: "Built and ran the channel: campaigns at 25k–62k recipients, **₹13.7 L of order value on the same-day rule** at **₹9.60 a buyer**, templates authored under my own name, vendor migrated in-house at ₹0.115/message. Recommended stopping the spend at 1.12x against 13% commission." },
        { kind: "sub", text: "DAAS — delivery as a service, sold to the distributors on our own marketplace" },
        { kind: "leaf", text: "Joint product owner: invoice photo to a 10–50 drop list, address locked per shop and geo-fence verified, two-party handover codes, cash to the distributor’s bank same day. **Truck-days a month 137 → 634** (3,016 total), **17,174 deliveries** to 7,363 shops, **₹18.95 Cr of goods**, ₹21.5 L of fees, 60 paying distributors." },
        { kind: "sub", text: "Badho Wholesale (JIT pivot) — commission marketplace → own-warehouse distributor" },
        { kind: "leaf", text: "Named the blocker in numbers (three per-brand minimums on one cart), then owned the operating model: warehouse and software spec, minimums replaced by a flat delivery fee. Plan to first delivery **12 days** (build started 29 Jul); of 81 orders in the 8 active days, **43 were packed and never dispatched** and only **6 of 19 own-fleet attempts arrived**." },
      ],
    },
    {
      title: "Product Manager, Founder's Office (part-time) | ONO Suite / DailyKit, Gurugram",
      date: "Jul 2024 – Sep 2026 · intern Jan – Jun 2024",
      items: [
        { kind: "flat", text: "Restaurant technology — self-ordering kiosks, ordering apps, POS integrations — for QSR chains in India and Saudi Arabia." },
        { kind: "leaf", text: "Wrote the company price list (subscription against an ownership buyout, priced per kiosk / store / chain) and the commercials for seven brands. Ran the Herfy account in Saudi single-handed: **79 live kiosks, three renewals**, a withholding-tax dispute settled at a 17.65% gross-up. Sole contact for Taco Bell India’s **34 kiosks across 19 malls**." },
        { kind: "leaf", text: "**Product manager for DOKA**, a bespoke ordering app for a nine-branch Riyadh bakery: dine-in, take-away, scheduled delivery, and a **five-step cake configurator** redrawn from three angles with live pricing. Cold-pitched it with a clickable prototype, priced through three rounds, signed at **~$7,000**, delivered to Apple approval with one developer." },
        { kind: "leaf", text: "Specified kiosk features — the offer-engine requirement (₹1-with-purchase, buy-one-get-N scaling) — and wrote the payload and webhook contract handed to POS vendors (POSIST, Petpooja, GoFrugal, Rista)." },
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
    { label: "All key figures present", detail: "−₹196 to +₹126 · ₹9.60 · 42.6% to 21.4% · 50% vs 19% re-order · 489 specs" },
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
