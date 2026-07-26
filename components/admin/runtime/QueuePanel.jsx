"use client";

// Queue panel: truthful operational view over runtime_jobs.
//
// Shows status counts, a filtered + paginated job list, attempt/max-attempts,
// provider/model, duration, token usage, estimated cost, last heartbeat and
// the sanitized error, plus confirmed retry/cancel actions. Background
// refreshes keep the existing rows visible (no full-page loader) and stale
// responses can never overwrite newer data.

import { useCallback, useEffect, useRef, useState } from "react";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";

const STATUS_FILTERS = [
  "all",
  "queued",
  "leased",
  "running",
  "succeeded",
  "failed",
  "cancelled",
  "dead_letter",
];

const COUNT_ORDER = [
  "queued",
  "leased",
  "running",
  "succeeded",
  "failed",
  "cancelled",
  "dead_letter",
];

const PAGE_SIZE = 25;

function errorMessage(data, fallback) {
  return data?.error?.message || data?.error || fallback;
}

export function formatDuration(job) {
  if (typeof job?.latency_ms === "number") {
    return job.latency_ms >= 1000
      ? `${(job.latency_ms / 1000).toFixed(1)}s`
      : `${job.latency_ms}ms`;
  }
  if (job?.started_at && job?.finished_at) {
    const ms = new Date(job.finished_at) - new Date(job.started_at);
    if (Number.isFinite(ms) && ms >= 0) {
      return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
    }
  }
  return "—";
}

export function formatCost(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return `$${value.toFixed(4)}`;
}

export function formatTokens(job) {
  const inTok = job?.input_tokens;
  const outTok = job?.output_tokens;
  if (typeof inTok !== "number" && typeof outTok !== "number") return "—";
  return `${typeof inTok === "number" ? inTok : "?"} in / ${
    typeof outTok === "number" ? outTok : "?"
  } out`;
}

export default function QueuePanel({ call, projectId }) {
  const [jobs, setJobs] = useState(null);
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [confirming, setConfirming] = useState(null); // { id, action }
  const [expanded, setExpanded] = useState("");
  const seqRef = useRef(0);

  const load = useCallback(
    async ({ background = false } = {}) => {
      if (!projectId) {
        setJobs([]);
        setCounts({});
        setTotal(0);
        setLoading(false);
        return;
      }
      const seq = ++seqRef.current;
      if (background) setRefreshing(true);
      else setLoading(true);
      setError("");

      const params = new URLSearchParams({
        project_id: projectId,
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await call(`/api/core/jobs?${params.toString()}`);
      if (seq !== seqRef.current) return; // stale response — ignore
      if (!res.ok) {
        setError(errorMessage(res.data, "Failed to load the job queue."));
        if (!background) setJobs([]);
      } else {
        setJobs(res.data?.jobs || []);
        setCounts(res.data?.counts || {});
        setTotal(res.data?.total || 0);
      }
      setLoading(false);
      setRefreshing(false);
    },
    [call, projectId, statusFilter, offset]
  );

  useEffect(() => {
    void load();
    return () => {
      seqRef.current += 1;
    };
  }, [load]);

  async function act(job, action) {
    setBusyId(job.id);
    setConfirming(null);
    const res = await call(`/api/core/jobs/${job.id}/${action}`, { method: "POST" });
    setBusyId("");
    if (!res.ok) {
      setError(errorMessage(res.data, `Could not ${action} the job.`));
      return;
    }
    setError("");
    void load({ background: true });
  }

  if (!projectId) {
    return <p className="runtime-muted">Select or create a project first.</p>;
  }
  if (loading && jobs === null) {
    return <DelayedLoader active variant="section" label="Loading job queue…" />;
  }

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + PAGE_SIZE, total);

  return (
    <div data-testid="queue-panel">
      <div className="runtime-cards" aria-label="Queue status counts">
        {COUNT_ORDER.map((s) => (
          <div key={s} className="runtime-card runtime-card-compact">
            <h3>{s.replace("_", " ")}</h3>
            <p className="runtime-metric" data-testid={`queue-count-${s}`}>
              {counts[s] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="runtime-queue-toolbar">
        <div
          className="runtime-filters"
          role="group"
          aria-label="Filter jobs by status"
        >
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              className={`runtime-chip small${statusFilter === s ? " active" : ""}`}
              aria-pressed={statusFilter === s}
              onClick={() => {
                setStatusFilter(s);
                setOffset(0);
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="header-btn-ghost"
          data-testid="queue-refresh"
          onClick={() => void load({ background: true })}
          disabled={refreshing}
        >
          {refreshing ? (
            <MianxLoader variant="inline" label="Refreshing queue…" />
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {error && (
        <p className="runtime-error-text" role="alert">
          {error}
        </p>
      )}

      {(jobs || []).length === 0 ? (
        <p className="runtime-muted">
          {statusFilter === "all"
            ? "No jobs in the queue yet. Jobs appear when a task is enqueued or a workflow starts. Queued jobs process only when the internal tick endpoint is invoked (manual or external scheduler) — this deployment does not claim automatic processing."
            : `No ${statusFilter.replace("_", " ")} jobs.`}
        </p>
      ) : (
        <ul className="runtime-list" data-testid="queue-list">
          {(jobs || []).map((job) => {
            const cancellable = ["queued", "leased", "running"].includes(job.status);
            const retryable = ["failed", "dead_letter"].includes(job.status);
            const isBusy = busyId === job.id;
            const isExpanded = expanded === job.id;
            return (
              <li key={job.id} className="runtime-item runtime-item-block">
                <div className="runtime-job-head">
                  <div>
                    <strong>
                      <span className={`runtime-status status-${job.status}`}>
                        {job.status.replace("_", " ")}
                      </span>{" "}
                      {job.agent_slug || "job"}
                      {job.workflow ? (
                        <span className="runtime-muted">
                          {" "}
                          · {job.workflow} step {job.workflow_step + 1}
                        </span>
                      ) : null}
                    </strong>
                    <p className="runtime-muted">
                      attempt {job.attempt}/{job.max_attempts} · {job.provider}
                      {job.model ? ` / ${job.model}` : ""} · duration{" "}
                      {formatDuration(job)} · tokens {formatTokens(job)} · est.{" "}
                      {formatCost(
                        typeof job.estimated_cost === "string"
                          ? Number(job.estimated_cost)
                          : job.estimated_cost
                      )}
                    </p>
                    <p className="runtime-muted">
                      created{" "}
                      {job.created_at ? new Date(job.created_at).toLocaleString() : "—"}
                      {job.heartbeat_at
                        ? ` · heartbeat ${new Date(job.heartbeat_at).toLocaleString()}`
                        : ""}
                      {job.cancel_requested_at && !["cancelled"].includes(job.status)
                        ? " · cancellation requested"
                        : ""}
                    </p>
                    {job.error?.message && (
                      <p className="runtime-error-text" data-testid="job-error">
                        {job.error.code ? `${job.error.code}: ` : ""}
                        {job.error.message}
                      </p>
                    )}
                  </div>
                  <div className="runtime-item-actions">
                    <button
                      type="button"
                      className="header-btn-ghost"
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? "" : job.id)}
                    >
                      {isExpanded ? "Hide detail" : "Detail"}
                    </button>
                    {confirming?.id === job.id ? (
                      <>
                        <span className="runtime-muted">
                          Confirm {confirming.action}?
                        </span>
                        <button
                          type="button"
                          className="header-btn"
                          disabled={isBusy}
                          onClick={() => void act(job, confirming.action)}
                        >
                          {isBusy ? (
                            <MianxLoader variant="inline" label="Working…" />
                          ) : (
                            "Yes"
                          )}
                        </button>
                        <button
                          type="button"
                          className="header-btn-ghost"
                          onClick={() => setConfirming(null)}
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <>
                        {retryable && (
                          <button
                            type="button"
                            className="header-btn"
                            disabled={isBusy}
                            data-testid={`job-retry-${job.id}`}
                            onClick={() => setConfirming({ id: job.id, action: "retry" })}
                          >
                            Retry
                          </button>
                        )}
                        {cancellable && (
                          <button
                            type="button"
                            className="header-btn-ghost"
                            disabled={isBusy}
                            data-testid={`job-cancel-${job.id}`}
                            onClick={() => setConfirming({ id: job.id, action: "cancel" })}
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {isExpanded && (
                  <div className="runtime-job-detail">
                    {job.output ? (
                      <pre className="runtime-code" aria-label="Job output">
                        {JSON.stringify(job.output, null, 2)}
                      </pre>
                    ) : (
                      <p className="runtime-muted">No output yet.</p>
                    )}
                    {job.error && (
                      <pre
                        className="runtime-code runtime-code-error"
                        aria-label="Job error detail"
                      >
                        {JSON.stringify(job.error, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="runtime-pagination" aria-label="Queue pagination">
        <span className="runtime-muted" data-testid="queue-page-info">
          {pageStart}–{pageEnd} of {total}
        </span>
        <button
          type="button"
          className="header-btn-ghost"
          disabled={offset === 0 || refreshing}
          onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
        >
          Previous
        </button>
        <button
          type="button"
          className="header-btn-ghost"
          disabled={offset + PAGE_SIZE >= total || refreshing}
          onClick={() => setOffset(offset + PAGE_SIZE)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
