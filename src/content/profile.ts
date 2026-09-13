// Single source of truth for the header, hero, about, experience and footer.
// Every figure here traces to the case studies in projects.ts, which in turn
// trace to Jira, Slack, commits or a production query. Nothing is estimated.

export const profile = {
  name: { first: "Sanskar", last: "Modi" },
  role: "Product · Growth · GTM",
  company: "ex-Badho · ONO Suite",
  companyUrl: "https://badho.in",
  email: "modisanskar5@gmail.com",
  phone: "+91-7905709124",
  links: {
    linkedin: "https://www.linkedin.com/in/sanskar-modi-220a42151/",
    github: "https://github.com/SanskarModi22",
    leetcode: "https://leetcode.com/modisanskar5/",
  },
  resumeHref: "/resume.pdf",

  tagline:
    "I run product and growth for Indian commerce businesses — B2B distribution at Badho, restaurant tech at ONO Suite — and I find the arithmetic under a stalled metric before anything goes on the roadmap.",

  intro: [
    "Three years in Indian food and retail commerce, on both sides of it. At **ONO Suite** I priced, sold and delivered self-ordering kiosks and ordering apps to restaurant chains in India and Saudi Arabia. At **Badho** I ran product, growth and engineering delivery for a B2B marketplace selling wholesale groceries to kirana shopkeepers — a team of 20, three business models in eleven months, and I owned the operating model for the last one.",
    "How I work: before anything ships, what problem, for whom, and what number will tell us it worked. Every case on this page is written that way — including the ones where the number came back bad. A referral programme that captured 2%. A storefront that produced no orders. A channel I recommended stopping. They are here because a portfolio without failures is a portfolio you cannot trust.",
    "I build as well as specify. Two ordering products and the first working version of a WhatsApp sales agent were mine, written with AI coding assistants. And I ran the release gate for three apps: 242 release versions, 805 of 1,613 pull requests merged.",
  ],

  // What genuinely differentiates the work. First person, no hedging.
  signals: [
    {
      title: "I find the arithmetic under the metric",
      href: "/work/jit-pivot",
      body: "Retention looked like a marketing problem for months. It was three per-brand minimum order values sitting in one cart — ₹300 of oil, rice and spices was a ₹900 basket blocked three times. Naming that in numbers is what moved the company to become its own distributor.",
    },
    {
      title: "I publish the number that survives an audit",
      href: "/work/whatsapp-channel",
      body: "Same-day attribution (2.60×) over a seven-day window that would have shown 5.22×. A note at the top of my own report explaining that 1.12× ROAS is a loss when you earn 13% of the value. Five dated instances across two companies of choosing the smaller true number.",
    },
    {
      title: "I define the value metric before we build",
      href: "/work/contribution-turnaround",
      body: "Return-to-origin was defined as returns ÷ (returns + delivered) before the returns stack shipped, then queried from production: 42.6% → 21.4%. Where I failed to do this — vernacular search — the page says so.",
    },
    {
      title: "I sell and negotiate, not only specify",
      href: "/work/restaurant-tech-gtm",
      body: "Authored a restaurant-tech company's pricing architecture, cold-pitched and signed a ~$7,000 international contract, and closed a renewal price rise by conceding six of seven legal redlines and holding the one that touched cash flow.",
    },
  ],

  skills: {
    core: ["Product strategy", "PRDs & specs", "Unit economics", "Pricing", "Cohort analysis", "Attribution", "SQL / Postgres", "Release management", "Metabase", "Jira"],
    growth: ["WhatsApp Business API", "Meta template economics", "Referral & cashback design", "Marketplace design", "Partnerships", "Contract negotiation", "Enterprise accounts (India, KSA)", "AI coding assistants"],
  },

  experience: [
    {
      role: "Product Manager — product, growth & delivery",
      org: "Badho Technologies, Gurugram",
      period: "Oct 2025 – Sep 2026",
      bullets: [
        "Hired to make engineering ship on time; scope grew to product, growth and the delivery business across a team of 20. Badho wound down in September 2026.",
        "Owned the operating model for the pivot from commission marketplace to own-warehouse distributor — 12 days from charter to first delivery; per-brand minimums replaced by a flat ₹75 fee waived above ₹500.",
        "Drove the fulfilment programme behind contribution per completed order moving −₹196 → +₹36 (Feb–Jul 2026): return-to-origin 42.6% → 21.4%, median delivery 10.2 → 6.1 days.",
        "Built the WhatsApp acquisition channel from nothing: ₹9.60 per app install across 29,172 buyers, reported on same-day attribution — and recommended stopping it when July came in at 1.12× against a 13% take rate.",
        "Joint product owner of a delivery-as-a-service business sold to the distributors on our own marketplace; trips 259 → 438 quarter on quarter.",
        "#1 spec author — 489 of 1,585 tickets, 192 full PRDs. Ran the release gate: 242 versions of three apps, 805 of 1,613 pull requests merged, monthly bug inflow 114 → near zero.",
      ],
    },
    {
      role: "Product Manager, Founder's Office (part-time)",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Sep 2026",
      bullets: [
        "Authored the company's commercial and pricing architecture — subscription against an ownership buyout, priced per kiosk, per store and per chain — and the client commercials for seven QSR brands.",
        "Owned the Herfy account in Saudi Arabia single-handed: 79 live kiosks, three consecutive renewals, a withholding-tax dispute resolved at a 17.65% gross-up.",
        "Cold-pitched, scoped, signed (~$7,000, Saudi law) and delivered DOKA Bakery House's ordering app to iOS release approval.",
        "Single point of contact for Taco Bell India's 34-kiosk estate across 19 malls; weekly client reporting. They renewed, then terminated — the case study says why.",
        "Registered formal partnerships with GoFrugal and Petpooja, plus Reelo, Razorpay, checkout.com and QueueBuster.",
      ],
    },
    {
      role: "Growth & Partnerships Intern",
      org: "ONO Suite, Gurugram",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Outbound sales development across 60+ restaurant and retail brands — cold email, LinkedIn and WhatsApp, demo booking, an Apollo.io lead base. Managed two junior interns from April 2024."],
    },
    {
      role: "Founding Software Engineer",
      org: "Taxian, New Delhi",
      period: "Oct 2023 – Jun 2024",
      bullets: ["Shipped a Flutter app to the Play Store reaching 500+ active users and led a team of five."],
    },
    {
      role: "Software Developer — internships & freelance",
      org: "goblaq (US) · Quonectic (Canada) · OneAll Digital · Usurp tech",
      period: "2021 – 2023",
      bullets: ["Frontend and full-stack work alongside a B.Tech at IIIT Sonepat; project team lead at OneAll Digital."],
    },
  ],

  education: [
    { degree: "B.Tech, Computer Science", school: "IIIT Sonepat (mentor institute: IIT Delhi)", period: "2020 – 2024", note: "GPA 9.415 / 10" },
  ],
} as const;
