// Header, hero, capabilities, experience, footer. Every figure traces to a case
// in projects.ts, which traces to a production query, a ticket or a release.
// Figures re-derived 24 Sep 2026 (KNOWLEDGE/audit-2026-09-24); nothing here predates that pass.

export type Lens = {
  key: "pm" | "growth" | "pmm";
  title: string;
  /** What this reader is hiring for, in one line. */
  ask: string;
  /** The pitch, in one line. */
  pitch: string;
  /** Three cases to read first, by slug. */
  cases: { slug: string; title: string; figure: string }[];
  resumeHref: string;
  resumeLabel: string;
};

export const profile = {
  name: { first: "Sanskar", last: "Modi" },
  role: "Product Manager · Growth, Strategy & Go-to-Market",
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
    "Three years of product, growth and go-to-market in Indian B2B commerce and restaurant technology. At Badho I owned unit economics, the buyer app, pricing, and the channels that reached shopkeepers, through a business-model change and a pivot to our own warehouse and fleet. I write the positioning and the spec, run the launch, query the result, and build the product myself when nobody else can.",

  // Three facts a recruiter reads in the first five seconds.
  facts: ["3 yrs · product, growth & GTM", "B2B marketplaces · logistics · restaurant tech", "Team of 20 · B.Tech CS, IIIT Sonepat"],

  availability: "Open to Product Manager, Growth & Strategy PM, and Product Marketing Manager roles",

  // Three ways to read the same record. Each lens names what that reader is
  // hiring for, the one-line pitch, three cases to open first, and the resume
  // cut for that role. Same figures everywhere; only the emphasis moves.
  lenses: [
    {
      key: "pm",
      title: "Product Manager",
      ask: "Owns the number, the spec and the release.",
      pitch: "I defined the profit measure a marketplace ran on, wrote the operating plan for its pivot to an own warehouse and fleet, and merged every production release for a year.",
      cases: [
        { slug: "contribution-turnaround", title: "Contribution margin −77% → +10.6%", figure: "−77% → +10.6%" },
        { slug: "buyer-app-plg", title: "Registration completion by deleting steps", figure: "30% → 94%" },
        { slug: "jit-pivot", title: "Written plan to first delivery", figure: "11 days" },
      ],
      resumeHref: "/resume.pdf",
      resumeLabel: "Product Manager resume",
    },
    {
      key: "growth",
      title: "Growth & Strategy PM",
      ask: "Finds the arithmetic under a stalled metric and changes the model, not the copy.",
      pitch: "I built a WhatsApp channel from zero on a seven-cohort audience model, measured every retention scheme against repeat orders, and put the discount where the shopkeeper actually decides.",
      cases: [
        { slug: "whatsapp-channel", title: "WhatsApp as a channel", figure: "29,172 reached" },
        { slug: "pricing-experiments", title: "Four pricing experiments", figure: "AOV +10.7%" },
        { slug: "rewards-retention", title: "Every retention scheme measured", figure: "41% vs 14%" },
      ],
      resumeHref: "/resume-growth.pdf",
      resumeLabel: "Growth & Strategy resume",
    },
    {
      key: "pmm",
      title: "Product Marketing Manager",
      ask: "Positions the offer, prices it, writes the message and runs the launch.",
      pitch: "I wrote the templates that launched Badho Wholesale in Delhi and Gurugram, designed the twelve-message order journey in Hindi, sold a delivery service on the customer's own arithmetic, and ran a year of outbound for a kiosk company.",
      cases: [
        { slug: "jit-pivot", title: "The Delhi–Gurugram launch", figure: "20,116 / batch" },
        { slug: "order-communication", title: "Twelve messages, one call", figure: "17% vs 21%" },
        { slug: "ono-gtm", title: "A year of restaurant-tech go-to-market", figure: "118 accounts" },
      ],
      resumeHref: "/resume-pmm.pdf",
      resumeLabel: "Product Marketing resume",
    },
  ] as Lens[],

  // What I can own end to end. One capability, one number, one line, one case.
  capabilities: [
    {
      title: "Growth & product-led growth",
      proof: "Registration completion, by removing the screens after the OTP in two steps. The whole order flow onto one cart the day it shipped.",
      metric: "30% → 94%",
      href: "/work/buyer-app-plg",
    },
    {
      title: "Strategy & unit economics",
      proof: "Defined the contribution-margin model the marketplace ran on, then drove the fulfilment programme that took it positive in six months.",
      metric: "−77% → +10.6%",
      href: "/work/contribution-turnaround",
    },
    {
      title: "Channels & lifecycle messaging",
      proof: "Built WhatsApp from zero on a seven-cohort audience model: 29,172 shopkeepers brought into the app in a month at ₹6.43 each. Designed the twelve-message order journey in Hindi.",
      metric: "29,172",
      href: "/work/whatsapp-channel",
    },
    {
      title: "Pricing & positioning",
      proof: "Item-level quantity coupons with the margin on the card, the slab arithmetic behind the 'sabse sasta' claim, then a re-tune that cut coupon spend 45.7% with orders flat.",
      metric: "AOV +10.7%",
      href: "/work/pricing-experiments",
    },
    {
      title: "Launches & 0→1",
      proof: "Badho Wholesale from written plan to first delivery, on launch templates I wrote. A partner-brand channel from idea to first delivery in 17 days. A delivery service distributors book by the truck-day, 137 → 634 a month.",
      metric: "11 days",
      href: "/work/jit-pivot",
    },
    {
      title: "Go-to-market & the product behind it",
      proof: "A year of outbound for a kiosk company: 118 prospect accounts, 34 intro calls booked with the founder, the pricing architecture and commercials for seven brands. Then the kiosk product-managed, and a bakery app taken to App Store approval.",
      metric: "118 accounts",
      href: "/work/ono-gtm",
    },
  ],

  // The year at Badho, in five moments. Context for the cases, not a chart.
  timeline: [
    { when: "Oct 2025", title: "Joined Badho as Product Manager", body: "A B2B marketplace for kirana shops. Product, growth and engineering delivery reported in." },
    { when: "Feb 2026", title: "The marketplace changed its model", body: "Brand sellers shipping to shopkeepers by courier. I defined the contribution-margin model it would run on." },
    { when: "Jun 2026", title: "The brand marketplace's peak month, 26× its November orders", body: "Sign-up completion at 94% from mid-June, WhatsApp bringing 29,172 shopkeepers into the app, and contribution margin positive two months later." },
    { when: "Aug 2026", title: "Wrote the plan for our own warehouse and fleet", body: "One seller, one minimum, then none. Twelve steps from the 6 PM cutoff to the shop door." },
    { when: "Sep 2026", title: "First delivery eleven days after the plan", body: "Badho Wholesale live in Delhi and Gurugram, on its own vans, launched on WhatsApp templates I wrote." },
  ],

  skills: {
    product: ["Product strategy", "PRDs & specifications", "Roadmap prioritisation", "Release management", "Marketplace mechanics", "Experiment design"],
    growth: ["Growth & PLG", "Unit economics", "Pricing & incentives", "Cohort & retention analysis", "Attribution & incrementality", "WhatsApp Business API", "Lifecycle messaging"],
    marketing: ["Positioning & messaging", "Go-to-market strategy", "Product launches", "Pricing & packaging", "Customer segmentation", "Sales enablement", "Competitive analysis", "Hindi & Hinglish copy"],
    commercial: ["Partnerships", "Contract negotiation", "Enterprise accounts (India, Saudi Arabia)", "B2B SaaS", "FMCG distribution", "Logistics"],
    technical: ["SQL / PostgreSQL", "Metabase", "Jira", "Shopify", "TypeScript / React", "AI coding assistants", "Agent systems (Claude SDK, MCP)"],
  },

  experience: [
    {
      role: "Product Manager — Growth, Strategy & Go-to-Market",
      org: "Badho Technologies, Gurugram",
      period: "Oct 2025 – Sep 2026",
      bullets: [
        "Defined the contribution-margin model the marketplace ran on and drove the fulfilment programme that took it from −77% to +10.6% of order value, Feb to Aug 2026.",
        "Ran the buyer app's growth roadmap: registration completion 30% → 94% by removing the screens after the OTP, and the whole order flow onto one unified cart the day it shipped.",
        "Built the WhatsApp channel from zero on a seven-cohort audience model: 29,172 shopkeepers brought into the app in a month at ₹6.43 each. Designed the twelve-message order journey in Hindi.",
        "Owned discount design and the slab arithmetic behind the 'sabse sasta' claim: AOV ₹806 → ₹892 on flat daily actives; a re-tune then cut coupon spend 45.7% with orders flat.",
        "Joint product owner of a delivery service sold to our own distributors by the truck-day: 137 → 634 truck-days a month, ₹17.2 Cr of goods delivered, 53 paying distributors.",
        "Owned the operating model and the launch for the pivot to our own warehouse and fleet: written plan to first delivery in 11 days, on launch templates I wrote.",
        "Merged every production release of three apps for ten months, 202 releases and 826 pull requests, and wrote 489 tickets, the most in the company.",
      ],
    },
    {
      role: "Product Manager, Strategy & Growth",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Oct 2025 · Herfy and DOKA accounts through Aug 2026",
      bullets: [
        "Ran go-to-market: a funnel of 118 prospect accounts across 12 Indian cities and Riyadh, 34 prospects booked for intro calls with the founder, 26 POS and hardware partner conversations, 8 channels tested.",
        "Wrote the pricing architecture, subscription or ownership buyout per kiosk and per store, and the commercials for seven brands.",
        "Ran the Herfy account in Saudi Arabia: 79 live kiosks and three consecutive renewals.",
        "Product-managed DOKA, a nine-branch bakery's ordering app with a design-your-own-cake flow, from prototype to App Store approval.",
        "Single point of contact for Taco Bell India's 34 kiosks across 19 stores, with 16 weekly client reports on sales, order value and uptime.",
      ],
    },
    {
      role: "Growth & Partnerships Intern",
      org: "ONO Suite, Gurugram",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Outbound to restaurant and retail chains; demo booking; the lead database. Managed two to three interns from April."],
    },
    {
      role: "Founding Software Engineer",
      org: "Taxian, New Delhi",
      period: "Oct 2023 – Jun 2024",
      bullets: ["Shipped a Flutter app to the Play Store (500+ users); led a team of five."],
    },
    {
      role: "Software Developer — internships & freelance",
      org: "goblaq (US) · Quonectic (Canada) · OneAll Digital · Usurp tech",
      period: "2021 – 2023",
      bullets: ["Frontend and full-stack work alongside a B.Tech at IIIT Sonepat. Project team lead at OneAll Digital."],
    },
  ],

  education: [
    { degree: "B.Tech, Computer Science", school: "Indian Institute of Information Technology, Sonepat (mentor institute: IIT Delhi)", period: "2020 – 2024", note: "GPA 9.415 / 10" },
    { degree: "Class XII (ISC) · Class X (ICSE)", school: "City Montessori School, Lucknow", period: "", note: "" },
  ],
} as const;
