import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bySlug, projects } from "@/content/projects";
import { diagrams } from "@/content/diagrams";
import { Diagram } from "@/components/Diagram";
import { FlowStrip } from "@/components/FlowStrip";
import { Screens } from "@/components/Screens";
import { Reveal } from "@/components/Reveal";
import { Section, Chip } from "@/components/Section";
import { MetricCard } from "@/components/MetricCard";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = bySlug(slug);
  if (!p) return {};
  return { title: p.title, description: p.short };
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const p = bySlug(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const diagram = diagrams[p.slug];

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 pt-10 sm:pt-14">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className="max-w-4xl">
          <Link href="/#work" className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint hover:text-ink">← Case studies</Link>
          <p className="rise mt-4 flex flex-wrap items-center gap-2">
            {p.themes.map((t) => <Chip key={t} tone="accent">{t}</Chip>)}
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{p.period}</span>
          </p>
          <h1 className="rise mt-3 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]" style={{ animationDelay: "80ms" }}>
            {p.title}
          </h1>
          <p className="rise mt-4 text-[16px] font-medium leading-relaxed text-ink" style={{ animationDelay: "140ms" }}>{p.lede}</p>
          <p className="rise mt-2 text-[15px] leading-relaxed text-muted" style={{ animationDelay: "180ms" }}>{p.short}</p>
        </header>

        {/* ── Headline numbers ────────────────────────────────────────── */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {p.headline.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <MetricCard m={m} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 space-y-16">
          {/* ── The flow ─────────────────────────────────────────────────── */}
          <Section title="How it went" kicker="Problem → diagnosis → decision → outcome.">
            <Reveal>
              <FlowStrip nodes={p.flow} />
            </Reveal>
          </Section>

          {/* ── Screens ─────────────────────────────────────────────────── */}
          {p.screens?.length ? (
            <Section title="On screen" kicker="What it looked like.">
              <Reveal>
                <Screens items={p.screens} />
              </Reveal>
            </Section>
          ) : null}

          {/* ── What changed ────────────────────────────────────────────── */}
          <Section title="What I changed">
            <Reveal>
              <ul className="card divide-y divide-line">
                {p.changes.map((c, i) => (
                  <li key={c.slice(0, 30)} className="flex gap-4 px-5 py-3.5">
                    <span className="mt-0.5 shrink-0 font-mono text-[11px] text-faint">0{i + 1}</span>
                    <span className="text-[14.5px] leading-relaxed text-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>

          {/* ── Numbers ─────────────────────────────────────────────────── */}
          {p.metrics?.length ? (
            <Section title="The numbers" kicker="Each one says how it was measured. None are estimates.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.metrics.map((m, i) => (
                  <Reveal key={m.label} delay={(i % 3) * 0.05}>
                    <MetricCard m={m} />
                  </Reveal>
                ))}
              </div>
            </Section>
          ) : null}

          {/* ── System (optional) ───────────────────────────────────────── */}
          {diagram ? (
            <Section title="The system" kicker="How the pieces fit. Hover or tap any part.">
              <Reveal>
                <Diagram spec={diagram} title={p.title} />
              </Reveal>
            </Section>
          ) : null}

          {/* ── Scope + takeaways ───────────────────────────────────────── */}
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="card h-full border-l-4 border-l-warn p-5">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-warn">Scope — what was mine, what was not</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.scope}</p>
              </div>
            </Reveal>
            {p.takeaways?.length ? (
              <Reveal delay={0.05}>
                <div className="card h-full border-l-4 border-l-accent p-5">
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">What I carry forward</h3>
                  <ul className="mt-2 space-y-2">
                    {p.takeaways.map((t) => (
                      <li key={t} className="text-[15px] font-medium leading-snug text-ink">{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>

        {/* ── Prev / next ─────────────────────────────────────────────── */}
        <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2" aria-label="More case studies">
          <Link href={`/work/${prev.slug}`} className="card card-hover group p-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">← Previous</div>
            <div className="mt-1 text-[14.5px] font-semibold text-ink group-hover:text-accent">{prev.title}</div>
          </Link>
          <Link href={`/work/${next.slug}`} className="card card-hover group p-4 text-right">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Next →</div>
            <div className="mt-1 text-[14.5px] font-semibold text-ink group-hover:text-accent">{next.title}</div>
          </Link>
        </nav>
      </article>
    </main>
  );
}
