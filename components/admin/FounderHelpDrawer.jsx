"use client";

import { useEffect, useId, useRef } from "react";
import { FOUNDER_GLOSSARY } from "@/lib/core/integration/founder-labels";

/**
 * Help / How this works drawer with Founder glossary.
 */
export default function FounderHelpDrawer({ open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="founder-help-overlay" role="presentation">
      <button
        type="button"
        className="founder-help-backdrop"
        aria-label="Close help"
        onClick={onClose}
      />
      <aside
        className="founder-help-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="founder-help-drawer"
      >
        <header className="founder-help-header">
          <h2 id={titleId}>How this works</h2>
          <button
            ref={closeRef}
            type="button"
            className="header-btn-ghost"
            onClick={onClose}
            aria-label="Close help"
          >
            Close
          </button>
        </header>
        <div className="founder-help-body">
          <p>
            Mianx.ai admin is a Founder-operated Business Operating System. The normal path is the
            Founder Proof: objective → clarification → plan → simulation approval → simulation →
            evidence → memory/learning → final review.
          </p>
          <p>
            Approvals are always explicit. Deterministic simulation never calls a provider and never
            deploys to production. Advanced Runtime tools are optional and not part of the Founder
            Proof checklist.
          </p>
          <h3>Glossary</h3>
          <dl className="founder-glossary" data-testid="founder-glossary">
            {FOUNDER_GLOSSARY.map((entry) => (
              <div key={entry.term}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
