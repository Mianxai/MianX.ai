"use client";

import Link from "next/link";

/**
 * Compact guided operations panel for Founder project context.
 */
export default function FounderGuidedPanel({ summary, projectId }) {
  if (!projectId || !summary?.ok) return null;

  const next = summary.next_founder_action;
  const canonical = summary.canonical_integration_run;

  return (
    <section
      className="founder-guided-panel admin-panel"
      data-testid="founder-guided-panel"
      aria-label="Founder guided operations"
    >
      <h2>Next Founder action</h2>
      {next ? (
        <>
          <p className="founder-guided-reason">{next.reason}</p>
          {next.severity === "action_required" ? (
            <Link
              className="header-btn"
              href={
                next.href.includes("project_id=")
                  ? next.href
                  : `${next.href}${next.href.includes("?") ? "&" : "?"}project_id=${encodeURIComponent(projectId)}`
              }
              data-testid="founder-guided-primary-action"
            >
              {next.label}
            </Link>
          ) : (
            <p className="admin-muted" role="status">{next.label}</p>
          )}
        </>
      ) : (
        <p className="admin-muted">No action required for this project right now.</p>
      )}
      {canonical ? (
        <dl className="founder-guided-meta">
          <div>
            <dt>Canonical run</dt>
            <dd>{canonical.id}</dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>{canonical.stage_label || canonical.stage}</dd>
          </div>
          <div>
            <dt>Proof status</dt>
            <dd>{canonical.proof_status}</dd>
          </div>
        </dl>
      ) : null}
      {summary.integration?.duplicate_warning ? (
        <p className="admin-warning" role="status" data-testid="guided-duplicate-warning">
          Duplicate active production proof runs detected ({summary.integration.duplicate_count}).
        </p>
      ) : null}
    </section>
  );
}
