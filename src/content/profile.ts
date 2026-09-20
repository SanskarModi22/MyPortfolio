// Header, hero, capabilities, experience, footer. Every figure traces to a case
// in projects.ts, which traces to a production query, a ticket or a release.

export const profile = {
  name: { first: "Sanskar", last: "Modi" },
  role: "Product Manager · Growth & Strategy",
  company: "ex-Badho · ONO Suite",
  email: "modisanskar5@gmail.com",
  phone: "+91-7905709124",
  location: "Lucknow · Gurugram",
  links: {
    linkedin: "https://www.linkedin.com/in/sanskar-modi-220a42151/",
    github: "https://github.com/SanskarModi22",
  },
  resumeHref: "/resume.pdf",

  headline: "I find the number that decides whether a business works, change the product to move it, and prove it in the data.",

  tagline:
    "Product manager in Indian B2B commerce. Growth, strategy and unit economics for a marketplace that grew 26× in orders, then the pivot that followed. I specify, ship, and build when nobody else can.",

  // Three facts a recruiter reads in the first five seconds.
  facts: ["3 yrs · product, growth & GTM", "B2B commerce · marketplaces · logistics · restaurant tech", "Team of 20 · two business-model changes · B.Tech CS, IIIT Sonepat"],

  // What I can be banked on for. One capability, one proof, one link.
  capabilities: [
    {
      title: "Growth & product-led growth",
      proof: "Registration completion 30% → 94% by deleting steps. 99% of order flow onto a unified cart in a week.",
      metric: "30% → 94%",
      href: "/work/buyer-app-plg",
    },
    {
      title: "Strategy & unit economics",
      proof: "Defined the contribution-margin cascade and took CM1 from −26% to +11.5% of order value in six months.",
      metric: "−26% → +11.5%",
      href: "/work/contribution-turnaround",
    },
    {
      title: "Acquisition channels",
      proof: "WhatsApp from zero to 29,172 buyers at ₹9.60 an install, on a seven-cohort audience model over 1.17 M people.",
      metric: "₹9.60 / install",
      href: "/work/whatsapp-channel",
    },
    {
      title: "Pricing & incentives",
      proof: "Item-level quantity coupons at ~8× on the incremental rupee. A ₹4.57 Cr credit run measured at 0.06% usage.",
      metric: "AOV +10.5%",
      href: "/work/pricing-experiments",
    },
    {
      title: "0→1 and go-to-market",
      proof: "A delivery service 137 → 634 truck-days a month. A partner-brand channel from idea to first delivery in 17 days.",
      metric: "10× bookings",
      href: "/work/move-it-daas",
    },
    {
      title: "Build the product",
      proof: "A self-ordering kiosk product across 19 Taco Bell stores — offers, flows, WhatsApp bills, loyalty, payments — plus a custom cake app and a partner ordering app I wrote myself.",
      metric: "₹4.19 Cr",
      href: "/work/ono-product",
    },
  ],

  skills: {
    product: ["Product strategy", "PRDs & specifications", "Roadmap prioritisation", "Release management", "Marketplace mechanics", "Experiment design"],
    growth: ["Growth & PLG", "Unit economics", "Pricing & incentives", "Cohort & retention analysis", "Attribution & incrementality", "WhatsApp Business API", "Lifecycle messaging"],
    commercial: ["Go-to-market", "Partnerships", "Contract negotiation", "Enterprise accounts (India, Saudi Arabia)", "B2B SaaS", "FMCG distribution", "Logistics"],
    technical: ["SQL / PostgreSQL", "Metabase", "Jira", "TypeScript / React", "AI coding assistants", "Agent systems (Claude SDK, MCP)"],
  },

  experience: [
    {
      role: "Product Manager — Growth, PLG & Strategy",
      org: "Badho Technologies, Gurugram",
      period: "Feb 2026 – Sep 2026",
      bullets: [
        "Designed the contribution-margin cascade the marketplace ran on; took CM1 from −26% to +11.5% of order value, positive from July.",
        "Owned the operating model for the pivot to own-warehouse distribution: written plan to first delivery in 12 days.",
        "Ran the buyer-app growth roadmap: registration completion 30% → 94%; 99% of order flow onto a unified cart in a week.",
        "Built the WhatsApp channel from zero: ₹9.60 per install across 29,172 buyers on a seven-cohort audience model over 1.17 M people.",
        "Joint product owner of a delivery service sold to our own distributors: 137 → 634 truck-days a month, ₹18.95 Cr of goods moved.",
      ],
    },
    {
      role: "Program Manager — Engineering Delivery & Release",
      org: "Badho Technologies, Gurugram",
      period: "Oct 2025 – Jan 2026",
      bullets: [
        "Owned the release gate for three apps: 242 versions, 805 of 1,613 code changes reviewed and shipped, every release signed off.",
        "Most-frequent specification author in the company: 489 of 1,585 tickets, 192 full requirement documents. Bug inflow 114 → near zero a month.",
      ],
    },
    {
      role: "Product Manager, Founder's Office (part-time)",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Sep 2026",
      bullets: [
        "Authored the pricing architecture (subscription vs ownership buyout, per kiosk / store / chain) and commercials for seven restaurant brands.",
        "Ran the Herfy account in Saudi Arabia: 79 live kiosks, three consecutive renewals, a withholding-tax dispute settled at a 17.65% gross-up.",
        "Cold-pitched, priced and delivered DOKA — a custom ordering app for a nine-branch Riyadh bakery — to Apple approval, at ~$7,000.",
        "Single point of contact for Taco Bell India's 34-kiosk estate across 19 malls, with weekly client reporting.",
      ],
    },
    {
      role: "Growth & Partnerships Intern",
      org: "ONO Suite, Gurugram",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Outbound to 60+ restaurant and retail brands; demo booking; lead database. Managed two junior interns from April."],
    },
    {
      role: "Founding Software Engineer",
      org: "Taxian, New Delhi",
      period: "Oct 2023 – Jun 2024",
      bullets: ["Shipped a Flutter app to the Play Store (500+ active users); led a team of five."],
    },
    {
      role: "Software Developer — internships & freelance",
      org: "goblaq (US) · Quonectic (Canada) · OneAll Digital · Usurp tech",
      period: "2021 – 2023",
      bullets: ["Frontend and full-stack work alongside a B.Tech at IIIT Sonepat. Project team lead at OneAll Digital."],
    },
  ],

  education: [{ degree: "B.Tech, Computer Science", school: "IIIT Sonepat (mentor institute: IIT Delhi)", period: "2020 – 2024", note: "GPA 9.415 / 10" }],
} as const;
