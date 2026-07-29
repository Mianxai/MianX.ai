"use client";

import Link from "next/link";

/** Preserve project_id / run_id on guided action hrefs. */
export function withProjectAndRun(href, projectId, runId) {
  if (!href) return href;
  try {
    const url = new URL(href, "http://admin.local");
    if (projectId && !url.searchParams.has("project_id")) {
      url.searchParams.set("project_id", projectId);
    }
    if (runId && !url.searchParams.has("run_id")) {
      url.searchParams.set("run_id", runId);
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
}

/**
 * Compact guided operations panel for Founder project context.
 */
export default function FounderGuidedPanel({ summary, projectId }) {
  if (!projectId) {
    return (
      <section
        className="founder-guided-panel admin-panel"
        data-testid="founder-guided-panel"
        aria-label="Founder guided operations"
      >
        <h2>Next Founder action</h2>
        <p className="admin-muted">Select a project to see the canonical next action.</p>
      </section>
    );
  }

  if (!summary?.ok) return null;

  const next = summary.next_founder_action;
  const canonical = summary.canonical_integration_run;
  const objective =
    summary.objectives?.find((o) => o.is_canonical || o.source_type === "integration_proof") ||
    summary.objectives?.[0] ||
    null;
  const runId = canonical?.id || null;
  const primaryHref =
    next?.href && next.severity === "action_required"
      ? withProjectAndRun(next.href, projectId, runId)
      : null;

  return (
    <section
      className="founder-guided-panel admin-panel"
      data-testid="founder-guided-panel"
      aria-label="Founder guided operations"
    >
      <h2>Next Founder action</h2>
      <dl className="founder-guided-meta" data-testid="founder-guided-context">
        <div>
          <dt>Selected project</dt>
          <dd>{projectId}</dd>
        </div>
        {objective ? (
          <div>
            <dt>Canonical objective</dt>
            <dd>{objective.title}</dd>
          </div>
        ) : null}
        {canonical ? (
          <>
            <div>
              <dt>Canonical run</dt>
              <dd>{canonical.id}</dd>
            </div>
            <div>
              <dt>Current stage</dt>
              <dd>{canonical.stage_label || canonical.stage || "—"}</dd>
            </div>
            <div>
              <dt>Proof status</dt>
              <dd>{canonical.proof_status || "—"}</dd>
            </div>
          </>
        ) : null}
      </dl>
      {next ? (
        <>
          <p className="founder-guided-reason">{next.reason}</p>
          {primaryHref ? (
            <Link
              className="header-btn"
              href={primaryHref}
              data-testid="founder-guided-primary-action"
            >
              {next.label}
            </Link>
          ) : (
            <p className="admin-muted" role="status">
              {next.label}
            </p>
          )}
        </>
      ) : (
        <p className="admin-muted">No action required for this project right now.</p>
      )}
      {summary.integration?.duplicate_warning ? (
        <p className="admin-warning" role="status" data-testid="guided-duplicate-warning">
          Duplicate active production proof runs detected (
          {summary.integration.duplicate_count}).
        </p>
      ) : null}
      {canonical?.live_provider_blocked ? (
        <p className="admin-warning" role="status">
          Live provider execution is blocked for this run (configuration_invalid). Deterministic
          simulation remains available after Founder gates.
        </p>
      ) : null}
    </section>
  );
}
