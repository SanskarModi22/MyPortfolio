import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { profile } from "@/content/profile";
import { heroMetrics, tier1, tier2, readMinutes } from "@/content/projects";
import { FleetHero } from "@/components/FleetHero";
import { Reveal } from "@/components/Reveal";
import { Section, Chip } from "@/components/Section";
import { StatRail } from "@/components/StatRail";
import { Spotlight } from "@/components/Spotlight";
import { WorkSwitch } from "@/components/WorkSwitch";
import { CopyButton } from "@/components/CopyButton";
import { Rich } from "@/components/Rich";
import { Tilt } from "@/components/Tilt";
import { Magnetic } from "@/components/Magnetic";

// Build-time check: drop headshot.jpg/png into public/ and it appears.
function findHeadshot() {
  for (const f of ["headshot.jpg", "headshot.jpeg", "headshot.png", "headshot.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", f))) return `/${f}`;
  }
  return null;
}

export default function Home() {
  const headshot = findHeadshot();
  const cards = tier1.map((p) => ({
    slug: p.slug, title: p.title, short: p.short, themes: p.themes, stack: p.stack, headline: p.headline, period: p.period,
    teaser: p.lessons?.[0], cta: p.cta, readMin: readMinutes(p),
  }));

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <FleetHero>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-10 pt-14 sm:pt-20 md:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="rise flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted" style={{ animationDelay: "0ms" }}>
              <span className="live-dot" />
              {profile.role} · {profile.company}
            </p>
            <h1 className="mt-5 text-[46px] leading-[0.95] tracking-[-0.02em] sm:text-[68px]">
              <span className="rise block font-light text-muted" style={{ animationDelay: "90ms" }}>
                {profile.name.first}
              </span>
              <span className="rise block font-extrabold text-ink" style={{ animationDelay: "180ms" }}>
                {profile.name.last}
              </span>
            </h1>
            <p className="rise mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "300ms" }}>
              {profile.tagline}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
              <Magnetic>
                <a href="#work" className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-[0_10px_30px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5">
                  See the work
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/resume" className="inline-block rounded-md border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-rule">
                  Resume
                </Link>
              </Magnetic>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-rule">
                LinkedIn
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded-md border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-rule">
                GitHub
              </a>
            </div>
          </div>

          <Tilt max={10} className="rise relative justify-self-center md:justify-self-end">
            <div aria-hidden className="absolute -inset-3 -z-10 rotate-[-3deg] rounded-[32px] bg-accent-soft transition-transform duration-500 group-hover:rotate-[-5deg]" />
            <div aria-hidden className="absolute -inset-3 -z-10 rotate-[3deg] rounded-[32px] border border-line" />
            {headshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-fleet-anchor src={headshot} alt={`${profile.name.first} ${profile.name.last}`} width={288} height={288} className="h-60 w-60 rounded-[28px] border border-line object-cover object-top sm:h-72 sm:w-72" />
            ) : (
              <div data-fleet-anchor className="flex h-60 w-60 items-center justify-center rounded-[28px] border border-line bg-surface sm:h-72 sm:w-72">
                <span className="serif-lesson text-6xl text-muted">SM</span>
              </div>
            )}
          </Tilt>
        </div>
      </FleetHero>

      <div className="mx-auto max-w-7xl space-y-24 px-5 pt-16">
        {/* ── Headline numbers ─────────────────────────────────────────── */}
        <StatRail items={heroMetrics} />

        {/* ── Intro + signals ──────────────────────────────────────────── */}
        <Section id="about" title="What I actually do">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <Reveal className="prose-tight text-[15.5px] leading-relaxed text-muted md:sticky md:top-24 md:self-start">
              {profile.intro.map((p) => (
                <p key={p.slice(0, 20)}>
                  <Rich text={p} />
                </p>
              ))}
            </Reveal>
            <ol className="grid gap-3">
              {profile.signals.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 0.05}>
                  <Link href={s.href} className="block">
                    <Spotlight>
                      <div className="flex gap-4 p-4">
                        <span className="mt-0.5 font-mono text-[11px] text-faint">0{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                          <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                          <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-400 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                            <div className="overflow-hidden">
                              <span className="inline-block pt-2 font-mono text-[11px] text-accent">→ see the case</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Spotlight>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        {/* ── Selected work ────────────────────────────────────────────── */}
        <Section id="work" title="Selected work" kicker="Six decisions I want to be judged on. Scroll through them — each one takes its turn on the right; click any to read the problem, the mechanism, the numbers and what I got wrong.">
          <Reveal>
            <WorkSwitch items={cards} />
          </Reveal>
        </Section>

        {/* ── More work ────────────────────────────────────────────────── */}
        <Section id="more-work" title="More work" kicker="Things I took end to end — including the two that did not work.">
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {tier2.map((p, i) => (
              <Reveal key={p.slug} as="li" delay={i * 0.04}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1 text-[13.5px] text-muted">{p.short}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {p.headline.slice(0, 1).map((m) => (
                        <span key={m.label} className="font-mono text-[13px] text-ink">{m.value}</span>
                      ))}
                      <span className="font-mono text-[16px] leading-none text-faint transition-transform group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <div className="px-5 pb-5 text-[14px] leading-relaxed text-muted">
                    {p.detail?.map((d) => (
                      <p key={d.slice(0, 16)}>
                        <Rich text={d} />
                      </p>
                    ))}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <Section id="experience" title="Experience">
          <ol className="relative ml-2 border-l border-line pl-7">
            {profile.experience.map((e, i) => (
              <Reveal key={e.role + e.org} as="li" delay={i * 0.05} className="relative pb-10 last:pb-0">
                <span className="timeline-dot absolute -left-[35px] top-1.5 h-3 w-3 rounded-full bg-accent" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[16px] font-semibold text-ink">
                    {e.role} <span className="text-muted">· {e.org}</span>
                  </h3>
                  <span className="font-mono text-[11.5px] text-faint">{e.period}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-muted">
                  {e.bullets.map((b) => (
                    <li key={b.slice(0, 24)} className="flex gap-2.5">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-faint" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Education</h3>
              <ul className="space-y-3">
                {profile.education.map((ed) => (
                  <li key={ed.degree} className="rounded-lg border border-line bg-surface p-4">
                    <div className="text-[15px] font-semibold text-ink">{ed.degree}</div>
                    <div className="text-[13.5px] text-muted">{ed.school}</div>
                    <div className="mt-1 font-mono text-[11.5px] text-faint">{ed.period} · {ed.note}</div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Skills</h3>
              <div className="rounded-lg border border-line bg-surface p-4">
                <div className="text-[12px] font-semibold text-muted">Product</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{profile.skills.core.map((s) => <Chip key={s}>{s}</Chip>)}</div>
                <div className="mt-4 text-[12px] font-semibold text-muted">Growth & go-to-market</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{profile.skills.growth.map((s) => <Chip key={s} tone="accent">{s}</Chip>)}</div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <Section id="contact" title="Contact">
          <Reveal>
            <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
              <p className="serif-lesson text-2xl text-ink sm:text-3xl">Have a number going the wrong way and nobody has worked out why? Let&apos;s talk.</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href={`mailto:${profile.email}`} className="font-mono text-[15px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {profile.email}
                </a>
                <CopyButton text={profile.email} label="Copy email" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href={`tel:${profile.phone.replace(/-/g, "")}`} className="font-mono text-[15px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {profile.phone}
                </a>
                <CopyButton text={profile.phone} label="Copy number" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <a className="rounded-md border border-line px-3 py-1.5 text-ink hover:border-rule" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="rounded-md border border-line px-3 py-1.5 text-ink hover:border-rule" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <Link className="rounded-md border border-line px-3 py-1.5 text-ink hover:border-rule" href="/resume">Web resume</Link>
                <a className="rounded-md border border-line px-3 py-1.5 text-ink hover:border-rule" href={profile.resumeHref}>Resume (PDF)</a>
              </div>
            </div>
          </Reveal>
        </Section>
      </div>
    </main>
  );
}
