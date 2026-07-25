"use client";

import dynamic from "next/dynamic";

// Three.js touches the DOM/WebGL directly and must never run during SSR or
// `next build`'s static generation — ssr:false guarantees it only mounts in
// the browser, after hydration.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-fallback-bg" aria-hidden="true" />
      <HeroScene />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse" aria-hidden="true" />
          AI-native Business Operating System
        </div>
        <h1>
          One Platform.
          <br />
          <span className="gradient-text">An AI Workforce</span> That Builds
          Your Business.
        </h1>
        <p className="hero-subtitle">
          Mianx.ai is Mianx Core, an AI Runtime, an Autonomous Product
          Factory, and a Founder Workspace — the foundation a governed AI
          workforce uses to turn approved ideas into running products.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Talk to Us
          </a>
          <a href="#platform" className="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            See the Platform
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Locked Roadmap Steps</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Platform Layers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Platform Capabilities</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Server-side AI</div>
          </div>
        </div>
      </div>
    </section>
  );
}
