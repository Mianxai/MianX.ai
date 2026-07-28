// Truthful agent performance from real job/run rows — never invent scores.

export function measureAgentPerformance({
  agentSlug,
  jobs = [],
  runs = [],
  approvals = [],
  windowStart = null,
  windowEnd = null,
} = {}) {
  if (!agentSlug) {
    return {
      agent_slug: null,
      data_available: false,
      sample_size: 0,
      insufficient_data: true,
      measurement_window: { start: windowStart, end: windowEnd },
    };
  }

  const inWindow = (ts) => {
    if (!ts) return true;
    const t = new Date(ts).getTime();
    if (windowStart && t < new Date(windowStart).getTime()) return false;
    if (windowEnd && t > new Date(windowEnd).getTime()) return false;
    return true;
  };

  const agentJobs = jobs.filter((j) => j.agent_slug === agentSlug && inWindow(j.created_at));
  const agentRuns = runs.filter((r) => r.agent_slug === agentSlug && inWindow(r.created_at));
  const agentApprovals = approvals.filter(
    (a) => a.agent_slug === agentSlug && inWindow(a.created_at)
  );

  const completed = agentJobs.filter((j) => j.status === "succeeded").length;
  const failed = agentJobs.filter((j) => j.status === "failed").length;
  const deadLetter = agentJobs.filter((j) => j.status === "dead_letter").length;
  const retries = agentJobs.reduce((n, j) => n + Math.max(0, (j.attempt || 1) - 1), 0);
  const latencies = agentJobs
    .map((j) => j.latency_ms)
    .filter((n) => typeof n === "number" && Number.isFinite(n))
    .sort((a, b) => a - b);

  const median =
    latencies.length === 0
      ? null
      : latencies.length % 2
        ? latencies[(latencies.length - 1) / 2]
        : (latencies[latencies.length / 2 - 1] + latencies[latencies.length / 2]) / 2;
  const p95 =
    latencies.length === 0
      ? null
      : latencies[Math.min(latencies.length - 1, Math.floor(latencies.length * 0.95))];

  const sample = agentJobs.length + agentRuns.length;
  return {
    agent_slug: agentSlug,
    data_available: sample > 0,
    sample_size: sample,
    insufficient_data: sample < 3,
    measurement_window: { start: windowStart, end: windowEnd },
    tasks_assigned: agentJobs.length,
    tasks_completed: completed,
    tasks_failed: failed,
    retry_count: retries,
    dead_letter_count: deadLetter,
    median_latency_ms: median,
    p95_latency_ms: p95,
    approval_rejection_count: agentApprovals.filter((a) => a.status === "rejected").length,
    runs_recorded: agentRuns.length,
    // Explicitly absent fabricated metrics:
    quality_score: null,
    intelligence_score: null,
    productivity_percentage: null,
    money_saved: null,
  };
}
