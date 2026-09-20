// The resume. One column, standard section names, verb-first bullets — the
// order an applicant-tracking system reads it in is the order a person does.
// **bold** marks emphasis in the rendered view and is stripped for plain text.
// Fits one A4 page when printed; the portfolio carries the depth.

export type ResumeRole = { title: string; org: string; location: string; date: string; bullets: string[] };
export type ResumeStat = { value: string; label: string };

export const resume = {
  name: { first: "Sanskar", last: "Modi" },
  title: "Product Manager | Growth, Strategy & Product-Led Growth | B2B Marketplaces, Logistics, Retail Technology",
  contact: {
    email: "modisanskar5@gmail.com",
    phone: "+91-7905709124",
    location: "Gurugram / Lucknow, India",
    portfolio: { label: "sanskarmodi22.vercel.app", href: "https://sanskarmodi22.vercel.app" },
    linkedin: { label: "linkedin.com/in/sanskar-modi-220a42151", href: "https://www.linkedin.com/in/sanskar-modi-220a42151/" },
    github: { label: "github.com/SanskarModi22", href: "https://github.com/SanskarModi22" },
  },
  pdfHref: "/resume.pdf",

  summary:
    "Product Manager with 3 years across growth, strategy and go-to-market in Indian B2B commerce. Defined the contribution-margin model a marketplace ran on and took CM1 from −26% to +11.5% of order value in six months; lifted registration completion from 30% to 94%; built a WhatsApp acquisition channel to 29,172 buyers at ₹9.60 per install; owned the operating model for a business-model pivot delivered in 12 days. Writes the spec, runs the release, queries the result, and builds the product when nobody else can.",

  headline: [
    { value: "−26% → +11.5%", label: "Contribution margin (CM1)" },
    { value: "30% → 94%", label: "Registration completion" },
    { value: "₹9.60", label: "Cost per app install" },
    { value: "42.6% → 21.4%", label: "Return-to-origin rate" },
    { value: "137 → 634", label: "Truck-days / month" },
  ] as ResumeStat[],

  skills: [
    { head: "Product", body: "Product Strategy, Product Requirements (PRD), Roadmap Prioritisation, Release Management, Experiment Design, Marketplace Mechanics, Agile / Jira" },
    { head: "Growth & Analytics", body: "Growth Strategy, Product-Led Growth (PLG), Unit Economics, Pricing & Incentives, Cohort & Retention Analysis, Funnel Analysis, Attribution & Incrementality, CAC / ROAS, SQL / PostgreSQL, Metabase" },
    { head: "Go-to-Market", body: "Go-to-Market Strategy, B2B SaaS, Partnerships, Contract Negotiation, Enterprise Accounts (India, Saudi Arabia), FMCG Distribution, Logistics, WhatsApp Business API, Lifecycle Messaging" },
    { head: "Technical", body: "TypeScript, React, Python, AI Coding Assistants, Agent Systems (Claude Agent SDK, MCP)" },
  ],

  roles: [
    {
      title: "Product Manager — Growth, PLG & Strategy",
      org: "Badho Technologies",
      location: "Gurugram",
      date: "Feb 2026 – Sep 2026",
      bullets: [
        "Designed the CM1/CM2/CM3 cascade for a B2B marketplace and took **CM1 from −26% to +11.5% of order value** in six months — delivery cost 46% → under 1%, discounts 15.1% → 5.3%, commission taken 12.7% → 19.4%.",
        "Drove the fulfilment programme: return-to-origin **42.6% → 21.4%**, fulfilment **22% → 64%** on 4× volume; specified 34 of 42 fulfilment features incl. automated courier weight-claim recovery (378 claims in 24 h).",
        "Owned the operating model for the pivot to own-warehouse distribution — warehouse and software spec, buyer mechanics, cutover: **written plan to first delivery in 12 days**; carts per day 4.5 → 45.5 once per-brand minimums came off.",
        "Ran the buyer-app growth roadmap: **registration completion 30% → 94%** by removing the signup form and OTP step; **99% of order flow onto a unified multi-seller cart in one week**, orders per active buyer +41%.",
        "Built the WhatsApp acquisition channel from zero — 7-cohort audience model over 1.17 M buyers, utility-template routing (~7× cheaper), in-house sender — to **29,172 buyers at ₹9.60 per install**; found and fixed the attribution bug that hid 78% of the channel's buyers.",
        "Shipped and measured four pricing experiments: item-level quantity coupons lifted **AOV +10.5% at ~8× on the incremental discount rupee**; a 37-minute config change cut coupon spend 45.7% with orders flat; built the discount-audit dashboard.",
        "Measured every retention scheme against repeat orders — gift qualifiers re-ordered at **50% vs 19%**; a ₹4.57 Cr credit run was used by 0.06%; referrals activated 6.7× better on 3.9× less GMV per signup — and re-pointed the budget.",
        "Joint product owner of a delivery-as-a-service business sold to our own distributors — truck-day pricing, invoice-photo order entry, two-party handover, same-day cash: **137 → 634 truck-days a month, 17,174 deliveries, ₹18.95 Cr of goods moved**.",
      ],
    },
    {
      title: "Program Manager — Engineering Delivery & Release",
      org: "Badho Technologies",
      location: "Gurugram",
      date: "Oct 2025 – Jan 2026",
      bullets: [
        "Owned the release gate for three apps from one monorepo: **242 versions, 805 of 1,613 pull requests merged, 204 of 204 release merges** on the production branch; monthly bug inflow 114 → near zero.",
        "Most-frequent specification author in the company — **489 of 1,585 tickets, 192 requirement documents**; program-managed 11 epics for the four-person AI team that put 20 production systems live.",
      ],
    },
    {
      title: "Product Manager, Founder's Office (part-time)",
      org: "ONO Suite / DailyKit",
      location: "Gurugram",
      date: "Jul 2024 – Sep 2026",
      bullets: [
        "Authored the pricing architecture — subscription vs ownership buyout, priced per kiosk, per store and per chain — and the commercials for seven restaurant brands including Herfy, Mad Over Donuts and Pizza Wings.",
        "Ran the Herfy account (Saudi Arabia) single-handed: **79 live kiosks, three consecutive renewals**, a price rise negotiated on absolute change, a 15% withholding-tax dispute settled at a 17.65% gross-up.",
        "Cold-pitched, priced and delivered DOKA Bakery House (Riyadh, nine branches) — a custom ordering app with a five-step cake configurator — **signed at ~$7,000 and approved for iOS release** with one developer.",
        "Sole contact for Taco Bell India's **34 kiosks across 19 malls** with weekly reporting; specified the offer engine and the POS integration contract (GoFrugal, Petpooja, POSIST, Rista); registered partnerships with GoFrugal, Petpooja and Razorpay.",
      ],
    },
    {
      title: "Earlier",
      org: "ONO Suite · Taxian · goblaq (US) · Quonectic (Canada) · OneAll Digital",
      location: "Delhi NCR / remote",
      date: "2021 – Jun 2024",
      bullets: [
        "**Growth & Partnerships Intern, ONO Suite** (Jan–Jun 2024): outbound to 60+ restaurant and retail brands; managed two interns. **Founding Software Engineer, Taxian** (Oct 2023–Jun 2024): shipped a Flutter app to the Play Store (500+ users), led five. **Software Developer**, internships and freelance (2021–23); project team lead at OneAll Digital.",
      ],
    },
  ] as ResumeRole[],

  projects: [
    { head: "MilkoReach — direct-to-retailer ordering app", body: "Built with an AI coding assistant in one evening; real purchase orders two days later. 17 days idea to first delivery; growth verified incremental (52 of 53 retailers dormant pre-launch)." },
    { head: "WhatsApp sales agent — first working version", body: "Request handling, prompts, messaging, auth and a policy layer — 3,127 lines with a handover document in one sitting; productionised by the AI team." },
    { head: "Discount-audit dashboard & courier cost model", body: "Flagged ₹60k of over-spec discounts; priced 3,534 shipments on billed rates to show the same traffic 40% cheaper." },
  ],

  education: [{ degree: "B.Tech, Computer Science", school: "Indian Institute of Information Technology (IIIT) Sonepat — mentor institute: IIT Delhi", meta: "2020 – 2024 · GPA 9.415 / 10" }],
};

const strip = (s: string) => s.replace(/\*\*/g, "");

// What an ATS parser sees: the same content, in reading order, no formatting.
export function resumeAsPlainText(): string {
  const r = resume;
  const out: string[] = [];
  out.push(`${r.name.first} ${r.name.last}`, r.title, `${r.contact.email} | ${r.contact.phone} | ${r.contact.location}`, `${r.contact.portfolio.label} | ${r.contact.linkedin.label} | ${r.contact.github.label}`, "");
  out.push("SUMMARY", r.summary, "");
  out.push("EXPERIENCE");
  for (const role of r.roles) {
    out.push(`${role.title} | ${role.org}, ${role.location} | ${role.date}`);
    for (const b of role.bullets) out.push(`- ${strip(b)}`);
    out.push("");
  }
  out.push("SKILLS");
  for (const s of r.skills) out.push(`${s.head}: ${s.body}`);
  out.push("", "PROJECTS");
  for (const p of r.projects) out.push(`${p.head} — ${strip(p.body)}`);
  out.push("", "EDUCATION");
  for (const e of r.education) out.push(`${e.degree} | ${e.school} | ${e.meta}`);
  return out.join("\n");
}
