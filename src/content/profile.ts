// Header, hero, capabilities, experience, footer. Every figure traces to a case
// in projects.ts, which traces to a production query, a ticket or a release.

export const profile = {
  name: { first: "Sanskar", last: "Modi" },
  role: "Product Manager · Growth, Strategy & Unit Economics",
  company: "ex-Badho · ONO Suite",
  email: "modisanskar5@gmail.com",
  phone: "+91-7905709124",
  location: "Gurugram · Lucknow",
  links: {
    linkedin: "https://www.linkedin.com/in/sanskar-modi-220a42151/",
    github: "https://github.com/SanskarModi22",
  },
  resumeHref: "/resume.pdf",

  // The first sentence a reader sees. One outcome in words, one in a number.
  headline: "I took a B2B marketplace from losing money on every order to earning it, and lifted its sign-up completion from 30% to 94% by removing steps.",

  tagline:
    "Three years of product, growth and go-to-market in Indian B2B commerce. At Badho I owned unit economics, the buyer app and acquisition through a business-model change and a pivot to our own warehouse and fleet. I write the spec, run the release, query the result, and build the product myself when nobody else can.",

  // Three facts a recruiter reads in the first five seconds.
  facts: ["3 yrs · product, growth & GTM", "B2B marketplaces · logistics · restaurant tech", "Team of 20 · B.Tech CS, IIIT Sonepat"],

  availability: "Open to Product Manager roles",

  // What I can own end to end. One capability, one number, one line, one case.
  capabilities: [
    {
      title: "Growth & product-led growth",
      proof: "Registration completion, by deleting the sign-up form and the OTP tap. Then 99% of orders onto one cart within a week.",
      metric: "30% → 94%",
      href: "/work/buyer-app-plg",
    },
    {
      title: "Strategy & unit economics",
      proof: "Defined the contribution-margin cascade the marketplace ran on, then took CM1 positive in six months.",
      metric: "−26% → +11.5%",
      href: "/work/contribution-turnaround",
    },
    {
      title: "Acquisition channels",
      proof: "Built WhatsApp into an acquisition channel from zero: 29,172 buyers in a month, on a seven-cohort audience model.",
      metric: "₹9.60 / install",
      href: "/work/whatsapp-channel",
    },
    {
      title: "Pricing & incentives",
      proof: "Item-level quantity coupons on the same discount budget, about 8× on the incremental rupee. A ₹4.57 Cr credit scheme measured and stopped.",
      metric: "AOV +10.5%",
      href: "/work/pricing-experiments",
    },
    {
      title: "0→1 and go-to-market",
      proof: "A delivery service distributors book by the truck-day: 137 → 634 truck-days a month. A partner-brand channel, idea to first delivery in 17 days.",
      metric: "4.6× in 5 months",
      href: "/work/move-it-daas",
    },
    {
      title: "Build the product",
      proof: "Kiosk sales through the self-ordering product I owned, across 19 Taco Bell stores. Plus a cake-design app and a partner ordering app I wrote myself.",
      metric: "₹4.19 Cr",
      href: "/work/ono-product",
    },
  ],

  // The year at Badho, in five moments. Context for the cases, not a chart.
  timeline: [
    { when: "Oct 2025", title: "Joined Badho as Product Manager", body: "A B2B marketplace for kirana shops. Product, growth and engineering delivery reported in." },
    { when: "Feb 2026", title: "The marketplace changed its model", body: "Brand sellers shipping to shopkeepers by courier. I defined the contribution-margin cascade it would run on." },
    { when: "Jun 2026", title: "Peak month, 26× the orders of November", body: "Sign-up completion at 94%, WhatsApp at ₹9.60 an install, and CM1 positive the month after." },
    { when: "Aug 2026", title: "Wrote the plan for our own warehouse and fleet", body: "One seller, one minimum, then none. Twelve steps from the 6 PM cutoff to the shop door." },
    { when: "Sep 2026", title: "First delivery twelve days after the plan", body: "Badho Wholesale live in Delhi and Gurugram, on its own vans." },
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
      period: "Oct 2025 – Sep 2026",
      bullets: [
        "Defined the contribution-margin cascade the marketplace ran on and took CM1 from −26% to +11.5% of order value, positive from July.",
        "Ran the buyer app's growth roadmap: registration completion 30% → 94%, and 99% of orders onto one unified cart within a week.",
        "Built the WhatsApp acquisition channel from zero to 29,172 buyers in a month, at ₹9.60 per install.",
        "Joint product owner of a delivery service sold to our own distributors: 137 → 634 truck-days a month, ₹18.95 Cr of goods moved.",
        "Owned the operating model for the pivot to our own warehouse and fleet: written plan to first delivery in 12 days.",
        "Owned every release of three apps for a year, 242 versions, and cut monthly bug inflow from 114 to near zero.",
      ],
    },
    {
      role: "Product Manager, Strategy & Growth",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Oct 2025 · Herfy account through Aug 2026",
      bullets: [
        "Ran go-to-market: a funnel of 118 restaurant chains across seven cities, 57 companies met in 2024, 37 introductory calls booked for the founder.",
        "Wrote the pricing architecture, subscription or ownership buyout per kiosk, store and chain, and the commercials for seven restaurant brands.",
        "Ran the Herfy account in Saudi Arabia: 79 live kiosks and three consecutive renewals.",
        "Product-managed DOKA, a nine-branch bakery's ordering app with a design-your-own-cake flow, from prototype to App Store approval.",
        "Single point of contact for Taco Bell India's 34 kiosks across 19 malls, with a weekly client report.",
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
