import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NeuralField } from "@/components/NeuralField";
import { ScrollProgress } from "@/components/ScrollProgress";
import { profile } from "@/content/profile";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
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

// Runs before paint so the page never flashes the wrong theme. Dark is the default; a stored choice wins.
const themeScript = `
(function(){try{var s=localStorage.getItem('theme');
var t=s==='light'||s==='dark'?s:'dark';document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark'}})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <NeuralField />
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
