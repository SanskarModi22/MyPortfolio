// The one figure each case leads with in the index. The value is the hook;
// the label is two or three words. Slugs must match projects.ts.

export type ClusterNode = { slug: string; x: number; y: number; z: number; size: "lg" | "md" | "sm"; value: string; label: string };

export const CLUSTER: ClusterNode[] = [
  { slug: "jit-pivot", x: 50, y: 44, z: 90, size: "lg", value: "3 → 0", label: "minimums per basket" },
  { slug: "contribution-turnaround", x: 21, y: 30, z: 30, size: "md", value: "−₹196 → +₹36", label: "per completed order" },
  { slug: "whatsapp-channel", x: 79, y: 28, z: 10, size: "md", value: "₹9.60", label: "per app install" },
  { slug: "buyer-app-plg", x: 30, y: 60, z: 20, size: "md", value: "30% → 94%", label: "finished registering" },
  { slug: "pricing-experiments", x: 62, y: 52, z: 25, size: "md", value: "6.9% → 36.6%", label: "orders with a coupon" },
  { slug: "rewards-retention", x: 40, y: 36, z: 15, size: "md", value: "50% vs 19%", label: "next-month re-order" },
  { slug: "doka", x: 70, y: 60, z: 0, size: "md", value: "5 steps · 3 angles", label: "cake configurator" },
  { slug: "ono-product", x: 24, y: 48, z: -10, size: "md", value: "19 malls", label: "kiosks I reported on" },
  { slug: "move-it-daas", x: 81, y: 72, z: 40, size: "md", value: "137 → 634", label: "truck-days a month" },
  { slug: "vernacular-search", x: 52, y: 84, z: -20, size: "md", value: "699,684", label: "synonyms, all live" },
  { slug: "restaurant-tech-gtm", x: 19, y: 72, z: -50, size: "sm", value: "79 kiosks", label: "three renewals" },
];

export const ORB_PX = { lg: 116, md: 96, sm: 84 } as const;
