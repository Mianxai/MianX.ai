import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ArrowRight, Sparkles, Users, Zap, Target, ShieldCheck, ChevronRight, X, RefreshCw, Lock, LogOut, TrendingUp, Flame, Wind, Snowflake, Send, ListChecks, Copy, Check, Eye, EyeOff, Megaphone, PenTool, BarChart3, Bug, ExternalLink, Globe2, MessageCircle, Store } from "lucide-react";

/* ---------------------------------------------------------------
   MIANX.AI — AI Agent Agency
   Landing (lead capture) + Super Admin Dashboard (AI-qualified leads)
   Design v2: light, airy base — deep violet + teal signal accents,
   ambient wireframe motion field, scroll reveals, agent-network hero.
----------------------------------------------------------------*/

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const COLORS = {
  bg: "#F8F7FC",
  bg2: "#FFFFFF",
  surface: "rgba(124,58,237,0.045)",
  surfaceSolid: "#FFFFFF",
  border: "rgba(23,18,36,0.09)",
  violet: "#6D28D9",
  violetBright: "#7C3AED",
  indigo: "#4F46E5",
  teal: "#0D9488",
  text: "#15101F",
  muted: "#68607C",
  faint: "#9891A8",
};

/* ============================ SCROLL REVEAL HOOK ============================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity .6s ease ${delay}ms, transform .6s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ============================ AMBIENT WIREFRAME FIELD (site-wide, futuristic) ============================ */
function AmbientField() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = window.innerWidth, height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.28, 6, 16),
    ];
    const matViolet = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.16 });
    const matTeal = new THREE.MeshBasicMaterial({ color: 0x0d9488, wireframe: true, transparent: true, opacity: 0.14 });

    const shapes = [];
    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
      const geo = geos[i % geos.length];
      const mat = i % 2 === 0 ? matViolet : matTeal;
      const mesh = new THREE.Mesh(geo, mat);
      const scale = 0.5 + Math.random() * 1.1;
      mesh.scale.setScalar(scale);
      mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, -Math.random() * 8 - 2);
      mesh.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.15,
        floatSpeed: 0.15 + Math.random() * 0.2,
        floatPhase: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      shapes.forEach((m) => {
        m.rotation.x += m.userData.rotSpeed * 0.01;
        m.rotation.y += m.userData.rotSpeed * 0.014;
        m.position.y = m.userData.baseY + Math.sin(t * m.userData.floatSpeed + m.userData.floatPhase) * 0.4;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geos.forEach((g) => g.dispose());
      matViolet.dispose(); matTeal.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ============================ 3D SIGNATURE ELEMENT — AGENT NETWORK ============================ */
function AgentNetworkCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const NODE_COUNT = 46;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const nodeMatCore = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
    const nodeMatEdge = new THREE.MeshBasicMaterial({ color: 0x0d9488 });

    const radius = 3.1;
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const pos = new THREE.Vector3(x, y, z).multiplyScalar(radius);
      const isCore = i % 5 === 0;
      const mesh = new THREE.Mesh(nodeGeo, isCore ? nodeMatCore : nodeMatEdge);
      mesh.position.copy(pos);
      mesh.userData = { basePos: pos.clone(), phase: Math.random() * Math.PI * 2, isCore };
      group.add(mesh);
      nodes.push(mesh);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.22 });
    const linePositions = [];
    for (let i = 0; i < nodes.length; i++) {
      const distances = nodes
        .map((n, j) => ({ j, d: nodes[i].position.distanceTo(n.position) }))
        .filter((d) => d.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      distances.forEach(({ j }) => {
        if (j > i) {
          linePositions.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
          linePositions.push(nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      });
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    const glowGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.06 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    let mouseX = 0, mouseY = 0;
    const handleMouse = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.11 + mouseX * 0.3;
      group.rotation.x = mouseY * 0.15;

      nodes.forEach((n) => {
        const s = 1 + Math.sin(t * 1.6 + n.userData.phase) * 0.35;
        n.scale.setScalar(n.userData.isCore ? s * 1.4 : s * 0.8);
      });
      glow.scale.setScalar(1 + Math.sin(t * 0.8) * 0.08);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      renderer.dispose();
      nodeGeo.dispose(); nodeMatCore.dispose(); nodeMatEdge.dispose();
      lineGeo.dispose(); lineMat.dispose();
      glowGeo.dispose(); glowMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

/* ============================ STORAGE HELPERS ============================ */
async function saveLead(lead) {
  return window.storage.set(`lead:${lead.id}`, JSON.stringify(lead), true);
}
async function loadAllLeads() {
  const idx = await window.storage.list("lead:", true).catch(() => null);
  if (!idx || !idx.keys) return [];
  const results = await Promise.all(
    idx.keys.map((k) =>
      window.storage.get(k, true).then((r) => (r ? JSON.parse(r.value) : null)).catch(() => null)
    )
  );
  return results.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

/* ============================ AI AGENT CALL ============================ */
async function runAgentAnalysis(lead) {
  const system = `You are an inbound sales intelligence agent for Mianx.ai, an AI agent agency. Analyze the lead and respond with ONLY valid JSON (no markdown fences, no preamble). Shape exactly:
{"score": <0-100 integer>, "temperature": "hot"|"warm"|"cold", "summary": "<2-3 sentence read on the lead's needs, urgency and fit>", "reply": "<a warm, specific, professional draft reply email, 4-6 sentences, signed 'The Mianx.ai Team'>", "actions": ["<next internal action>", "<next internal action>", "<next internal action>"]}`;

  const userMsg = `Lead details:
Name: ${lead.name}
Company: ${lead.company || "N/A"}
Email: ${lead.email}
Budget: ${lead.budget}
Project need: ${lead.need}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  const data = await response.json();
  const text = (data.content || []).map((b) => b.text || "").join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

/* ============================ SHARED UI BITS ============================ */
function TempBadge({ temperature }) {
  const map = {
    hot: { color: "#DC4C3E", icon: Flame, label: "Hot" },
    warm: { color: "#C17A00", icon: Wind, label: "Warm" },
    cold: { color: "#1D6FBF", icon: Snowflake, label: "Cold" },
  };
  const cfg = map[temperature] || map.cold;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px",
      borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
      color: cfg.color, background: `${cfg.color}14`, border: `1px solid ${cfg.color}35`,
      fontFamily: "Inter, sans-serif", textTransform: "uppercase",
    }}>
      <Icon size={11} strokeWidth={2.5} /> {cfg.label}
    </span>
  );
}

function StatusPill({ status }) {
  const map = { new: "#68607C", contacted: "#1D6FBF", qualified: "#0D9488", won: "#1E9E4A", lost: "#DC4C3E" };
  const c = map[status] || map.new;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 11,
      fontWeight: 700, color: c, background: `${c}14`, border: `1px solid ${c}30`,
      textTransform: "capitalize", fontFamily: "Inter, sans-serif",
    }}>{status}</span>
  );
}

const GLOBAL_STYLES = `
${FONT_IMPORT}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
.display { font-family: 'Sora', sans-serif; }
.mono { font-family: 'JetBrains Mono', monospace; }
body, .mianx-root { font-family: 'Inter', sans-serif; }
.mianx-btn-primary {
  background: linear-gradient(135deg, #7C3AED, #4F46E5);
  color: #FFFFFF; border: none; font-weight: 600; cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.mianx-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(109,40,217,0.28); }
.mianx-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform:none; box-shadow:none; }
.mianx-input {
  background: #FFFFFF; border: 1px solid rgba(23,18,36,0.12); color: #15101F;
  border-radius: 10px; padding: 12px 14px; font-size: 14px; font-family: 'Inter', sans-serif;
  outline: none; transition: border-color .15s ease, box-shadow .15s ease;
}
.mianx-input:focus { border-color: #7C3AED; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
.mianx-input::placeholder { color: #B4AEC4; }
.feature-card { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
.feature-card:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.35); box-shadow: 0 14px 32px rgba(23,18,36,0.06); }
.lead-row { transition: background .15s ease; cursor: pointer; }
.lead-row:hover { background: rgba(124,58,237,0.04); }
.agent-btn { background: linear-gradient(135deg, #7C3AED, #4F46E5); color: #fff; border: none; border-radius: 8px; padding: 8px 14px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.agent-btn:disabled { opacity: .5; cursor: not-allowed; }
.ghost-btn { background: #fff; border: 1px solid rgba(23,18,36,0.1); color: #15101F; border-radius: 8px; padding: 6px 10px; font-size: 12px; cursor: pointer; }
a, button { font-family: inherit; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`;

/* ============================ LANDING PAGE ============================ */
function Landing({ goAdmin }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "$1k–5k / mo", need: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.need) {
      setError("Please fill in your name, email, and what you need help with.");
      return;
    }
    setError("");
    setSubmitting(true);
    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...form, status: "new", analysis: null, createdAt: Date.now(),
    };
    try {
      await saveLead(lead);
      setDone(true);
    } catch (err) {
      setError("Something went wrong saving your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    { icon: Target, title: "Sales Agent", desc: "Qualifies every inbound lead in seconds, scores intent, and drafts the first reply." },
    { icon: Users, title: "Support Agent", desc: "Resolves client questions around the clock, escalating only what needs a human." },
    { icon: Zap, title: "Ops Agent", desc: "Turns approved work into task plans and tracks delivery end to end." },
    { icon: ShieldCheck, title: "Research Agent", desc: "Gathers market and competitor context before your team ever picks up the phone." },
    { icon: Megaphone, title: "Marketing Agent", desc: "Drafts campaigns, social copy, and ad variations straight from a one-line brief." },
    { icon: PenTool, title: "Content Agent", desc: "Writes and edits blog posts, product docs, and landing page copy in your voice." },
    { icon: BarChart3, title: "Data Agent", desc: "Cleans, analyzes, and charts your business data the moment you ask a question." },
    { icon: Bug, title: "QA Agent", desc: "Tests new features and flags bugs before they ever reach a client's inbox." },
  ];

  const steps = [
    { n: "01", title: "You get a lead", desc: "A client fills out one short form — no forms, no back-and-forth." },
    { n: "02", title: "An agent qualifies it", desc: "Score, summary, and a drafted reply appear in your dashboard within seconds." },
    { n: "03", title: "You close it", desc: "You keep the relationship and the decision. The agent just did the busywork." },
  ];

  const portfolio = [
    {
      name: "Al Hamdu Lillah Poultry Traders",
      url: "https://alhamdulillahpoultrytraders.com",
      status: "live",
      category: "Agri-Tech Marketplace",
      desc: "Pakistan's live poultry market platform — daily broiler, layer and egg rates by city, a bird/chicks/feed marketplace, shed rentals, and a WhatsApp-first support flow, fully bilingual in Urdu and English.",
      tags: ["Live rates engine", "Marketplace", "Bilingual (UR/EN)", "WhatsApp integration"],
      icon: Store,
    },
    {
      name: "Client project — undisclosed",
      url: null,
      status: "progress",
      category: "In development",
      desc: "Currently in build with our engineering workflow. Case study goes live here at launch.",
      tags: ["In development"],
      icon: Globe2,
    },
    {
      name: "Client project — undisclosed",
      url: null,
      status: "progress",
      category: "In development",
      desc: "Currently in build with our engineering workflow. Case study goes live here at launch.",
      tags: ["In development"],
      icon: Globe2,
    },
  ];

  return (
    <div className="mianx-root" style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, position: "relative" }}>
      <style>{GLOBAL_STYLES}</style>
      <AmbientField />

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 6vw", background: "rgba(248,247,252,0.78)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div className="display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          <span style={{ color: COLORS.violet }}>Mianx</span>.ai
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span onClick={scrollToForm} style={{ fontSize: 14, color: COLORS.muted, cursor: "pointer" }}>Get started</span>
          <button onClick={goAdmin} style={{
            display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`,
            color: COLORS.text, padding: "8px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer",
          }}>
            <Lock size={13} /> Admin
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, padding: "8vh 6vw 6vh", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", minHeight: "82vh" }}>
        <div style={{ flex: "1 1 480px" }}>
          <div className="mono" style={{
            display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.teal,
            background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.25)", padding: "6px 12px", borderRadius: 999, marginBottom: 24,
          }}>
            <Sparkles size={13} /> AI agents, working right now
          </div>
          <h1 className="display" style={{ fontSize: "clamp(38px, 5.2vw, 68px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: -1.5, margin: "0 0 22px" }}>
            Your leads get<br /><span style={{ background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.indigo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>qualified by AI</span><br />before you say a word.
          </h1>
          <p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 480, lineHeight: 1.65, marginBottom: 32 }}>
            Mianx.ai is an AI agent agency. Submit a request below — a live agent reads it, scores it, drafts the reply, and hands it to our team, in seconds.
          </p>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={scrollToForm} className="mianx-btn-primary" style={{ padding: "14px 26px", borderRadius: 10, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              Start a project <ArrowRight size={16} />
            </button>
            <span style={{ fontSize: 13, color: COLORS.faint }}>No sales calls to get started</span>
          </div>
        </div>
        <div style={{ flex: "1 1 380px", height: 460, position: "relative" }}>
          <AgentNetworkCanvas />
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", zIndex: 1, padding: "6vh 6vw", borderTop: `1px solid ${COLORS.border}` }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 12, color: COLORS.teal, marginBottom: 8, letterSpacing: 1 }}>THE WORKFORCE</p>
          <h2 className="display" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, marginBottom: 40, maxWidth: 640 }}>
            Eight agents. One dashboard. Zero busywork.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="feature-card" style={{
                background: COLORS.surfaceSolid, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, height: "100%",
              }}>
                <f.icon size={22} color={COLORS.violet} style={{ marginBottom: 16 }} />
                <h3 className="display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ position: "relative", zIndex: 1, padding: "6vh 6vw", borderTop: `1px solid ${COLORS.border}`, background: COLORS.bg2 }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 12, color: COLORS.teal, marginBottom: 8, letterSpacing: 1 }}>THE FLOW</p>
          <h2 className="display" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, marginBottom: 40, maxWidth: 640 }}>
            From form to qualified lead, in one pass.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="mono" style={{ fontSize: 13, color: COLORS.violet, marginBottom: 10 }}>{s.n}</div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.55 }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PORTFOLIO — POWERED BY MIANX.AI */}
      <section style={{ position: "relative", zIndex: 1, padding: "6vh 6vw", borderTop: `1px solid ${COLORS.border}` }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 12, color: COLORS.teal, marginBottom: 8, letterSpacing: 1 }}>PROOF OF WORK</p>
          <h2 className="display" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, marginBottom: 12, maxWidth: 640 }}>
            Powered by Mianx.ai
          </h2>
          <p style={{ fontSize: 15, color: COLORS.muted, maxWidth: 560, marginBottom: 40, lineHeight: 1.6 }}>
            Real products, built and running for real clients — not mockups.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {portfolio.map((p, i) => (
            <Reveal key={p.name + i} delay={i * 80}>
              <div className="feature-card" style={{
                background: COLORS.surfaceSolid, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 26,
                height: "100%", display: "flex", flexDirection: "column",
                opacity: p.status === "progress" ? 0.72 : 1,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 11, background: "rgba(124,58,237,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <p.icon size={19} color={COLORS.violet} />
                  </div>
                  <span className="mono" style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                    padding: "4px 9px", borderRadius: 999,
                    color: p.status === "live" ? "#1E9E4A" : COLORS.faint,
                    background: p.status === "live" ? "rgba(30,158,74,0.1)" : "rgba(23,18,36,0.05)",
                    border: `1px solid ${p.status === "live" ? "rgba(30,158,74,0.3)" : COLORS.border}`,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    {p.status === "live" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1E9E4A", display: "inline-block" }} />}
                    {p.status === "live" ? "Live" : "In progress"}
                  </span>
                </div>

                <p className="mono" style={{ fontSize: 11, color: COLORS.teal, marginBottom: 6, letterSpacing: 0.3 }}>{p.category}</p>
                <h3 className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{p.name}</h3>
                <p style={{ fontSize: 13.5, color: COLORS.muted, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: p.url ? 18 : 0 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, color: COLORS.muted, background: "rgba(23,18,36,0.04)",
                      border: `1px solid ${COLORS.border}`, borderRadius: 999, padding: "3px 9px",
                    }}>{t}</span>
                  ))}
                </div>

                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600,
                    color: COLORS.violet, textDecoration: "none",
                  }}>
                    Visit live site <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEAD FORM */}
      <section ref={formRef} style={{ position: "relative", zIndex: 1, padding: "8vh 6vw", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          {!done ? (
            <>
              <p className="mono" style={{ fontSize: 12, color: COLORS.teal, marginBottom: 8, letterSpacing: 1, textAlign: "center" }}>START HERE</p>
              <h2 className="display" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, marginBottom: 28, textAlign: "center" }}>
                Tell us what you need built.
              </h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <input className="mianx-input" style={{ flex: "1 1 220px" }} placeholder="Your name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className="mianx-input" style={{ flex: "1 1 220px" }} placeholder="Email address" type="email"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <input className="mianx-input" placeholder="Company (optional)"
                  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <select className="mianx-input" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                  <option>Under $1k / mo</option>
                  <option>$1k–5k / mo</option>
                  <option>$5k–15k / mo</option>
                  <option>$15k+ / mo</option>
                </select>
                <textarea className="mianx-input" rows={4} placeholder="What do you need help with?"
                  value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })} />
                {error && <p style={{ color: "#DC4C3E", fontSize: 13 }}>{error}</p>}
                <button type="submit" disabled={submitting} className="mianx-btn-primary" style={{
                  padding: "14px 20px", borderRadius: 10, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6,
                }}>
                  {submitting ? "Sending…" : <>Submit request <Send size={15} /></>}
                </button>
                <p style={{ fontSize: 12, color: COLORS.faint, textAlign: "center" }}>
                  This is a live demo — your submission is stored and visible to anyone viewing the admin dashboard.
                </p>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", border: `1px solid ${COLORS.border}`, borderRadius: 16, background: COLORS.surfaceSolid }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: "rgba(13,148,136,0.1)", border: `1px solid ${COLORS.teal}`,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px",
              }}>
                <Check size={22} color={COLORS.teal} />
              </div>
              <h3 className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Request received</h3>
              <p style={{ fontSize: 14, color: COLORS.muted }}>Our AI agent will qualify this shortly. Our team will follow up by email.</p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, padding: "30px 6vw", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span className="display" style={{ fontSize: 14, color: COLORS.muted }}>Mianx.ai — an AI agent agency</span>
        <span onClick={goAdmin} style={{ fontSize: 13, color: COLORS.faint, cursor: "pointer" }}>Admin dashboard →</span>
      </footer>
    </div>
  );
}

/* ============================ ADMIN DASHBOARD ============================ */
const DEMO_PASSCODE = "mianx2026";

function AdminDashboard({ goHome }) {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [analyzing, setAnalyzing] = useState({});
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadAllLeads();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) refresh(); }, [authed, refresh]);

  const attemptLogin = (rawValue) => {
    const clean = (rawValue ?? passcode).trim();
    if (clean.length === 0) {
      setAuthError("Please enter the passcode.");
      return;
    }
    if (clean === DEMO_PASSCODE) {
      setAuthError("");
      setAuthed(true);
    } else {
      setAuthError("Incorrect passcode — try mianx2026.");
    }
  };

  const handleAnalyze = async (lead) => {
    setAnalyzing((p) => ({ ...p, [lead.id]: true }));
    try {
      const result = await runAgentAnalysis(lead);
      const updated = { ...lead, analysis: { ...result, analyzedAt: Date.now() }, status: lead.status === "new" ? "qualified" : lead.status };
      await saveLead(updated);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
      setSelected(updated);
    } catch (err) {
      alert("Agent analysis failed. Please try again.");
    } finally {
      setAnalyzing((p) => ({ ...p, [lead.id]: false }));
    }
  };

  const updateStatus = async (lead, status) => {
    const updated = { ...lead, status };
    await saveLead(updated);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
    if (selected?.id === lead.id) setSelected(updated);
  };

  const copyReply = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.analysis?.temperature === "hot").length,
    warm: leads.filter((l) => l.analysis?.temperature === "warm").length,
    cold: leads.filter((l) => l.analysis?.temperature === "cold").length,
    unanalyzed: leads.filter((l) => !l.analysis).length,
  };

  if (!authed) {
    return (
      <div style={{
        background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        color: COLORS.text, position: "relative",
      }}>
        <style>{GLOBAL_STYLES}</style>
        <AmbientField />
        <form
          onSubmit={(e) => { e.preventDefault(); attemptLogin(); }}
          style={{ position: "relative", zIndex: 1, width: 340, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 32, boxShadow: "0 20px 50px rgba(23,18,36,0.08)" }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: "rgba(124,58,237,0.1)", border: `1px solid ${COLORS.violet}`,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
          }}>
            <Lock size={18} color={COLORS.violet} />
          </div>
          <h2 className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Super Admin</h2>
          <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>
            Demo gate — passcode is <b style={{ color: COLORS.teal }}>mianx2026</b>
          </p>

          <div style={{ position: "relative", marginBottom: 12 }}>
            <input
              className="mianx-input"
              type={showPass ? "text" : "password"}
              autoComplete="off"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); if (authError) setAuthError(""); }}
              style={{ width: "100%", paddingRight: 40 }}
            />
            <span
              onClick={() => setShowPass((v) => !v)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: COLORS.faint, display: "flex" }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>

          {authError && <p style={{ color: "#DC4C3E", fontSize: 13, marginBottom: 12 }}>{authError}</p>}

          <button
            type="submit"
            onClick={() => attemptLogin()}
            className="mianx-btn-primary"
            style={{ width: "100%", borderRadius: 10, padding: "12px", fontSize: 14 }}
          >
            Enter dashboard
          </button>
          <button type="button" onClick={goHome} style={{
            width: "100%", background: "transparent", color: COLORS.muted, border: "none", marginTop: 10, fontSize: 13, cursor: "pointer",
          }}>← Back to site</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <style>{GLOBAL_STYLES}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 4vw",
        borderBottom: `1px solid ${COLORS.border}`, position: "sticky", top: 0, background: "rgba(248,247,252,0.9)", backdropFilter: "blur(12px)", zIndex: 20,
      }}>
        <div className="display" style={{ fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: COLORS.violet }}>Mianx</span>.ai <span style={{ color: COLORS.muted, fontWeight: 400, fontSize: 13 }}>/ Super Admin</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="ghost-btn" onClick={refresh}><RefreshCw size={13} /></button>
          <button className="ghost-btn" onClick={() => { setAuthed(false); goHome(); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <LogOut size={13} /> Exit
          </button>
        </div>
      </nav>

      <div style={{ padding: "28px 4vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total leads", value: stats.total, color: COLORS.text, icon: Users },
            { label: "Hot", value: stats.hot, color: "#DC4C3E", icon: Flame },
            { label: "Warm", value: stats.warm, color: "#C17A00", icon: Wind },
            { label: "Cold", value: stats.cold, color: "#1D6FBF", icon: Snowflake },
            { label: "Awaiting agent", value: stats.unanalyzed, color: COLORS.teal, icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 18 }}>
              <s.icon size={16} color={s.color} style={{ marginBottom: 10 }} />
              <div className="display" style={{ fontSize: 26, fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 480px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="display" style={{ fontSize: 15, fontWeight: 700 }}>Inbound leads</h3>
              <span className="mono" style={{ fontSize: 11, color: COLORS.muted }}>{loading ? "loading…" : `${leads.length} total`}</span>
            </div>
            {!loading && leads.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontSize: 14 }}>
                No leads yet. Submit the form on the site to see one appear here.
              </div>
            )}
            {leads.map((lead) => (
              <div key={lead.id} className="lead-row" onClick={() => setSelected(lead)}
                style={{
                  padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 12, background: selected?.id === lead.id ? "rgba(124,58,237,0.05)" : "transparent",
                }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{lead.name} {lead.company ? <span style={{ color: COLORS.muted, fontWeight: 400 }}>· {lead.company}</span> : null}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 360 }}>{lead.need}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {lead.analysis ? <TempBadge temperature={lead.analysis.temperature} /> : <span className="mono" style={{ fontSize: 11, color: COLORS.faint }}>unscored</span>}
                  <StatusPill status={lead.status} />
                  <ChevronRight size={15} color={COLORS.muted} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: "1 1 360px", position: "sticky", top: 90 }}>
            {!selected ? (
              <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, textAlign: "center", color: COLORS.muted, fontSize: 13 }}>
                Select a lead to see details and run the AI agent.
              </div>
            ) : (
              <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 className="display" style={{ fontSize: 17, fontWeight: 700 }}>{selected.name}</h3>
                  <X size={16} color={COLORS.muted} style={{ cursor: "pointer" }} onClick={() => setSelected(null)} />
                </div>
                <p style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>{selected.email} {selected.company && `· ${selected.company}`}</p>

                <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                  {["new", "contacted", "qualified", "won", "lost"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected, s)} className="ghost-btn"
                      style={{ borderColor: selected.status === s ? COLORS.violet : COLORS.border, color: selected.status === s ? COLORS.violet : COLORS.muted, textTransform: "capitalize" }}>
                      {s}
                    </button>
                  ))}
                </div>

                <div style={{ background: "rgba(124,58,237,0.04)", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                  <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Request</p>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>{selected.need}</p>
                  <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 8 }}>Budget: {selected.budget}</p>
                </div>

                {!selected.analysis ? (
                  <button className="agent-btn" style={{ width: "100%", justifyContent: "center" }}
                    disabled={analyzing[selected.id]} onClick={() => handleAnalyze(selected)}>
                    {analyzing[selected.id] ? "Agent analyzing…" : <>Run AI agent <Sparkles size={14} /></>}
                  </button>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <TempBadge temperature={selected.analysis.temperature} />
                      <span className="display" style={{ fontSize: 20, fontWeight: 800 }}>{selected.analysis.score}<span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 400 }}>/100</span></span>
                    </div>

                    <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Agent summary</p>
                    <p style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 16 }}>{selected.analysis.summary}</p>

                    <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span>Suggested reply</span>
                      <span onClick={() => copyReply(selected.analysis.reply)} style={{ cursor: "pointer", color: copied ? COLORS.teal : COLORS.violet, display: "flex", alignItems: "center", gap: 4, textTransform: "none" }}>
                        {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "copied" : "copy"}
                      </span>
                    </p>
                    <div style={{ fontSize: 13, lineHeight: 1.55, background: "rgba(124,58,237,0.04)", borderRadius: 10, padding: 12, marginBottom: 16, whiteSpace: "pre-wrap" }}>
                      {selected.analysis.reply}
                    </div>

                    <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 5 }}>
                      <ListChecks size={12} /> Next actions
                    </p>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: COLORS.text }}>
                      {selected.analysis.actions.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>

                    <button className="ghost-btn" style={{ width: "100%", marginTop: 16, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}
                      disabled={analyzing[selected.id]} onClick={() => handleAnalyze(selected)}>
                      <RefreshCw size={12} /> Re-run agent
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ APP ROOT ============================ */
export default function App() {
  const [page, setPage] = useState("home");
  return page === "home" ? (
    <Landing goAdmin={() => setPage("admin")} />
  ) : (
    <AdminDashboard goHome={() => setPage("home")} />
  );
}
