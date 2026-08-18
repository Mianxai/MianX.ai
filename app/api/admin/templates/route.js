import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { actorFromUser } from "@/lib/admin-auth";
import {
  ENGINE_VERSION,
  overviewCounts,
  seedCatalogVersions,
  listIndustryTemplates,
  listBusinessModelTemplates,
  listCapabilityTemplates,
  listDepartmentTemplates,
  listModuleTemplates,
  listWorkflowTemplates,
  listComplianceTemplates,
  listArchitectureTemplates,
  listRiskTemplates,
  listKpiTemplates,
  listCatalogRelations,
  listTemplateVersions,
  matchTemplates,
  runTemplateIntelligencePlan,
  assertAcyclic,
  impactAnalysis,
  traverseDependencies,
  assessLearningProposal,
  proposeTemplateImprovements,
  buildTemplateMemoryCandidates,
  explainLineage,
} from "@/lib/core/template-intelligence";

export const dynamic = "force-dynamic";

let seeded = false;
function ensureSeed() {
  if (!seeded) {
    seedCatalogVersions();
    seeded = true;
  }
}

/**
 * GET /api/admin/templates
 * Query: kind, slug, q, action=match|plan|graph|versions
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  ensureSeed();
  assertAcyclic(listCatalogRelations());

  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  const slug = url.searchParams.get("slug");
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const action = url.searchParams.get("action");

  if (action === "overview" || (!kind && !action)) {
    return NextResponse.json({
      ok: true,
      engine_version: ENGINE_VERSION,
      counts: overviewCounts(),
      note: "Template Intelligence is deterministic catalog logic. Provider optional.",
    });
  }

  if (action === "versions" && kind && slug) {
    return NextResponse.json({
      ok: true,
      kind,
      slug,
      versions: listTemplateVersions(kind, slug),
    });
  }

  if (action === "impact" && kind && slug) {
    return NextResponse.json({
      ok: true,
      impact: impactAnalysis(kind, slug),
      dependencies: traverseDependencies(kind, slug),
    });
  }

  if (action === "relations") {
    return NextResponse.json({ ok: true, relations: listCatalogRelations() });
  }

  const catalogs = {
    industry: listIndustryTemplates({ includeDeprecated: true }),
    business_model: listBusinessModelTemplates({ includeDeprecated: true }),
    capability: listCapabilityTemplates({ includeDeprecated: true }),
    department: listDepartmentTemplates({ includeDeprecated: true }),
    module: listModuleTemplates({ includeDeprecated: true }),
    workflow: listWorkflowTemplates({ includeDeprecated: true }),
    compliance: listComplianceTemplates({ includeDeprecated: true }),
    architecture: listArchitectureTemplates({ includeDeprecated: true }),
    risk: listRiskTemplates({ includeDeprecated: true }),
    kpi: listKpiTemplates({ includeDeprecated: true }),
  };

  let items = kind ? catalogs[kind] || [] : Object.values(catalogs).flat();
  if (slug) items = items.filter((t) => t.slug === slug);
  if (q) {
    items = items.filter(
      (t) =>
        t.slug.includes(q) ||
        t.name.toLowerCase().includes(q) ||
        String(t.description || "")
          .toLowerCase()
          .includes(q)
    );
  }

  return NextResponse.json({
    ok: true,
    engine_version: ENGINE_VERSION,
    kind: kind || "all",
    count: items.length,
    items,
  });
});

/**
 * POST /api/admin/templates
 * body.action: match | plan | learn_assess | memory_candidates
 */
export const POST = withErrorHandling(async (req) => {
  // SECURITY: derive actor from authenticated session
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  ensureSeed();
  const body = await req.json().catch(() => ({}));
  const action = body.action || "plan";

  if (action === "match") {
    return NextResponse.json({ ok: true, result: matchTemplates(body.input || body) });
  }
  if (action === "plan") {
    const plan = runTemplateIntelligencePlan(body.input || body, {
      actor:       actor,
    });
    return NextResponse.json({ ok: true, plan });
  }
  if (action === "learn_assess") {
    return NextResponse.json({
      ok: true,
      assessment: assessLearningProposal(body.proposal || {}),
    });
  }
  if (action === "learn_propose") {
    const plan = runTemplateIntelligencePlan(body.input || body);
    return NextResponse.json({
      ok: true,
      proposals: proposeTemplateImprovements(plan),
    });
  }
  if (action === "memory_candidates") {
    const plan = runTemplateIntelligencePlan(body.input || body);
    return NextResponse.json({
      ok: true,
      candidates: buildTemplateMemoryCandidates(plan, {
        projectId: body.project_id || null,
      }),
    });
  }
  if (action === "explain_lineage") {
    return NextResponse.json({
      ok: true,
      steps: explainLineage(body.lineage || {}),
    });
  }

  return NextResponse.json(
    { error: { code: "BAD_REQUEST", message: `Unknown action: ${action}` } },
    { status: 400 }
  );
});
