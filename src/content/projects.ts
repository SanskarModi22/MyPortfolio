// Portfolio content. Every figure traces to a production query, a Jira ticket,
// a release tag, a Slack post or a recording. Where a number is the company's
// reporting rather than my own measurement, the scope line says so.

export type Theme = "Growth" | "Strategy" | "Product" | "Pricing" | "Go-to-market" | "Unit economics" | "Built it myself";

export type Metric = { value: string; label: string; note?: string };

export type FlowKind = "problem" | "diagnosis" | "decision" | "outcome" | "step";
export type FlowNode = { kind: FlowKind; title: string; body: string };

export type ScreenKind = "phone" | "kiosk" | "desktop" | "photo";
export type Screen = { src: string; kind: ScreenKind; alt: string; caption: string; tag?: "before" | "after" };

export type Project = {
  slug: string;
  title: string;
  /** One line. What the case is. */
  short: string;
  /** One line. What I owned. */
  lede: string;
  tier: 1 | 2;
  themes: Theme[];
  period: string;
  stack: string[];
  headline: Metric[];
  flow: FlowNode[];
  changes: string[];
  screens?: Screen[];
  /** Card thumbnail on the home page; defaults to the first screen. */
  cover?: Screen;
  metrics?: Metric[];
  scope: string;
  takeaways?: string[];
  links?: { label: string; href: string }[];
};

export const THEMES: Theme[] = ["Growth", "Strategy", "Product", "Pricing", "Go-to-market", "Unit economics", "Built it myself"];

export const projects: Project[] = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: "contribution-turnaround",
    title: "Took a marketplace from −26% to +11.5% contribution margin",
    short: "Defined the contribution-margin cascade the business ran on, then drove the fulfilment programme that moved it — positive from July.",
    lede: "Strategy and unit economics. I chose the number, built the definition and owned the programme underneath it.",
    tier: 1,
    themes: ["Strategy", "Unit economics", "Product"],
    period: "Feb – Aug 2026 · Badho",
    stack: ["CM cascade", "Freight ledger", "Courier claims", "Returns stack", "Carrier cost model", "SQL"],
    headline: [
      { value: "−26% → +11.5%", label: "CM1 as a share of order value", note: "Feb to Aug 2026. Positive from July" },
      { value: "42.6% → 21.4%", label: "return-to-origin rate", note: "returns ÷ (returns + delivered), Mar to Aug" },
      { value: "22% → 64%", label: "orders that reached the buyer", note: "five months, on 4× the volume" },
    ],
    flow: [
      { kind: "problem", title: "Losing money on every order", body: "Delivery ate 46% of order value in February. A third of parcels came back. Commission could not cover it." },
      { kind: "diagnosis", title: "Returns were the entire loss", body: "₹13.71 L of return freight against a ₹12.84 L net loss — 107%. Our own handover time fell 13×; the courier leg never moved." },
      { kind: "decision", title: "Define CM1, attack the biggest line each month", body: "Commission − discounts − delivery − marketing. Freight first, then discounts, then returns. Marketing above the line: it could not be switched off." },
      { kind: "outcome", title: "Positive from July", body: "+₹1.46 L CM1 in August, 11.5% of order value. Delivery cost under 1%. Fulfilment 22% → 64% while volume grew fourfold." },
    ],
    changes: [
      "Built the cascade top-down for a business with no cost of goods: CM1, CM2, CM3, operating margin.",
      "Made freight visible per order and per brand, then moved delivery cost onto sellers: 46% → under 1% of order value.",
      "Specified the courier weight-claim service: 378 claims filed in 24 hours, de-duplicated against every open ticket.",
      "Shipped the returns stack: prepaid-only after one return, address checks at checkout, a paid delivery promise, doorstep triage.",
      "Cut discounts from 15.1% to 5.3% of order value while commission taken rose from 12.7% to 19.4%.",
      "Built a carrier cost model on billed rates, not rate cards: the same traffic 40% cheaper, decided lane by lane.",
    ],
    metrics: [
      { value: "107%", label: "of the net loss was return freight", note: "₹13.71 L of returns against a ₹12.84 L loss, Jan–Aug 2026" },
      { value: "46% → 0.29%", label: "delivery cost / order value", note: "Feb to Jun 2026, moved onto sellers" },
      { value: "12.7% → 19.4%", label: "commission actually taken", note: "Jun to Aug 2026" },
      { value: "15.1% → 5.3%", label: "discount spend / order value", note: "Jun to Aug 2026" },
      { value: "143.9 h → 10.9 h", label: "median seller handover time", note: "13× faster. The courier leg stayed at 88–123 h every month" },
      { value: "35.9% vs 6.2%", label: "return rate, cash on delivery vs prepaid", note: "part-paid sits at 18.9% — a dose-response" },
      { value: "33.6% → 41.6%", label: "repeat rate when the first order arrived", note: "half of first-time buyers had their first order rejected" },
      { value: "28.2 → 10.1 days", label: "slowest tenth of deliveries", note: "median 10.2 → 6.1 days" },
    ],
    scope: "Contribution per order is the company's own P&L. I designed the cascade and specified 34 of the 42 fulfilment features under it; the claims service was built by the automation team to my requirement. Volume fell while margin rose, so the defensible claim is that the business was made viable at a smaller size, not at scale.",
    takeaways: ["Nobody reduces a cost they cannot see.", "In a business with no cost of goods, the line you cascade from decides what the team optimises."],
  },

  // ── 02 ────────────────────────────────────────────────────────────────
  {
    slug: "jit-pivot",
    title: "Found the arithmetic behind a retention stall and owned the pivot that followed",
    short: "Retention looked like a messaging problem. It was three per-brand minimums on one cart. Naming it moved the company to its own warehouse and fleet.",
    lede: "Strategy and operating model. Written plan to first delivery in 12 days.",
    tier: 1,
    themes: ["Strategy", "Product", "Go-to-market"],
    period: "Jun – Sep 2026 · Badho",
    stack: ["Operating model", "Warehouse spec", "Fee and waiver", "Serviceability", "Capacity plan", "JIT console"],
    screens: [
      { src: "/screens/jit-min-order.webp", kind: "phone", alt: "Cart blocked by one brand’s ₹300 minimum", caption: "July 2026: one brand’s ₹300 minimum blocking a cart — the problem, on screen" },
      { src: "/screens/jit-home-sept.webp", kind: "phone", alt: "Single-seller Badho Wholesale home", caption: "September: the single-seller store after the pivot — one minimum, then none" },
      { src: "/screens/jit-boxes.webp", kind: "photo", alt: "Packed Badho orders stacked at the Gurugram warehouse", caption: "Packed and ready at the Gurugram warehouse. 43 of 81 orders sat like this and never left — the van, not demand, was the ceiling" },
      { src: "/screens/jit-ops-console.webp", kind: "desktop", alt: "JIT warehouse console", caption: "The JIT console: one purchase order per brand, every night" },
    ],
    headline: [
      { value: "3 → 0", label: "minimum order values on one basket" },
      { value: "12 days", label: "written plan to first delivery", note: "engineering started 29 Jul, plan 24 Aug, first order 5 Sep" },
      { value: "4.5 → 45.5", label: "carts a day in Delhi–Gurgaon", note: "before and after the minimum came off" },
    ],
    flow: [
      { kind: "problem", title: "Repeat orders flat for months", body: "The team treated it as a messaging problem. Campaigns went out; the number did not move." },
      { kind: "diagnosis", title: "It was arithmetic", body: "₹300 of oil, ₹300 of rice, ₹300 of spices in one cart is a ₹900 basket blocked by three separate ₹300 minimums." },
      { kind: "decision", title: "One seller, one minimum, then none", body: "Buy the stock, hold it in our own warehouse, deliver with our own vans. Flat ₹75 fee waived above ₹500, shipped as one flag." },
      { kind: "outcome", title: "Ten times the carts a day", body: "4.5 → 45.5 carts a day in the launch region. 81 orders in the eight days it ran. The van, not demand, was the ceiling." },
    ],
    changes: [
      "Wrote the operating document: warehouse zones, receiving and putaway, pick-pack-dispatch, short-ship handling, and the software each step needed.",
      "Cut serviceability from all of India to Delhi and Gurgaon — at this volume, density beats coverage.",
      "Set marketing spend as the throttle: two vans handle about 50 orders a day, written into the plan before launch.",
      "Replaced per-brand minimums with a flat ₹75 delivery fee waived above ₹500, as a single switch so no buyer gets neither.",
      "Consolidated one purchase order per brand every night. No stock held.",
    ],
    metrics: [
      { value: "114 → 199", label: "carts a day, Delhi and Gurgaon", note: "matched 21-day windows" },
      { value: "+23.5%", label: "order value in the launch region", note: "matched 21-day windows" },
      { value: "45.7%", label: "of JIT baskets cleared the ₹500 waiver" },
      { value: "₹367", label: "median JIT basket", note: "below the ₹500 waiver — set too high" },
      { value: "43 of 81", label: "orders packed and never dispatched", note: "the last step was the bottleneck" },
      { value: "8 days", label: "JIT ran before the company closed" },
    ],
    scope: "The decision to become the distributor was the founder's, agreed by the team. I owned the operating model, buyer-side mechanics, cutover and launch. The ₹500 waiver sat above the ₹379 median basket — the structure was right, the threshold was wrong, and I would set it from the distribution next time.",
    takeaways: ["Look for the arithmetic before you look for a campaign.", "Set a threshold from the distribution, not from a round number."],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-channel",
    title: "Built WhatsApp into an acquisition channel at ₹9.60 per install",
    short: "Audience model, template economics, in-house sending and attribution — built from zero, then the recommendation to stop the spend.",
    lede: "Growth. I owned the channel end to end: audience, cost, sending stack, measurement.",
    tier: 1,
    themes: ["Growth", "Unit economics", "Built it myself"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["Cohort waterfall", "Serviceability gate", "Utility templates", "In-house sender", "Attribution", "Incrementality"],
    screens: [
      { src: "/screens/wa-campaign.webp", kind: "desktop", alt: "WhatsApp campaign dashboard", caption: "A campaign in the sending dashboard: template, creative, delivery and click counts" },
      { src: "/screens/notif-audiences.webp", kind: "desktop", alt: "Audience console", caption: "The audience console — each cohort a question with a number on it" },
    ],
    headline: [
      { value: "₹9.60", label: "cost per app install", note: "₹1.87 L spend, 19,534 installs, June 2026" },
      { value: "29,172", label: "buyers acquired in a month" },
      { value: "₹13.7 L", label: "order value on the same-day rule", note: "₹21.4 L on a seven-day window; I led with the smaller one" },
    ],
    flow: [
      { kind: "problem", title: "A million quiet shopkeepers", body: "Push reached almost nobody: 81.77 M sends bought 130 k opens. 58% were never even attempted." },
      { kind: "diagnosis", title: "No audience model, no cost control", body: "No exhaustive segmentation, no serviceability check, transactional traffic priced as marketing, a vendor taking a cut." },
      { kind: "decision", title: "Build the channel properly", body: "Seven-cohort waterfall over 1.17 M buyers. Pincode gate before any send. Utility templates at a seventh of the price. Our own sender." },
      { kind: "outcome", title: "₹9.60 an install, then the stop call", body: "29,172 buyers, ₹13.7 L of orders. ROAS 2.60× → 1.12× on a 13% take rate. I recommended stopping the spend." },
    ],
    changes: [
      "Designed a seven-cohort priority waterfall over 1,167,517 buyers — mutually exclusive, exhaustive, serviceability-gated.",
      "Routed transactional traffic as utility templates: roughly a seventh of the marketing price.",
      "Replaced the vendor with our own sender: ₹0.145 → ₹0.115 a message on ~169 k messages a month.",
      "Found the attribution bug that hid the channel — 117 buyers visible out of 537 real — and rebuilt matching buyer by buyer.",
      "Reported same-day attribution (2.60×) where the seven-day window read 5.22×, and wrote down why 1.12× is a loss.",
      "Wrote the first working version of the WhatsApp sales agent in one sitting; reported the ₹11,690 it caused, not the ₹3.98 L it touched.",
    ],
    metrics: [
      { value: "₹1.87 L → ₹1.57 L", label: "monthly spend, June to July" },
      { value: "647 → 251", label: "orders credited, same-day rule" },
      { value: "3.3% → 10.8%", label: "WhatsApp buyers who ordered", note: "June against September" },
      { value: "₹0.145 → ₹0.115", label: "cost per message, in-house" },
      { value: "~24%", label: "genuinely incremental share", note: "within-buyer pre/post; the rest is recall, not increment" },
      { value: "8.8% / 58%", label: "push confirmed delivered / never attempted", note: "why the channel was built" },
    ],
    scope: "The sender was built by an engineer to my requirements; the sales agent's production version is the AI team's — mine was the first working version. A within-buyer incrementality test puts the share this channel genuinely caused at about 24%; the headline is influence, not increment, and I say so.",
    takeaways: ["A channel number is not a business number.", "Price a channel before you scale it."],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "buyer-app-plg",
    title: "Lifted registration completion from 30% to 94% by deleting steps",
    short: "A year of product-led growth on the buyer app: onboarding, unified cart, home screen, catalogue, support. Mostly by removing things.",
    lede: "Growth and product. I ran the buyer-app roadmap and measured every release against production.",
    tier: 1,
    themes: ["Growth", "Product"],
    period: "Mar – Sep 2026 · Badho",
    stack: ["Onboarding", "Unified cart", "Home rebuild", "Language routing", "Catalogue", "Support tab", "Notifications"],
    screens: [
      { src: "/screens/ob-number.webp", kind: "phone", tag: "before", alt: "Old onboarding, step 1: phone number and language", caption: "Step 1: phone number — and a language question before the buyer has seen a single product" },
      { src: "/screens/ob-otp.webp", kind: "phone", tag: "before", alt: "Old onboarding, step 2: OTP typed by hand", caption: "Step 2: the OTP typed by hand — four boxes, a countdown, a keypad" },
      { src: "/screens/ob-form.webp", kind: "phone", tag: "before", alt: "Old onboarding, step 3: the profile form", caption: "Step 3: the profile form after OTP. 21,064 people abandoned it in three weeks" },
      { src: "/screens/af-otp.webp", kind: "phone", tag: "after", alt: "New onboarding: OTP read automatically", caption: "The OTP reads itself in — no keypad, no tap" },
      { src: "/screens/af-home.webp", kind: "phone", tag: "after", alt: "New onboarding: straight to the home screen", caption: "Then straight to the home screen. No form. Registration completion 30% → 94%" },
      { src: "/screens/plg-home-before.webp", kind: "phone", alt: "Buyer app home before 18 July", caption: "Home before 18 Jul: icon rail, ₹1 Deal, promotional banners" },
      { src: "/screens/plg-home-after.webp", kind: "phone", alt: "Buyer app home after the rebuild", caption: "Home after the rebuild: coupons fold, category tabs, cart strip" },
    ],
    cover: { src: "/screens/plg-home-before.webp", kind: "phone", alt: "", caption: "" },
    headline: [
      { value: "30% → 94%", label: "verified phones that finished registering", note: "signup form and OTP tap removed" },
      { value: "21,064 → 9", label: "mid-form abandons per three weeks" },
      { value: "99%", label: "of order flow on the unified cart in 7 days", note: "66.5% of carts held two or more sellers" },
    ],
    flow: [
      { kind: "problem", title: "Four in five daily users had never ordered", body: "3,000 daily users, 300 carts, 120 orders. 89% of open carts sat below the minimum." },
      { kind: "diagnosis", title: "Friction before the buyer decided to stay", body: "A profile form after OTP, a language popup, an extra tap, a minimum on the first order, a separate checkout per seller." },
      { kind: "decision", title: "Remove, do not add", body: "Delete the form and the tap. Set language from the shop's location. One cart across sellers. Margin on the product card." },
      { kind: "outcome", title: "Completion 57% → 94% the first full day", body: "In-form abandons 3,281 → 5. Orders per active buyer +41%. Install-to-first-order still fell 2.52% → 1.43% — the next floor to fix." },
    ],
    changes: [
      "Removed the post-OTP profile form and made OTP self-send: completion 57.3% → 94.2% overnight; first-time buyers +40% in the fortnight after.",
      "Unified cart across sellers: 99% of order flow migrated in seven days; orders per active buyer +41%.",
      "Set app language from shop location: wrong-language installs in non-Hindi states 38–46% → under 1%.",
      "Moved margin onto the product card, brought category tabs to the top, shipped a support tab with a named relationship manager for 1.47 M buyers.",
      "Found a DAU metric understating itself by 108% — a null-unsafe filter my own signup change exposed — and corrected the series.",
      "Measured the home rebuild properly: six new components emitted no events, so the engagement collapse was instrumentation, not behaviour.",
    ],
    metrics: [
      { value: "326 → 1,758", label: "orders placed a week", note: "30 Mar to 15 Jun 2026" },
      { value: "509 → 723", label: "first-time buyers a week", note: "either side of the lower first-order floor" },
      { value: "34% → 61%", label: "active buyers who started a cart", note: "after the ₹75 credit" },
      { value: "108%", label: "understatement in our own DAU metric", note: "found and fixed" },
      { value: "0 of 196", label: "releases that moved daily actives", note: "reach was never the constraint" },
      { value: "2.52% → 1.43%", label: "installs that placed a first order", note: "I fixed the step I was looking at; the one below got worse" },
    ],
    scope: "Muskan Pandey ran schemes and home design; Shubham Kumar and Kushagra Rathore built most of what I specified. The June changes overlap — unified cart, form removal and ₹1 deals shipped in one fortnight — so I claim the migration and completion figures, which are clean, and hedge the rest.",
    takeaways: ["Every question asked before a buyer has decided to stay is one that some answer by leaving.", "When a change succeeds, check what it stopped producing."],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: "move-it-daas",
    title: "Took a delivery service to market and grew it 10× in bookings",
    short: "Sold by the truck-day to the FMCG distributors already on our marketplace, booked from a photograph of the invoice.",
    lede: "Strategy and go-to-market. Joint product owner: operating model, failure taxonomy, cash custody, commercial side.",
    tier: 1,
    themes: ["Strategy", "Go-to-market", "Unit economics"],
    period: "Jan – Sep 2026 · Badho",
    stack: ["Truck-day pricing", "Invoice OCR", "Address lock", "Route planning", "Two-party handover", "Cash ledger", "Failure taxonomy"],
    screens: [
      { src: "/screens/daas-van-road.webp", kind: "photo", alt: "Badho Delivery three-wheeler on the road", caption: "A Badho Delivery three-wheeler on the road — closed body, gas, built for market lanes" },
      { src: "/screens/daas-booking.webp", kind: "phone", alt: "Vehicle selection with day rates", caption: "Book a truck by the day: 3-wheeler ₹1,602, 4-wheeler ₹2,000" },
      { src: "/screens/daas-upload-bills.webp", kind: "phone", alt: "Upload bills to process orders", caption: "Upload the invoices — the drop list builds itself" },
      { src: "/screens/daas-driver-bill.webp", kind: "phone", alt: "Driver photographing an invoice", caption: "The driver photographs the bill; 17,678 invoices were read this way" },
    ],
    headline: [
      { value: "137 → 634", label: "truck-days booked a month", note: "Feb to Jul 2026. 3,016 in total" },
      { value: "17,174", label: "deliveries to 7,363 shops", note: "of 20,231 attempted — 85% first time" },
      { value: "₹18.95 Cr", label: "of goods moved", note: "₹21.5 L of fee income, 60 paying distributors" },
    ],
    flow: [
      { kind: "problem", title: "A truck costs ₹53–65 k a month whether it moves or not", body: "The trade is seasonal: a fixed fleet is too small at festivals and idle for months after. Orders live on paper." },
      { kind: "diagnosis", title: "Sell days, not leases. Start where the paper is.", body: "Every competitor asked for an accounting integration. The distributor could not give one. He could hand over an invoice." },
      { kind: "decision", title: "Truck by the day, invoice photo to drop list", body: "₹1,400–2,000 a day, nothing on idle days. Photo → 10–50 drops in seconds. Shop address locked after the first delivery. Cash in his bank the same day." },
      { kind: "outcome", title: "10× monthly bookings, 60 paying distributors", body: "3,016 truck-days. 85% delivered first time. And the number nobody was reporting: on-time pickup fell 41% → 7% as volume tripled. I found it in the logs." },
    ],
    changes: [
      "Priced a truck-day at ₹1,400–2,000 with nothing paid on idle days — the whole commercial idea, read off the distributor's own cost structure.",
      "Invoice photo → drop list: 17,678 invoices read by machine, drops counted rather than typed.",
      "Locked shop → phone → verified GPS after the first successful delivery: a map of 7,363 real shops no competitor could buy.",
      "Closed-list failure reasons from 21 May: 'shop closed' topped it at 644 — a scheduling problem, priced as a second attempt.",
      "Sold against his cost, not our features: a trip on his truck against a trip on ours, over 22 delivery days.",
    ],
    metrics: [
      { value: "9 h vs 5 days", label: "own fleet vs courier, full round", note: "the courier leg alone averaged 5.02 days" },
      { value: "68 / 60", label: "distributors who used it / who paid" },
      { value: "41% / 79%", label: "truck-days from the top 3 / top 10 customers", note: "the concentration caveat on every revenue figure" },
      { value: "41% → 7%", label: "pickups on time against the booked slot", note: "May to Sep; median lateness 23 → 79 min" },
      { value: "11 of 11, then 6", label: "May customers still active in June, then July" },
      { value: "11,310 → 49", label: "driver installs → riders working", note: "72.7% of the drop on one form screen" },
    ],
    scope: "Headline figures are the company's July 2026 dashboard, assembled by the founders for a seed round. Aditya Kumar was co-owner; engineering was the delivery team's. The cost rows do not exist in the data, so whether a single delivery made money is a question it cannot answer — and I say so rather than repeat the deck's break-even claim.",
    takeaways: ["Meet the customer at the paper.", "Measure the promise, not only the volume."],
  },

  // ── 06 ────────────────────────────────────────────────────────────────
  {
    slug: "milkoreach",
    title: "Opened a direct-to-retailer channel for a partner brand in 17 days",
    short: "Diagnosed why a cattle-feed brand's retail book had gone dead, designed the commercial mechanism, built the ordering app myself, and verified the growth was incremental.",
    lede: "Strategy and 0→1. Commercial design, the app, and the measurement.",
    tier: 1,
    themes: ["Strategy", "Go-to-market", "Built it myself"],
    period: "Aug – Sep 2026 · Badho and Kapila",
    stack: ["Channel design", "Price ladder", "Distributor allocation", "AI-assisted build", "OTP + GPS", "Unit economics"],
    screens: [
      { src: "/screens/milko-catalogue.webp", kind: "desktop", alt: "MilkoReach catalogue", caption: "The ordering app I built: catalogue at factory rate, half-tonne floor" },
      { src: "/screens/milko-map.webp", kind: "desktop", alt: "MilkoReach location picker", caption: "GPS capture routes the order to the nearest distributor within 40 km" },
    ],
    headline: [
      { value: "17 days", label: "idea to first delivery", note: "7 to 24 Aug 2026, checked against the order book" },
      { value: "52 of 53", label: "retailers with no order in the 3 months before launch", note: "31 of 32 distributors likewise — verified incremental" },
      { value: "68 → 12", label: "orders placed → delivered", note: "the funnel, with the loss diagnosed" },
    ],
    flow: [
      { kind: "problem", title: "A brand's retail book had gone dead", body: "22,898 orders a month in October 2024. 42 a month by July 2026. Thousands of retailers inside distributor territories, not ordering." },
      { kind: "diagnosis", title: "Both sides stuck on the same transport economics", body: "A retailer buying half a tonne cannot justify arranging transport. A distributor cannot justify a vehicle for a small drop." },
      { kind: "decision", title: "Factory-rate price, free delivery, we do the routing", body: "Retailer pays factory rate, never coordinates with a distributor. We route to any distributor within 40 km. Half-tonne floor. App built in an evening." },
      { kind: "outcome", title: "Incremental by design and verified after", body: "52 of 53 retailers and 31 of 32 distributors were dormant pre-launch. Binding constraint: retailer credit, 22% of lost value. Recommended not scaling until fixed." },
    ],
    changes: [
      "Wrote the ordering web app with an AI coding assistant — catalogue, OTP login, GPS, nearest-distributor allocation — in one evening; real purchase orders two days later.",
      "Designed the commercial model: one per-tonne payment to the distributor, published transporter rate card, delivery as an acquisition subsidy out of a ₹95-per-bag spread.",
      "Set a deliberately low half-tonne first order: 70% of orders sat exactly on it; larger baskets died between phone and truck.",
      "Opened allocation to every distributor: 3× order flow with no rise in deliveries — the constraint was not supply.",
      "Instrumented unit economics end to end: free delivery consumed ~51% of the spread; credit, not price, was what blocked 22% of ordered value.",
    ],
    metrics: [
      { value: "226", label: "distributors mapped", note: "4,778 feed retailers within 40 km of one" },
      { value: "₹95 / bag", label: "structurally flat spread", note: "free delivery took ~51% of it" },
      { value: "70%", label: "of orders exactly on the minimum" },
      { value: "3×", label: "order flow when opened to every distributor", note: "with no increase in deliveries" },
      { value: "22%", label: "of lost order value blocked by retailer credit" },
      { value: "18 of 42", label: "commits mine in the app repo", note: "verifiable" },
    ],
    scope: "The settlement dashboard for this channel was built by the data team to my specification; I do not claim it. Delivery was paid by Badho to local transporters at ₹400–800 a trip, so free delivery is a subsidy, not a partner concession. The channel worked as a mechanism and not yet as a business, and the recommendation was not to scale it until credit and serviceability were fixed.",
    takeaways: ["Check whether your growth is real before you report it.", "Design the floor for the buyer you have, not the buyer the distributor wants."],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: "pricing-experiments",
    title: "Ran four pricing experiments and found the one that paid",
    short: "Cart coupons, item-level quantity discounts, ₹1 trial products, a funded base-price cut — shipped in sequence, measured afterwards.",
    lede: "Pricing and incentives. I owned discount design and built the tool that audited it.",
    tier: 1,
    themes: ["Pricing", "Growth", "Unit economics", "Built it myself"],
    period: "Apr – Sep 2026 · Badho",
    stack: ["Cart coupons", "Item quantity tiers", "₹1 deals", "Base-price cut", "Discount audit dashboard"],
    screens: [
      { src: "/screens/plg-filters.webp", kind: "phone", alt: "Margin on the product card", caption: "Margin on the card, coupon on the item — what a shopkeeper actually optimises" },
      { src: "/screens/plg-home-before.webp", kind: "phone", alt: "₹1 Deal banner", caption: "The ₹1 Deal: 68% of orders carried a ₹1 item at the peak" },
    ],
    headline: [
      { value: "AOV +10.5%", label: "after item-level quantity coupons", note: "₹809 → ₹894, revenue per active buyer +12.2% on flat DAU" },
      { value: "~8×", label: "gross return on the incremental discount rupee", note: "₹1.81 L gross for ₹22.5 k of discount" },
      { value: "−45.7%", label: "item-coupon spend from one config change", note: "37 minutes, no code, orders flat" },
    ],
    flow: [
      { kind: "problem", title: "Discounts hidden at checkout", body: "A kirana shopkeeper buys on margin. Ours sat behind coupon codes he had to find after deciding." },
      { kind: "diagnosis", title: "High usage is not impact", body: "Cart coupons reached 30% of orders and conversion did not move. The discount was moving money, not adding it." },
      { kind: "decision", title: "Put the discount on the item, scale it with quantity, audit it", body: "Per-SKU quantity tiers priced into every product card. Funded by re-routing flat coupon spend. Built the audit dashboard myself." },
      { kind: "outcome", title: "AOV +10.5%, then the cheapest win of the year", body: "45.9% of orders carried an item coupon in a week. Offer-code spend ₹59.4 k → ₹6.2 k. A config change then cut item-coupon spend 45.7% with zero order loss." },
    ],
    changes: [
      "Item-level quantity coupons across 24 brand sellers: 46% order adoption in seven days, AOV ₹809 → ₹894.",
      "Funded it by re-routing existing discount spend, not new budget: ~8× on the incremental rupee.",
      "₹1 trial products to 68% of orders at zero incremental discount cost; reported as a null on conversion.",
      "Built the discount-audit dashboard: flagged 43% of June's coupon orders discounting above configuration, ₹60 k.",
      "Set the anomaly threshold from what the configuration could produce, not from a round number.",
    ],
    metrics: [
      { value: "6.9% → 36.6%", label: "orders carrying a funded coupon", note: "conversion flat" },
      { value: "₹1,133 vs ₹884", label: "order value with a coupon vs without" },
      { value: "0 → 35.3%", label: "orders with an item-level coupon" },
      { value: "2–8 pts", label: "lower 30-day repeat after a ₹1 first order", note: "a cheap order is not a customer" },
      { value: "43% / ₹60 k", label: "June coupon orders above spec", note: "found by the audit tool" },
      { value: "27%", label: "understatement in my own first report", note: "a whitelist; fixed and written down" },
    ],
    scope: "The coupon engine was built by Sahil Rohera; ₹1 pricing was the founder's call. No holdouts ran, so these are before-and-after reads. The ₹75 credit landed the same fortnight as item coupons — when pressed, quote the seven-day figures (AOV +9.7%).",
    takeaways: ["High usage is not impact.", "Check whether a discount added spend or moved it."],
  },

  // ── 08 ────────────────────────────────────────────────────────────────
  {
    slug: "rewards-retention",
    title: "Measured every retention programme and re-pointed the budget",
    short: "Four ways of paying a shopkeeper to come back, none with a holdout. I queried each against repeat orders and found which ones worked.",
    lede: "Growth analytics. I owned the notification programme carrying the schemes, and the measurement.",
    tier: 1,
    themes: ["Growth", "Unit economics"],
    period: "Apr – Sep 2026 · Badho",
    stack: ["Gift ladder", "Wallet credit", "Referral", "Streak", "Notification programme", "Cohort SQL"],
    screens: [
      { src: "/screens/notif-audiences.webp", kind: "desktop", alt: "Audiences with counts", caption: "Audiences: gift qualifiers, credit holders, lapsed buyers — each with its count" },
      { src: "/screens/notif-templates.webp", kind: "desktop", alt: "Template library", caption: "The template library the retention programme ran on" },
    ],
    headline: [
      { value: "50% vs 19%", label: "next-month re-order, gift qualifiers vs everyone else" },
      { value: "0.06%", label: "of a ₹4.57 Cr credit run was ever spent", note: "609,245 buyers credited ₹75; 342 used it" },
      { value: "6.7× / 3.9×", label: "referred buyers: better activation, worse GMV per signup", note: "26.55% vs 3.99%; ₹151 vs ₹583" },
    ],
    flow: [
      { kind: "problem", title: "Four reward schemes, none measured", body: "A monthly gift ladder, a daily login reward, ₹75 of free credit, a referral programme. No holdout on any of them." },
      { kind: "diagnosis", title: "Query each against repeat orders", body: "Gift qualifiers re-ordered at 50% vs 19%. The credit run reached 609,245 buyers and 342 spent it. Referrals activated 6.7× better and bought 3.9× less." },
      { kind: "decision", title: "Scale what retains, stop what does not", body: "Route relationship managers to gift qualifiers. Stop broadcasting credit. Recruit referrers from power buyers instead of everyone." },
      { kind: "outcome", title: "Budget re-pointed, one fraud pattern flagged", body: "31–44% of monthly order value came from gift qualifiers at 7.8% cost. Referral paid out ₹47,840 at 24.9% redemption; one referrer was 30% of programme GMV." },
    ],
    changes: [
      "Gift ladder: qualifiers 11 → 168 a month. Found 74 buyers a month losing a gift to a returned parcel and fixed the rule.",
      "₹75 credit run: 609,245 buyers credited, 342 spent it. Reported it because it was the largest thing that did not work.",
      "Referral: 26.55% activation vs 3.99% organic, ₹151 vs ₹583 GMV per signup, a 24-hour half-life on the credit.",
      "Flagged one referrer with 29 invitees at 100% conversion across two pincodes — 30% of programme GMV. No rule existed; I wrote the spec for one.",
      "Specified the seven-group metric spec the referral console never had: acquisition, activation, reward economics, integrity, lifecycle.",
    ],
    metrics: [
      { value: "7.8%", label: "gift cost / qualifier order value" },
      { value: "289 of 12,116", label: "buyers given a code who referred anyone", note: "2% capture" },
      { value: "₹30,422", label: "of referral credit never touched", note: "64% of the budget issued and unused" },
      { value: "9 days", label: "the daily login reward actually ran" },
      { value: "2.8%", label: "referred buyers who ordered twice" },
      { value: "9.4–16.5%", label: "of each month's new buyers ordered again", note: "the retention floor under all of this" },
    ],
    scope: "The gift ladder was Muskan Pandey's programme; the streak, games and referral build were the AI team's; the ₹75 credit was built by Shubham Kumar. Mine: the notification programme that carried them, the relationship-manager assignment, and this measurement. No holdouts — these are associations, not proof.",
    takeaways: ["Reward the behaviour you want, not the transaction.", "Check a reward against repeat orders before scaling it."],
  },

  // ── 09 ────────────────────────────────────────────────────────────────
  {
    slug: "restaurant-tech-gtm",
    title: "Priced, renewed and defended enterprise accounts in India and Saudi Arabia",
    short: "Wrote the price list for a restaurant-tech company, ran its largest kiosk accounts, and negotiated renewals, redlines and a withholding-tax dispute.",
    lede: "Go-to-market and commercial. Account owner from price list to redlines.",
    tier: 1,
    themes: ["Go-to-market", "Pricing", "Strategy"],
    period: "Jan 2024 – Sep 2026 · ONO Suite",
    stack: ["Pricing architecture", "Renewals", "Legal redlines", "Withholding tax", "Weekly reporting", "Partnerships"],
    screens: [
      { src: "/screens/kiosk-tacobell.webp", kind: "kiosk", alt: "ONO kiosk in a Taco Bell store", caption: "A live ONO kiosk in a Taco Bell store" },
      { src: "/screens/kiosk-jk-dinein.webp", kind: "kiosk", alt: "Kiosk ordering screen", caption: "The ordering screen: dine-in, table number, menu" },
    ],
    headline: [
      { value: "79 kiosks", label: "Herfy, Saudi Arabia — three consecutive renewals" },
      { value: "7 brands", label: "priced with commercials I wrote" },
      { value: "17.65%", label: "gross-up that settled a 15% withholding-tax dispute" },
    ],
    flow: [
      { kind: "problem", title: "A price list that did not answer the client's question", body: "Restaurant groups ask 'rent or own?', not 'what does it cost?'. The offer was not structured around that decision." },
      { kind: "diagnosis", title: "Structure the offer around the buying decision", body: "Subscription against an ownership buyout, priced per kiosk, per store and per chain." },
      { kind: "decision", title: "Negotiate on absolute change, concede what costs nothing", body: "A two-riyal rise justified line by line against fifteen months of absorbed cost. Accept six redlines, hold the one that touched cash flow." },
      { kind: "outcome", title: "Three Herfy renewals. Taco Bell renewed, then churned.", body: "My weekly report showed flat revenue and improving uptime while one store failed three times in eleven weeks. It changed how I report." },
    ],
    changes: [
      "Authored the pricing architecture — subscription vs ownership buyout, per kiosk / store / chain — and the commercials for Mad Over Donuts, Cafe Island, Pizza Wings, Nik Bakers, SVS Foods, Muralis Market and Herfy.",
      "Closed a renewal price rise by anchoring on the absolute change and benchmarking so under-2% read as restraint.",
      "Handled a client's legal redlines: accepted six, refused the one that affected cash flow, with the reason stated.",
      "Resolved a 15% withholding-tax dispute at a 17.65% invoice gross-up.",
      "Registered formal partnerships with GoFrugal and Petpooja, plus Reelo, Razorpay, checkout.com and QueueBuster.",
    ],
    metrics: [
      { value: "3", label: "consecutive Herfy renewals" },
      { value: "6 of 7", label: "legal redlines accepted" },
      { value: "34 kiosks · 19 malls", label: "Taco Bell India estate I reported on weekly" },
      { value: "~₹3.8 Cr", label: "cumulative Taco Bell kiosk sales tracked" },
      { value: "60+", label: "brands reached in outbound" },
    ],
    scope: "Final commercial sign-off sat with the founder throughout. Taco Bell terminated three months into a renewed term; the report should have carried the client's open complaints and the age of every unresolved refund.",
    takeaways: ["A healthy average can hide the thing that loses the account.", "Concede what costs you nothing, so the one refusal is believable."],
  },

  // ── 10 ────────────────────────────────────────────────────────────────
  {
    slug: "doka",
    title: "Cold-pitched, priced and delivered a custom ordering app in Riyadh",
    short: "A nine-branch bakery with no customer app. Pitched with a prototype, signed at ~$7,000, delivered to Apple approval with one developer.",
    lede: "Product and commercial owner, from pitch to App Store approval.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "Feb 2025 – Feb 2026 · ONO Suite",
    stack: ["Clickable prototype", "Scope pricing", "Cake configurator", "POS mapping", "Status reporting"],
    screens: [
      { src: "/screens/doka-configurator.webp", kind: "phone", alt: "Cake decoration step", caption: "Make your cake: the decoration step, the cake redrawn as you choose" },
      { src: "/screens/doka-shape.webp", kind: "phone", alt: "Shape and size step", caption: "Shape & size — rounded, heart, rectangle, priced by servings" },
      { src: "/screens/doka-experience.webp", kind: "phone", alt: "Choose your experience", caption: "Two flows: dine-in or take-away, or design a cake" },
      { src: "/screens/doka-prototype.webp", kind: "phone", alt: "The clickable prototype", caption: "The clickable prototype the deal was pitched with" },
    ],
    headline: [
      { value: "~$7,000", label: "cold-pitched, priced and signed", note: "$6,400 → $7,000 through three rounds" },
      { value: "5 steps · 3 angles", label: "cake configurator with live price" },
      { value: "iOS approved", label: "December 2025, one developer" },
    ],
    flow: [
      { kind: "problem", title: "Nine branches, no customer app", body: "Herfy's cake brand took orders by phone and walk-in. Custom cakes meant a conversation every time." },
      { kind: "diagnosis", title: "The sale needed something to tap", body: "A document would not close it. A clickable prototype would." },
      { kind: "decision", title: "Pitch with a prototype, price the scope, hold the line", body: "Two order flows. A five-step configurator that renders variations instead of storing a photo library. 40/40/20 milestones under Saudi law." },
      { kind: "outcome", title: "Delivered to Apple approval", body: "215 menu items mapped to the POS across nine branches. Android blocked on the client's own developer account at handover." },
    ],
    changes: [
      "Built the clickable prototype, cold-pitched it, priced scope through three rounds, signed under Saudi law.",
      "Specified dine-in, take-away and scheduled delivery flows, and a five-step configurator: shape, flavour, colour, decoration, message — redrawn from three angles.",
      "Chose to render colour and decoration variations rather than store photos the client could not supply.",
      "Told the client the app was unstable when asked for a launch date, and reported status weekly in a form they could act on.",
    ],
    metrics: [
      { value: "40 / 40 / 20", label: "milestone split" },
      { value: "215", label: "menu items mapped to the POS" },
      { value: "66 / 20", label: "decorations requested / could not be sourced" },
      { value: "~95%", label: "core functionality at the 8 Sep 2025 report" },
    ],
    scope: "Never launched publicly — iOS approved, Android blocked on the client's account. I wrote no production code; several decisions (Arabic, status names, the decoration cap) were the client's. Final commercial sign-off sat with the founder.",
    takeaways: ["Pitch something the client can tap."],
  },

  // ── 11 ────────────────────────────────────────────────────────────────
  {
    slug: "ono-product",
    title: "Specified kiosk features and POS integrations for QSR chains",
    short: "Self-ordering kiosks, QR ordering and menu screens for restaurant chains — the offer engine, the integration contract, and the weekly client report.",
    lede: "Product owner between the client, the kiosk and the POS vendor.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "2024 – 2026 · ONO Suite",
    stack: ["Offer engine", "POS payload contract", "Promotions", "Weekly reporting", "Escalations"],
    screens: [
      { src: "/screens/kiosk-tacobell.webp", kind: "kiosk", alt: "ONO kiosk in a Taco Bell store", caption: "A live ONO kiosk in a Taco Bell store — the estate I reported on weekly" },
      { src: "/screens/kiosk-tacobell-pay.webp", kind: "kiosk", alt: "QR payment on the kiosk", caption: "QR payment at the kiosk" },
      { src: "/screens/kiosk-jk-dinein.webp", kind: "kiosk", alt: "Dine-in ordering screen", caption: "Dine-in: table number, categories, menu" },
      { src: "/screens/kiosk-wowmomo.webp", kind: "kiosk", alt: "Phone-number step", caption: "Order details on WhatsApp — the phone-number step" },
    ],
    headline: [
      { value: "34 kiosks · 19 malls", label: "Taco Bell India estate reported on weekly" },
      { value: "79 of 82", label: "Herfy kiosks active — the figure I verified" },
      { value: "4 POS systems", label: "integrations specified or scoped" },
    ],
    flow: [
      { kind: "problem", title: "Promotions kept breaking at the store; every integration wanted a meeting", body: "Two live kiosk failures in a week. POS vendors asked for calls instead of specs." },
      { kind: "diagnosis", title: "Write the bug as a requirement; hand the vendor a contract", body: "The offer engine needed two rules, not a workaround. Integrations needed a payload and a webhook." },
      { kind: "decision", title: "Specify, do not negotiate", body: "Offer-engine spec: ₹1-with-purchase, buy-one-get-N scaling. Five-case payload contract for GoFrugal, Petpooja, POSIST, Rista." },
      { kind: "outcome", title: "Integrations in weeks; reports that survived audit", body: "Eleven Taco Bell report decks. 193,449 Herfy orders queried to settle a billing dispute with the database, not a spreadsheet." },
    ],
    changes: [
      "Wrote the offer-engine requirement from two production failures on a live kiosk.",
      "Wrote the five-case payload and webhook contract handed to POS vendors.",
      "Ran weekly Taco Bell reporting: sales, per-location order value, per-kiosk uptime. Cut idle timeout 60 → 30 s.",
      "Escalated a payment failure with the evidence attached, and closed a billing argument with the order database.",
    ],
    metrics: [
      { value: "11", label: "Taco Bell weekly report decks", note: "revisions 7 to 86" },
      { value: "5", label: "cases in the POS payload contract" },
      { value: "₹2,400", label: "per kiosk per month, Taco Bell" },
      { value: "193,449", label: "Herfy orders queried to disprove a revenue figure" },
    ],
    scope: "The kiosk, QR and app products predate me. I configured them, specified increments, ran promotions, wrote integration contracts and reported weekly. No usage or conversion numbers exist for these products in the record.",
    takeaways: ["Give the other side's engineers the payload, not a meeting."],
  },

  // ── 12 ────────────────────────────────────────────────────────────────
  {
    slug: "vernacular-search",
    title: "Specified a search that understands how shopkeepers actually type",
    short: "Hindi in Roman script, phonetic spellings, brand names for products — and a loop that learns new synonyms from real queries.",
    lede: "Product. I defined what search had to understand; engineering chose and built the engine.",
    tier: 1,
    themes: ["Product"],
    period: "Nov 2025 – Jun 2026 · Badho",
    stack: ["Synonym model", "Query learning", "Hindi labels", "Misspelling map", "Exact-first ranking"],
    screens: [
      { src: "/screens/plg-filters.webp", kind: "phone", alt: "Search bar in Hindi", caption: "Search in Hindi — “प्रोडक्ट या ब्रांड सर्च करें” — ranked exact-first" },
    ],
    headline: [
      { value: "699,684", label: "synonyms live in search" },
      { value: "32,536", label: "root words, all reaching the engine" },
      { value: "24.9 vs 11.7", label: "synonyms per root — buyers' words vs the catalogue's" },
    ],
    flow: [
      { kind: "problem", title: "Buyers type 'all out'. The catalogue says 'mosquito repellent'.", body: "Four in five searches returned nothing. Buyers type the way they speak: Hindi in English letters, by brand, with typos." },
      { kind: "diagnosis", title: "The buyers' own words were the richest source", body: "Synonyms learned from real queries ran 24.9 per root word against 11.7 from the catalogue." },
      { kind: "decision", title: "Four synonym kinds, exact match first, learn continuously", body: "Hindi labels searched at equal weight. Misspellings mapped 28 k → 68 k. Generous matching kept out — precision is the scarce thing." },
      { kind: "outcome", title: "All 32,536 roots live", body: "98% of learned synonyms built in one month. No clean before-and-after on empty searches exists — the instrumentation lesson I carry forward." },
    ],
    changes: [
      "Specified four synonym kinds on purpose: brand-for-product, Roman-Hindi, phonetic, and catalogue-derived.",
      "Designed the loop that learns synonyms from what buyers type and pushes them live.",
      "Set exact-match-first ranking so the generous matcher never outranks the precise one.",
      "Mapped 28,328 → 68,203 misspellings to corrections.",
    ],
    metrics: [
      { value: "98.1%", label: "of learned synonyms built in one month" },
      { value: "28,328 → 68,203", label: "misspellings mapped" },
      { value: "7,515 of 1.68 M", label: "catalogue rows a buyer could actually order", note: "why searches returned nothing" },
    ],
    scope: "Shubham Kumar built it; the search-platform decision and its epic were Dhawal Raturi's. Nobody counted empty searches before the work started, so there is no conversion proof — instrument the failure before building the fix.",
    takeaways: ["Count the failure before you fix it."],
  },

  // ── Tier 2 ─────────────────────────────────────────────────────────────
  {
    slug: "release-gate",
    title: "Ran the release gate for three apps out of one codebase",
    short: "Every merge to production, every version, the release notes support ran on — and the specification pipeline that fed it.",
    lede: "Programme management. The whole cycle from ticket to production.",
    tier: 2,
    themes: ["Product"],
    period: "Oct 2025 – Sep 2026 · Badho",
    stack: ["Monorepo releases", "PR review", "Release notes", "Play Store", "Jira"],
    headline: [
      { value: "489 of 1,585", label: "tickets specified — most in the company", note: "192 full requirement documents" },
      { value: "805 of 1,613", label: "pull requests merged" },
      { value: "242", label: "release versions, 7.153 → 8.255", note: "204 of 204 release merges on the production branch" },
    ],
    flow: [
      { kind: "problem", title: "Engineering was not shipping on time", body: "Monthly bug inflow at 114. No single owner for what reached production." },
      { kind: "diagnosis", title: "The gap was specification and gatekeeping, not effort", body: "Tickets arrived under-specified; releases had no gate." },
      { kind: "decision", title: "Own the cycle end to end", body: "Specify, design, build, test, release. Sit between founder, PMs and engineers and remove whatever would make a release slip." },
      { kind: "outcome", title: "Bug inflow 114 → near zero a month", body: "242 versions, every one through the gate. Release notes that told support what changed." },
    ],
    changes: [
      "Wrote 489 tickets and 192 full requirement documents — the most of anyone in the company.",
      "Merged 805 of 1,613 pull requests; 204 of 204 release merges on the production branch.",
      "Ran QA, Play Store listings and rollouts; monthly bug inflow from 114 to near zero.",
      "Program-managed eleven epics for the four-person AI pod that put 20 systems into production.",
    ],
    scope: "Program management, not engineering. The AI pod's 20 systems are the team's builds; I owned their epics, quality bar and model budget.",
  },
  {
    slug: "crm-brain",
    title: "Specified a notification system where each audience is a question with a number on it",
    short: "A campaign console reading a nightly copy of the buyer base, with reusable audiences, holdouts, a daily cap and a plain-language segment builder.",
    lede: "Product. I specified the pipeline and the 31 reasons to notify.",
    tier: 2,
    themes: ["Growth", "Product"],
    period: "Jul – Sep 2026 · Badho",
    stack: ["Nightly replica", "Audience builder", "Holdouts", "Daily cap", "Lifecycle sequences"],
    screens: [
      { src: "/screens/notif-audiences.webp", kind: "desktop", alt: "Audience console", caption: "31 audiences, each a question with a number" },
      { src: "/screens/notif-templates.webp", kind: "desktop", alt: "Template library", caption: "Templates: one message per order per stage" },
    ],
    headline: [
      { value: "31", label: "reasons to send a notification" },
      { value: "8–10", label: "notification cap per buyer per day" },
      { value: "1", label: "message per order per stage, ever", note: "12 order-status templates" },
    ],
    flow: [
      { kind: "problem", title: "Personalised sending would overload the main database", body: "Transactional notifications wrote to production; campaign volume on top of that was not safe." },
      { kind: "diagnosis", title: "Separate the pipeline, cap the buyer, name every audience", body: "Fetch → fill → send off a nightly copy. Each audience a question with a number attached." },
      { kind: "decision", title: "Reusable audiences, holdouts, a first-week sequence", body: "A hard cap across brand and own campaigns. A first-week sequence that swaps a slot for a referral prompt once the first order lands." },
      { kind: "outcome", title: "The programme that carried the retention schemes", body: "Gift ladder, credit, referral and reactivation all ran through it." },
    ],
    changes: [
      "Specified a fetch → fill → send pipeline off a nightly replica so campaigns never touched production.",
      "Defined 31 audiences, each as a question with a number: what it is, how many, why now.",
      "Set a hard cap of 8–10 notifications per buyer per day across every sender.",
      "Wrote the 12 order-status WhatsApp templates: one message per order per stage.",
    ],
    scope: "Specified by me; built by the engineering and AI teams.",
  },
  {
    slug: "storefronts",
    title: "Two web storefronts: one test, one failure",
    short: "A candy-brand storefront to test direct-to-shop selling, and a trial-pack storefront that produced no orders. Both built by me.",
    lede: "Built it myself. Reported the result either way.",
    tier: 2,
    themes: ["Growth", "Built it myself"],
    period: "May – Jul 2026 · Badho",
    stack: ["Meta ads", "Guest checkout", "Lead capture", "Payment gateway"],
    headline: [
      { value: "5", label: "lead-capture triggers, timed by situation" },
      { value: "0", label: "meaningful orders on the trial store" },
    ],
    flow: [
      { kind: "problem", title: "Does a shopkeeper buy without installing an app?", body: "The hypothesis: a web store with an ₹800 minimum and guest checkout removes the install friction." },
      { kind: "diagnosis", title: "Test it with real ads and a real gateway", body: "Orders pushed into our system by hand. Lead capture with five triggers at different thresholds." },
      { kind: "decision", title: "Run two variants: brand store and trial packs", body: "Trial packs of unknown brands, no install, no verification before checkout." },
      { kind: "outcome", title: "The trial store produced nothing", body: "The friction argument was sound; the experiment failed. It stays on this page." },
    ],
    changes: ["Built both storefronts end to end with an AI coding assistant.", "Lead capture with five situational triggers: a cart below the minimum gets ten seconds, an idle reader gets twenty.", "Shut it down and wrote up why."],
    scope: "Mine, start to finish. It did not work.",
  },
  {
    slug: "ai-pod",
    title: "Ran the programme for an AI team that shipped 20 systems",
    short: "Product matching, catalogue enrichment, weight estimation, the synonym generator, fleet agents, a sales agent, a courier autopilot — the team's builds, my programme.",
    lede: "Programme management. Epics, quality bar and model budget for four engineers.",
    tier: 2,
    themes: ["Product"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["Epic ownership", "Quality bar", "Model budget", "Jira"],
    headline: [
      { value: "20", label: "AI systems in production" },
      { value: "88 of 98", label: "AI tickets raised by me" },
      { value: "11", label: "epics program-managed" },
    ],
    flow: [
      { kind: "problem", title: "Four engineers, twenty candidate systems, one budget", body: "No sequencing, no acceptance bar, no cost governance." },
      { kind: "diagnosis", title: "The constraint was programme, not talent", body: "Which system next, what 'done' meant, and what it cost to run." },
      { kind: "decision", title: "Own the epics, the bar and the budget", body: "Raised 88 of the 98 tickets. Set acceptance per system. Tracked model spend." },
      { kind: "outcome", title: "20 systems live", body: "The team's builds. My programme." },
    ],
    changes: ["Raised 88 of 98 AI tickets and ran eleven epics.", "Set the acceptance bar per system and governed model cost.", "Wrote the first working version of the WhatsApp sales agent that the pod then productionised."],
    scope: "These are the team's builds, not mine. I owned the programme.",
  },
];

// Serialisable subset handed to client components.
export type WorkCard = Pick<Project, "slug" | "title" | "short" | "themes" | "headline" | "period" | "tier"> & { cover?: Screen };

export const tier1 = projects.filter((p) => p.tier === 1);
export const tier2 = projects.filter((p) => p.tier === 2);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

// Headline numbers for the home page.
export const heroMetrics: Metric[] = [
  { value: "−26% → +11.5%", label: "contribution margin (CM1)", note: "Feb–Aug 2026, share of order value" },
  { value: "42.6% → 21.4%", label: "return-to-origin rate", note: "Mar–Aug 2026" },
  { value: "30% → 94%", label: "registration completion", note: "signup form removed" },
  { value: "₹9.60", label: "cost per app install", note: "29,172 buyers, WhatsApp" },
  { value: "137 → 634", label: "truck-days a month", note: "delivery service, Feb–Jul" },
  { value: "489 · 242", label: "specs written · releases shipped", note: "most in the company" },
];

// The business arc during the tenure: orders a month, D2R base, non-test.
export const arc = [
  { m: "Oct 25", v: 97 },
  { m: "Nov", v: 219, note: "Joined" },
  { m: "Dec", v: 251 },
  { m: "Jan 26", v: 195 },
  { m: "Feb", v: 1030, note: "Model change" },
  { m: "Mar", v: 1731 },
  { m: "Apr", v: 2042 },
  { m: "May", v: 3043 },
  { m: "Jun", v: 5784, note: "Peak · 26× Nov" },
  { m: "Jul", v: 3875 },
  { m: "Aug", v: 2396 },
  { m: "Sep", v: 109, note: "JIT pivot" },
];

// How I work — four steps.
export const method: FlowNode[] = [
  { kind: "step", title: "Find the number that decides", body: "Not GMV. The one that says whether the business works — CM1, return rate, registration completion." },
  { kind: "step", title: "Diagnose the arithmetic", body: "Retention was not a campaign problem; it was three minimums on one cart. Returns were 107% of the loss." },
  { kind: "step", title: "Change the model, not the copy", body: "One seller, one minimum. Sell truck-days, not leases. Delete the form. Put the discount on the item." },
  { kind: "step", title: "Measure it, and report the number that survives", body: "Same-day over seven-day attribution. Incrementality over influence. What I would not claim, written down." },
];
