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
        body: "Retailers near the brand's distributors were not ordering. Built the app in an evening; real purchase orders two days later. **17 days idea to first delivery, 226 distributors mapped.**",
      },
      {
        head: "WhatsApp sales agent, first working version",
        meta: "1 Jul 2026 · one sitting",
        body: "Request handling, prompts, messaging, auth and a policy layer, with its handover doc, in one sitting. **Reported ₹11,690 of revenue it actually caused** where a looser definition allowed ₹3,98,065.",
      },
      {
        head: "Trial-combo storefront",
        meta: "2026 · failed experiment",
        body: "A storefront for low-price trial packs of unknown brands, no install, no verification before checkout. Built end to end; **produced no meaningful orders.**",
      },
    ],
  },

  summary:
    "Three years in Indian food and retail commerce, on both the merchant and the distribution side. Ran product, growth and engineering delivery for a team of 20 through a twenty-six-fold rise in monthly orders, the model change that followed when courier economics broke, and an AI team that put twenty systems into production. I name the number before we build, then query it afterwards and report what it says.",

  roles: [
    {
      title: "Product Manager | Badho Technologies, Gurugram",
      date: "Oct 2025 – Sep 2026",
      items: [
        { kind: "flat", text: "Product, growth, engineering delivery, QA and the AI pod across a team of 20. Monthly orders 219 → 5,784 over the tenure; 242 releases of three apps from one monorepo; #1 spec author, 489 of 1,585 tickets. Company wound down Sep 2026." },
        { kind: "sub", text: "Badho Wholesale (JIT pivot) — commission marketplace → own-warehouse distributor" },
        { kind: "leaf", text: "Named the blocker in numbers (three per-brand minimums on one cart), then owned the operating model: warehouse and software specification, minimums replaced by a flat delivery fee. **First order live in 12 days**; daily carts in the launch cities 4.5 to 45.5." },
        { kind: "sub", text: "Fulfilment economics — freight legibility, automated courier claims, a returns stack" },
        { kind: "leaf", text: "Two in five courier orders came back and every order lost money. Specified 34 of 42 fulfilment features: **return-to-origin 42.6% → 21.4%**, contribution per order **−₹196 → +₹126**, median delivery 10.2 → 6.1 days, p90 28.2 → 10.1. Return freight alone was **107% of the net loss**." },
        { kind: "sub", text: "WhatsApp channel — built, run and measured honestly" },
        { kind: "leaf", text: "Campaigns at 25k–62k recipients with per-send cost control, a seven-cohort model over 1.17M buyers, templates authored under my own name, vendor migrated in-house (₹0.145 → ₹0.115/msg); **₹9.60 per app install** across 29,172 buyers on same-day attribution. Recommended stopping the spend when July ROAS came in at 1.12× against a 13% take rate." },
        { kind: "sub", text: "Buyer app — made ordering easier, mostly by removing things" },
        { kind: "leaf", text: "Removed the signup form and the OTP tap, set language from the shop location, cut the first-order minimum to ₹300, and specified cart reminders, home tabs, a free-gifts engine, a support tab with a named relationship manager for **1.47M buyers**, and the 31-reason notification programme after finding **89% of open carts sat below the minimum**. Orders a week went 322 to 2,099 at the June peak; a team effort, stated as such." },
        { kind: "sub", text: "Pricing and rewards — four experiments, then the query" },
        { kind: "leaf", text: "Cart coupons, item-level quantity discounts, ₹1 trial products and a funded base-price cut. Queried from production afterwards: coupon usage **2.9% to 29.5%** of orders with conversion flat; gift-scheme qualifiers re-ordered next month at **50% against 19%**; a ₹4.57 Cr free-credit run was spent by **0.06%** of the buyers who got it; ₹1 first orders repeated 2–8 points less." },
        { kind: "sub", text: "DAAS — delivery as a service, sold to the distributors on our own marketplace" },
        { kind: "leaf", text: "Joint product owner: invoice photo to a 10–50 drop list, address locked per shop and geo-fence verified, routing without a helper in the truck, two-party handover codes, cash to the distributor's bank the same day. **Truck-days a month 137 to 634**, **17,174 deliveries** to 7,363 shops, **₹18.95 Cr of goods** and ₹21.5 L of fees for 60 paying distributors." },
        { kind: "sub", text: "AI programme and search — program-managed and specified" },
        { kind: "leaf", text: "Owned eleven epics for the four-person pod that shipped **20 production systems**; red-teamed the sales agent before launch; mandated model budget alerts. Specified vernacular search: **699,684 learned synonyms** on 32,536 roots." },
      ],
    },
    {
      title: "Product Manager, Founder's Office (part-time) | ONO Suite / DailyKit, Gurugram",
      date: "Jul 2024 – Sep 2026 · intern Jan – Jun 2024",
      items: [
        { kind: "flat", text: "Restaurant technology — self-ordering kiosks, ordering apps, POS integrations — for QSR chains in India and Saudi Arabia." },
        { kind: "leaf", text: "Wrote the company price list (subscription against an ownership buyout, per kiosk / store / chain) and commercials for seven brands; registered POS partnerships with GoFrugal and Petpooja. Owned the **Herfy** Saudi account single-handed: 79 kiosks, three renewals, a price rise closed conceding six of seven legal redlines, a withholding-tax dispute resolved at a 17.65% gross-up." },
        { kind: "leaf", text: "**Product manager for DOKA**, a bespoke ordering app for a nine-branch Riyadh bakery: two order flows, dine in, take away, scheduled delivery, and a **five-step cake configurator** (shape, flavour, colour, decoration, message on the cake) redrawn from **three angles** with live pricing, colour rendered dynamically instead of one image per combination. Cold-pitched it with a prototype, priced through three rounds, signed at **~$7,000** under Saudi law, mapped a **215-item** menu into their POS, and delivered to iOS release approval with one developer." },
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
