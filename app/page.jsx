import Link from "next/link";
import AgentNetworkCanvas from "@/components/AgentNetworkCanvas";
import LeadForm from "@/components/LeadForm";

const PLATFORM_LAYERS = [
  {
    n: "01",
    title: "Mianx Core",
    desc: "Identity, security, communication, automation, and the shared infrastructure every product is built on.",
  },
  {
    n: "02",
    title: "AI Runtime",
    desc: "The governed execution layer that routes tasks to models and agents, enforces policy, and records evidence.",
  },
  {
    n: "03",
    title: "Project Factory",
    desc: "Turns an approved idea into a running project — scaffolding, data model, APIs, and UI — on top of Mianx Core.",
  },
  {
    n: "04",
    title: "Founder Workspace",
    desc: "One place to direct the AI workforce, review work, and approve what ships.",
  },
];

const AGENT_ROLES = [
  { title: "Sales Agent", desc: "Qualifies inbound leads, scores intent, and drafts the first reply." },
  { title: "Support Agent", desc: "Answers client questions around the clock, escalating only what needs a human." },
  { title: "Ops Agent", desc: "Turns approved work into task plans and tracks delivery end to end." },
  { title: "Research Agent", desc: "Gathers market and competitor context before a decision is made." },
  { title: "Marketing Agent", desc: "Drafts campaigns, positioning, and messaging from a short brief." },
  { title: "Content Agent", desc: "Writes and edits docs, product copy, and release notes in a consistent voice." },
  { title: "Data Agent", desc: "Cleans, analyzes, and summarizes business data on request." },
  { title: "QA Agent", desc: "Reviews new work and flags issues before they reach a client." },
];

export default function LandingPage() {
  return (
    <main id="main-content">
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <Link href="/" className="brand">
            <span className="brand-dot" aria-hidden="true" />
            Mianx<span style={{ color: "var(--accent-2)" }}>.ai</span>
          </Link>
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#agents">AI Workforce</a>
            <a href="#contact">Contact</a>
            <Link href="/admin/login" className="btn">
              Admin
            </Link>
          </div>
        </nav>

        <section className="hero" aria-labelledby="hero-heading">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true">●</span> AI-native Business Operating System
            </span>
            <h1 id="hero-heading" className="title">
              One platform. <span className="grad">An AI workforce</span> that
              builds and runs your business.
            </h1>
            <p className="lede">
              Mianx.ai is Mianx Core, an AI Runtime, a Project Factory, and a
              Founder Workspace — the foundation a governed AI workforce uses
              to turn approved ideas into running products.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Start a conversation <span aria-hidden="true">→</span>
              </a>
              <a href="#platform" className="btn">
                See the platform
              </a>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="num">4</div>
                <div className="lbl">Platform layers</div>
              </div>
              <div className="stat">
                <div className="num">8</div>
                <div className="lbl">Core agent roles</div>
              </div>
              <div className="stat">
                <div className="num">100%</div>
                <div className="lbl">Server-side AI</div>
              </div>
            </div>
          </div>
          <div className="canvas-wrap" aria-hidden="true">
            <AgentNetworkCanvas />
          </div>
        </section>

        <section className="section" id="platform" aria-labelledby="platform-heading">
          <div className="section-head">
            <h2 id="platform-heading">The platform, in order</h2>
            <p>
              Mianx Core is built once and reused everywhere. Everything
              above it inherits its identity, security, and automation.
            </p>
          </div>
          <div className="layer-grid">
            {PLATFORM_LAYERS.map((layer) => (
              <div className="panel layer-card" key={layer.n}>
                <div className="layer-n">{layer.n}</div>
                <h3 style={{ marginTop: 0 }}>{layer.title}</h3>
                <p className="muted">{layer.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="agents" aria-labelledby="agents-heading">
          <div className="section-head">
            <h2 id="agents-heading">The Core Runtime Agent roster</h2>
            <p>
              <span className="status-chip">In development</span> — the AI
              Workforce roles the runtime is designed to activate first.
              Tracked as a Phase B/C milestone in the Execution Board, not a
              live claim of active agents.
            </p>
          </div>
          <div className="agent-grid">
            {AGENT_ROLES.map((agent) => (
              <div className="panel feature-card" key={agent.title}>
                <h3 style={{ marginTop: 0, fontSize: 16 }}>{agent.title}</h3>
                <p className="muted" style={{ fontSize: 14 }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="how" aria-labelledby="how-heading">
          <div className="section-head">
            <h2 id="how-heading">From inbound to intelligence in seconds</h2>
            <p>This lead-capture flow is a live, working slice of the runtime.</p>
          </div>
          <div className="form-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>1 · Capture</h3>
              <p className="muted">A prospect submits a request. It lands securely in the database instantly.</p>
            </div>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>2 · Analyze</h3>
              <p className="muted">A server-side AI call scores intent, drafts a reply, and suggests next actions.</p>
            </div>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>3 · Act</h3>
              <p className="muted">The team reviews, updates status, and closes — all from one dashboard.</p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="contact-heading">
          <div className="section-head">
            <h2 id="contact-heading">Tell us what you want to build</h2>
            <p>Fill this out and it lands directly in the founder workspace.</p>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <LeadForm />
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <span>Mianx.ai — the AI-native Business Operating System</span>
          <Link href="/admin/login">Admin dashboard →</Link>
        </div>
      </footer>
    </main>
  );
}
