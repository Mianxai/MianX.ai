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
import { currentAdminLoginHref } from "@/lib/admin-return-to";

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
  const res = await fetch(path, { headers: { Accept: "application/json" } });
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

export default function CommandCenterClient({ title = "Command Center" }) {
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
  // Agents page: list/department summary first; network graph is opt-in (lazy).
  const [viewMode, setViewMode] = useState(agentsPage ? "list" : "network");

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
    },
    [query, router, loginFallback]
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

  const ceoAgent = useMemo(
    () => (data?.agents || []).find((a) => a.slug === "executive-ceo") || null,
    [data]
  );

  const agents = useMemo(() => data?.agents || [], [data?.agents]);

  const visibleAgents = useMemo(() => {
    if (!department || department === "all") return agents;
    return agents.filter(
      (a) =>
        a.department === department ||
        a.departmentSlug === department ||
        a.workforceSlug?.startsWith?.(`${department}.`)
    );
  }, [agents, department]);

  const catalogCount = data?.agentInventory?.catalogCount;
  const executableCount =
    data?.hierarchy?.executableCount ?? data?.agentInventory?.executable;

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
          <option value="">All projects</option>
          {(data?.projects || []).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <Link href="/admin/objectives" className="header-btn">
        New objective
      </Link>
      <button
        type="button"
        className="header-btn-ghost"
        onClick={() => load({ soft: true })}
        disabled={refreshing}
      >
        {refreshing ? "Refreshing…" : "Refresh"}
      </button>
      <Link href="/admin/runtime" className="header-btn-ghost">
        Runtime
      </Link>
    </div>
  );

  return (
    <AdminShell title={title} actions={actions}>
      <div className="cc-page">
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading command center…" />
          </DelayedLoader>
        ) : null}

        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        {data ? (
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
            <FounderAuthorityBanner />
            <OverviewMetrics metrics={data.overview} />
            <CeoOrchestratorCard
              agent={ceoAgent}
              brief={data.ceoBrief}
              projectId={projectId || null}
            />

            <div className="cc-layout">
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
                <div className="cc-toolbar">
                  <div className="cc-view-toggle" role="group" aria-label="View mode">
                    <button
                      type="button"
                      className={viewMode === "list" ? "active" : ""}
                      onClick={() => setViewMode("list")}
                    >
                      {agentsPage ? "Summary" : "List"}
                    </button>
                    <button
                      type="button"
                      className={viewMode === "network" ? "active" : ""}
                      onClick={() => setViewMode("network")}
                    >
                      Network
                    </button>
                  </div>
                  <p className="cc-muted">
                    {executableCount != null
                      ? `${executableCount} executable`
                      : "Executable count unavailable"}
                    {catalogCount != null ? ` · ${catalogCount} catalog` : ""}
                    {projectId
                      ? " · project scoped"
                      : " · catalog (select a project for live work)"}
                    {department !== "all"
                      ? ` · showing ${visibleAgents.length} in department`
                      : ""}
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
