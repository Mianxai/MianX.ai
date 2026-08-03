/**
 * Phase 1 Step 3 — membership-scoped project access helpers + fixtures.
 */

import { describe, it, expect } from "vitest";
import {
  TENANT_A,
  TENANT_B,
  filterRowsByProject,
  denyCrossTenantAccess,
} from "./cross-tenant-fixtures";
import {
  PROJECT_ACCESS_MODES,
  projectInScope,
  assertProjectRowInScope,
  scopeToListProjectsOpts,
  filterRowsByScope,
  auditScopePayload,
} from "./project-access";
import { CAPABILITIES, hasCapability, capabilitiesForRole } from "../admin-capabilities";

describe("scopeToListProjectsOpts fail-closed", () => {
  it("deny scope yields empty allowlist sentinel", () => {
    expect(scopeToListProjectsOpts({ ok: false })).toEqual({
      organizationId: "__deny__",
      projectIds: [],
    });
  });

  it("organization mode lists by organizationId only", () => {
    expect(
      scopeToListProjectsOpts({
        ok: true,
        mode: PROJECT_ACCESS_MODES.ORGANIZATION,
        organizationId: TENANT_A.organizationId,
        projectIds: null,
      })
    ).toEqual({ organizationId: TENANT_A.organizationId });
  });

  it("allowlist mode never expands to all projects", () => {
    expect(
      scopeToListProjectsOpts({
        ok: true,
        mode: PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST,
        organizationId: TENANT_A.organizationId,
        projectIds: [TENANT_A.projectId],
      })
    ).toEqual({
      organizationId: TENANT_A.organizationId,
      projectIds: [TENANT_A.projectId],
    });
    expect(
      scopeToListProjectsOpts({
        ok: true,
        mode: PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST,
        organizationId: TENANT_A.organizationId,
        projectIds: [],
      }).projectIds
    ).toEqual([]);
  });
});

describe("cross-tenant project access gates", () => {
  const scopeA = {
    ok: true,
    mode: PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST,
    organizationId: TENANT_A.organizationId,
    projectIds: [TENANT_A.projectId],
    platformAdmin: false,
  };
  const scopeB = {
    ok: true,
    mode: PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST,
    organizationId: TENANT_B.organizationId,
    projectIds: [TENANT_B.projectId],
    platformAdmin: false,
  };

  const projectA = {
    id: TENANT_A.projectId,
    organization_id: TENANT_A.organizationId,
    archived_at: null,
  };
  const projectB = {
    id: TENANT_B.projectId,
    organization_id: TENANT_B.organizationId,
    archived_at: null,
  };

  it("Admin A may access Project A only", () => {
    expect(projectInScope(scopeA, projectA)).toBe(true);
    expect(assertProjectRowInScope(scopeA, projectA).ok).toBe(true);
  });

  it("Admin A cannot access Project B (privacy 404)", () => {
    expect(projectInScope(scopeA, projectB)).toBe(false);
    expect(assertProjectRowInScope(scopeA, projectB)).toEqual({
      ok: false,
      status: 404,
      code: "PROJECT_NOT_FOUND",
    });
  });

  it("Admin B cannot access Project A", () => {
    expect(assertProjectRowInScope(scopeB, projectA).ok).toBe(false);
  });

  it("known foreign task/agent ids do not leak through scoped filters", () => {
    const rows = [
      { id: TENANT_A.taskId, project_id: TENANT_A.projectId, title: "A task" },
      { id: TENANT_B.taskId, project_id: TENANT_B.projectId, title: "B task" },
      { id: TENANT_A.agentId, project_id: TENANT_A.projectId },
      { id: TENANT_B.agentId, project_id: TENANT_B.projectId },
    ];
    const scoped = filterRowsByScope(rows, scopeA);
    expect(scoped.every((r) => r.project_id === TENANT_A.projectId)).toBe(true);
    expect(scoped.find((r) => r.id === TENANT_B.taskId)).toBeUndefined();
    expect(scoped.find((r) => r.id === TENANT_B.agentId)).toBeUndefined();
    expect(filterRowsByProject(rows, TENANT_A.projectId).length).toBe(2);
  });

  it("pagination/search/counts/exports stay on allowlist", () => {
    const rows = [
      { id: "1", project_id: TENANT_A.projectId, title: "alpha" },
      { id: "2", project_id: TENANT_B.projectId, title: "beta" },
      { id: "3", project_id: TENANT_A.projectId, title: "gamma" },
    ];
    const page = filterRowsByScope(rows, scopeA).slice(0, 50);
    const search = page.filter((r) => String(r.title).includes("beta"));
    expect(page).toHaveLength(2);
    expect(search).toHaveLength(0);
    expect(page.length).toBe(
      rows.filter((r) => r.project_id === TENANT_A.projectId).length
    );
  });

  it("operator cannot perform admin-only mutations; viewer cannot mutate", () => {
    const op = capabilitiesForRole(TENANT_A.operatorRole);
    const viewer = capabilitiesForRole(TENANT_A.viewerRole);
    expect(hasCapability(op, CAPABILITIES.MANAGE_PROJECTS)).toBe(false);
    expect(hasCapability(op, CAPABILITIES.DECIDE_APPROVALS)).toBe(false);
    expect(hasCapability(viewer, CAPABILITIES.MANAGE_TASKS)).toBe(false);
    expect(hasCapability(viewer, CAPABILITIES.MANAGE_AGENTS)).toBe(false);
  });

  it("missing / foreign project_id denied", () => {
    expect(
      denyCrossTenantAccess({
        actorProjectId: null,
        resourceProjectId: TENANT_B.projectId,
      }).allowed
    ).toBe(false);
    expect(
      denyCrossTenantAccess({
        actorProjectId: TENANT_A.projectId,
        resourceProjectId: TENANT_B.projectId,
      }).status
    ).toBe(404);
  });

  it("audit scope payload has no secrets", () => {
    const blob = JSON.stringify(auditScopePayload(scopeA, { resultCount: 2 }));
    expect(blob).not.toMatch(/sk-/);
    expect(blob).not.toContain("service_role");
  });

  it("org-scoped project rejects wrong organization_id", () => {
    const orgScope = {
      ok: true,
      mode: PROJECT_ACCESS_MODES.ORGANIZATION,
      organizationId: TENANT_A.organizationId,
      projectIds: null,
    };
    expect(projectInScope(orgScope, projectA)).toBe(true);
    expect(projectInScope(orgScope, projectB)).toBe(false);
  });
});
