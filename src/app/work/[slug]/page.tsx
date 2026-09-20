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
          {p.flow?.length ? (
            <Section title="How it went" kicker="Why it mattered → what we found → what we decided → what happened.">
              <Reveal>
                <FlowStrip nodes={p.flow} />
              </Reveal>
            </Section>
          ) : null}

          {/* ── The idea (business-from-scratch cases) ───────────────────── */}
          {p.idea?.length ? (
            <Section title="The idea" kicker="Why this business, in the customer's arithmetic.">
              <ol className="grid gap-3 md:grid-cols-2">
                {p.idea.map((b, i) => (
                  <Reveal key={b.title} as="li" delay={(i % 2) * 0.05}>
                    <div className="card h-full p-5">
                      <div className="font-mono text-[11px] text-faint">0{i + 1}</div>
                      <h3 className="mt-1 text-[16px] font-semibold leading-snug text-ink">{b.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{b.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Section>
          ) : null}

          {/* ── The flow we built ────────────────────────────────────────── */}
          {p.built?.length ? (
            <Section title="The flow we built" kicker="Booking to cash, step by step.">
              <Reveal>
                <FlowStrip nodes={p.built} numbered />
              </Reveal>
            </Section>
          ) : null}

          {/* ── Screens ─────────────────────────────────────────────────── */}
          {p.screens?.length ? (
            <Section title="On screen" kicker="What it looked like.">
              <Reveal>
                <Screens items={p.screens} />
              </Reveal>
            </Section>
          ) : null}

          {/* ── What changed ────────────────────────────────────────────── */}
          {p.changes?.length ? (
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
          ) : null}

          {/* ── Numbers ─────────────────────────────────────────────────── */}
          {p.metrics?.length ? (
            <Section title={p.metricsTitle ?? "The numbers"} kicker="Each one says how it was measured. None are estimates.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.metrics.map((m, i) => (
                  <Reveal key={m.label} delay={(i % 3) * 0.05}>
                    <MetricCard m={m} />
                  </Reveal>
                ))}
              </div>
            </Section>
          ) : null}

          {/* ── What it solved ──────────────────────────────────────────── */}
          {p.solved?.length ? (
            <Section title="What it solved">
              <Reveal>
                <ul className="card divide-y divide-line">
                  {p.solved.map((s) => (
                    <li key={s.slice(0, 40)} className="flex gap-3 px-5 py-3.5">
                      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span className="text-[14.5px] leading-relaxed text-ink">{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
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

          {/* ── Takeaways ───────────────────────────────────────────────── */}
          {p.takeaways?.length ? (
            <Reveal>
              <div className="card border-l-4 border-l-accent p-5">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">What I carry forward</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {p.takeaways.map((x) => (
                    <li key={x} className="text-[15px] font-medium leading-snug text-ink">{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
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
