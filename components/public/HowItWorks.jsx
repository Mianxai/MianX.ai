import Reveal from "./Reveal";
import { HOW_IT_WORKS } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading">
      <div className="section-header">
        <span className="section-tag">How It Works</span>
        <h2 id="how-it-works-heading" className="section-title">
          Three Steps to <span className="gradient-text">AI-Native Delivery</span>
        </h2>
        <p className="section-desc">
          We do not just build software — the AI Runtime and Project Factory turn a discovery
          conversation into a running, Founder-approved product.
        </p>
      </div>
      <div className="steps-grid">
        {HOW_IT_WORKS.map((step) => (
          <Reveal key={step.n} className="step-card">
            <div className="step-number" aria-hidden="true">{step.n}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
