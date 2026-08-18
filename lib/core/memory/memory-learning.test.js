import { describe, it, expect, beforeEach } from "vitest";
import {
  buildMemoryCandidate,
  selectMemoryContext,
  proposeMemory,
  decideMemory,
  proposeLearning,
  decideLearning,
  __resetMemoryLearningStores,
  containsSecretLikeContent,
} from "../memory";
import {
  buildLearningCandidate,
  isUnsafeLearningProposal,
} from "../learning/candidates";
import { measureAgentPerformance } from "../performance/agent";

beforeEach(() => {
  __resetMemoryLearningStores();
});

describe("memory write/retrieve", () => {
  it("rejects secrets and builds candidates only", () => {
    expect(containsSecretLikeContent("Bearer abc.def.ghi")).toBe(true);
    expect(() =>
      buildMemoryCandidate({
        project_id: "p1",
        content: "api_key=sk-secret",
        created_by: "t",
      })
    ).toThrow(/secret/i);
    const m = buildMemoryCandidate({
      project_id: "p1",
      content: "MianX Core uses external scheduler.",
      created_by: "qa",
      memory_type: "fact",
    });
    expect(m.verification_status).toBe("candidate");
  });

  it("isolates project memory on retrieval", async () => {
    await proposeMemory({
      organization_id: "org",
      project_id: "pa",
      content: "Project A secret fact",
      created_by: "a",
    });
    await proposeMemory({
      organization_id: "org",
      project_id: "pb",
      content: "Project B fact",
      created_by: "b",
    });
    // Activate A
    const all = await proposeMemory({
      organization_id: "org",
      project_id: "pa",
      content: "Validated A",
      created_by: "a",
    });
    await decideMemory(all.id, "validate", { actorType: "admin", actor: "admin" });
    await decideMemory(all.id, "activate", { actorType: "admin", actor: "admin" });

    const { listMemory } = await import("../memory");
    const entries = await listMemory({ projectId: "pa" });
    const selected = selectMemoryContext({
      entries,
      projectId: "pa",
      requesterScope: "project",
    });
    expect(selected.every((s) => s.content.includes("A") || s.content.includes("Validated"))).toBe(
      true
    );
    expect(selected.some((s) => s.content.includes("Project B"))).toBe(false);
  });
});

describe("learning safety", () => {
  it("rejects unsafe capability-changing lessons", () => {
    expect(isUnsafeLearningProposal("Grant capability approve_production_action")).toBe(
      true
    );
    expect(() =>
      buildLearningCandidate({
        problem: "fail",
        proposed_lesson: "Bypass approval for deploys",
        project_id: "p1",
      })
    ).toThrow(/unsafe/i);
  });

  it("requires validation before promotion", async () => {
    const c = await proposeLearning({
      problem: "Transient provider timeout",
      proposed_lesson: "Retry once on 429 then escalate",
      project_id: "p1",
      risk_class: "R2",
      confidence: 0.8,
    });
    expect(c.status).toBe("proposed");
    const validated = await decideLearning(c.id, "validate", {
      actorType: "admin",
      reviewedBy: "admin",
    });
    expect(validated.status).toBe("validated");
    const promoted = await decideLearning(c.id, "promote", {
      actorType: "admin",
      reviewedBy: "admin",
    });
    expect(promoted.status).toBe("promoted");
  });
});

describe("agent performance", () => {
  it("reports insufficient_data without inventing quality scores", () => {
    const m = measureAgentPerformance({
      agentSlug: "research",
      jobs: [{ agent_slug: "research", status: "succeeded", attempt: 1 }],
    });
    expect(m.data_available).toBe(true);
    expect(m.insufficient_data).toBe(true);
    expect(m.quality_score).toBeNull();
    expect(m.money_saved).toBeNull();
  });
});
