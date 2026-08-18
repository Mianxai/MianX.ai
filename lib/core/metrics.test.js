import { describe, it, expect } from "vitest";
import {
  countByStatus,
  summarizeRetries,
  countDeadLetter,
  countApprovalWait,
  latencyPercentiles,
  providerModelBreakdown,
  estimatedCost,
  aggregateRuntimeMetrics,
} from "./metrics";

describe("runtime metrics honesty", () => {
  it("counts by status when data is present", () => {
    const r = countByStatus([
      { status: "succeeded" },
      { status: "succeeded" },
      { status: "failed" },
    ]);
    expect(r.by_status.data_available).toBe(true);
    expect(r.by_status.value).toEqual({ succeeded: 2, failed: 1 });
    expect(r.total.value).toBe(3);
  });

  it("marks missing inputs as insufficient_data", () => {
    const r = countByStatus(null);
    expect(r.by_status.data_available).toBe(false);
    expect(r.by_status.status).toBe("insufficient_data");
  });

  it("summarizes retries and dead-letter from job rows", () => {
    const jobs = [
      { status: "succeeded", attempt: 1 },
      { status: "succeeded", attempt: 3 },
      { status: "dead_letter", attempt: 5 },
    ];
    expect(summarizeRetries(jobs).jobs_with_retries.value).toBe(2);
    expect(countDeadLetter(jobs).dead_letter.value).toBe(1);
  });

  it("counts approval wait from tasks", () => {
    const r = countApprovalWait([
      { status: "awaiting_approval" },
      { status: "pending" },
    ]);
    expect(r.awaiting_approval.value).toBe(1);
  });

  it("computes latency percentiles only with samples", () => {
    const empty = latencyPercentiles([]);
    expect(empty.p50_ms.data_available).toBe(false);
    const filled = latencyPercentiles([10, 20, 30, 40, 100]);
    expect(filled.p50_ms.data_available).toBe(true);
    expect(filled.p50_ms.value).toBeGreaterThan(0);
  });

  it("exposes provider/model and cost only when present", () => {
    expect(providerModelBreakdown([{ status: "ok" }]).by_provider.data_available).toBe(
      false
    );
    expect(
      providerModelBreakdown([{ provider: "anthropic", model: "claude" }]).by_model.value
    ).toEqual({ claude: 1 });
    expect(estimatedCost([{ estimated_cost: 0.01 }, { cost_usd: 0.02 }]).estimated_cost_usd.value).toBeCloseTo(
      0.03
    );
    expect(estimatedCost([{ status: "ok" }]).estimated_cost_usd.data_available).toBe(false);
  });

  it("aggregate never invents CSAT/uptime/savings/revenue", () => {
    const agg = aggregateRuntimeMetrics({
      jobs: [{ status: "succeeded", latency_ms: 12, provider: "anthropic" }],
    });
    expect(agg.data_available).toBe(true);
    expect(agg.excluded_metrics.csat.data_available).toBe(false);
    expect(agg.excluded_metrics.uptime.data_available).toBe(false);
    expect(agg.excluded_metrics.savings.data_available).toBe(false);
    expect(agg.excluded_metrics.revenue.data_available).toBe(false);
    expect(agg.jobs.by_status.value.succeeded).toBe(1);
  });
});
