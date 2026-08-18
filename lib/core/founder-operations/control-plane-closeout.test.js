import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasActiveFounderProof } from "@/lib/admin-ops-summary";
import { withProjectAndRun } from "@/components/admin/FounderGuidedPanel";
import { buildMemoryListPresentation } from "@/lib/core/memory/list-presentation";
import {
  ANALYTICS_SCOPE_LEGEND,
  analyticsMetricOk,
  analyticsMetricFail,
} from "@/lib/admin-analytics-scope";
import { categoryForOutput } from "@/lib/core/outputs/build";

vi.mock("@/lib/core/repo.js", () => ({
  listAuditLogs: vi.fn(async () => []),
  listRuns: vi.fn(async () => []),
}));

vi.mock("@/lib/core/memory", () => ({
  listMemory: vi.fn(async () => []),
}));

vi.mock("@/lib/core/integration/persist.js", () => ({
  listPersistedIntegrationRuns: vi.fn(async () => []),
}));

vi.mock("@/lib/core/founder-operations", () => ({
  buildProjectOperationalSummary: vi.fn(async () => ({
    ok: true,
    objectives: [],
    canonical_integration_run: null,
    next_founder_action: null,
  })),
}));

describe("control-plane closeout helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hasActiveFounderProof requires ok summary with canonical run id", () => {
    expect(hasActiveFounderProof(null)).toBe(false);
    expect(hasActiveFounderProof({ ok: true })).toBe(false);
    expect(
      hasActiveFounderProof({
        ok: true,
        canonical_integration_run: { id: "run-1" },
      })
    ).toBe(true);
    expect(
      hasActiveFounderProof({
        ok: false,
        canonical_integration_run: { id: "run-1" },
      })
    ).toBe(false);
  });

  it("withProjectAndRun appends project_id and run_id when missing", () => {
    expect(withProjectAndRun("/admin/integration?tab=plan", "p1", "r1")).toBe(
      "/admin/integration?tab=plan&project_id=p1&run_id=r1"
    );
    expect(
      withProjectAndRun("/admin/integration?project_id=existing", "p1", "r1")
    ).toBe("/admin/integration?project_id=existing&run_id=r1");
    expect(withProjectAndRun(null, "p1", "r1")).toBe(null);
  });

  it("durable memory empty note must not mention additive migration", () => {
    const presentation = buildMemoryListPresentation({
      items: [],
      persistence: { durable: true, backend: "supabase" },
      projectId: "61d3b1fd-c260-479b-9289-0c75f977e892",
    });
    expect(presentation.empty_state).toBe("configured_empty");
    expect(presentation.note).toBeTruthy();
    expect(presentation.note.toLowerCase()).not.toContain("additive migration");
    expect(presentation.note.toLowerCase()).toContain("durable");
  });

  it("analytics scope legend covers organisation, project, integration, runtime", () => {
    expect(ANALYTICS_SCOPE_LEGEND.organisation).toMatch(/Organisation/i);
    expect(ANALYTICS_SCOPE_LEGEND.selected_project).toMatch(/Selected project/i);
    expect(ANALYTICS_SCOPE_LEGEND.integration).toMatch(/Founder Proof/i);
    expect(ANALYTICS_SCOPE_LEGEND.runtime).toMatch(/Agent Runtime/i);
    expect(analyticsMetricOk(1, "organisation")).toEqual({
      available: true,
      value: 1,
      scope: "organisation",
      errorCode: null,
    });
    expect(analyticsMetricFail("X", "runtime").scope).toBe("runtime");
  });

  it("output categories distinguish runtime vs workflow vs approved", () => {
    expect(categoryForOutput({ kind: "agent_result", status: "succeeded" })).toBe(
      "Agent Runtime"
    );
    expect(
      categoryForOutput({ kind: "agent_result", workflow: "software-delivery" })
    ).toBe("Workflow");
    expect(categoryForOutput({ kind: "agent_result", status: "approved" })).toBe(
      "Approved final"
    );
    expect(categoryForOutput({ kind: "integration_evidence" })).toBe(
      "Integration evidence"
    );
    expect(categoryForOutput({ kind: "proof_pack" })).toBe("Proof Pack");
  });

  it("buildKnowledgeView sections expose action_label", async () => {
    const { buildKnowledgeView } = await import("@/lib/core/knowledge/build.js");
    const view = await buildKnowledgeView({ projectId: null });
    const sections = Object.values(view.sections || {});
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      expect(section.action_label).toBeTruthy();
      expect(typeof section.action_label).toBe("string");
    }
  });
});
