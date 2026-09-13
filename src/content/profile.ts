// Single source of truth for the header, hero, about, hire-me, experience and footer.
// Every figure here traces to the case studies in projects.ts, which in turn
// trace to Jira, Slack, commits, screen recordings or a production query.

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
    "Product manager for Indian commerce businesses. I find the arithmetic under a stalled metric, build the growth channel, price the product, sell it — and publish the number that survives an audit.",

  intro: [
    "Three years in Indian food and retail commerce, on both sides of it. At **ONO Suite** I priced, sold and delivered restaurant technology to QSR chains in India and Saudi Arabia — outbound, contracts, two enterprise accounts owned end to end. At **Badho** I ran product, growth and engineering delivery for a B2B marketplace selling wholesale groceries to kirana shopkeepers: a team of 20, three business models in eleven months, and I owned the operating model for the last one.",
    "How I work: before anything ships, what problem, for whom, and what number will tell us it worked. Every case on this page is written that way — including the ones where the number came back bad. A referral programme that captured 2%. A storefront that produced no orders. A channel I recommended stopping. They are here because a portfolio without failures is a portfolio you cannot trust.",
    "I build as well as specify. Two ordering products, a WhatsApp sales agent's first working version and two storefronts were mine, written with AI coding assistants. I ran WhatsApp as a channel at 25k–62k recipients per campaign, wrote the templates myself, and ran the release gate for three apps: 242 release versions, 805 of 1,613 pull requests merged.",
  ],

  // The roles I'm actually a fit for, each with the case that proves it.
  hire: [
    {
      role: "Growth PM",
      line: "Build a channel from nothing and measure it hard enough to know when to stop.",
      proof: "WhatsApp at ₹9.60 per install across 29,172 buyers, a seven-cohort audience model over 1.17M people, campaigns measured to the ledger — and the July report that said the channel lost money.",
      href: "/work/whatsapp-channel",
    },
    {
      role: "Founding / first PM",
      line: "Spec it, ship it, and build it myself when nobody else can.",
      proof: "489 specs, 805 of 1,613 PRs merged, 242 releases. Two ordering products and a WhatsApp agent's first version written with AI coding assistants; a partner-brand channel from idea to first delivery in 17 days.",
      href: "/work/buyer-app-plg",
    },
    {
      role: "B2B commerce & marketplace PM",
      line: "Find the arithmetic that is really suppressing the metric.",
      proof: "Retention was three per-brand minimums sitting in one cart. Naming it moved the company to become its own distributor; I owned the operating model, 12 days from charter to first delivery.",
      href: "/work/jit-pivot",
    },
    {
      role: "Logistics & unit-economics PM",
      line: "Take a loss-making order to contribution-positive.",
      proof: "Contribution per completed order −₹196 → +₹36, return-to-origin 42.6% → 21.4%, p90 delivery 28 → 10 days — freight made legible, courier claims automated, a returns stack against a 42% peak.",
      href: "/work/contribution-turnaround",
    },
    {
      role: "GTM & commercial",
      line: "Price it, pitch it, negotiate it, deliver it.",
      proof: "Authored a restaurant-tech company's pricing architecture, cold-pitched and signed a ~$7,000 app contract in Saudi Arabia, closed a renewal by conceding six of seven legal redlines, and took a delivery product to market for 128 distributors.",
      href: "/work/doka",
    },
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
      title: "I grow the product by subtraction first",
      href: "/work/buyer-app-plg",
      body: "Deleted the signup form and the OTP tap, derived language from location instead of a popup, cut the first-order minimum, and rewrote the notification programme around the finding that 89% of live carts sat below minimum order value.",
    },
    {
      title: "I sell and negotiate, not only specify",
      href: "/work/doka",
      body: "Cold-pitched a nine-branch bakery chain in Riyadh with a Figma prototype, priced the scope through three rounds, signed at ~$7,000 under Saudi law, and delivered the app to Apple's release approval with a two-person team.",
    },
  ],

  skills: {
    core: ["Product strategy", "PRDs & specs", "Unit economics", "Pricing", "Cohort analysis", "Attribution", "SQL / Postgres", "Release management", "Metabase", "Jira"],
    growth: ["WhatsApp Business API", "Meta template economics", "Campaign ops (AiSensy, Whatomate)", "CRM & lifecycle notifications", "Referral & cashback design", "Marketplace design", "Partnerships", "Contract negotiation", "Enterprise accounts (India, KSA)", "AI coding assistants"],
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
        "Built and ran the WhatsApp channel: campaigns at 25k–62k recipients, a seven-cohort model over 1.17M buyers, ₹9.60 per app install, templates authored under my own name, vendor migrated in-house — and recommended stopping the spend when July came in at 1.12× against a 13% take rate.",
        "Led buyer-app product-led growth: signup form and OTP tap removed, language from location, ₹300 first-order minimum, cart nudges, free-gifts engine, the 31-use-case notification programme. DAU peaked ~9.8k and orders hit 250+/day in June.",
        "Joint product owner of a delivery-as-a-service business sold to the distributors on our own marketplace: 4 → 43 seller businesses, ~4,100 bookings in 2026.",
        "#1 spec author — 489 of 1,585 tickets, 192 full PRDs. Ran the release gate: 242 versions of three apps, 805 of 1,613 pull requests merged.",
      ],
    },
    {
      role: "Product Manager, Founder's Office (part-time)",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Sep 2026",
      bullets: [
        "Authored the company's commercial and pricing architecture — subscription against an ownership buyout, priced per kiosk, per store and per chain — and the client commercials for seven QSR brands.",
        "Cold-pitched, scoped, negotiated, signed (~$7,000, Saudi law) and delivered DOKA Bakery House's ordering app, with a five-step build-your-own-cake configurator, to iOS release approval.",
        "Owned the Herfy account in Saudi Arabia single-handed: 79 live kiosks, three consecutive renewals, a withholding-tax dispute resolved at a 17.65% gross-up.",
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
