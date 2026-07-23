import Reveal from "./Reveal";
import { LOCKED_SEQUENCE } from "@/lib/content";

// Renders the locked build order (Mianx Core -> ... -> Industry products
// later). Order here must always match lib/content.js LOCKED_SEQUENCE,
// which is covered by a test asserting the exact sequence.
export default function PlatformOrder() {
  return (
    <section id="platform" aria-labelledby="platform-heading">
      <div className="section-header">
        <span className="section-tag">The Platform, In Order</span>
        <h2 id="platform-heading" className="section-title">
          Mianx Core Is Built Once. <span className="gradient-text">Everything Else Follows.</span>
        </h2>
        <p className="section-desc">
          One stage is completed, and Founder-approved, before the next one starts. This order is
          locked for the current phase.
        </p>
      </div>
      <ol className="steps-grid" style={{ listStyle: "none" }}>
        {LOCKED_SEQUENCE.map((step) => (
          <Reveal as="li" key={step.n} className="step-card">
            <div className="step-number" aria-hidden="true">{step.n}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {step.status && <span className="step-status">{step.status}</span>}
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
