// Portfolio content. Every figure traces to a Jira ticket, a release branch in
// git, a Slack post, a screen recording or a production query. Where a number is
// the company's reporting rather than my own measurement, the text says so.
// The experiments that did not work are on the page on purpose.

export type Theme = "Product" | "Growth" | "Pricing" | "Go-to-market" | "Unit economics" | "Built it myself";

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

export const THEMES: Theme[] = ["Product", "Growth", "Pricing", "Go-to-market", "Unit economics", "Built it myself"];

export const projects: Project[] = [
  // ── 01 ────────────────────────────────────────────────────────────────
  {
    slug: "jit-pivot",
    title: "Three minimum order values in one cart",
    short:
      "Shopkeepers could not place the order they wanted, because every brand set its own minimum and one cart had three of them. Putting that in numbers is what moved Badho from taking commission to buying, storing and delivering the stock itself.",
    tier: 1,
    themes: ["Product", "Unit economics", "Go-to-market"],
    period: "Jun – Sep 2026 · Badho",
    stack: ["Warehouse operating document", "Single-seller buyer app", "JIT console", "One feature flag", "Production SQL"],
    headline: [
      { value: "3 → 0", label: "minimums on the same basket", note: "per-brand minimums removed, then no minimum at all" },
      { value: "12 days", label: "from written plan to first delivery", note: "warehouse and software document 25 Aug, first order delivered 5 Sep" },
      { value: "43 of 81", label: "orders packed, ready, and never sent out", note: "53% of orders and 55% of value sat at the warehouse when the company closed" },
    ],
    cta: "Read how three minimums became none",
    context: [
      "Badho earned commission on orders it passed to brands. Each brand set its own minimum order value: ₹300 on a shopkeeper's first order, ₹800 or ₹1,000 after that. In June we shipped one cart across brands with one payment, which split into a separate order per brand behind the scenes. That fixed the paperwork. It did not fix the reason a shopkeeper could not buy.",
      "**The minimums were still per brand.** A shopkeeper with oil from one brand, rice from a second and spices from a third had to clear all three floors separately. ₹300 of each was not a ₹900 order he could place. It was three minimums he could not reach, so he either abandoned the cart or bought more of one brand than he needed. Order count, conversion and repeat rate were all held down by the same thing.",
      "Our WhatsApp ordering agent ran into it on a recorded chat in July. A buyer removed one item, the basket fell to ₹251 against that brand's ₹300 minimum, and the agent had to talk him back over a **₹49 gap** before anything could be ordered. That gap was the whole problem, and it was on every multi-brand basket we had.",
    ],
    mechanisms: [
      { title: "Describe the blocker as arithmetic, not sentiment", body: "Retention had been treated as a messaging problem for months. Naming it as three floors on one basket explained why conversion, order count and repeat rate all moved together, and made the fix structural instead of promotional." },
      { title: "One seller, one minimum, then none", body: "Stop forwarding orders and become the seller. If Badho buys the stock on its own GST number, holds it in its own warehouse and delivers with its own vehicles, the brand's minimum becomes Badho's problem at Badho's volume, where it is easy to clear. The buyer app became a single-seller store." },
      { title: "Just in time, literally", body: "An order arrives in the evening. That night we send one purchase order per brand. Our own vehicle collects the next morning. We hold no stock. I wrote the operating document: warehouse layout and zones, receiving and putaway, pick, pack, dispatch, what happens when a brand short-ships, and the software each step needed." },
      { title: "Fee and waiver as a single switch", body: "Per-brand minimums were replaced by a flat **₹75 delivery fee, waived above ₹500**, deliberately shipped as one flag so a buyer can never end up with neither a minimum nor a fee. The warehouse console prints “No per-brand MOV” on every label, because we were selling that as the reason to order." },
      { title: "Two cities instead of the country", body: "We cut serviceability from all of India to Delhi and Gurgaon. At 300 orders a day, a ₹3 lakh monthly warehouse is about 3% of revenue. At ₹20 lakh of monthly volume it is 15%. Orders packed close together are worth more than thin coverage everywhere." },
      { title: "Marketing set to what we could deliver", body: "Two vehicles could handle about 50 orders a day, so the plan named marketing spend as the main throttle, with a higher minimum or switching off cash on delivery as the backup levers if orders ran ahead of the vans. I sent the relaunch message to existing Delhi and Gurgaon buyers myself." },
      { title: "The number changed four times in twenty-nine minutes", body: "On the last working day the dashboard\u2019s order-value figure was redefined four times between 10:29 and 14:58: first adding two in-flight statuses, then counting every status, then completed only, then delivered and completed together. **On the same 81 orders the loosest reading gives ₹97,253 and the tightest ₹7,253, a thirteen-fold spread.** One of those commits records that cancelling an order had made the figure go up. This is what it looks like when a metric is argued out in public rather than assumed, and I would rather show the argument than the winner." },
      { title: "Where the orders actually stopped", body: "The funnel adds up, which is how I know where it broke. Of 81 orders, every one of the nine consolidated purchase orders to brands arrived, and consolidation ran exactly twice. Then **43 orders worth ₹53,468 were packed and marked ready at the Gurugram warehouse and never dispatched** — 53% of orders and 55% of the value. The bottleneck was not supply and it was not demand. It was the last step, getting a packed order onto a vehicle, and two vans was the ceiling we had already named in the plan." },
      { title: "Eighteen rejections and one reason", body: "22% of JIT orders were rejected, and **17 of the 18 carry no reason at all**. The failure taxonomy I had insisted on for the delivery business was never applied here. So the single biggest quality problem in the new model is, in the data, unexplained. That is my gap, not somebody else\u2019s, and it is the first thing I would fix." },
      { title: "A queue for broken promises", body: "We promised three to four days and ran a queue of every order past that. In the final weeks it held fifty-three orders, the oldest sixteen days old. Against a design that collected from brands in the morning and delivered the same day, the median order took **3.24 days** and the slowest took ten. That was the live problem when the company stopped." },
    ],
    metrics: [
      { value: "114 → 199", label: "carts a day in Delhi and Gurgaon", note: "about 1.7 times. An earlier read said ten times; that counted only carts still live, so older days had decayed away" },
      { value: "102 → 0, then 10", label: "orders a day on the old flow, and on the new one", note: "marketplace intercity went to exactly zero after 31 Aug. JIT replaced it at ten a day" },
      { value: "₹367", label: "median JIT basket in September", note: "the earlier ₹755 comparison does not hold: the August cart values had been archived and decayed" },
      { value: "45.7%", label: "of JIT baskets cleared the ₹500 waiver", note: "so more than half paid the fee. That is how I found the threshold was set wrong" },
      { value: "12 days", label: "plan to first delivery", note: "25 Aug document, first JIT order delivered 5 Sep" },
      { value: "₹75 / ₹500", label: "fee and waiver in production", note: "a round number I set before I looked at the basket data" },
      { value: "8 days", label: "JIT ran before the company closed", note: "81 orders from 77 buyers, ₹97,253 of order value, average ₹1,201. Seven completed" },
      { value: "3.24 days", label: "median time to deliver, against a same-day design", note: "90th percentile 7.41 days, slowest 10.09. The model was built to deliver the next morning" },
      { value: "86%", label: "of order value came from one brand", note: "and that brand was in 79 of the 81 orders. A single-brand business, not a marketplace" },
      { value: "5.0%", label: "of carts in the region became orders", note: "80 of 1,593. The other 95% were abandoned" },
    ],
    honesty:
      "The decision to become the distributor was the founder's, agreed by the team. What I owned was the operating model: the document, the buyer-side mechanics, the cutover, the launch message and the twenty tickets under it. Carts a day went up about tenfold, but the entire model changed in the same window, so I cannot separate out the minimum's own share. The mistake is mine: I replaced a hard per-brand minimum with a cheaper version of the same problem. Half of all baskets came in under ₹379, so more than half of buyers paid ₹75 on a sub-₹500 order, about a fifth of what they spent. The structure was right, the threshold was wrong, and the operation never ran long enough to prove either.",
    lessons: [
      "Look for the arithmetic before you look for a campaign. Retention looked like marketing; it was three floors in one cart.",
      "Set a threshold from the distribution, not from a round number. I had the data and set the number before I read it.",
      "Order density is the model. Two cities served properly beat a country served thinly.",
    ],
  },

  // ── 02 ────────────────────────────────────────────────────────────────
  {
    slug: "contribution-turnaround",
    title: "From losing ₹196 an order to making ₹126",
    short:
      "Freight took 43% of one order's value and in June returns cost more than the commission the business earned. The programme that made freight visible per order, recovered courier overcharges automatically, and halved the share of parcels coming back.",
    tier: 1,
    themes: ["Unit economics", "Product", "Built it myself"],
    period: "Feb – Aug 2026 · Badho",
    stack: ["34 of 42 fulfilment specs", "Courier claims service", "Returns stack", "Per-order freight ledger", "Production SQL"],
    headline: [
      { value: "−₹196 → +₹126", label: "contribution per completed order", note: "Feb to Aug 2026, before return costs. Including every leg it went −₹573 to +₹100" },
      { value: "42.6% → 21.4%", label: "parcels returned to origin", note: "Mar to Aug 2026. Returns ÷ (returns + delivered), queried from production" },
      { value: "10.2 → 6.1 days", label: "median delivery", note: "Jan to Jun 2026 by delivered month. The slowest tenth went 28.2 → 10.1" },
    ],
    cta: "Read what actually moved the number",
    context: [
      "One order framed the problem for me. **₹708.50 of goods, 4.3 kg, zone E: ₹282 of freight plus a ₹25.50 cash-collection fee.** About 43% of what the shopkeeper paid went on moving the parcel. Underneath that sat returns. In June 2026 alone, **2,073 returned parcels cost ₹4.68 lakh against ₹3.59 lakh of commission earned.** The returns cost more than the business made that month.",
      "That is not something pricing fixes. It is the wrong model, and it is why Badho eventually bought its own stock. Before that decision, this was the programme that slowed the loss on the model we had.",
    ],
    mechanisms: [
      { title: "Make freight visible per order", body: "Courier charges, handling fees and weight-dispute deductions were recorded against each order and shown to brands as line items instead of arriving as unexplained deductions. Nobody can reduce a cost they cannot see, and a brand that can see it stops arguing about it." },
      { title: "Stop paying twice for the same parcel", body: "Couriers reweighed parcels and billed the difference. Every one of those was recoverable, but only inside the partner's 24-hour window, which meant paying people to watch a clock. I specified a service that spots the case, checks nobody has already raised it, and files the claim using the courier's own sorter photograph as evidence. On one representative day it filed **378 weight claims and 362 tickets in 24 hours.**" },
      { title: "Never file on top of a person", body: "The service checks every open ticket on that waybill, not only its own, so it cannot duplicate a human's claim. People kept the judgement; the deadline went to a machine. We switched it off on 20 August when we stopped using third-party couriers, which was the right end for a tool built for a model we left." },
      { title: "Work on the returns themselves", body: "Of orders that reached an outcome, the share coming back peaked at **42.6% in March 2026**. The response was a stack of changes: prepaid-only after a single return, with reinstatement by manual review; address checking at checkout; a delivery promise by zone that pays ₹50 when missed; a process for doorstep refusals; and recorded reminder calls on the delivery day." },
      { title: "Write the definition before the fix", body: "Return rate was defined up front as returns ÷ (returns + delivered), the share of finished orders that came back, and queried monthly from production. March 42.6%, June 32.9%, August 21.4%. Roughly halved, with the definition written down so nobody could move it later." },
      { title: "The returns were the entire loss, and I can show it", body: "Going back through the profit and loss with the cost lines separated: over January to August 2026 the business earned ₹15.36 lakh of commission and paid ₹34.69 lakh of freight, **2.26 times its own revenue**. Split that freight and ₹13.71 lakh of it is parcels coming back. The net loss for the period was ₹12.84 lakh. So **the return cost on its own was 107% of the loss**: at zero returns the same order book makes ₹0.88 lakh instead. Every other lever put together, coupons, wallet, item discounts, payment discounts, seller rewards, came to less than the returns did. That is what made returns the only thing worth working on." },
      { title: "Two facts that told us where to push", body: "Cash on delivery came back at **35 to 38%, prepaid at 7 to 9%**, four to five times worse, which is what justified the prepaid-only rule after a single return. And the couriers were not equal: **21.9% at Ekart against 50.9% at ShipRocket** on the same flow, a 2.3-fold spread, with Delhivery carrying 61% of the volume at 29.4%. One more that was counter-intuitive enough to be worth checking twice: orders carrying a coupon came back **less** often, not more." },
      { title: "Check that the win is not an accounting artefact", body: "Cash-on-delivery returns falling could simply mean fewer cash orders. So I split it: **the return rate on cash orders itself fell from 49% to 28%, while the cash share of orders only moved from 79% to 72%**. The mix barely shifted. The improvement is real behaviour, not a change in what we were counting." },
      { title: "Build the carrier decision instead of arguing it", body: "The courier spread was worth real money, so I built a cost model to settle which one to use. It prices a single shipment on both carriers from **the charges we were actually billed rather than the published rate card**, across eight zones and the weight slabs, with cash-on-delivery fees and a probability that the parcel comes back. Run over **3,534 shipments it says the same traffic would cost 40% less, ₹5.81 lakh against ₹9.70 lakh, a saving of ₹3.89 lakh**. Half of that saving comes from the return leg alone, on a quarter of the orders, because the cheaper carrier charges a flat rate for a parcel that comes back and the incumbent charges the forward rate again. Two details I would want a reader to notice. I set the return-cost assumption to 0.9 times the forward rate when our own history said 1.56, so the model understates its own case. And it does not give a single answer: **within the city the incumbent is 4.5% cheaper, so that lane stays**, and so does the heaviest regional lane. Everything else moves, which is 87% of orders. It is a what-if panel rather than a slide, so the decision could be taken lane by lane." },
      { title: "Report the slowest orders, not the middle", body: "A shopkeeper does not experience a median. He experiences how long his own parcel took. The median went 10.2 to 6.1 days, about 40% faster. The slowest tenth of orders went **28.2 to 10.1 days**, about 64% faster. Four weeks down to ten days is the number that decides whether he orders again." },
    ],
    metrics: [
      { value: "42.6% → 21.4%", label: "return rate, Mar to Aug 2026", note: "returns ÷ (returns + delivered). June sat at 32.9%" },
      { value: "−₹196 → +₹126", label: "contribution per completed order, before return costs", note: "Feb −₹196, Apr −₹25, Jun −₹18, Jul +₹44, Aug +₹126. Queried" },
      { value: "107%", label: "of the whole loss was the cost of returns", note: "₹13.71 lakh of return freight against a ₹12.84 lakh net loss. Zero returns and the business made ₹0.88 lakh" },
      { value: "2.26×", label: "total delivery cost against commission earned", note: "₹34.69 lakh of freight on ₹15.36 lakh of commission, Jan to Aug 2026" },
      { value: "21.9% vs 50.9%", label: "return rate, best courier against worst", note: "Ekart against ShipRocket on the same order flow. Delhivery carried 61% of volume at 29.4%" },
      { value: "40%", label: "lower freight in the carrier model I built", note: "₹5.81 lakh against ₹9.70 lakh on 3,534 real shipments. Half the saving is the return leg" },
      { value: "35–38% vs 7–9%", label: "return rate, cash on delivery against prepaid", note: "four to five times. Coupons, counter-intuitively, lowered the return rate" },
      { value: "−77% → +10.6%", label: "margin on the business", note: "Feb 2026 to Aug 2026. July was −0.6%, so August is the first month it cleared" },
      { value: "28.2 → 10.1 days", label: "slowest tenth of deliveries", note: "Jan to Jun 2026, by the month delivered" },
      { value: "₹4.68 L vs ₹3.59 L", label: "June returns cost against commission earned", note: "the row that explains why the model had to change" },
      { value: "378 / 362", label: "weight claims and tickets filed in 24 hours", note: "one representative day of the claims service" },
      { value: "−₹5.2 L → −₹0.24 L", label: "monthly loss including returns, Jun to Jul", note: "commission ran at 13–15% of order value throughout" },
    ],
    honesty:
      "The contribution figures are the company's own P&L, not my measurement. I say we took contribution from −₹196 to +₹36, never that I measured it. The fulfilment work under it is mine: 34 of the 42 features in that area were specified by me. The prepaid-only rule was the founder's call, raised by our support head; I designed and shipped the mechanism. The claims service was built by our automation team to my requirement and guard rails. To be exact about delivery speed: the courier model got to about six or seven days, not three to four. Three to four was the target for the warehouse model, which ran for eight days, so I will not claim it.",
    lessons: [
      "Automate the clock, not the judgement. A person watching a 24-hour window is not a job, it is a scheduled task.",
      "Report the slowest tenth next to the median, or you are hiding what the customer felt.",
      "Nobody reduces a cost they cannot see. Making freight visible came before every saving.",
    ],
  },

  // ── 03 ────────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-channel",
    title: "WhatsApp: the channel I built, ran and measured",
    short:
      "From nothing to ₹9.60 per app install across 29,172 buyers. Campaigns of 25,000 to 62,000 recipients with the cost tracked per send, an audience model over 1.17 million buyers, templates approved under my own name, a vendor replaced with our own platform, and the report that said the channel was losing money.",
    tier: 1,
    themes: ["Growth", "Unit economics", "Built it myself"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["AiSensy, then our own platform", "WhatsApp Business API", "Cohort SQL over 1.17M buyers", "Utility vs marketing templates", "Same-day attribution", "City community groups"],
    headline: [
      { value: "₹9.60", label: "cost per app install", note: "₹1,87,589 ÷ 19,534 install-driven buyers, June 2026, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
      { value: "25k–62k", label: "recipients per campaign", note: "read rates 46–70%, click rates 3–13%, cost recorded per send" },
      { value: "2.60× → 1.12×", label: "return on spend, June to July", note: "same-day rule. A seven-day window would have shown 5.22× in June" },
    ],
    cta: "Read the campaigns and the report that halved its own headline",
    context: [
      "New buyers arrived through Meta ads without much trouble. The problem was everyone already in the contact base: roughly a million shopkeepers who had installed the app, ordered once or never, and gone quiet. Push notifications did not reach them, and I measured how badly. Over 31 days to 25 June we sent **81.77 million push notifications and got 130,000 opens**: half never reached the device at all, and of the half that did, three in a thousand were tapped. WhatsApp reached the same people. That is the whole reason the channel existed, and the reason it was worth paying per message for reach that push gave away for free. From February 2026 I ran the channel end to end: audience, copy, templates, the vendor, the sending platform, the measurement, the city groups, and the sales desk that answered the replies.",
      "It became the highest-reach channel the company had, and for a while its way of defending daily actives. On a slow day in June the founder's instruction was to send a thousand messages an hour. My job was to make that spend accountable.",
    ],
    mechanisms: [
      { title: "One list, seven groups, first rule wins", body: "**1,167,517 buyers**, each placed in exactly one of seven groups by a priority order, so the set covers everyone and counts nobody twice. A live cart outranks a past order, because the open cart is the thing to act on. The never-ordered pool is split by how long they have been away, down to the 73,473 who installed and never opened the app. Exact counts were marked exact; estimates carried a tilde." },
      { title: "Check serviceability before sending", body: "Every group was matched against deliverable pin codes before a message went out, because messaging someone we cannot deliver to spends money and template quota to annoy them. Later the same rule became a database filter, so opted-out and unserviceable buyers never entered a send list." },
      { title: "Name the campaign so you can read it later", body: "Each campaign is named type, topic, cohort, batch, size: `Utility_lapsed_buyer_help_wallet_pincode_C6_B4_50K_Batch5`. Messages carried the buyer's first name, wallet balance and pin code, with image, video and plain versions, and the rupee cost recorded per campaign. Six captured campaigns ran **25,000 to 61,997 recipients** each: 71–95% delivered, 46–70% read, 3–13% clicked." },
      { title: "Follow one campaign to the order book", body: "A cart-reminder campaign, all the way through: 3,870 queued, 3,670 delivered, 2,420 read, 377 clicked, 185 opened the app, **17 placed 28 orders worth ₹35,324 on ₹409 of spend**. I reported a 24-hour window next to it (11 orders, ₹15,654), because orders three days later are weak evidence. A second campaign: 2,170 sent, 15 buyers, ₹31,348 on ₹224." },
      { title: "Utility templates cost about a seventh of marketing ones", body: "On one send, ₹16,811 bought 15,423 marketing messages while ₹2,885 bought 19,894 utility messages. Routing genuinely transactional traffic into the right category was the bigger half of the saving. Over ten days in June we sent 4,03,849 utility messages for ₹58,558 and no marketing messages at all." },
      { title: "Write the vendor decision down", body: "I wrote the cost memo: spend to date, the budget at 50,000 buyers a day, three vendors compared at 15 lakh messages a month, and why we stayed on the incumbent for one more quarter. Two reasons, both about control: a prepaid wallet that caps spend, and an automatic stop when Meta reclassifies a template mid-campaign. Then I ran the move onto our own platform on Meta's API, at **₹0.145 down to ₹0.115 a message**, with spend caps, auto-stop and click tracking rebuilt as the conditions for switching." },
      { title: "Write the templates yourself", body: "The Delhi and Gurgaon relaunch ran on templates I wrote. `jit_pincode_available_v1` is approved, created and last edited under my name, with tracked deep links, and versioned rather than edited because Meta re-reviews every change. The 20,000-per-batch pin code campaigns carried the launch and were measured click to order: 694 clicks produced 10 orders in the first week." },
      { title: "The transactional side: one message per order, per stage, ever", body: "Separately from campaigns I specified the order-status messages: **12 Hindi templates across the eight stages of a delivery**, sent as utility, triggered off the delivery record. The rule that mattered was that each send is claimed against an order-and-stage key, so a status that flips back and forth can never message the same shopkeeper twice for the same event. The payment message fires on money genuinely owed rather than on cash-on-delivery, which is about 1 in 400 orders. I also wrote down the statuses that get no message at all, because deciding to stay quiet is part of the design. All twelve were checked with a real send before going live." },
      { title: "Design the console instead of asking for one", body: "Sending at this scale needed an operator screen, so I drew it and read the existing code to work out the gap. Campaigns, templates, audiences, history; audiences defined as behaviour rather than uploaded lists, such as carts blocked by the minimum order value or carts left stranded; a per-campaign cap on sends a day; and a dry-run state so a campaign can be compiled and counted before anyone is messaged. I handed engineering the screen and the list of changes their code needed, not a request." },
      { title: "The measurement bug: 117 buyers visible out of 537", body: "A WhatsApp click reaches the app two ways. An existing user opens by deep link. A new user goes to the Play Store, installs, and opens fresh. Our queries read a field that only exists on the first path, so we counted people who already had the app and were blind to everyone the campaign actually acquired. The app was already recording both paths in a field nobody was querying." },
      { title: "Stop trusting the link, match buyer by buyer", body: "Once I knew the tracking link missed most of the impact, I stopped reporting from it. For each campaign I took the vendor’s read and click export, matched those phone numbers against app activity that day, and counted what those specific people did. On 9 June that gave **1,404 app opens at ₹4.77 each, 21.8% of the entire day’s active users on the app**, from ₹6,697 of spend. I published it as three confidence tiers rather than one number: 754 buyers I could prove, 1,404 I was confident about, and 773 more that were plausible but soft. I reported the middle tier and said so." },
      { title: "Take the big orders out of my own results", body: "One daily report had two orders that would have carried the whole number: ₹5,23,000 and ₹37,000, both from buyers whose products had nothing to do with the campaign. I excluded both and said why, which cut my own headline by more than an order of magnitude. In the same report I added one ₹822 order by hand because it was genuinely from the campaign and the link had not recorded it. Both directions, same rule: report what happened, not what scores well." },
      { title: "Read the failure as a wall, not as bad copy", body: "The same message went to two cohorts. The lapsed-buyer wallet cohort read it well and converted badly: 19% of readers opened the app, against 52% in the pin code cohort, at ₹6.59 a head against ₹3.74. The reason was in the data: **343 of them had to re-install the app** to act. The message was not the problem. The distance between tapping a link and being able to order was. Changing copy would not have moved it." },
      { title: "Publish the smaller honest number", body: "Crediting an order if WhatsApp had touched the buyer any time that week gave 1,272 orders and 5.22×. Crediting only same-day touches gave 647 orders and **2.60×**. I led with the smaller figure and wrote down that the truth sits between the two." },
      { title: "Then write that none of it is enough", body: "In July Meta reclassified 15,398 conversations from utility to marketing, which cost ₹14,551, nine percent of the month. I priced three fixes against the same revenue: 1.24×, 1.36×, 1.62×, and 1.80× if we did all three. At the top of the report I wrote that Badho earns commission on order value, not the order value itself, so at 1.12× the channel only breaks even if commission clears 89%, and even 1.80× needs 56%. Ours was 13–15%. The channel lost money in July and the report said so on its first page." },
      { title: "Two-way, not only broadcast", body: "City groups for Delhi, Noida, Ghaziabad and Gurgaon, with posting limited to admins, polls as the way to hear back, one or two posts a day, and a Top Retailer of the Month post that required the named shopkeeper's consent for that specific use and an order figure that was literally true. Three sales agents worked the inbox, coached message by message to write like people rather than templates. The first order credited to that came back within four days." },
      { title: "The sales agent's first working version", body: "Many shopkeepers would not tap a link. They photographed a handwritten list or typed their order in Hindi. On 1 July I committed a complete service — request handling, prompts, messaging, authentication and a policy layer — with its handover document, in one sitting, using an AI coding assistant. The AI team took it over on day three. It cannot place orders at the tool layer, so it can never claim to have placed one." },
    ],
    metrics: [
      { value: "₹1,87,589 → ₹1,57,353", label: "spend, June to July 2026", note: "the two months the channel ran at scale" },
      { value: "19,534 → 8,419", label: "buyers who installed the app", note: "June ₹9.60 per install, July ₹12.43 per buyer" },
      { value: "647 → 251", label: "orders credited, same-day rule", note: "₹4,88,419 down to ₹1,76,376 of credited order value" },
      { value: "₹35,324 on ₹409", label: "one campaign, followed to the order book", note: "3,870 sent, 17 buyers ordered. ₹15,654 of it inside 24 hours" },
      { value: "₹0.145 → ₹0.115", label: "cost per message after moving in-house", note: "on about 169,000 messages a month. The vendor had cut us off once over an invoice" },
      { value: "81.77M → 130k", label: "push sends to push opens, 31 days", note: "half never reached the device; 0.31% of those that did were tapped. The reason to pay for WhatsApp" },
      { value: "₹4.77", label: "cost per app open on the best day", note: "1,404 opens, 21.8% of that day’s active users, counted buyer by buyer rather than from the link" },
      { value: "₹14,551", label: "lost to a template reclassification in July", note: "15,398 conversations moved from utility to marketing by Meta's rescan" },
    ],
    honesty:
      "Every return figure here is against order value, and Badho earned 13–15% of that value, so even June's 2.60× was not clearly profitable once commission is the numerator, and July was a loss. The 86× and 140× single-campaign returns are real but they are the best campaigns, not the average; the monthly figures are the honest ones. Our own platform was built by an engineer to my requirements. The sales agent's production version is the AI team's work; mine was the first version and the selling behaviour. The seven-day attribution number exists and is defensible, and I chose not to lead with it. I did this analysis with an AI assistant: the decisions were mine, the drafting was shared.",
    lessons: [
      "Price a channel before you scale it. A seven-fold template gap and a vendor's cut only show up in the per-campaign bill.",
      "A channel number is not a business number. 1.12× on order value is a loss when you keep 13% of it.",
      "Lead with the figure that survives an audit and write down where the truth actually sits.",
      "When the tracking link is wrong, match people one by one instead of reporting a number you know is false.",
      "A cohort that reads a message and then does not buy is usually blocked by something after the tap, not by the words.",
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────
  {
    slug: "buyer-app-plg",
    title: "Making the buyer app easier to order from",
    short:
      "Shopkeepers told me the app was confusing, four in five daily users had never ordered, and 89% of open carts sat below the minimum. A year of changes that mostly removed things: the signup form, the language popup, the extra tap for the OTP, and the floor under the first order.",
    tier: 1,
    themes: ["Product", "Growth"],
    period: "Mar – Sep 2026 · Badho",
    stack: ["Onboarding", "First-order minimum", "Cart reminders and expiry", "Home tabs", "Support and relationship manager", "Notification programme"],
    headline: [
      { value: "~9.8k", label: "daily active buyers at the June peak", note: "up from about 3–5k. Several changes landed together, so no single one owns it" },
      { value: "250+", label: "orders on 11 June 2026", note: "highest day the courier model ever had, announced by the company" },
      { value: "89%", label: "of open carts sat below the minimum", note: "38,500 carts. The finding that reorganised the notification programme" },
    ],
    cta: "Read what was removed, lowered and unblocked",
    context: [
      "The funnel in April, from our payments engineer's memo: about 3,000 daily users, 300 add-to-carts, 120 orders. Buyers who had never ordered were about 80% of daily users and 70% of sent orders, and they converted badly. In June, after taking calls on the sales desk, I wrote to the product team twice in three days that buyers were telling me the app was confusing to navigate and that we should rethink the home screen.",
      "Then the number that reorganised the work: **38,500 open carts, 89% of all open carts, were below the minimum order value.** People were not failing to find products. They were failing to clear a floor. So the programme became three things: stop asking questions before someone has decided to stay, lower the floor for the first order, and spend the effort on carts that already exist.",
    ],
    mechanisms: [
      { title: "Delete the signup form and the OTP tap", body: "The name-and-shop-type screen appeared straight after the OTP and blocked the buyer before he had seen a product. It was removed: land on home, and collect the name in the checkout address form where it is actually needed. The OTP now sends itself as soon as a valid ten-digit number is typed, with no “Next” button, and logs the buyer in on verify. Both tickets were written on 13 June and shipped in version 8.179.0 on 15 June." },
      { title: "Pick the language from the shop's location", body: "The app used to force Hindi on everyone through a full-screen popup that lost buyers at the first step. I specified deriving language from the state the shop is in, set by a database trigger across 38 states, with a manual choice never overwritten. The Hindi belt gets Hindi, the south, east and metros get a thin toggle. The bug that made it fail first time is the useful part: the app was writing its own default back over the database on every restart. Shipped in 8.195.0 on 26 June." },
      { title: "A lower floor for the first order, with no app change", body: "First-time buyers should see a lower minimum than repeat buyers. I specified it as a computed field that shadows the minimum-order column, so the app asks the same question and gets a buyer-aware answer, and the change shipped without touching the client. Within days the company simplified it to a flat **₹300 first-order minimum** across brands, announced on 11 June." },
      { title: "Work the cart the buyer already has", body: "From the 89% finding: a reminder between home page sections, an abandoned-cart section listing open carts and how far each is from the minimum (8.214.0, 18 July), groups for active-cart, add-address and incomplete-profile buyers, and a seven-day cart expiry on a consecutive-inactivity rule so stale carts stopped distorting every metric. Cart conversion was 0.6% of lifetime carts when I wrote the specification." },
      { title: "Bring the tabs to the top of the home screen", body: "I specified a tab strip so the highest-converting content sits above the fold instead of below three scrolls. It shipped on 18 July in 8.214.0 as **₹1 Deals, Combos, Free Products, Top Brands, Refer & Earn**, with ₹1 Deals as the default tab, plus a hero carousel and a coupons section. Games were in my list and were dropped from the strip." },
      { title: "Put the margin on the card, not at checkout", body: "The first item in my 1 July specification was to stop hiding discounts behind coupon codes: the real price has to be on the product card. Category tiles then carried the highest margin available in that category (18 July), brand cards carried their margins (29 July), and product cards carried an inline margin percentage. A discount a buyer only finds at checkout did not influence the add to cart." },
      { title: "Sort and filter a catalogue a shopkeeper can actually shop", body: "A category sidebar with an offers tab, sort options including the seller's margin slab, deep links straight to a category or product (8.121.0, 6 April), a “deal items” filter chip, and filter chips brought to the front of search (8.57.0, January). The category tree and richer facets were specified and left unfinished when the company closed." },
      { title: "Support as its own tab, with a named person behind it", body: "Support replaced the profile icon in the bottom bar (8.177.0, 13 June), then got WhatsApp support and new help options (8.179.0, 15 June). I specified making the support screen configurable and assigning every buyer a relationship manager, round-robin across three people, with rules that show a banner naming the buyer's own manager. The assignment was backfilled to **1,465,882 of 1,516,628 buyers**, about 97%. Shipped in 8.195.0 on 26 June." },
      { title: "Free gifts funded by the brand, with a progress bar", body: "I specified the gift engine: cross a brand's cart threshold and a free item attaches at ₹0, with a live progress pill, and detaches if the cart drops back. Pansari at ₹1,500 and ₹2,500, Chukde at 300 pieces for a bedsheet, Chaivik at four and eight units. It was reverted out of one release on 16 June and landed properly in 8.186.0 on 17 June." },
      { title: "Show what is about to be ordered", body: "After the buyer taps pay, a sheet lists exactly which deliveries are about to be placed. Unchecking one saves that seller for later instead of deleting it. It fixed buyers being surprised by a second delivery they had not meant to order." },
      { title: "Thirty-one reasons to send a notification", body: "I wrote the catalogue of 31 reasons to message a buyer, led by carts blocked below the minimum, stranded items and abandoned payments rather than lapsed-user broadcasts, with a hard cap of 8 to 10 notifications per buyer per day. I specified the pipeline behind it, which reads a nightly copy of the buyer base instead of the live database. It shipped as a campaign console with reusable groups, each carrying its own number: cart blocked by minimum, average gap ₹301; payment started and not finished, the highest intent in the system." },
      { title: "Roll out to a few versions first, then fix the metric", body: "UI changes went to four app-version groups before everyone. And the measurement was wrong in a way that mattered: the daily report counted only carts created today by buyers active today, so a buyer returning every day to the same cart looked like decline. I asked for lifetime carts of active buyers as a second row." },
    ],
    metrics: [
      { value: "322 → 2,099", label: "orders a week, 30 Mar to 8 Jun 2026", note: "the peak week. Then 800–960 in July and 640–830 in August" },
      { value: "789 → 957", label: "first-time buyers a week, either side of the lower minimum", note: "median first order ₹816 → ₹522; share under ₹500 went 32% → 48%" },
      { value: "0 → 10.6%", label: "orders carrying a free gift", note: "2.4% in the first week after 17 Jun, 5–6% through July, 8–10.6% in August" },
      { value: "73.4k → 41.7k", label: "open draft carts after the expiry sweep", note: "26 July against 9 August, then steady at 42–47k" },
      { value: "1,465,882", label: "buyers given a named relationship manager", note: "of 1,516,628, about 97%, backfilled with the support screen rework" },
      { value: "10.1%", label: "of June's first-time buyers ordered again the next month", note: "the largest cohort of the year, 2,979 buyers, and the worst retention of the year" },
    ],
    honesty:
      "I queried all of this from production in September 2026, after the company closed, which is later than it should have been done. **June cannot be separated.** Between 8 and 25 June the database shows new buyer records tripling, daily actives doubling, ₹1 items reaching 68% of orders, free gifts arriving, the daily streak running, the unified cart shipping and a ₹300 first-order floor appearing. First orders peaked at 957 in a week and that June cohort then retained worst of the whole year. Two specific corrections I will not paper over. First, the jump in new buyer records starts the week *before* the signup form was removed, so I cannot claim it; buyers reaching a session within seven days actually fell, from 92% to 64%, and the signup metric itself had a reporting artefact we had to fix. Second, the database shows the ₹300 first-order floor as a floor being *introduced*, not lowered: before the change, first orders went down to ₹0 and 18 to 192 a week were under ₹300; after it, the minimum is exactly ₹300 and none are below. The team: Muskan Pandey ran schemes and home design, Rahul Verma the earlier funnel analysis, Sahil Rohera checkout and coupons, Shubham Kumar and Kushagra Rathore built most of what I specified, and the streak and games were the AI team's. Nobody measured signup completion before and after, which is instrumentation I should have insisted on.",
    lessons: [
      "Every question asked before a buyer has decided to stay is a question some of them answer by leaving.",
      "Find the floor before polishing the funnel. Those carts were not lost to discovery; they were blocked by a minimum.",
      "Put the price on the card. A discount discovered at checkout did not influence the decision to add.",
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────
  {
    slug: "pricing-experiments",
    title: "Discounts on the item and on the cart",
    short:
      "Four ways of giving a shopkeeper a better price, shipped in order and measured: coupons and vouchers at the cart, quantity discounts on each item, ₹1 trial products, and a platform-funded cut in the base price. The honest finding is that the first one did not move conversion.",
    tier: 1,
    themes: ["Pricing", "Growth", "Unit economics", "Built it myself"],
    period: "Apr – Sep 2026 · Badho",
    stack: ["Coupon and voucher engine", "Item-level quantity coupons", "Quantity slabs", "Platform-funded base margin", "Release notes"],
    headline: [
      { value: "2.9% → 29.5%", label: "of orders carrying a funded coupon", note: "three weeks before against three weeks after 24 Apr 2026, queried from production" },
      { value: "flat", label: "conversion, despite that usage", note: "60% of never-ordered buyers used a coupon; order-level conversion stayed ~15%" },
      { value: "87 → 102", label: "units per order after item-level coupons", note: "four weeks either side of 17 Jul 2026. Other changes landed in the same weeks" },
    ],
    cta: "Read all four, including the one that did not work",
    context: [
      "A kirana shopkeeper does not buy on price. He buys on margin: what he pays against what he can sell it for. For most of the year our discounts were hidden behind coupon codes he had to find at checkout, which meant they could not influence the decision to add something to the cart. Across five months we tried four different places to put the money, and the sequence matters more than any one of them.",
      "I wrote the release notes for these launches myself, which is why the versions and dates below are exact. Two of the four have honest numbers attached. Two do not, and the page says so.",
    ],
    mechanisms: [
      { title: "One: coupons and vouchers at the cart", body: "Eligible codes appear on the cart page with the best one first, and a sheet lists all of them together. A **coupon** is public and conditional, like 20% off a first order up to ₹200. A **voucher** is private to one buyer, issued by a sales agent to close a call or by the team after a bad experience. Both appear in the same place, apply with a confirmation, and show up as a separate line in the order summary. One discount per order, no stacking. It replaced a flat ₹50 signup credit, and I wrote the release note for 8.133.0 on 24 April." },
      { title: "What that first experiment actually did", body: "Six days later our growth lead ran the cohort analysis and reported it straight: **about 60% of buyers who had never placed an order were using coupons, order-level conversion stayed flat at about 15%, and user-level conversion drifted down from 2% to about 1.7%.** Heavy usage, no lift. The discount was being collected by people who were going to order anyway, or by people who still did not order. That result is what pushed the money out of codes and onto the product card." },
      { title: "Two: put the discount on the item and scale it with quantity", body: "Every eligible product carries its own coupon on the card, with add-more chips whose percentage rises as quantity crosses thresholds snapped to case sizes. The tiers are recalculated live as the quantity changes, stack with the cart coupon, and are re-checked on the server at checkout. Combos are excluded. It replaced a modal that interrupted the add to cart with a keyboard, and shipped on 17 July in 8.212.0. A week later I had the wording changed from “X% off” to “Get X% margin”, because margin is the number a shopkeeper runs his shop on." },
      { title: "What it cost to give", body: "The discount ladder was deliberately capped: on a ₹2,000 order the maximum discount was about ₹76, against ₹200 under the old cart coupon. By the end of July the margins were set at base 2%, first slab 4%, second slab 10%. The constraint was stated plainly by our engineer in the same week: we were low on budget." },
      { title: "Three: ₹1 products as a trial", body: "Ten products from ten brands, normally ₹50 to ₹150, repriced to ₹1. The point was not the discount, it was getting an unknown brand into a shop that would never buy a full case of it. It was pure configuration, no code. Later it became the default tab on the home screen (18 July), then an add-on inside the cart (23 July), and under the warehouse model it was gated behind the minimum with one ₹1 item per order." },
      { title: "Four: cut the base price instead of discounting it", body: "In late July we stopped adding a platform margin on top and started funding 2% off the base price, shown as an unstruck price with a green strip rather than a crossed-out MRP, because we were being compared against a competitor on shelf price. The position was to sell about 4% below base and say so. I also filed the accounting bug this created, where about ₹1,824 of funded discount was not being recorded against the right ledger. It was still open when the company closed." },
      { title: "I built the tool to check my own discounts", body: "I had shipped four ways to give money away and had no single place that showed where it went, so over two nights at the start of August I built one: seven queries and ten screens, splitting every order into the cart coupon, the item coupon, the platform margin discount and the wallet, each pair adding back to the line above it so a reader can check the arithmetic. **The rule I set for myself was that it must not invent a second definition.** It mirrors the query the team already read every morning, expression for expression, so nobody has to learn two meanings for the same word, and it offers two reconciliation modes: one that ties to that daily query and one that ties to the profit-and-loss dashboard. It was merged into the company repository and, as far as I can tell, nobody ever opened it." },
      { title: "The bug I wrote down against myself", body: "My first version listed the order statuses to include. That list dropped DISPATCHED, spelled one value wrong so it matched nothing, and included one that does not exist in the data at all. **The totals came out 27% light and still looked completely plausible**, which is the part worth remembering: it was not obviously broken on screen. Dropping DISPATCHED alone hid 770 orders and ₹29,900 of coupon in a single month. The fix became a rule I would now apply anywhere: list the statuses to **exclude**, never the ones to include, so a status added next quarter is counted by default. For a spend number that is the safer direction to be wrong in." },
      { title: "Set the threshold from what the configuration can actually do", body: "The item coupons were configured to take between 2.04% and 8.16% off the item price. So anything above 9% of an order is not a deep discount, it is a defect. I made that a flag rather than a bucket, and it caught real money: in June **640 of the 1,495 orders carrying an item coupon, 43% of them, discounted above what the configuration allowed, costing ₹60,285**, which was more than half that month\u2019s item-coupon spend. One order gave away 36% of its own value. July was 148 orders and ₹20,913, August two orders and ₹368. To be fair about timing, I built this at the start of August and the rates were consolidated onto a single 8% that same month, so I will claim that it made roughly ₹81,000 of out-of-spec discount visible, not that it removed it." },
      { title: "The trap I labelled so the next person would not fall in", body: "There are four coupon tiers with names, and a rate recorded on every coupon line. It is natural to read the tier as the rate. **They are unrelated.** All four tiers are configured identically and all four are observed across the whole two-to-ten ladder, because the tier decides which sellers qualify while the rate is set per line. Grouping by rate and grouping by tier answer different questions, and I wrote that into the file in capital letters so nobody would quietly mix them. I also recorded that the rate is only captured from 13 July onward, so the earlier remainder is real rather than a rounding gap. The data bears that out: 37% of July\u2019s item-coupon spend carries a rate, against 98.6% of August\u2019s." },
      { title: "The same query, six weeks later, gives a different answer", body: "My notes from 2 August record July at 2,831 orders and ₹1,18,603 of coupon. Re-running the identical query in mid-September gives **2,497 orders and ₹1,05,272**, about 12% fewer orders and 11% less spend. Nothing is wrong with either. 334 of those orders have since been rejected or cancelled and left the cohort, and the orders that were mid-delivery have moved on. A discount number measured over an open cohort is not a fixed quantity, and anyone quoting one should say what date they ran it." },
      { title: "Quantity slabs without the word slab", body: "Prices fall as quantity crosses configured tiers. The original interface interrupted the buyer with a modal to type a quantity; I replaced it with a non-blocking strip on the card that shows progress to the next price, and kept the word “slab” out of the buyer's view entirely. The bigger plan behind it was to move average order value from about ₹1,000 toward ₹2,000, and I named the blocker before we scaled it: there was no way to simulate what a price change would do before shipping it." },
    ],
    metrics: [
      { value: "2.9% → 29.5%", label: "orders with a funded coupon", note: "32 of 1,093 orders in the three weeks before, 714 of 2,420 in the three weeks after" },
      { value: "₹3,578 → ₹34,600", label: "coupon discount given per week", note: "the week before launch against the first week after" },
      { value: "₹1,133 vs ₹884", label: "order value with a coupon against without", note: "after launch. Buyers who use a coupon were already buying more, so read this as selection" },
      { value: "0 → 49%", label: "orders with an item-level coupon", note: "first full week after 17 Jul 2026, then 34% and 31%" },
      { value: "68%", label: "of orders contained a ₹1 item at the peak", note: "15 Jun to 13 Jul 2026, up from under 1.3% in April" },
      { value: "2–8 points", label: "lower 30-day repeat rate after a ₹1 first order", note: "Jun: 31.5% against 39.2%. Jul: 26.8% against 28.7%. Only holds if draft and freebie lines are excluded; include them and two months flip positive" },
      { value: "43% / ₹60,285", label: "June orders discounted above what the configuration allowed", note: "640 of 1,495 coupon orders. About ₹81,000 out of spec across June and July, down to ₹368 by August" },
      { value: "27%", label: "understatement in my own first version of the discount report", note: "a status whitelist dropped DISPATCHED, misspelled one value and invented another. It still looked plausible" },
    ],
    honesty:
      "I queried these from production for this portfolio, in September 2026, after the fact. Cart coupons are the one clean read, because nothing else changed in April, and the read is mixed: usage went from 3% to 30% of orders while conversion did not move. Item-level coupons in July mostly moved money rather than adding it — the funded discount stayed at ₹24,000 to ₹45,000 a week while the old first-order coupon fell to zero — and they landed the same fortnight as ₹75 of free wallet credit, so the rise in units per order is not cleanly theirs. The ₹1 repeat-rate gap is the finding I would want asked about, and note that the database shows ₹1 volume from the week of 11 May, two weeks before the Slack announcement, so even that date needs care. Nobody ran a holdout on any of this. On roles: the coupon engine was built by Sahil Rohera to Manmohan's specification and the ₹1 pricing was the founder's brief. Mine are the item-coupon specification, the inline quantity strip, the margin wording, the release notes, and the accounting bug I filed against my own change.",
    lessons: [
      "High usage is not impact. A third of orders taking a discount while conversion stays flat means you are paying people who had already decided.",
      "Check whether a discount added spend or moved it. Ours moved it.",
      "A cheap first order can buy an order without buying a customer. The repeat rate said so.",
      "Exclude what you do not want, never list what you do. A whitelist made my own numbers 27% light and it still looked right.",
      "Set an anomaly threshold from what the configuration can produce, not from a round number. Then the flag means something.",
      "A spend figure measured over open orders moves after you publish it. Say the date you ran it.",
    ],
  },

  // ── 06 ────────────────────────────────────────────────────────────────
  {
    slug: "rewards-retention",
    title: "Rewards, and what retention actually showed",
    short:
      "A monthly gift ladder, a daily login reward, ₹75 of free wallet credit and a referral scheme. I queried all four against repeat orders afterwards. One of them doubled the chance a buyer came back. One of them moved ₹4.57 crore of credit and was used by 0.06% of the people who got it.",
    tier: 1,
    themes: ["Growth", "Unit economics"],
    period: "Apr – Sep 2026 · Badho",
    stack: ["Monthly gift ladder", "Daily login reward", "First-order wallet credit", "Referral legs", "Production SQL"],
    headline: [
      { value: "50% vs 19%", label: "next-month re-order, gift qualifiers against everyone else", note: "April 2026. The gap holds every month from April to July" },
      { value: "31–44%", label: "of monthly order value came from gift qualifiers", note: "Apr to Aug 2026, while they were 7–13% of delivered buyers" },
      { value: "0.06%", label: "of ₹75 credits were spent on an order", note: "609,245 buyers credited ₹4.57 crore; 342 of them used it" },
    ],
    cta: "Read which reward earned its cost",
    context: [
      "By April 2026 the company had four different ways of paying a shopkeeper to come back: a monthly gift ladder against order value, a daily reward for opening the app, free wallet credit for a first order, and money for referring a friend. Each was launched with a reason and none had been checked against repeat orders.",
      "So I went and checked, using the company's own metric definitions from the reporting console. What follows is one clear success, one expensive mistake, and two I cannot claim. The gift ladder was run by Muskan Pandey and the founder pushed hard for it; the streak, games and referral were the AI team's builds. What is mine here is the measurement and, in the case of the notification programme that fed these, the specification.",
    ],
    mechanisms: [
      { title: "The gift ladder, and why it works differently", body: "Spend a certain amount in a calendar month on delivered orders and you get a physical gift: ₹3,000 earned a small brass figure, ₹5,000 a table fan, and by August the ladder ran to an air fryer at ₹30,000, a silver coin at ₹50,000 and a trip at ₹3,00,000. Unlike a coupon it pays on cumulative value, not per order, so the reward and the behaviour we wanted were the same thing: order again this month. The cost is the part people forget to ask about: **₹2.42 lakh of gifts across April to August against ₹31.1 lakh of qualifier order value, so 7.8% of what qualifiers bought, and 2.8% of everything the business delivered** in those months." },
      { title: "What the query said", body: "Qualifiers re-order the following month at **two and a half to three times** the rate of non-qualifiers, every single month: 50% against 19% in April, 50% against 16% in May, 39% against 14% in June, 30% against 12% in July. They were 7 to 13% of delivered buyers and produced **31% to 44% of monthly order value.** That is the most robust retention signal in anything I ran." },
      { title: "Returns were quietly switching the scheme off", body: "A gift is earned on **delivered** value, which is the right rule: an order that comes back is not a sale. But it means every returned parcel takes the buyer further from a reward he was working towards, and nobody was measuring that. In June, **74 buyers would have crossed the first level if their returned orders had been delivered, against 168 who actually qualified** — the scheme could have been 44% larger with no extra spending. ₹10.7 lakh of order value from non-qualifiers was returned to origin that month. Across June to August, **127 buyers were denied a gift by a return against 309 who earned one.** This is the retention scheme\u2019s own data arguing for fixing delivery, and it is the cleanest link I found between the returns problem and the growth problem." },
      { title: "The honest half of that", body: "The number of qualifiers tracks the number of buyers receiving deliveries almost exactly, going from 11 in March to 52, 137 and 168 as the delivered base grew from 402 to 2,051. So the ladder did not create the growth. And the direction of causation is open: a shopkeeper who was going to order twice a month qualifies anyway. What I can say is that the group is worth identifying and worth spending on, which is what the relationship-manager assignment was for." },
      { title: "₹75 of free credit, and the ledger event nobody read", body: "A one-time ₹75 wallet credit for buyers who had never successfully ordered, with reminder notifications and an expiry that takes the unused balance back. The mechanism is sound. The execution was not: **609,245 buyers were credited ₹4.57 crore**, 559,920 of them in a single bulk run in the week of 20 July, and 603,235 expiry debits followed in August. First orders per week did not move: 425, 381, 459 before, against 361, 455, 403 after. **342 buyers spent the credit on an order, which is 0.06%.** Among people who signed up after the run it was better and still small, 0.33%." },
      { title: "The daily login reward, and how long it actually ran", body: "₹10 a day for opening the app, dropping to ₹2 and climbing back if you missed a day. Claims went 3,800 on the first day to 6,300 at the peak and back to 1,600. The important detail is the duration: the database shows claims on **nine days, 17 to 25 June**, then nothing until a single day in August. Daily actives averaged 8,497 in the fortnight before and 8,834 after, but that splits into 9,431 on the days claims were being paid and **5,710 once they stopped.** A reward that has to be paid daily to hold attention is renting it. And it never became a streak: of **29,885 buyers who claimed, 83.6% claimed exactly once** and not one reached ten days. Claimers did order more, 5.6% against 1.6% of app-active non-claimers over the next five weeks, but claiming needs the same app-open that ordering needs, so that gap is selection rather than lift and I would not present it as a result." },
      { title: "Referral, measured through the wallet", body: "There is no referral table in the production database, so I measured it through the three wallet payments it makes. Between 29 June and 31 August: **400 welcome bonuses to new shops, 229 payments of ₹10 to referrers, and 99 payments of ₹50** for a first delivered order. The design is the part I would defend: the new shop gets its ₹100 immediately because someone signing up needs a reason to finish, and the referrer's real money waits for a delivered order because the referrer is the one who can game it. The result is not defensible: our own console reported 12,116 people received a code and 289 referred anybody." },
      { title: "Where the measurement came from", body: "Every figure here was queried against the company's own definitions, taken from the reporting console's source rather than written fresh, so the numbers match what the business managed itself on. Order universe, test-account exclusions and the month boundary in Indian time all follow those definitions. I have kept the queries." },
    ],
    metrics: [
      { value: "50% vs 19%", label: "next-month re-order, April qualifiers against others", note: "May 50 vs 16, June 39 vs 14, July 30 vs 12. The gap never closes" },
      { value: "11 → 168", label: "monthly gift qualifiers, March to June", note: "tracking a delivered-buyer base that grew 402 → 2,051. The ladder did not create that" },
      { value: "74 vs 168", label: "June buyers blocked from a gift by a return, against those who earned one", note: "the scheme could have been 44% larger for no extra spend. 127 blocked against 309 earned, June to August" },
      { value: "7.8%", label: "gift cost as a share of qualifier order value", note: "₹2.42 lakh of gifts on ₹31.1 lakh, April to August. 2.8% of everything delivered" },
      { value: "609,245 / 342", label: "buyers credited ₹75, and buyers who spent it", note: "₹4.57 crore issued, 0.06% redeemed, 603,235 expiry debits in August" },
      { value: "9 days", label: "the daily login reward actually ran", note: "17 to 25 June 2026. Daily actives 9,431 while it paid, 5,710 after" },
      { value: "289 of 12,116", label: "people given a referral code who referred anyone", note: "2%. Our own console reported it on its first tab" },
      { value: "9.4–16.5%", label: "of each month's new buyers ordered again the next month", note: "Feb to Jul 2026. June, the biggest cohort, was the worst at 10.1%" },
    ],
    honesty:
      "I ran these queries in September 2026, after the company closed, which is later than useful. None of these rewards had a holdout group, so every number here is an association and not a proof: gift qualifiers may simply be the shopkeepers who were always going to order twice a month. The gift ladder was Muskan Pandey's programme and the founder's push; the streak, the games arcade and the referral build were the AI team's; the ₹75 credit was specified by the product account and built by Shubham Kumar. What is mine is the notification programme that carried most of these, the relationship-manager assignment aimed at the qualifying group, and this measurement. I am reporting the ₹4.57 crore credit event because it is the largest single thing I found and it did not work, not because anyone asked me to.",
    lessons: [
      "Reward the behaviour you want, not the transaction. The ladder paid on a month of orders and the repeat rate showed it.",
      "Check a reward against repeat orders before scaling it. Half a million credits went out and 342 were used.",
      "Attention you pay for daily is rented. Actives fell from 9,431 to 5,710 the moment the claims stopped.",
    ],
  },

  // ── 07 ────────────────────────────────────────────────────────────────
  {
    slug: "doka",
    title: "DOKA: the cake a customer designs on screen",
    short:
      "A nine-branch bakery chain in Riyadh wanted an ordering app where a customer builds their own cake. I pitched it cold with a prototype, priced it through three rounds, signed it at about $7,000, and was the product manager for the build: two order flows, scheduled delivery, and a five-step configurator that redraws the cake from three angles as you choose.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "Feb 2025 – Feb 2026 · ONO Suite",
    stack: ["Cold pitch and prototype", "Scope pricing", "Contract under Saudi law", "Requirements and UI", "POS mapping, 215 items", "Weekly client reporting"],
    headline: [
      { value: "5 steps · 3 angles", label: "the cake configurator", note: "shape and size, flavour, colour, decoration, personalise. Top, side and slice views" },
      { value: "~$7,000", label: "cold-pitched, priced and signed", note: "10 June 2025, 40/40/20 milestones, Saudi law. Client had pushed for $8,000" },
      { value: "iOS approved", label: "December 2025", note: "Android blocked on the client's developer account. Never publicly launched" },
    ],
    cta: "Read the product, decision by decision",
    context: [
      "ONO Suite ran self-ordering kiosks for Herfy, a Saudi restaurant chain whose account I managed. Herfy's cake brand, DOKA Bakery House, had nine branches in Riyadh and no customer app. In February 2025 I pitched one cold, with a clickable prototype and a recorded demo, to a client who had only ever bought kiosk software from us.",
      "I was the product manager for what followed. Pricing the scope, drafting the contract through the client's legal and finance teams, defining how the product worked, mapping a 215-item menu into their point-of-sale system, running the demos and the weekly status, and telling them the truth about the launch date. Day to day the build was me and one developer.",
    ],
    mechanisms: [
      { title: "Pitch something the client can tap", body: "The cold pitch was a clickable prototype and a recorded demo of the ordering flow, benchmarked openly against LOLA, the Saudi cake app the client admired, and Walmart's cake decorator. A client who can tap through the thing has fewer reasons to ask for a proposal document. Within a month they asked to see the make-your-own-cake model specifically." },
      { title: "Price the scope, then hold the line", body: "Phase one and two came to $7,000 against an earlier $6,400 as loyalty, CRM and generated cake images were added. When the client pushed the total to $8,000, I cut the scope back to phase one instead of taking the bigger number with the bigger promise. Image generation was priced separately, about $1,000, and marked optional. Terms: 40% in advance, then 40% on store deployment and 20% on the final migration, signed by both chief executives on 10 June 2025, reviewed by their finance director and legal team." },
      { title: "Two order flows, and the reason for both", body: "Custom cakes are made next-day in one central kitchen. Ready-made items come the same day from the nearest of nine branches. So the app asks which brand first, Ready to Order or Make My Cake, then which experience: delivery, take away or dine in, then whether you want it now or later. Ready-made items support all three; a custom cake is delivery only from the one kitchen. That split is in the client's own words and in my documents." },
      { title: "Scheduled delivery, because most orders are", body: "I asked the client directly whether delivery needed time scheduling; his answer was that most of their orders are scheduled. So the header carries a Delivery-or-Later switch, the cart has a Choose Delivery Time button, and the order record reads as a date with a time window — one December order shows 8 December, 08:46 to 5:32 pm. Pickup carries the same now-or-later choice." },
      { title: "Five steps, three angles, price moving as you go", body: "Shape and size, then flavour, then colour, then decoration, then personalise, with the steps shown as chips across the top and the price updating in the corner at every choice. Each shape is drawn from three angles — top, side and slice — so the customer sees what they are actually buying. Four shapes: square, rectangle, round and heart. I wrote the size table that sits behind them: round 4×3 for two to four people, 6×3 for five to eight, 8×3 for twelve to sixteen, 8×6 for forty-five to fifty-five, heart 6×3 and 8×3, square 8×8×3 for eighteen to twenty-two, rectangle 11×7×3 for twenty-two to twenty-six." },
      { title: "Draw the colour, do not store it", body: "Colour is a choice between fondant and cream finishes and then a swatch, and the app renders it by tinting the cake image rather than shipping a separate photograph for every combination. The order stores the actual value, for example a light green as its hex code. That one decision is what made the configurator possible: four shapes times three angles times every flavour, colour and decoration is a number of photographs no bakery was ever going to supply." },
      { title: "Generate the images the client could not give us", body: "For the combinations that did need images, we used an image model to generate permutations from DOKA's own base assets rather than wait for a photo shoot that kept slipping. The decision is minuted on 25 June 2025 with six documented prompt experiments: recolouring the stripes, adding a candle, moving a design onto the heart shape, and producing the top and slice views. It removed a client dependency that was blocking the build." },
      { title: "Write on the cake, or put a picture on it", body: "The last step takes a message for the cake, a photograph the customer uploads, up to one megabyte as PNG or JPEG, and free-text remarks. The client asked for three placements — on top, on the side, or on a card on the cake. Every step also has a way out: no colour, no decoration. That skip option is one item Foysal logged as done by me rather than by him." },
      { title: "Send the finished design to the kitchen", body: "A screenshot of the configured cake goes to the admin panel with the order, so the person piping it sees what the customer saw. I also proposed pushing every component of the custom cake into the point-of-sale system after mapping base item ids, so the kitchen ticket matched the app." },
      { title: "Say no to the client, with the reason", body: "In an August meeting DOKA asked for four flat options — dine in, delivery, pickup, make my cake — treating the custom cake as just another fulfilment choice. It cannot be: different menu, different kitchen, different lead time, different order states. I proposed a compromise that kept the split in the backend and hid it in the front end; our founder ruled it out; I wrote the message that told the client it was not possible and why. I also wrote up the cart conflict it created as two named options, unified delayed delivery or forced separate orders, and asked their decision-makers to pick one rather than choosing for them." },
      { title: "Do the unglamorous data work yourself", body: "The client owed us assets and kept slipping, so I loaded them. In my own note on 25 June: the store locations uploaded, and 40% of the menu items and images with their point-of-sale mapping done. Two hundred and fifteen items with their codes, nine branch ids, Arabic and English. I also entered every decoration name with its Arabic translation by hand." },
      { title: "Report status the client can act on", body: "Weekly status to their coordinator, and on 8 September a signed report of about twenty-five work items — done, pending, next — headed from me, at roughly 95% of core functionality. Integrations named plainly: point-of-sale order push working and event sync back still broken, card payments through Checkout.com with Apple Pay still in testing, SMS one-time passwords, push notifications, over-the-air updates." },
      { title: "Say the app is not ready", body: "At the 21 August demo to DOKA's business team, asked to commit to a launch date by Sunday, I said the app was unstable and needed significant testing, including Apple Pay. A date would have gone down better. The original 25 August launch, compressed from four or five months to three at the client's insistence, was missed." },
      { title: "Exit without an argument", body: "When the client objected, fairly, to the app and the kiosk contracts being tied together, I stopped arguing and ran a full handover. Every project asset transferred in January 2026, and on 24 February the relationship was formally closed." },
    ],
    metrics: [
      { value: "$6,400 → $7,000", label: "the negotiated price", note: "client pushed for $8,000 as scope grew; I cut back to phase one instead" },
      { value: "40 / 40 / 20", label: "milestone split", note: "advance, store deployment, third-party migration" },
      { value: "4 shapes · 3 angles", label: "cake views the customer can see", note: "square, rectangle, round, heart. Top, side, slice" },
      { value: "215", label: "menu items mapped to the POS across 9 branches", note: "real catalogue in riyals, not a sample" },
      { value: "66 / 20", label: "decorations requested, and the ones we could not source", note: "I raised the gap rather than quietly ship fewer" },
      { value: "~95%", label: "core functionality at the 8 Sep 2025 report", note: "my own figure. Apple approved the build that December" },
    ],
    honesty:
      "It never launched publicly. Apple approved the iOS build; Google raised developer-policy problems on the client's own account that were unresolved when I handed over. The 16-week plan was missed, and a late design review three weeks before the hoped-for launch still found the wrong theme colour and blank loading screens, which means we were racing features ahead of stability. The configurator was openly benchmarked on a competitor's and that is written into the requirements the client received. I wrote no production code: the one code item Foysal credited to me was a configuration change, and the rest of what I did hands-on was data entry in the admin panel. Several decisions were the client's, not mine: Arabic as a requirement, the order-status names, the cap on decorations, the placement options. The refusal to merge the flows was the founder's call; I delivered it. Final commercial sign-off sat with him too.",
    lessons: [
      "Pitch something the client can tap. A prototype closes what a document cannot.",
      "Render the variation instead of storing it. That is what made a configurator possible without a photo library.",
      "Give the client two costed options and make them choose, rather than choosing silently for them.",
    ],
  },

  // ── 08 ────────────────────────────────────────────────────────────────
  {
    slug: "ono-product",
    title: "Kiosks, QR ordering and menu screens for restaurant chains",
    short:
      "Self-ordering kiosks in malls, QR ordering at the table, white-label ordering apps and cloud-managed menu screens. I specified features on them, wrote the offer engine requirement, ran the promotions myself, handed point-of-sale vendors the integration contract, and triaged the production failures.",
    tier: 1,
    themes: ["Product", "Go-to-market"],
    period: "2024 – 2026 · ONO Suite",
    stack: ["Kiosk (dine-in, take away)", "QR ordering", "White-label apps", "Digital menu boards", "POS integrations", "Weekly client reporting"],
    headline: [
      { value: "19 malls · 34 kiosks", label: "the Taco Bell India estate I reported on", note: "weekly for about five months; ₹2,400 per kiosk per month" },
      { value: "79 of 82", label: "kiosks active, the figure I verified", note: "and the reason I rejected a vendor report claiming 90 of 102" },
      { value: "4 POS systems", label: "integrations I specified or scoped", note: "POSIST, Petpooja, GoFrugal, Rista" },
    ],
    cta: "Read the flows, the offer engine and the escalations",
    context: [
      "ONO Suite's product was a web application run on touchscreen kiosks, one instance per brand, plus QR ordering, white-label ordering apps and digital menu boards, all connected to whatever point-of-sale system the restaurant already used. It was live in Taco Bell, Herfy in Saudi Arabia, Burger Singh, Pizza Wings, SVS Foods, Wow Momo and others.",
      "These surfaces existed before I joined. What I did on them was specify the next features, run the promotions, write the integration contracts vendors needed, and handle the failures. The product work here is incremental and operational, and that is how I present it.",
    ],
    mechanisms: [
      { title: "What a kiosk order actually looks like", body: "Idle screen, tap to order. Dine in asks for the table number from a keypad; take away skips it. Then a phone number, so the bill goes to the customer on WhatsApp. Then the menu: category rail down the left, vegetarian and non-vegetarian toggle, item cards with photographs and prices, and a customise sheet with add-ons, size and quantity. Then the cart with an upsell strip and a bill breakdown. Then payment: card terminal, UPI, a payment machine, or pay at the counter. Then an order number to show at collection. Every screen carries an accessibility icon, a language selector and a start-over button." },
      { title: "The offer engine, written as two problems", body: "In September 2024 I hit two failures on the live Taco Bell kiosk and wrote them up as a requirement rather than a bug report. First: a product offered at ₹1 with a qualifying purchase was not appearing, so the ₹1 item had to be offered as a choice on the parent item, not depend on the point-of-sale menu, and had to disappear automatically if the parent left the cart, one per parent. Second: buy-one-get-one gave a single free drink no matter how many qualifying items were in the cart, so the free quantity had to scale. The document is dated three weeks after my own messages reporting both." },
      { title: "Run the promotions rather than hand them over", body: "I created the coupons and tested them on the kiosk myself, mailed the banner to go with them, and had the offer banners taken down the next morning when the promotion ended. I wrote the WhatsApp message a customer gets when the order is ready, with different text for dine in and take away. Small work, but it is the difference between a promotion engine and a promotion." },
      { title: "Remove the step the store does not need", body: "Dine in required a table number, which some stores could not use. I pushed for the requirement to be removed, confirmed it with the vendor, and tested a store without it. Other changes in the same vein: the idle screen took more than a minute to return, so I had it cut to thirty seconds from every screen; the cheaper option in a modifier list was not selected by default, so it became the default; coupons were being applied to combo items where they should not be." },
      { title: "Hand the POS vendor the contract, not a conversation", body: "For the GoFrugal integration I first specified the sync in plain language: price, item name, description and taxes sync from their system, images stay with the kiosk, and an item made unavailable in the point-of-sale disappears from the kiosk. Three months later I wrote the full request payload and webhook contract — five cases covering a simple item, a combo, a coupon or loyalty discount, packing charges and a multi-item order — to present to their engineering team as the fields an integration needs." },
      { title: "Escalate a payment failure with the evidence", body: "Some kiosk payments were completing at the gateway and failing to reach the point-of-sale, so the customer was charged and the kitchen never saw the order. I filed a structured escalation to the payment provider with a real payment id attached, describing the inconsistency and its operational effect, rather than asking the developer to try again." },
      { title: "Report weekly, and check the numbers you are given", body: "For about five months I produced Taco Bell's weekly report: revenue week on week, revenue per store, region trend, the stores that dropped most, uptime hours per kiosk, and later average order value per store. File history shows me as the last editor on all eleven decks, revision 7 through 86. Separately, when a report claimed 90 of 102 kiosks were active against the 79 of 82 I had verified, I rejected it and said why, and when a cumulative revenue figure looked too small against 193,449 orders I said that too before it went anywhere." },
      { title: "Menu screens, QR ordering and the demo kit", body: "Digital menu boards are a template of columns, prices and a video slot, managed from the admin panel and pushed to screens over the network, and I checked what happens when a restaurant's internet drops before pitching it to a client — the last menu stays up. I commissioned the demos used to sell them, and in February 2026 assembled a single package covering kiosk variants, the multi-brand app, the admin dashboard and a menu board so one person could show the whole product line." },
    ],
    metrics: [
      { value: "11 decks", label: "Taco Bell weekly reports, revisions 7 to 86", note: "file history names me as the last editor on every one, May to Oct 2024" },
      { value: "5 cases", label: "in the payload and webhook contract I wrote for GoFrugal", note: "simple item, combo, coupon, packing charges, multi-item order" },
      { value: "60 → 30 seconds", label: "idle screen timeout I had reduced", note: "on every kiosk screen, so an abandoned order clears faster" },
      { value: "2 conditions", label: "in the offer engine requirement", note: "₹1 item on a qualifying purchase; buy-one-get-one scaling with quantity" },
      { value: "193,449", label: "Herfy orders I used to disprove a revenue figure", note: "a cumulative revenue total that could not be right against that order count" },
      { value: "₹2,400", label: "per kiosk per month, Taco Bell", note: "34 kiosks, invoiced for a six-month term" },
    ],
    honesty:
      "None of these surfaces was mine to originate. The kiosk, QR ordering, the Wow Momo app and the menu boards all predate me: Taco Bell was live from December 2023 and Herfy was a four-year relationship by the end. What the record shows me doing is configuring them, specifying increments, running promotions, writing integration contracts, reporting weekly and handling escalations. I wrote no production code and I did not design the interfaces; I shared design files and was named responsible for locking the design, but somebody else drew the screens. The offer engine document carries no author metadata, so my claim on it rests on my own messages reporting both problems three weeks earlier. There are no usage or conversion numbers anywhere in this record for the kiosk, QR or app products.",
    lessons: [
      "Write the bug up as a requirement. Two failures on a live kiosk became the offer engine's specification.",
      "Give the other side's engineers the payload, not a meeting. It is the difference between an integration in weeks and one in quarters.",
      "Check a number before you forward it. Two of the ones I was handed were wrong.",
    ],
  },

  // ── 09 ────────────────────────────────────────────────────────────────
  {
    slug: "move-it-daas",
    title: "DAAS — Delivery as a Service",
    short:
      "A delivery service sold to the FMCG distributors already on our marketplace. One truck, booked by the day, doing the whole warehouse-to-shop round: ten to fifty shops, proof on every drop, cash collected and in the distributor's bank the same day.",
    tier: 1,
    themes: ["Go-to-market", "Product", "Unit economics"],
    period: "Jan – Sep 2026 · Badho",
    stack: ["Booking in the seller app", "Invoice photo to drop list", "Address locking and geo-fencing", "Route planning", "Two-party code", "Cash custody ledger", "Named failure reasons"],
    headline: [
      { value: "137 → 634", label: "truck-days booked a month", note: "Feb to Jul 2026. 3,016 truck-days over the life of the service, from my own query" },
      { value: "17,174", label: "deliveries completed to shops", note: "of 20,231 attempted, across 7,363 shops, carrying ₹18.95 crore of goods" },
      { value: "9 hours vs 5 days", label: "our own fleet against a courier", note: "the courier leg alone averaged 5.02 days of a 7.6-day delivery. Our fleet closed the whole round in about nine hours" },
    ],
    cta: "Read the product and the cost argument",
    context: [
      "A distributor in this trade owns trucks and hires drivers to get goods from his warehouse to the shops around him. That bill arrives every month whether goods moved or not: driver salary, truck instalment, fuel, repairs, insurance, and the money simply parked in the vehicle. On our own numbers that is ₹53,500 to ₹64,500 a month for one truck. If the driver quits, the day's sales stop. If a shop is missed, that sale is gone.",
      "We had already built delivery for ourselves. These distributors were our customers for groceries and not for logistics, and the product, the price and the sales conversation were all different. The awkward part was the paperwork: they did not keep orders in a system, they kept them on paper. Asking them to change that first would have ended the product at the first meeting.",
    ],
    mechanisms: [
      { title: "Book a truck by the day, not by the month", body: "Up to seven days ahead, an eight-hour duty, ₹1,400 to ₹2,000 a truck a day. No lease and no fixed cost, so a distributor pays nothing on the days he does not sell. That is the whole commercial idea, and it exists because this trade is seasonal: a fixed fleet is too small during festivals and sits idle for months afterwards." },
      { title: "Start where the paper is", body: "An order enters as a photograph of the invoice, and all ten to fifty drops are set up in seconds. The alternative everyone else offers is integrating with the distributor's accounting software, which is slow and rarely adopted, or typing the drops by hand, which is impossible during the morning loading rush. The number of drops is counted from the invoices rather than entered." },
      { title: "Fix the address once, then never again", body: "Small shops do not have usable addresses, which is why third-party delivery rates are poor: the driver cannot find the shop. After the first successful delivery we lock that shop to its phone number, derive the location from the address, and verify it against where the driver actually stood. The next driver goes straight there. Over the life of the service that built a map of **7,363 shops we actually delivered to**, from 17,678 invoices read by machine." },
      { title: "Plan the route without a passenger", body: "With a normal logistics vendor the distributor either sits with them to plan the round or sends a helper or salesman along in the truck, which is a cost every single day. Our software plans the round itself." },
      { title: "A code from both sides at every handover", body: "Each handover needs a code that both people hold, and proof of delivery is checked against the driver's location before a photograph is accepted. Proof stops being an argument, on every order rather than on the disputed ones." },
      { title: "Cash in the bank the same day", body: "Collecting cash normally means the owner waits until late at night to receive money and match it against the bills. Here payment goes to the distributor's own bank account, goods and money are matched digitally the same day, and any member of staff can do the handover because nothing depends on one person's memory." },
      { title: "A failed delivery becomes information", body: "Shop closed, refused to accept, wrong address, payment not ready. A closed list of reasons rather than a free-text box, tallied and sent to the distributor's sales team, so a failure turns into something they can act on instead of goods quietly coming back. A second attempt is a priced service, not a cost we absorb. The closed list went live on 21 May 2026, and in the data the loose free-text reasons stop that day and never return. The commonest cause turned out to be **shop closed, 644 times**, which is a scheduling problem rather than a delivery one." },
      { title: "Small closed vehicles, because the lane is narrow and the goods are not", body: "Three-wheelers took 98.5% of trips, 2,972 of 3,016, because market lanes are narrow, and the body is always closed, because FMCG goods have to stay sealed and dry. Four in five vehicles run on gas, and none on petrol." },
      { title: "The cost argument that closed the sale", body: "The pitch was about his money rather than our software: a trip on his own truck against a trip on ours, over twenty-two delivery days, nothing paid on idle days, and the capital released from a vehicle he no longer needed. **The figures in that pitch are the founders and I cannot stand behind them.** I went looking for the cost rows and they are not there: the delivery wallet table is empty, and driver earnings hold 175 incentive rows worth ₹4,871 in total, with no base pay, no fuel and no lease anywhere. What I can verify is the price side. A three-wheeler truck-day earned ₹1,360 in May and ₹1,612 by September, a four-wheeler ₹1,969 to ₹2,144, and fee income over the life of the service was ₹21.5 lakh on ₹18.95 crore of goods, a take of about 1.1%. Whether a single delivery made money is a question this data cannot answer." },
      { title: "Scale arrived and the promise slipped", body: "A distributor books a truck for a slot. Punctuality against that slot peaked at **41% in May, fell to 13% in July and 7% in September**, and median lateness went from 23 minutes to 79. No report showed this. I found it by going back through the trip logs, and it is the most product-relevant number in the whole dataset. Volume tripled, and the thing we had actually sold, a truck arriving when we said it would, quietly stopped being true." },
      { title: "Drivers were never the constraint the funnel implied", body: "**11,306 driver app installs produced 11,212 started verification forms, 1,262 completed ones, and 49 riders actually working.** Acquisition cost nothing and the form was the wall: 89% of the drivers who began verification never finished it. Over the same period trips per rider went from 8.6 to 14.1, so the fleet got more out of each rider while recruitment collapsed." },
      { title: "The new business became a customer of this one", body: "When Badho pivoted to buying and delivering its own stock, that operation booked **19 truck-days and 27 drops on this fleet between 27 August and 7 September**. Small, and worth saying: the delivery service had a price a sister business was willing to pay." },
    ],
    metrics: [
      { value: "137 → 634", label: "truck-days booked a month, Feb to Jul 2026", note: "the series runs 137, 286, 293, 387, 497, 634, 599, then 183 as the company wound down. 3,016 in total" },
      { value: "20,231 → 17,174", label: "drops attempted, and drops delivered", note: "84.9% of drops delivered, and 89.3% of truck-day trips completed" },
      { value: "₹18.95 Cr / ₹21.5 L", label: "goods moved, and fee income", note: "₹17.23 crore of it actually delivered. A take of about 1.1%" },
      { value: "68 / 60", label: "distributors who used the service, and who paid", note: "the seed deck said 48 paying. No definition in the data produces 48, and on the deck own date 45 had paid" },
      { value: "89% / 85%", label: "delivered eventually, and delivered first time", note: "the 89% first-time figure in the deck is the eventual rate. True first-attempt on the same date was 84.7%" },
      { value: "41% → 7%", label: "pickups on time against the slot the distributor booked", note: "May to September. Median lateness 23 minutes to 79. The price of growth, and it was on no report" },
      { value: "41% / 79%", label: "share of all truck-days from the top 3 and the top 10 customers", note: "1,244 of 3,016 truck-days came from three distributors. The honest caveat on every revenue figure here" },
      { value: "11 of 11, then 6", label: "May customers still there in June, and in July", note: "full retention for one month, then a little over half. Both halves belong in the sentence" },
    ],
    honesty:
      "The headline figures here are the company's own, from its live dashboard on 18 July 2026, and they were assembled for a seed round by the two founders. I am not on that team slide and I did not write the deck. What I owned was joint product ownership with Aditya Kumar: the operating model, the failure taxonomy, the cash custody design and the seller-facing commercial side. The engineering was the delivery team's. My own queries against the delivery table give figures that are consistent but not identical, because they count different things: about 4,100 booking records across 2026 at a 73% completion rate, against the deck's truck-days and drops. Two things I would want asked about. Delivery success fell from near perfect to about 81% as trips quadrupled, on my measurement. And the deck's own words are that we were close to break-even on each delivery in Gurgaon before any scale, which means this was not yet a profitable business. The third version of driver allocation was finished in early September and never demonstrated running, because the company closed. The deck was dated July 2026 and the company wound down in September.",
    lessons: [
      "Meet the customer at the paper. Reading a photographed invoice was the whole go-to-market, and every competitor asked for an integration instead.",
      "Sell against his cost, not your feature list. A distributor can check a claim about his own truck. He cannot check one about your software.",
      "Measure the promise, not only the volume. We tripled truck-days while on-time pickup fell from 41% to 7%, and nothing reported it.",
      "If you cannot find the cost rows, you do not know your unit economics. This service had none, and the break-even claim rested on nothing.",
      "Fix the address once and keep it. That one decision is why our drivers found shops that other services could not.",
    ],
  },

  // ── 10 ───────────────────────────────────────────────────────────────
  {
    slug: "vernacular-search",
    title: "A search box that understands how shopkeepers type",
    short:
      "Kirana owners type Hindi in English letters, phonetically, and by brand. They search “sarso tel” for mustard oil and “all out” for any mosquito repellent. Our search returned nothing. A synonym layer that learns the words customers actually use, and the measurement I failed to set up first.",
    tier: 1,
    themes: ["Product"],
    period: "Nov 2025 – Jun 2026 · Badho",
    stack: ["Language model synonym generator", "Search event queue", "Typesense", "Hindi labels at equal weight", "Exact match first"],
    headline: [
      { value: "699,684", label: "synonyms in the table", note: "queried from production", count: { to: 699684 } },
      { value: "32,536", label: "root words they attach to", note: "product concepts, not individual items", count: { to: 32536 } },
      { value: "24.9 vs 11.7", label: "synonyms per root word, buyers' words against the catalogue's", note: "shopkeepers have more than twice as many names for a thing. 100% of root words reached the live search engine" },
    ],
    cta: "Read why precision mattered more than fuzziness",
    context: [
      "Our buyers run kirana shops in smaller cities. They type the way they speak: Hindi in English letters, phonetically, with typos, and by brand rather than product. Someone who wants mosquito repellent types “all out”, which is a competitor's brand. A catalogue indexed on clean English titles answers none of that, and the shopkeeper concludes we do not stock it. A search with no results is a lost order.",
      "We had already tried buying the problem away. An outside search vendor powered product search from October 2025 and was removed seven weeks later. This was the answer after that.",
    ],
    mechanisms: [
      { title: "Reduce the title to the thing itself", body: "A language model strips a product title to its core: “Fortune Kachi Ghani Pure Mustard Oil 1L Pouch” is mustard oil, and the pack size is noise. Packaging that is itself the product, like a jute bag, has to survive that reduction. Then it generates the words a shopkeeper would actually use." },
      { title: "Four kinds of synonym, on purpose", body: "Hindi words written in English letters (jeera finds cumin). Trade slang (“kachua chap” finds mosquito coils). Phonetic misspellings (biskut, meggi). And brand names that became the category: surf finds detergent, colgate finds toothpaste. The fourth is the commercial one, because it means a competitor's brand name finds our stock." },
      { title: "Stay specific", body: "One rule keeps the layer from turning to mush: toor dal must resolve to arhar dal, not to dal. An early version over-generated and started matching hair oil to motor oil. The fix was a tighter prompt and an accuracy pass, not more fuzziness." },
      { title: "Learn from what buyers type", body: "The obvious build is a single pass over the catalogue, which goes stale immediately. Instead every real search emits an event, and the queue feeds the words the buyer typed back into the same generator. New terms are added, matching ones merged, and the synonyms attached to the product, brand and category records. The vocabulary of the customer base becomes something that grows." },
      { title: "Search Hindi labels at the same weight", body: "Hindi labels are searched at equal weight to English, so the multilingual catalogue work feeds search directly instead of sitting in a column nobody queries." },
      { title: "The buyers' own words were the richest source, and I can prove it", body: "Six sources fed the synonym table: bulk catalogue dumps, brand and seller names, a seed set, and the queries buyers actually typed. **Queries typed by shopkeepers are a third of the root words but 37.6% of all the synonyms, at 24.9 per root word against 11.7 for anything derived from the catalogue.** A shopkeeper has more than twice as many ways of naming a thing as our own product data does. That is the argument for doing this at all, and it is measurable rather than asserted. One completeness check I had never run until now: **all 32,536 root words did reach the live search engine**, so nothing was generated and then silently left out." },
      { title: "It ran once properly and then trickled", body: "The honest shape of this. The buyer-query source added **9,942 root words in December 2025, which is 98.1% of everything it ever produced.** The following eight months added 621 words between them, falling every month to 28 in August 2026, and the new entries were thinner too, about 7 synonyms each against 25.9 in the first month. So what I described as a system that learns from buyers ran as one good build and then a trickle. I cannot tell from the data whether the tail was genuinely exhausted or the pipeline stopped being fed, and I would not claim the flattering one." },
      { title: "Exact match first, then looser", body: "A shopkeeper restocking a known item wants that item, not a helpful selection of similar ones. Ranking is exact match first, then progressively looser, with popularity breaking ties." },
    ],
    metrics: [
      { value: "699,684", label: "synonyms generated", note: "from the catalogue, then extended by real searches" },
      { value: "32,536", label: "root words", note: "the concepts the synonyms attach to" },
      { value: "24.9 vs 11.7", label: "synonyms per root word, buyer-typed against catalogue-derived", note: "buyer queries are 37.6% of all synonyms from a third of the root words" },
      { value: "98.1%", label: "of the buyer-learned synonyms were built in one month", note: "December 2025. The next eight months added 621 root words, falling to 28 in August" },
      { value: "32,536 of 32,536", label: "root words that reached the live search engine", note: "a completeness check nobody had run. Nothing was generated and then left out" },
      { value: "28,328 → 68,203", label: "misspellings mapped to corrections", note: "a separate fuzzy-query table, 147,125 rows, loaded once in September 2025" },

      { value: "7 weeks", label: "the vendor's search lasted", note: "installed October 2025, removed. This replaced it" },
    ],
    honesty:
      "I have no clean before-and-after on empty searches or search conversion, because nobody counted empty searches before the work started. That is the lesson: I should have instrumented the failure before building the fix. On roles, I specified the requirement and the synonym behaviour and Shubham Kumar built it. The search platform decision and its epic were Dhawal Raturi's; I did not choose the engine, I defined what it had to understand. And in May 2026 the team deliberately hid search from new users, because with only thirty brands in the catalogue it was returning disappointment.",
    lessons: [
      "Count the failure before you fix it. The mechanism here is good and the proof is missing, and that is on me.",
      "Precision is the scarce thing in this kind of search. The generous matcher is the one that loses trust.",
      "Build for how the customer actually types, not how the catalogue is written.",
    ],
  },

  // ── 11 ───────────────────────────────────────────────────────────────
  {
    slug: "restaurant-tech-gtm",
    title: "Pricing, renewals and keeping the accounts at ONO Suite",
    short:
      "The company's price list, a 34-kiosk Taco Bell estate, a Saudi account defended through three renewals and a tax dispute, the partnerships that were the real route to market, and the account I lost while my weekly reports looked healthy.",
    tier: 1,
    themes: ["Go-to-market", "Pricing"],
    period: "Jan 2024 – Sep 2026 · ONO Suite",
    stack: ["Price architecture", "Renewals", "Contract redlines", "Weekly client reporting", "POS partnerships"],
    headline: [
      { value: "79 kiosks", label: "Herfy, Saudi Arabia, three renewals", note: "an inherited account run single-handed, including a withholding tax dispute" },
      { value: "7 brands", label: "priced with commercials I wrote", note: "file metadata names me as author on the pricing documents" },
      { value: "34 kiosks", label: "Taco Bell India, 19 malls", note: "single point of contact. They renewed, then terminated" },
    ],
    cta: "Read the pricing, the renewal and the account I lost",
    context: [
      "ONO Suite sold self-ordering kiosks, menu screens and ordering apps to restaurant chains. I joined in January 2024 doing outbound: cold email, LinkedIn, booking demos, a lead database. Within a few months I was managing two junior interns. From July 2024 I moved to part-time and stayed that way, which is how I was still running accounts there into 2026.",
      "I ended up writing the company's price list, running its largest Indian estate and owning two international accounts with a very thin team behind me. The DOKA app build is a separate case. This one is the commercial job: pricing, renewals, collections, reporting, partnerships.",
    ],
    mechanisms: [
      { title: "Rent it or own it", body: "Restaurant groups always ask the same question, so the price list answered it twice. **Subscription:** ₹35,000 to set up, then ₹1,500 to ₹2,500 per kiosk per month. **Buyout:** ₹2,50,000 to ₹2,75,000 once, and the client owns the code and the servers. **By store count:** ₹4 to ₹5 lakh a month. Custom work at ₹1,000 an hour in India, $25 a developer-hour abroad. The buyout trades recurring revenue for a bigger cheque and removes the objection that stops a mid-size chain committing at all." },
      { title: "A two-riyal increase, justified line by line", body: "Herfy's rate had been 110 riyals a kiosk since May 2025, unchanged across three renewals while our hosting costs rose. I opened at 115 and settled at 112, arguing it this way: quote the absolute change rather than the percentage, show the fifteen months we absorbed the cost, benchmark against the 5 to 10% a year that is normal so under 2% reads as restraint, say what the money is for, and concede from your own opening so the client sees they won something." },
      { title: "Accept six redlines, refuse one", body: "Their lawyers returned seven changes. I took six: scope limited to software and support, no extra kiosks billed without a purchase order, training billed only when pre-approved, compliance with Saudi data protection, liability capped at fees paid. I declined the one that split billing into two cycles, and said why: we had already funded infrastructure and a developer's salary against that invoice and a single invoice had been slow. Giving away the six that cost nothing is what made the refusal credible." },
      { title: "Settle the billing argument with the database", body: "When the client disputed how many kiosks to pay for, I pulled the count of kiosks that had actually taken an order, month by month, and billed on that: 79, then 78. A 15% withholding tax nobody had budgeted for was resolved by grossing invoices up 17.65%, which is the figure that leaves the net amount whole." },
      { title: "Report weekly, and miss the point", body: "For about five months: sales, order value per location, uptime per kiosk against mall hours, and a revenue-against-uptime ratio showing which kiosks earned their floor space. I ran promotional launches, chased price sync failures to the point-of-sale, processed refunds order by order, and shipped a payment-reminder feature. Cumulative kiosk sales tracked to roughly ₹3.8 crore." },
      { title: "Partnerships as the route to market", body: "Formal partner registration with GoFrugal, a point-of-sale integration agreement with Petpooja re-executed in 2025, and working relationships with Reelo, Razorpay, Checkout.com, QueueBuster, POSBANK and StallionIndia. Integrations are how a small software company reaches chains it could never sell to directly, and it was the highest-leverage work available to me there." },
    ],
    metrics: [
      { value: "3", label: "consecutive Herfy renewals", note: "110 to 112 riyals per kiosk. 15% withholding resolved at a 17.65% gross-up" },
      { value: "6 of 7", label: "legal redlines accepted", note: "held the one that affected cash flow, with the reason stated" },
      { value: "~₹3.8 Cr", label: "cumulative Taco Bell kiosk sales tracked", note: "34 kiosks at ₹2,400 each a month" },
      { value: "7", label: "restaurant brands whose commercials I wrote", note: "Mad Over Donuts, Cafe Island, Pizza Wings, Nik Bakers, SVS Foods, Muralis Market, Herfy" },
      { value: "60+", label: "brands reached in outbound", note: "a handful became paying clients. Burger Farm at ₹1.42 lakh a month stayed in pipeline" },
      { value: "70 / 30", label: "what I told my founders a pitch deck was", note: "“70% promises, 30% actual work done by us”, as the most junior person in the room, Feb 2025" },
    ],
    honesty:
      "Taco Bell renewed in August and terminated in December, three months into a six-month term. My reports showed flat revenue and improving uptime while my inbox showed the same store failing three times in eleven weeks and refunds open for one to three weeks. A healthy average hid the only signal that mattered. The report should have carried the client's open complaints and the age of every unresolved refund. I defended Herfy and did not grow it, and I spent months chasing unpaid invoices on a cash position that came within a day of stopping operations over an $11,000 cloud bill. SVS Foods went live and had to be closed because two people could not fix its payment bugs fast enough. Final commercial sign-off sat with the founder throughout.",
    lessons: [
      "A healthy average can hide the thing that loses the account. Put the open complaints next to the revenue.",
      "Concede what costs you nothing, so the one refusal is believable.",
      "Quote the absolute change, show what you absorbed, then concede from your own number.",
    ],
  },

  // ── More work (tier 2) ────────────────────────────────────────────────
  {
    slug: "milkoreach",
    title: "MilkoReach: opening a channel that had gone quiet",
    short: "Seventeen days from idea to first delivery. I built the ordering app myself; our callers built the cart on the phone against a half-tonne minimum.",
    tier: 2,
    themes: ["Go-to-market", "Built it myself"],
    period: "Aug – Sep 2026 · Badho and Kapila",
    stack: ["AI-assisted build", "Assisted ordering", "Distributor mapping", "Accounting from day one"],
    headline: [{ value: "17 days", label: "idea to first delivery" }, { value: "226", label: "distributors mapped" }],
    detail: [
      "Kapila makes cattle feed. They had retailers within reach of their distributors who were simply not ordering, most likely because transport cost made small orders uneconomic and nobody was asking them. I built the ordering app myself with an AI coding assistant: a working version in one evening, finished the next morning, writing real purchase orders into the main system two days later.",
      "The commercial design came out of one meeting I minuted. One combined per-tonne payment to the distributor instead of itemised freight, so he has one number to negotiate rather than three. A published rate card for transporters instead of collecting quotes. Delivery charged separately so the base price stays the lowest in the market. A deliberately low half-tonne first order, because distributors' own failure to activate these retailers came from insisting on big ones. And the books as the system of record from day one, so the profit and loss existed immediately instead of being reconstructed later.",
    ],
  },
  {
    slug: "storefronts",
    title: "Two web storefronts: one test, one failure",
    short: "A candy brand storefront used as a test of direct-to-shop selling, and a trial-pack storefront that produced no orders.",
    tier: 2,
    themes: ["Growth", "Built it myself"],
    period: "May – Jul 2026 · Badho",
    stack: ["Shopify", "Meta pixel and server events", "Lead capture", "One tracking scheme", "Catalogue sync"],
    headline: [{ value: "5", label: "triggers on the lead popup" }, { value: "0", label: "meaningful orders on the trial store" }],
    detail: [
      "The first storefront was a test: Meta ads into a web store with an ₹800 minimum, guest checkout and a payment gateway, with orders pushed into our order system by hand. I built the lead capture with five triggers at different thresholds, because the right moment differs by situation: a cart below the minimum gets ten seconds, an idle reader gets twenty. It asks for a WhatsApp number rather than an email, and every app-install link carries the same tracking scheme so the funnel reads end to end. I also wrote up why Meta counted 417 add-to-carts and the store counted 73: they count events and sessions respectively, which also means the average cart Meta reported was per add, not per cart. Abandoned checkouts went to the calling team.",
      "The second listed low-price trial packs of unknown brands with no install and no verification before checkout. **It went live and produced no meaningful orders.** The argument about where to put friction is sound and reusable; the experiment failed and I say so. The whole motion was paused in July.",
    ],
  },
  {
    slug: "crm-brain",
    title: "The notification system: each audience a question with a number on it",
    short: "A campaign console that reads a nightly copy of the buyer base instead of the live database, with reusable audiences, holdouts and a plain-language segment builder.",
    tier: 2,
    themes: ["Growth", "Product"],
    period: "Jul – Sep 2026 · Badho",
    stack: ["Nightly snapshot", "Audience presets", "Holdouts", "Plain-language segments", "Slot templates"],
    headline: [{ value: "31", label: "reasons to notify" }, { value: "8–10", label: "notification cap per buyer per day" }],
    detail: [
      "Transactional notifications wrote to the main database, and personalised sending at scale would have overloaded it. I specified a separate pipeline — fetch, fill in, send — reading a nightly copy of the buyer base, a hard cap of 8 to 10 notifications per buyer per day across brand and our own campaigns, and a first-week sequence that swaps a slot for a referral prompt once the buyer's first order lands. Ziyad Bhombal built it; I operated it.",
      "The audiences are the reasoning, written down and sized by how many buyers are actually reachable, each with a holdout switch: cart blocked below the minimum, average gap about ₹301; payment started and not finished, the highest intent in the system; never ordered but active, two thirds of the base. A plain-language builder turns a sentence into filter groups with a live preview. Templates are named by time slot and purpose. One honest limitation: WhatsApp sends from this console get no delivery receipts back, so click rates from that side are unverified by design.",
    ],
  },
  {
    slug: "release-gate",
    title: "The release process underneath all of it",
    short: "The release gate for three apps out of one codebase, and the specification pipeline that fed it.",
    tier: 2,
    themes: ["Product"],
    period: "Oct 2025 – Sep 2026 · Badho",
    stack: ["Jira", "Release branches", "Play Console", "Written specifications", "Regression checklists"],
    headline: [{ value: "805 / 1,613", label: "pull requests merged" }, { value: "242", label: "release versions" }],
    detail: [
      "I came in as a project manager and the job was the whole cycle: sit between the founder, the product managers and the engineers, decide what gets picked up, get it specified, designed, built, tested and released, and be responsible for it reaching production. Most of the actual work was removing blockers so nothing on that list became the reason a release slipped.",
      "Three apps ship from one codebase: buyer, seller and employee. Over eleven months I merged **805 of 1,613 pull requests** and cut **242 release versions**, from 7.153 to 8.255. I owned the Play Store side too: listings, rollout, store-listing tests. I was the company's most frequent specification author, with **489 of 1,585 tickets, 192 of them full requirement documents**, and I wrote the release notes that told support and operations what had changed. Monthly bug inflow went from 114 to near zero, with the honest caveat that the bug list also shrank because the company shrank. I would not claim that one alone.",
    ],
  },
  {
    slug: "ai-pod",
    title: "Running the programme for an AI team that shipped 20 systems",
    short: "I did not build these. I owned the epics, the quality bar and the model budget for the four people who did.",
    tier: 2,
    themes: ["Product"],
    period: "Feb – Sep 2026 · Badho",
    stack: ["11 epics", "Sprint board", "Pre-launch testing", "Model budget alerts"],
    headline: [{ value: "20", label: "AI systems in production" }, { value: "88 of 98", label: "AI tickets raised by me" }],
    detail: [
      "Product matching, catalogue enrichment and translation, call quality analysis, weight estimation, the search synonym generator, the delivery fleet agents, a buyer assistant, the WhatsApp sales agent, order-status messaging, a courier operations autopilot, and more. **These are the team's builds, not mine.** What the record shows is my role in running the programme: 88 of 98 AI tickets raised, eleven epics owned, the sprint board set up on 2 February 2026, the sales agent tested with the support team before launch, and per-model budget alerts required after credits ran out once and took the delivery manager and WhatsApp replies down with them.",
      "The sales agent is the one with a business number attached: **₹5.0 lakh across 475 orders on about $152 of model spend** under the broad definition, and **₹11,690** under the strict one, which is the figure I reported. I also switched off a personalisation system that was driving 82% of catalogue views, because a thirty-brand catalogue does not need machine ranking. Keeping it would have been easier to defend and worse for the company.",
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

// Reading time from the deep-dive's actual words.
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

// Headline numbers for the home page. Each says how it was measured.
export const heroMetrics: Metric[] = [
  { value: "−₹196 → +₹126", label: "contribution per completed order", note: "Feb to Aug 2026, before return costs. I drove the programme under it" },
  { value: "₹9.60", label: "cost per app install on WhatsApp", note: "₹1,87,589 ÷ 19,534 install-driven buyers, same-day attribution", count: { to: 9.6, prefix: "₹", decimals: 2 } },
  { value: "42.6% → 21.4%", label: "parcels returned to origin", note: "Mar to Aug 2026, queried from production" },
  { value: "~9.8k", label: "buyer-app daily actives at the June peak", note: "up from about 3–5k. 250+ orders on 11 June" },
  { value: "489", label: "specifications written, most in the company", note: "of 1,585 tickets. 192 full requirement documents", count: { to: 489 } },
];
