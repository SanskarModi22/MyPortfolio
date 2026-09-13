import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 md:bg-bg/85 md:backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
        {/* plain anchor on purpose: a same-page hash through <Link> does not scroll */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#about" className="serif-lesson text-[26px] leading-none text-ink transition-colors hover:text-accent">
          Who Am I?
        </a>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link hidden rounded-md px-3 py-1.5 text-muted transition-colors hover:text-ink sm:inline-block"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/resume"
            className="ml-1 rounded-md border border-accent/50 bg-accent-soft/40 px-3 py-1.5 text-ink transition-colors hover:border-accent"
          >
            Resume
          </Link>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="nav-link hidden rounded-md px-3 py-1.5 text-muted transition-colors hover:text-ink sm:inline-block"
          >
            LinkedIn ↗
          </a>
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
