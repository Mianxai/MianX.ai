// Admin authorization: authentication (session) ≠ authorization (membership).
//
// Modes (evaluated at request time via the service-role client):
//   1. Supabase not configured → caller returns 401/503 as appropriate.
//   2. Membership table missing (migration not applied) → temporary
//      compatibility ONLY when MIANX_ADMIN_BOOTSTRAP=1; otherwise 403.
//   3. Table exists with zero active memberships → same bootstrap gate.
//   4. One or more active memberships → fail-closed: only active members,
//      with role capabilities enforced via requireCapability().
//
// Never trust a client-supplied role. Never expose the service-role key.

import { getSessionUser } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { unauthorized, forbidden } from "@/lib/core/errors";
import { assertMutationOrigin } from "@/lib/csrf";
import {
  capabilitiesForAuthContext,
  hasCapability,
  CAPABILITIES,
} from "@/lib/admin-capabilities";

const MEMBERSHIP_TABLE = "admin_memberships";

let membershipTableState = null; // null | "present" | "missing"
let membershipTableCheckedAt = 0;
const TABLE_CACHE_MS = 30_000;

function isUndefinedTableError(error) {
  if (!error) return false;
  const msg = `${error.message || ""} ${error.details || ""} ${error.hint || ""}`.toLowerCase();
  const code = error.code || "";
  return (
    code === "42P01" ||
    code === "PGRST205" ||
    msg.includes("does not exist") ||
    msg.includes("could not find the table")
  );
}

/** Explicit temporary bootstrap; never implied by an empty table alone. */
export function isAdminBootstrapEnabled() {
  return process.env.MIANX_ADMIN_BOOTSTRAP === "1";
}

async function probeMembershipTable(admin) {
  const now = Date.now();
  if (membershipTableState && now - membershipTableCheckedAt < TABLE_CACHE_MS) {
    return membershipTableState;
  }
  try {
    const { error } = await admin
      .from(MEMBERSHIP_TABLE)
      .select("id", { head: true, count: "exact" })
      .limit(1);
    if (error && isUndefinedTableError(error)) {
      membershipTableState = "missing";
    } else if (error) {
      // Ambiguous probe: treat as present so we fail closed rather than open.
      membershipTableState = "present";
    } else {
      membershipTableState = "present";
    }
  } catch {
    membershipTableState = "present";
  }
  membershipTableCheckedAt = now;
  return membershipTableState;
}

/** Test helper — clear cached probe result. */
export function resetAdminMembershipCache() {
  membershipTableState = null;
  membershipTableCheckedAt = 0;
}

/**
 * Returns a non-secret snapshot of the admin access model for settings UI.
 */
export async function getAdminAccessModelStatus() {
  try {
    return await getAdminAccessModelStatusUnsafe();
  } catch {
    // Incomplete clients / probe failures must not crash routes. Bootstrap
    // stays available only when explicitly enabled.
    if (isAdminBootstrapEnabled()) {
      return {
        model: "bootstrap",
        membershipTable: false,
        activeMemberships: 0,
        enforcement: "bootstrap_any_authenticated",
        compatibilityMode: true,
        bootstrapEnabled: true,
      };
    }
    return {
      model: "error",
      membershipTable: true,
      activeMemberships: 0,
      enforcement: "fail_closed",
      compatibilityMode: false,
      bootstrapEnabled: false,
    };
  }
}

async function getAdminAccessModelStatusUnsafe() {
  if (!isSupabaseConfigured()) {
    return {
      model: "unavailable",
      membershipTable: false,
      activeMemberships: 0,
      enforcement: "none",
      compatibilityMode: false,
      bootstrapEnabled: isAdminBootstrapEnabled(),
    };
  }
  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      model: "unavailable",
      membershipTable: false,
      activeMemberships: 0,
      enforcement: "none",
      compatibilityMode: false,
      bootstrapEnabled: isAdminBootstrapEnabled(),
    };
  }
  const table = await probeMembershipTable(admin);
  if (table === "missing") {
    const bootstrap = isAdminBootstrapEnabled();
    return {
      model: bootstrap ? "session-compat" : "locked",
      membershipTable: false,
      activeMemberships: 0,
      enforcement: bootstrap ? "bootstrap_any_authenticated" : "fail_closed",
      compatibilityMode: bootstrap,
      bootstrapEnabled: bootstrap,
    };
  }
  const { count, error } = await admin
    .from(MEMBERSHIP_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("status", "active")
    .is("revoked_at", null);
  if (error) {
    if (isUndefinedTableError(error)) {
      const bootstrap = isAdminBootstrapEnabled();
      return {
        model: bootstrap ? "session-compat" : "locked",
        membershipTable: false,
        activeMemberships: 0,
        enforcement: bootstrap ? "bootstrap_any_authenticated" : "fail_closed",
        compatibilityMode: bootstrap,
        bootstrapEnabled: bootstrap,
      };
    }
    return {
      model: "error",
      membershipTable: true,
      activeMemberships: 0,
      enforcement: "fail_closed",
      compatibilityMode: false,
      bootstrapEnabled: isAdminBootstrapEnabled(),
    };
  }
  const active = count || 0;
  if (active === 0) {
    const bootstrap = isAdminBootstrapEnabled();
    return {
      model: bootstrap ? "bootstrap" : "locked",
      membershipTable: true,
      activeMemberships: 0,
      enforcement: bootstrap ? "bootstrap_any_authenticated" : "fail_closed",
      compatibilityMode: bootstrap,
      bootstrapEnabled: bootstrap,
    };
  }
  return {
    model: "membership",
    membershipTable: true,
    activeMemberships: active,
    enforcement: "active_membership_required",
    compatibilityMode: false,
    bootstrapEnabled: isAdminBootstrapEnabled(),
  };
}

async function findActiveMembership(admin, user) {
  const byId = await admin
    .from(MEMBERSHIP_TABLE)
    .select("id, user_id, email, role, status, revoked_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .is("revoked_at", null)
    .maybeSingle();
  if (byId.error && isUndefinedTableError(byId.error)) return { missingTable: true };
  if (byId.error) throw byId.error;
  if (byId.data) return { membership: byId.data };

  if (user.email) {
    const byEmail = await admin
      .from(MEMBERSHIP_TABLE)
      .select("id, user_id, email, role, status, revoked_at")
      .ilike("email", user.email)
      .eq("status", "active")
      .is("revoked_at", null)
      .maybeSingle();
    if (byEmail.error && isUndefinedTableError(byEmail.error)) {
      return { missingTable: true };
    }
    if (byEmail.error) throw byEmail.error;
    if (byEmail.data) return { membership: byEmail.data };
  }
  return { membership: null };
}

/**
 * Resolve the authenticated admin for a protected route.
 * Throws ApiError 401 or 403 — never returns a non-admin user.
 * Also enforces Origin allowlist on mutating methods.
 */
export async function requireAdminUser(req) {
  assertMutationOrigin(req);

  const user = await getSessionUser(req);
  if (!user) throw unauthorized();

  if (!isSupabaseConfigured()) {
    // Routes that need Supabase will 503 themselves; without Supabase there
    // is no membership table to evaluate. Read-only health-style routes may
    // still call requireAdmin — grant session-compat only under bootstrap.
    if (!isAdminBootstrapEnabled()) {
      throw forbidden("Admin membership required. Membership bootstrap is disabled.");
    }
    const ctx = { user, membership: null, mode: "session-compat" };
    ctx.capabilities = capabilitiesForAuthContext(ctx);
    return ctx;
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    if (!isAdminBootstrapEnabled()) {
      throw forbidden("Admin membership required. Membership bootstrap is disabled.");
    }
    const ctx = { user, membership: null, mode: "session-compat" };
    ctx.capabilities = capabilitiesForAuthContext(ctx);
    return ctx;
  }

  const table = await probeMembershipTable(admin);
  if (table === "missing") {
    if (!isAdminBootstrapEnabled()) {
      throw forbidden(
        "Admin membership table is not available. Apply the memberships migration and bootstrap the Founder, or set MIANX_ADMIN_BOOTSTRAP=1 temporarily."
      );
    }
    const ctx = { user, membership: null, mode: "session-compat" };
    ctx.capabilities = capabilitiesForAuthContext(ctx);
    return ctx;
  }

  const status = await getAdminAccessModelStatus();
  if (status.model === "error") {
    if (isAdminBootstrapEnabled()) {
      const ctx = { user, membership: null, mode: "bootstrap" };
      ctx.capabilities = capabilitiesForAuthContext(ctx);
      return ctx;
    }
    throw forbidden("Admin membership could not be verified.");
  }
  if (status.model === "locked" || (status.activeMemberships === 0 && !status.compatibilityMode)) {
    throw forbidden(
      "No active admin memberships. Insert the Founder membership, or set MIANX_ADMIN_BOOTSTRAP=1 temporarily."
    );
  }
  if (status.compatibilityMode) {
    const ctx = { user, membership: null, mode: "bootstrap" };
    ctx.capabilities = capabilitiesForAuthContext(ctx);
    return ctx;
  }

  const { membership, missingTable } = await findActiveMembership(admin, user);
  if (missingTable) {
    if (!isAdminBootstrapEnabled()) {
      throw forbidden("Admin membership required.");
    }
    const ctx = { user, membership: null, mode: "session-compat" };
    ctx.capabilities = capabilitiesForAuthContext(ctx);
    return ctx;
  }
  if (!membership) {
    throw forbidden("Admin membership required.");
  }
  const ctx = { user, membership, mode: "membership" };
  ctx.capabilities = capabilitiesForAuthContext(ctx);
  return ctx;
}

/**
 * Drop-in for lib/core/auth.requireAdmin — returns the Supabase user.
 * Prefer requireAdminUser / requireCapability for new mutation routes.
 */
export async function requireAdmin(req) {
  const { user } = await requireAdminUser(req);
  return user;
}

/**
 * Require an authenticated admin with a specific capability.
 * Returns the full auth context ({ user, membership, mode, capabilities }).
 */
export async function requireCapability(req, capability) {
  const ctx = await requireAdminUser(req);
  if (!hasCapability(ctx.capabilities, capability)) {
    throw forbidden("Insufficient admin role for this action.");
  }
  return ctx;
}

export function actorFromUser(user) {
  return user?.email || user?.id || "admin";
}

export { CAPABILITIES, hasCapability, capabilitiesForAuthContext };
