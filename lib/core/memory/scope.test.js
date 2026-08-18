import { describe, it, expect } from "vitest";
import { assertKnowledgeAccess, KNOWLEDGE_SCOPES } from "./scope";

describe("assertKnowledgeAccess", () => {
  it("allows same-project project knowledge", () => {
    const r = assertKnowledgeAccess({
      requesterScope: "project",
      targetScope: "project_knowledge",
      projectId: "p1",
      targetProjectId: "p1",
    });
    expect(r.allowed).toBe(true);
  });

  it("rejects cross-project access without authorisation", () => {
    expect(() =>
      assertKnowledgeAccess({
        requesterScope: "project",
        targetScope: "project",
        requesterProjectId: "p1",
        targetProjectId: "p2",
      })
    ).toThrow(/Cross-project/);
  });

  it("allows cross-project when explicitly authorised", () => {
    const r = assertKnowledgeAccess({
      requesterScope: "organization",
      targetScope: "shared_org",
      requesterProjectId: "p1",
      targetProjectId: "p2",
      authorizedCrossProject: true,
      orgId: "org1",
    });
    expect(r.allowed).toBe(true);
    expect(r.authorizedCrossProject).toBe(true);
  });

  it("guards sensitive_private", () => {
    expect(() =>
      assertKnowledgeAccess({
        requesterScope: "project",
        targetScope: "sensitive_private",
        projectId: "p1",
      })
    ).toThrow(/sensitive_private/);
    expect(
      assertKnowledgeAccess({
        requesterScope: "agent",
        targetScope: "sensitive_private",
        projectId: "p1",
      }).allowed
    ).toBe(true);
  });

  it("rejects unknown scopes", () => {
    expect(() =>
      assertKnowledgeAccess({
        requesterScope: "galaxy",
        targetScope: "project",
      })
    ).toThrow(/Invalid requester/);
  });

  it("lists supported scopes", () => {
    expect(KNOWLEDGE_SCOPES).toEqual(
      expect.arrayContaining([
        "organization",
        "project",
        "department",
        "agent",
        "shared_org",
        "project_knowledge",
        "sensitive_private",
      ])
    );
  });
});
