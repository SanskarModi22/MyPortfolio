"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

// A living illustration of the marketplace: ~20 shopkeepers around the Badho
// hub, brands on the outer ring, orders and WhatsApp sends as particles, and an
// event ticker using the real system's vocabulary. The events are simulated —
// the caption says so — but the shapes are the real business's shapes.

type Tone = "accent" | "muted" | "warn";
type Line = { id: number; t: string; event: string; node: string; extra: string; tone: Tone };

const AGENTS = 20;

const STATIC_LINES: Line[] = [
  { id: 1, t: "08:00:12", event: "buyer.active", node: "shop-01", extra: "", tone: "accent" },
  { id: 2, t: "08:00:13", event: "buyer.active", node: "shop-02", extra: "", tone: "accent" },
  { id: 3, t: "08:14:40", event: "cart.created", node: "shop-07", extra: "₹379", tone: "accent" },
  { id: 4, t: "08:15:02", event: "wa.utility_send", node: "shop-11", extra: "₹0.115", tone: "muted" },
  { id: 5, t: "08:15:31", event: "mov.blocked", node: "shop-04", extra: "₹49 short", tone: "warn" },
];

function localClock() {
  return new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
}

export function FleetHero({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Starts with static sample lines so the ticker is never empty; the sim
  // replaces them as real (simulated) events arrive.
  const [lines, setLines] = useState<Line[]>(STATIC_LINES);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── colours (re-read on theme change) ─────────────────────────────────
    let C = { accent: "#0d9470", muted: "#6b6b6b", faint: "#9a9a9a", warn: "#b8741a", line: "#e6e6e2", ink: "#1a1a1a" };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = (k: string, d: string) => cs.getPropertyValue(k).trim() || d;
      C = { accent: g("--accent", C.accent), muted: g("--muted", C.muted), faint: g("--faint", C.faint), warn: g("--warn", C.warn), line: g("--line", C.line), ink: g("--ink", C.ink) };
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ── geometry ──────────────────────────────────────────────────────────
    let W = 0, H = 0, dpr = 1;
    let hub = { x: 0, y: 0 };
    let RX = 0, RY = 0;
    let CL = 20; // left edge of the max-w-7xl content column
    const agents = Array.from({ length: AGENTS }, (_, i) => ({
      a: (Math.PI * 2 * i) / AGENTS + (Math.random() - 0.5) * 0.12,
      drift: (Math.random() < 0.5 ? -1 : 1) * (0.00008 + Math.random() * 0.00012),
      r: 0.86 + Math.random() * 0.18,
      hot: 0,
      alive: reduce ? 1 : 0,
      x: 0, y: 0, rx: 0, ry: 0,
    }));

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      dpr = Math.min(W < 768 ? 1.5 : 2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The fleet orbits the photo, wherever the layout puts it (desktop: right
      // column; mobile: stacked under the copy). Falls back to the right third.
      CL = Math.max(20, (W - 1280) / 2);
      const anchor = wrap.querySelector<HTMLElement>("[data-fleet-anchor]");
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        hub = { x: a.left - r.left + a.width / 2, y: a.top - r.top + a.height / 2 };
        RX = Math.max(150, a.width * 0.78);
        RY = Math.max(120, a.height * 0.62);
      } else {
        hub = { x: W * 0.75, y: H * 0.4 };
        RX = W * 0.2; RY = H * 0.28;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const place = () => {
      for (const ag of agents) {
        ag.x = hub.x + Math.cos(ag.a) * RX * ag.r;
        ag.y = hub.y + Math.sin(ag.a) * RY * ag.r;
        ag.rx = hub.x + Math.cos(ag.a + 0.05) * RX * 1.32;
        ag.ry = hub.y + Math.sin(ag.a + 0.05) * RY * 1.36;
      }
    };

    // ── events ────────────────────────────────────────────────────────────
    type P = { x1: number; y1: number; x2: number; y2: number; t: number; v: number; color: string; onEnd?: () => void; stopAt?: number };
    type Pulse = { x: number; y: number; r: number; a: number; color: string; w: number };
    const particles: P[] = [];
    const pulses: Pulse[] = [];
    const pending: Line[] = [];
    let lineId = 10;
    const node = (i: number) => `shop-${String(i + 1).padStart(2, "0")}`;
    const push = (event: string, i: number, extra: string, tone: Tone) => {
      pending.push({ id: lineId++, t: localClock(), event, node: node(i), extra, tone });
    };
    const pulse = (x: number, y: number, color: string, w = 1.2) => pulses.push({ x, y, r: 2, a: 0.8, color, w });

    const fire = (i: number) => {
      const ag = agents[i];
      const roll = Math.random();
      ag.hot = 1;
      if (roll < 0.36) {
        particles.push({ x1: ag.x, y1: ag.y, x2: hub.x, y2: hub.y, t: 0, v: 0.9, color: C.accent, onEnd: () => { pulse(hub.x, hub.y, C.accent); push("order.placed", i, `₹${(300 + Math.floor(Math.random() * 1500)).toLocaleString("en-IN")}`, "accent"); } });
        push("cart.created", i, "", "accent");
      } else if (roll < 0.62) {
        particles.push({ x1: ag.x, y1: ag.y, x2: ag.rx, y2: ag.ry, t: 0, v: 1.1, color: C.muted, onEnd: () => pulse(ag.rx, ag.ry, C.muted, 1) });
        push("wa.utility_send", i, "₹0.115", "muted");
      } else if (roll < 0.74) {
        particles.push({ x1: ag.x, y1: ag.y, x2: ag.rx, y2: ag.ry, t: 0, v: 1.0, color: C.accent, onEnd: () => { pulse(ag.rx, ag.ry, C.accent); push("po.pushed_to_brand", i, "", "muted"); } });
        push("delivery.otp_confirmed", i, "", "accent");
      } else if (roll < 0.8) {
        push("search.synonym_learned", i, "“sarso tel”", "muted");
        pulse(ag.x, ag.y, C.muted, 1);
      } else if (roll < 0.86) {
        particles.push({ x1: ag.x, y1: ag.y, x2: ag.rx, y2: ag.ry, t: 0, v: 1.0, color: C.warn, stopAt: 0.55, onEnd: () => pulse(ag.x + (ag.rx - ag.x) * 0.55, ag.y + (ag.ry - ag.y) * 0.55, C.warn, 1.6) });
        push("rto.prevented", i, "prepaid-only", "warn");
      } else if (roll < 0.92) {
        particles.push({ x1: ag.x, y1: ag.y, x2: hub.x, y2: hub.y, t: 0, v: 1.2, color: C.accent, onEnd: () => pulse(hub.x, hub.y, C.accent, 1.6) });
        push("claim.filed", i, "weight discrepancy", "accent");
      } else if (roll < 0.96) {
        push("brand.pickup_scheduled", i, "", "muted");
        pulse(ag.x, ag.y, C.accent, 1);
      } else {
        push("agent.reply", i, "no order placement", "accent");
        particles.push({ x1: ag.x, y1: ag.y, x2: hub.x, y2: hub.y, t: 0, v: 1.0, color: C.accent });
      }
    };

    // ── loop ──────────────────────────────────────────────────────────────
    let raf = 0;
    let last = performance.now();
    let nextFire = 900;
    let nextFlush = 0;
    let bootIdx = 0;
    let bootTimer = 200;
    let running = true;
    let visible = true;

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      place();
      // spokes + links
      ctx.lineWidth = 1;
      for (const ag of agents) {
        ctx.strokeStyle = C.line;
        ctx.globalAlpha = 0.9 * ag.alive;
        ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(ag.x, ag.y); ctx.stroke();
        ctx.globalAlpha = 0.55 * ag.alive;
        ctx.beginPath(); ctx.moveTo(ag.x, ag.y); ctx.lineTo(ag.rx, ag.ry); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // hub
      ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(hub.x, hub.y, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = C.accent;
      ctx.beginPath(); ctx.arc(hub.x, hub.y, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.muted; ctx.font = "10px var(--font-mono), ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText("badho", hub.x, hub.y + 24);
      // nodes + agents
      for (const ag of agents) {
        ctx.globalAlpha = 0.75 * ag.alive;
        ctx.fillStyle = C.faint;
        ctx.beginPath(); ctx.arc(ag.rx, ag.ry, 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = ag.alive;
        ctx.fillStyle = C.accent;
        const r = 3 + ag.hot * 2;
        ctx.beginPath(); ctx.arc(ag.x, ag.y, r, 0, Math.PI * 2); ctx.fill();
        if (ag.hot > 0.02) {
          ctx.globalAlpha = ag.hot * 0.45;
          ctx.strokeStyle = C.accent; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(ag.x, ag.y, r + 5 * (1 - ag.hot), 0, Math.PI * 2); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      // legend chips (drawn, so they scale with the canvas)
      ctx.textAlign = "left"; ctx.font = "10px var(--font-mono), ui-monospace, monospace";
      const lx = CL, ly = H - 12;
      ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(lx, ly - 3, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.muted; ctx.fillText("shopkeeper", lx + 9, ly);
      ctx.fillStyle = C.faint; ctx.beginPath(); ctx.arc(lx + 102, ly - 3, 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.muted; ctx.fillText("brand", lx + 111, ly);
      // particles
      for (const p of particles) {
        const end = p.stopAt ?? 1;
        const t = Math.min(p.t, end);
        const x = p.x1 + (p.x2 - p.x1) * t, y = p.y1 + (p.y2 - p.y1) * t;
        const t0 = Math.max(0, t - 0.08);
        const x0 = p.x1 + (p.x2 - p.x1) * t0, y0 = p.y1 + (p.y2 - p.y1) * t0;
        ctx.strokeStyle = p.color; ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke();
        ctx.globalAlpha = 1; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      // pulses
      for (const q of pulses) {
        ctx.globalAlpha = q.a; ctx.strokeStyle = q.color; ctx.lineWidth = q.w;
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      void rr;
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!running || !visible) { last = now; return; }
      const dt = Math.min(50, now - last); last = now;
      // boot: sessions come alive one by one
      if (bootIdx < AGENTS) {
        bootTimer -= dt;
        if (bootTimer <= 0) { agents[bootIdx].alive = 0.001; push("session.start", bootIdx, "", "accent"); bootIdx++; bootTimer = 110; }
      }
      for (const ag of agents) {
        if (ag.alive > 0 && ag.alive < 1) ag.alive = Math.min(1, ag.alive + dt / 450);
        ag.a += ag.drift * dt;
        ag.hot = Math.max(0, ag.hot - dt / 700);
      }
      nextFire -= dt;
      if (nextFire <= 0 && bootIdx >= 4) {
        const live = agents.map((a, i) => (a.alive >= 1 ? i : -1)).filter((i) => i >= 0);
        if (live.length) fire(live[Math.floor(Math.random() * live.length)]);
        nextFire = 260 + Math.random() * 520;
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.t += (dt / 1000) * p.v;
        if (p.t >= (p.stopAt ?? 1)) { p.onEnd?.(); particles.splice(i, 1); }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const q = pulses[i];
        q.r += dt * 0.03; q.a -= dt / 700;
        if (q.a <= 0) pulses.splice(i, 1);
      }
      nextFlush -= dt;
      if (nextFlush <= 0 && pending.length) {
        const batch = pending.splice(0, 3);
        setLines((prev) => [...prev, ...batch].slice(-5));
        nextFlush = 320;
      }
      draw();
    };

    const onVis = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.05 });
    io.observe(wrap);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); mo.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/70 to-bg/20" />
      <div aria-hidden className="grid-paper pointer-events-none absolute inset-0" />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative">{children}</div>
      <div className="relative mx-auto max-w-7xl px-5 pb-6">
        <div className="rounded-lg border border-line bg-surface/95 md:bg-surface/80 md:backdrop-blur">
          <div className="flex items-center justify-between border-b border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
            <span className="flex items-center gap-2"><span className="live-dot" /> marketplace event stream</span>
            <span className="normal-case tracking-normal">{reduced ? "static" : "simulated illustration"}</span>
          </div>
          <ul className="h-[7rem] overflow-hidden px-3 py-2 font-mono text-[11.5px] leading-[1.2rem]">
            {lines.map((l) => (
              <li key={l.id} className="ticker-line flex gap-3 whitespace-nowrap">
                <span className="text-faint">{l.t}</span>
                <span className={l.tone === "accent" ? "text-accent" : l.tone === "warn" ? "text-warn" : "text-muted"}>{l.event}</span>
                <span className="text-muted">{l.node}</span>
                <span className="text-faint">{l.extra}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
