"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";

function Field({ label, children, testId }) {
  return (
    <div data-testid={testId || undefined}>
      <dt>{label}</dt>
      <dd>{children ?? "—"}</dd>
    </div>
  );
}

/**
 * Collapsed technical diagnostics for Founder Proof (read-only, no secrets).
 */
export default function ProofDiagnosticsPanel({
  projectId,
  runId = null,
  openByDefault = false,
}) {
  const [open, setOpen] = useState(openByDefault);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const load = useCallback(async () => {
    if (!projectId || projectId === "all") {
      setData(null);
      setError("Select a project to load diagnostics.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        project_id: projectId,
      });
      if (runId) params.set("run_id", runId);
      const res = await adminFetch(
        `/api/admin/integration/proof-diagnostics?${params.toString()}`,
        { headers: { Accept: "application/json" } }
      );
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error?.message || json?.error || "Diagnostics unavailable");
        setData(null);
        return;
      }
      setData(json?.diagnostics ?? json);
    } catch (err) {
      setError(err?.message || "Diagnostics request failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [projectId, runId]);

  useEffect(() => {
    if (!open) return;
    load();
  }, [open, load]);

  if (!projectId) return null;

  const focus =
    data?.looked_up_run ||
    data?.founder_proof_runs?.find((r) => r.is_canonical) ||
    data?.founder_proof_runs?.[0] ||
    null;
  const queryOk = data?.ok !== false && !data?.query?.error;
  const uncertain = Boolean(error || data?.query?.error || data?.ok === false);

  return (
    <details
      id="proof-diagnostics"
      className="proof-diagnostics-panel"
      data-testid="proof-diagnostics-panel"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>Technical details — proof diagnostics</summary>
      {loading ? <p className="cc-muted">Loading diagnostics…</p> : null}
      {error ? (
        <p className="admin-error" role="alert">
          {error}{" "}
          <button type="button" className="header-btn-ghost" onClick={load}>
            Retry
          </button>
        </p>
      ) : null}
      {data ? (
        <dl className="proof-diagnostics-grid" data-testid="proof-diagnostics-safe">
          <Field label="Query state" testId="diag-query-state">
            {queryOk ? "ok" : "error"}
            {data.query?.source ? ` · ${data.query.source}` : ""}
          </Field>
          <Field label="Canonical resolver state" testId="diag-canonical-resolver">
            {data.canonical?.eligibility || data.ui_state?.state || "—"}
            {data.canonical?.reason ? ` · ${data.canonical.reason}` : ""}
          </Field>
          <Field label="Run ID" testId="diag-run-id">
            {focus?.run_id || data.looked_up_run_id || data.canonical?.run_id || "—"}
          </Field>
          <Field label="Project ID" testId="diag-project-id">
            {data.project?.id || projectId || "—"}
          </Field>
          <Field label="Exists" testId="diag-exists">
            {data.looked_up_run_found === true
              ? "Yes"
              : data.looked_up_run_found === false
                ? "No"
                : focus
                  ? "Yes"
                  : "Unknown"}
          </Field>
          <Field label="Production proof flag" testId="diag-production-proof">
            {focus?.canonical_eligibility === true ||
            (Array.isArray(data.founder_proof_runs) && data.founder_proof_runs.length > 0)
              ? "Yes"
              : "No / unverified"}
          </Field>
          <Field label="Canonical" testId="diag-canonical">
            {focus?.is_canonical
              ? "Yes"
              : data.canonical?.run_id
                ? focus
                  ? "No"
                  : `Candidate · ${data.canonical.run_id}`
                : "None"}
          </Field>
          <Field label="Terminal" testId="diag-terminal">
            {focus ? (focus.terminal ? "Yes" : "No") : "—"}
          </Field>
          <Field label="Resumable" testId="diag-resumable">
            {focus ? (focus.terminal ? "No" : "Yes") : "—"}
          </Field>
          <Field label="Stage" testId="diag-stage">
            {focus?.current_stage_label || focus?.current_stage || "—"}
          </Field>
          <Field label="Status" testId="diag-status">
            {focus?.proof_status || focus?.current_status || data.ui_state?.title || "—"}
          </Field>
          <Field label="Execution mode" testId="diag-execution-mode">
            {focus?.execution_mode || "—"}
          </Field>
          <Field label="Duplicate count" testId="diag-duplicate-count">
            {data.duplicate_count ?? "—"}
          </Field>
          <Field label="Last stage event" testId="diag-last-stage-event">
            {data.latest_stage_event
              ? [
                  data.latest_stage_event.stage || "—",
                  data.latest_stage_event.at || null,
                ]
                  .filter(Boolean)
                  .join(" · ")
              : "—"}
          </Field>
          <Field label="Persistence backend" testId="diag-persistence">
            {data.query?.source || "—"}
          </Field>
          <Field label="Query error" testId="diag-query-error">
            {data.query?.error || data.looked_up_run_error || "None"}
          </Field>
          {Array.isArray(data.resolver_warnings) && data.resolver_warnings.length > 0 ? (
            <Field label="Warnings" testId="diag-warnings">
              {data.resolver_warnings.join("; ")}
            </Field>
          ) : null}
          {Array.isArray(data.founder_proof_runs) && data.founder_proof_runs.length > 0 ? (
            <div className="proof-diagnostics-runs">
              <dt>Proof runs (safe summary)</dt>
              <dd>
                <ul>
                  {data.founder_proof_runs.slice(0, 8).map((r) => (
                    <li key={r.run_id}>
                      {r.objective_title || "Proof run"} ·{" "}
                      {r.current_stage_label || r.current_stage || "—"} ·{" "}
                      {r.terminal ? "terminal" : "active"}
                      {r.is_canonical ? " · canonical" : ""}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <p className="cc-muted proof-diagnostics-note">
        Read-only. No secrets. Query failure is not treated as “no proof.”
        {uncertain
          ? " Diagnostics uncertain — do not start a new proof from this panel."
          : ""}
      </p>
    </details>
  );
}
