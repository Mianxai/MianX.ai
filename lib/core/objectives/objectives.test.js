import { describe, it, expect } from "vitest";
import {
  mapObjectiveStatus,
  toObjectiveSummary,
  validateObjectiveSubmit,
  isObjectiveTask,
  OBJECTIVE_WORKFLOWS,
} from "./index";

describe("objectives console", () => {
  it("maps runtime statuses to Founder console statuses", () => {
    expect(mapObjectiveStatus({ id: "1", status: "pending", input: {} })).toBe("QUEUED");
    expect(
      mapObjectiveStatus({ id: "1", status: "pending", input: { decomposition: {} } })
    ).toBe("PLANNING");
    expect(mapObjectiveStatus({ id: "1", status: "running", input: {} })).toBe("RUNNING");
    expect(mapObjectiveStatus({ id: "1", status: "awaiting_approval", input: {} })).toBe(
      "AWAITING_APPROVAL"
    );
    expect(mapObjectiveStatus({ id: "1", status: "completed", input: {} })).toBe("COMPLETED");
    expect(mapObjectiveStatus({ id: "1", status: "failed", input: {} })).toBe("FAILED");
    expect(mapObjectiveStatus({ id: "1", status: "cancelled", input: {} })).toBe("CANCELLED");
  });

  it("recognizes objective workflows only", () => {
    expect(isObjectiveTask({ input: { workflow: "enterprise-objective" } })).toBe(true);
    expect(isObjectiveTask({ input: { workflow: "lead-qualification" } })).toBe(false);
    expect(OBJECTIVE_WORKFLOWS.has("software-delivery")).toBe(true);
  });

  it("summarizes without inventing counts", () => {
    const row = toObjectiveSummary({
      id: "t1",
      project_id: "p1",
      title: "Enterprise objective: Assess HospitalOS",
      status: "running",
      priority: "high",
      input: { workflow: "enterprise-objective", objective: "Assess HospitalOS" },
    });
    expect(row.workstreamCount).toBeNull();
    expect(row.status).toBe("RUNNING");
    expect(row.objective).toBe("Assess HospitalOS");
  });

  it("validates submit and rejects capability injection", () => {
    const bad = validateObjectiveSubmit({
      project_id: "not-uuid-needed-here",
      objective: "short",
      allowed_capabilities: ["send_email"],
    });
    expect(bad.ok).toBe(false);
    expect(bad.errors.capabilities).toBeTruthy();
    expect(bad.errors.objective).toBeTruthy();

    const ok = validateObjectiveSubmit({
      project_id: "11111111-1111-4111-8111-111111111111",
      objective: "Assess whether we should build HospitalOS.",
      priority: "high",
      idempotency_key: "obj:test-key-1",
    });
    expect(ok.ok).toBe(true);
    expect(ok.value.idempotency_key).toBe("obj:test-key-1");
  });

  it("is idempotent-friendly via distinct keys", () => {
    const a = validateObjectiveSubmit({
      project_id: "11111111-1111-4111-8111-111111111111",
      objective: "Prepare project-health improvements for MianX Core.",
      idempotency_key: "obj:a",
    });
    const b = validateObjectiveSubmit({
      project_id: "11111111-1111-4111-8111-111111111111",
      objective: "Prepare project-health improvements for MianX Core.",
      idempotency_key: "obj:b",
    });
    expect(a.value.idempotency_key).not.toBe(b.value.idempotency_key);
  });
});
