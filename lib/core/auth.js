// Authorization helpers for Mianx Core API routes. Delegates to the shared
// admin-membership model (lib/admin-auth.js) so every protected admin/core
 // route uses the same fail-closed checks.

import {
  requireAdmin,
  actorFromUser,
  requireAdminUser,
  requireCapability,
  CAPABILITIES,
} from "@/lib/admin-auth";

export {
  requireAdmin,
  actorFromUser,
  requireAdminUser,
  requireCapability,
  CAPABILITIES,
};

export {
  resolveAdminTenantContext,
  requireCapabilityAndProject,
  assertSameProject,
  rejectUntrustedScopeClaims,
  auditActorFromTenantContext,
  TENANCY_MODEL,
  TENANT_CONTEXT_OUTCOMES,
} from "@/lib/tenant-context";
