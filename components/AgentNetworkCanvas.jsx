"use client";

import { useEffect, useRef } from "react";

// Animated "agent network": nodes connected by edges with signal pulses
// travelling between them. Rendered on a 2D canvas (no WebGL dependency).
export default function AgentNetworkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, dpr;

    const N = 14;
    const nodes = [];
    const edges = [];
    const pulses = [];

    function rand(a, b) {
      return a + Math.random() * (b - a);
    }

    function build() {
      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: rand(0.12, 0.88),
          y: rand(0.12, 0.88),
          vx: rand(-0.02, 0.02),
          vy: rand(-0.02, 0.02),
          r: rand(3, 6),
          phase: rand(0, Math.PI * 2),
        });
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < 0.34) edges.push([i, j]);
        }
      }
      for (let k = 0; k < 10; k++) spawnPulse();
    }

    function spawnPulse() {
      if (!edges.length) return;
      const e = edges[(Math.random() * edges.length) | 0];
      pulses.push({ e, t: Math.random(), speed: rand(0.15, 0.4), dir: Math.random() < 0.5 ? 1 : -1 });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let last = performance.now();
    function draw(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0.08 || n.x > 0.92) n.vx *= -1;
        if (n.y < 0.08 || n.y > 0.92) n.vy *= -1;
        n.phase += dt * 2;
      }

      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const grad = ctx.createLinearGradient(a.x * w, a.y * h, b.x * w, b.y * h);
        grad.addColorStop(0, "rgba(124,92,255,0.22)");
        grad.addColorStop(1, "rgba(34,211,238,0.22)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);
        ctx.stroke();
      }

      for (const p of pulses) {
        p.t += p.speed * p.dir * dt;
        if (p.t > 1 || p.t < 0) {
          p.dir *= -1;
          p.t = Math.max(0, Math.min(1, p.t));
        }
        const [i, j] = p.e;
        const a = nodes[i];
        const b = nodes[j];
        const px = (a.x + (b.x - a.x) * p.t) * w;
        const py = (a.y + (b.y - a.y) * p.t) * h;
        ctx.fillStyle = "rgba(244,114,182,0.95)";
        ctx.shadowColor = "rgba(244,114,182,0.9)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const n of nodes) {
        const glow = 0.6 + Math.sin(n.phase) * 0.4;
        const R = n.r * (1 + glow * 0.3);
        const g = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, R * 4);
        g.addColorStop(0, `rgba(167,139,250,${0.35 * glow})`);
        g.addColorStop(1, "rgba(167,139,250,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, R * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(233,236,245,0.95)";
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, R, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    build();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    const spawner = setInterval(spawnPulse, 1400);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(spawner);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
