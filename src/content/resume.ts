// The resume. One column, standard section names, verb-first bullets — the
// order an applicant-tracking system reads it in is the order a person does.
// **bold** marks emphasis in the rendered view and is stripped for plain text.
// Fits one A4 page when printed; the portfolio carries the depth.
//
// This is the Product Manager cut. Two further cuts of the same record exist as
// PDFs (built from KNOWLEDGE/career/cv/*.tex): Growth & Strategy and Product
// Marketing. Same figures, different emphasis. See `variants`.
// Figures re-derived 24 Sep 2026 (KNOWLEDGE/audit-2026-09-24).

export type ResumeRole = { title: string; org: string; location: string; date: string; bullets: string[] };
export type ResumeStat = { value: string; label: string };
export type ResumeVariant = { key: "pm" | "growth" | "pmm"; label: string; href: string; blurb: string };

export const resume = {
  name: { first: "Sanskar", last: "Modi" },
  title: "Product Manager | Growth, Strategy & Go-to-Market | B2B Marketplaces, Logistics, Retail Technology",
  contact: {
    email: "modisanskar5@gmail.com",
    phone: "+91-7905709124",
    location: "Gurugram / Lucknow, India",
    portfolio: { label: "sanskarmodi22.vercel.app", href: "https://sanskarmodi22.vercel.app" },
    linkedin: { label: "linkedin.com/in/sanskar-modi-220a42151", href: "https://www.linkedin.com/in/sanskar-modi-220a42151/" },
    github: { label: "github.com/SanskarModi22", href: "https://github.com/SanskarModi22" },
  },
  pdfHref: "/resume.pdf",

  variants: [
    { key: "pm", label: "Product Manager", href: "/resume.pdf", blurb: "The number, the spec and the release." },
    { key: "growth", label: "Growth & Strategy", href: "/resume-growth.pdf", blurb: "Channels, pricing, retention and the model underneath." },
    { key: "pmm", label: "Product Marketing", href: "/resume-pmm.pdf", blurb: "Positioning, pricing, messaging and launches." },
  ] as ResumeVariant[],

  summary:
    "Product Manager with 3 years across growth, strategy and go-to-market in Indian B2B commerce and restaurant technology. Defined the contribution-margin model a marketplace ran on and drove it from −77% to +10.6% of order value in six months; lifted registration completion from 30% to 94%; built a WhatsApp channel that brought 29,172 shopkeepers into the app in a month; owned the operating model for a business-model pivot from written plan to first delivery in 11 days. Writes the spec, runs the release, queries the result, and builds the product when nobody else can.",

  headline: [
    { value: "−77% → +10.6%", label: "Contribution margin (CM1)" },
    { value: "30% → 94%", label: "Registration completion" },
    { value: "29,172", label: "Shopkeepers reached in a month" },
    { value: "42.5% → 21.4%", label: "Return-to-origin rate" },
    { value: "137 → 634", label: "Truck-days / month" },
  ] as ResumeStat[],

  skills: [
    { head: "Product", body: "Product Strategy, Product Requirements (PRD), Roadmap Prioritisation, Release Management, Experiment Design, Marketplace Mechanics, Agile" },
    { head: "Growth & Analytics", body: "Growth Strategy, Product-Led Growth (PLG), Unit Economics, Pricing & Incentives, Cohort & Retention Analysis, Funnel Analysis, Attribution & Incrementality, CAC / ROAS, SQL / PostgreSQL, Metabase" },
    { head: "Go-to-Market", body: "Go-to-Market Strategy, Positioning & Messaging, Product Launches, Pricing & Packaging, Customer Segmentation, Lifecycle Messaging, WhatsApp Business API, B2B SaaS, Partnerships, Contract Negotiation, Enterprise Accounts (India, Saudi Arabia), FMCG Distribution, Logistics" },
    { head: "Technical", body: "TypeScript, React, Python, Shopify, AI Coding Assistants, Agent Systems (Claude Agent SDK, MCP)" },
  ],

  roles: [
    {
      title: "Product Manager — Growth, Strategy & Go-to-Market",
      org: "Badho Technologies",
      location: "Gurugram",
      date: "Oct 2025 – Sep 2026",
      bullets: [
        "Defined the contribution-margin model for a B2B marketplace and drove it from **−77% to +10.6% of order value** (Feb → Aug 2026): forward shipping cost carried 46% → under 1%, discounts 15.1% → 9.6%, commission taken 12.7% → 19.4%.",
        "Drove the fulfilment programme: return-to-origin **42.5% → 21.4%**, orders delivered **22% → 64%** on 4× volume (Feb → Jul); specified 34 of its 42 features and programme-managed the AI pod's courier weight-claim agent (378 claims in a day).",
        "Owned the operating model and launch for the pivot to own-warehouse distribution: **written plan to first delivery in 11 days**, launch templates written by me; average order in Delhi–Gurugram ₹860 → ₹1,201 on matched windows.",
        "Ran the buyer-app growth roadmap: **registration completion 30% → 94%** by removing the screens after the OTP in two steps; the whole order flow onto one multi-seller cart the day it shipped, orders per active buyer-day +38% that week.",
        "Built the WhatsApp channel from zero on a seven-cohort audience model over 1.17 M buyers: **29,172 shopkeepers brought into the app in June at ₹6.43 each**; found and fixed the attribution error that hid ~63% of the channel's buyers; designed the twelve-message order journey in Hindi.",
        "Shipped and measured four pricing experiments: item-level quantity coupons lifted **AOV ₹806 → ₹892 (+10.7%) on flat daily actives**; re-tuning the tiers then cut coupon spend 45.7% with orders flat; built the discount-audit dashboard.",
        "Measured every retention scheme against repeat orders: gift-ladder qualifiers re-ordered next month at **41% vs 14%**; a ₹4.6 Cr face-value credit run was measured (under ₹28 k ever spent); 1 in 4 referred shopkeepers ordered, against fewer than 1 in 100 other marketplace sign-ups.",
        "Joint product owner of a delivery-as-a-service business sold to our own distributors by the truck-day: **137 → 634 truck-days a month, 17,174 deliveries, ₹17.2 Cr of goods delivered**, 53 paying distributors.",
        "Merged every production release of three apps from one codebase, **202 releases and 826 pull requests**, and wrote **489 tickets, the most in the company**; programme-managed 9 epics for the AI pod, whose automations put 16 systems live.",
      ],
    },
    {
      title: "Product Manager, Strategy & Growth",
      org: "ONO Suite",
      location: "Gurugram",
      date: "Jul 2024 – Oct 2025",
      bullets: [
        "Ran go-to-market: a funnel of **118 prospect accounts across 12 Indian cities and Riyadh** reviewed weekly, **34 prospects booked for intro calls with the founder** (Mar–Jun 2024), ~83 external meetings in 2024, 26 POS and hardware partner conversations, 8 sales channels tested.",
        "Authored the pricing architecture, subscription vs ownership buyout priced per kiosk and per store, and the commercials for seven brands including Herfy, Mad Over Donuts and Pizza Wings.",
        "Ran the Herfy account (Saudi Arabia) single-handed through Aug 2026: **79 live kiosks, three consecutive renewals**, a price rise negotiated on absolute change, a USD 3.3 k withholding-tax shortfall recovered through the next contract.",
        "Product-managed DOKA Bakery House's ordering app (Riyadh, nine branches) from a prototype I pitched to **App Store approval** (Oct 2025): two order flows, a five-step design-your-own-cake configurator with live pricing, scheduled delivery, card and Apple Pay, Arabic and English.",
        "Product-managed the self-ordering kiosk, from the offer engine and dine-in/take-away flows to WhatsApp e-bills, loyalty and four POS integrations, and ran weekly reporting for Taco Bell India's franchisee on a **19-store, 34-kiosk estate that recorded ₹4.19 Cr of gross kiosk orders** in 2024.",
      ],
    },
    {
      title: "Earlier",
      org: "ONO Suite · Taxian · goblaq (US) · Quonectic (Canada) · OneAll Digital",
      location: "Delhi NCR / remote",
      date: "2021 – Jun 2024",
      bullets: [
        "**Growth & Partnerships Intern, ONO Suite** (Jan–Jun 2024): outbound to restaurant and retail chains; managed two to three interns. **Founding Software Engineer, Taxian** (Oct 2023–Jun 2024): shipped a Flutter app to the Play Store (500+ users), led five. **Software Developer**, internships and freelance (2021–23); project team lead at OneAll Digital.",
      ],
    },
  ] as ResumeRole[],

  projects: [
    { head: "MilkoReach, a direct-to-retailer ordering app", body: "Built with an AI coding assistant in one evening; the first real order on the channel's distributors a week later. 17 days idea to first delivery; 52 of 53 retailers dormant on Badho before launch." },
    { head: "WhatsApp sales agent, first working version", body: "Request handling, prompts, messaging, auth and a policy layer in one sitting, with the handover document; rebuilt by the AI pod into the live sales agent." },
  ],

  education: [{ degree: "B.Tech, Computer Science", school: "Indian Institute of Information Technology (IIIT) Sonepat, mentor institute IIT Delhi", meta: "2020 – 2024 · GPA 9.415 / 10" }],
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
