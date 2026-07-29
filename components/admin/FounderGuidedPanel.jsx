"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import DuplicateResolutionPanel from "@/components/admin/integration/DuplicateResolutionPanel";

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
 * Compact guided operations panel for Founder project context.
 * When duplicates exist, embeds real cancel controls (not navigation-only).
 */
export default function FounderGuidedPanel({ summary, projectId, onRefresh }) {
  const [dupBusy, setDupBusy] = useState(false);
  const [dupMessage, setDupMessage] = useState("");
  const [dupError, setDupError] = useState("");

  const duplicates = summary?.integration?.duplicate_runs || [];
  const hasDuplicates = Boolean(summary?.integration?.duplicate_warning && duplicates.length);

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
          data?.note ||
            `Duplicate ${duplicateRunId} cancelled. Canonical run preserved.`
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
        // Revalidated server-side on each call.
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
            data?.error?.message ||
              data?.message ||
              `Cancel failed for ${duplicateRunId}`
          );
          await onRefresh?.();
          return;
        }
        cancelled += 1;
      }
      setDupMessage(
        `Cancelled ${cancelled} non-canonical duplicate(s). Canonical run unchanged.`
      );
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
  const resolveDuplicates = next?.id === "resolve_duplicates" || hasDuplicates;
  const primaryHref =
    next?.href && next.severity === "action_required" && !resolveDuplicates
      ? withProjectAndRun(next.href, projectId, runId)
      : null;

  return (
    <>
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
          </>
        ) : (
          <p className="admin-muted">No action required for this project right now.</p>
        )}
        {hasDuplicates ? (
          <p className="admin-warning" role="status" data-testid="guided-duplicate-warning">
            Duplicate active production proof runs detected (
            {summary.integration.duplicate_count}). Use the resolution panel below.
          </p>
        ) : null}
        {canonical?.live_provider_blocked ? (
          <p className="admin-warning" role="status">
            Live provider execution is blocked for this run (configuration_invalid). Deterministic
            simulation remains available after Founder gates.
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
