// Truthful runtime metrics aggregation from job/run stats inputs.
// Pure functions only — never invent CSAT, uptime, savings, or revenue.

/**
 * @typedef {object} MetricValue
 * @property {boolean} data_available
 * @property {*} [value]
 * @property {string} [status] "ok" | "insufficient_data"
 * @property {string} [note]
 */

function metric(value, { note } = {}) {
  if (value === undefined || value === null) {
    return { data_available: false, status: "insufficient_data", value: null, note: note || null };
  }
  return { data_available: true, status: "ok", value, note: note || null };
}

function insufficient(note) {
  return { data_available: false, status: "insufficient_data", value: null, note: note || null };
}

/**
 * Count jobs (or runs) by status from an array of records with a `status` field.
 */
export function countByStatus(rows) {
  if (!Array.isArray(rows)) {
    return {
      by_status: insufficient("rows array required"),
      total: insufficient("rows array required"),
    };
  }
  const counts = {};
  for (const row of rows) {
    const s = row?.status || "unknown";
    counts[s] = (counts[s] || 0) + 1;
  }
  return {
    by_status: metric(counts),
    total: metric(rows.length),
  };
}

/**
 * Retry / attempt statistics.
 */
export function summarizeRetries(rows) {
  if (!Array.isArray(rows)) {
    return {
      jobs_with_retries: insufficient("rows array required"),
      total_retry_attempts: insufficient("rows array required"),
      max_attempt_observed: insufficient("rows array required"),
    };
  }
  let withRetries = 0;
  let totalExtra = 0;
  let maxAttempt = 0;
  for (const row of rows) {
    const attempt = Number(row?.attempt ?? row?.attempts ?? 0);
    if (!Number.isFinite(attempt)) continue;
    maxAttempt = Math.max(maxAttempt, attempt);
    if (attempt > 1) {
      withRetries += 1;
      totalExtra += attempt - 1;
    }
  }
  return {
    jobs_with_retries: metric(withRetries),
    total_retry_attempts: metric(totalExtra),
    max_attempt_observed: metric(maxAttempt),
  };
}

export function countDeadLetter(rows) {
  if (!Array.isArray(rows)) return { dead_letter: insufficient("rows array required") };
  const n = rows.filter((r) => r?.status === "dead_letter").length;
  return { dead_letter: metric(n) };
}

export function countApprovalWait(rows) {
  if (!Array.isArray(rows)) {
    return { awaiting_approval: insufficient("rows array required") };
  }
  const n = rows.filter(
    (r) =>
      r?.status === "awaiting_approval" ||
      r?.requires_approval === true ||
      r?.awaiting_approval === true
  ).length;
  return { awaiting_approval: metric(n) };
}

/**
 * Latency percentiles from numeric ms samples (or rows with latency_ms /
 * duration_ms). Missing samples → insufficient_data.
 */
export function latencyPercentiles(samplesOrRows) {
  if (!Array.isArray(samplesOrRows) || samplesOrRows.length === 0) {
    return {
      count: insufficient("no latency samples"),
      p50_ms: insufficient("no latency samples"),
      p95_ms: insufficient("no latency samples"),
      p99_ms: insufficient("no latency samples"),
    };
  }
  const values = samplesOrRows
    .map((x) => {
      if (typeof x === "number") return x;
      if (typeof x?.latency_ms === "number") return x.latency_ms;
      if (typeof x?.duration_ms === "number") return x.duration_ms;
      return null;
    })
    .filter((n) => typeof n === "number" && Number.isFinite(n) && n >= 0)
    .sort((a, b) => a - b);

  if (values.length === 0) {
    return {
      count: insufficient("no numeric latency fields"),
      p50_ms: insufficient("no numeric latency fields"),
      p95_ms: insufficient("no numeric latency fields"),
      p99_ms: insufficient("no numeric latency fields"),
    };
  }

  const pct = (p) => {
    const idx = Math.min(values.length - 1, Math.ceil((p / 100) * values.length) - 1);
    return values[Math.max(0, idx)];
  };

  return {
    count: metric(values.length),
    p50_ms: metric(pct(50)),
    p95_ms: metric(pct(95)),
    p99_ms: metric(pct(99)),
  };
}

/**
 * Provider / model distribution when fields are present.
 */
export function providerModelBreakdown(rows) {
  if (!Array.isArray(rows)) {
    return {
      by_provider: insufficient("rows array required"),
      by_model: insufficient("rows array required"),
    };
  }
  const byProvider = {};
  const byModel = {};
  let sawProvider = false;
  let sawModel = false;
  for (const row of rows) {
    if (row?.provider) {
      sawProvider = true;
      byProvider[row.provider] = (byProvider[row.provider] || 0) + 1;
    }
    if (row?.model) {
      sawModel = true;
      byModel[row.model] = (byModel[row.model] || 0) + 1;
    }
  }
  return {
    by_provider: sawProvider
      ? metric(byProvider)
      : insufficient("provider field not present on inputs"),
    by_model: sawModel
      ? metric(byModel)
      : insufficient("model field not present on inputs"),
  };
}

/**
 * Estimated cost sum when estimated_cost / cost_usd fields exist.
 * Never invents savings or revenue.
 */
export function estimatedCost(rows) {
  if (!Array.isArray(rows)) {
    return { estimated_cost_usd: insufficient("rows array required") };
  }
  let sum = 0;
  let found = 0;
  for (const row of rows) {
    const c = row?.estimated_cost ?? row?.cost_usd ?? row?.estimated_cost_usd;
    if (typeof c === "number" && Number.isFinite(c)) {
      sum += c;
      found += 1;
    }
  }
  if (found === 0) {
    return {
      estimated_cost_usd: insufficient("no estimated_cost / cost_usd on inputs"),
      samples_with_cost: metric(0),
    };
  }
  return {
    estimated_cost_usd: metric(sum, { note: `sum of ${found} samples` }),
    samples_with_cost: metric(found),
  };
}

/**
 * Aggregate a truthful overview from job + optional run/task arrays.
 * Explicitly omits CSAT / uptime / savings / revenue.
 */
export function aggregateRuntimeMetrics({ jobs = null, runs = null, tasks = null } = {}) {
  const jobRows = Array.isArray(jobs) ? jobs : null;
  const runRows = Array.isArray(runs) ? runs : null;
  const taskRows = Array.isArray(tasks) ? tasks : null;

  const statusSource = jobRows || runRows;
  const counts = countByStatus(statusSource);
  const retries = summarizeRetries(jobRows || []);
  const dead = countDeadLetter(jobRows || []);
  const approval = countApprovalWait(taskRows || jobRows || []);
  const latency = latencyPercentiles(jobRows || runRows || []);
  const providers = providerModelBreakdown(jobRows || runRows || []);
  const cost = estimatedCost(jobRows || runRows || []);

  return {
    data_available: Boolean(statusSource),
    status: statusSource ? "ok" : "insufficient_data",
    jobs: jobRows
      ? {
          ...counts,
          ...retries,
          ...dead,
          ...providers,
          ...cost,
          latency,
        }
      : {
          by_status: insufficient("jobs not provided"),
          total: insufficient("jobs not provided"),
        },
    runs: runRows
      ? { ...countByStatus(runRows), latency: latencyPercentiles(runRows) }
      : { by_status: insufficient("runs not provided") },
    tasks: taskRows
      ? { ...countByStatus(taskRows), ...countApprovalWait(taskRows) }
      : { by_status: insufficient("tasks not provided") },
    // Honest exclusions — never fabricate business KPIs.
    excluded_metrics: {
      csat: insufficient("CSAT is not collected by this runtime"),
      uptime: insufficient("uptime is not derived from job stats"),
      savings: insufficient("savings are never invented"),
      revenue: insufficient("revenue is never invented"),
    },
  };
}
