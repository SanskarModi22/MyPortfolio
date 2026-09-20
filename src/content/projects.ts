// Portfolio content. Every figure traces to a production query, a Jira ticket,
// a release tag, a Slack post or a recording.

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
  /** Generic case shape: problem → diagnosis → decision → outcome, then what changed. */
  flow?: FlowNode[];
  changes?: string[];
  /** Alternative shape for a business built from scratch: the idea, the flow built, what it solved. */
  idea?: { title: string; body: string }[];
  built?: FlowNode[];
  solved?: string[];
  /** Built-product cases: the features shipped, each as a problem and what shipped for it. */
  features?: { title: string; body: string }[];
  /** An optional time series with annotated moments. */
  chart?: { title: string; kicker?: string; caption?: string; unit?: string; data: { m: string; v: number; note?: string }[] };
  metricsTitle?: string;
  screens?: Screen[];
  /** Card thumbnail on the home page; defaults to the first screen. */
  cover?: Screen;
  metrics?: Metric[];
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
      { kind: "problem", title: "Every order we grew lost us money", body: "Badho's marketplace kept 13–15% of every order as commission, but shipping that order through third-party couriers cost 46% of its value, and a third of parcels came back at our expense. Every order we added lost more money than the one before. With a fixed ₹40 lakh monthly budget, the business had to become profitable per order or stop growing." },
      { kind: "diagnosis", title: "Returns were the entire loss", body: "I separated the profit and loss into its cost lines and found that returned parcels alone cost ₹13.71 lakh between January and August — 107% of the whole net loss. Timing each stage of an order showed that the time our sellers took to hand a parcel over had fallen thirteen-fold, while the courier's part of the journey never improved. The cost we did not control was the one sinking us." },
      { kind: "decision", title: "Define the number, then attack the biggest line each month", body: "I defined the metric the business would run on — CM1, which is commission minus discounts, delivery and marketing — and went after the largest cost line each month in turn. Freight first, by making it visible on every order and moving it onto sellers. Then discounts. Then returns, with a stack of rules: prepaid-only after a single return, address checks at checkout, and a delivery promise that paid out when missed." },
      { kind: "outcome", title: "Positive from July", body: "CM1 moved from −26% of order value in February to +11.5% in August and stayed positive from July. Delivery cost fell from 46% of order value to under 1%, the return rate halved from 42.6% to 21.4%, and the share of orders that actually reached the buyer rose from 22% to 64% while volume grew fourfold." },
    ],
    changes: [
      "Defined the profit measure the business ran on — what an order earns after discounts, delivery and marketing — and made it the target every team reported against.",
      "Showed every brand what its parcels cost to ship, order by order, and moved delivery cost onto the sellers: from 46% of order value to under 1%.",
      "Automated the recovery of courier overcharges — couriers re-weighed parcels and billed the difference — so claims were filed inside the courier's 24-hour window: 378 in one day.",
      "Cut returns with a set of rules: prepaid-only after a single return, address checks before an order is placed, a delivery promise that paid the buyer when missed, and a process for refusals at the door.",
      "Cut discounts from 15.1% to 5.3% of order value while commission taken rose from 12.7% to 19.4%.",
      "Built a cost comparison of the two couriers on what we were actually billed: the same parcels 40% cheaper, decided route by route.",
    ],
    metrics: [
      { value: "107%", label: "of the net loss was return freight", note: "₹13.71 L of returns against a ₹12.84 L loss, Jan–Aug 2026" },
      { value: "46% → 0.29%", label: "delivery cost / order value", note: "Feb to Jun 2026, moved onto sellers" },
      { value: "12.7% → 19.4%", label: "commission actually taken", note: "Jun to Aug 2026" },
      { value: "15.1% → 5.3%", label: "discount spend / order value", note: "Jun to Aug 2026" },
      { value: "143.9 h → 10.9 h", label: "time for a seller to hand a parcel over", note: "13× faster; the courier's part stayed at 88–123 hours every month" },
      { value: "35.9% vs 6.2%", label: "return rate, cash on delivery vs prepaid", note: "part-paid orders sit in between at 18.9%" },
      { value: "33.6% → 41.6%", label: "repeat rate when the first order arrived", note: "half of first-time buyers had their first order rejected" },
      { value: "28.2 → 10.1 days", label: "slowest tenth of deliveries", note: "median 10.2 → 6.1 days" },
    ],
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
      { src: "/screens/jit-boxes.webp", kind: "photo", alt: "Packed Badho orders stacked at the Gurugram warehouse", caption: "Packed and ready at the Gurugram warehouse — one purchase order per brand consolidated overnight, picked and packed the next morning" },
      { src: "/screens/jit-ops-console.webp", kind: "desktop", alt: "JIT warehouse console", caption: "The JIT console: one purchase order per brand, every night" },
    ],
    headline: [
      { value: "3 → 0", label: "minimum order values on one basket" },
      { value: "12 days", label: "written plan to first delivery", note: "engineering started 29 Jul, plan 24 Aug, first order 5 Sep" },
      { value: "4.5 → 45.5", label: "carts a day in Delhi–Gurgaon", note: "before and after the minimum came off" },
    ],
    flow: [
      { kind: "problem", title: "Buyers we paid to acquire were not coming back", body: "Fewer than one in ten new shopkeepers ordered again the following month, and months of retention campaigns had not moved that figure. Badho paid to acquire every buyer, so a buyer who never returned was acquisition money spent for nothing. Retention was the whole business case, and nobody had found the cause." },
      { kind: "diagnosis", title: "It was arithmetic, not marketing", body: "Every brand on the marketplace set its own minimum order value, and a shopkeeper's cart usually held several brands. ₹300 of oil, ₹300 of rice and ₹300 of spices made a ₹900 basket — but it was blocked three separate times by three separate ₹300 minimums. The buyer was not lapsing. The cart was refusing him." },
      { kind: "decision", title: "One seller, one minimum, then none", body: "The fix had to be structural: make Badho the single seller. Buy the stock from the brands ourselves, hold it in our own warehouse and deliver it with our own vans, so there is one minimum and then none at all — replaced by a flat ₹75 delivery fee waived above ₹500. I wrote the operating model, from the warehouse layout to the software each step needed, and owned the launch." },
      { kind: "outcome", title: "Ten times the carts a day", body: "The written plan reached its first delivery in twelve days. Carts per day in the launch region rose from 4.5 to 45.5, and order value rose 23.5% on matched three-week windows. A marketplace that had put three minimum order values on one basket now had none." },
    ],
    changes: [
      "Wrote the operating plan: how the warehouse is laid out, how stock is received, picked, packed and dispatched, what happens when a brand sends less than ordered, and what software each step needed.",
      "Cut delivery coverage from all of India to Delhi and Gurgaon: at this volume, many orders close together are worth more than a few spread everywhere.",
      "Planned growth to the fleet's capacity: two vans handle about 50 orders a day, so marketing spend was the lever that kept orders inside it.",
      "Replaced every brand's minimum with one flat ₹75 delivery fee, waived above ₹500.",
      "Ordered from the brands every night for the next morning, one order per brand, so we never held stock.",
    ],
    metrics: [
      { value: "114 → 199", label: "carts a day, Delhi and Gurgaon", note: "matched 21-day windows" },
      { value: "+23.5%", label: "order value in the launch region", note: "matched 21-day windows" },
      { value: "45.7%", label: "of JIT baskets cleared the ₹500 waiver" },
    ],
    takeaways: ["Look for the arithmetic before you look for a campaign.", "Set a threshold from the distribution, not from a round number."],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-channel",
    title: "Built WhatsApp into an acquisition channel at ₹9.60 per install",
    short: "I built WhatsApp into Badho's acquisition and reactivation channel from zero: the audience model, the template economics, the sending stack and the attribution.",
    lede: "I owned the channel end to end — who we messaged, what it cost, and what it earned.",
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
      { value: "₹13.7 L", label: "order value on the same-day rule", note: "same-day attribution window" },
    ],
    flow: [
      { kind: "problem", title: "1.17 million shopkeepers we could not reach", body: "They had signed up, installed the app or ordered once, then gone quiet — the cheapest buyers to win back and the largest asset the company had. The only way to reach them was the app's push notifications, and when I measured push it was not arriving: of 11.76 million queued, 8.8% were confirmed delivered and 58% were never attempted. We needed a channel that reliably reached the phone." },
      { kind: "diagnosis", title: "WhatsApp reaches every shopkeeper — if it is run as a system", body: "Every kirana owner is on WhatsApp all day, so the channel was obvious. Running it well was not. Sending to a million people without an audience model means messaging shopkeepers we cannot deliver to, paying marketing prices for transactional messages, and paying a vendor a cut on every one. Done naively, WhatsApp would burn money faster than push had." },
      { kind: "decision", title: "Build the channel as a system", body: "I sorted all 1.17 million buyers into seven groups so that every person got exactly one kind of message and nobody outside our delivery area got any. Order updates went out at WhatsApp's transactional rate, about a seventh of the marketing rate. And we stopped paying a middleman to send: doing it ourselves cut the cost of every message by a fifth." },
      { kind: "outcome", title: "₹9.60 per install", body: "In June the channel acquired 29,172 buyers at ₹9.60 per app install and produced ₹13.7 lakh of orders on a same-day attribution rule — a 2.60× return on spend. The unit economics became a standing rule for the channel: spend continues while the return clears the take-rate breakeven." },
    ],
    changes: [
      "Sorted all 1,167,517 buyers into seven groups — a live cart, a recent order, a lapsed buyer, and so on — so every person got one right message and nobody we could not deliver to got any.",
      "Sent order updates at WhatsApp's transactional rate, about a seventh of the marketing rate.",
      "Stopped paying a middleman to send: ₹0.145 → ₹0.115 a message on about 169,000 messages a month.",
      "Found the reporting error that made the channel look like it was failing — only 117 of 537 real buyers were being counted — and fixed the count.",
      "Credited the channel only for orders placed the same day as a message, so every rupee claimed for it could be traced to an order.",
      "Wrote the first working version of a WhatsApp sales assistant that takes a shopkeeper's order in chat, in one sitting, with the handover document the team built on.",
    ],
    metrics: [
      { value: "₹1.87 L → ₹1.57 L", label: "monthly spend, June to July" },
      { value: "647 → 251", label: "orders credited, same-day rule" },
      { value: "3.3% → 10.8%", label: "WhatsApp buyers who ordered", note: "June against September" },
      { value: "₹0.145 → ₹0.115", label: "cost per message once we sent it ourselves" },
      { value: "8.8% / 58%", label: "of push notifications confirmed delivered / never attempted", note: "why a new channel was needed" },
    ],
    takeaways: ["A channel number is not a business number.", "Price a channel before you scale it."],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "buyer-app-plg",
    title: "Lifted registration completion from 30% to 94% by deleting steps",
    short: "A year of product-led growth on the buyer app — onboarding, the unified cart, the home screen, catalogue and support — done mostly by removing steps.",
    lede: "I ran the buyer app's roadmap for a year and measured every change against what buyers actually did.",
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
      { kind: "problem", title: "Installs we paid for were not becoming orders", body: "About 3,000 shopkeepers opened the app each day, 300 started a cart and 120 ordered — and four in five daily users had never placed an order at all. Every install that stalled before its first order was acquisition spend lost, and the app itself was where it leaked." },
      { kind: "diagnosis", title: "All the friction sat before the buyer had decided to stay", body: "After entering the OTP a new shopkeeper faced a profile form, a language pop-up and an extra tap; his first order carried a minimum; and every brand in his cart needed a separate checkout. Each step asked a question that some buyers answered by leaving. 21,064 of them abandoned the form in three weeks." },
      { kind: "decision", title: "Remove steps rather than add features", body: "Delete the profile form and let the OTP read itself in. Set the app's language from the shop's location instead of asking. Merge the per-brand checkouts into one cart and one payment. And put the margin on the product card, because margin is what a shopkeeper actually decides on." },
      { kind: "outcome", title: "Registration completion 30% → 94%", body: "Mid-form abandons fell from 21,064 to 9 per three weeks. The unified cart carried 99% of order flow within seven days, two-thirds of carts held two or more sellers, and orders per active buyer rose 41%." },
    ],
    changes: [
      "Removed the profile form after the OTP and made the OTP read itself in: completion 57.3% → 94.2% the next day; first-time buyers +40% in the fortnight after.",
      "Merged the separate per-brand checkouts into one cart and one payment: 99% of orders were on it within seven days; orders per active buyer +41%.",
      "Set the app's language from the shop's location instead of asking: buyers in non-Hindi states handed a Hindi app fell from 38–46% to under 1%.",
      "Moved margin onto the product card, brought category tabs to the top, shipped a support tab with a named relationship manager for 1.47 M buyers.",
      "Found and fixed a reporting error that had been understating the company's daily active buyers by 108%.",
      "Showed that a reported collapse in home-screen engagement after the rebuild was a measurement gap, not buyer behaviour: checkout intent underneath it was up 11%.",
    ],
    metrics: [
      { value: "326 → 1,758", label: "orders placed a week", note: "30 Mar to 15 Jun 2026" },
      { value: "509 → 723", label: "first-time buyers a week", note: "either side of the lower first-order floor" },
      { value: "34% → 61%", label: "active buyers who started a cart", note: "after the ₹75 credit" },
      { value: "108%", label: "DAU under-count found and fixed", note: "a reporting error in the company's active-buyer count" },
    ],
    takeaways: ["Every question asked before a buyer has decided to stay is one that some answer by leaving.", "When a change succeeds, check what it stopped producing."],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: "move-it-daas",
    title: "DAAS: sell distributors a truck by the day, booked from a photo of the invoice",
    short: "A delivery service for the FMCG distributors already on our marketplace. One truck-day at a time, no lease, drops built from photographed invoices, cash in the distributor's bank the same day.",
    lede: "Joint product owner with Aditya Kumar: the idea, the operating flow, the failure taxonomy, cash custody and the commercial side.",
    tier: 1,
    themes: ["Strategy", "Go-to-market", "Unit economics"],
    period: "Jan – Sep 2026 · Badho",
    stack: ["Truck-day pricing", "Invoice OCR", "Address lock", "Route planning", "Two-party handover", "Cash ledger", "Failure taxonomy"],
    screens: [
      { src: "/screens/daas-van-road.webp", kind: "photo", alt: "Badho Delivery three-wheeler on the road", caption: "A Badho Delivery three-wheeler on the road — closed body, gas, built for market lanes" },
      { src: "/screens/daas-booking.webp", kind: "phone", alt: "Vehicle selection with day rates", caption: "Step 1 — book a truck by the day: 3-wheeler ₹1,602, 4-wheeler ₹2,000" },
      { src: "/screens/daas-upload-bills.webp", kind: "phone", alt: "Upload bills to process orders", caption: "Step 2 — upload the invoices; the drop list builds itself" },
      { src: "/screens/daas-driver-bill.webp", kind: "phone", alt: "Driver photographing an invoice", caption: "The driver photographs the bill; 17,678 invoices were read this way" },
    ],
    headline: [
      { value: "137 → 634", label: "truck-days booked a month", note: "Feb to Jul 2026. 3,016 in total" },
      { value: "17,174", label: "deliveries to 7,363 shops", note: "of 20,231 attempted — 85% first time" },
      { value: "₹18.95 Cr", label: "of goods moved", note: "₹21.5 L of fee income, 60 paying distributors" },
    ],
    idea: [
      { title: "A distributor pays for his truck whether it moves or not", body: "An FMCG distributor owns trucks and employs drivers to move goods from his warehouse to the shops around him, and the bill arrives every month whether goods moved or not: the driver's salary, the vehicle instalment, fuel, repairs, insurance and the capital parked in the vehicle — ₹53,500 to ₹64,500 a month for one truck. If the driver quits, that day's sales stop." },
      { title: "The trade is seasonal, so a fixed fleet is always the wrong size", body: "Demand swings with festivals. A fleet big enough for the season sits idle for months afterwards, and one sized for the quiet months cannot cope when it matters. Nobody was selling him a truck for only the days it moved." },
      { title: "So sell the day, not the truck", body: "That was the whole commercial idea. A distributor books a vehicle for an eight-hour duty, up to seven days ahead, at ₹1,400 to ₹2,000 a day, and pays nothing on the days he does not sell. We carry the fleet risk; he carries none." },
      { title: "And meet him at the paper", body: "His orders live on paper invoices, not in software. Every competitor asked him to integrate his accounting system first, which would have ended the conversation at the first meeting. We asked for a photograph of the invoice." },
    ],
    built: [
      { kind: "step", title: "Book a truck-day", body: "In the seller app the distributor picks a date up to seven days ahead, a vehicle class — a three-wheeler at ₹1,602 or a four-wheeler at ₹2,000 — and how many he needs." },
      { kind: "step", title: "Photograph the invoices", body: "He photographs the day's invoices and the drop list builds itself: ten to fifty drops set up in seconds, with the number of drops read from the bills rather than typed. 17,678 invoices were read this way." },
      { kind: "step", title: "Lock the address once", body: "Small shops rarely have a usable address, which is why third-party couriers fail on them. After the first successful delivery we pin the shop to its phone number and the GPS point where the driver actually stood, so the next driver goes straight there. That built a map of 7,363 real shops." },
      { kind: "step", title: "Plan the round", body: "The software plans the route, so the distributor no longer sits with a planner every morning or sends a helper along in the truck to show the way." },
      { kind: "step", title: "A code from both sides at every handover", body: "Each handover needs a code that both people hold, and the proof-of-delivery photograph is accepted only if the driver's location matches the shop. Proof exists for every drop, not only the disputed ones." },
      { kind: "step", title: "Cash in his bank the same day", body: "Cash collected at the shop is matched to the bill digitally and settled to the distributor's own bank account the same day, so any member of staff can do the handover and nothing depends on one person's memory." },
      { kind: "step", title: "A failed drop becomes information", body: "When a delivery fails the driver picks a reason from a closed list — shop closed, refused, wrong address, payment not ready — and the tally goes to the distributor's sales team so they can act on it. A second attempt is a priced service." },
      { kind: "step", title: "Small closed vehicles", body: "Three-wheelers took 98.5% of trips because market lanes are narrow, and every body is closed because FMCG goods must stay sealed and dry. Four in five run on gas." },
    ],
    metricsTitle: "How the business performed",
    metrics: [
      { value: "137 → 634", label: "truck-days booked a month", note: "137, 286, 293, 387, 497, 634 — February to July" },
      { value: "68 / 60", label: "distributors who used it / who paid" },
      { value: "9 h vs 5 days", label: "own fleet vs courier, full round", note: "the courier leg alone averaged 5.02 days" },
      { value: "89% / 85%", label: "delivered eventually / first time" },
      { value: "₹21.5 L on ₹18.95 Cr", label: "fee income on goods moved", note: "a take of about 1.1%" },
      { value: "41% → 7%", label: "on-time pickup as volume tripled — found in the trip logs, made the next priority", note: "May to September" },
      { value: "19 truck-days", label: "booked by Badho's own JIT business in September", note: "the sister business paid the same price" },
    ],
    solved: [
      "Solved — the idle-truck cost. 60 distributors paid by the day instead of owning the vehicle: 3,016 truck-days, nothing paid on the days they did not sell.",
      "Solved — finding the shop. 85% of drops delivered first time, on shops with no usable address, where third-party courier rates fail.",
      "Solved — the paperwork barrier. Orders entered from photographs; no integration, no typing during the morning loading rush.",
      "Solved — cash reconciliation. Money in the distributor's own bank the same day, matched to the bills, by whoever did the handover.",
      "Solved — the sale itself. The pitch was about his money, not our software: a trip on his truck against a trip on ours over 22 delivery days. A claim he could check himself.",
      "Found what no report showed — on-time pickup slipping from 41% to 7% as volume tripled — by going through the trip logs, and made punctuality the next priority.",
    ],
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
      { value: "226", label: "distributors mapped", note: "4,778 feed retailers within 40 km of one" },
    ],
    flow: [
      { kind: "problem", title: "A partner brand's retail network with nobody serving it", body: "Kapila, a cattle-feed brand and Badho partner, had 226 distributors and thousands of feed retailers inside their territories — and orders through them had collapsed from 22,898 a month in October 2024 to 42 by July 2026. For the brand that was lost volume. For Badho it was a ready-made retail network with no channel reaching it." },
      { kind: "diagnosis", title: "Both sides were stuck on the same transport arithmetic", body: "A retailer buying half a tonne could not justify arranging and paying for a vehicle, so the small order was not worth placing. A distributor could not justify sending a vehicle for a small drop, so it was not worth serving. Nobody was refusing to trade; the economics of a small order had stopped either side from starting." },
      { kind: "decision", title: "Take the transport problem off both of them", body: "The retailer orders at factory rate through an app, pays nothing for delivery and never coordinates with a distributor; we route each order to whichever distributor is within 40 km and pay the transporter. I set a deliberately low half-tonne floor, wrote the ordering app myself with an AI coding assistant in an evening, and had it writing real purchase orders two days later." },
      { kind: "outcome", title: "Seventeen days to first delivery, and the demand was new", body: "Fifty-two of the fifty-three retailers who ordered, and thirty-one of the thirty-two distributors who fulfilled, had placed no order on the brand in the three months before launch — the channel created new demand rather than moving existing orders. I then identified retailer credit as the constraint on scaling, at 22% of ordered value, and specified the fix." },
    ],
    changes: [
      "Wrote the ordering app myself with an AI coding assistant — catalogue, login by OTP, location capture, routing to the nearest distributor — in one evening; it was placing real orders two days later.",
      "Designed the commercial model: one per-tonne payment to the distributor, a published rate for transporters, and free delivery to the retailer paid out of the ₹95-a-bag margin.",
      "Set a deliberately low half-tonne first order: 70% of orders sat exactly on it; larger baskets died between phone and truck.",
      "Opened allocation to every distributor within 40 km: 3× order flow.",
      "Instrumented the unit economics end to end — spread per bag, delivery share, credit exposure — before deciding how to scale.",
    ],
    metrics: [
      { value: "₹95 / bag", label: "structurally flat spread", note: "free delivery took ~51% of it" },
      { value: "70%", label: "of orders exactly on the half-tonne floor", note: "the floor was set where the buyer actually was" },
      { value: "3×", label: "order flow when opened to every distributor" },
      { value: "22%", label: "of ordered value exposed to retailer credit — the constraint to fix" },
      { value: "18 of 42", label: "commits in the app repo are mine" },
    ],
    takeaways: ["Check whether your growth is real before you report it.", "Design the floor for the buyer you have, not the buyer the distributor wants."],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: "pricing-experiments",
    title: "Ran four pricing experiments and found the one that paid",
    short: "Four pricing experiments — cart coupons, item-level quantity discounts, ₹1 trial products and a funded base-price cut — shipped in sequence and measured, with the one that paid found and scaled.",
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
      { kind: "problem", title: "We were paying for orders we would have got anyway", body: "A kirana shopkeeper decides on one number: what he pays against what he can sell it for. Badho's discounts sat behind coupon codes that he found at checkout — after he had already decided what to add. The money spent on discounts was not changing whether he bought the item." },
      { kind: "diagnosis", title: "High usage is not impact", body: "The first experiment proved it. Cart-level coupons — a code applied to the whole order at checkout — rose from 6.9% to 36.6% of orders, and conversion did not move at all. Buyers who were going to order took the discount; buyers who were not did not appear. The discount had to reach the buyer at the moment of decision, on the product itself." },
      { kind: "decision", title: "Put the discount on the item and scale it with quantity", body: "Per-product tiers that show on every product card, so the margin is visible while the shopkeeper is choosing and grows as he adds cases. Funded by re-routing the flat coupon budget rather than adding new spend. And a dashboard, which I built myself, to audit what every discount actually costs so the next decision has numbers." },
      { kind: "outcome", title: "Average order value +10.5%, on the same discount budget", body: "Within a week 45.9% of orders carried an item-level coupon, average order value rose from ₹809 to ₹894, and revenue per active buyer rose 12.2% on flat traffic — roughly ₹8 of extra gross for every extra rupee of discount. Flat coupon spend fell from ₹59,400 to ₹6,200 a week. Later, a 37-minute configuration change cut item-coupon spend by 45.7% with no loss of orders." },
    ],
    changes: [
      "Item-level quantity coupons across 24 brand sellers: 46% order adoption in seven days, AOV ₹809 → ₹894.",
      "Funded it by re-routing existing discount spend, not new budget: ~8× on the incremental rupee.",
      "₹1 trial products reached 68% of orders at zero incremental discount cost — a merchandising lever on basket mix.",
      "Built a dashboard that audits every discount: it flagged 43% of June's coupon orders discounting more than the rules allowed, ₹60,000 worth.",
    ],
    metrics: [
      { value: "6.9% → 36.6%", label: "orders carrying a funded coupon", note: "conversion flat" },
      { value: "₹1,133 vs ₹884", label: "order value with a coupon vs without" },
      { value: "0 → 35.3%", label: "orders with an item-level coupon" },
      { value: "2–8 pts", label: "lower 30-day repeat after a ₹1 first order", note: "a cheap order is not a customer" },
      { value: "43% / ₹60 k", label: "June coupon orders discounting more than the rules allowed", note: "caught by the audit dashboard" },
    ],
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
      { kind: "problem", title: "Four ways of paying buyers to return, and no idea which one worked", body: "By April Badho was paying shopkeepers to come back in four different ways: a monthly gift ladder for order value, a daily login reward, ₹75 of free wallet credit for first orders, and cash for referrals. The credit alone was a ₹4.57 crore programme. None of them had a holdout group, so nobody knew which one bought a repeat order and which bought nothing." },
      { kind: "diagnosis", title: "Query each scheme against repeat orders", body: "Shopkeepers who qualified for a gift re-ordered the next month at 50%, against 19% for everyone else. The ₹75 credit reached 609,245 buyers and 342 of them spent it. Referred buyers activated 6.7 times better than organic sign-ups but bought 3.9 times less per person." },
      { kind: "decision", title: "Scale what retained, stop what did not", body: "Point the relationship managers at gift qualifiers, the group already proven to return. Stop broadcasting wallet credit. Recruit referrers from the power buyers who bring buyers like themselves, instead of from everyone. And carry all of it on one notification programme with a daily cap per buyer." },
      { kind: "outcome", title: "The budget moved to what worked", body: "Gift qualifiers came to account for 31–44% of monthly order value at a cost of 7.8% of what they ordered. The referral programme's economics were measured for the first time — ₹47,840 paid out at 24.9% redemption — and its budget re-pointed. One referrer responsible for 30% of the programme's order value from a single neighbourhood was flagged, and a fraud rule specified." },
    ],
    changes: [
      "Gift ladder: qualifiers 11 → 168 a month. Found 74 buyers a month losing a gift to a returned parcel and fixed the rule.",
      "Measured the ₹75 credit run — 609,245 buyers credited, 342 spent it — and re-pointed that budget to what retained.",
      "Referral: 26.55% activation vs 3.99% organic, ₹151 vs ₹583 GMV per signup, a 24-hour half-life on the credit.",
      "Flagged one referrer whose 29 invitees all converted, from two postcodes — 30% of the programme's order value — and specified the fraud check that did not exist.",
      "Specified the measurement the referral programme never had: how many join, how many buy, what each reward costs, and who is gaming it.",
    ],
    metrics: [
      { value: "7.8%", label: "gift cost / qualifier order value" },
      { value: "289 of 12,116", label: "buyers given a code who referred anyone", note: "2% capture" },
      { value: "₹30,422", label: "of referral credit never touched", note: "64% of the budget issued and unused" },
      { value: "9 days", label: "the daily login reward actually ran" },
      { value: "2.8%", label: "referred buyers who ordered twice" },
      { value: "9.4–16.5%", label: "of each month's new buyers ordered again", note: "the retention floor under all of this" },
    ],
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
      { kind: "problem", title: "Renewals were the revenue", body: "ONO sold self-ordering kiosks and ordering software to restaurant chains, and its largest accounts — 79 kiosks at Herfy in Saudi Arabia, 34 at Taco Bell India — came up for renewal every six months. Renewals, price rises and contract terms decided whether the company had revenue next quarter. The price list did not answer the question a restaurant group asks first: rent it, or own it?" },
      { kind: "diagnosis", title: "A chain buying kiosks is making a capital decision", body: "It wants to compare a monthly subscription against buying the hardware outright, and it wants the number per kiosk, per store and per chain so it can scale the sum itself. A price list that does not answer in those terms gets negotiated line by line from scratch, every time." },
      { kind: "decision", title: "Rewrite the commercials around that decision", body: "I authored the pricing architecture — subscription against an ownership buyout, priced per kiosk, per store and per chain — and wrote the commercials for seven brands on it. On renewals I negotiated on the absolute change rather than the percentage, showed fifteen months of costs we had absorbed, and accepted the legal redlines that cost nothing so the one refusal on cash flow would be believed." },
      { kind: "outcome", title: "Three consecutive Herfy renewals", body: "Herfy accepted a two-riyal price increase, and a 15% withholding-tax dispute was settled at a 17.65% invoice gross-up. Six of seven redlines closed with the one that touched cash flow held. Formal partnerships were registered with GoFrugal and Petpooja — the point-of-sale systems through which chains we could not reach directly could still buy the product." },
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
    takeaways: ["Put open complaints next to revenue in every client report.", "Concede what costs you nothing, so the one refusal is believable."],
  },

  // ── 10 ────────────────────────────────────────────────────────────────
  {
    slug: "doka",
    title: "Built a custom ordering app with a design-your-own-cake flow for a nine-branch bakery",
    short: "DOKA's customers order ready-made cakes and sandwiches for delivery, pickup or dine-in — or design a cake step by step, shape to message, and watch it drawn and priced as they choose. In Arabic and English, paid by card or Apple Pay, tracked from the store's own kitchen.",
    lede: "Product manager for the app from the first prototype to App Store approval: the flows, the configurator, the rules, the content and the integrations.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "Feb 2025 – Feb 2026 · ONO Suite",
    stack: ["Two order flows", "Cake configurator", "Live pricing", "Scheduled delivery", "Store finder", "Card + Apple Pay", "Kitchen-fed tracking", "Arabic + English"],
    screens: [
      { src: "/screens/doka-home.webp", kind: "phone", alt: "DOKA home with Make My Cake banner and deal of the day", caption: "Home: Make My Cake, the ready-made menu, deal of the day — managed by the bakery from an admin panel" },
      { src: "/screens/doka-experience.webp", kind: "phone", alt: "Choose your experience", caption: "Two flows: order ready-made for delivery, pickup or dine-in — or make your cake" },
      { src: "/screens/doka-shape.webp", kind: "phone", alt: "Shape and size step", caption: "Step 1 — shape and size, each labelled by how many people it feeds" },
      { src: "/screens/doka-colour.webp", kind: "phone", alt: "Colour step with the cake rendered", caption: "Step 3 — colour, drawn onto the cake on screen" },
      { src: "/screens/doka-configurator.webp", kind: "phone", alt: "Decoration step", caption: "Step 4 — decorations by theme, layered onto the cake" },
      { src: "/screens/doka-write.webp", kind: "phone", alt: "Write on the cake and upload a photo", caption: "Step 5 — write on the cake, or upload a picture for it" },
      { src: "/screens/doka-cart.webp", kind: "phone", alt: "Cart with the customised cake", caption: "The designed cake in the cart, with its live price" },
      { src: "/screens/doka-stores.webp", kind: "phone", alt: "Outlets near you", caption: "Nearest branch first — nine to choose from" },
      { src: "/screens/doka-payment.webp", kind: "phone", alt: "Card payment", caption: "Card with 3-D Secure, Apple Pay, or cash on delivery" },
      { src: "/screens/doka-tracking.webp", kind: "phone", alt: "Order tracking", caption: "Placed → accepted → being prepared → ready → on the way → delivered, fed from the store's kitchen system" },
      { src: "/screens/doka-prototype.webp", kind: "phone", alt: "The clickable prototype", caption: "Where it started: the clickable prototype the client first saw" },
    ],
    cover: { src: "/screens/doka-configurator.webp", kind: "phone", alt: "", caption: "" },
    headline: [
      { value: "9 branches", label: "on one app, in Arabic and English", note: "215 menu items mapped to the store's point-of-sale system" },
      { value: "5 steps", label: "to design a cake — shape, flavour, colour, decoration, message", note: "drawn on screen and priced live as the customer chooses" },
      { value: "iOS approved", label: "December 2025", note: "card, Apple Pay, scheduled delivery, kitchen-fed tracking" },
    ],
    flow: [
      { kind: "problem", title: "A custom cake needed a phone call, and the brand had no app", body: "DOKA is a cake and bakery chain with nine branches in Riyadh that took every order by phone or over the counter. A custom cake — its highest-margin product — meant a conversation each time, and there was no way for a customer to order one at eleven at night. The brand needed its own app, and the custom cake had to be something a customer could design alone." },
      { kind: "diagnosis", title: "Two products that behave differently were being forced into one flow", body: "Ready-made cakes and sandwiches are ordered now, from the nearest branch, for delivery, pickup or dine-in. A custom cake is made in one central kitchen, needs lead time, and must be described precisely enough for a baker to make it. Treating a designed cake as just another item in the same cart would have broken both." },
      { kind: "decision", title: "Two flows under one account, and a cake you can see as you design it", body: "Ready to Order: pick a branch, order now or later, pay, track. Make My Cake: five steps — shape and size, flavour, colour, decoration, personalise — with the cake redrawn after every choice and the price updating live, and a photograph of the finished design sent to the kitchen. I wrote the rules for each step, supplied the size-and-servings table, and loaded the menu and mapped it to the store's system myself." },
      { kind: "outcome", title: "Approved on the App Store, running in two languages", body: "Apple approved the app in December 2025. It takes card and Apple Pay, schedules delivery to a date and time window, finds the nearest of nine branches, and shows the customer the order's real progress from the store's kitchen system — placed, accepted, being prepared, ready, on the way, delivered." },
    ],
    features: [
      { title: "Two order flows under one account", body: "Ready to Order for delivery, pickup or dine-in from the nearest branch, now or later. Make My Cake as its own flow with its own kitchen, lead time and rules. A customer moves between them without logging in twice." },
      { title: "Design-your-own cake in five steps", body: "Shape and size, flavour, colour, decoration, personalise — progress shown at the top, the cake redrawn after each choice. Shape is required; everything else can be skipped." },
      { title: "Shape and size, priced by servings", body: "Rounded, heart, square and rectangle, each with sizes labelled by how many people they feed. I wrote the size-and-servings table the bakery prices from." },
      { title: "Colour drawn onto the cake, not photographed", body: "Fondant or cream, a swatch palette, and the chosen colour rendered on the cake image on screen — so no photo library of every combination was ever needed." },
      { title: "Decorations by theme", body: "Retro, memes, birthday, sweets, balloons and sprinklers, filtered to what works on fondant or on cream. The icons, labels and Arabic names the customer sees were entered by me." },
      { title: "Write on the cake, or put a picture on it", body: "A 40-character message, an image upload with placement on top, on the side or on a card, and remarks for the baker. The finished design is photographed and sent to the kitchen with the order." },
      { title: "A live price as the customer chooses", body: "Every step updates the price, so nobody reaches the cart surprised." },
      { title: "Nearest branch, and delivery when the customer wants it", body: "Store search from the customer's location with branches listed by distance, and delivery or pickup now or in a chosen date-and-time window — because most of DOKA's orders are placed ahead." },
      { title: "Login and payment built for Saudi customers", body: "Phone login with a six-digit OTP; card payment with 3-D Secure and Apple Pay; cash on delivery for ready-made orders." },
      { title: "Order tracking from the store's own kitchen", body: "Placed, accepted, being prepared, ready, on the way, delivered — each state fed by the store's point-of-sale system, so the app shows what the kitchen knows rather than a timer." },
      { title: "Arabic and English throughout", body: "Every screen, decoration name and message in both languages, because most of DOKA's customers read Arabic." },
      { title: "A home the bakery runs itself", body: "Banners, deal of the day, occasions and the ready-made menu managed from an admin panel, with loyalty points and coupons inside the app." },
    ],
    changes: [
      "Pitched the app to the client with a clickable prototype and led the product from that prototype to App Store approval.",
      "Wrote the rules for each configurator step — what is required, what can be skipped, which decorations go on which base — and the size-and-servings table the bakery prices from.",
      "Loaded the menu, the branch locations and the decoration names in both languages, and mapped 215 items to the store's point-of-sale system myself.",
      "Ran the weekly status with the client — done, pending, next — across some twenty-five work items.",
      "Kept Make My Cake as its own flow when the client asked to fold it into the ordering menu, because a designed cake and a sandwich cannot share a cart.",
    ],
    metricsTitle: "What shipped",
    metrics: [
      { value: "215", label: "menu items mapped to the store's point-of-sale system", note: "across nine branches" },
      { value: "4 shapes · 3 angles", label: "each cake drawn from the slice, the top and the side" },
      { value: "6 states", label: "of order progress shown from the kitchen" },
      { value: "40 characters", label: "of writing on the cake, plus an uploaded picture" },
      { value: "2 languages", label: "Arabic and English on every screen" },
      { value: "~95%", label: "core functionality complete at the 8 September status report" },
    ],
    solved: [
      "Solved — a custom cake ordered without a phone call, described precisely enough for a baker to make it.",
      "Solved — ready-made ordering from the nearest of nine branches, now or scheduled, for delivery, pickup or dine-in.",
      "Solved — no photo library of every combination: colour is drawn, decorations are layered, and the finished design is photographed for the kitchen.",
      "Solved — the customer sees the order's real progress from the store's kitchen, not a countdown.",
      "Solved — Arabic-first customers served in their own language.",
    ],
    takeaways: ["Pitch something the client can tap.", "Two products that behave differently need two flows, not one cart."],
  },
  {
    slug: "ono-product",
    title: "Built the self-ordering kiosk product for restaurant chains",
    short: "The kiosk a customer walks up to in a Taco Bell, Herfy or Wow Momo store: I owned what it did — the ordering flows, the offer engine, WhatsApp bills, loyalty, payments, the point-of-sale connections — and the weekly numbers it produced for the client.",
    lede: "Product owner for the kiosk, from what a store needed to what shipped, across ₹4.19 crore of kiosk sales in 19 Taco Bell stores.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "2024 – 2026 · ONO Suite",
    stack: ["Self-ordering kiosk", "Offer engine", "WhatsApp e-bills", "Loyalty", "POS integrations", "Weekly reporting"],
    screens: [
      { src: "/screens/kiosk-tacobell.webp", kind: "kiosk", alt: "ONO kiosk in a Taco Bell store", caption: "The product in a Taco Bell store — 34 kiosks across 19 malls ran on it" },
      { src: "/screens/kiosk-promo-rs1.webp", kind: "kiosk", alt: "₹1 Wednesdays campaign on the kiosk", caption: "₹1 Wednesdays: churros at ₹1 with select products — the offer engine I specified, running as a campaign" },
      { src: "/screens/kiosk-promo-mealmania.webp", kind: "kiosk", alt: "Meal Mania ₹89 combo campaign screen", caption: "Meal Mania at ₹89 — combo campaigns pushed to every kiosk screen saver" },
      { src: "/screens/kiosk-jk-dinein.webp", kind: "kiosk", alt: "Dine-in ordering screen", caption: "Dine-in: table number, categories, menu, customise, cart, pay" },
      { src: "/screens/kiosk-tacobell-pay.webp", kind: "kiosk", alt: "QR payment on the kiosk", caption: "Pay by UPI QR, card or at the counter" },
    ],
    headline: [
      { value: "₹4.19 Cr", label: "kiosk sales across 19 Taco Bell stores", note: "41 weeks, from the weekly report I produced" },
      { value: "34 kiosks", label: "in 19 malls across all four regions of India" },
      { value: "6+ brands", label: "running the kiosk product", note: "Taco Bell, Herfy, Wow Momo, Jumbo King, Frozen Bottle, Burger Singh, SVS" },
    ],
    flow: [
      { kind: "problem", title: "A kiosk earns its fee only when customers can order on it without help", body: "ONO's kiosks sat in quick-service restaurants where a customer walks up, taps, pays and collects. Every store had promotions, combos and payment methods the kiosk had to handle exactly as the counter did, and every chain ran a different point-of-sale system behind it. A kiosk that could not run the store's offer, or lost an order on the way to the kitchen, cost the client sales and cost ONO the account." },
      { kind: "diagnosis", title: "Most failures were features the product did not have yet", body: "Two live failures in one week at Taco Bell were both promotions the kiosk could not express: a ₹1 add-on tied to a parent item, and a buy-one-get-one that had to scale with quantity. Stores wanted dine-in without a table number, different hours for dine-in and take-away, a shorter idle screen, and bills on WhatsApp. None of it was exotic. It just had to be specified precisely and built." },
      { kind: "decision", title: "Own the kiosk as a product, not a deployment", body: "I wrote each store problem up as a requirement with the rule stated exactly — what the offer must and must not allow, what the message must say, what a store can switch on or off — and ran promotions on the kiosk myself so the specifications were tested in real trade. For point-of-sale connections I wrote the contract the vendor's engineers needed instead of holding meetings. And I built the weekly report so the client could see what the kiosks were earning." },
      { kind: "outcome", title: "A product six chains ran, and a client who could see it working", body: "The kiosk handled conditional offers, combos and modifiers, dine-in and take-away, loyalty points and coupons, WhatsApp bills and order updates, and four point-of-sale systems. Taco Bell received eleven weekly reports on sales, per-store order value and per-kiosk uptime across an estate that did ₹4.19 crore of kiosk sales in 41 weeks, and renewed for 34 kiosks." },
    ],
    features: [
      { title: "Offer engine: ₹1 add-ons and buy-one-get-N", body: "A store wanted a wheat taco at ₹1 with a 7-layer burrito, and the kiosk had no way to say it. I specified the rule: the ₹1 item can only be added while its parent is in the cart, is removed automatically if the parent goes, and never doubles up on one parent. Buy-one-get-one was giving one free item however many were bought; the rule now scales with quantity. The ₹1 Wednesdays campaign ran on this." },
      { title: "Dine-in and take-away that fit each store", body: "Table-number entry for dine-in, take-away without it, and — for stores that needed it — dine-in without a table number at all. Separate opening hours for dine-in and take-away per store, and per-store configurations so one mall could run differently from another." },
      { title: "Bills and order updates on WhatsApp", body: "A phone number captured at the kiosk, an e-bill sent to it, and an order-ready message worded differently for dine-in and take-away. A third message became a store-specific review link." },
      { title: "Combos, modifiers and pricing rules", body: "Quantity on modifier options, the lower-price option selected by default, coupons disabled on combo items, and slash pricing on the menu — the rules a counter follows, written for a screen." },
      { title: "Loyalty and coupons at the kiosk", body: "Points earned and redeemed inside the kiosk flow through a loyalty integration, a coupon panel with welcome and campaign codes, and the loyalty copy a customer actually reads." },
      { title: "Payment-delay enforcement built into the product", body: "When a client's subscription payment crossed its deadline, the kiosk showed an automatic overdue notice, escalated to the store's manager and then senior management, and gated start-up after 15 and 30 days — collections enforced by the product instead of by chasing." },
      { title: "Point-of-sale connections for four systems", body: "GoFrugal, Petpooja, POSIST and Rista. Menu, price, description and tax sync from the POS; images managed in the kiosk; a written five-case contract for orders and status so a vendor's engineers could build without a meeting." },
      { title: "Campaigns on the kiosk itself", body: "Screen savers and banners for each promotion — ₹1 Wednesdays, Meal Mania at ₹89, the Ultimate Cheese Crunchwrap — and 32 combos repriced to a flat ₹129 or ₹149 for National Taco Day, with cost of sale checked per item." },
      { title: "Operating details a store notices", body: "Idle screen back to 30 seconds from over a minute. Kiosk audio. Accessibility and language options on every screen. A menu of 115 items kept in sync." },
      { title: "A weekly report the client ran the estate on", body: "Sales, per-store ranking and the biggest droppers, regional trend, order value per store and uptime per kiosk, with revenue set against uptime so a store that was down showed as a store losing money. Eleven decks, every one produced by me." },
    ],
    chart: {
      title: "What the kiosks earned, week by week",
      kicker: "Kiosk sales across 19 Taco Bell stores, 31 December 2023 to 6 October 2024, from the weekly report.",
      caption: "₹4.19 crore over 41 weeks — an average of ₹10.2 lakh a week, peaking at ₹15 lakh. The weekly report I produced from late May tracked this against per-store order value and per-kiosk uptime.",
      unit: "L",
      data: [
        { m: "Dec 23", v: 14.86 },
        { m: "", v: 15.03, note: "Peak week" },
        { m: "", v: 14.42 },
        { m: "", v: 13.7 },
        { m: "", v: 10.37 },
        { m: "Feb", v: 2.34 },
        { m: "", v: 7.42 },
        { m: "", v: 7.35 },
        { m: "", v: 7.36 },
        { m: "Mar", v: 8.04 },
        { m: "", v: 8.27 },
        { m: "", v: 7.63 },
        { m: "", v: 9.95 },
        { m: "", v: 9.83 },
        { m: "Apr", v: 9.98 },
        { m: "", v: 9.07 },
        { m: "", v: 7.18 },
        { m: "", v: 7.78 },
        { m: "May", v: 4.4 },
        { m: "", v: 6.94 },
        { m: "", v: 7.54 },
        { m: "", v: 7.48, note: "Reporting starts" },
        { m: "Jun", v: 8.37 },
        { m: "", v: 9.49 },
        { m: "", v: 10.56 },
        { m: "", v: 10.36 },
        { m: "", v: 12.53 },
        { m: "Jul", v: 14.76 },
        { m: "", v: 14.33 },
        { m: "", v: 13.13 },
        { m: "", v: 12.6 },
        { m: "Aug", v: 11.88 },
        { m: "", v: 14.26 },
        { m: "", v: 11.29 },
        { m: "", v: 11.75 },
        { m: "Sep", v: 10.37 },
        { m: "", v: 9.79 },
        { m: "", v: 10.84 },
        { m: "", v: 10.02 },
        { m: "", v: 13.35 },
        { m: "Oct", v: 12.06, note: "Last deck" }
      ],
    },
    metricsTitle: "How the product performed",
    metrics: [
      { value: "₹10.2 L", label: "average weekly kiosk sales", note: "41 weeks, 19 stores" },
      { value: "₹222 – ₹474", label: "average order value by store", note: "week of 6 October 2024" },
      { value: "up to 96.5 h", label: "weekly uptime per kiosk, tracked individually", note: "33 kiosks reported every week" },
      { value: "11", label: "weekly report decks for the franchisee", note: "May to October 2024" },
      { value: "32 combos", label: "repriced for National Taco Day", note: "flat ₹129 or ₹149, cost of sale checked per item" },
      { value: "79", label: "live Herfy kiosks across three consecutive renewals" },
      { value: "4", label: "point-of-sale systems connected" },
      { value: "₹2,400", label: "per kiosk per month, Taco Bell", note: "34 kiosks renewed for six months" },
    ],
    solved: [
      "Solved — promotions the counter could run but the kiosk could not. Conditional offers, scaling freebies and combo rules now ran on screen exactly as at the till.",
      "Solved — one product for many kinds of store. Dine-in, take-away, table or no table, different hours, per-store configuration.",
      "Solved — the customer's bill and status without a printer or a queue. WhatsApp e-bills and order-ready messages.",
      "Solved — connecting to whatever point-of-sale a chain already ran. Four systems, one written contract.",
      "Solved — the client knowing what the kiosks earned. A weekly report on sales, order value and uptime, store by store.",
      "Solved — getting paid. Overdue notices and start-up gating built into the kiosk itself.",
    ],
    takeaways: ["Write the store's problem as the rule the screen must follow.", "Give the other side's engineers the document, not the meeting."],
  },
  {
    slug: "vernacular-search",
    title: "Specified a search that understands how shopkeepers actually type",
    short: "A search that understands Hindi typed in English letters, phonetic spellings and brand names used for products, with a loop that learns new synonyms from real queries.",
    lede: "I defined what search had to understand about the way shopkeepers type.",
    tier: 1,
    themes: ["Product"],
    period: "Nov 2025 – Jun 2026 · Badho",
    stack: ["Synonym model", "Query learning", "Hindi labels", "Misspelling map", "Exact-first ranking"],
    screens: [
      { src: "/screens/plg-filters.webp", kind: "phone", alt: "Search bar in Hindi", caption: "Search in Hindi — “प्रोडक्ट या ब्रांड सर्च करें” — ranked exact-first" },
    ],
    headline: [
      { value: "699,684", label: "synonyms live in search" },
      { value: "32,536", label: "product terms, every one live in search" },
      { value: "24.9 vs 11.7", label: "ways of saying each product — learned from buyers vs from the catalogue" },
    ],
    flow: [
      { kind: "problem", title: "A shopkeeper who cannot find the product does not order it", body: "Badho's buyers run kirana shops in smaller cities and type the way they speak: Hindi in English letters, by brand name rather than product, with spelling that varies from shop to shop. The catalogue was written in English product names. Four in five searches returned nothing." },
      { kind: "diagnosis", title: "The buyers' own words were the richest source", body: "The words buyers actually typed gave us 24.9 ways of saying each product, against 11.7 from the catalogue's own descriptions. Someone typing 'all out' wants mosquito repellent, and only the search log knows that." },
      { kind: "decision", title: "Four kinds of synonym, exact match first, and a loop that keeps learning", body: "I specified that search should understand four things a shopkeeper does: use a brand name for a product, write Hindi in English letters, spell by sound, and describe rather than name. Exact matches show first so the right product is never buried, and every new word buyers type is learned and added." },
      { kind: "outcome", title: "699,684 synonyms, all live", body: "Across 32,536 product terms, all live in search, with 98% of the learned words added in the first month and 68,203 misspellings recognised." },
    ],
    changes: [
      "Specified the four ways a shopkeeper's words differ from the catalogue's — brand for product, Hindi in English letters, spelling by sound, description instead of name — and had search handle each.",
      "Had search learn from what buyers type, so words we never thought of arrive on their own.",
      "Put exact matches first so the right product is never buried under near-misses.",
      "Grew the list of recognised misspellings from 28,328 to 68,203.",
    ],
    metrics: [
      { value: "98.1%", label: "of learned synonyms built in one month" },
      { value: "28,328 → 68,203", label: "misspellings recognised" },
    ],
    takeaways: ["Instrument the failure before building the fix."],
  },

  // ── Tier 2 ─────────────────────────────────────────────────────────────
  {
    slug: "release-gate",
    title: "Ran the release gate for three apps out of one codebase",
    short: "Ownership of every release that reached shopkeepers, sellers and drivers, and of the specification pipeline that fed it.",
    lede: "Programme management. The whole cycle from ticket to production.",
    tier: 2,
    themes: ["Product"],
    period: "Oct 2025 – Sep 2026 · Badho",
    stack: ["Monorepo releases", "PR review", "Release notes", "Play Store", "Jira"],
    headline: [
      { value: "489 of 1,585", label: "tickets specified — most in the company", note: "192 full requirement documents" },
      { value: "805 of 1,613", label: "code changes reviewed and shipped" },
      { value: "242", label: "release versions, 7.153 → 8.255", note: "every one of 204 releases signed off" },
    ],
    flow: [
      { kind: "problem", title: "Three apps, one codebase, and releases that slipped", body: "The buyer, seller and driver apps all shipped from one repository to shopkeepers, distributors and drivers. 114 bugs a month were arriving, nobody owned what reached production, and the growth plan depended on shipping every week." },
      { kind: "diagnosis", title: "The gap was specification and gatekeeping, not effort", body: "Tickets reached engineers under-specified, so builds went back and forth. With no single gate on the production branch, whatever was ready went out, whether or not it had been tested." },
      { kind: "decision", title: "Own the whole cycle", body: "Specify the work properly, sit between the founder, the product managers and the engineers, sign off every release before it reaches a shop, and write the release notes that support and operations run on." },
      { kind: "outcome", title: "242 releases, bug inflow to near zero", body: "Every one of 204 releases went through the gate; 805 of 1,613 code changes were reviewed and shipped; 489 tickets and 192 full requirement documents were written — the most in the company — and monthly bug inflow fell from 114 to near zero." },
    ],
    changes: [
      "Wrote 489 tickets and 192 full requirement documents — the most of anyone in the company.",
      "Reviewed and shipped 805 of 1,613 code changes; every one of 204 releases signed off.",
      "Ran QA, Play Store listings and rollouts; monthly bug inflow from 114 to near zero.",
      "Program-managed eleven epics for the four-person AI pod that put 20 systems into production.",
    ],
  },
  {
    slug: "crm-brain",
    title: "Built the notification system every retention scheme ran on",
    short: "The system that decides which shopkeeper gets which message and when: reusable audiences, test-and-control groups, a daily cap, and a plain-language way to define a segment.",
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
      { kind: "problem", title: "Every retention scheme needed to reach the right shopkeeper at the right moment", body: "But notifications wrote straight to the production database, so personalised sending at scale would have taken the app down with it. Without a sending system, the gift ladder, the wallet credit and the reactivation programmes had no way to reach anyone." },
      { kind: "diagnosis", title: "Sending had to leave the live database, and audiences had to be countable", body: "Campaign sending had to run off a copy of the buyer base, each audience had to be defined precisely enough to count, and the total a buyer receives in a day had to be capped — or every team's campaigns would stack on the same phone." },
      { kind: "decision", title: "A pipeline off a nightly copy, 31 named audiences, a daily cap", body: "I specified a sending system that works off a nightly copy of the buyer list so the live app is never slowed, 31 audiences each defined precisely enough to count, a cap of 8–10 messages per buyer per day across every team, and a first-week sequence that offers a referral once the first order lands." },
      { kind: "outcome", title: "The programme every retention scheme ran on", body: "Gift ladder, wallet credit, referrals and reactivation all sent through it without touching the production database, and the twelve order-status WhatsApp templates it runs send exactly one message per order per stage." },
    ],
    changes: [
      "Specified a sending system that works off a nightly copy of the buyer list, so campaigns never slow the live app.",
      "Defined 31 audiences, each as a question with a number: what it is, how many, why now.",
      "Set a hard cap of 8–10 notifications per buyer per day across every sender.",
      "Wrote the 12 order-status WhatsApp templates: one message per order per stage.",
    ],
  },
  {
    slug: "ai-pod",
    title: "Ran the programme for an AI team that shipped 20 systems",
    short: "Product matching, catalogue enrichment, weight estimation, the synonym generator, fleet agents, a sales agent, a courier autopilot — programme-managed from epic to production.",
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
      { kind: "problem", title: "Four engineers, twenty candidate systems, one model budget", body: "With no sequencing, no acceptance bar and no cost governance, the team would have shipped whatever was most interesting rather than what the business needed next, and the model bill would have been a surprise every month." },
      { kind: "diagnosis", title: "The constraint was programme, not talent", body: "The engineers could build any of the twenty. What was missing was a decision on which came first, a written definition of done for each, and someone watching what each system cost to run." },
      { kind: "decision", title: "Own the programme", body: "I raised 88 of the 98 AI tickets, sequenced the work into eleven epics, set the acceptance bar per system and governed the model spend." },
      { kind: "outcome", title: "Twenty systems in production", body: "Product matching, catalogue enrichment, weight estimation, search synonyms, delivery fleet agents, a WhatsApp sales agent and a courier operations autopilot — all live, on budget." },
    ],
    changes: ["Raised 88 of 98 AI tickets and ran eleven epics.", "Set the acceptance bar per system and governed model cost.", "Wrote the first working version of the WhatsApp sales agent that the pod then productionised."],
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
  { kind: "step", title: "Find the number that decides", body: "Every business has one number that says whether it works. For a marketplace it was contribution margin per order, not gross sales. I start by finding that number and making it the target." },
  { kind: "step", title: "Diagnose the arithmetic", body: "A stalled metric usually has a mechanical cause before it has a marketing one. Retention at Badho was not a campaign problem; it was three minimum order values on one cart. Returns were not a cost line; they were the entire loss." },
  { kind: "step", title: "Change the model, not the copy", body: "Once the cause is structural, the fix is structural: one seller instead of many, truck-days instead of leases, a deleted form instead of a better one, the discount on the item instead of at checkout." },
  { kind: "step", title: "Measure it, and report the number that survives an audit", body: "Every change is checked against what buyers actually did afterwards: an order is credited to a campaign only if it followed the message the same day, growth is tested against a group that did not get the change, and each metric's definition is written down before the fix so nobody can move it afterwards." },
];
