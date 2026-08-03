/**
 * Durable membership scope resolution (Phase 1 Step 4) — unit tests.
 * Does not require Postgres; ephemeral SQL suite runs in CI.
 */

import { describe, it, expect } from "vitest";
import { TENANT_A, TENANT_B } from "./cross-tenant-fixtures";
import {
  PROJECT_ACCESS_MODES,
  resolveProjectAccessScope,
} from "./project-access";

describe("durable membership scope wiring", () => {
  const defaultOrg = { id: TENANT_A.organizationId, slug: "mianx" };

  it("pre-migration (scopeColumnsAvailable false) uses default org only", async () => {
    const authCtx = {
      user: { id: TENANT_A.adminUserId, email: "a@test" },
      membership: {
        id: "m1",
        role: "admin",
        status: "active",
      },
      mode: "membership",
      scopeColumnsAvailable: false,
      capabilities: ["read", "manage_projects"],
    };
    // getOrCreateDefaultOrg will be called — mock via overrides
    const scope = await resolveProjectAccessScope(authCtx, {
      organizationId: defaultOrg.id,
    });
    expect(scope.ok).toBe(true);
    expect(scope.durableScope).toBe(false);
    expect(scope.organizationId).toBe(defaultOrg.id);
    expect(scope.mode).toBe(PROJECT_ACCESS_MODES.ORGANIZATION);
    expect(scope.projectIds).toBeNull();
  });

  it("post-migration project_id creates allowlist — not global", async () => {
    const authCtx = {
      user: { id: TENANT_A.adminUserId },
      membership: {
        id: "m1",
        role: "admin",
        organization_id: TENANT_A.organizationId,
        project_id: TENANT_A.projectId,
      },
      mode: "membership",
      scopeColumnsAvailable: true,
      capabilities: ["read"],
    };
    const scope = await resolveProjectAccessScope(authCtx, {
      organizationId: defaultOrg.id,
    });
    expect(scope.ok).toBe(true);
    expect(scope.durableScope).toBe(true);
    expect(scope.mode).toBe(PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST);
    expect(scope.projectIds).toEqual([TENANT_A.projectId]);
    expect(scope.organizationId).toBe(TENANT_A.organizationId);
  });

  it("post-migration organization_id scopes to that org — Tenant B denied by filter", async () => {
    const authCtx = {
      user: { id: TENANT_A.adminUserId },
      membership: {
        id: "m1",
        role: "admin",
        organization_id: TENANT_A.organizationId,
        project_id: null,
      },
      mode: "membership",
      scopeColumnsAvailable: true,
      capabilities: ["read"],
    };
    const scope = await resolveProjectAccessScope(authCtx, {
      organizationId: defaultOrg.id,
    });
    expect(scope.organizationId).toBe(TENANT_A.organizationId);
    expect(scope.organizationId).not.toBe(TENANT_B.organizationId);
    expect(scope.projectIds).toBeNull();
  });

  it("NULL durable columns do not become multi-org global for tenant admin", async () => {
    const authCtx = {
      user: { id: TENANT_A.adminUserId },
      membership: {
        id: "m1",
        role: "admin",
        organization_id: null,
        project_id: null,
      },
      mode: "membership",
      scopeColumnsAvailable: true,
      capabilities: ["read", "manage_projects"],
    };
    const scope = await resolveProjectAccessScope(authCtx, {
      organizationId: defaultOrg.id,
    });
    expect(scope.ok).toBe(true);
    expect(scope.legacyNullScope).toBe(true);
    expect(scope.mode).toBe(PROJECT_ACCESS_MODES.ORGANIZATION);
    expect(scope.organizationId).toBe(defaultOrg.id);
    expect(scope.platformAdmin).toBe(false);
  });

  it("owner with NULL durable columns is platform_organization (explicit)", async () => {
    const authCtx = {
      user: { id: "owner-1" },
      membership: {
        id: "m-owner",
        role: "owner",
        organization_id: null,
        project_id: null,
      },
      mode: "membership",
      scopeColumnsAvailable: true,
      capabilities: ["platform.admin", "read"],
    };
    const scope = await resolveProjectAccessScope(authCtx, {
      organizationId: defaultOrg.id,
    });
    expect(scope.platformAdmin).toBe(true);
    expect(scope.mode).toBe(PROJECT_ACCESS_MODES.PLATFORM_ORGANIZATION);
    expect(scope.organizationId).toBe(defaultOrg.id);
  });
});
