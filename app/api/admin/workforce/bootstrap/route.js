/**
 * POST /api/admin/workforce/bootstrap
 *
 * Secure Production bootstrap — runs inside Vercel where sensitive env is available.
 * Modes: preflight | apply | idempotency
 * Never accepts credentials from the client. Never returns secrets.
 */

import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireCapability, CAPABILITIES } from "@/lib/admin-auth";
import { parseJsonBody } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { buildAuditEntry, recordAudit } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapPreflight,
  runProductionBootstrapApply,
  runProductionBootstrapIdempotencyCheck,
} from "@/lib/core/workforce-i2/production-bootstrap";

export const dynamic = "force-dynamic";

const MAX_BODY = 4_096;

function requestId(req) {
  return (
    req.headers.get("x-request-id") ||
    req.headers.get("x-vercel-id") ||
    `boot-${Date.now().toString(36)}`
  );
}

function safeResponse(payload) {
  const {
    ok,
    mode,
    wrote,
    code,
    errors,
    compilationOk,
    schemaReady,
    bootstrapRequired,
    bootstrapBlockedReason,
    planned,
    created,
    updated,
    duplicates,
    compiledSeats,
    uniqueSeatIds,
    mappedSeats,
    orphanSeats,
    duplicateSeats,
    departmentCount,
    archetypeCount,
    workflowFamilyCount,
    workflowFamiliesRequired,
    persistedSeats,
    readyToAllocateSeats,
    allocatedSeats,
    activeInstances,
    liveTestedSeats,
    bootstrapStatus,
    schemaPresent,
    databaseConfigured,
    providerConfigured,
    liveExecutionReady,
    idempotent,
    message,
  } = payload;
  return {
    ok: Boolean(ok),
    mode,
    wrote: Boolean(wrote),
    code: code || null,
    errors: Array.isArray(errors) ? errors.slice(0, 20) : [],
    confirmationRequired: BOOTSTRAP_CONFIRMATION,
    compilationOk,
    schemaReady,
    bootstrapRequired,
    bootstrapBlockedReason: bootstrapBlockedReason || null,
    planned: planned || null,
    created: created ?? null,
    updated: updated ?? null,
    duplicates: duplicates ?? null,
    compiledSeats,
    uniqueSeatIds,
    mappedSeats,
    orphanSeats,
    duplicateSeats,
    departmentCount,
    archetypeCount,
    workflowFamilyCount,
    workflowFamiliesRequired,
    persistedSeats,
    readyToAllocateSeats,
    allocatedSeats,
    activeInstances,
    liveTestedSeats,
    bootstrapStatus,
    schemaPresent,
    databaseConfigured,
    providerConfigured,
    liveExecutionReady: liveExecutionReady === true,
    idempotent: idempotent ?? null,
    message: message || null,
    note: "Secrets are never returned. Foundation bootstrap does not require an AI provider key.",
  };
}

async function auditBootstrap(actorId, action, metadata) {
  const admin = getSupabaseAdmin();
  await recordAudit(
    admin,
    buildAuditEntry({
      actor: actorId,
      actorType: "admin",
      action,
      resourceType: "workforce_bootstrap",
      resourceId: "capacity-445",
      metadata,
    })
  );
}

export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_AGENTS);
  rateLimit(`admin-workforce-bootstrap:${user.id}`, { max: 10, windowMs: 60_000 });

  const rid = requestId(req);
  const body = await parseJsonBody(req, MAX_BODY);
  const mode = String(body.mode || "").trim().toLowerCase();

  if (!["preflight", "apply", "idempotency"].includes(mode)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_MODE",
        errors: ["mode must be preflight | apply | idempotency"],
      },
      { status: 400 }
    );
  }

  if (mode === "preflight") {
    await auditBootstrap(user.id, "workforce.bootstrap.preflight", {
      requestId: rid,
      actorId: user.id,
    });
    const result = await runProductionBootstrapPreflight();
    return NextResponse.json(safeResponse(result));
  }

  const confirmation = String(body.confirmation || "");
  if (confirmation !== BOOTSTRAP_CONFIRMATION) {
    await auditBootstrap(user.id, "workforce.bootstrap.rejected", {
      requestId: rid,
      actorId: user.id,
      reason: "INVALID_CONFIRMATION",
      mode,
    });
    return NextResponse.json(
      safeResponse({
        ok: false,
        mode,
        wrote: false,
        code: "INVALID_CONFIRMATION",
        errors: [`confirmation must be exactly "${BOOTSTRAP_CONFIRMATION}"`],
      }),
      { status: 400 }
    );
  }

  const runner =
    mode === "idempotency"
      ? runProductionBootstrapIdempotencyCheck
      : runProductionBootstrapApply;

  await auditBootstrap(user.id, `workforce.bootstrap.${mode}.attempt`, {
    requestId: rid,
    actorId: user.id,
  });

  const result = await runner({ confirmation });
  await auditBootstrap(
    user.id,
    result.ok ? `workforce.bootstrap.${mode}.success` : `workforce.bootstrap.${mode}.failed`,
    {
      requestId: rid,
      actorId: user.id,
      ok: result.ok,
      created: result.created ?? null,
      persistedSeats: result.persistedSeats ?? null,
      code: result.code || null,
    }
  );

  return NextResponse.json(safeResponse(result), {
    status: result.ok ? 200 : 422,
  });
});

export const GET = withErrorHandling(async (req) => {
  // Read-only status for the activation page — same as preflight without mutation audit spam.
  await requireCapability(req, CAPABILITIES.MANAGE_AGENTS);
  const result = await runProductionBootstrapPreflight();
  return NextResponse.json(safeResponse(result));
});
