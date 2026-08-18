"use client";

/**
 * Founder authority strip — Founder is human, not an AI agent.
 * CEO / Executive Orchestrator cannot override Founder-protected actions.
 */
export default function FounderAuthorityBanner() {
  return (
    <section
      className="cc-founder-authority"
      aria-labelledby="cc-founder-authority-h"
    >
      <div className="cc-founder-authority-inner">
        <p id="cc-founder-authority-h" className="cc-founder-authority-title">
          Founder / human authority
        </p>
        <p className="cc-founder-authority-body">
          You retain final authority for protected actions. The Executive
          Orchestrator proposes and coordinates — it cannot approve production
          deploy, financial, legal, secret, or permission changes without you.
        </p>
        <ol className="cc-founder-authority-flow" aria-label="Authority chain">
          <li>Founder</li>
          <li aria-hidden="true">↓</li>
          <li>Executive Orchestrator</li>
          <li aria-hidden="true">↓</li>
          <li>Departments / agents</li>
        </ol>
      </div>
    </section>
  );
}
