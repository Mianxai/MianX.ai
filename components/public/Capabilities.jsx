import Reveal from "./Reveal";
import { CAPABILITIES } from "@/lib/content";

export default function Capabilities() {
  return (
    <section className="platform-section" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="section-header">
        <span className="section-tag">What The Platform Does</span>
        <h2 id="capabilities-heading" className="section-title">
          Not a Generic <span className="gradient-text">SaaS Stack</span>
        </h2>
        <p className="section-desc">
          A governed, reusable foundation — built once, directed by a human Founder, and designed
          to grow into new products without starting over.
        </p>
      </div>
      <div className="services-grid">
        {CAPABILITIES.map((c) => (
          <Reveal key={c.title} className="service-card">
            <div className="service-icon" aria-hidden="true">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <div className="service-features">
              {c.tags.map((t) => (
                <span className="service-feature" key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
