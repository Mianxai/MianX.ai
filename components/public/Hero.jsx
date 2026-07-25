"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import SceneBoundary from "./SceneBoundary";

// Three.js touches the DOM/WebGL directly and must never run during SSR or
// `next build`'s static generation — ssr:false guarantees it only mounts in
// the browser, after hydration.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

// Scene states: "static" until a WebGL frame actually renders ("enhanced"), or
// "fallback" once the enhancement is known to be unavailable. The static
// composition below is server-rendered and never removed, so the hero is
// complete with no JavaScript, no WebGL, and during hydration.
export default function Hero() {
  const [sceneState, setSceneState] = useState("static");

  const handleUnavailable = useCallback(() => setSceneState("fallback"), []);
  const handleReady = useCallback(() => setSceneState("enhanced"), []);

  return (
    <section className="hero" id="hero" data-scene={sceneState}>
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-lattice" aria-hidden="true">
        <span className="hero-orbit hero-orbit-outer" />
        <span className="hero-orbit hero-orbit-mid" />
        <span className="hero-orbit hero-orbit-inner" />
        <span className="hero-node hero-node-1" />
        <span className="hero-node hero-node-2" />
        <span className="hero-node hero-node-3" />
        <span className="hero-node hero-node-4" />
      </div>
      <SceneBoundary onError={handleUnavailable}>
        <HeroScene onUnavailable={handleUnavailable} onReady={handleReady} />
      </SceneBoundary>
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
