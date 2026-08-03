/**
 * Tenant context + cross-tenant isolation regression tests.
 * Fixtures only — zero Production DB writes, zero OpenAI calls.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  TENANT_A,
  TENANT_B,
  makeMembershipFixture,
  filterRowsByProject,
  denyCrossTenantAccess,
  denyUnknownRole,
  denySuspendedOrRemoved,
} from "./cross-tenant-fixtures";
import { ROUTE_AUTH_INVENTORY, summarizeRouteInventoryRisks } from "./route-inventory";
import { SERVICE_ROLE_INVENTORY } from "./service-role-inventory";
import {
  TENANCY_MODEL,
  TENANT_CONTEXT_OUTCOMES,
  rejectUntrustedScopeClaims,
  assertSameProject,
  auditActorFromTenantContext,
} from "../tenant-context";
import {
  CAPABILITIES,
  hasCapability,
  capabilitiesForRole,
  isPlatformAdminRole,
} from "../admin-capabilities";

describe("tenancy model truth", () => {
  it("documents current single-tenant Founder platform honestly", () => {
    expect(TENANCY_MODEL.model).toBe("single_tenant_founder_platform");
    expect(TENANCY_MODEL.workspaces).toBe("not_implemented");
    expect(TENANCY_MODEL.adminMemberships).toBe("global_not_org_scoped");
    expect(TENANCY_MODEL.platformAdminDistinctFromTenantAdmin).toBe(true);
  });

  it("platform Admin is owner-only; tenant Admin is admin/owner", () => {
    expect(isPlatformAdminRole("owner")).toBe(true);
    expect(isPlatformAdminRole("admin")).toBe(false);
    expect(isPlatformAdminRole("viewer")).toBe(false);
    expect(isPlatformAdminRole(null, "bootstrap")).toBe(true);
    expect(hasCapability(capabilitiesForRole("owner"), CAPABILITIES.PLATFORM_ADMIN)).toBe(
      true
    );
    expect(hasCapability(capabilitiesForRole("admin"), CAPABILITIES.PLATFORM_ADMIN)).toBe(
      false
    );
    expect(
      hasCapability(capabilitiesForRole("admin"), CAPABILITIES.LIVE_PILOT_AUTHORIZE)
    ).toBe(false);
    expect(
      hasCapability(capabilitiesForRole("owner"), CAPABILITIES.LIVE_PILOT_AUTHORIZE)
    ).toBe(true);
    expect(hasCapability(capabilitiesForRole("viewer"), CAPABILITIES.LIVE_PILOT_READ)).toBe(
      true
    );
  });
});

describe("untrusted scope claims", () => {
  it("rejects client-supplied role / org / platformAdmin claims", () => {
    const r = rejectUntrustedScopeClaims({
      role: "owner",
      organizationId: TENANT_B.organizationId,
      platformAdmin: true,
    });
    expect(r.ok).toBe(false);
    expect(r.rejected).toEqual(
      expect.arrayContaining(["role", "organizationId", "platformAdmin"])
    );
  });
});

describe("cross-tenant project isolation fixtures", () => {
  const rows = [
    { id: TENANT_A.taskId, project_id: TENANT_A.projectId, title: "A" },
    { id: TENANT_B.taskId, project_id: TENANT_B.projectId, title: "B" },
    { id: TENANT_A.agentId, project_id: TENANT_A.projectId, kind: "agent" },
    { id: TENANT_B.agentId, project_id: TENANT_B.projectId, kind: "agent" },
  ];

  it("Admin A can see Project A rows only", () => {
    const scoped = filterRowsByProject(rows, TENANT_A.projectId);
    expect(scoped.every((r) => r.project_id === TENANT_A.projectId)).toBe(true);
    expect(scoped.some((r) => r.project_id === TENANT_B.projectId)).toBe(false);
  });

  it("Admin A cannot access Project B by known id", () => {
    const denied = denyCrossTenantAccess({
      actorProjectId: TENANT_A.projectId,
      resourceProjectId: TENANT_B.projectId,
    });
    expect(denied.allowed).toBe(false);
    expect(denied.status).toBe(404);
    expect(assertSameProject(TENANT_A.projectId, TENANT_B.projectId).ok).toBe(false);
  });

  it("known Task B / Agent B ids do not bypass isolation", () => {
    const taskLeak = filterRowsByProject(rows, TENANT_A.projectId).find(
      (r) => r.id === TENANT_B.taskId
    );
    const agentLeak = filterRowsByProject(rows, TENANT_A.projectId).find(
      (r) => r.id === TENANT_B.agentId
    );
    expect(taskLeak).toBeUndefined();
    expect(agentLeak).toBeUndefined();
  });

  it("pagination/search/counts/exports stay scoped to actor project", () => {
    const page = filterRowsByProject(rows, TENANT_A.projectId).slice(0, 50);
    const search = page.filter((r) => String(r.title || "").includes("B"));
    expect(page).toHaveLength(2);
    expect(search).toHaveLength(0);
    expect(page.length).toBe(
      rows.filter((r) => r.project_id === TENANT_A.projectId).length
    );
  });

  it("Member A cannot perform Admin-only Project A actions", () => {
    const memberCaps = capabilitiesForRole(TENANT_A.memberRole);
    expect(hasCapability(memberCaps, CAPABILITIES.MANAGE_PROJECTS)).toBe(false);
    expect(hasCapability(memberCaps, CAPABILITIES.LIVE_PILOT_AUTHORIZE)).toBe(false);
    expect(hasCapability(memberCaps, CAPABILITIES.PROJECT_READ)).toBe(true);
  });

  it("Admin B cannot access Project A", () => {
    const denied = denyCrossTenantAccess({
      actorProjectId: TENANT_B.projectId,
      resourceProjectId: TENANT_A.projectId,
    });
    expect(denied.allowed).toBe(false);
  });

  it("suspended and removed memberships fail closed", () => {
    expect(
      denySuspendedOrRemoved(
        makeMembershipFixture({
          userId: TENANT_A.adminUserId,
          role: "admin",
          status: "suspended",
        })
      ).allowed
    ).toBe(false);
    expect(
      denySuspendedOrRemoved(
        makeMembershipFixture({
          userId: TENANT_A.adminUserId,
          role: "admin",
          revokedAt: new Date().toISOString(),
        })
      ).allowed
    ).toBe(false);
  });

  it("unknown role denied", () => {
    expect(denyUnknownRole("superuser").allowed).toBe(false);
    expect(denyUnknownRole("admin").allowed).toBe(true);
  });

  it("missing tenant/project context denied", () => {
    expect(
      denyCrossTenantAccess({ actorProjectId: null, resourceProjectId: TENANT_B.projectId })
        .allowed
    ).toBe(false);
    expect(assertSameProject(null, TENANT_A.projectId).ok).toBe(false);
  });

  it("audit actor payload never includes secrets", () => {
    const actor = auditActorFromTenantContext({
      userId: TENANT_A.adminUserId,
      role: "admin",
      organizationId: TENANT_A.organizationId,
      projectId: TENANT_A.projectId,
      membershipId: "mem-1",
      platformAdmin: false,
    });
    const blob = JSON.stringify(actor);
    expect(blob).not.toMatch(/sk-/);
    expect(blob).not.toContain("service_role");
    expect(blob).not.toContain("Authorization");
    expect(actor.actorId).toBe(TENANT_A.adminUserId);
  });
});

describe("inventories", () => {
  it("route inventory lists high/medium risks for single-tenant gaps", () => {
    expect(ROUTE_AUTH_INVENTORY.length).toBeGreaterThan(5);
    const risks = summarizeRouteInventoryRisks();
    expect(risks.some((r) => /projects|optional project_id|membership/i.test(JSON.stringify(r)))).toBe(
      true
    );
  });

  it("service-role inventory forbids browser and requires prior authz", () => {
    expect(SERVICE_ROLE_INVENTORY.browserForbidden).toBe(true);
    expect(SERVICE_ROLE_INVENTORY.factory).toContain("getSupabaseAdmin");
    expect(SERVICE_ROLE_INVENTORY.requiredControls.length).toBeGreaterThan(3);
  });
});

describe("resolveAdminTenantContext outcomes", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
    delete process.env.MIANX_ADMIN_BOOTSTRAP;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  it("returns unauthenticated when session missing", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    vi.doMock("@/lib/csrf", () => ({
      assertMutationOrigin: vi.fn(),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: vi.fn(() => ({ from: vi.fn() })),
      };
    });
    const { resetAdminMembershipCache } = await import("../admin-auth");
    resetAdminMembershipCache();
    const { resolveAdminTenantContext, TENANT_CONTEXT_OUTCOMES: OUT } = await import(
      "../tenant-context"
    );
    const ctx = await resolveAdminTenantContext({});
    expect(ctx.ok).toBe(false);
    expect(ctx.outcome).toBe(OUT.UNAUTHENTICATED);
  });
});
