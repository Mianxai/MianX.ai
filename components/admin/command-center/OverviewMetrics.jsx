"use client";

function MetricCard({ label, metric }) {
  const unavailable = !metric?.available;
  return (
    <div className="cc-metric">
      <div className="cc-metric-label">{label}</div>
      <div className="cc-metric-value">
        {unavailable ? (
          <span className="cc-unavailable">{metric?.label || "Data unavailable"}</span>
        ) : (
          metric.value
        )}
      </div>
    </div>
  );
}

export default function OverviewMetrics({ metrics }) {
  if (!metrics) return null;
  return (
    <section className="cc-metrics" aria-label="Command center overview metrics">
      <MetricCard label="Active agents" metric={metrics.activeAgents} />
      <MetricCard label="Idle agents" metric={metrics.idleAgents} />
      <MetricCard label="Waiting approval" metric={metrics.waitingApproval} />
      <MetricCard label="Queued jobs" metric={metrics.queuedJobs} />
      <MetricCard label="Running jobs" metric={metrics.runningJobs} />
      <MetricCard label="Failed / dead-letter" metric={metrics.failedJobs} />
      <MetricCard label="Active workflows" metric={metrics.activeWorkflows} />
      <MetricCard label="Blocked workflows" metric={metrics.blockedWorkflows} />
      <MetricCard label="Active projects" metric={metrics.activeProjects} />
    </section>
  );
}
