// Internal worker/cron authentication.
//
// The tick endpoint may only be invoked with a server-side secret
// (INTERNAL_RUNTIME_SECRET, falling back to CRON_SECRET for Vercel Cron).
// Comparison is constant-time; the secret value is never logged, echoed or
// included in any error. Browser clients can never call privileged execution:
// there is no cookie/session path here at all.

import { createHash, timingSafeEqual } from "crypto";
import { ApiError, ERROR_CODES, notConfigured } from "./errors";

function constantTimeMatch(a, b) {
  const ha = createHash("sha256").update(String(a)).digest();
  const hb = createHash("sha256").update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}

export function getInternalSecrets() {
  return [process.env.INTERNAL_RUNTIME_SECRET, process.env.CRON_SECRET].filter(
    (s) => typeof s === "string" && s.length >= 16
  );
}

// Throws 503 when no secret is configured server-side (nothing can ever
// authenticate), 401 for a missing/invalid credential. Returns a worker id.
export function requireInternalWorker(req) {
  const secrets = getInternalSecrets();
  if (secrets.length === 0) {
    throw notConfigured(
      "Internal runtime worker is not configured on this deployment.",
      "WORKER_NOT_CONFIGURED"
    );
  }

  const auth = req.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const headerSecret = req.headers.get("x-internal-secret") || "";
  const supplied = bearer || headerSecret;

  if (!supplied || !secrets.some((s) => constantTimeMatch(supplied, s))) {
    throw new ApiError(
      401,
      ERROR_CODES.UNAUTHORIZED,
      "Unauthorized."
    );
  }

  return { workerId: "internal-worker" };
}
