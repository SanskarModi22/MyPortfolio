import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bySlug, tier1 } from "@/content/projects";
import { diagrams } from "@/content/diagrams";
import { Diagram } from "@/components/Diagram";
import { Reveal } from "@/components/Reveal";
import { Section, Chip } from "@/components/Section";
import { MetricCard } from "@/components/MetricCard";
import { Rich } from "@/components/Rich";
import { ParallaxNumeral } from "@/components/ParallaxNumeral";

export function generateStaticParams() {
  return tier1.map((p) => ({ slug: p.slug }));
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
  if (!p || p.tier !== 1) notFound();

  const idx = tier1.findIndex((x) => x.slug === p.slug);
  const prev = tier1[(idx - 1 + tier1.length) % tier1.length];
  const next = tier1[(idx + 1) % tier1.length];
  const diagram = diagrams[p.slug];

  return (
    <main>
      <article className="mx-auto max-w-7xl px-5 pt-12 sm:pt-16">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className="relative max-w-4xl">
          <ParallaxNumeral n={idx + 1} />
          <Link href="/#work" className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint hover:text-ink">
            ← Work
          </Link>
          <p className="rise mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {p.themes.join(" · ")} · {p.period}
          </p>
          <h1 className="rise mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[48px]" style={{ animationDelay: "80ms" }}>
            {p.title}
          </h1>
          <p className="rise mt-5 text-[17px] leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
            {p.short}
          </p>
          <div className="rise mt-5 flex flex-wrap gap-1.5" style={{ animationDelay: "240ms" }}>
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          {p.links?.length ? (
            <div className="rise mt-4 flex flex-wrap gap-3 text-sm" style={{ animationDelay: "300ms" }}>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {l.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </header>

        {/* ── Headline numbers ────────────────────────────────────────── */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {p.headline.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <MetricCard m={m} compact />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-20">
          {/* ── Context ─────────────────────────────────────────────────── */}
          {p.context ? (
            <Section title="Context">
              <Reveal className="prose-tight max-w-4xl text-[16px] leading-relaxed text-muted">
                {p.context.map((c) => (
                  <p key={c.slice(0, 24)}>
                    <Rich text={c} />
                  </p>
                ))}
              </Reveal>
            </Section>
          ) : null}

          {/* ── Architecture ────────────────────────────────────────────── */}
          {diagram ? (
            <Section title="Architecture" kicker="Hover or tap any part of it. Amber boxes are the rules that hold when people, partners or systems get it wrong.">
              <Reveal>
                <Diagram spec={diagram} title={p.title} />
              </Reveal>
            </Section>
          ) : null}

          {/* ── Engineering ─────────────────────────────────────────────── */}
          {p.mechanisms ? (
            <Section title="How it worked">
              <ol className="grid gap-4 md:grid-cols-2">
                {p.mechanisms.map((m, i) => (
                  <Reveal key={m.title} as="li" delay={(i % 2) * 0.06}>
                    <div className="h-full rounded-xl border border-line bg-surface p-5">
                      <div className="font-mono text-[11px] text-faint">0{i + 1}</div>
                      <h3 className="mt-1 text-[16px] font-semibold leading-snug text-ink">{m.title}</h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                        <Rich text={m.body} />
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Section>
          ) : null}

          {/* ── Numbers ─────────────────────────────────────────────────── */}
          {p.metrics ? (
            <Section title="Numbers, honestly" kicker="Each figure says how it was measured and whose measurement it is. None of them are estimates.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.metrics.map((m, i) => (
                  <Reveal key={m.label} delay={(i % 3) * 0.06}>
                    <MetricCard m={m} />
                  </Reveal>
                ))}
              </div>
            </Section>
          ) : null}

          {/* ── Lessons ─────────────────────────────────────────────────── */}
          {p.lessons ? (
            <Section title="What I took from it">
              <ul className="grid gap-4 md:grid-cols-3">
                {p.lessons.map((l, i) => (
                  <Reveal key={l} as="li" delay={i * 0.07}>
                    <blockquote className="serif-lesson h-full rounded-xl border border-line bg-surface p-5 text-[22px] leading-snug text-ink">“{l}”</blockquote>
                  </Reveal>
                ))}
              </ul>
            </Section>
          ) : null}
        </div>

        {/* ── Prev / next ─────────────────────────────────────────────── */}
        <nav className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2" aria-label="More work">
          <Link href={`/work/${prev.slug}`} className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-rule">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">← Previous</div>
            <div className="mt-1 font-semibold text-ink group-hover:text-accent">{prev.title}</div>
          </Link>
          <Link href={`/work/${next.slug}`} className="group rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-rule">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Next →</div>
            <div className="mt-1 font-semibold text-ink group-hover:text-accent">{next.title}</div>
          </Link>
        </nav>
      </article>
    </main>
  );
}
