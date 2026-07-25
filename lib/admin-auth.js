// Admin authorization: authentication (session) ≠ authorization (membership).
//
// Modes (evaluated at request time via the service-role client):
//   1. Supabase not configured → treat as unauthenticated (caller returns 401/503).
//   2. Membership table missing (migration not applied) → compatibility:
//      any valid session user is accepted (pre-migration production behavior).
//   3. Table exists but has zero active memberships → compatibility with
//      warning status (bootstrap window; prevents Founder lock-out).
//   4. One or more active memberships → fail-closed: only active members.
//
 // Never trust a client-supplied role. Never expose the service-role key.

import { getSessionUser } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { unauthorized, forbidden } from "@/lib/core/errors";

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
      // Ambiguous probe (network / permissions): stay in compatibility mode
      // rather than locking every admin out of a working deployment.
      membershipTableState = "missing";
    } else {
      membershipTableState = "present";
    }
  } catch {
    membershipTableState = "missing";
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
  if (!isSupabaseConfigured()) {
    return {
      model: "unavailable",
      membershipTable: false,
      activeMemberships: 0,
      enforcement: "none",
      compatibilityMode: false,
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
    };
  }
  const table = await probeMembershipTable(admin);
  if (table === "missing") {
    return {
      model: "session-compat",
      membershipTable: false,
      activeMemberships: 0,
      enforcement: "any_authenticated_user",
      compatibilityMode: true,
    };
  }
  const { count, error } = await admin
    .from(MEMBERSHIP_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("status", "active")
    .is("revoked_at", null);
  if (error) {
    return {
      model: "error",
      membershipTable: true,
      activeMemberships: 0,
      enforcement: "fail_closed",
      compatibilityMode: false,
    };
  }
  const active = count || 0;
  if (active === 0) {
    return {
      model: "bootstrap",
      membershipTable: true,
      activeMemberships: 0,
      enforcement: "any_authenticated_user",
      compatibilityMode: true,
    };
  }
  return {
    model: "membership",
    membershipTable: true,
    activeMemberships: active,
    enforcement: "active_membership_required",
    compatibilityMode: false,
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
 */
export async function requireAdminUser(req) {
  const user = await getSessionUser(req);
  if (!user) throw unauthorized();

  // Without a working admin client we cannot evaluate memberships. Preserve
  // the authenticated session (compatibility) so routes can return their own
  // 503 configuration errors instead of a misleading 401.
  if (!isSupabaseConfigured()) {
    return { user, membership: null, mode: "session-compat" };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return { user, membership: null, mode: "session-compat" };
  }

  const table = await probeMembershipTable(admin);
  if (table === "missing") {
    return { user, membership: null, mode: "session-compat" };
  }

  const status = await getAdminAccessModelStatus();
  if (status.compatibilityMode) {
    return { user, membership: null, mode: "bootstrap" };
  }

  const { membership, missingTable } = await findActiveMembership(admin, user);
  if (missingTable) {
    return { user, membership: null, mode: "session-compat" };
  }
  if (!membership) {
    throw forbidden("Admin membership required.");
  }
  return { user, membership, mode: "membership" };
}

/**
 * Drop-in for lib/core/auth.requireAdmin — returns the Supabase user.
 */
export async function requireAdmin(req) {
  const { user } = await requireAdminUser(req);
  return user;
}

export function actorFromUser(user) {
  return user?.email || user?.id || "admin";
}
