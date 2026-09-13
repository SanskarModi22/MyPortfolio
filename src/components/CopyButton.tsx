"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-rule hover:text-ink"
      aria-live="polite"
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}
