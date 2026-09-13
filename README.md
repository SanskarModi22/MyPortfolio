# Sanskar Modi — product, growth & go-to-market portfolio

Live at **https://sanskarmodi22.vercel.app**.

A single-page portfolio built with Next.js (App Router), TypeScript and Tailwind, exported as
static HTML. Every case study is written the same way: what problem, for whom, what number told
us it worked — and what did not work. Every figure says how it was measured and whose
measurement it is.

## Getting started

```bash
npm install
npm run dev
```

## Where the content lives

All content is data-driven. The pages read from `src/content/`, so the site changes by editing
those files, not the components.

| File | What it drives |
|---|---|
| `src/content/profile.ts` | Name, role, contact, tagline, intro, differentiators, skills, experience, education |
| `src/content/projects.ts` | Every case study card and deep-dive page, plus the home-page metric strip |
| `src/content/cluster.ts` | The one figure each index row leads with. Slugs must match `projects.ts` |
| `src/content/resume.ts` | The resume page, rendered as a one-page sheet with an ATS plain-text view |
| `src/content/diagrams.ts` | System diagrams for the deep-dives, keyed by project slug |

## Assets

- `public/headshot.jpg` — the hero photo (any of `headshot.jpg/.jpeg/.png/.webp` is picked up at build time)
- `public/resume.pdf` — linked from the resume page; regenerate with `scripts/build-resume-pdf.sh`
- `src/app/icon.png`, `apple-icon.png`, `favicon.ico` — the SM monogram

## Routes

`/` (home) · `/resume` · `/work/[slug]` for each tier-1 case study.

## Sources

The underlying record is a 360-feature product catalogue, ~36,000 commits across eighteen
repositories, 1,700 Jira issues, and production queries — kept outside this repo. Where a number
is a company's own reporting rather than my measurement, the page says so.
