// Portfolio content. Every figure traces to a Jira ticket, a Slack thread, a
// commit, a screen recording or a production query. Where a number is the
// company's own reporting rather than my measurement, the text says so.
// Nothing here is estimated, and the failures are on the page on purpose.

export type Theme = "Product" | "Growth" | "Go-to-market" | "Unit economics" | "Built it myself";

export type Metric = {
  value: string;
  label: string;
  note?: string;
  count?: { to: number; prefix?: string; suffix?: string; decimals?: number };
};

export type Mechanism = { title: string; body: string };

export type Project = {
  slug: string;
  title: string;
  short: string;
  tier: 1 | 2;
  themes: Theme[];
  period: string;
  stack: string[];
  headline: Metric[];
  /** Card call-to-action: the one thing a reader would click through to see. */
  cta?: string;
  // Deep-dive fields (tier 1)
  context?: string[];
  mechanisms?: Mechanism[];
  metrics?: Metric[];
  honesty?: string;
  lessons?: string[];
  links?: { label: string; href: string }[];
  // Tier-2 expandable detail
  detail?: string[];
};

export const THEMES: Theme[] = ["Product", "Growth", "Go-to-market", "Unit economics", "Built it myself"];

export const projects: Project[] = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: "jit-pivot",
    title: "The minimum-order trap, and the model that broke it",
    short:
      "Our retention problem was not a marketing problem. It was three per-brand minimum order values sitting in one cart, and nobody had named it. Naming it in numbers moved Badho from commission marketplace to own-warehouse distributor.",
    tier: 1,
    themes: ["Product", "Unit economics", "Go-to-market"],
    period: "Jun – Sep 2026 · Badho",
    stack: ["Operating spec", "Warehouse & JIT console", "Buyer app (single seller)", "One feature flag", "Production SQL"],
    headline: [
      { value: "3 → 0", label: "minimums on the same basket", note: "per-brand MOVs removed; one seller, then no minimum at all" },
      { value: "12 days", label: "charter to first delivery", note: "warehouse & software design document → first JIT order" },
      { value: "4.5 → 45.5", label: "carts per day, Delhi + Gurgaon", note: "31 days before vs 11 days after; the whole model changed at once" },
    ],
    cta: "How three minimums became none",
    context: [
      "We partnered with brands and earned commission. Every brand set its own minimum order value — ₹300 on a shopkeeper's first order, then ₹800 or ₹1,000 once the relationship was established. In June we shipped a unified cart: one basket across brands, one payment, fanning out into a purchase order per brand behind the scenes. That removed the friction of *ordering* from several brands at once. It did not remove the reason a shopkeeper could not.",
      "**Because the minimums stayed per brand.** A shopkeeper with oil from brand A, rice from brand B and spices from brand C still had to clear A's minimum, and B's, and C's, independently. Wanting ₹300 of each was not a ₹900 order he could place; it was three minimums he could not reach. So he abandoned the cart, or loaded up on one brand he did not need that much of. That suppressed order count, conversion and repeat rate at the same time.",
      "Our WhatsApp ordering agent hit the trap on a recorded session in July: a buyer removed one item, the basket fell to ₹251 against a ₹300 minimum, and the agent had to work him back over a **₹49 gap** before anything could be ordered. That ₹49 is the whole problem in miniature, and it happened on every multi-brand basket we had.",
    ],
    mechanisms: [
      { title: "Name the constraint in numbers, not sentiment", body: "Retention had been treated as a messaging problem for months. The unlock was describing the cart arithmetic — three floors on one basket — as the reason conversion, order count and repeat rate were all suppressed together. Once it was arithmetic, the fix was structural, not promotional." },
      { title: "One seller, one minimum, then none", body: "Stop forwarding orders and become the distributor. If Badho buys stock on its own GST, consolidates it in its own warehouse and delivers with its own fleet, the brand minimum stops being the buyer's problem — it becomes ours, at our volume, where it is trivially met. The buyer app became a single-seller marketplace." },
      { title: "Just-in-time, literally", body: "An order arrives in the evening; we push a purchase order per brand that night; our own vehicle collects the next morning. We never hold stock. I wrote the operating document — warehouse layout and zoning, inbound receiving and putaway, pick-pack-dispatch, the exception paths when a brand short-ships, and the software each step needed." },
      { title: "Fee and waiver shipped as one flag", body: "Per-brand minimums were replaced by a flat **₹75 delivery fee waived above ₹500**, deliberately shipped as a single flag so a buyer can never end up with neither a minimum nor a fee. The warehouse console prints “No per-brand MOV” on every shipping label — a feature we were selling." },
      { title: "Density over coverage", body: "Serviceability was cut from pan-India to Delhi and Gurgaon, a real loss of scale. The bet: at 300 orders a day a ₹3 lakh monthly warehouse is about 3% of revenue; at ₹20 lakh of volume it is 15%. Order density in a small radius is worth more than thin coverage everywhere." },
      { title: "Marketing calibrated to capacity, not maximised", body: "Launch capacity was about 50 orders a day on two vehicles, so the charter set marketing spend as the main throttle and MOV or COD as minor levers if orders overshot. I sent the activation WhatsApp to existing Delhi–NCR buyers myself, and wrote the templates that carried the pincode campaigns." },
      { title: "A breach queue against the promise", body: "We designed for three-to-four-day delivery and ran a breach queue against that target. In the final weeks it showed fifty-three orders past it, the oldest sixteen days, and a 22% rejection rate on JIT orders. That was the live problem when everything stopped." },
    ],
    metrics: [
      { value: "138 → 500", label: "carts, Delhi + Gurgaon", note: "31 days before the model change vs 11 days after, from the cart table" },
      { value: "₹755 → ₹379", label: "median basket", note: "smaller baskets are exactly what removing a floor should produce" },
      { value: "73% → 45%", label: "share of baskets clearing the ₹500 waiver", note: "which is how I found the threshold was wrong" },
      { value: "12 days", label: "charter to first order", note: "25 Aug design document → first JIT delivery on 5 Sep" },
      { value: "₹75 / ₹500", label: "fee and waiver, verified in production", note: "set as a round number before I had the basket distribution — set too high" },
      { value: "8 days", label: "JIT ran before the wind-down", note: "81 orders, ₹97,253 gross, 22% rejected, six delivered, 51 in flight" },
    ],
    honesty:
      "The strategic call was the founder's, agreed by the team; I owned the operating model — the design document, the buyer-side mechanics, the cutover, the launch communication and the twenty tickets underneath it. Cart volume per day went up about tenfold, but the entire model changed in the same window, so I cannot isolate the minimum's own share. And the mistake is mine: I replaced a hard per-brand minimum with a softer, cheaper version of the same problem. The median basket came in at ₹379, so more than half of buyers paid ₹75 on a sub-₹500 order — a fifth of their order value. The structure was right, the threshold was wrong, and the operation never got the time to prove either.",
    lessons: [
      "Find the arithmetic behind the metric. Retention looked like a marketing problem; it was three floors in one cart.",
      "Set thresholds from the distribution, not from a round number. I had the data to check and set the number before I looked.",
      "Density is the whole model. Two cities done well beat a country done thinly.",
    ],
  },

  // ── 02 ────────────────────────────────────────────────────────────────
  {
    slug: "contribution-turnaround",
    title: "Taking contribution per order from −₹196 to +₹36",
    short:
      "On the courier model the average order lost money, and in June returns cost more than the commission the business earned. The fulfilment programme that made freight legible, recovered courier claims automatically, and halved return-to-origin.",
    tier: 1,
    themes: ["Unit economics", "Product"],
    period: "Feb – Aug 2026 · Badho",
    stack: ["Fulfilment specs (34 of 42)", "Courier claims service", "Returns stack", "Per-order freight ledger", "Production SQL"],
    headline: [
      { value: "−₹196 → +₹36", label: "contribution per completed order", note: "Feb → Jul 2026, company P&L — the programme underneath was mine" },
      { value: "42.6% → 21.4%", label: "return-to-origin", note: "Mar → Aug 2026; returns ÷ (returns + delivered), queried from production" },
      { value: "10.2 → 6.1 days", label: "median delivery", note: "Jan → Jun 2026, keyed on delivered month; p90 28.2 → 10.1" },
    ],
    cta: "What actually moved the number",
    context: [
      "The order that framed it for me: **₹708.50, 4.3 kg, zone E — ₹282 of freight plus ₹25.50 of COD fee.** Roughly 43% of the order's value went to shipping it. Underneath that, returns were the binding constraint. In June 2026 alone, **2,073 returns cost ₹4.68 lakh against ₹3.59 lakh of commission earned.** The returns cost more than the business made.",
      "That is not a margin problem you fix with pricing. It is a broken model, and it is why we eventually became our own distributor. But before that decision, this was the programme that stopped the bleeding on the model we had.",
    ],
    mechanisms: [
      { title: "Make freight legible", body: "Courier cost, handling charges and weight-discrepancy deductions were captured per order and shown to brands as a line-item breakup instead of unexplained deductions. You cannot fix a cost nobody can see — and a brand that can see it stops disputing it." },
      { title: "Stop paying for the same parcel twice", body: "Couriers systematically reweighed parcels and charged the difference. Every one was recoverable, but only inside the partner's 24-hour priority window, which meant employing people to watch a clock. I specified a service that detects the condition, checks nobody has already raised it, and files the claim with the courier's own sorter photograph as evidence. On a representative day: **378 weight claims and 362 tickets in 24 hours.**" },
      { title: "Never double-file on top of a human", body: "The claims service de-duplicates against *every* open ticket on that waybill, not just its own. Judgement stayed with people; the deadline went to a system. It was switched off on 20 August when we stopped using third-party couriers — the right end for a system built for a model we exited." },
      { title: "Attack the returns themselves", body: "Of orders that reached an outcome, the share coming back to origin peaked at **42.6% in March 2026**. The response was a stack: automatic prepaid-only after a single return with reinstatement by manual review, address validation and standardisation at checkout, a zone-wise delivery promise that pays a ₹50 credit when missed, doorstep-refusal triage, and pre-recorded reminder calls on the day of the attempt." },
      { title: "Define the metric before the fix", body: "Return-to-origin was defined up front as returns ÷ (returns + delivered) — of orders that reached an outcome, the share that came back — and queried from production monthly. March 42.6%, June 32.9%, August 21.4%. Roughly halved, and the definition is written down so nobody can move it later." },
      { title: "The tail is what the customer experiences", body: "A shopkeeper does not experience a median; he experiences how long his own parcel took. Median delivery went 10.2 → 6.1 days (about 40% down). The p90 — the near-worst order — went **28.2 → 10.1 days**, about 64% down. Four weeks to ten days is the number that changes whether he orders again." },
    ],
    metrics: [
      { value: "42.6% → 21.4%", label: "return-to-origin, Mar → Aug 2026", note: "returns ÷ (returns + delivered); June sat at 32.9%" },
      { value: "−₹196 → +₹36", label: "contribution per completed order", note: "Feb −₹196 · Apr −₹25 · Jun −₹18 · Jul +₹36; company P&L" },
      { value: "28.2 → 10.1 days", label: "p90 delivery time", note: "Jan → Jun 2026, keyed on the month delivered" },
      { value: "₹4.68 L vs ₹3.59 L", label: "June returns cost vs commission earned", note: "the row that explains why the model had to change" },
      { value: "378 / 362", label: "weight claims / tickets filed in 24h", note: "one representative day of the automated claims service" },
      { value: "−₹5.2 L → −₹0.24 L", label: "net loss incl. returns, Jun → Jul", note: "take rate ran at 13–15% of gross throughout" },
    ],
    honesty:
      "The contribution figures are the company's own P&L reporting, not my measurement — I say “we took contribution from −₹196 to +₹36”, never “I measured it”. The fulfilment work underneath is mine: 34 of the 42 features in that domain were specced by me. The prepaid-only policy was the founder's call, raised by our support head; I designed and shipped the mechanism. The claims service was built by our automation team to my requirement and guard rails. And to be exact: the courier model reached about six to seven days median, not three to four — three to four was the JIT design target, which ran for eight days and I will not claim.",
    lessons: [
      "Automate the clock, not the judgement. A person watching a 24-hour window is not a role, it is a cron.",
      "The tail is the number the customer experiences. Report the p90 next to the median or you are hiding the product.",
      "You cannot fix a cost nobody can see. Legibility came before every saving.",
    ],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-channel",
    title: "WhatsApp: the growth channel I built, ran and measured honestly",
    short:
      "From nothing to ₹9.60 per app install across 29,172 buyers. Campaigns at 25k–62k recipients with per-send cost control, a seven-cohort audience model over 1.17M people, templates written under my own name, a vendor migrated in-house — and the report that said the channel was losing money.",
    tier: 1,
    themes: ["Growth", "Unit economics", "Built it myself"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["AiSensy → Whatomate (in-house)", "Meta WhatsApp Business API", "Cohort SQL over 1.17M buyers", "Utility vs marketing templates", "Same-day attribution", "Community channels"],
    headline: [
      { value: "₹9.60", label: "cost per app install", note: "₹1,87,589 ÷ 19,534 install-driven buyers, June 2026, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
      { value: "25k–62k", label: "recipients per campaign", note: "read rates 46–70%, click rates 3–13%, cost tracked per send" },
      { value: "2.60× → 1.12×", label: "return on spend, June → July", note: "same-day attribution; the 7-day window would have shown 5.22× in June" },
    ],
    cta: "The campaigns, the cohorts, and the report that halved its own headline",
    context: [
      "New users arrived fine through Meta ads. The problem was everyone already in the contact base: roughly a million shopkeepers who had installed the app, ordered once or never, and gone quiet. Push notifications did not reach them. WhatsApp did. From February 2026 I owned it end to end — audience, copy, templates, the vendor, the sending platform, the measurement, the community channels, and the sales desk that worked the replies.",
      "It became the highest-reach channel the company had, and at one point its DAU defence: on a slow day in June the founder's instruction was *“send 1,000 WhatsApp messages every hour to maintain.”* The job was to make that spend accountable.",
    ],
    mechanisms: [
      { title: "A priority waterfall over the whole base, not segment labels", body: "**1,167,517 buyers**, each landing in exactly one of seven cohorts, first rule that matches wins, so the set is exhaustive and nothing double-counts. A live cart outranks a past order, because the open cart is the thing to act on. The never-ordered pool is banded by recency, down to the 73,473 who installed and never opened the app. Exact figures marked exact; estimates carried a tilde." },
      { title: "A serviceability gate before any send", body: "Every cohort was inner-joined to pincode serviceability before a message went out, because messaging someone we cannot deliver to spends money and template quota to annoy them. Later, the same rule became a DB-level audience filter so opt-outs and unserviceable buyers never made it into a send list." },
      { title: "Campaign discipline you can read from the name", body: "Every campaign is named `type_topic_cohort_batch_size` — `Utility_lapsed_buyer_help_wallet_pincode_C6_B4_50K_Batch5` — with personalisation on `$FirstName`, `$walletBalance` and `$pincode`, image/video/plain creative variants, and per-campaign rupee cost. Six captured campaigns ran **25,000 to 61,997 recipients** each; delivery 71–95%, read 46–70%, click 3–13%." },
      { title: "Measured to the ledger, not to the click", body: "One draft-cart campaign, worked all the way through: 3,870 queued → 3,670 delivered → 2,420 read → 377 clicked → 185 landed in the app → **17 ordered, 28 orders, ₹35,324 of GMV on ₹409 of spend**. Reported with a ≤24-hour window alongside (11 orders, ₹15,654), because 72-hour-plus orders are weak attribution. A second one: 2,170 queued → 15 buyers → ₹31,348 on ₹224." },
      { title: "Utility versus marketing: a ~7× price gap", body: "Meta prices a *utility* template far below a *marketing* one — on one campaign, ₹16,811 for 15,423 marketing sends against ₹2,885 for 19,894 utility sends. Routing genuinely transactional traffic correctly was the larger half of the saving. In ten days of June we sent 4,03,849 utility messages for ₹58,558, zero marketing." },
      { title: "The vendor decision, written down", body: "I wrote the cost memo: spend to date, budget at 50k buyers a day, three vendors compared at 15 lakh messages a month, and why we stayed on the incumbent for a quarter — a prepaid wallet that hard-caps spend, and an auto-stop when Meta reclassifies a template mid-campaign. Then I led the migration off the vendor onto a self-hosted platform on Meta's own API: **₹0.145 → ₹0.115 a message**, with budget caps, auto-stop and click tracking rebuilt as the deal-breakers." },
      { title: "Templates with my name on them", body: "The Delhi–Gurgaon relaunch ran on templates I authored — `jit_pincode_available_v1`, approved, created and last edited by Sanskar Modi — with UTM-tagged deep links, versioned rather than edited because Meta re-reviews every edit. 20k-per-batch pincode campaigns carried the launch and were measured click-to-order (694 clicks → 10 orders in week one), not click." },
      { title: "The attribution bug: 117 visible of 537 real", body: "A WhatsApp click reaches the app two ways — an existing user opens by deep link, or a new user installs from the Play Store and opens fresh. Our queries read a field that only exists on the first path, so we counted people who already had the app and were blind to everyone the campaign actually acquired. The app was already normalising both paths into a field nobody was querying." },
      { title: "Choose the smaller honest number", body: "Crediting an order if WhatsApp had touched the buyer any time in the previous week gave 1,272 orders and 5.22×. Same-day gave 647 orders and **2.60×**. I led with the conservative figure and wrote down that the truth sits between them." },
      { title: "Then say none of it is good enough", body: "In July Meta reclassified 15,398 conversations from utility to marketing, costing ₹14,551 — nine percent of the month. I priced the fixes against the same revenue: 1.24×, 1.36×, 1.62×, all three 1.80×. And at the top of the report: *Badho books a take rate on GMV, not GMV. At 1.12× the channel only breaks even if the take rate clears 89%. Even at 1.80× it needs 56%.* Ours was 13–15%. The channel lost money in July, and the report said so on its front page." },
      { title: "Two-way, not just broadcast", body: "City WhatsApp communities for Delhi, Noida, Ghaziabad and Gurgaon with admin-only posting, polls as the two-way mechanism, one or two posts a day, and a Top Retailer of the Month post that required the named buyer's consent for that specific use and a literally true order figure. Three sales agents were put on the inbox and coached message by message to sell like people, not templates; the first attributed order came back within four days." },
      { title: "The sales agent's first working version", body: "Many shopkeepers would not tap a link; they photographed a handwritten list or typed *“bhai yeh tel, yeh chawal, yeh daal bhej do.”* On 1 July I committed a complete service — orchestrator, prompt layer, messaging, auth, policy engine — with its handover document, in one sitting, using an AI coding assistant. The AI pod owned it from day three. It is blocked from placing orders at the tool layer, so it can never claim to have placed one." },
    ],
    metrics: [
      { value: "₹1,87,589 → ₹1,57,353", label: "spend, June → July 2026", note: "the two months the channel ran at scale" },
      { value: "19,534 → 8,419", label: "install-driven buyers", note: "June ₹9.60 per install; July ₹12.43 per buyer" },
      { value: "647 → 251", label: "orders credited, same-day rule", note: "₹4,88,419 → ₹1,76,376 revenue credited" },
      { value: "₹35,324 on ₹409", label: "one campaign, worked to GMV", note: "3,870 queued → 17 buyers ordered; ₹15,654 inside 24 hours" },
      { value: "₹0.145 → ₹0.115", label: "cost per message after moving in-house", note: "on ~169,000 messages a month; the vendor had cut us off once over an invoice" },
      { value: "₹14,551", label: "lost to template reclassification in July", note: "15,398 conversations moved utility → marketing by Meta's rescan" },
    ],
    honesty:
      "Every return figure here is on gross order value, and Badho earned a 13–15% take rate on that value — so even the 2.60× June month was not obviously profitable once contribution is the numerator, and July was a loss. The 86× and 140× single-campaign returns are real but they are the best campaigns, not the average; the monthly figures are the honest ones. The in-house platform was built by an engineer to my requirements; the sales agent's production build is the AI pod's. The seven-day attribution number exists and is defensible; I chose not to lead with it. And I ran this analysis with an AI assistant — the decisions were mine, the drafting was collaborative.",
    lessons: [
      "Price the channel before you scale it. A seven-fold template gap and a vendor's fifth show up only in the per-campaign billing line.",
      "Know the difference between a channel metric and a business metric. 1.12× on GMV is a loss when you earn 13% of it.",
      "Lead with the number you can defend in an audit, and write down where the truth actually sits.",
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "buyer-app-plg",
    title: "Product-led growth in the buyer app: subtraction first",
    short:
      "Shopkeepers told me the app was confusing, 80% of daily actives had never ordered, and 89% of live carts sat below the minimum. The year's conversion work was mostly deleting screens, lowering floors and unblocking carts — and DAU peaked at ~9.8k with 250+ orders a day in June.",
    tier: 1,
    themes: ["Product", "Growth"],
    period: "Mar – Aug 2026 · Badho",
    stack: ["Onboarding (signup, OTP, language)", "First-order MOV", "Cart nudges & expiry", "Slab pricing UI", "Free-gifts engine", "Notification programme"],
    headline: [
      { value: "~9.8k", label: "DAU at the mid-June peak", note: "from ~3–5k; ATC rate up to 38% — a stack of changes, not one" },
      { value: "250+", label: "orders a day on 11 June", note: "all-time high on the courier model, company announcement" },
      { value: "89%", label: "of live carts sat below MOV", note: "38.5k carts — the finding that reframed the notification programme" },
    ],
    cta: "What was removed, what was lowered, what was unblocked",
    context: [
      "The funnel in April, in the payments engineer's own memo: about 3,000 daily actives → 300 add-to-carts (10%) → 120 orders. Never-ordered users were ~80% of DAU and ~70% of sent orders, with poor conversion. In June, after talking to buyers on the sales desk, I wrote to the product team twice in three days: *“many buyers are saying they are finding the app very confusing to navigate — I believe we should rethink the home screen.”*",
      "Then the number that reorganised the work: **38.5k live carts — 89% of all live carts — sat below minimum order value.** People were not failing to find products. They were failing to clear a floor. So the programme became: remove every question we ask before someone has decided to stay, lower the floor for the first order, and put the effort into unblocking carts that already exist.",
    ],
    mechanisms: [
      { title: "Delete the signup form and the OTP tap", body: "The name-and-retailer-type screen rendered immediately after OTP and blocked the user before they had seen a product. Removed: land on home, capture the name in the checkout address form where it is actually needed. OTP now fires the moment a valid 10-digit number is entered, no “Next”, auto-login on verify. Both tickets were written on 13 June and shipped on 16 June." },
      { title: "Language from location, not a full-screen popup", body: "The app forced Hindi on everyone with a popup that dropped the first funnel step. The spec: derive language from the shop's state — Hindi belt → Hindi, South, East and metros → a thin English↔Hindi strip — via a database trigger, with manual choices never overwritten. The bug that made it fail first time is the useful part: the app was writing its own hardcoded default back to the database on every restart." },
      { title: "A lower floor for the first order, with zero frontend changes", body: "First-time buyers should see a lower minimum than repeat buyers. I specified it as a computed field that shadows the MOV column — the app reads the same name and gets a buyer-aware answer — so it shipped without touching the client. By 13 June the company had simplified it to a flat **₹300 first-order MOV** across brands." },
      { title: "Unblock the cart you already have", body: "From the 89% finding: “Apni cart puri karo” nudges between home-page folds, cohorts for active-cart, add-address and complete-profile buyers, a 7-day draft-cart expiry on a consecutive-inactivity rule so stale carts stop polluting every metric, and a rule that the unified cart must not re-rank itself while a buyer is actively editing it. Cart conversion was 0.6% of lifetime carts when I wrote the spec." },
      { title: "Price on the card, not at checkout", body: "The 1 July spec's first item: shift completely away from coupon-based discovery — the final price must show on the product card. Volume slabs became an inline “add 4 more units → ₹30 off” strip instead of a blocking modal, the word “slab” never exposed. And margin reframed from “7% discount” to “25% extra earnings on your margin”, because that is the number a shopkeeper actually runs his business on." },
      { title: "Brand-funded free gifts, with a progress bar", body: "I specified the freebie engine: cross a brand's cart threshold and a free SKU attaches at ₹0 with a live progress pill; it auto-removes if the cart drops back. Pansari at ₹1.5k/₹2.5k, Chukde 300 pieces → a bedsheet, Chaivik 4/8 units → bottles. Shipped 17–19 June and became a full campaign engine." },
      { title: "A pre-placement review so nobody is surprised", body: "After Pay, a sheet lists exactly which deliveries are about to be placed. Unchecking one saves the seller for later instead of deleting it. It fixed “a second delivery got ordered without me realising” — the trust risk of stale draft carts." },
      { title: "The 31-use-case notification programme", body: "I wrote the catalogue of 31 reasons to message a buyer, led by MOV-blocked, stranded-items and payment-abandoned carts rather than lapsed-user broadcasts, with a hard cap of 8–10 pushes per buyer per day, and specified the pipeline that reads a nightly buyer snapshot instead of the primary database. It shipped as a campaign console with reusable cohorts, each a hypothesis with a number on it: “Cart — blocked by MOV, avg gap ₹301”, “Payment started, not finished — highest intent in the system”." },
      { title: "Roll out in cohorts, then measure the right thing", body: "UI changes tested on four version cohorts before full rollout. And the metric itself was fixed: the daily bot counted only carts created today by today's actives, so a buyer returning daily to an old cart looked like decline — I asked for lifetime carts of active buyers as a second row." },
    ],
    metrics: [
      { value: "~3k → ~9.8k", label: "DAU, late May → mid-June peak", note: "add-to-cart rate up to 38%; cooled to ~5k by month-end" },
      { value: "250+", label: "orders a day, 11 June 2026", note: "all-time high; ~120–250 pushed-to-seller orders a day through June" },
      { value: "3 days", label: "signup-form and OTP tickets, written → shipped", note: "13 June → 16 June 2026" },
      { value: "₹300", label: "first-order MOV, all brands", note: "down from ₹500 / ₹800; specified as a buyer-aware computed field" },
      { value: "38.5k / 89%", label: "live carts below MOV", note: "the finding behind the cart-first notification programme" },
      { value: "0.6%", label: "cart conversion when the July spec was written", note: "lifetime carts of active DAU; target 0.7–0.8% from cart nudges" },
    ],
    honesty:
      "This was a team's work and a stack of changes, not one lever: Muskan Pandey ran schemes and home-page design, Rahul Verma the earlier funnel analysis, Sahil Rohera the unified checkout and coupons, Shubham Kumar and Kushagra Rathore built most of what I specified, and the daily streak and games arcade were the AI pod's builds. The mid-June DAU peak came from ₹1 deals, the streak, notifications and these changes together, and I cannot isolate any one of them. Nobody measured signup completion before and after the form was removed, which is the instrumentation I should have demanded. Several items in the July spec — the sidebar removal, the home-page tabs — were still in progress when the company wound down.",
    lessons: [
      "Every question you ask before a user has decided to stay is a question some of them answer by leaving.",
      "Find the floor before you polish the funnel. 89% of carts were not lost to discovery; they were blocked by a minimum.",
      "Put the price on the card. A discount a buyer only discovers at checkout did not influence the add.",
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: "doka",
    title: "DOKA: a cold pitch in Riyadh, priced, signed and delivered to iOS approval",
    short:
      "A nine-branch cake chain in Saudi Arabia wanted a customer app with a build-your-own-cake flow. I pitched it cold with a Figma prototype, priced the scope through three rounds, signed at ~$7,000 under Saudi law, owned the product decisions and the client, and delivered with a team of two — to Apple's approval, never to a public launch.",
    tier: 1,
    themes: ["Go-to-market", "Product"],
    period: "Feb 2025 – Feb 2026 · ONO Suite",
    stack: ["Cold outbound & demo", "Scope pricing", "Contract under Saudi law", "Requirements & UX lock", "POSIST mapping (215 SKUs)", "Weekly client reporting"],
    headline: [
      { value: "~$7,000", label: "contract, cold-pitched and signed", note: "10 June 2025; 40/40/20 milestones; $6,400 → $7,000 with the client asking $8,000" },
      { value: "9 branches · 215 SKUs", label: "mapped into the app and POS", note: "Riyadh; I uploaded the stores and 40% of the menu myself" },
      { value: "iOS approved", label: "December 2025", note: "Android blocked on the client's developer-policy issues; never publicly launched" },
    ],
    cta: "From a Figma prototype to a signed contract to a build",
    context: [
      "ONO Suite ran self-ordering kiosks for Herfy, a Saudi QSR chain I managed as an account. Herfy's cake sub-brand, DOKA Bakery House — nine branches in Riyadh, *“More Than Just Cake”* — had no customer app. In February 2025 I pitched one cold, with a Figma prototype and a video demo, to a client that had only ever bought kiosks from us.",
      "What followed was every part of the job at once: pricing the scope, drafting and re-drafting a contract through the client's legal and finance, defining the product, mapping a 215-SKU menu into their POS, running the demos and weekly status, and telling them the truth about the launch date. Day to day it was me and one developer, Foysal.",
    ],
    mechanisms: [
      { title: "Pitch with a prototype, not a deck", body: "The cold pitch was a clickable Figma prototype and a recorded demo of the ordering flow, benchmarked openly against LOLA, the Saudi cake app the client admired, and Walmart's cake decorator. A client that can tap through the thing has fewer reasons to say “send us a proposal”." },
      { title: "Price the scope, then defend the line", body: "Phase 1 and 2 were priced at $7,000 against an earlier $6,400 as loyalty, CRM and AI cake-image generation were added; the client pushed the total to $8,000 and I cut it back to Phase 1 scope instead. AI image generation was costed separately (~$1,000) and made optional. Terms: 40% advance on Phase 1, then 40/40/20 milestones — advance, store deployment, third-party migration — signed 10 June 2025 by both CEOs under Saudi law, reviewed by their finance director and legal." },
      { title: "Two journeys, not one, and say why", body: "Make-My-Cake is next-day from a single central kitchen; ready-made items are same-day from the nearest of nine branches. A unified cart mixed the two and broke order status logic. I put two named options to the client — “Unified Delayed Delivery” or “Forced Separate Orders” — and asked them to pick one, and pushed back on the request to merge the two flows into one screen, with the reasoning stated rather than silently complying." },
      { title: "The configurator", body: "Five steps — shape and size, flavour, colour (fondant or cream), decoration, personalisation — with a live preview from three angles (top, side, slice) and a running SAR price. Colour is rendered dynamically rather than shipping an asset per combination; the missing shape-and-flavour permutations were generated with an image model, removing a client dependency that was blocking the build. Free text up to 40 characters, an uploaded reference photo, and re-editing a saved cake with prior selections pre-filled." },
      { title: "Do the unglamorous data work yourself", body: "The client owed us assets and kept slipping. So on 25 June I wrote: *“I have uploaded the locations of DOKA stores and 40% uploading of DOKA menu items and images along with their POSIST mapping is done.”* 215 SKUs with SAP codes, nine branch IDs, Arabic and English. I kept a standing list of what the client owed and what each item was blocking." },
      { title: "Report status the client can act on", body: "Weekly status to the client's coordinator; on 8 September a signed report of ~25 work items — done, pending, next — headed *From: Sanskar (ONO)*, at “~95% of core functionalities”. Integrations named plainly: POSIST order sync with open event-sync issues, checkout.com with Apple Pay still in testing, Unifonic SMS, OneSignal push, OTA updates." },
      { title: "Say the unstable thing", body: "At the 21 August demo to DOKA's business team, asked to commit to a launch date by Sunday, I said the app was unstable and needed significant testing, including Apple Pay. A date would have landed better. The original 25 August go-live — compressed from four-to-five months to three at the client's insistence — was missed." },
      { title: "Exit cleanly", body: "When the client objected, fairly, to the app and the kiosk contract being tied together, I stopped arguing and executed a full transition — every project asset handed over in January 2026, and on 24 February the relationship formally closed “for now”." },
    ],
    metrics: [
      { value: "$6,400 → $7,000", label: "the negotiated price", note: "client asked for $8,000 as scope grew; cut back to Phase 1 instead" },
      { value: "40 / 40 / 20", label: "milestone structure", note: "advance · store deployment · third-party migration" },
      { value: "5 steps · 3 angles", label: "the cake configurator", note: "shape & size, flavour, colour, decoration, personalise; top, side, slice" },
      { value: "215", label: "SKUs mapped to POSIST across 9 branches", note: "real production catalogue in SAR, not a toy dataset" },
      { value: "2", label: "people on delivery", note: "me and one developer, day to day" },
      { value: "~95%", label: "core functionality at the 8 Sep 2025 report", note: "my own number; Apple approved the build in December" },
    ],
    honesty:
      "It never publicly launched. Apple approved the iOS build; Google raised developer-policy problems on the client's own account that were unresolved when I handed over. The 16-week plan was missed, and a late UX audit three weeks before the hoped-for launch still found the wrong theme colour and blank loading screens — we were racing scope ahead of stability. The configurator was explicitly benchmarked on a competitor's, disclosed to the client in the requirements document. Final commercial sign-off sat with the CEO. It is a ~$7,000 contract at a small outsourced product shop, and I present it as exactly that: the full GTM loop — pitch, price, contract, product, delivery, exit — done end to end on a real client.",
    lessons: [
      "Pitch with something the client can tap. A prototype closes what a proposal cannot.",
      "Name the trade-off and make the client choose. Two costed options beat one silent compromise.",
      "A truthful “not ready” costs a meeting. A false date costs the account.",
    ],
  },

  // ── 06 ────────────────────────────────────────────────────────────────
  {
    slug: "move-it-daas",
    title: "MOVE IT — selling delivery to the people we sold groceries to",
    short:
      "A delivery-as-a-service product launched to the distributors on our own marketplace: paper bills as orders via OCR, routed stops, two-party OTP handover, three-hop cash custody, and pricing by vehicle class rather than by kilometre.",
    tier: 1,
    themes: ["Go-to-market", "Product"],
    period: "Jan – Sep 2026 · Badho",
    stack: ["Seller-app booking", "OCR bill intake", "Driver app & routing", "Two-party OTP", "Cash custody ledger", "Named exceptions"],
    headline: [
      { value: "4 → 43", label: "seller businesses using it", note: "Jan → Jun 2026 peak, from the delivery table" },
      { value: "~4,100", label: "bookings in 2026", note: "3,006 delivered — a 73% completion rate", count: { to: 4100, prefix: "~" } },
      { value: "65 → 697", label: "bookings a month", note: "Jan → Jul 2026; the deck said trips 259 → 438 in one quarter" },
    ],
    cta: "How a paper bill becomes a routed delivery",
    context: [
      "We had built delivery capability for ourselves. The distributors on our marketplace had the same problem and were solving it worse — ad-hoc vehicles, no tracking, cash handled informally, no proof of delivery. They were already our customers for groceries. They were not our customers for logistics, and the product, the pricing and the sales motion were all different.",
      "The genuinely awkward part was the bills. Distributors did not have their orders in a system; they had paper. Asking them to change how they worked before we could serve them would have killed the product at the door.",
    ],
    mechanisms: [
      { title: "Meet the customer at the paper bill", body: "An order enters as a photograph of a handwritten bill, read by OCR into a structured delivery task; the delivery count is derived from the invoices, not typed. We met the distributor where he was rather than asking him to adopt a system first — which is the difference between a product that gets tried and one that gets explained." },
      { title: "Price by vehicle class, not by the meter", body: "3-wheeler ₹1,600, 4-wheeler ₹2,000, with live vehicle counts shown per day before booking. A distributor planning a day wants a number he can commit to, not a meter running. The commercial side — the seller-facing pricing and the pitch to the launch cohort of 128 — was mine." },
      { title: "Two-party OTP at every handover", body: "A seller books from the app, the system assigns a vehicle and a driver, the driver follows a routed sequence of stops, and every handover is confirmed by an OTP both parties hold. Proof of delivery is geofenced before a photo is accepted. It stops being an argument." },
      { title: "Cash custody in three hops", body: "Cash on the round is tracked buyer → driver → hub → settlement, every hop a recorded transfer with ageing and variance, and bank deposits as locked records. At no point is money simply trusted; a shortfall becomes findable rather than a rumour." },
      { title: "Failures as a closed list", body: "Exceptions are a named taxonomy — shop closed, customer not available, refused, wrong address, payment not ready, goods damaged — not free text. That is what makes them countable, and therefore fixable. Redelivery is a priced product, not an absorbed cost." },
      { title: "Own the routing", body: "The first version leaned on a third-party routing partner; we replaced it with our own route model in May. A V3 with automated allocation and driver ranking was feature-complete by early September and never demonstrated running, because the company wound down first." },
    ],
    metrics: [
      { value: "4 → 43", label: "seller businesses, Jan → Jun 2026", note: "roughly 11×; 33 in July and August" },
      { value: "65 → 697", label: "bookings a month, Jan → Jul", note: "roughly 10×" },
      { value: "3,006 of ~4,100", label: "delivered", note: "≈73% completion; 9% cancelled; 357 never progressed" },
      { value: "128", label: "sellers in the Gurgaon launch cohort", note: "existing grocery customers, new product, new pricing" },
      { value: "₹1,600 / ₹2,000", label: "per trip, 3-wheeler / 4-wheeler", note: "priced by vehicle class so a distributor can plan a day" },
      { value: "~2× · 259 → 438", label: "revenue and trips, one quarter", note: "the company's Q1 review — a small base, presented as such" },
    ],
    honesty:
      "Joint product ownership with Aditya Kumar. I owned the operating model, the exception taxonomy, the cash-custody design and the seller-facing commercial side; the engineering was the delivery team's. The booking and completion figures are queried from production; the revenue figure is company reporting on a small base. Delivery success fell from near-perfect to about 81% as trips quadrupled. V3 allocation was built and never shown running — I would rather say that than imply it shipped.",
    lessons: [
      "Meet the customer where the paper is. OCR on a handwritten bill was the whole go-to-market.",
      "A number a customer can commit to beats a meter that is technically fairer.",
      "Count failures by name. Free-text exceptions cannot be fixed because they cannot be counted.",
    ],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: "vernacular-search",
    title: "A search box that speaks the shopkeeper's language",
    short:
      "“Parly biskit.” “Sarso tel.” “All out” for any mosquito repellent. Kirana owners type Hindi in Roman script and by brand, and our search returned nothing. A synonym layer that learns the customer's vocabulary from real queries — and the metric I failed to instrument.",
    tier: 1,
    themes: ["Product"],
    period: "Nov 2025 – Jun 2026 · Badho",
    stack: ["LLM synonym generator", "Search event queue", "Typesense", "Hindi labels at equal weight", "Exact-first ranking"],
    headline: [
      { value: "699,684", label: "synonyms in the table", note: "queried from production", count: { to: 699684 } },
      { value: "32,536", label: "root words they hang off", note: "product concepts, not SKUs", count: { to: 32536 } },
      { value: "21.5", label: "synonyms per root, on average", note: "a static list would have been a fraction and would have aged", count: { to: 21.5, decimals: 1 } },
    ],
    cta: "Why precision, not fuzziness, won",
    context: [
      "Our buyers are kirana shop owners in tier-2 and tier-3 India. They type the way they speak: Hindi in Roman script, phonetically, with heavy typos, and by brand rather than by product. Someone wanting mosquito repellent types “all out”, which is a competitor's brand. A catalogue indexed on clean English product titles answers none of that, and the shopkeeper concludes we do not stock it. A zero-result search is a lost order.",
      "We had already tried buying the problem away. A third-party search vendor powered global product search in October 2025 and was ripped out seven weeks later. This was the answer after that failed.",
    ],
    mechanisms: [
      { title: "Strip the title to its concept", body: "A language model reduces a messy product title to its core unit — “Fortune Kachi Ghani Pure Mustard Oil 1L Pouch” is mustard oil, pack size is noise, though packaging that *is* the product, like a jute bag, must survive — then generates the desi words for it." },
      { title: "Four deliberate synonym categories", body: "Transliterations (jeera → cumin). Colloquial trade terms (“kachua chap” → mosquito coils). Phonetic typos (biskut, meggi). And **genericised brands** — surf finds detergent, colgate finds toothpaste. The fourth is the commercial one: a Good Knight product carries “all out” and “mortein” as synonyms, so a competitor's brand name finds our stock." },
      { title: "Stay specific", body: "One rule stops the layer collapsing into mush: toor dal must resolve to arhar dal, not to dal. An early version over-generated and started matching hair oil to motor oil; the fix was a tighter prompt and an accuracy pass, not more fuzziness." },
      { title: "It learns from what shopkeepers actually type", body: "The obvious build is a one-off pass over the catalogue that goes stale immediately. Instead every real search emits an event, and the queue feeds the words the buyer typed back into the same generator. New terms are inserted, matching ones merged, and the synonyms stamped onto product, brand and category records. The customer base's vocabulary becomes an asset that compounds." },
      { title: "Hindi labels at equal weight", body: "Hindi labels are searched at equal weight to English, so the multilingual catalogue work feeds search directly instead of sitting in a column nobody queries." },
      { title: "Exact first, then looser, popularity breaks ties", body: "A shopkeeper restocking a known item wants that item, not a helpful selection of similar ones. Ranking is deliberately exact-match-first, then progressively looser." },
    ],
    metrics: [
      { value: "699,684", label: "synonyms generated", note: "from the catalogue, then extended by real queries" },
      { value: "32,536", label: "root words", note: "the concepts the synonyms hang off" },
      { value: "21.5", label: "synonyms per root word", note: "the compounding is the point — a static list would not have reached this" },
      { value: "7 weeks", label: "the vendor search lasted", note: "Oct 2025 install → removal; this replaced it" },
    ],
    honesty:
      "I do not have a clean before-and-after on zero-result rate or search conversion, because nobody was tracking zero-result searches before the work started — which is itself the lesson. I should have instrumented the failure case before building the fix. On roles: I specified the vernacular requirement and the synonym behaviour; Shubham Kumar built it. The search platform decision and its epic were Dhawal Raturi's. I did not choose the engine; I defined what it had to understand. And in May 2026 the team deliberately hid search from new users, because with a 30-brand assortment it had become a disappointment engine — assortment strategy drives search strategy.",
    lessons: [
      "Instrument the failure before you build the fix. The mechanism is good and the proof is missing, and that is my fault.",
      "Precision is the scarce resource in vernacular search. The generous matcher is the one that loses trust.",
      "Design for who the user actually is, not who the catalogue assumes.",
    ],
  },

  // ── 08 ────────────────────────────────────────────────────────────────
  {
    slug: "restaurant-tech-gtm",
    title: "Restaurant technology: pricing it, selling it, keeping the accounts",
    short:
      "Two years at ONO Suite — the company's pricing architecture, a 34-kiosk Taco Bell estate, a Saudi enterprise account defended through three renewals and a tax dispute, the partnerships that were the real distribution, and the account I lost while my weekly reports said it was healthy.",
    tier: 1,
    themes: ["Go-to-market", "Unit economics"],
    period: "Jan 2024 – Sep 2026 · ONO Suite",
    stack: ["Pricing architecture", "Enterprise renewals", "Contract redlines", "Weekly client reporting", "POS integrations", "Partner registrations"],
    headline: [
      { value: "79 kiosks", label: "Herfy, Saudi Arabia — 3 renewals", note: "an inherited account run single-handed, incl. a withholding-tax dispute" },
      { value: "34 kiosks", label: "Taco Bell India, 19 malls", note: "single point of contact; renewed, then terminated" },
      { value: "7 brands", label: "priced with commercials I authored", note: "plus formal partnerships with GoFrugal and Petpooja" },
    ],
    cta: "The pricing, the renewal, and the account I lost",
    context: [
      "ONO Suite sells self-ordering kiosks, digital menu boards and ordering apps to restaurant chains, integrated into whatever point-of-sale they already run. I joined in January 2024 doing outbound — cold email, LinkedIn, demo booking, an Apollo lead base — and within a few months was managing two junior interns. From July 2024 I moved to part-time and stayed on that basis, which is how I was still running accounts there into 2026.",
      "I ended up writing the company's commercial architecture, running its largest Indian estate, and owning two international accounts with a very thin team behind me. The DOKA app build is its own case. This one is the commercial job: pricing, renewals, collections, reporting, partnerships.",
    ],
    mechanisms: [
      { title: "Rent or own: the pricing architecture", body: "Restaurant groups always ask the same question, so the model ran two ways. **Subscription:** ₹35,000 setup, then ₹1,500–2,500 per kiosk per month. **Ownership buyout:** ₹2,50,000–2,75,000 one time, client owns code and servers. **Enterprise by store count:** ₹4–5 lakh a month. Custom work at ₹1,000/hour in India, $25/dev-hour abroad. The buyout trades recurring revenue for a bigger cheque and removes the objection that stops a mid-size chain committing at all." },
      { title: "A two-riyal price rise, justified line by line", body: "Herfy's rate had sat at 110 riyals per kiosk since May 2025 across three renewals while hosting costs rose. I opened at 115 and settled at 112: anchor on the absolute change, show fifteen months of absorbed cost, benchmark against the 5–10% annual norm so under-2% reads as restraint, say what the money is for, and concede from your own opening so the client can see they won something. Six months at 79 kiosks: about $14,158." },
      { title: "Six of seven redlines", body: "Their counsel returned seven changes. I took six — scope limited to software and support, no extra kiosks billed without a PO, training billed only when pre-approved, Saudi data-protection compliance, liability capped at fees paid. I declined one — splitting billing into two cycles — and said why: we funded infrastructure and a developer salary upfront against that invoice, and a single invoice had already been slow. Giving away the six that cost nothing is what made the one refusal credible." },
      { title: "Settle the billing dispute with the database", body: "When the client disputed how many kiosks to pay for, I pulled the count of unique kiosks that had actually received orders, month by month — 79, then 78 — and billed on that. The 15% Saudi withholding tax nobody had budgeted was resolved by grossing invoices up 17.65%, the figure that leaves the net whole." },
      { title: "Taco Bell: the reporting cadence, and what it missed", body: "Weekly for about five months: sales, order value per location, per-kiosk uptime against mall hours, and a revenue-versus-uptime ratio showing which kiosks earned their floor space. I ran promotional go-lives, chased price-sync failures to the POS, processed refunds order by order, and shipped the payment-reminder feature. Cumulative kiosk sales tracked to roughly ₹3.8 crore." },
      { title: "Partnerships as distribution", body: "Formal partner registration with GoFrugal, a POS integration agreement with Petpooja re-executed in 2025, and working relationships with Reelo, Razorpay, checkout.com, QueueBuster, POSBANK and StallionIndia. Integrations are how a small software company reaches chains it could never sell to directly — the highest-leverage work available to me there." },
    ],
    metrics: [
      { value: "3", label: "consecutive Herfy renewals", note: "110 → 112 SAR per kiosk; 15% withholding resolved at a 17.65% gross-up" },
      { value: "6 of 7", label: "legal redlines accepted", note: "held the one that touched cash flow, with the reason stated" },
      { value: "~₹3.8 Cr", label: "cumulative Taco Bell kiosk sales tracked", note: "34 kiosks billed at ₹2,400 each per month" },
      { value: "7", label: "QSR brands with commercials I authored", note: "Mad Over Donuts, Cafe Island, Pizza Wings, Nik Bakers, SVS Foods, Muralis Market, Herfy" },
      { value: "60+", label: "brands reached in outbound", note: "a handful became paying clients; Burger Farm at ₹1.42 lakh/month stayed in pipeline" },
      { value: "70 / 30", label: "what I told my founders a deck was", note: "“70% promises, 30% actual work” — as the most junior person in the room, Feb 2025" },
    ],
    honesty:
      "Taco Bell renewed in August and terminated in December, three months into a six-month term. My reports showed flat revenue and *improving* uptime while my inbox showed the same store failing three times in eleven weeks and refunds open for one to three weeks. A healthy average hid the only signal that mattered, and the report should have carried the client's open-complaint list and the age of every unresolved refund. I defended Herfy; I did not grow it, and I spent months chasing unpaid invoices on a cash position that came close to stopping operations. SVS Foods went live and had to be discontinued because two people could not fix its payment bugs fast enough. Final commercial sign-off sat with the founder.",
    lessons: [
      "A healthy average can hide the thing that loses you the account. Report the open complaints next to the revenue.",
      "Concede what costs nothing so the one refusal is credible.",
      "Anchor the absolute change, show the cost you absorbed, and benchmark the norm — then concede from your own opening.",
    ],
  },

  // ── More work (tier 2) ────────────────────────────────────────────────
  {
    slug: "milkoreach",
    title: "MilkoReach — opening a dormant channel for a partner brand",
    short: "Idea to first delivery in 17 days. I built the ordering app myself; our callers built carts on the phone against a half-tonne minimum.",
    tier: 2,
    themes: ["Go-to-market", "Built it myself"],
    period: "Aug – Sep 2026 · Badho × Kapila",
    stack: ["AI-assisted build", "Assisted ordering", "Distributor mapping", "Zoho Books from day one"],
    headline: [{ value: "17 days", label: "idea → first delivery" }, { value: "226", label: "distributors mapped" }],
    detail: [
      "Kapila makes cattle feed. They had retailers within reach of their distributors who simply were not ordering — plausibly because transport cost made small orders uneconomic and nobody was asking them. I built the ordering app myself with an AI coding assistant: first working version in one evening, finished the next morning, writing real purchase orders into the main system two days later.",
      "The commercial design came out of one meeting I minuted: one merged per-ton payout to the distributor instead of itemised freight, a published transporter rate card rather than collected quotes, delivery shown separately so the base price stays lowest, a deliberately low half-tonne first-order minimum, and Zoho Books as the system of record from day one so the P&L exists immediately. Our calling team phones a retailer, sees the nearest distributor within 40 km, and builds the cart on the call. **Idea to first delivery: 17 days. 226 distributors mapped.**",
    ],
  },
  {
    slug: "storefronts",
    title: "Two Shopify storefronts — one testbed, one failure",
    short: "Hoppin Candy as a D2C-style experiment with a five-trigger lead popup; a trial-combo storefront that produced no orders.",
    tier: 2,
    themes: ["Growth", "Built it myself"],
    period: "May – Jul 2026 · Badho",
    stack: ["Shopify", "Meta Pixel + CAPI", "Multi-trigger lead capture", "UTM scheme", "Catalogue sync"],
    headline: [{ value: "5", label: "triggers on the lead popup" }, { value: "0", label: "meaningful orders on the trial store" }],
    detail: [
      "Hoppin Candy ran as a D2C-style testbed: Meta ads → a Shopify store with an ₹800 MOV, guest checkout and Cashfree → orders pushed by hand into our order system. I built the lead popup with five triggers at different thresholds — a below-MOV cart gets ten seconds, an idle reader gets twenty — capturing a WhatsApp number rather than an email, every app-install link carrying one UTM scheme so the funnel reads end to end. I also wrote up why Meta's 417 add-to-cart events and Shopify's 73 add-to-cart sessions were not a bug but different units, and why the “average cart” Meta showed was per add, not per cart. Abandoned checkouts went to the calling team.",
      "The second store listed low-price trial combos of unknown brands, with no install and no OTP before checkout. **It went live and produced no meaningful orders.** The friction argument is sound and reusable; the experiment failed and I say so. The Shopify motion was paused in July.",
    ],
  },
  {
    slug: "crm-brain",
    title: "The notification CRM — cohorts as hypotheses with a number on them",
    short: "A campaign console that reads a nightly buyer snapshot instead of the live database, with reusable audiences, holdouts and a natural-language cohort builder.",
    tier: 2,
    themes: ["Growth", "Product"],
    period: "Jul – Sep 2026 · Badho",
    stack: ["Nightly snapshot (~683k → 87k buyers)", "Audience presets", "Holdouts", "Chat-and-build cohorts", "Slot templates"],
    headline: [{ value: "31", label: "notification use cases" }, { value: "8–10", label: "push cap per buyer per day" }],
    detail: [
      "Transactional notifications wrote to the primary database; personalised sends at scale would have overloaded it. I specified a standalone fetch → hydrate → send pipeline on a nightly buyer snapshot, a hard cap of 8–10 pushes per buyer per day across brand and owned campaigns, and a persona-based onboarding schedule that swaps a slot for a referral prompt once the buyer's first order lands. Ziyad Bhombal built it; I operated it.",
      "The console's audiences are the reasoning, written down: “Cart — blocked by MOV (avg gap ~₹301)”, “Payment started, not finished — highest intent in the system”, “Never ordered, active — two-thirds of the base”, each sized by *reachable* buyers with a holdout toggle. A “chat and build” cohort builder compiles a sentence into filter groups with a live preview. Templates are named by slot — “9:30 AM – first order”, “12 PM – Badho News” — with deep links and variables. Coverage note: WhatsApp sends from the console carry no delivery receipts back, so CTR from that side is unverified by design.",
    ],
  },
  {
    slug: "release-gate",
    title: "The operating system underneath all of it",
    short: "The release gate for three apps out of one monorepo, and the spec pipeline that fed it.",
    tier: 2,
    themes: ["Product"],
    period: "Oct 2025 – Sep 2026 · Badho",
    stack: ["Jira", "Monorepo releases", "Play Console", "PRDs", "Regression checklists"],
    headline: [{ value: "805 / 1,613", label: "pull requests merged" }, { value: "242", label: "release versions" }],
    detail: [
      "I came in as a project manager and the job was the whole lifecycle: sit between the founder, the product managers and the engineers, decide what gets picked up, get it specced, designed, built, tested and released, and take responsibility for it reaching production. Most of the actual work was removing blockers so nothing on that list became the reason a release slipped.",
      "Three apps ship out of one monorepo — buyer, seller, employee. Over eleven months I merged **805 of 1,613 pull requests** and cut **242 release versions** (v7.153 → v8.255). I owned the Play Store side too: listings, rollout management, store-listing experiments. **#1 spec author in the company: 489 of 1,585 tickets, 192 of them full PRDs.** Monthly bug inflow went 114 → near zero — with the honest caveat that the bug book also shrank because the company shrank. I would not claim sole causation.",
    ],
  },
  {
    slug: "ai-pod",
    title: "Program-managing the AI pod that shipped 20 production systems",
    short: "I did not build these. I owned the epics, the quality bar and the model budget for the four-person team that did.",
    tier: 2,
    themes: ["Product"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["11 AI epics", "Sprint board", "Red-teaming", "Model budget alerts"],
    headline: [{ value: "20", label: "production AI systems" }, { value: "88 of 98", label: "AI-project tickets reported by me" }],
    detail: [
      "Product matcher, catalogue enrichment and localisation, call-quality analysis, weight estimation, the search synonym generator, the Delivery Manager fleet agents, a buyer MCP, the WhatsApp sales agent, an order-lifecycle notifier, a courier-ops autopilot, and more. **These are the pod's builds, not mine.** My evidenced role: 88 of 98 AI-project tickets reported, owner of eleven epics, stood the team's sprint board up on 2 Feb 2026, red-teamed the sales agent with the support team before launch, and mandated per-model budget alerts after credits ran out once and took the delivery manager and WhatsApp replies down with them.",
      "The sales agent is the one with a business number attached: **₹5.0 lakh across 475 orders on about $152 of model spend** under the attributed definition — and **₹11,690** under the causal one, which is the figure I reported. I also killed a personalisation system driving 82% of catalogue views, because a 30-brand catalogue does not need machine ranking. Keeping it would have been easier to defend and worse for the company.",
    ],
  },
  {
    slug: "retention-stack",
    title: "The retention stack, including the part that did not work",
    short: "Coupons, volume discounts, referral, scratch-card cashback, a games arcade. The referral design is worth defending; the referral result is not.",
    tier: 2,
    themes: ["Growth", "Product"],
    period: "2026 · Badho",
    stack: ["Referral engine", "Scratch-QR cashback", "Coupons & MOQ discounts", "DB-enforced caps"],
    headline: [{ value: "2%", label: "referral capture rate" }, { value: "0.5%", label: "of orders via referral" }],
    detail: [
      "The two legs of a referral do not need the same rule. The referred shop got its ₹100 immediately, because a new buyer needs a reason to finish signing up; the referrer's ₹50 waited for the first *delivered* order, because the referrer is the one with an incentive to farm. The invite cap was enforced in the database rather than the application. The cashback ran on a physical QR in the parcel that stays locked until the order is actually delivered — the same sequencing idea, applied physically.",
      "**The referral programme did not work**, and our own console said so on its landing tab: 12,116 people received a code and 289 referred anybody — a 2% capture rate, half a percent of orders. It is here because a portfolio that only carries the wins is not one you can trust.",
    ],
  },
];

// Serialisable subset handed to client components (cards, the index panel).
export type WorkCard = {
  slug: string;
  title: string;
  short: string;
  themes: Theme[];
  stack: string[];
  headline: Metric[];
  period: string;
  teaser?: string;
  cta?: string;
  readMin?: number;
};

export const tier1 = projects.filter((p) => p.tier === 1);
export const tier2 = projects.filter((p) => p.tier === 2);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

// Reading time from the deep-dive's actual words (context + mechanisms + metrics + lessons).
export function readMinutes(p: Project): number {
  const text = [
    ...(p.context ?? []),
    ...(p.mechanisms ?? []).flatMap((m) => [m.title, m.body]),
    ...(p.metrics ?? []).flatMap((m) => [m.label, m.note ?? ""]),
    ...(p.lessons ?? []),
    p.honesty ?? "",
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

// Headline numbers for the home page strip. Each says how it was measured.
export const heroMetrics: Metric[] = [
  { value: "−₹196 → +₹36", label: "contribution per completed order", note: "Feb → Jul 2026, company P&L; I drove the programme underneath" },
  { value: "₹9.60", label: "cost per app install on WhatsApp", note: "₹1,87,589 ÷ 19,534 install-driven buyers, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
  { value: "42.6% → 21.4%", label: "return-to-origin rate", note: "Mar → Aug 2026, queried from production" },
  { value: "~9.8k", label: "buyer-app DAU at the June peak", note: "from ~3–5k; 250+ orders a day on 11 June" },
  { value: "489", label: "specs authored — #1 of 1,585 tickets", note: "192 of them full PRDs; 805 of 1,613 PRs merged", count: { to: 489 } },
];
