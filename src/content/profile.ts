// Single source of truth for the header, hero, about, hire-me, experience and footer.
// Every figure traces to a case study in projects.ts, which in turn traces to a
// Jira ticket, a release branch, a Slack post, a recording or a production query.

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
    "Product manager in Indian commerce. I find the number that is actually blocking the business, change the product to move it, and then check whether it moved.",

  intro: [
    "Three years in Indian food and retail commerce, on both sides of it. At **ONO Suite** I priced, sold and delivered restaurant technology to chains in India and Saudi Arabia: self-ordering kiosks, QR ordering at the table, ordering apps, and a bespoke app for a Riyadh bakery where the customer designs their own cake. At **Badho** I ran product, growth and engineering delivery for a marketplace selling wholesale groceries to kirana shops. Team of twenty, three business models in eleven months, and I owned the operating model for the last one.",
    "The way I work is the same every time. Name the problem in numbers, change one thing, then go back to the database and read what happened. That last step is why the cases on this page carry results that were not flattering. Coupon usage went from 3% to 30% of orders and conversion did not move. Half a million buyers were credited ₹75 and 342 of them spent it. Buyers whose first order contained a ₹1 item came back less often, not more.",
    "I build things too. Two ordering products, the first working version of a WhatsApp sales agent and two web storefronts were mine, written with AI coding assistants. I ran WhatsApp as a channel at 25,000 to 62,000 recipients a campaign and wrote the approved templates myself. And I ran the release gate for three apps: 242 versions, 805 of 1,613 pull requests, and the release notes that told support what had changed.",
  ],

  // The roles I am a fit for, each with the case that shows it.
  hire: [
    {
      role: "Growth product manager",
      line: "Build the channel, then measure it honestly enough to know when to stop.",
      proof: "WhatsApp at ₹9.60 per install across 29,172 buyers, an audience model over 1.17 million people, campaigns followed to the order book, and the July report that said the channel was losing money. I started it because I had measured push: 81.77 million sends bought 130,000 opens.",
      href: "/work/whatsapp-channel",
    },
    {
      role: "Pricing and incentives",
      line: "Decide where the discount goes, and check what it bought.",
      proof: "Cart coupons, item-level quantity discounts, ₹1 trial products and a funded cut in the base price, shipped in order and queried afterwards. Then I built the tool to audit my own discounts, and it found 43% of one month’s coupon orders discounting above what the configuration allowed. Gift qualifiers re-ordered at three times the rate of everyone else; ₹1 first orders came back less often.",
      href: "/work/pricing-experiments",
    },
    {
      role: "B2B commerce and marketplace",
      line: "Find the thing that is really stopping the order.",
      proof: "Retention was three per-brand minimums sitting in one cart. Naming that moved the company to buying and delivering its own stock, and I owned the operating model: twelve days from written plan to first delivery.",
      href: "/work/jit-pivot",
    },
    {
      role: "Logistics and unit economics",
      line: "Take a loss-making order to a profitable one.",
      proof: "Contribution per order from −₹196 to +₹36, parcels returned to origin from 42.6% to 21.4%, slowest tenth of deliveries from 28 days to 10. Freight made visible, courier overcharges recovered automatically.",
      href: "/work/contribution-turnaround",
    },
    {
      role: "Founding or first product hire",
      line: "Specify it, ship it, and build it myself when nobody else can.",
      proof: "489 specifications, 805 of 1,613 pull requests merged, 242 releases. Two ordering products and a WhatsApp agent's first version written with AI coding assistants. A discount-audit dashboard and a courier cost model I wrote myself, and a partner-brand channel from idea to first delivery in seventeen days.",
      href: "/work/buyer-app-plg",
    },
    {
      role: "Go-to-market and commercial",
      line: "Price it, pitch it, negotiate it, deliver it.",
      proof: "Wrote a restaurant-tech company's price list, cold-pitched and signed a $7,000 app contract in Saudi Arabia with a prototype, closed a renewal by conceding six of seven legal redlines, and took DAAS, a delivery service, to market for the distributors already on our marketplace.",
      href: "/work/doka",
    },
  ],

  // What is different about the work. First person, no hedging.
  signals: [
    {
      title: "I find the number that is actually blocking things",
      href: "/work/jit-pivot",
      body: "Retention looked like a marketing problem for months. It was three per-brand minimums in one cart: ₹300 each of oil, rice and spices is a ₹900 basket blocked three separate times. Putting that in numbers is what changed the company's model.",
    },
    {
      title: "I go back and check whether it worked",
      href: "/work/rewards-retention",
      body: "I queried four reward programmes against repeat orders. Gift qualifiers re-ordered at nearly three times the rate of everyone else. A ₹4.57 crore credit run was used by 0.06% of the people who got it. And returns were quietly switching the gift scheme off: 74 buyers in one month were denied a reward by a parcel coming back.",
    },
    {
      title: "I publish the figure that survives an audit",
      href: "/work/whatsapp-channel",
      body: "Same-day attribution at 2.60× over a seven-day window that would have read 5.22×. Two orders worth ₹5.6 lakh thrown out of my own daily report because the buyers had nothing to do with the campaign. A note at the top explaining that 1.12× is a loss when you keep 13% of the value.",
    },
    {
      title: "I sell and negotiate, not only specify",
      href: "/work/doka",
      body: "Cold-pitched a nine-branch bakery chain in Riyadh with a clickable prototype, priced the scope through three rounds, signed at about $7,000 under Saudi law, and delivered the app to Apple's approval with a team of two.",
    },
  ],

  skills: {
    core: ["Product specifications", "Release management", "Unit economics", "Pricing", "Cohort and retention analysis", "Attribution", "SQL and Postgres", "Metabase", "Jira", "Requirement documents"],
    growth: ["WhatsApp Business API", "Template cost control", "Campaign operations", "Lifecycle notifications", "Referral and cashback design", "Marketplace mechanics", "POS integrations", "Contract negotiation", "Enterprise accounts in India and Saudi Arabia", "AI coding assistants"],
  },

  experience: [
    {
      role: "Product Manager — product, growth and delivery",
      org: "Badho Technologies, Gurugram",
      period: "Oct 2025 – Sep 2026",
      bullets: [
        "Hired to make engineering ship on time. Scope grew to product, growth and the delivery business across a team of twenty. The company closed in September 2026.",
        "Owned the operating model when we stopped taking commission and started buying, storing and delivering our own stock: twelve days from written plan to first delivery, and per-brand minimums replaced by one flat fee.",
        "Drove the fulfilment programme behind contribution per order moving from −₹196 to +₹36: parcels returned to origin from 42.6% to 21.4%, median delivery from 10.2 to 6.1 days.",
        "Built and ran WhatsApp as a channel after measuring that push was failing: of 11.76 million notifications queued, 8.8% were confirmed delivered and 58% were never attempted. Campaigns of 25,000 to 62,000 recipients, ₹9.60 per app install across 29,172 buyers, approved templates written under my own name, a vendor replaced with our own platform at ₹0.115 a message. Also specified the 12 order-status templates, one message per order per stage. Recommended stopping the campaign spend when July came in at 1.12× against 13% commission.",
        "Ran the buyer-app changes that made ordering easier. Removing the signup form and an OTP tap took registration after phone verification from **30% to 94%**, with mid-form abandonment falling from 21,064 people in three weeks to 9. Language set from the shop location cut wrong-language apps in non-Hindi states from 38-46% to under 1%. A lower first-order minimum, cart reminders, home tabs, free gifts, and a support tab with a named relationship manager for 1.47 million buyers. The honest half: the share of installs reaching a first order still fell, 2.52% to 1.43%.",
        "Shipped four pricing experiments and then queried them: coupon usage went from 3% to 30% of orders with conversion flat; gift-scheme qualifiers re-ordered at three times the rate of everyone else.",
        "Joint product owner of DAAS, the delivery-as-a-service business sold to the distributors on our own marketplace: truck-days booked a month went 137 to 497 over five months, 13,801 deliveries, ₹10.95 crore of goods moved for 48 paying distributors.",
        "Wrote more specifications than anyone in the company: 489 of 1,585 tickets, 192 full requirement documents. Ran the release gate for three apps: 242 versions, 805 of 1,613 pull requests.",
      ],
    },
    {
      role: "Product Manager, Founder's Office (part-time)",
      org: "ONO Suite / DailyKit, Gurugram",
      period: "Jul 2024 – Sep 2026",
      bullets: [
        "Product manager for DOKA, a bespoke ordering app for a nine-branch Riyadh bakery: two order flows, dine in, take away, scheduled delivery, and a five-step configurator where the customer picks shape, flavour, colour, decoration and the message on the cake and sees it redrawn from three angles with the price updating.",
        "Cold-pitched that app with a clickable prototype, priced the scope through three rounds, signed it at about $7,000 under Saudi law, and delivered it to Apple's release approval with one developer.",
        "Specified features across the kiosk product: the offer engine requirement, combo and modifier rules, WhatsApp bill messages, and the integration contract handed to point-of-sale vendors.",
        "Wrote the company's price list — subscription against an ownership buyout, priced per kiosk, per store and per chain — and the commercials for seven restaurant brands.",
        "Ran the Herfy account in Saudi Arabia single-handed: 79 live kiosks, three renewals, and a withholding tax dispute resolved at a 17.65% gross-up.",
        "Single point of contact for Taco Bell India's 34 kiosks across 19 malls, with the weekly client report. They renewed, then terminated, and the case study says why.",
      ],
    },
    {
      role: "Growth & Partnerships Intern",
      org: "ONO Suite, Gurugram",
      period: "Jan 2024 – Jun 2024",
      bullets: ["Outbound sales development across 60+ restaurant and retail brands: cold email, LinkedIn and WhatsApp, booking demos, a lead database. Managed two junior interns from April 2024."],
    },
    {
      role: "Founding Software Engineer",
      org: "Taxian, New Delhi",
      period: "Oct 2023 – Jun 2024",
      bullets: ["Shipped a Flutter app to the Play Store reaching 500+ active users and led a team of five."],
    },
    {
      role: "Software Developer — internships and freelance",
      org: "goblaq (US) · Quonectic (Canada) · OneAll Digital · Usurp tech",
      period: "2021 – 2023",
      bullets: ["Frontend and full-stack work alongside a B.Tech at IIIT Sonepat. Project team lead at OneAll Digital."],
    },
  ],

  education: [
    { degree: "B.Tech, Computer Science", school: "IIIT Sonepat (mentor institute: IIT Delhi)", period: "2020 – 2024", note: "GPA 9.415 / 10" },
  ],
} as const;
