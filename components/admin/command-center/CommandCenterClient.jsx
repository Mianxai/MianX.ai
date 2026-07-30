"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import AgentDetailDrawer from "@/components/admin/command-center/AgentDetailDrawer";
import OverviewMetrics from "@/components/admin/command-center/OverviewMetrics";
import DepartmentRail from "@/components/admin/command-center/DepartmentRail";
import WorkflowBoard from "@/components/admin/command-center/WorkflowBoard";
import CeoBriefPanel from "@/components/admin/command-center/CeoBriefPanel";
import SchedulePanel from "@/components/admin/command-center/SchedulePanel";
import AgentListFallback from "@/components/admin/command-center/AgentListFallback";
import OpsStatusBar from "@/components/admin/command-center/OpsStatusBar";
import CeoOrchestratorCard from "@/components/admin/command-center/CeoOrchestratorCard";
import FounderAuthorityBanner from "@/components/admin/command-center/FounderAuthorityBanner";
import ExecutionPanel from "@/components/admin/command-center/ExecutionPanel";
import FounderGuidedPanel from "@/components/admin/FounderGuidedPanel";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import FounderQuickStart from "@/components/admin/FounderQuickStart";
import ProofRecoveryPanel from "@/components/admin/integration/ProofRecoveryPanel";
import ProductionReadinessCentre from "@/components/admin/ProductionReadinessCentre";
import { resolveProjectDisplayName } from "@/lib/admin/resolve-project-label";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { adminFetch } from "@/lib/admin-fetch";

const AGENTS_PAGE_SIZE = 16;

const CommandNetwork = dynamic(
  () => import("@/components/admin/command-center/CommandNetwork"),
  {
    ssr: false,
    loading: () => (
      <DelayedLoader
        active
        delay={0}
        variant="section"
        label="Loading agent network…"
        region={false}
      />
    ),
  }
);

async function fetchJson(path, router, loginFallback) {
  const res = await adminFetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref(loginFallback));
    return { ok: false, status: 401, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

export default function CommandCenterClient({ title = "Founder Home" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const department = searchParams?.get("department") || "all";
  const agentSlug = searchParams?.get("agent") || "";
  const agentsPage = title === "Agents";
  const loginFallback = agentsPage ? "/admin/agents" : "/admin/command-center";

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // Command Center: never load full network by default. Agents page: list first.
  const [viewMode, setViewMode] = useState("list");
  const [opsSummary, setOpsSummary] = useState(null);
  const [agentSearch, setAgentSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [filterProposed, setFilterProposed] = useState("all");
  const [agentPage, setAgentPage] = useState(0);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    if (projectId) q.set("project_id", projectId);
    if (department && department !== "all") q.set("department", department);
    if (agentSlug) q.set("agent", agentSlug);
    return q.toString();
  }, [projectId, department, agentSlug]);

  const load = useCallback(
    async ({ soft = false } = {}) => {
      if (soft) setRefreshing(true);
      else setLoading(true);
      setError("");
      const path = `/api/admin/command-center${query ? `?${query}` : ""}`;
      const res = await fetchJson(path, router, loginFallback);
      if (!soft) setLoading(false);
      setRefreshing(false);
      if (!res.ok) {
        setError(
          res.data?.error?.message || res.data?.error || "Failed to load Command Center"
        );
        if (!soft) setData(null);
        return;
      }
      setData(res.data);
      if (projectId) {
        const ops = await fetchJson(
          `/api/admin/operations/summary?project_id=${encodeURIComponent(projectId)}`,
          router,
          loginFallback
        );
        setOpsSummary(ops.ok ? ops.data : null);
      } else {
        setOpsSummary(null);
      }
    },
    [query, router, loginFallback, projectId]
  );

  useEffect(() => {
    load();
  }, [load]);

  const replaceParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams?.toString() || "");
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === "" || v === "all") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      const base =
        title === "Agents" ? "/admin/agents" : "/admin/command-center";
      router.replace(qs ? `${base}?${qs}` : base);
    },
    [router, searchParams, title]
  );

  const ceoAgent = useMemo(() => {
    const list = Array.isArray(data?.agents) ? data.agents : [];
    return list.find((a) => a.slug === "executive-ceo") || null;
  }, [data]);

  const agents = useMemo(
    () => (Array.isArray(data?.agents) ? data.agents : []),
    [data?.agents]
  );

  const departmentAgents = useMemo(() => {
    if (!department || department === "all") return agents;
    return agents.filter(
      (a) =>
        a.department === department ||
        a.departmentSlug === department ||
        a.workforceSlug?.startsWith?.(`${department}.`)
    );
  }, [agents, department]);

  const filteredAgents = useMemo(() => {
    const q = agentSearch.trim().toLowerCase();
    return departmentAgents.filter((a) => {
      if (q) {
        const hay = `${a.name || ""} ${a.slug || ""} ${a.workforceSlug || ""} ${a.department || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filterLevel !== "all" && String(a.hierarchyLevel || "") !== filterLevel) {
        return false;
      }
      if (filterState !== "all" && String(a.status || "idle") !== filterState) {
        return false;
      }
      const isProposed =
        Boolean(a.live?.projectId) ||
        (a.status && a.status !== "idle" && a.status !== "unavailable");
      if (filterProposed === "proposed" && !isProposed) return false;
      if (filterProposed === "catalog" && isProposed) return false;
      return true;
    });
  }, [departmentAgents, agentSearch, filterLevel, filterState, filterProposed]);

  const visibleAgents = agentsPage
    ? filteredAgents.slice(
        agentPage * AGENTS_PAGE_SIZE,
        agentPage * AGENTS_PAGE_SIZE + AGENTS_PAGE_SIZE
      )
    : departmentAgents;

  const agentPageCount = Math.max(
    1,
    Math.ceil(filteredAgents.length / AGENTS_PAGE_SIZE)
  );

  useEffect(() => {
    setAgentPage(0);
  }, [department, agentSearch, filterLevel, filterState, filterProposed, projectId]);

  const catalogCount = data?.agentInventory?.catalogCount;
  const executableCount =
    data?.hierarchy?.executableCount ?? data?.agentInventory?.executable;
  const routableCount = data?.agentInventory?.routable ?? executableCount;
  const activeAgentCount =
    data?.agentInventory?.working ??
    agents.filter((a) => a.status === "working").length;
  const idleAgentCount =
    data?.agentInventory?.idle ??
    agents.filter((a) => a.status === "idle").length;
  const assignedToProofCount = projectId
    ? agents.filter(
        (a) =>
          a.live?.projectId === projectId ||
          (a.status && !["idle", "unavailable"].includes(a.status))
      ).length
    : 0;
  const departmentCount = Array.isArray(data?.departments)
    ? data.departments.length
    : 0;
  const levelOptions = useMemo(() => {
    const levels = new Set(
      agents.map((a) => a.hierarchyLevel).filter(Boolean)
    );
    return ["all", ...Array.from(levels).sort()];
  }, [agents]);
  const stateOptions = useMemo(() => {
    const states = new Set(agents.map((a) => a.status || "idle"));
    return ["all", ...Array.from(states).sort()];
  }, [agents]);

  const selectedProjectName = resolveProjectDisplayName({
    projectName: Array.isArray(data?.projects)
      ? data.projects.find((p) => p.id === projectId)?.name
      : null,
    summary: opsSummary,
    projects: data?.projects || [],
    projectId,
  });

  const nextAction = opsSummary?.next_founder_action;
  const founderProofUi = opsSummary?.founder_proof_ui || null;
  const hasActiveProof = Boolean(opsSummary?.canonical_integration_run?.id);
  const activeProofCount =
    opsSummary?.integration?.active_founder_proof_run_count ??
    (hasActiveProof ? 1 : 0);
  const showProofRecovery =
    !agentsPage &&
    Boolean(
      founderProofUi &&
        (["resolver_error", "persistence_error", "no_proof", "no_project"].includes(
          founderProofUi.state
        ) ||
          ["resumable_historical", "terminal_only", "empty"].includes(founderProofUi.caseId) ||
          (Number(activeProofCount) === 0 && !hasActiveProof))
    );
  const stageCtaHref = nextAction?.href
    ? nextAction.href.includes("project_id=") || !projectId
      ? nextAction.href
      : `${nextAction.href}${nextAction.href.includes("?") ? "&" : "?"}project_id=${encodeURIComponent(projectId)}`
    : projectId
      ? `/admin/integration?project_id=${encodeURIComponent(projectId)}`
      : "/admin/integration";

  const recentActivityLabel = opsSummary?.last_activity_at
    ? `Last activity ${opsSummary.last_activity_at}`
    : null;

  const actions = (
    <div className="cc-header-actions">
      <label className="cc-project-select">
        <span className="sr-only">Project filter</span>
        <select
          value={projectId}
          onChange={(e) =>
            replaceParams({ project_id: e.target.value || null, agent: null })
          }
          aria-label="Filter by project"
        >
          <option value="">Select project</option>
          {(Array.isArray(data?.projects) ? data.projects : []).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      {hasActiveProof && nextAction?.severity === "action_required" ? (
        <Link
          href={stageCtaHref}
          className="header-btn"
          data-testid="cc-stage-primary-action"
        >
          {nextAction.label || "Continue Founder Proof"}
        </Link>
      ) : (
        <Link
          href={
            projectId
              ? `/admin/objectives?project_id=${encodeURIComponent(projectId)}`
              : "/admin/objectives"
          }
          className="header-btn"
          data-testid="cc-new-objective"
        >
          New objective
        </Link>
      )}
      <button
        type="button"
        className="header-btn-ghost"
        onClick={() => load({ soft: true })}
        disabled={refreshing}
      >
        {refreshing ? "Refreshing…" : "Refresh"}
      </button>
      <Link href="/admin/runtime" className="header-btn-ghost" data-testid="cc-advanced-ops-link">
        Advanced Operations
      </Link>
    </div>
  );

  return (
    <AdminShell
      title={title}
      actions={actions}
      helpProjectName={selectedProjectName}
      helpProofState={founderProofUi}
    >
      <div className="cc-page founder-home-page">
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading Founder Home…" />
          </DelayedLoader>
        ) : null}

        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        {data ? (
          <>
            {!agentsPage ? (
              <section
                className="founder-home-hero cc-card"
                data-testid="founder-home-hero"
                aria-labelledby="founder-home-project-h"
              >
                <h2 id="founder-home-project-h">Current project</h2>
                <p className="founder-home-project-name" data-testid="founder-home-project-name">
                  {projectId ? selectedProjectName : "Select a project to continue"}
                </p>
                <div className="founder-home-proof-state" data-testid="founder-home-proof-state">
                  <h3>Founder Proof state</h3>
                  <p>
                    {founderProofUi?.title ||
                      nextAction?.label ||
                      (projectId ? "No active Founder Proof" : "Select a project")}
                  </p>
                  {founderProofUi?.explanation ? (
                    <p className="cc-muted">{founderProofUi.explanation}</p>
                  ) : null}
                </div>
              </section>
            ) : null}

            {agentsPage ? <FounderAuthorityBanner /> : null}

            {projectId ? (
              agentsPage ? (
                <FounderActionBanner summary={opsSummary} projectId={projectId} />
              ) : (
                <>
                  {showProofRecovery ? (
                    <ProofRecoveryPanel
                      founderProofUi={founderProofUi}
                      projectId={projectId}
                      onRetry={() => load({ soft: true })}
                    />
                  ) : null}
                  <FounderGuidedPanel
                    summary={opsSummary}
                    projectId={projectId}
                    projectName={selectedProjectName}
                    projects={data.projects || []}
                    onRefresh={() => load({ soft: true })}
                  />
                  <FounderQuickStart
                    run={opsSummary?.canonical_integration_run || null}
                    hasProject={Boolean(projectId)}
                  />
                </>
              )
            ) : !agentsPage ? (
              <ProofRecoveryPanel
                founderProofUi={
                  founderProofUi || {
                    state: "no_project",
                    title: "Select a project to continue",
                    explanation: "Founder Proof is always scoped to one active project.",
                    primaryCta: {
                      id: "select_project",
                      label: "Select project",
                      href: "/admin/projects",
                    },
                  }
                }
                projectId=""
              />
            ) : null}

            {!agentsPage ? (
              <>
                <ProductionReadinessCentre
                  compact
                  readiness={data.productionReadiness}
                  provider={data.provider}
                  rateLimit={data.rateLimit}
                  schedule={data.schedule}
                  opsSummary={opsSummary}
                />
                <section
                  className="cc-card founder-home-activity"
                  data-testid="founder-home-activity"
                  aria-labelledby="founder-home-activity-h"
                >
                  <h2 id="founder-home-activity-h">Recent activity</h2>
                  {recentActivityLabel ? (
                    <p>{recentActivityLabel}</p>
                  ) : (
                    <p className="cc-muted">
                      No recent activity recorded for this project yet.
                    </p>
                  )}
                  {opsSummary?.open_founder_actions != null ? (
                    <p className="cc-muted">
                      Open Founder actions: {opsSummary.open_founder_actions}
                    </p>
                  ) : null}
                </section>
                <details className="cc-card founder-home-advanced" data-testid="founder-home-advanced">
                  <summary>Advanced — workforce snapshot</summary>
                  <dl className="cc-detail-dl founder-plan-grid">
                    <div>
                      <dt>Executable</dt>
                      <dd>{executableCount ?? 38}</dd>
                    </div>
                    <div>
                      <dt>Routable</dt>
                      <dd>{data?.agentInventory?.routable ?? executableCount ?? 38}</dd>
                    </div>
                    <div>
                      <dt>Departments</dt>
                      <dd>
                        {Array.isArray(data?.departments) ? data.departments.length : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt>Active workflows</dt>
                      <dd>{Array.isArray(data?.workflows) ? data.workflows.length : 0}</dd>
                    </div>
                  </dl>
                  <div className="cc-link-row">
                    <Link
                      href={
                        projectId
                          ? `/admin/agents?project_id=${encodeURIComponent(projectId)}`
                          : "/admin/agents"
                      }
                      className="header-btn"
                      data-testid="cc-view-agent-network"
                    >
                      View Agent Network
                    </Link>
                    <Link
                      href={
                        projectId
                          ? `/admin/workforce?project_id=${encodeURIComponent(projectId)}`
                          : "/admin/workforce"
                      }
                      className="header-btn-ghost"
                    >
                      Open Live Workforce
                    </Link>
                  </div>
                </details>
              </>
            ) : (
              <>
                <OpsStatusBar
                  schedule={data.schedule}
                  readiness={data.productionReadiness}
                  overview={data.overview}
                  refreshing={refreshing}
                  provider={data.provider}
                  rateLimit={data.rateLimit}
                  agentInventory={data.agentInventory}
                />
                <OverviewMetrics metrics={data.overview} />
                <CeoOrchestratorCard
                  agent={ceoAgent}
                  brief={data.ceoBrief}
                  projectId={projectId || null}
                  projectName={selectedProjectName}
                  opsSummary={opsSummary}
                />
              </>
            )}

            {agentsPage ? (
            <div className="cc-layout" data-testid="cc-agents-full-layout">
              <DepartmentRail
                departments={data.departments}
                agents={agents}
                active={department}
                selectedSlug={agentSlug}
                onSelectDepartment={(slug) =>
                  replaceParams({ department: slug, agent: null })
                }
                onSelectAgent={(slug) => replaceParams({ agent: slug })}
              />

              <div className="cc-main-col">
                <dl
                  className="agents-summary founder-plan-grid"
                  data-testid="agents-summary"
                >
                  <div>
                    <dt>Executable</dt>
                    <dd>{executableCount ?? 38}</dd>
                  </div>
                  <div>
                    <dt>Routable</dt>
                    <dd>{routableCount ?? executableCount ?? 38}</dd>
                  </div>
                  <div>
                    <dt>Active</dt>
                    <dd>{activeAgentCount}</dd>
                  </div>
                  <div>
                    <dt>Idle</dt>
                    <dd>{idleAgentCount}</dd>
                  </div>
                  <div>
                    <dt>Assigned to current proof</dt>
                    <dd>{assignedToProofCount}</dd>
                  </div>
                  <div>
                    <dt>Department count</dt>
                    <dd>{departmentCount}</dd>
                  </div>
                </dl>

                {hasActiveProof ? (
                  <aside
                    className="founder-action-banner agents-proof-banner"
                    data-testid="agents-proof-banner"
                    aria-label="Current Founder Proof"
                  >
                    <div className="founder-action-banner-text">
                      <strong>Founder Proof active</strong>
                      <span className="cc-muted">
                        {" "}
                        ·{" "}
                        {opsSummary?.canonical_integration_run?.stage_label ||
                          opsSummary?.canonical_integration_run?.stage ||
                          "In progress"}
                      </span>
                    </div>
                    {nextAction?.severity === "action_required" ? (
                      <Link href={stageCtaHref} className="header-btn">
                        {nextAction.label || "Continue"}
                      </Link>
                    ) : null}
                  </aside>
                ) : null}

                <div className="agents-filters" data-testid="agents-filters">
                  <label className="agents-search-label">
                    <span className="sr-only">Search agents</span>
                    <input
                      type="search"
                      data-testid="agents-search"
                      placeholder="Search agents…"
                      value={agentSearch}
                      onChange={(e) => setAgentSearch(e.target.value)}
                    />
                  </label>
                  <label>
                    <span className="sr-only">Department</span>
                    <select
                      data-testid="agents-filter-dept"
                      value={department || "all"}
                      onChange={(e) =>
                        replaceParams({
                          department: e.target.value || "all",
                          agent: null,
                        })
                      }
                      aria-label="Filter by department"
                    >
                      <option value="all">All departments</option>
                      {(data.departments || []).map((d) => (
                        <option key={d.slug || d.id || d.name} value={d.slug || d.id}>
                          {d.name || d.slug}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Level</span>
                    <select
                      data-testid="agents-filter-level"
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      aria-label="Filter by level"
                    >
                      {levelOptions.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl === "all" ? "All levels" : lvl}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">State</span>
                    <select
                      data-testid="agents-filter-state"
                      value={filterState}
                      onChange={(e) => setFilterState(e.target.value)}
                      aria-label="Filter by state"
                    >
                      {stateOptions.map((st) => (
                        <option key={st} value={st}>
                          {st === "all" ? "All states" : st}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Proposed</span>
                    <select
                      data-testid="agents-filter-proposed"
                      value={filterProposed}
                      onChange={(e) => setFilterProposed(e.target.value)}
                      aria-label="Filter proposed assignment"
                    >
                      <option value="all">All assignment</option>
                      <option value="proposed">Proposed / assigned</option>
                      <option value="catalog">Catalog only</option>
                    </select>
                  </label>
                </div>

                <div className="cc-toolbar">
                  <div className="cc-view-toggle" role="group" aria-label="View mode">
                    <button
                      type="button"
                      className={viewMode === "list" ? "active" : ""}
                      onClick={() => setViewMode("list")}
                    >
                      Summary
                    </button>
                    <button
                      type="button"
                      className={viewMode === "network" ? "active" : ""}
                      onClick={() => setViewMode("network")}
                      data-testid="cc-load-agent-network"
                    >
                      Network
                    </button>
                  </div>
                  <p className="cc-muted">
                    Showing {visibleAgents.length} of {filteredAgents.length}
                    {catalogCount != null ? ` · ${catalogCount} catalog` : ""}
                    {projectId
                      ? " · project scoped"
                      : " · catalog (select a project for live work)"}
                  </p>
                </div>

                <div className="cc-network-desktop">
                  {viewMode === "network" ? (
                    <CommandNetwork
                      hierarchy={data.hierarchy}
                      agents={visibleAgents}
                      department={department}
                      selectedSlug={agentSlug}
                      onSelect={(slug) => replaceParams({ agent: slug })}
                    />
                  ) : (
                    <AgentListFallback
                      agents={visibleAgents}
                      selectedSlug={agentSlug}
                      onSelect={(slug) => replaceParams({ agent: slug })}
                    />
                  )}
                </div>

                <div className="cc-network-mobile">
                  <AgentListFallback
                    agents={visibleAgents}
                    selectedSlug={agentSlug}
                    onSelect={(slug) => replaceParams({ agent: slug })}
                  />
                </div>

                <nav
                  className="agents-pagination"
                  data-testid="agents-pagination"
                  aria-label="Agent list pagination"
                >
                  <button
                    type="button"
                    className="header-btn-ghost"
                    disabled={agentPage <= 0}
                    onClick={() => setAgentPage((p) => Math.max(0, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="cc-muted">
                    Page {agentPage + 1} of {agentPageCount}
                  </span>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    disabled={agentPage >= agentPageCount - 1}
                    onClick={() =>
                      setAgentPage((p) => Math.min(agentPageCount - 1, p + 1))
                    }
                  >
                    Next
                  </button>
                </nav>

                <WorkflowBoard workflows={data.workflows} />
              </div>

              <aside className="cc-side-col">
                <CeoBriefPanel brief={data.ceoBrief} />
                <SchedulePanel
                  schedule={data.schedule}
                  readiness={data.productionReadiness}
                  provider={data.provider}
                  rateLimit={data.rateLimit}
                />
                <ExecutionPanel
                  execution={data.execution}
                  schedule={data.schedule}
                />
                <p className="cc-muted" style={{ marginTop: "0.5rem" }}>
                  <Link href="/admin/execution">Open Execution controls →</Link>
                </p>
                <section className="cc-card" aria-labelledby="cc-knowledge-h">
                  <h2 id="cc-knowledge-h">Knowledge / outputs</h2>
                  <p className="cc-muted">{data.knowledge?.note}</p>
                  <div className="cc-link-row">
                    <Link href={data.knowledge?.runsHref || "/admin/runtime/runs"}>
                      Runs
                    </Link>
                    <Link href={data.knowledge?.auditHref || "/admin/runtime/audit"}>
                      Audit
                    </Link>
                    <Link href={data.knowledge?.memoryHref || "/admin/memory"}>
                      Memory
                    </Link>
                    <Link href={data.knowledge?.learningHref || "/admin/learning"}>
                      Learning
                    </Link>
                    <Link href="/admin/ceo-brief">CEO Brief</Link>
                    <Link href="/admin/objectives">Objectives</Link>
                  </div>
                  {data.memoryLearning?.available ? (
                    <p className="cc-muted">
                      Memory candidates: {data.memoryLearning.memoryCandidates ?? 0}
                      {" · "}
                      Active: {data.memoryLearning.memoryActive ?? 0}
                      {" · "}
                      Learning open: {data.memoryLearning.learningCandidates ?? 0}
                      {" · "}
                      Promoted: {data.memoryLearning.learningPromoted ?? 0}
                    </p>
                  ) : (
                    <p className="cc-muted">
                      {data.memoryLearning?.label || "Memory/learning unavailable"}
                    </p>
                  )}
                </section>
              </aside>
            </div>
            ) : (
              <div className="cc-cc-side-compact founder-home-below-fold">
                <details>
                  <summary>CEO Brief &amp; schedule</summary>
                  <CeoBriefPanel brief={data.ceoBrief} showCancelled={false} />
                  <SchedulePanel
                    schedule={data.schedule}
                    readiness={data.productionReadiness}
                    provider={data.provider}
                    rateLimit={data.rateLimit}
                  />
                </details>
              </div>
            )}

            <AgentDetailDrawer
              open={Boolean(agentSlug)}
              detail={data.selectedDetail}
              onClose={() => replaceParams({ agent: null })}
            />
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
