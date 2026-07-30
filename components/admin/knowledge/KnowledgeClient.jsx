"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import ScopeBadge from "@/components/admin/ScopeBadge";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

const CATALOGUE_METRIC_ORDER = [
  "industries",
  "business_models",
  "capabilities",
  "departments",
  "modules",
  "workflows",
  "compliance",
  "architecture",
  "risks",
  "kpis",
];

const CATALOGUE_METRIC_LABELS = {
  industries: "Industries",
  business_models: "Business models",
  capabilities: "Capabilities",
  departments: "Departments",
  modules: "Modules",
  workflows: "Workflows",
  compliance: "Compliance",
  architecture: "Architecture",
  risks: "Risks",
  kpis: "KPIs",
};

const ORG_SECTION_KEYS = new Set(["organization", "global_templates"]);

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/knowledge"));
    return { ok: false, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data };
}

function projectDisplayName(projects, projectId) {
  if (!projectId) return null;
  return projects.find((p) => p.id === projectId)?.name || null;
}

function catalogueTotal(counts) {
  if (!counts || typeof counts !== "object") return 0;
  return Object.values(counts).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function bannerHasReviewPlan(opsSummary) {
  const next = opsSummary?.next_founder_action;
  const canonical = opsSummary?.canonical_integration_run;
  return (
    next?.id === "review_plan" ||
    next?.label === "Review Plan" ||
    canonical?.proof_status === "awaiting_plan_approval" ||
    canonical?.stage === "founder_approval_required"
  );
}

function classifyEvidenceItem(item, opsSummary) {
  const canonical = opsSummary?.canonical_integration_run;
  const id = item.resourceId || item.id;
  const status = String(item.status || item.action || "").toLowerCase();
  const proofStatus = String(
    item.proof_status || canonical?.proof_status || ""
  ).toLowerCase();
  const stage = String(item.action || item.stage || "").toLowerCase();

  if (
    ["cancelled", "rejected", "failed", "archived"].includes(status) ||
    ["cancelled", "rejected", "failed", "archived"].includes(proofStatus)
  ) {
    return { kind: "cancelled", label: "Cancelled history" };
  }

  const isCanonical = canonical?.id && canonical.id === id;
  if (isCanonical || (!canonical && item.is_canonical_active)) {
    if (
      proofStatus === "awaiting_plan_approval" ||
      stage === "founder_approval_required" ||
      status === "awaiting_plan_approval"
    ) {
      return { kind: "plan_approval", label: "Plan approval" };
    }
    if (
      [
        "awaiting_simulation_approval",
        "simulation_approved",
        "simulation_running",
        "awaiting_final_review",
      ].includes(proofStatus) ||
      /simulation|final_review|evidence/.test(stage)
    ) {
      return { kind: "simulation", label: "Later simulation / evidence" };
    }
    return { kind: "active", label: "Active canonical" };
  }

  if (
    proofStatus === "awaiting_plan_approval" ||
    stage === "founder_approval_required"
  ) {
    return { kind: "plan_approval", label: "Plan approval" };
  }
  if (/simulation|awaiting_simulation|simulation_/.test(`${proofStatus} ${stage}`)) {
    return { kind: "simulation", label: "Later simulation / evidence" };
  }
  return { kind: "history", label: "Proof history" };
}

function compactEmptyForSection(key, { projectId, hasReviewPlan, opsSummary }) {
  const reviewHref = projectId
    ? `/admin/integration?project_id=${encodeURIComponent(projectId)}${
        opsSummary?.canonical_integration_run?.id
          ? `&run_id=${encodeURIComponent(opsSummary.canonical_integration_run.id)}`
          : ""
      }&tab=plan`
    : "/admin/integration";

  if (key === "workflow_outputs") {
    return {
      title: "No workflow outputs yet",
      reason: projectId
        ? "No completed workflow/run outputs are stored for this project."
        : "Select a project to inspect workflow outputs.",
      prerequisite: "Requires finished workflow instances after simulation starts.",
      nextAction: hasReviewPlan
        ? null
        : projectId
          ? "Open Outputs after simulation produces results."
          : "Select a project, then open Outputs.",
      cta: hasReviewPlan ? (
        <Link className="header-btn-ghost" href={reviewHref}>
          Review Plan
        </Link>
      ) : (
        <Link
          className="header-btn-ghost"
          href={projectId ? `/admin/outputs?project_id=${encodeURIComponent(projectId)}` : "/admin/outputs"}
        >
          Open Outputs
        </Link>
      ),
    };
  }

  if (key === "agent_results") {
    return {
      title: "No agent runtime results yet",
      reason: "Agent Runtime Runs are empty for this scope — distinct from Founder Proof runs.",
      prerequisite: "Runtime jobs must execute after the proof simulation path.",
      nextAction: hasReviewPlan
        ? null
        : "Open Agent Results once runtime jobs complete.",
      cta: (
        <Link
          className="header-btn-ghost"
          href={
            projectId
              ? `/admin/runtime/runs?project_id=${encodeURIComponent(projectId)}`
              : "/admin/runtime/runs"
          }
        >
          Open Agent Results
        </Link>
      ),
    };
  }

  if (key === "verified_memory") {
    return {
      title: "No verified memory yet",
      reason: "Only verified/active memory entries appear here.",
      prerequisite: "Memory candidates must be Founder-verified after evidence review.",
      nextAction: hasReviewPlan
        ? null
        : "Open Memory after the proof produces candidates.",
      cta: (
        <Link
          className="header-btn-ghost"
          href={projectId ? `/admin/memory?project_id=${encodeURIComponent(projectId)}` : "/admin/memory"}
        >
          Open Memory
        </Link>
      ),
    };
  }

  if (key === "integration_evidence") {
    const canonical = opsSummary?.canonical_integration_run;
    const proofStatus = canonical?.proof_status;
    let reason = "No Founder Proof evidence rows for this project yet.";
    let prerequisite = "Evidence attaches after simulation produces artifacts.";
    if (!projectId) {
      reason = "Select a project to load Founder Proof evidence.";
      prerequisite = "Evidence is project-scoped.";
    } else if (
      proofStatus === "awaiting_plan_approval" ||
      canonical?.stage === "founder_approval_required"
    ) {
      reason = "Active proof is waiting for plan approval — evidence comes later.";
      prerequisite = "Approve the plan, then simulation approval, then start simulation.";
    } else if (proofStatus === "awaiting_simulation_approval") {
      reason = "Plan is approved; simulation has not started — no evidence yet.";
      prerequisite = "Founder must approve and start deterministic simulation.";
    } else if (
      ["simulation_approved", "simulation_running"].includes(proofStatus || "")
    ) {
      reason = "Simulation path is active; evidence may still be assembling.";
      prerequisite = "Wait for simulation steps to attach evidence artifacts.";
    }
    return {
      title: "No Founder Proof evidence yet",
      reason,
      prerequisite,
      nextAction: hasReviewPlan ? null : "Open Founder Proof Evidence when ready.",
      cta: hasReviewPlan ? (
        <Link className="header-btn-ghost" href={reviewHref}>
          Review Plan
        </Link>
      ) : (
        <Link
          className="header-btn-ghost"
          href={
            projectId
              ? `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=evidence`
              : "/admin/integration"
          }
        >
          Open Founder Proof Evidence
        </Link>
      ),
    };
  }

  return {
    title: `No ${key.replace(/_/g, " ")} yet`,
    reason: "Nothing stored in this section for the current scope.",
    prerequisite: null,
    nextAction: hasReviewPlan ? null : "Continue Founder Proof, then reopen Knowledge.",
    cta: null,
  };
}

export default function KnowledgeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/knowledge",
  });
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [kRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/knowledge${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!kRes.ok) {
      setError(kRes.data?.error?.message || "Failed to load knowledge");
      return;
    }
    setData(kRes.data);
    if (ccRes.ok) setProjects(ccRes.data?.projects || []);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const projectLabel = projectDisplayName(projects, projectId);
  const counts = data?.catalogue_counts || null;
  const countsTotal = catalogueTotal(counts);
  const hasReviewPlan = bannerHasReviewPlan(opsSummary);

  return (
    <AdminShell
      title="Knowledge"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => {
              const v = e.target.value;
              router.replace(
                v
                  ? `/admin/knowledge?project_id=${encodeURIComponent(v)}`
                  : "/admin/knowledge"
              );
            }}
            aria-label="Filter by project"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="cc-page admin-page-compact">
        <p className="cc-muted">
          Distinguishes organisation operating knowledge, global templates, project knowledge,
          workflow outputs, agent results, Founder Proof evidence, and verified memory.
        </p>
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
        {data?.canonical_objective ? (
          <p className="cc-muted" data-testid="knowledge-canonical-objective">
            Canonical objective: <strong>{data.canonical_objective.title}</strong>
            {data.canonical_stage ? ` · Stage: ${data.canonical_stage}` : ""}
          </p>
        ) : null}
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading knowledge…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data ? (
          <>
            <p className="cc-muted">{data.isolationNote}</p>
            {Object.entries(data.sections || {}).map(([key, section]) => {
              const isGlobalTemplates = key === "global_templates";
              const isOrg = ORG_SECTION_KEYS.has(key);
              const hasCatalogue =
                isGlobalTemplates &&
                (countsTotal > 0 ||
                  (Array.isArray(section.items) && section.items.length > 0));
              const items = Array.isArray(section.items) ? section.items : [];
              const showEmpty =
                section.available !== false && !hasCatalogue && items.length === 0;
              const compactEmpty = [
                "workflow_outputs",
                "agent_results",
                "verified_memory",
                "integration_evidence",
              ].includes(key);
              const emptyCopy = showEmpty
                ? compactEmptyForSection(key, {
                    projectId,
                    projectLabel,
                    hasReviewPlan,
                    opsSummary,
                  })
                : null;

              return (
                <section
                  key={key}
                  className={`cc-card${compactEmpty && showEmpty ? " admin-card-compact" : ""}`}
                  aria-labelledby={`kn-${key}`}
                >
                  <div className="cc-card-head">
                    <div className="knowledge-section-title">
                      <h2 id={`kn-${key}`}>{section.label}</h2>
                      <ScopeBadge
                        scope={isOrg ? "organisation" : "project"}
                        label={
                          isOrg
                            ? "Organisation"
                            : projectLabel
                              ? `Project · ${projectLabel}`
                              : "Project"
                        }
                      />
                    </div>
                    {section.href ? (
                      <Link href={section.href} className="header-btn-ghost">
                        {section.action_label || "Open"}
                      </Link>
                    ) : null}
                  </div>
                  <p className="cc-muted">{section.note}</p>
                  {section.available === false ? (
                    <p className="cc-unavailable">Data unavailable</p>
                  ) : null}
                  {isGlobalTemplates && hasCatalogue ? (
                    <div data-testid="knowledge-catalogue-counts">
                      {counts ? (
                        <div
                          className="knowledge-metric-grid"
                          role="list"
                          aria-label="Global template catalogue counts"
                        >
                          {CATALOGUE_METRIC_ORDER.map((k) => (
                            <div key={k} className="knowledge-metric" role="listitem">
                              <span className="knowledge-metric-label">
                                {CATALOGUE_METRIC_LABELS[k] || k}
                              </span>
                              <strong className="knowledge-metric-value">
                                {Number(counts[k]) || 0}
                              </strong>
                            </div>
                          ))}
                          <div
                            className="knowledge-metric knowledge-metric--total"
                            role="listitem"
                          >
                            <span className="knowledge-metric-label">Total</span>
                            <strong className="knowledge-metric-value">{countsTotal}</strong>
                          </div>
                        </div>
                      ) : (
                        <div className="knowledge-metric-grid" role="list">
                          {items.slice(0, 12).map((item) => (
                            <div key={item.id} className="knowledge-metric" role="listitem">
                              <span className="knowledge-metric-label">
                                {item.action || item.id}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : key === "integration_evidence" && items.length > 0 ? (
                    <ul className="admin-compact-list knowledge-evidence-list">
                      {items.slice(0, 8).map((item) => {
                        const classified = classifyEvidenceItem(item, opsSummary);
                        return (
                          <li key={item.id}>
                            <span
                              className={`admin-inline-chip knowledge-evidence-chip is-${classified.kind}`}
                            >
                              {classified.label}
                            </span>{" "}
                            <code>{item.action || item.id}</code>
                            {item.createdAt ? (
                              <span className="cc-muted"> · {item.createdAt}</span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : items.length > 0 ? (
                    <ul className="admin-compact-list">
                      {items.slice(0, 8).map((item) => (
                        <li key={item.id} className="cc-muted">
                          {item.action || item.agentSlug || item.id}
                          {item.createdAt ? ` · ${item.createdAt}` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : showEmpty && compactEmpty && emptyCopy ? (
                    <EmptyState
                      compact
                      title={emptyCopy.title}
                      reason={emptyCopy.reason}
                      configuration={emptyCopy.prerequisite}
                      nextAction={emptyCopy.nextAction}
                      projectLabel={
                        isOrg ? "Organisation" : projectLabel || (projectId ? projectId : "All projects")
                      }
                      cta={emptyCopy.cta}
                    />
                  ) : showEmpty ? (
                    <EmptyState
                      compact
                      title={`No ${section.label || key} yet`}
                      reason={
                        !projectId && key === "project"
                          ? "Select a project to load project knowledge."
                          : "No audit or run results in this section for the current scope."
                      }
                      nextAction={
                        hasReviewPlan
                          ? null
                          : key === "project"
                            ? "Select a project or open Audit after work runs."
                            : "Continue project work, then reopen Knowledge."
                      }
                      projectLabel={projectLabel || (projectId ? projectId : "All projects")}
                      cta={
                        section.href ? (
                          <Link className="header-btn-ghost" href={section.href}>
                            Open
                          </Link>
                        ) : null
                      }
                    />
                  ) : null}
                </section>
              );
            })}
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
