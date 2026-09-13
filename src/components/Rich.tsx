import { Fragment } from "react";

// Tiny inline renderer: **bold**, *italic*, `code`, [text](url). Enough for the content
// files; avoids pulling in a markdown dependency for three constructs.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        if (p.startsWith("`") && p.endsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m)
          return (
            <a key={i} href={m[2]} className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent" target={m[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {m[1]}
            </a>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
