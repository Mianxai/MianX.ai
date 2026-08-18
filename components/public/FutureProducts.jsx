import Reveal from "./Reveal";
import { FUTURE_PRODUCTS } from "@/lib/content";

// "Future Industry Products" — every item here is explicitly planned/future
// work, per the locked roadmap. None of these are claimed as live,
// deployed, or currently "powered by Mianx.ai"; that status only applies
// once real runtime evidence exists (see execution/EXECUTION-BOARD.md).
export default function FutureProducts() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading">
      <div className="section-header">
        <span className="section-tag">Coming Later</span>
        <h2 id="roadmap-heading" className="section-title">
          Future Industry Products, <span className="gradient-text">Powered by Mianx.ai</span>
        </h2>
        <p className="section-desc">
          Once Mianx Core, the AI Runtime, the Project Factory, the Founder Workspace, the Core
          Runtime Agents, and an end-to-end beta exist, industry-specific products ship on top —
          starting with these.
        </p>
      </div>
      <div className="industries-grid">
        {FUTURE_PRODUCTS.map((p) => (
          <Reveal key={p.title} className="industry-card">
            <span className="industry-status status-planned">Planned</span>
            <div className="industry-icon" aria-hidden="true">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="industry-tags">
              {p.tags.map((t) => (
                <span className="industry-tag" key={t}>{t}</span>
              ))}
            </div>
            {p.partner && <p className="industry-partner">{p.partner}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
