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
    "Product manager in Indian commerce. I pick the number that decides whether the business survives, change the product to move it, and then go back to the database and check.",

  intro: [
    "One piece of context first, because it sets the scale of everything below. Badho's buyer app ran a local-seller marketplace until **February 2026, when that model was switched off** and replaced with an intercity one: brands shipping to shops by courier across the country. Almost none of the old buyer base came with it, **235 of 140,715**, so the new business was built from close to nothing. It went from **74 orders in January 2026 to 7,198 in June**, peaked at about ₹49 lakh of orders in a month, and ran on 12 sellers growing to 31. Every figure on this page is that business, or the warehouse model that replaced it in September. Small numbers built fast, and I would rather you read them that way than guess.",
    "Three years in Indian food and retail commerce, on both sides of it. At **ONO Suite** I priced, sold and delivered restaurant technology to chains in India and Saudi Arabia: self-ordering kiosks, QR ordering at the table, ordering apps, and a bespoke app for a Riyadh bakery where the customer designs their own cake. At **Badho** I ran product, growth and engineering delivery for a marketplace selling wholesale groceries to kirana shops. Team of twenty, three business models in eleven months, and I owned the operating model for the last one.",
    "The way I work is the same every time. Choose the number that decides whether the business lives, change one thing, then go back to the database and read what happened. At Badho that number was CM1, contribution margin after discounts, delivery and marketing, and it went from −26% of order value to +11.5% in six months. That last step is why the cases on this page carry results that were not flattering. Coupon usage went from 7% to 37% of orders and conversion did not move. Half a million buyers were credited ₹75 and 342 of them spent it. Buyers whose first order contained a ₹1 item came back less often, not more.",
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
      role: "Unit economics and logistics",
      line: "Choose the number that decides survival, then move it.",
      proof: "Built the contribution-margin cascade for a marketplace with no cost of goods and took CM1 from −26% of order value to **+11.5%** in six months. Delivery cost 46% of order value to under 1%, commission taken 12.7% to 19.4%, parcels returned to origin 42.6% to 21.4%, slowest tenth of deliveries 28 days to 10.",
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
      title: "I choose the number the business gets judged on",
      href: "/work/jit-pivot",
      body: "Retention looked like a marketing problem for months. It was three per-brand minimums in one cart: ₹300 each of oil, rice and spices is a ₹900 basket blocked three separate times. Putting that in numbers is what changed the company's model.",
    },
    {
      title: "I go back and check whether it worked",
      href: "/work/rewards-retention",
      body: "I found that our own daily-actives metric was understating itself by 108%, because one predicate silently dropped every buyer with no business name, and the missing names were the side effect of my own signup change. I queried four reward programmes against repeat orders. Gift qualifiers re-ordered at nearly three times the rate of everyone else. A ₹4.57 crore credit run was used by 0.06% of the people who got it. And returns were quietly switching the gift scheme off: 74 buyers in one month were denied a reward by a parcel coming back.",
    },
    {
      title: "I publish the figure that survives an audit",
      href: "/work/whatsapp-channel",
      body: "Same-day attribution at 2.60× over a seven-day window that would have read 5.22×. Two orders worth ₹5.6 lakh thrown out of my own daily report because the buyers had nothing to do with the campaign. And three independent counts of the same channel: the tracking link said 1,321 buyers, my hand-built matching said 19,534, and the app's own session data later said 18,782. A note at the top explaining that 1.12× is a loss when you keep 13% of the value.",
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
      role: "Program Manager – engineering delivery and release",
      org: "Badho Technologies, Gurugram",
      period: "Oct 2025 – Jan 2026",
      bullets: [
        "Hired to make engineering ship on time. Scope grew to product, growth and the delivery business across a team of twenty. The company closed in September 2026.",
        "Wrote more specifications than anyone in the company: 489 of 1,585 tickets, 192 full requirement documents. Ran the release gate for three apps: 242 versions, 805 of 1,613 pull requests.",
      ],
    },
    {
      role: "Product Manager – growth, product-led growth and strategy",
      org: "Badho Technologies, Gurugram",
      period: "Feb 2026 – Sep 2026",
      bullets: [
        "Designed the contribution-margin cascade the marketplace was run on, and took **CM1 from −26% of order value to +11.5%** between February and August 2026, positive from July. Delivery cost fell from 46% of order value to under 1%, commission taken rose 12.7% to 19.4%, parcels returned to origin fell 42.6% to 21.4% and median delivery 10.2 to 6.1 days.",
        "Owned the operating model when we stopped taking commission and started buying, storing and delivering our own stock: twelve days from written plan to first delivery, and per-brand minimums replaced by one flat fee.",
        "Ran the buyer-app changes that made ordering easier. Removing the signup form and an OTP tap took registration after phone verification from **30% to 94%**, and I later found it had broken our own daily-actives metric, which was understating itself by 108% by August because the missing shop names were being dropped by a null-unsafe filter. with mid-form abandonment falling from 21,064 people in three weeks to 9. Language set from the shop location cut wrong-language apps in non-Hindi states from 38-46% to under 1%. A lower first-order minimum, cart reminders, home tabs, free gifts, and a support tab with a named relationship manager for 1.47 million buyers. The honest half: the share of installs reaching a first order still fell, 2.52% to 1.43%.",
        "Shipped four pricing experiments and then queried them: coupon usage went from 7% to 37% of orders with conversion flat, and a 37-minute configuration change later cut item-coupon spend 45.7% without losing a single order; gift-scheme qualifiers re-ordered at three times the rate of everyone else.",
        "Built and ran WhatsApp as a channel after measuring that push was failing: of 11.76 million notifications queued, 8.8% were confirmed delivered and 58% were never attempted. Campaigns of 25,000 to 62,000 recipients, ₹9.60 per app install across 29,172 buyers, approved templates written under my own name, a vendor replaced with our own platform at ₹0.115 a message. Also specified the 12 order-status templates, one message per order per stage. Recommended stopping the campaign spend when July came in at 1.12× against 13% commission.",
        "Joint product owner of DAAS, the delivery-as-a-service business sold to the distributors on our own marketplace: truck-days booked a month went 137 to 634, 3,016 in all, 17,174 deliveries of 20,231 attempted to 7,363 shops, ₹18.95 crore of goods moved and ₹21.5 lakh of fees from 60 paying distributors.",
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
