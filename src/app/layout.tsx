import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanskarmodi22.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name.first} ${profile.name.last} — ${profile.role}`,
    template: `%s — ${profile.name.first} ${profile.name.last}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    title: `${profile.name.first} ${profile.name.last} — ${profile.role}`,
    description: profile.tagline,
    url: SITE_URL,
  },
};

// Runs before paint so the page never flashes the wrong theme. A stored choice
// wins; otherwise follow the system preference; otherwise light.
const themeScript = `
(function(){try{var s=localStorage.getItem('theme');
var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
var t=s==='light'||s==='dark'?s:(m?'dark':'light');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light'}})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <ScrollProgress />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
