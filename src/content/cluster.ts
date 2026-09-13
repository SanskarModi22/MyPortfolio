// The one figure each project index row leads with. The value is the hook;
// the label is two or three words. Slugs must match projects.ts.

export type ClusterNode = { slug: string; x: number; y: number; z: number; size: "lg" | "md" | "sm"; value: string; label: string };

export const CLUSTER: ClusterNode[] = [
  { slug: "jit-pivot", x: 50, y: 44, z: 90, size: "lg", value: "3 → 0", label: "minimums per basket" },
  { slug: "contribution-turnaround", x: 21, y: 30, z: 30, size: "md", value: "−₹196 → +₹36", label: "contribution per order" },
  { slug: "whatsapp-channel", x: 79, y: 28, z: 10, size: "md", value: "₹9.60", label: "per app install" },
  { slug: "move-it-daas", x: 81, y: 72, z: 40, size: "md", value: "259 → 438", label: "trips, QoQ" },
  { slug: "vernacular-search", x: 52, y: 84, z: -20, size: "md", value: "699,684", label: "learned synonyms" },
  { slug: "restaurant-tech-gtm", x: 19, y: 72, z: -50, size: "sm", value: "79 kiosks", label: "3 renewals, KSA" },
  { slug: "milkoreach", x: 50, y: 10, z: -70, size: "sm", value: "17 days", label: "idea → delivery" },
];

export const ORB_PX = { lg: 116, md: 96, sm: 84 } as const;
