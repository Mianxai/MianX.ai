import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  buildWorkforceCompletionMatrix,
  classifyCatalogueGaps,
  auditCanonicalWorkflows,
  buildPhaseIProductionReadiness,
  assertWorkflowRoutingCoverage,
  auditQueueReliabilityPath,
} from "@/lib/core/workforce-completion";
import {
  buildFoundationMetrics,
  sanitizeFoundationMetrics,
} from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const matrix = buildWorkforceCompletionMatrix();
  const foundation = sanitizeFoundationMetrics(
    await buildFoundationMetrics({ productionMode: true })
  );
  return NextResponse.json({
    ok: true,
    foundation,
    verify: foundation,
    matrix,
    classification: classifyCatalogueGaps(),
    workflows: auditCanonicalWorkflows(),
    routing: assertWorkflowRoutingCoverage(),
    queue: auditQueueReliabilityPath(),
    productionReadiness: buildPhaseIProductionReadiness(),
  });
});
