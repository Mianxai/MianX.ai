"use client";

/**
 * Truthful Phase D execution snapshot — no fabricated live AI progress.
 */
export default function ExecutionPanel({ execution, schedule }) {
  if (!execution) {
    return (
      <section className="cc-panel" aria-label="Execution engine">
        <h2 className="cc-panel-title">Execution engine</h2>
        <p className="cc-muted">Data unavailable</p>
      </section>
    );
  }

  const util = execution.workforce?.utilisation || {};
  const avail = execution.workforce?.availableVersusAssigned || {};

  return (
    <section className="cc-panel" aria-label="Execution engine">
      <h2 className="cc-panel-title">Execution engine</h2>
      <p className="cc-muted" style={{ marginBottom: "0.75rem" }}>
        {execution.note ||
          "In-process execution counts. Fabricated real-time AI progress is never shown."}
      </p>
      <dl className="cc-kv-grid">
        <div>
          <dt>Active companies</dt>
          <dd>{execution.activeCompanies ?? "—"}</dd>
        </div>
        <div>
          <dt>Active programs</dt>
          <dd>{execution.activePrograms ?? "—"}</dd>
        </div>
        <div>
          <dt>Queued / ready</dt>
          <dd>{execution.queuedTasks ?? "—"}</dd>
        </div>
        <div>
          <dt>Blocked</dt>
          <dd>{execution.blockedTasks ?? "—"}</dd>
        </div>
        <div>
          <dt>Running agent runs</dt>
          <dd>{execution.runningAgentRuns ?? "—"}</dd>
        </div>
        <div>
          <dt>Succeeded / failed</dt>
          <dd>
            {execution.succeeded ?? "—"} / {execution.failed ?? "—"}
          </dd>
        </div>
        <div>
          <dt>Dead-letter</dt>
          <dd>{execution.deadLetter ?? "—"}</dd>
        </div>
        <div>
          <dt>Review queue</dt>
          <dd>{execution.reviewQueue ?? "—"}</dd>
        </div>
        <div>
          <dt>Workforce assigned</dt>
          <dd>
            {avail.assigned ?? util.assigned_agents ?? "—"} / max{" "}
            {util.max_global ?? "—"}
          </dd>
        </div>
        <div>
          <dt>Reserve remaining</dt>
          <dd>{avail.reserve_remaining ?? util.reserve_remaining ?? "—"}</dd>
        </div>
        <div>
          <dt>Provider</dt>
          <dd>
            <code>
              {execution.provider?.configured || "unconfigured"} ·{" "}
              {execution.provider?.detail || "unavailable"}
            </code>
          </dd>
        </div>
        <div>
          <dt>Scheduler last tick</dt>
          <dd>
            {schedule?.lastTick ? (
              <code>{schedule.lastTick}</code>
            ) : (
              <span className="cc-unavailable">Data unavailable</span>
            )}
          </dd>
        </div>
        <div>
          <dt>Project isolation</dt>
          <dd>{execution.projectIsolation ? "scoped" : "global view"}</dd>
        </div>
      </dl>
    </section>
  );
}
