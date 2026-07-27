import { describe, it, expect } from "vitest";
import {
  decomposeEnterpriseObjective,
  aggregateEnterpriseStatus,
  computeParallelBatches,
  readyWorkstreams,
} from "./orchestrator";
import { buildEnterpriseNextStep } from "./workflow";

describe("enterprise orchestration status rules", () => {
  it("decomposes software objectives with parallel batches and deps", () => {
    const plan = decomposeEnterpriseObjective({
      objective: "Ship software delivery for core platform",
      departmentsNeeded: ["engineering", "product", "qa"],
      projectProfile: "mianx-core",
    });
    expect(plan.workstreams.length).toBeGreaterThan(1);
    expect(plan.dependency_graph.nodes.length).toBe(plan.workstreams.length);
    expect(plan.parallel_batches.length).toBeGreaterThan(0);
    expect(plan.workforce_plan.forbiddenFullWorkforce).toBe(true);
    expect(plan.workforce_plan.requiredCanonicalDefinitions.length).toBeLessThan(40);
  });

  it("routes business growth into sales/marketing workstreams", () => {
    const plan = decomposeEnterpriseObjective({
      objective: "Business growth campaign",
      departmentsNeeded: ["growth"],
      projectProfile: "mianx-core",
    });
    const depts = plan.workstreams.map((w) => w.department);
    expect(depts).toEqual(expect.arrayContaining(["sales", "marketing"]));
    expect(plan.workstreams.some((w) => w.optional)).toBe(true);
  });

  it("routes incident objectives toward operations", () => {
    const plan = decomposeEnterpriseObjective({
      objective: "SEV-1 production incident response",
      departmentsNeeded: [],
      riskClass: "R4",
      projectProfile: "mianx-core",
    });
    expect(plan.workstreams.some((w) => w.department === "operations")).toBe(true);
  });

  it("SUCCESS only when all required workstreams succeeded", () => {
    const agg = aggregateEnterpriseStatus([
      { id: "a", required: true, status: "succeeded" },
      { id: "b", required: true, status: "succeeded" },
      { id: "c", optional: true, status: "succeeded" },
    ]);
    expect(agg.status).toBe("SUCCESS");
  });

  it("PARTIAL_SUCCESS when optional failed but required succeeded", () => {
    const agg = aggregateEnterpriseStatus([
      { id: "a", required: true, status: "succeeded" },
      { id: "growth", optional: true, status: "failed" },
    ]);
    expect(agg.status).toBe("PARTIAL_SUCCESS");
  });

  it("blocking statuses on required streams prevent SUCCESS", () => {
    for (const status of [
      "blocked",
      "failed",
      "cancelled",
      "awaiting_approval",
      "dead_letter",
    ]) {
      const agg = aggregateEnterpriseStatus([
        { id: "a", required: true, status: "succeeded" },
        { id: "b", required: true, status },
      ]);
      expect(agg.status).not.toBe("SUCCESS");
      expect(agg.status).not.toBe("PARTIAL_SUCCESS");
      expect(["BLOCKED", "FAILED", "CANCELLED", "AWAITING_APPROVAL", "DEAD_LETTER"]).toContain(
        agg.status
      );
    }
  });

  it("independent workstreams without deps form one parallel batch", () => {
    const streams = [
      { id: "a", depends_on: [], status: "pending" },
      { id: "b", depends_on: [], status: "pending" },
      { id: "c", depends_on: ["a", "b"], status: "pending" },
    ];
    const batches = computeParallelBatches(streams);
    expect(batches[0].sort()).toEqual(["a", "b"]);
    expect(batches[1]).toEqual(["c"]);
    expect(readyWorkstreams(streams).map((w) => w.id).sort()).toEqual(["a", "b"]);
  });

  it("buildEnterpriseNextStep halts on failed required workstream", () => {
    const job = {
      agent_slug: "workflow-orchestrator",
      workflow: "enterprise-objective",
      workflow_step: 1,
      input: {
        mode: "synthesize",
        objective: "x",
        workstreams: [
          { id: "a", required: true, status: "succeeded" },
          { id: "b", required: true, status: "failed" },
        ],
      },
    };
    const next = buildEnterpriseNextStep(job, {});
    expect(next.halt).toBe("enterprise_failed");
    expect(next.aggregate.status).toBe("FAILED");
  });

  it("buildEnterpriseNextStep completes on SUCCESS without protected action", () => {
    const job = {
      agent_slug: "workflow-orchestrator",
      workflow: "enterprise-objective",
      workflow_step: 1,
      input: {
        mode: "synthesize",
        objective: "x",
        proposed_action: null,
        workstreams: [
          { id: "a", required: true, status: "succeeded" },
          { id: "b", optional: true, status: "succeeded" },
        ],
      },
    };
    const next = buildEnterpriseNextStep(job, {});
    expect(next.done).toBe(true);
    expect(next.aggregate.status).toBe("SUCCESS");
  });
});
