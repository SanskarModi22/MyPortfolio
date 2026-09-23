import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { profile } from "@/content/profile";
import { heroMetrics, tier1, tier2, method, THEMES, type WorkCard } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Section, Chip } from "@/components/Section";
import { ProofStrip } from "@/components/ProofStrip";
import { FlowStrip } from "@/components/FlowStrip";
import { Timeline } from "@/components/Timeline";
import { WorkGrid } from "@/components/WorkGrid";
import { CopyButton } from "@/components/CopyButton";

function findHeadshot() {
  for (const f of ["headshot.jpg", "headshot.jpeg", "headshot.png", "headshot.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", f))) return `/${f}`;
  }
  return null;
}

const toCard = (p: (typeof tier1)[number]): WorkCard => ({ slug: p.slug, title: p.title, short: p.short, themes: p.themes, headline: p.headline, period: p.period, tier: p.tier, cover: p.cover ?? p.screens?.[0] });

export default function Home() {
  const headshot = findHeadshot();

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero border-b border-line bg-surface">
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-12 sm:pt-16 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <p className="rise font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">{profile.role}</p>
            <h1 className="rise mt-3 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[58px]" style={{ animationDelay: "80ms" }}>
              {profile.name.first} {profile.name.last}
            </h1>
            <p className="rise mt-5 max-w-2xl text-[19px] font-medium leading-snug text-ink sm:text-[23px]" style={{ animationDelay: "160ms" }}>
              {profile.headline}
            </p>
            <p className="rise mt-4 max-w-2xl text-[15px] leading-relaxed text-muted" style={{ animationDelay: "220ms" }}>
              {profile.tagline}
            </p>
            <ul className="rise mt-5 flex flex-wrap gap-2" style={{ animationDelay: "280ms" }}>
              {profile.facts.map((f) => (
                <li key={f}><Chip>{f}</Chip></li>
              ))}
            </ul>
            <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "340ms" }}>
              <a href="#work" className="rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
                See the case studies
              </a>
              <Link href="/resume" className="rounded-lg border border-line bg-surface px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-rule">
                Resume
              </Link>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-surface px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-rule">
                LinkedIn ↗
              </a>
            </div>
            <p className="rise mt-5 flex items-center gap-2.5 text-[13.5px] text-muted" style={{ animationDelay: "400ms" }}>
              <span aria-hidden className="pulse-dot" />
              {profile.availability}
            </p>
          </div>

          {headshot ? (
            <div className="rise justify-self-center md:justify-self-end" style={{ animationDelay: "200ms" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={headshot} alt={`${profile.name.first} ${profile.name.last}`} width={240} height={240} className="h-44 w-44 rounded-2xl border border-line object-cover object-top shadow-[0_24px_60px_-30px_rgba(15,23,42,0.55)] sm:h-60 sm:w-60" />
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-5 pt-10 sm:space-y-24">
        {/* ── Proof ────────────────────────────────────────────────────── */}
        <ProofStrip items={heroMetrics} />

        {/* ── Capabilities ─────────────────────────────────────────────── */}
        <Section id="capabilities" title="What I can own end to end" kicker="Six capabilities. Each one carries the number that proves it and links to the case behind it.">
          <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {profile.capabilities.map((c, i) => (
              <Reveal key={c.title} as="li" delay={i * 0.04}>
                <Link href={c.href} className="card card-hover group flex h-full flex-col p-5">
                  <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                    <span>0{i + 1}</span>
                    <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">Read the case →</span>
                  </div>
                  <div className="tnum mt-3 text-[26px] font-bold leading-none tracking-tight text-accent">{c.metric}</div>
                  <h3 className="mt-2.5 text-[16px] font-semibold leading-snug text-ink">{c.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.proof}</p>
                </Link>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ── Case studies ─────────────────────────────────────────────── */}
        <Section id="work" title="Case studies" kicker="Seven cases. Each one: why it mattered, what I found, what I decided, and what happened.">
          <Reveal>
            <WorkGrid items={tier1.map(toCard)} themes={THEMES} />
          </Reveal>
        </Section>

        {/* ── More ─────────────────────────────────────────────────────── */}
        <Section id="more-work" title="More cases" kicker="Eleven more, written the same way and to the same standard of evidence.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {tier2.map((p, i) => (
              <Reveal key={p.slug} as="li" delay={i * 0.04}>
                <Link href={`/work/${p.slug}`} className="card card-hover group flex h-full items-start justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-ink group-hover:text-accent">{p.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.short}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="tnum text-[16px] font-bold text-ink">{p.headline[0].value}</div>
                    <div className="mt-0.5 max-w-[120px] text-[10.5px] leading-tight text-muted">{p.headline[0].label}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* ── How I work ───────────────────────────────────────────────── */}
        <Section id="method" title="How I work" kicker="The same four moves every time. The cases above are this loop run on different numbers.">
          <Reveal>
            <FlowStrip nodes={method} numbered />
          </Reveal>
        </Section>

        {/* ── The year ─────────────────────────────────────────────────── */}
        <Section id="year" title="One year at Badho" kicker="Two business models and a pivot in twelve months. Where the cases sit in the year.">
          <div className="card p-5 sm:p-7">
            <Timeline items={profile.timeline} />
          </div>
        </Section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <Section id="experience" title="Experience">
          <ol className="relative ml-2 border-l border-line pl-7">
            {profile.experience.map((e, i) => (
              <Reveal key={e.role + e.org} as="li" delay={i * 0.04} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[16px] font-semibold text-ink">
                    {e.role} <span className="font-normal text-muted">· {e.org}</span>
                  </h3>
                  <span className="font-mono text-[11.5px] text-faint">{e.period}</span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[14px] leading-relaxed text-muted">
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

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_2fr]">
            <Reveal>
              <div className="card h-full p-5">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Education</h3>
                {profile.education.map((ed) => (
                  <div key={ed.degree} className="mt-3">
                    <div className="text-[15px] font-semibold text-ink">{ed.degree}</div>
                    <div className="mt-0.5 text-[13.5px] text-muted">{ed.school}</div>
                    <div className="mt-1 font-mono text-[11.5px] text-faint">{ed.period} · {ed.note}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card h-full p-5">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Skills</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["Product", profile.skills.product],
                      ["Growth & analytics", profile.skills.growth],
                      ["Commercial", profile.skills.commercial],
                      ["Technical", profile.skills.technical],
                    ] as const
                  ).map(([h, list]) => (
                    <div key={h}>
                      <div className="text-[12px] font-semibold text-ink">{h}</div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">{list.map((s) => <Chip key={s}>{s}</Chip>)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <Section id="contact" title="Contact">
          <Reveal>
            <div className="card p-6 sm:p-8">
              <p className="max-w-2xl text-[20px] font-semibold leading-snug text-ink sm:text-[24px]">
                If a number in your business is going the wrong way and nobody has worked out why, that is the work I do.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href={`mailto:${profile.email}`} className="font-mono text-[15px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">{profile.email}</a>
                <CopyButton text={profile.email} label="Copy" />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href={`tel:${profile.phone.replace(/-/g, "")}`} className="font-mono text-[15px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">{profile.phone}</a>
                <CopyButton text={profile.phone} label="Copy" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5 text-[13.5px]">
                <a className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink hover:border-rule" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink hover:border-rule" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <Link className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink hover:border-rule" href="/resume">Web resume</Link>
                <a className="rounded-lg border border-line px-3 py-1.5 font-medium text-ink hover:border-rule" href={profile.resumeHref}>Resume (PDF)</a>
              </div>
            </div>
          </Reveal>
        </Section>
      </div>
    </main>
  );
}
