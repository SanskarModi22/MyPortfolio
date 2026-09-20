import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#work", label: "Case studies" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        {/* plain anchor on purpose: a same-page hash through <Link> does not scroll */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[12px] font-semibold text-accent-ink">SM</span>
          <span>{profile.name.first} {profile.name.last}</span>
        </a>
        <nav className="flex items-center gap-0.5 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link hidden rounded-md px-3 py-1.5 text-muted transition-colors hover:text-ink md:inline-block">
              {l.label}
            </a>
          ))}
          <Link href="/resume" className="ml-1 rounded-md bg-ink px-3 py-1.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90">
            Resume
          </Link>
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
