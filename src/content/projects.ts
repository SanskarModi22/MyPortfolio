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
      { kind: "diagnosis", title: "Returns were the entire loss", body: "I separated the profit and loss into its cost lines and found that returned parcels alone cost ₹13.71 lakh between January and August — 107% of the whole net loss. Splitting the order clock into its legs showed our own handover time had fallen thirteen-fold while the courier's leg never improved. The cost we did not control was the one sinking us." },
      { kind: "decision", title: "Define the number, then attack the biggest line each month", body: "I defined the metric the business would run on — CM1, which is commission minus discounts, delivery and marketing — and went after the largest cost line each month in turn. Freight first, by making it visible on every order and moving it onto sellers. Then discounts. Then returns, with a stack of rules: prepaid-only after a single return, address checks at checkout, and a delivery promise that paid out when missed." },
      { kind: "outcome", title: "Positive from July", body: "CM1 moved from −26% of order value in February to +11.5% in August and stayed positive from July. Delivery cost fell from 46% of order value to under 1%, the return rate halved from 42.6% to 21.4%, and the share of orders that actually reached the buyer rose from 22% to 64% while volume grew fourfold." },
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
    ],
    takeaways: ["Look for the arithmetic before you look for a campaign.", "Set a threshold from the distribution, not from a round number."],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-channel",
    title: "Built WhatsApp into an acquisition channel at ₹9.60 per install",
    short: "I built WhatsApp into Badho's acquisition and reactivation channel from zero: the audience model, the template economics, the sending stack and the attribution.",
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
      { value: "₹13.7 L", label: "order value on the same-day rule", note: "same-day attribution window" },
    ],
    flow: [
      { kind: "problem", title: "1.17 million shopkeepers we could not reach", body: "They had signed up, installed the app or ordered once, then gone quiet — the cheapest buyers to win back and the largest asset the company had. The only way to reach them was the app's push notifications, and when I measured push it was not arriving: of 11.76 million queued, 8.8% were confirmed delivered and 58% were never attempted. We needed a channel that reliably reached the phone." },
      { kind: "diagnosis", title: "WhatsApp reaches every shopkeeper — if it is run as a system", body: "Every kirana owner is on WhatsApp all day, so the channel was obvious. Running it well was not. Sending to a million people without an audience model means messaging shopkeepers we cannot deliver to, paying marketing prices for transactional messages, and paying a vendor a cut on every one. Done naively, WhatsApp would burn money faster than push had." },
      { kind: "decision", title: "Build the channel as a system", body: "I designed a seven-cohort audience model over all 1.17 million buyers, so every person lands in exactly one segment and nobody outside our delivery area is ever messaged. Transactional traffic was routed as utility templates, at roughly a seventh of the marketing price. And we replaced the vendor with our own sender, at ₹0.115 a message instead of ₹0.145." },
      { kind: "outcome", title: "₹9.60 per install", body: "In June the channel acquired 29,172 buyers at ₹9.60 per app install and produced ₹13.7 lakh of orders on a same-day attribution rule — a 2.60× return on spend. The unit economics became a standing rule for the channel: spend continues while the return clears the take-rate breakeven." },
    ],
    changes: [
      "Designed a seven-cohort priority waterfall over 1,167,517 buyers — mutually exclusive, exhaustive, serviceability-gated.",
      "Routed transactional traffic as utility templates: roughly a seventh of the marketing price.",
      "Replaced the vendor with our own sender: ₹0.145 → ₹0.115 a message on ~169 k messages a month.",
      "Found the attribution bug that hid the channel — 117 buyers visible out of 537 real — and rebuilt matching buyer by buyer.",
      "Built the attribution model on a same-day window with a within-buyer incrementality test, so every rupee credited to the channel stands up to audit.",
      "Wrote the first working version of the WhatsApp sales agent — request handling, prompts, messaging, auth and a policy layer — in one sitting, with its handover document.",
    ],
    metrics: [
      { value: "₹1.87 L → ₹1.57 L", label: "monthly spend, June to July" },
      { value: "647 → 251", label: "orders credited, same-day rule" },
      { value: "3.3% → 10.8%", label: "WhatsApp buyers who ordered", note: "June against September" },
      { value: "₹0.145 → ₹0.115", label: "cost per message, in-house" },
      { value: "8.8% / 58%", label: "push confirmed delivered / never attempted", note: "why the channel was built" },
    ],
    takeaways: ["A channel number is not a business number.", "Price a channel before you scale it."],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "buyer-app-plg",
    title: "Lifted registration completion from 30% to 94% by deleting steps",
    short: "A year of product-led growth on the buyer app — onboarding, the unified cart, the home screen, catalogue and support — done mostly by removing steps.",
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
      { kind: "problem", title: "Installs we paid for were not becoming orders", body: "About 3,000 shopkeepers opened the app each day, 300 started a cart and 120 ordered — and four in five daily users had never placed an order at all. Every install that stalled before its first order was acquisition spend lost, and the app itself was where it leaked." },
      { kind: "diagnosis", title: "All the friction sat before the buyer had decided to stay", body: "After entering the OTP a new shopkeeper faced a profile form, a language pop-up and an extra tap; his first order carried a minimum; and every brand in his cart needed a separate checkout. Each step asked a question that some buyers answered by leaving. 21,064 of them abandoned the form in three weeks." },
      { kind: "decision", title: "Remove steps rather than add features", body: "Delete the profile form and let the OTP read itself in. Set the app's language from the shop's location instead of asking. Merge the per-brand checkouts into one cart and one payment. And put the margin on the product card, because margin is what a shopkeeper actually decides on." },
      { kind: "outcome", title: "Registration completion 30% → 94%", body: "Mid-form abandons fell from 21,064 to 9 per three weeks. The unified cart carried 99% of order flow within seven days, two-thirds of carts held two or more sellers, and orders per active buyer rose 41%." },
    ],
    changes: [
      "Removed the post-OTP profile form and made OTP self-send: completion 57.3% → 94.2% overnight; first-time buyers +40% in the fortnight after.",
      "Unified cart across sellers: 99% of order flow migrated in seven days; orders per active buyer +41%.",
      "Set app language from shop location: wrong-language installs in non-Hindi states 38–46% → under 1%.",
      "Moved margin onto the product card, brought category tabs to the top, shipped a support tab with a named relationship manager for 1.47 M buyers.",
      "Found and fixed a DAU metric understating itself by 108% — a null-unsafe filter — and corrected the company's active-buyer series.",
      "Diagnosed a reported engagement collapse after the home rebuild as an instrumentation gap, not buyer behaviour: checkout intent was up 11% underneath it.",
    ],
    metrics: [
      { value: "326 → 1,758", label: "orders placed a week", note: "30 Mar to 15 Jun 2026" },
      { value: "509 → 723", label: "first-time buyers a week", note: "either side of the lower first-order floor" },
      { value: "34% → 61%", label: "active buyers who started a cart", note: "after the ₹75 credit" },
      { value: "108%", label: "DAU under-count found and fixed", note: "a null-unsafe filter in the company's active-buyer metric" },
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
      "Wrote the ordering web app with an AI coding assistant — catalogue, OTP login, GPS, nearest-distributor allocation — in one evening; real purchase orders two days later.",
      "Designed the commercial model: one per-tonne payment to the distributor, published transporter rate card, delivery as an acquisition subsidy out of a ₹95-per-bag spread.",
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
      "Built the discount-audit dashboard: flagged 43% of June's coupon orders discounting above configuration, ₹60 k.",
      "Set the anomaly threshold from what the configuration could produce, not from a round number.",
    ],
    metrics: [
      { value: "6.9% → 36.6%", label: "orders carrying a funded coupon", note: "conversion flat" },
      { value: "₹1,133 vs ₹884", label: "order value with a coupon vs without" },
      { value: "0 → 35.3%", label: "orders with an item-level coupon" },
      { value: "2–8 pts", label: "lower 30-day repeat after a ₹1 first order", note: "a cheap order is not a customer" },
      { value: "43% / ₹60 k", label: "June coupon orders above spec", note: "found by the audit tool" },
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
      { kind: "problem", title: "A second product into an account we already held", body: "DOKA is the cake brand of Herfy, our largest kiosk client, with nine branches in Riyadh that took every order by phone or over the counter. A custom cake meant a conversation each time. For ONO it was expansion revenue inside an existing relationship — if we could win the deal ourselves rather than wait to be asked." },
      { kind: "diagnosis", title: "The sale needed something to tap", body: "A proposal document would not have closed it. The client needed to watch a customer design a cake on a screen and see the price change as they chose, because that was the part nobody believed could be built without a photo library of every combination." },
      { kind: "decision", title: "Pitch with a prototype, price the scope, hold the line", body: "I built a clickable prototype and pitched it cold, then priced the scope through three rounds from $6,400 to $7,000 under Saudi law with 40/40/20 milestones. The product had two order flows — dine-in or take-away, and scheduled delivery — and a five-step cake configurator for shape, flavour, colour, decoration and message, rendered from three angles with the price updating as the customer chose." },
      { kind: "outcome", title: "Delivered to App Store approval", body: "Apple approved the app in December 2025, built with one developer, with 215 menu items mapped to the point-of-sale system across all nine branches and the configurator, both order flows and scheduled delivery in the approved build." },
    ],
    changes: [
      "Built the clickable prototype, cold-pitched it, priced scope through three rounds, signed under Saudi law.",
      "Specified dine-in, take-away and scheduled delivery flows, and a five-step configurator: shape, flavour, colour, decoration, message — redrawn from three angles.",
      "Chose to render colour and decoration variations rather than store photos the client could not supply.",
      "Reported status weekly in a form the client could act on, and held scope through three pricing rounds.",
    ],
    metrics: [
      { value: "40 / 40 / 20", label: "milestone split" },
      { value: "215", label: "menu items mapped to the POS" },
      { value: "~95%", label: "core functionality at the 8 Sep 2025 report" },
    ],
    takeaways: ["Pitch something the client can tap."],
  },

  // ── 11 ────────────────────────────────────────────────────────────────
  {
    slug: "ono-product",
    title: "Specified kiosk features and POS integrations for QSR chains",
    short: "Product ownership of self-ordering kiosks, QR ordering and menu screens for restaurant chains: the offer engine, the point-of-sale integration contract and the weekly client report.",
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
      { value: "79", label: "live Herfy kiosks across three consecutive renewals" },
      { value: "4 POS systems", label: "integrations specified or scoped" },
    ],
    flow: [
      { kind: "problem", title: "A kiosk only earns its fee if it runs every hour the store is open", body: "Two live failures in one week at Taco Bell put a 34-kiosk, 19-mall account at risk. And every new chain needed the kiosk wired to a different point-of-sale system — integrations that stalled in meetings instead of shipping, which meant chains we could not onboard." },
      { kind: "diagnosis", title: "Both were specification problems", body: "The kiosk promotions broke because the offer engine had no written rules for the cases the stores were actually running. The integrations stalled because point-of-sale vendors were being invited to a conversation when what their engineers needed was a payload." },
      { kind: "decision", title: "Write the bug as a requirement; hand the vendor a contract", body: "I turned the two failures into the offer-engine specification — a ₹1-with-purchase rule and a buy-one-get-N rule that scales — and wrote a five-case payload and webhook contract that went to GoFrugal, Petpooja, POSIST and Rista as a document rather than a meeting." },
      { kind: "outcome", title: "Integrations in weeks, reports that settled disputes", body: "Point-of-sale integrations moved from months of calls to weeks of implementation. Taco Bell received eleven weekly report decks on sales, per-location order value and per-kiosk uptime, and a billing dispute at Herfy was settled by querying 193,449 kiosk orders rather than arguing over a spreadsheet." },
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
    takeaways: ["Give the other side's engineers the payload, not a meeting."],
  },

  // ── 12 ────────────────────────────────────────────────────────────────
  {
    slug: "vernacular-search",
    title: "Specified a search that understands how shopkeepers actually type",
    short: "A search that understands Hindi typed in English letters, phonetic spellings and brand names used for products, with a loop that learns new synonyms from real queries.",
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
      { kind: "problem", title: "A shopkeeper who cannot find the product does not order it", body: "Badho's buyers run kirana shops in smaller cities and type the way they speak: Hindi in English letters, by brand name rather than product, with spelling that varies from shop to shop. The catalogue was written in English product names. Four in five searches returned nothing." },
      { kind: "diagnosis", title: "The buyers' own words were the richest source", body: "Synonyms learned from real search queries ran 24.9 per root word, against 11.7 from the catalogue's own descriptions. Someone typing 'all out' wants mosquito repellent, and only the search log knows that." },
      { kind: "decision", title: "Four kinds of synonym, exact match first, and a loop that keeps learning", body: "I specified brand-for-product, Roman-script Hindi, phonetic and catalogue-derived synonyms, with Hindi labels searched at equal weight and exact matches ranked first so precise results are never outranked by loose ones. New synonyms are learned from what buyers type and pushed live." },
      { kind: "outcome", title: "699,684 synonyms, all live", body: "Across 32,536 root words, every one reaching the live search engine, with 98% of the learned synonyms built in the first month and 68,203 misspellings mapped to their corrections." },
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
    ],
    takeaways: ["Instrument the failure before building the fix."],
  },

  // ── Tier 2 ─────────────────────────────────────────────────────────────
  {
    slug: "release-gate",
    title: "Ran the release gate for three apps out of one codebase",
    short: "Ownership of every merge to production, every release version and the release notes support ran on — and the specification pipeline that fed it.",
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
      { kind: "problem", title: "Three apps, one codebase, and releases that slipped", body: "The buyer, seller and driver apps all shipped from one repository to shopkeepers, distributors and drivers. 114 bugs a month were arriving, nobody owned what reached production, and the growth plan depended on shipping every week." },
      { kind: "diagnosis", title: "The gap was specification and gatekeeping, not effort", body: "Tickets reached engineers under-specified, so builds went back and forth. With no single gate on the production branch, whatever was ready went out, whether or not it had been tested." },
      { kind: "decision", title: "Own the whole cycle", body: "Specify the work properly, sit between the founder, the product managers and the engineers, run the release gate on every merge to production, and write the release notes that support and operations run on." },
      { kind: "outcome", title: "242 releases, bug inflow to near zero", body: "Every one of 204 release merges went through the gate; 805 of 1,613 pull requests were reviewed and merged; 489 tickets and 192 full requirement documents were written — the most in the company — and monthly bug inflow fell from 114 to near zero." },
    ],
    changes: [
      "Wrote 489 tickets and 192 full requirement documents — the most of anyone in the company.",
      "Merged 805 of 1,613 pull requests; 204 of 204 release merges on the production branch.",
      "Ran QA, Play Store listings and rollouts; monthly bug inflow from 114 to near zero.",
      "Program-managed eleven epics for the four-person AI pod that put 20 systems into production.",
    ],
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
      { kind: "problem", title: "Every retention scheme needed to reach the right shopkeeper at the right moment", body: "But notifications wrote straight to the production database, so personalised sending at scale would have taken the app down with it. Without a sending system, the gift ladder, the wallet credit and the reactivation programmes had no way to reach anyone." },
      { kind: "diagnosis", title: "Sending had to leave the live database, and audiences had to be countable", body: "Campaign sending had to run off a copy of the buyer base, each audience had to be defined precisely enough to count, and the total a buyer receives in a day had to be capped — or every team's campaigns would stack on the same phone." },
      { kind: "decision", title: "A pipeline off a nightly copy, 31 named audiences, a daily cap", body: "I specified a fetch-fill-send pipeline reading a nightly copy of the buyer base, 31 audiences each defined as a question with a number attached, a hard cap of 8–10 notifications per buyer per day across every sender, and a first-week sequence that swaps in a referral prompt once the first order lands." },
      { kind: "outcome", title: "The programme every retention scheme ran on", body: "Gift ladder, wallet credit, referrals and reactivation all sent through it without touching the production database, and the twelve order-status WhatsApp templates it runs send exactly one message per order per stage." },
    ],
    changes: [
      "Specified a fetch → fill → send pipeline off a nightly replica so campaigns never touched production.",
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
  { kind: "step", title: "Measure it, and report the number that survives an audit", body: "Every change goes back to the database. Attribution on same-day windows, incrementality tests rather than influence counts, and the definition of each metric written down before the fix so nobody can move it afterwards." },
];
