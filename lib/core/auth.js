// Authorization helpers for Mianx Core API routes. Reuses the existing
// cookie-based admin session (lib/auth.js) so behaviour matches the rest of
// the admin area, and normalizes "not authenticated" into a standardized
// ApiError the route wrapper can render.

import { getSessionUser } from "@/lib/auth";
import { unauthorized } from "./errors";

// Returns the authenticated admin user or throws a standardized 401.
export async function requireAdmin(req) {
  const user = await getSessionUser(req);
  if (!user) throw unauthorized();
  return user;
}

// A stable actor string for audit logging.
export function actorFromUser(user) {
  return user?.email || user?.id || "admin";
}
