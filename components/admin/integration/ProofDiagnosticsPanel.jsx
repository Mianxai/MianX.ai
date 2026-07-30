"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";

/**
 * Collapsed technical diagnostics for Founder Proof (read-only, no secrets).
 */
export default function ProofDiagnosticsPanel({
  projectId,
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
      const res = await adminFetch(
        `/api/admin/integration/proof-diagnostics?project_id=${encodeURIComponent(projectId)}`,
        { headers: { Accept: "application/json" } }
      );
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error?.message || json?.error || "Diagnostics unavailable");
        setData(null);
        return;
      }
      setData(json);
    } catch (err) {
      setError(err?.message || "Diagnostics request failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!open) return;
    load();
  }, [open, load]);

  if (!projectId) return null;

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
          <div>
            <dt>Project</dt>
            <dd>{data.project?.name || "—"}</dd>
          </div>
          <div>
            <dt>Query source</dt>
            <dd>{data.query?.source || "—"}</dd>
          </div>
          <div>
            <dt>Runs returned</dt>
            <dd>{data.query?.run_count_returned ?? "—"}</dd>
          </div>
          <div>
            <dt>Active proof count</dt>
            <dd>{data.active_proof_count ?? "—"}</dd>
          </div>
          <div>
            <dt>Duplicate count</dt>
            <dd>{data.duplicate_count ?? "—"}</dd>
          </div>
          <div>
            <dt>UI state</dt>
            <dd>
              {data.ui_state?.state || "—"}
              {data.ui_state?.title ? ` · ${data.ui_state.title}` : ""}
            </dd>
          </div>
          <div>
            <dt>Canonical eligibility</dt>
            <dd>{data.canonical?.eligibility || "—"}</dd>
          </div>
          <div>
            <dt>Canonical reason</dt>
            <dd>{data.canonical?.reason || "—"}</dd>
          </div>
          {data.latest_stage_event ? (
            <div>
              <dt>Latest stage event</dt>
              <dd>
                {data.latest_stage_event.stage || "—"}
                {data.latest_stage_event.at
                  ? ` · ${data.latest_stage_event.at}`
                  : ""}
              </dd>
            </div>
          ) : null}
          {Array.isArray(data.resolver_warnings) && data.resolver_warnings.length > 0 ? (
            <div>
              <dt>Warnings</dt>
              <dd>{data.resolver_warnings.join("; ")}</dd>
            </div>
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
      </p>
    </details>
  );
}
