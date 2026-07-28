"use client";

import { adminFetch } from "@/lib/admin-fetch";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

/**
 * Shared admin JSON GET with in-flight dedupe + 401 → login.
 */
export async function adminGetJson(path, router, loginFallback = "/admin") {
  const res = await adminFetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref(loginFallback));
    return { ok: false, status: 401, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}
