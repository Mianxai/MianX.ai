"use client";

// Queue panel: truthful operational view over runtime_jobs.
//
// Shows status counts, a filtered + paginated job list, attempt/max-attempts,
// provider/model, duration, token usage, estimated cost, last heartbeat and
// the sanitized error, plus confirmed retry/cancel actions. Background
// refreshes keep the existing rows visible (no full-page loader) and stale
// responses can never overwrite newer data.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/admin/EmptyState";
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

function schedulerCopy(health) {
  const scheduler = health?.config?.scheduler || health?.scheduler || null;
  if (!scheduler) {
    return {
      mode: "unknown",
      automaticProcessing: false,
      lastTick: null,
      summary:
        "Scheduler status is unavailable from health. Queue processing remains manual until status is known.",
    };
  }
  const lastTick =
    scheduler.lastTickAt ||
    scheduler.last_tick_at ||
    health?.lastTickAt ||
    health?.last_tick_at ||
    null;
  const mode = scheduler.mode || "manual";
  const automatic = Boolean(scheduler.automaticProcessing);
  let summary;
  if (automatic) {
    summary = `Scheduler mode: ${mode}. Automatic processing is active.`;
  } else if (scheduler.readyForExternalScheduler) {
    summary = `Scheduler mode: ${mode}. Worker secret is ready for an external scheduler; automatic processing is not claimed yet.`;
  } else {
    summary = `Scheduler mode: ${mode}. Automatic processing is off until a Founder configures the scheduler secret and external cron.`;
  }
  if (lastTick) {
    summary += ` Last tick: ${new Date(lastTick).toLocaleString()}.`;
  }
  return { mode, automaticProcessing: automatic, lastTick, summary };
}

export default function QueuePanel({
  call,
  projectId,
  health = null,
  opsSummary: _opsSummary = null,
}) {
  const [jobs, setJobs] = useState(null);
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [confirming, setConfirming] = useState(null); // { id, action }
  const [expanded, setExpanded] = useState("");
  const seqRef = useRef(0);
  const scheduler = schedulerCopy(health);

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
    const res = await call(
      `/api/core/jobs/${job.id}/${action}?project_id=${encodeURIComponent(projectId)}`,
      {
        method: "POST",
        body: JSON.stringify({ project_id: projectId }),
      }
    );
    setBusyId("");
    if (!res.ok) {
      setError(errorMessage(res.data, `Could not ${action} the job.`));
      return;
    }
    setError("");
    void load({ background: true });
  }

  async function runManualTick() {
    const autoNote = scheduler.automaticProcessing
      ? " Automatic processing is already configured — manual Run tick is not the default operating path."
      : "";
    if (
      !window.confirm(
        `Run a manual worker tick? This processes queued jobs only; it does not bypass Founder approvals and does not advance Integration proof by itself.${autoNote}`
      )
    ) {
      return;
    }
    setTicking(true);
    const res = await call("/api/admin/runtime/tick", {
      method: "POST",
      body: JSON.stringify({ max_jobs: 5 }),
    });
    setTicking(false);
    if (!res.ok) {
      setError(errorMessage(res.data, "Could not run a worker tick."));
      return;
    }
    setError("");
    void load({ background: true });
  }

  if (!projectId) {
    return (
      <EmptyState
        title="Select a project"
        reason="The job queue is project-scoped. Queued jobs process on a worker tick (Run tick, npm run runtime:tick, or an external scheduler)."
        configuration={scheduler.summary}
        nextAction="Select or create a project to inspect queued jobs."
        projectLabel="none"
        cta={
          <Link className="header-btn" href="/admin/projects">
            Open projects
          </Link>
        }
      />
    );
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
      <p className="runtime-muted" data-testid="queue-approval-note">
        Job statuses above are queue truth. Tasks waiting on a human appear as
        task status &quot;awaiting approval&quot; (Approvals panel) — successful
        jobs that gated on approval are counted as succeeded here, not as a
        separate queue state. Wave-1{" "}
        <code>software-delivery</code> / <code>controlled-delivery</code> jobs
        show owning agent and stage. Advisory delivery completes without Founder
        approval; only a proposed protected action parks the task for Founder
        approval. Coding executor changes are workspace-scoped patch candidates —
        never autonomous production pushes or deploys.
      </p>
      <p className="runtime-muted" data-testid="queue-runtime-readiness">
        {health?.config?.rateLimit
          ? `Rate limit: ${
              health.config.rateLimit.durable ? "durable adapter" : "in-memory"
            } · `
          : null}
        Scheduler state is summarised under Advanced Diagnostics. Manual Run tick
        is not the primary Founder workflow.
      </p>

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
          disabled={refreshing || ticking}
        >
          {refreshing ? (
            <MianxLoader variant="inline" label="Refreshing queue…" />
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      <details
        className="runtime-advanced"
        data-testid="queue-advanced-diagnostics"
      >
        <summary>Advanced Diagnostics</summary>
        <p className="runtime-muted" data-testid="queue-scheduler-state">
          {scheduler.summary}
          {scheduler.automaticProcessing
            ? " Manual Run tick remains a diagnostic only — not the primary Founder workflow."
            : " Manual Run tick processes queued jobs only; it does not bypass Founder approvals or advance Founder Proof by itself."}
        </p>
        <button
          type="button"
          className="header-btn-ghost"
          data-testid="queue-run-tick"
          onClick={() => void runManualTick()}
          disabled={ticking || refreshing}
        >
          {ticking ? (
            <MianxLoader variant="inline" label="Running tick…" />
          ) : (
            "Run tick"
          )}
        </button>
      </details>

      {error && (
        <p className="runtime-error-text" role="alert">
          {error}
        </p>
      )}

      {(jobs || []).length === 0 ? (
        <EmptyState
          title={
            statusFilter === "all"
              ? "No jobs in the queue yet"
              : `No ${statusFilter.replace("_", " ")} jobs`
          }
          reason={
            statusFilter === "all"
              ? `Jobs appear when a task is enqueued or a workflow starts. Queued jobs process when a worker tick runs (Run tick here, npm run runtime:tick, or an external scheduler). ${scheduler.summary}`
              : `No jobs currently in status “${statusFilter.replace("_", " ")}”.`
          }
          configuration={
            statusFilter === "all"
              ? `mode=${scheduler.mode}; automaticProcessing=${scheduler.automaticProcessing}${
                  scheduler.lastTick
                    ? `; lastTick=${new Date(scheduler.lastTick).toISOString()}`
                    : ""
                }`
              : null
          }
          nextAction={
            statusFilter === "all"
              ? scheduler.automaticProcessing
                ? "Enqueue work from Tasks or Objectives; the configured scheduler should drain the queue."
                : "Enqueue work from Tasks when needed. Use Advanced Diagnostics → Run tick only for manual diagnostics."
              : "Try the All filter or refresh after a tick."
          }
          projectLabel={projectId}
          cta={
            <Link
              className="header-btn"
              href={`/admin/runtime/tasks?project_id=${encodeURIComponent(projectId)}`}
            >
              Open tasks
            </Link>
          }
        />
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
