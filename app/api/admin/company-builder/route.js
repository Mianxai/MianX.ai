import { NextResponse } from "next/server";
import {
  withErrorHandling,
  notConfigured,
  validationError,
} from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import {
  runCompanyBuilder,
  listBlueprintsAsync,
  getBlueprintAsync,
  decideCompanyBlueprint,
} from "@/lib/core/company-builder";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/company-builder?project_id=&id=
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const projectIdRaw = url.searchParams.get("project_id");
  let projectId = null;
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
  }

  if (id) {
    const blueprint = await getBlueprintAsync(id);
    if (!blueprint) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Blueprint not found." } },
        { status: 404 }
      );
    }
    if (projectId && blueprint.project_id && blueprint.project_id !== projectId) {
      return NextResponse.json(
        { error: { code: "FORBIDDEN", message: "Cross-project access denied." } },
        { status: 403 }
      );
    }
    return NextResponse.json({ generatedAt: new Date().toISOString(), blueprint });
  }

  const blueprints = await listBlueprintsAsync({ projectId });
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    blueprints,
    note: "Company Builder is a planning engine. It does not build RestaurantOS or other industry products. Blueprints hydrate from durable task snapshots.",
  });
});

/**
 * POST /api/admin/company-builder
 * body: { objective, project_id } | { id, decision }
 */
export const POST = withErrorHandling(async (req) => {
  const admin = await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  rateLimit(`admin:company-builder:${admin.id || admin.email || "x"}`, {
    max: 20,
    windowMs: 60_000,
  });

  const body = await parseJsonBody(req, 16_384);

  if (body.decision && body.id) {
    if (!["approved", "rejected"].includes(body.decision)) {
      throw validationError("decision must be approved or rejected.");
    }
    const blueprint = await decideCompanyBlueprint({
      blueprintId: body.id,
      decision: body.decision,
      actor: admin.email || admin.id || "admin",
    });
    return NextResponse.json({ blueprint });
  }

  if (!body.objective || typeof body.objective !== "string") {
    throw validationError("objective text is required.");
  }
  if (!body.project_id) {
    throw validationError("project_id is required.");
  }
  assertUuid(body.project_id, "project_id");

  const blueprint = await runCompanyBuilder({
    objective: body.objective,
    projectId: body.project_id,
    actor: admin.email || admin.id || "admin",
  });

  return NextResponse.json({ blueprint }, { status: 201 });
});
