// Portfolio content. Every figure traces to a Jira ticket, a Slack thread, a
// commit, a screen recording or a production query. Where a number is the
// company's own reporting rather than my measurement, the text says so.
// Nothing here is estimated, and the failures are on the page on purpose.

export type Theme = "Product" | "Growth" | "Go-to-market" | "Unit economics" | "Pricing & negotiation" | "Built it myself" | "Operating cadence";

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

export const THEMES: Theme[] = ["Product", "Growth", "Go-to-market", "Unit economics", "Pricing & negotiation", "Built it myself", "Operating cadence"];

export const projects: Project[] = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: "jit-pivot",
    title: "The minimum-order trap, and the model that broke it",
    short:
      "Our retention problem was not a marketing problem. It was three per-brand minimum order values sitting in one cart, and nobody had named it. Naming it in numbers moved Badho from commission marketplace to own-warehouse distributor.",
    tier: 1,
    themes: ["Product", "Go-to-market", "Unit economics"],
    period: "Jun – Sep 2026 · Badho",
    stack: ["Operating spec", "Warehouse & JIT console", "Buyer app (single seller)", "One feature flag", "Production SQL"],
    headline: [
      { value: "3 → 0", label: "minimums on the same basket", note: "per-brand MOVs removed; one seller, then no minimum at all" },
      { value: "12 days", label: "charter to first delivery", note: "warehouse & software design document → first JIT order" },
      { value: "4.5 → 45.5", label: "carts per day, Delhi + Gurgaon", note: "31 days before vs 11 days after; the whole model changed at once" },
    ],
    cta: "Read how three minimums became none",
    context: [
      "We partnered with brands and earned commission. Every brand set its own minimum order value — ₹300 on a shopkeeper's first order, then ₹800 or ₹1,000 once the relationship was established. In June we shipped a unified cart: one basket across brands, one payment, fanning out into a purchase order per brand behind the scenes. That removed the friction of *ordering* from several brands at once. It did not remove the reason a shopkeeper could not.",
      "**Because the minimums stayed per brand.** A shopkeeper with oil from brand A, rice from brand B and spices from brand C still had to clear A's minimum, and B's, and C's, independently. Wanting ₹300 of each was not a ₹900 order he could place; it was three minimums he could not reach. So he abandoned the cart, or loaded up on one brand he did not need that much of. That suppressed order count, conversion and repeat rate at the same time.",
      "Our WhatsApp ordering agent hit the trap on a recorded session in July: a buyer removed one item, the basket fell to ₹251 against a ₹300 minimum, and the agent had to work him back over a **₹49 gap** before anything could be ordered. That ₹49 is the whole problem in miniature, and it happened on every multi-brand basket we had.",
    ],
    mechanisms: [
      {
        title: "Name the constraint in numbers, not sentiment",
        body: "Retention had been treated as a messaging problem for months. The unlock was describing the cart arithmetic — three floors on one basket — as the reason conversion, order count and repeat rate were all suppressed together. Once it was arithmetic, the fix was structural, not promotional.",
      },
      {
        title: "One seller, one minimum, then none",
        body: "Stop forwarding orders and become the distributor. If Badho buys stock on its own GST, consolidates it in its own warehouse and delivers with its own fleet, the brand minimum stops being the buyer's problem — it becomes ours, at our volume, where it is trivially met. The buyer app became a single-seller marketplace.",
      },
      {
        title: "Just-in-time, literally",
        body: "An order arrives in the evening; we push a purchase order per brand that night; our own vehicle collects the next morning. We never hold stock. I wrote the operating document — warehouse layout and zoning, inbound receiving and putaway, pick-pack-dispatch, the exception paths when a brand short-ships, and the software each step needed.",
      },
      {
        title: "Fee and waiver shipped as one flag",
        body: "Per-brand minimums were replaced by a flat **₹75 delivery fee waived above ₹500**, deliberately shipped as a single flag so a buyer can never end up with neither a minimum nor a fee. The warehouse console prints “No per-brand MOV” on every shipping label — a feature we were selling.",
      },
      {
        title: "Density over coverage",
        body: "Serviceability was cut from pan-India to Delhi and Gurgaon, a real loss of scale. The bet: at 300 orders a day a ₹3 lakh monthly warehouse is about 3% of revenue; at ₹20 lakh of volume it is 15%. Order density in a small radius is worth more than thin coverage everywhere.",
      },
      {
        title: "A breach queue against the promise",
        body: "We designed for three-to-four-day delivery and ran a breach queue against that target. In the final weeks it showed fifty-three orders past it, the oldest sixteen days, and a 22% rejection rate on JIT orders. That was the live problem when everything stopped.",
      },
    ],
    metrics: [
      { value: "138 → 500", label: "carts, Delhi + Gurgaon", note: "31 days before the model change vs 11 days after, from the cart table" },
      { value: "₹755 → ₹379", label: "median basket", note: "smaller baskets are exactly what removing a floor should produce" },
      { value: "73% → 45%", label: "share of baskets clearing the ₹500 waiver", note: "which is how I found the threshold was wrong" },
      { value: "12 days", label: "charter to first order", note: "25 Aug design document → first JIT delivery" },
      { value: "₹75 / ₹500", label: "fee and waiver, verified in production", note: "set as a round number before I had the basket distribution — set too high" },
      { value: "8 days", label: "JIT ran before the wind-down", note: "81 orders, ₹97,253 gross, 22% rejected, six delivered, 51 in flight" },
    ],
    honesty:
      "The strategic call was the founder's, agreed by the team; I owned the operating model — the design document, the buyer-side mechanics, the cutover and the twenty tickets underneath it. Cart volume per day went up about tenfold, but the entire model changed in the same window, so I cannot isolate the minimum's own share. And the mistake is mine: I replaced a hard per-brand minimum with a softer, cheaper version of the same problem. The median basket came in at ₹379, so more than half of buyers paid ₹75 on a sub-₹500 order — a fifth of their order value. The structure was right, the threshold was wrong, and the operation never got the time to prove either.",
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
    themes: ["Unit economics", "Product", "Operating cadence"],
    period: "Feb – Aug 2026 · Badho",
    stack: ["Fulfilment specs (34 of 42)", "Courier claims service", "Returns stack", "Per-order freight ledger", "Production SQL"],
    headline: [
      { value: "−₹196 → +₹36", label: "contribution per completed order", note: "Feb → Jul 2026, company P&L — the programme underneath was mine" },
      { value: "42.6% → 21.4%", label: "return-to-origin", note: "Mar → Aug 2026; returns ÷ (returns + delivered), queried from production" },
      { value: "10.2 → 6.1 days", label: "median delivery", note: "Jan → Jun 2026, keyed on delivered month; p90 28.2 → 10.1" },
    ],
    cta: "See what actually moved the number",
    context: [
      "The order that framed it for me: **₹708.50, 4.3 kg, zone E — ₹282 of freight plus ₹25.50 of COD fee.** Roughly 43% of the order's value went to shipping it. Underneath that, returns were the binding constraint. In June 2026 alone, **2,073 returns cost ₹4.68 lakh against ₹3.59 lakh of commission earned.** The returns cost more than the business made.",
      "That is not a margin problem you fix with pricing. It is a broken model, and it is why we eventually became our own distributor. But before that decision, this was the programme that stopped the bleeding on the model we had.",
    ],
    mechanisms: [
      {
        title: "Make freight legible",
        body: "Courier cost, handling charges and weight-discrepancy deductions were captured per order and shown to brands as a line-item breakup instead of unexplained deductions. You cannot fix a cost nobody can see — and a brand that can see it stops disputing it.",
      },
      {
        title: "Stop paying for the same parcel twice",
        body: "Couriers systematically reweighed parcels and charged the difference. Every one was recoverable, but only inside the partner's 24-hour priority window, which meant employing people to watch a clock. I specified a service that detects the condition, checks nobody has already raised it, and files the claim with the courier's own sorter photograph as evidence. On a representative day: **378 weight claims and 362 tickets in 24 hours.**",
      },
      {
        title: "Never double-file on top of a human",
        body: "The claims service de-duplicates against *every* open ticket on that waybill, not just its own. Judgement stayed with people; the deadline went to a system. It was switched off on 20 August when we stopped using third-party couriers — the right end for a system built for a model we exited.",
      },
      {
        title: "Attack the returns themselves",
        body: "Of orders that reached an outcome, the share coming back to origin peaked at **42.6% in March 2026**. The response was a stack: automatic prepaid-only after a single return with reinstatement by manual review, address validation and standardisation at checkout, a zone-wise delivery promise that pays a ₹50 credit when missed, doorstep-refusal triage, and pre-recorded reminder calls on the day of the attempt.",
      },
      {
        title: "Define the metric before the fix",
        body: "Return-to-origin was defined up front as returns ÷ (returns + delivered) — of orders that reached an outcome, the share that came back — and queried from production monthly. March 42.6%, June 32.9%, August 21.4%. Roughly halved, and the definition is written down so nobody can move it later.",
      },
      {
        title: "The tail is what the customer experiences",
        body: "A shopkeeper does not experience a median; he experiences how long his own parcel took. Median delivery went 10.2 → 6.1 days (about 40% down). The p90 — the near-worst order — went **28.2 → 10.1 days**, about 64% down. Four weeks to ten days is the number that changes whether he orders again.",
      },
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
    title: "A WhatsApp channel, measured honestly enough to kill it",
    short:
      "From nothing to ₹9.60 per app install across 29,172 buyers — a seven-cohort audience model over 1.17M people, two cost levers worth ~7× and a further fifth, an attribution bug, and the report that said the channel was losing money.",
    tier: 1,
    themes: ["Growth", "Unit economics", "Built it myself"],
    period: "Apr – Aug 2026 · Badho",
    stack: ["Cohort SQL over 1.17M buyers", "Meta WhatsApp Business API", "Self-hosted sender", "Utility vs marketing templates", "Same-day attribution", "Sales agent v1"],
    headline: [
      { value: "₹9.60", label: "cost per app install", note: "₹1,87,589 ÷ 19,534 install-driven buyers, June 2026, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
      { value: "29,172", label: "distinct WhatsApp buyers in June", note: "12,655 in July as the channel decayed", count: { to: 29172 } },
      { value: "2.60×", label: "return on spend, same-day", note: "the seven-day window would have shown 5.22×; I led with the smaller one" },
    ],
    cta: "Read the report that halved its own headline",
    context: [
      "New users arrived fine through Meta ads. The problem was everyone already in the contact base: tens of thousands of shopkeepers who had installed the app, ordered once or never, and gone quiet. Push notifications did not reach them. WhatsApp did.",
      "I owned this channel end to end — cohorts, copy, template strategy, the vendor decision, the measurement, and the sales desk I supervised. Before any of it was measurable, though, the channel looked like it was failing, and that turned out to be a measurement bug.",
    ],
    mechanisms: [
      {
        title: "A priority waterfall, not segment labels",
        body: "The whole buyer base — **1,167,517 people** — each landing in exactly one of seven cohorts, first rule that matches wins, so the set is exhaustive and nothing double-counts. A live cart outranks a past order, because the open cart is the thing to act on. The never-ordered pool is banded by how long they have been gone, down to the 73,473 who installed and never opened the app.",
      },
      {
        title: "A serviceability gate before any send",
        body: "Every cohort was inner-joined to pincode serviceability before a message went out, because messaging someone we cannot deliver to spends money and template quota to annoy them. Exact figures were marked exact; estimates carried a tilde.",
      },
      {
        title: "Utility versus marketing: a ~7× price gap",
        body: "Meta prices a *utility* template far below a *marketing* one — on one campaign, ₹16,811 for 15,423 marketing sends against ₹2,885 for 19,894 utility sends. Routing our genuinely transactional traffic correctly was the larger half of the saving.",
      },
      {
        title: "Move sending in-house: ₹0.145 → ₹0.115",
        body: "We were paying a messaging vendor ₹0.145 a message to sit in front of Meta's own APIs. I moved sending onto a self-hosted platform and took the rate to ₹0.115 — a fifth off every message on ~169,000 messages a month — and removed a dependency that had already cut our messaging off once over an unpaid invoice.",
      },
      {
        title: "The attribution bug: 117 visible of 537 real",
        body: "A WhatsApp click reaches the app two ways — an existing user opens by deep link, or a new user installs from the Play Store and opens fresh. Our queries read a field that only exists on the first path, so we counted people who already had the app and were blind to everyone the campaign actually acquired. The app was already normalising both paths into a field nobody was querying.",
      },
      {
        title: "Choose the smaller honest number",
        body: "Crediting an order if WhatsApp had touched the buyer any time in the previous week gave 1,272 orders and 5.22×. Same-day gave 647 orders and **2.60×**. The week-long window counts orders WhatsApp did not cause, so I led with the conservative figure and wrote down that the truth sits between them.",
      },
      {
        title: "Price the fixes, then say none is enough",
        body: "Meta reclassified 15,398 conversations from utility to marketing, costing ₹14,551 — nine percent of the month; rejects ran at 34.1%. Against the same revenue: fix classification 1.24×, cut rejects to 29% 1.36×, leave the vendor rate 1.62×, all three 1.80×. Then the paragraph at the top of my July report: *Badho books a take rate on GMV, not GMV. At 1.12× the channel only breaks even if the take rate clears 89%. Even at 1.80× it needs 56%.* Ours was 13–15%. The channel lost money in July, and the report said so on its front page.",
      },
      {
        title: "The sales agent's first working version",
        body: "Many shopkeepers would not tap a link; they photographed a handwritten list or typed *“bhai yeh tel, yeh chawal, yeh daal bhej do.”* On 1 July I committed a complete service — orchestrator, prompt layer, messaging integration, auth, policy engine — with its handover document, in one sitting, using an AI coding assistant. The AI pod took it over three days later and made it production-grade. I shipped the commits that taught it to sell: scope to the 21 brands we could actually deliver, lead with the running scheme, the objection playbook. It is blocked from placing orders at the tool layer, so it can never claim to have placed one.",
      },
    ],
    metrics: [
      { value: "₹1,87,589 → ₹1,57,353", label: "spend, June → July 2026", note: "the two months the channel ran at scale" },
      { value: "19,534 → 8,419", label: "install-driven buyers", note: "June ₹9.60 per install; July ₹12.43 per buyer" },
      { value: "647 → 251", label: "orders credited, same-day rule", note: "₹4,88,419 → ₹1,76,376 revenue credited" },
      { value: "2.60× → 1.12×", label: "return on gross order value", note: "not a return on a business that earns 13–15% of that value" },
      { value: "₹14,551", label: "lost to template reclassification", note: "15,398 conversations moved utility → marketing by Meta's rescan" },
      { value: "₹11,690", label: "sales agent revenue, causal definition", note: "a looser definition allowed ₹3,98,065; I reported the causal one" },
    ],
    honesty:
      "Every return figure here is on gross order value, and Badho earned a 13–15% take rate on that value — so even the 2.60× June month was not obviously profitable once contribution is the numerator, and July was a loss. The agent numbers are the pod's production build, not my prototype; I built the first working version and its selling behaviour, and the AI team owned it from day three. The seven-day attribution number exists and is defensible; I chose not to lead with it.",
    lessons: [
      "Price the channel before you scale it. A seven-fold template gap and a vendor's fifth show up only in the per-campaign billing line.",
      "Know the difference between a channel metric and a business metric. 1.12× on GMV is a loss when you earn 13% of it.",
      "Lead with the number you can defend in an audit, and write down where the truth actually sits.",
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "move-it-daas",
    title: "MOVE IT — selling delivery to the people we sold groceries to",
    short:
      "A delivery-as-a-service product launched to the distributors on our own marketplace: paper bills as orders via OCR, routed stops, two-party OTP handover, three-hop cash custody, and pricing by vehicle class rather than by kilometre.",
    tier: 1,
    themes: ["Go-to-market", "Product", "Operating cadence"],
    period: "Jan – Sep 2026 · Badho",
    stack: ["Seller-app booking", "OCR bill intake", "Driver app & routing", "Two-party OTP", "Cash custody ledger", "Named exceptions"],
    headline: [
      { value: "259 → 438", label: "trips, quarter on quarter", note: "quarterly figures on a small base — presented as such" },
      { value: "~2×", label: "revenue, quarter on quarter", note: "company reporting; distributors on the product also 2×+" },
      { value: "128", label: "sellers in the Gurgaon launch cohort", note: "existing grocery customers, new product, new pricing", count: { to: 128 } },
    ],
    cta: "See how a paper bill becomes a routed delivery",
    context: [
      "We had built delivery capability for ourselves. The distributors on our marketplace had the same problem and were solving it worse — ad-hoc vehicles, no tracking, cash handled informally, no proof of delivery. They were already our customers for groceries. They were not our customers for logistics, and the product, the pricing and the sales motion were all different.",
      "The genuinely awkward part was the bills. Distributors did not have their orders in a system; they had paper. Asking them to change how they worked before we could serve them would have killed the product at the door.",
    ],
    mechanisms: [
      {
        title: "Meet the customer at the paper bill",
        body: "An order enters as a photograph of a handwritten bill, read by OCR into a structured delivery task. We met the distributor where he was rather than asking him to adopt a system first — which is the difference between a product that gets tried and one that gets explained.",
      },
      {
        title: "Price by vehicle class, not by the meter",
        body: "3-wheeler ₹1,600, 4-wheeler ₹2,000. A distributor planning a day wants a number he can commit to, not a meter running. The commercial side — the seller-facing pricing and the pitch to the launch cohort — was mine.",
      },
      {
        title: "Two-party OTP at every handover",
        body: "A seller books from the app, the system assigns a vehicle and a driver, the driver follows a routed sequence of stops, and every handover is confirmed by an OTP that both parties hold. Proof of delivery stops being an argument.",
      },
      {
        title: "Cash custody in three hops",
        body: "Cash collected on the round is tracked buyer → driver → hub → settlement, so at no point is money simply trusted. Each hop is a recorded transfer, which is what makes a shortfall findable rather than a rumour.",
      },
      {
        title: "Failures as a closed list",
        body: "Exceptions are a named taxonomy, not free text. That is what makes them countable, and therefore fixable — the same idea as the fulfilment returns stack, applied to a driver's day.",
      },
      {
        title: "Own the routing",
        body: "The first version leaned on a third-party routing partner; we replaced it with our own route model in May. A V3 with automated allocation and driver ranking was feature-complete by early September and never demonstrated running, because the company wound down first.",
      },
    ],
    metrics: [
      { value: "259 → 438", label: "trips, quarter on quarter", note: "company reporting" },
      { value: "~2×", label: "revenue, quarter on quarter", note: "small base; I would present it that way in the room" },
      { value: "4 → 43", label: "seller businesses on the product", note: "over 2026" },
      { value: "~4,100", label: "bookings in 2026", note: "at 73% completion" },
      { value: "₹1,600 / ₹2,000", label: "per trip, 3-wheeler / 4-wheeler", note: "priced by vehicle class so a distributor can plan a day" },
    ],
    honesty:
      "Joint product ownership with Aditya Kumar. I owned the operating model, the exception taxonomy, the cash-custody design and the seller-facing commercial side; the engineering was the delivery team's. The revenue and trip figures are company metrics on a small base. V3 allocation was built and never shown running — I would rather say that than imply it shipped.",
    lessons: [
      "Meet the customer where the paper is. OCR on a handwritten bill was the whole go-to-market.",
      "A number a customer can commit to beats a meter that is technically fairer.",
      "Count failures by name. Free-text exceptions cannot be fixed because they cannot be counted.",
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
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
    cta: "Read why precision, not fuzziness, won",
    context: [
      "Our buyers are kirana shop owners in tier-2 and tier-3 India. They type the way they speak: Hindi in Roman script, phonetically, with heavy typos, and by brand rather than by product. Someone wanting mosquito repellent types “all out”, which is a competitor's brand. A catalogue indexed on clean English product titles answers none of that, and the shopkeeper concludes we do not stock it. A zero-result search is a lost order.",
      "We had already tried buying the problem away. A third-party search vendor powered global product search in October 2025 and was ripped out seven weeks later. This was the answer after that failed.",
    ],
    mechanisms: [
      {
        title: "Strip the title to its concept",
        body: "A language model reduces a messy product title to its core unit — “Fortune Kachi Ghani Pure Mustard Oil 1L Pouch” is mustard oil, pack size is noise, though packaging that *is* the product, like a jute bag, must survive — then generates the desi words for it.",
      },
      {
        title: "Four deliberate synonym categories",
        body: "Transliterations (jeera → cumin). Colloquial trade terms (“kachua chap” → mosquito coils). Phonetic typos (biskut, meggi). And **genericised brands** — surf finds detergent, colgate finds toothpaste. The fourth is the commercial one: a Good Knight product carries “all out” and “mortein” as synonyms, so a competitor's brand name finds our stock.",
      },
      {
        title: "Stay specific",
        body: "One rule stops the layer collapsing into mush: toor dal must resolve to arhar dal, not to dal. An early version over-generated and started matching hair oil to motor oil; the fix was a tighter prompt and an accuracy pass, not more fuzziness.",
      },
      {
        title: "It learns from what shopkeepers actually type",
        body: "The obvious build is a one-off pass over the catalogue that goes stale immediately. Instead every real search emits an event, and the queue feeds the words the buyer typed back into the same generator. New terms are inserted, matching ones merged, and the synonyms stamped onto product, brand and category records. The customer base's vocabulary becomes an asset that compounds.",
      },
      {
        title: "Hindi labels at equal weight",
        body: "Hindi labels are searched at equal weight to English, so the multilingual catalogue work feeds search directly instead of sitting in a column nobody queries.",
      },
      {
        title: "Exact first, then looser, popularity breaks ties",
        body: "A shopkeeper restocking a known item wants that item, not a helpful selection of similar ones. Ranking is deliberately exact-match-first, then progressively looser.",
      },
    ],
    metrics: [
      { value: "699,684", label: "synonyms generated", note: "from the catalogue, then extended by real queries" },
      { value: "32,536", label: "root words", note: "the concepts the synonyms hang off" },
      { value: "21.5", label: "synonyms per root word", note: "the compounding is the point — a static list would not have reached this" },
      { value: "7 weeks", label: "the vendor search lasted", note: "Oct 2025 install → removal; this replaced it" },
    ],
    honesty:
      "I do not have a clean before-and-after on zero-result rate or search conversion, because nobody was tracking zero-result searches before the work started — which is itself the lesson. I should have instrumented the failure case before building the fix. On roles: I specified the vernacular requirement and the synonym behaviour; Shubham Kumar built it. The search platform decision and its epic were Dhawal Raturi's. I did not choose the engine; I defined what it had to understand.",
    lessons: [
      "Instrument the failure before you build the fix. The mechanism is good and the proof is missing, and that is my fault.",
      "Precision is the scarce resource in vernacular search. The generous matcher is the one that loses trust.",
      "Design for who the user actually is, not who the catalogue assumes.",
    ],
  },

  // ── 06 ────────────────────────────────────────────────────────────────
  {
    slug: "restaurant-tech-gtm",
    title: "Restaurant technology: pricing it, selling it, delivering it",
    short:
      "Two years at ONO Suite — the company's pricing architecture, a 34-kiosk Taco Bell estate, two Saudi enterprise accounts owned end to end, and the account I lost while my weekly reports said it was healthy.",
    tier: 1,
    themes: ["Go-to-market", "Pricing & negotiation"],
    period: "Jan 2024 – Sep 2026 · ONO Suite",
    stack: ["Pricing architecture", "Enterprise renewals", "Contract redlines", "Weekly client reporting", "POS integrations", "Partner registrations"],
    headline: [
      { value: "79 kiosks", label: "Herfy, Saudi Arabia — 3 renewals", note: "an inherited account run single-handed, incl. a withholding-tax dispute" },
      { value: "~$7,000", label: "DOKA — cold-pitched, signed, delivered", note: "nine-branch Riyadh bakery; iOS release approved Dec 2025" },
      { value: "34 kiosks", label: "Taco Bell India, 19 malls", note: "single point of contact; renewed, then terminated" },
    ],
    cta: "Read the account I lost and why",
    context: [
      "ONO Suite sells self-ordering kiosks, digital menu boards and ordering apps to restaurant chains, integrated into whatever point-of-sale they already run. I joined in January 2024 doing outbound — cold email, LinkedIn, demo booking, an Apollo lead base — and within a few months was managing two junior interns. From July 2024 I moved to part-time and stayed on that basis, which is how I was still running accounts there into 2026.",
      "I ended up writing the company's commercial architecture, running its largest Indian estate, and owning two international accounts with a very thin team behind me. This was project and account ownership at a small outsourced product shop — a different job from in-house product management, and it taught different things.",
    ],
    mechanisms: [
      {
        title: "Rent or own: the pricing architecture",
        body: "Restaurant groups always ask the same question, so the model ran two ways. **Subscription:** ₹35,000 setup, then ₹1,500–2,500 per kiosk per month. **Ownership buyout:** ₹2,50,000–2,75,000 one time, client owns code and servers. **Enterprise by store count:** ₹4–5 lakh a month. Custom work at ₹1,000/hour in India, $25/dev-hour abroad. The buyout trades recurring revenue for a bigger cheque and removes the objection that stops a mid-size chain committing at all.",
      },
      {
        title: "A two-riyal price rise, justified line by line",
        body: "Herfy's rate had sat at 110 riyals per kiosk since May 2025 across three renewals while hosting costs rose. I opened at 115 and settled at 112: anchor on the absolute change, show fifteen months of absorbed cost, benchmark against the 5–10% annual norm so under-2% reads as restraint, say what the money is for, and concede from your own opening so the client can see they won something. Six months at 79 kiosks: about $14,158.",
      },
      {
        title: "Six of seven redlines",
        body: "Their counsel returned seven changes. I took six — scope limited to software and support, no extra kiosks billed without a PO, training billed only when pre-approved, Saudi data-protection compliance, liability capped at fees paid. I declined one — splitting billing into two cycles — and said why: we funded infrastructure and a developer salary upfront against that invoice, and a single invoice had already been slow. Giving away the six that cost nothing is what made the one refusal credible.",
      },
      {
        title: "DOKA: cold pitch to iOS approval",
        body: "A nine-branch cake chain in Riyadh wanting a customer app with a build-your-own-cake flow. I scoped it, negotiated it, signed it in June 2025 at about $7,000 on staged milestones under Saudi law, then ran delivery — POS branch mapping for a 215-SKU menu, the five-step cake configurator with a live three-angle preview, client demos and weekly status. Apple approved the build in December 2025. At the August demo, asked for a launch date, I said the app was unstable and needed significant testing. A date would have landed better.",
      },
      {
        title: "Taco Bell: the reporting cadence, and what it missed",
        body: "Weekly for about five months: sales, order value per location, per-kiosk uptime against mall hours, and a revenue-versus-uptime ratio showing which kiosks earned their floor space. I ran promotional go-lives, chased price-sync failures to the POS, processed refunds order by order, and shipped the payment-reminder feature. Cumulative kiosk sales tracked to roughly ₹3.8 crore.",
      },
      {
        title: "Partnerships as distribution",
        body: "Formal partner registration with GoFrugal, a POS integration agreement with Petpooja re-executed in 2025, and working relationships with Reelo, Razorpay, checkout.com, QueueBuster, POSBANK and StallionIndia. Integrations are how a small software company reaches chains it could never sell to directly — the highest-leverage work available to me there.",
      },
    ],
    metrics: [
      { value: "3", label: "consecutive Herfy renewals", note: "110 → 112 SAR per kiosk; 15% withholding resolved at a 17.65% gross-up" },
      { value: "6 of 7", label: "legal redlines accepted", note: "held the one that touched cash flow, with the reason stated" },
      { value: "~$7,000", label: "DOKA contract value", note: "staged milestones, Saudi law; iOS approved, Android blocked on policy" },
      { value: "~₹3.8 Cr", label: "cumulative Taco Bell kiosk sales tracked", note: "34 kiosks billed at ₹2,400 each per month" },
      { value: "7", label: "QSR brands with commercials I authored", note: "Mad Over Donuts, Cafe Island, Pizza Wings, Nik Bakers, SVS Foods, Muralis Market, Herfy" },
      { value: "70 / 30", label: "what I told my founders a deck was", note: "“70% promises, 30% actual work” — as the most junior person in the room, Feb 2025" },
    ],
    honesty:
      "Taco Bell renewed in August and terminated in December, three months into a six-month term. My reports showed flat revenue and *improving* uptime while my inbox showed the same store failing three times in eleven weeks and refunds open for one to three weeks. A healthy average hid the only signal that mattered, and the report should have carried the client's open-complaint list and the age of every unresolved refund. I defended Herfy; I did not grow it, and I spent months chasing unpaid invoices on a cash position that came close to stopping operations. DOKA never publicly launched. Outreach across sixty-plus brands produced a handful of paying clients. Final commercial sign-off sat with the founder and a senior colleague.",
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
    period: "2026 · Badho × Kapila",
    stack: ["AI-assisted build", "Assisted ordering", "Distributor mapping", "Buyer-app store listing"],
    headline: [{ value: "17 days", label: "idea → first delivery" }, { value: "226", label: "distributors mapped" }],
    detail: [
      "Kapila makes cattle feed. They had retailers within reach of their distributors who simply were not ordering — plausibly because transport cost made small orders uneconomic and nobody was asking them. I built the ordering app myself with an AI coding assistant: first working version in one evening, finished the next morning, writing real purchase orders into the main system two days later.",
      "Our calling team phones a retailer, signs in on his number, sees the catalogue of whichever distributor is nearest within 40 km, and builds the cart on the call against a half-tonne minimum. Then I took the assisted step out and put the same flow in the buyer app behind its own store listing, so we could run ads straight at Kapila's audience. **Idea to first delivery: 17 days. 226 distributors mapped.**",
    ],
  },
  {
    slug: "release-gate",
    title: "The operating system underneath all of it",
    short: "The release gate for three apps out of one monorepo, and the spec pipeline that fed it.",
    tier: 2,
    themes: ["Operating cadence"],
    period: "Oct 2025 – Sep 2026 · Badho",
    stack: ["Jira", "Monorepo releases", "Play Console", "PRDs"],
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
    themes: ["Operating cadence", "Growth"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["11 AI epics", "Sprint board", "Red-teaming", "Model budget alerts"],
    headline: [{ value: "20", label: "production AI systems" }, { value: "88 of 98", label: "AI-project tickets reported by me" }],
    detail: [
      "Product matcher, catalogue enrichment and localisation, call-quality analysis, weight estimation, the search synonym generator, the Delivery Manager fleet agents, a buyer MCP, the WhatsApp sales agent, an order-lifecycle notifier, a courier-ops autopilot, and more. **These are the pod's builds, not mine.** My evidenced role: 88 of 98 AI-project tickets reported, owner of eleven epics, stood the team's sprint board up on 2 Feb 2026, red-teamed the sales agent with the support team before launch, and mandated per-model budget alerts.",
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
      "The two legs of a referral do not need the same rule. The referred shop got its ₹100 immediately, because a new buyer needs a reason to finish signing up; the referrer's ₹50 waited for the first *delivered* order, because the referrer is the one with an incentive to farm. The invite cap was enforced in the database rather than the application, so it held whichever code path wrote. The cashback ran on a physical QR in the parcel that stays locked until the order is actually delivered — the same sequencing idea, applied physically.",
      "**The referral programme did not work**, and our own console said so on its landing tab: 12,116 people received a code and 289 referred anybody — a 2% capture rate, half a percent of orders. It is here because a portfolio that only carries the wins is not one you can trust.",
    ],
  },
  {
    slug: "checkout-and-front-door",
    title: "One payment, many sellers — and deleting the signup form",
    short: "The unified checkout that the JIT cart later depended on, and the onboarding questions we stopped asking.",
    tier: 2,
    themes: ["Product"],
    period: "May – Jun 2026 · Badho",
    stack: ["Unified cart", "Payment fan-out per seller", "Auto-OTP", "Language inference"],
    headline: [{ value: "1 → n", label: "one payment, a PO per seller" }, { value: "0", label: "signup form fields" }],
    detail: [
      "Payment choice moved into the cart, then a unified checkout where one payment fans out into a purchase order per seller. Shipped May and June 2026; it was the groundwork the single-seller JIT cart depended on three months later.",
      "Separately, the signup form was deleted, the OTP requested automatically, and language chosen intelligently rather than forcing Hindi on everyone. Every question we ask before a user has decided to stay is a question some of them answer by leaving.",
    ],
  },
  {
    slug: "trial-storefront",
    title: "Trial combos on a storefront of their own — and it did not work",
    short: "A separate no-install, no-OTP storefront for low-price trial packs of unknown brands. Sound friction argument; the experiment failed.",
    tier: 2,
    themes: ["Go-to-market", "Built it myself"],
    period: "2026 · Badho",
    stack: ["AI-assisted build", "Catalogue sync", "Checkout-last identity"],
    headline: [{ value: "0", label: "meaningful orders" }, { value: "1 evening", label: "to a working storefront" }],
    detail: [
      "Most of our catalogue was brands with no ground presence, and asking a shopkeeper to commit to a full case of an unknown brand is asking too much. I built a separate ordering storefront from scratch with an AI coding assistant, listing low-price trial combos synced to the catalogue. The design choice was where friction goes: no install, no OTP up front, browse and add to cart immediately, and only ask for phone, name and address at checkout once he has decided to buy.",
      "**It went live and produced no meaningful orders.** I keep it here because the friction argument is sound and reusable, and because building a complete commerce surface end to end is a real capability — but the experiment failed and I say so.",
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
  { value: "₹9.60", label: "cost per app install", note: "₹1,87,589 ÷ 19,534 install-driven buyers, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
  { value: "42.6% → 21.4%", label: "return-to-origin rate", note: "Mar → Aug 2026, queried from production" },
  { value: "12 days", label: "pivot charter → first delivery", note: "warehouse & software design document to first JIT order", count: { to: 12, suffix: " days" } },
  { value: "489", label: "specs authored — #1 of 1,585 tickets", note: "192 of them full PRDs; 805 of 1,613 PRs merged", count: { to: 489 } },
];
