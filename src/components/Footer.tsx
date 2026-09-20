import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name.first} {profile.name.last} · every figure on this site is queried from production or traced to a source
        </p>
        <div className="flex gap-4">
          <a className="hover:text-ink" href={`mailto:${profile.email}`}>Email</a>
          <a className="hover:text-ink" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-ink" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <Link className="hover:text-ink" href="/resume">Resume</Link>
        </div>
      </div>
    </footer>
  );
}
