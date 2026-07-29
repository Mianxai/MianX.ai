"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import DuplicateResolutionPanel from "@/components/admin/integration/DuplicateResolutionPanel";
import ScopeBadge from "@/components/admin/ScopeBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import { resolveProjectDisplayName } from "@/lib/admin/resolve-project-label";
import {
  humanStageLabel,
  humanStatusLabel,
  statusTone,
} from "@/lib/core/integration/founder-labels";

/** Preserve project_id / run_id / hash on guided action hrefs. */
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
    return `${url.pathname}${url.search}${url.hash || ""}`;
  } catch {
    return href;
  }
}

/**
 * Premium Next Founder Action card — stage-aware, no duplicated labels.
 */
export default function FounderGuidedPanel({
  summary,
  projectId,
  projectName,
  projects = [],
  onRefresh,
}) {
  const [dupBusy, setDupBusy] = useState(false);
  const [dupMessage, setDupMessage] = useState("");
  const [dupError, setDupError] = useState("");

  const duplicates = summary?.integration?.duplicate_runs || [];
  const hasDuplicates = Boolean(summary?.integration?.duplicate_warning && duplicates.length);

  const displayName = resolveProjectDisplayName({
    projectName,
    summary,
    projects,
    projectId,
  });

  useEffect(() => {
    if (!hasDuplicates || typeof window === "undefined") return;
    if (window.location.hash !== "#duplicates") return;
    const el = document.getElementById("duplicates");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hasDuplicates, summary?.integration?.duplicate_count]);

  const cancelOne = useCallback(
    async (duplicateRunId) => {
      setDupBusy(true);
      setDupError("");
      setDupMessage("");
      try {
        const res = await fetch("/api/admin/integration", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "cancel_founder_proof_duplicate",
            project_id: projectId,
            canonical_run_id: summary?.canonical_integration_run?.id || null,
            duplicate_run_id: duplicateRunId,
            reason: "cancelled_duplicate",
            actor: "founder",
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setDupError(data?.error?.message || data?.message || "Cancel failed");
          return;
        }
        setDupMessage(
          data?.note || `Duplicate ${duplicateRunId} cancelled. Canonical run preserved.`
        );
        await onRefresh?.();
      } catch (err) {
        setDupError(err?.message || "Cancel failed");
      } finally {
        setDupBusy(false);
      }
    },
    [projectId, summary?.canonical_integration_run?.id, onRefresh]
  );

  const cancelAll = useCallback(async () => {
    setDupBusy(true);
    setDupError("");
    setDupMessage("");
    const ids = (summary?.integration?.duplicate_runs || []).map((d) => d.id);
    let cancelled = 0;
    try {
      for (const duplicateRunId of ids) {
        // eslint-disable-next-line no-await-in-loop
        const res = await fetch("/api/admin/integration", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "cancel_founder_proof_duplicate",
            project_id: projectId,
            canonical_run_id: summary?.canonical_integration_run?.id || null,
            duplicate_run_id: duplicateRunId,
            reason: "cancelled_duplicate",
            actor: "founder",
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setDupError(
            data?.error?.message || data?.message || `Cancel failed for ${duplicateRunId}`
          );
          await onRefresh?.();
          return;
        }
        cancelled += 1;
      }
      setDupMessage(`Cancelled ${cancelled} non-canonical duplicate(s). Canonical run unchanged.`);
      await onRefresh?.();
    } catch (err) {
      setDupError(err?.message || "Cancel all failed");
    } finally {
      setDupBusy(false);
    }
  }, [projectId, summary, onRefresh]);

  if (!projectId) {
    return (
      <section
        className="founder-next-action-card cc-card"
        data-testid="founder-guided-panel"
        aria-labelledby="founder-next-action-h"
      >
        <ScopeBadge scope="proof" />
        <h2 id="founder-next-action-h">Next Founder Action</h2>
        <p className="cc-muted">Select a project to see the canonical next action.</p>
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
  const resolveDuplicates = next?.id === "resolve_duplicates" || hasDuplicates;
  const primaryHref =
    next?.href && next.severity === "action_required" && !resolveDuplicates
      ? withProjectAndRun(next.href, projectId, runId)
      : null;

  const stageLabel =
    canonical?.stage_label ||
    humanStageLabel(canonical?.stage || canonical?.current_stage) ||
    "Not started";
  const statusLabel = humanStatusLabel(
    canonical?.proof_status || canonical?.status,
    canonical?.stage || canonical?.current_stage
  );

  const willHappen =
    next?.will_happen ||
    (next?.id === "review_plan"
      ? "The proof moves to simulation approval."
      : null);
  const willNot =
    next?.will_not_happen ||
    "Simulation will not start. Provider will not be called. Production deployment remains blocked.";

  return (
    <>
      <section
        className="founder-next-action-card cc-card"
        data-testid="founder-guided-panel"
        aria-labelledby="founder-next-action-h"
      >
        <header className="founder-next-action-header">
          <div>
            <ScopeBadge scope="proof" label="Founder Proof" />
            <h2 id="founder-next-action-h">Next Founder Action</h2>
          </div>
          <div className="founder-next-action-badges">
            <StatusBadge tone={statusTone(canonical?.stage || canonical?.proof_status)}>
              {stageLabel}
            </StatusBadge>
            <StatusBadge tone={statusTone(canonical?.proof_status || canonical?.status)}>
              {statusLabel}
            </StatusBadge>
          </div>
        </header>

        <dl className="founder-next-action-grid" data-testid="founder-guided-context">
          <div>
            <dt>Project</dt>
            <dd data-testid="founder-selected-project-name">{displayName}</dd>
          </div>
          <div>
            <dt>Current objective</dt>
            <dd data-testid="founder-current-objective">
              {objective?.title || "No active objective"}
            </dd>
          </div>
          <div>
            <dt>Current stage</dt>
            <dd data-testid="founder-current-stage">{stageLabel}</dd>
          </div>
          <div>
            <dt>Current status</dt>
            <dd data-testid="founder-current-status">{statusLabel}</dd>
          </div>
        </dl>

        {next ? (
          <div className="founder-next-action-body">
            <div>
              <h3>What the Founder needs to do</h3>
              <p data-testid="founder-next-need">{next.reason || next.label}</p>
            </div>
            {willHappen ? (
              <div>
                <h3>What happens after clicking</h3>
                <p data-testid="guided-will-happen">{willHappen}</p>
              </div>
            ) : null}
            <div>
              <h3>What will not happen automatically</h3>
              <p data-testid="guided-will-not-happen">{willNot}</p>
            </div>

            {resolveDuplicates ? (
              <button
                type="button"
                className="header-btn"
                data-testid="founder-guided-primary-action"
                onClick={() => {
                  const el = document.getElementById("duplicates");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {next.label || "Resolve duplicate proof runs"}
              </button>
            ) : primaryHref ? (
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
          </div>
        ) : (
          <p className="admin-muted">No action required for this project right now.</p>
        )}

        <details className="founder-guided-tech">
          <summary>Technical details</summary>
          <p>
            Project ID: <code>{projectId}</code>
          </p>
          {runId ? (
            <p>
              Run ID: <code>{runId}</code>
            </p>
          ) : null}
          {canonical?.stage ? (
            <p>
              Machine stage: <code>{canonical.stage}</code>
            </p>
          ) : null}
          {canonical?.proof_status ? (
            <p>
              Machine proof status: <code>{canonical.proof_status}</code>
            </p>
          ) : null}
        </details>

        {hasDuplicates ? (
          <p className="admin-warning" role="status" data-testid="guided-duplicate-warning">
            Duplicate active production proof runs detected (
            {summary.integration.duplicate_count}). Use the resolution panel below.
          </p>
        ) : null}
        {canonical?.live_provider_blocked ? (
          <p className="admin-warning" role="status">
            Live provider execution is blocked. Deterministic simulation remains available after
            Founder gates.
          </p>
        ) : null}
      </section>

      {hasDuplicates ? (
        <DuplicateResolutionPanel
          projectId={projectId}
          canonicalRun={canonical}
          duplicateRuns={duplicates}
          canonicalReason={summary.integration?.canonical_reason}
          busy={dupBusy}
          message={dupMessage}
          error={dupError}
          onCancelDuplicate={cancelOne}
          onCancelAll={cancelAll}
        />
      ) : null}
    </>
  );
}
