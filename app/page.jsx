import Link from "next/link";
import AgentNetworkCanvas from "@/components/AgentNetworkCanvas";
import LeadForm from "@/components/LeadForm";

export default function LandingPage() {
  return (
    <main>
      <div className="container">
        <nav className="nav">
          <div className="brand">
            <span className="brand-dot" />
            Mianx<span style={{ color: "var(--accent-2)" }}>.ai</span>
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#contact">Contact</a>
            <Link href="/admin/login" className="btn">Admin</Link>
          </div>
        </nav>

        <section className="hero">
          <div>
            <span className="eyebrow">● AI agent agency</span>
            <h1 className="title">
              Autonomous agents that <span className="grad">work while you sleep</span>.
            </h1>
            <p className="lede">
              Mianx.ai designs, builds, and deploys AI agents that qualify inbound
              leads, draft replies, and take action — so your team focuses on
              closing, not chasing.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">Deploy my agents →</a>
              <a href="#how" className="btn">See how it works</a>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="num">24/7</div>
                <div className="lbl">Always on</div>
              </div>
              <div className="stat">
                <div className="num">&lt;60s</div>
                <div className="lbl">Lead triage</div>
              </div>
              <div className="stat">
                <div className="num">100%</div>
                <div className="lbl">Server-side AI</div>
              </div>
            </div>
          </div>
          <div className="canvas-wrap">
            <AgentNetworkCanvas />
          </div>
        </section>

        <section className="section" id="how">
          <div className="section-head">
            <h2>From inbound to intelligence in seconds</h2>
            <p>Every request runs through your private network of agents.</p>
          </div>
          <div className="form-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>1 · Capture</h3>
              <p className="muted">Prospects submit a request. It lands securely in your database instantly.</p>
            </div>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>2 · Analyze</h3>
              <p className="muted">An AI agent scores intent, drafts a reply, and suggests next actions.</p>
            </div>
            <div className="panel">
              <h3 style={{ marginTop: 0 }}>3 · Act</h3>
              <p className="muted">Your team reviews, updates status, and closes — all from one dashboard.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Tell us what you want automated</h2>
            <p>Fill this out and our agents start qualifying immediately.</p>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <LeadForm />
          </div>
        </section>
      </div>
    </main>
  );
}
