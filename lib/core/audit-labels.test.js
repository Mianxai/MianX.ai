import { describe, it, expect } from "vitest";
import {
  AUDIT_FILTERS,
  humanAuditEventLabel,
  classifyAuditEvent,
  filterAuditEvents,
  auditEventBadges,
} from "./audit-labels.js";

describe("audit-labels", () => {
  it("maps required Founder-facing event labels", () => {
    expect(humanAuditEventLabel("scheduler.status_snapshot")).toBe(
      "Scheduler status recorded"
    );
    expect(humanAuditEventLabel("integration.run.snapshot")).toBe(
      "Founder Proof state recorded"
    );
    expect(humanAuditEventLabel("integration_run.snapshot")).toBe(
      "Founder Proof state recorded"
    );
    expect(humanAuditEventLabel("integration.stage.plan_generated")).toBe(
      "Deterministic plan generated"
    );
    expect(humanAuditEventLabel("integration.stage.founder_approval_required")).toBe(
      "Founder plan approval requested"
    );
    expect(humanAuditEventLabel("founder_approval_required")).toBe(
      "Founder plan approval requested"
    );
    expect(humanAuditEventLabel("integration.stage.cancelled")).toBe(
      "Duplicate proof run cancelled"
    );
    expect(humanAuditEventLabel("cancelled")).toBe("Duplicate proof run cancelled");
  });

  it("exposes the six filter buckets", () => {
    expect(AUDIT_FILTERS).toEqual([
      "All",
      "Founder Proof",
      "Runtime",
      "Scheduler",
      "Security",
      "System",
    ]);
  });

  it("classifies and filters events", () => {
    const events = [
      { event_type: "scheduler.status_snapshot", source: "scheduler" },
      { event_type: "integration_run.snapshot", source: "integration" },
      { event_type: "task.created", source: "project_runtime_audit" },
      { event_type: "approval.pending", source: "approvals", protected_action: true },
      { event_type: "memory.candidate", source: "memory" },
    ];
    expect(classifyAuditEvent(events[0])).toBe("Scheduler");
    expect(classifyAuditEvent(events[1])).toBe("Founder Proof");
    expect(classifyAuditEvent(events[2])).toBe("Runtime");
    expect(classifyAuditEvent(events[3])).toBe("Security");
    expect(classifyAuditEvent(events[4])).toBe("System");

    expect(filterAuditEvents(events, "All")).toHaveLength(5);
    expect(filterAuditEvents(events, "Founder Proof")).toHaveLength(1);
    expect(filterAuditEvents(events, "Scheduler")[0].event_type).toBe(
      "scheduler.status_snapshot"
    );
  });

  it("builds human badges without secrets", () => {
    const badges = auditEventBadges({
      source: "integration",
      actor: "system",
      outcome: "awaiting_plan_approval",
      technical: { proof: { canonical: true } },
    });
    expect(badges.source).toMatch(/Integration/i);
    expect(badges.actor).toBe("System");
    expect(badges.outcome).toMatch(/Awaiting Plan Approval/i);
    expect(badges.canonical).toBe("canonical");
  });
});
