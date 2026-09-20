import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Nothing at this address.</h1>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">
        Back home
      </Link>
    </main>
  );
}
