"use client";

import { useEffect, useRef } from "react";

// A faint neural network far behind the page: neurons with depth, soft curved
// synapses, slow flow-state drift, and signals that propagate layer to layer.
// Everything is low alpha; the foreground sits on translucent surfaces so the
// network reads as running behind frosted glass. Canvas 2D, DPR-capped,
// paused off-screen/hidden, static under reduced motion.

type Neuron = { bx: number; by: number; x: number; y: number; layer: number; depth: number; p: number; q: number; glow: number; r: number };
type Synapse = { a: number; b: number; bow: number }; // bow = perpendicular offset of the curve's control point
type Signal = { s: number; t: number; v: number };

export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let accent = "#0d9470", faint = "#9a9a9a";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      faint = cs.getPropertyValue("--muted").trim() || faint;
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let W = 0, H = 0, dpr = 1;
    let neurons: Neuron[] = [];
    let synapses: Synapse[] = [];
    let out: number[][] = [];
    const signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999 };
    let lastScroll = window.scrollY, scrollV = 0;

    const build = () => {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(W < 768 ? 1.25 : 1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const layers = W < 768 ? 4 : W < 1400 ? 6 : 7;
      const per = W < 768 ? 7 : 10;
      neurons = []; synapses = []; out = [];
      for (let l = 0; l < layers; l++) {
        const cx = ((l + 0.5) / layers) * W;
        for (let i = 0; i < per; i++) {
          const cy = ((i + 0.5) / per) * H;
          const x = cx + (Math.random() - 0.5) * (W / layers) * 0.8;
          const y = cy + (Math.random() - 0.5) * (H / per) * 0.9;
          const depth = 0.35 + Math.random() * 0.65; // 0.35 = far, 1 = near
          neurons.push({ bx: x, by: y, x, y, layer: l, depth, p: Math.random() * Math.PI * 2, q: Math.random() * Math.PI * 2, glow: 0, r: 1.1 + depth * 1.8 });
        }
      }
      out = neurons.map(() => []);
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        if (n.layer === layers - 1) continue;
        const next = neurons
          .map((m, j) => ({ j, d: m.layer === n.layer + 1 ? Math.hypot(m.bx - n.bx, m.by - n.by) : Infinity }))
          .filter((o) => o.d < Infinity)
          .sort((a, b) => a.d - b.d);
        const k = 2 + (Math.random() < 0.4 ? 1 : 0);
        for (const o of next.slice(0, k)) {
          const len = o.d;
          const bow = (Math.random() < 0.5 ? -1 : 1) * (0.12 + Math.random() * 0.16) * len; // gentle, stable curve
          out[i].push(synapses.length);
          synapses.push({ a: i, b: o.j, bow });
        }
      }
    };
    build();
    let resizeT = 0;
    const onResize = () => { clearTimeout(resizeT); resizeT = window.setTimeout(build, 150); };
    window.addEventListener("resize", onResize);
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeaveDoc = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeaveDoc);
    const onScroll = () => { const s = window.scrollY; scrollV += (s - lastScroll) * 0.03; lastScroll = s; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const fire = (i: number) => {
      neurons[i].glow = 1;
      for (const s of out[i]) if (Math.random() < 0.75) signals.push({ s, t: 0, v: 0.7 + Math.random() * 0.5 });
    };

    // point on the quadratic curve of synapse s at t
    const curveAt = (s: Synapse, t: number) => {
      const a = neurons[s.a], b = neurons[s.b];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      const cx = mx + (-dy / len) * s.bow, cy = my + (dx / len) * s.bow;
      const u = 1 - t;
      return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y, cx, cy };
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      // synapses — soft curves, alpha by depth
      for (const s of synapses) {
        const a = neurons[s.a], b = neurons[s.b];
        const d = Math.min(a.depth, b.depth);
        const g = Math.max(a.glow, b.glow);
        const c = curveAt(s, 0.5);
        ctx.globalAlpha = 0.06 + d * 0.07 + g * 0.2;
        ctx.strokeStyle = g > 0.05 ? accent : faint;
        ctx.lineWidth = 0.7 + d * 0.7;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(c.cx, c.cy, b.x, b.y); ctx.stroke();
      }
      // signals — small, soft
      for (const sg of signals) {
        const s = synapses[sg.s];
        const p = curveAt(s, sg.t);
        const p0 = curveAt(s, Math.max(0, sg.t - 0.1));
        ctx.globalAlpha = 0.55; ctx.strokeStyle = accent; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.globalAlpha = 0.9; ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      // neurons — faint dots; lit ones get a soft radial glow
      for (const n of neurons) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const near = dist < 200 ? (1 - dist / 200) * 0.5 : 0;
        const tw = 0.65 + 0.35 * Math.sin(now / 1600 + n.p);
        const lit = Math.max(n.glow, near);
        if (lit > 0.03) {
          const R = 8 + 22 * lit * n.depth;
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, R);
          grd.addColorStop(0, accent); grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalAlpha = 0.26 * lit; ctx.fillStyle = grd;
          ctx.beginPath(); ctx.arc(n.x, n.y, R, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = (0.16 + n.depth * 0.2) * tw + lit * 0.5;
        ctx.fillStyle = lit > 0.05 ? accent : faint;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + lit * 1.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = performance.now(), running = !document.hidden, nextFire = 900;
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!running) { last = now; return; }
      const dt = Math.min(50, now - last); last = now;
      scrollV *= 0.92;
      for (const n of neurons) {
        // flow-state drift: slow, wide, per-neuron phase; far neurons move less
        const amp = 10 + 14 * n.depth;
        n.x = n.bx + Math.sin(now / 6500 + n.p) * amp + Math.sin(now / 2900 + n.q) * amp * 0.3;
        n.y = n.by + Math.cos(now / 7800 + n.q) * amp * 0.8 + Math.cos(now / 3300 + n.p) * amp * 0.25;
        n.by -= scrollV * (0.05 + 0.2 * n.depth);
        if (n.by < -40) n.by += H + 80; if (n.by > H + 40) n.by -= H + 80;
        n.glow = Math.max(0, n.glow - dt / 1400);
      }
      nextFire -= dt;
      if (nextFire <= 0) {
        const inputs = neurons.map((n, i) => (n.layer === 0 ? i : -1)).filter((i) => i >= 0);
        if (inputs.length) fire(inputs[Math.floor(Math.random() * inputs.length)]);
        nextFire = 600 + Math.random() * 900;
      }
      for (let i = signals.length - 1; i >= 0; i--) {
        const sg = signals[i];
        sg.t += (dt / 1000) * sg.v * 0.9;
        if (sg.t >= 1) { fire(synapses[sg.s].b); signals.splice(i, 1); }
      }
      if (signals.length > 60) signals.splice(0, signals.length - 60);
      draw(now);
    };
    const onVis = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) draw(0); else raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf); mo.disconnect(); clearTimeout(resizeT);
      window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeaveDoc); window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="neural pointer-events-none fixed inset-0 z-0" />;
}
