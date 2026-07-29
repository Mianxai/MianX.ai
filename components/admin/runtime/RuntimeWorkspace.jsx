"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RUNTIME_TAB_PATHS } from "@/components/admin/nav";
import EmptyState from "@/components/admin/EmptyState";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import QueuePanel from "@/components/admin/runtime/QueuePanel";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { afterNextPaint } from "@/lib/after-paint";
import { explainApproval } from "@/lib/core/approvals/explain";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

const TABS = [
  ["overview", "Overview"],
  ["agents", "Agents"],
  ["tasks", "Tasks"],
  ["queue", "Queue"],
  ["runs", "Runs"],
  ["approvals", "Approvals"],
  ["audit", "Audit"],
];

const VALID_TABS = new Set(TABS.map(([id]) => id));

// Small fetch wrapper: normalizes auth redirect + not-configured + error shape.
async function api(path, options, router) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/runtime"));
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

function errorMessage(data, fallback) {
  return data?.error?.message || data?.error || fallback;
}

function resolveTab(initialTab) {
  return VALID_TABS.has(initialTab) ? initialTab : "overview";
}

/**
 * @param {{ initialTab?: string, tab?: string, showChrome?: boolean }} props
 * `initialTab` / `tab` select the active runtime section. Tab changes
 * deep-link via router.replace to /admin/runtime[/section].
 * When `showChrome` is true (default false under AdminShell), renders a local header.
 */
export default function RuntimeWorkspace({
  initialTab = "overview",
  tab: tabProp,
  showChrome = false,
  onRefreshReady,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preferredProject = searchParams?.get("project_id") || "";
  const controlledTab = tabProp !== undefined ? resolveTab(tabProp) : null;
  const [tab, setTabState] = useState(() => resolveTab(initialTab));
  const activeTab = controlledTab ?? tab;
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(preferredProject);
  const [health, setHealth] = useState(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const tabRefs = useRef({});

  const call = useCallback((path, options) => api(path, options, router), [router]);

  const setTab = useCallback(
    (nextId) => {
      const id = resolveTab(nextId);
      if (controlledTab === null) setTabState(id);
      const path = RUNTIME_TAB_PATHS[id] || "/admin/runtime";
      const qs = searchParams?.toString();
      const href = qs ? `${path}?${qs}` : path;
      router.replace(href);
    },
    [controlledTab, router, searchParams]
  );

  useEffect(() => {
    if (controlledTab !== null) return;
    setTabState(resolveTab(initialTab));
  }, [initialTab, controlledTab]);

  useEffect(() => {
    if (preferredProject) setProjectId(preferredProject);
  }, [preferredProject]);

  // Guards against a superseded load overwriting current state (stale response).
  const loadSeqRef = useRef(0);

  const loadProjects = useCallback(
    async ({ background = false } = {}) => {
      const seq = ++loadSeqRef.current;
      // Immediate pending feedback — paint before network.
      if (background) setRefreshing(true);
      else setBootstrapping(true);
      setError("");
      if (!background) setNotConfigured(false);

      await afterNextPaint();
      if (seq !== loadSeqRef.current) return;

      const [healthRes, res] = await Promise.all([
        call("/api/core/health"),
        call("/api/core/projects"),
      ]);
      if (seq !== loadSeqRef.current) return;
      setHealth(healthRes.data);
      if (res.status === 503) {
        setNotConfigured(true);
        if (!background) setProjects([]);
      } else if (!res.ok) {
        setError(errorMessage(res.data, "Failed to load projects."));
      } else {
        const list = res.data?.projects || [];
        setProjects(list);
        setProjectId((cur) => {
          if (cur && list.some((p) => p.id === cur)) return cur;
          if (preferredProject && list.some((p) => p.id === preferredProject)) {
            return preferredProject;
          }
          return list[0]?.id || "";
        });
      }
      if (seq === loadSeqRef.current) {
        setBootstrapping(false);
        setRefreshing(false);
      }
    },
    [call, preferredProject]
  );

  useEffect(() => {
    void loadProjects({ background: false });
    return () => {
      loadSeqRef.current += 1;
    };
  }, [loadProjects]);

  useEffect(() => {
    onRefreshReady?.(() => loadProjects({ background: true }));
  }, [onRefreshReady, loadProjects]);

  const pending = bootstrapping || refreshing;
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/runtime",
  });

  function onTabKeyDown(e) {
    const idx = TABS.findIndex(([id]) => id === activeTab);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? (idx + 1) % TABS.length
          : (idx - 1 + TABS.length) % TABS.length;
      const nextId = TABS[next][0];
      setTab(nextId);
      tabRefs.current[nextId]?.focus();
    }
  }

  return (
    <div className="runtime-workspace">
      {showChrome && (
        <div className="admin-header">
          <div className="admin-header-left">
            <h1>Mianx Core Runtime</h1>
          </div>
          <div className="header-actions">
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="runtime-refresh"
              onClick={() => void loadProjects({ background: true })}
              disabled={pending}
            >
              {refreshing ? (
                <MianxLoader variant="inline" label="Refreshing runtime…" />
              ) : (
                "Refresh"
              )}
            </button>
          </div>
        </div>
      )}

      {notConfigured && (
        <div className="admin-notice" role="alert">
          Configuration error: Supabase environment variables are not set on this
          deployment, so the runtime cannot load projects or persist data. The
          runtime health probe still works; set{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to enable it.
        </div>
      )}
      {error && !notConfigured && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}

      <div className="runtime-projectbar">
        <label htmlFor="runtime-project">Project</label>
        <select
          id="runtime-project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          disabled={notConfigured || projects.length === 0 || bootstrapping}
        >
          {projects.length === 0 && <option value="">No projects yet</option>}
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {activeTab !== "approvals" && (
          <ProjectCreator
            disabled={notConfigured || bootstrapping}
            call={call}
            onCreated={() => void loadProjects({ background: true })}
          />
        )}
        {!showChrome && (
          <button
            type="button"
            className="header-btn-ghost"
            data-testid="runtime-refresh"
            onClick={() => void loadProjects({ background: true })}
            disabled={pending}
          >
            {refreshing ? (
              <MianxLoader variant="inline" label="Refreshing runtime…" />
            ) : (
              "Refresh"
            )}
          </button>
        )}
      </div>

      <div
        className="runtime-tabs"
        role="tablist"
        aria-label="Runtime sections"
        onKeyDown={onTabKeyDown}
      >
        {TABS.map(([id, label]) => (
          <button
            key={id}
            ref={(el) => {
              tabRefs.current[id] = el;
            }}
            role="tab"
            id={`runtime-tab-${id}`}
            aria-selected={activeTab === id}
            aria-controls={`runtime-panel-${id}`}
            tabIndex={activeTab === id ? 0 : -1}
            className={`runtime-chip${activeTab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <FounderActionBanner summary={opsSummary} projectId={projectId} />

      <div
        role="tabpanel"
        id={`runtime-panel-${activeTab}`}
        aria-labelledby={`runtime-tab-${activeTab}`}
        className="runtime-panel"
      >
        {bootstrapping ? (
          <DelayedLoader active variant="section" label="Loading runtime…" />
        ) : notConfigured ? (
          <p className="runtime-muted">
            Runtime data is unavailable until Supabase is configured.
          </p>
        ) : (
          <>
            {activeTab === "overview" && (
              <OverviewPanel health={health} projects={projects} />
            )}
            {activeTab === "agents" && (
              <AgentsPanel
                call={call}
                projectId={projectId}
                opsSummary={opsSummary}
              />
            )}
            {activeTab === "tasks" && (
              <TasksPanel
                call={call}
                projectId={projectId}
                opsSummary={opsSummary}
              />
            )}
            {activeTab === "queue" && (
              <QueuePanel
                call={call}
                projectId={projectId}
                health={health}
                opsSummary={opsSummary}
              />
            )}
            {activeTab === "runs" && (
              <RunsPanel
                call={call}
                projectId={projectId}
                opsSummary={opsSummary}
              />
            )}
            {activeTab === "approvals" && (
              <ApprovalsPanel
                call={call}
                projectId={projectId}
                opsSummary={opsSummary}
              />
            )}
            {activeTab === "audit" && (
              <AuditPanel
                call={call}
                projectId={projectId}
                opsSummary={opsSummary}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProjectCreator({ disabled, call, onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr("");
    const res = await call("/api/core/projects", {
      method: "POST",
      body: JSON.stringify({ name: name.trim() }),
    });
    setBusy(false);
    if (!res.ok) {
      setErr(errorMessage(res.data, "Could not create project."));
      return;
    }
    setName("");
    setOpen(false);
    onCreated?.();
  }

  if (!open) {
    return (
      <button className="header-btn" disabled={disabled} onClick={() => setOpen(true)}>
        New Project
      </button>
    );
  }
  return (
    <form className="runtime-inline-form" onSubmit={submit}>
      <label htmlFor="new-project-name" className="sr-only">
        New project name
      </label>
      <input
        id="new-project-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        autoFocus
      />
      <button className="header-btn" type="submit" disabled={busy}>
        {busy ? <MianxLoader variant="inline" label="Creating project…" /> : "Create"}
      </button>
      <button
        className="header-btn-ghost"
        type="button"
        onClick={() => setOpen(false)}
      >
        Cancel
      </button>
      {err && <span className="runtime-error-text" role="alert">{err}</span>}
    </form>
  );
}

function OverviewPanel({ health, projects }) {
  const cfg = health?.config;
  const rateLimit = cfg?.rateLimit;
  const scheduler = cfg?.scheduler;
  const rateLabel = rateLimit?.durable
    ? "Durable adapter active"
    : rateLimit?.urlConfigured
      ? "In-memory (URL set, adapter inactive)"
      : "In-memory (single instance)";
  const schedulerLabel = scheduler?.automaticProcessing
    ? "Automatic processing"
    : scheduler?.readyForExternalScheduler
      ? "Manual — worker secret ready for external cron"
      : "Manual — configure CRON_SECRET / INTERNAL_RUNTIME_SECRET for scheduler";

  return (
    <div className="runtime-cards">
      <div className="runtime-card">
        <h3>Service</h3>
        <p className="runtime-metric">{health?.ok ? "Healthy" : "Unknown"}</p>
        <p className="runtime-muted">{health?.service || "mianx-core"}</p>
      </div>
      <div className="runtime-card">
        <h3>Supabase</h3>
        <p className="runtime-metric">{cfg?.supabase ? "Configured" : "Not configured"}</p>
      </div>
      <div className="runtime-card">
        <h3>AI provider</h3>
        <p className="runtime-metric">
          {cfg?.providers?.anthropic ? "Configured" : "Not configured"}
        </p>
        <p className="runtime-muted">Anthropic</p>
      </div>
      <div className="runtime-card">
        <h3>Projects</h3>
        <p className="runtime-metric">{projects.length}</p>
      </div>
      <div className="runtime-card">
        <h3>Registered agents</h3>
        <p className="runtime-metric">{health?.agents ?? 0}</p>
        <p className="runtime-muted">catalog definitions</p>
      </div>
      <div className="runtime-card">
        <h3>Rate limit</h3>
        <p className="runtime-metric">{rateLimit?.durable ? "Durable" : "In-memory"}</p>
        <p className="runtime-muted">{rateLabel}</p>
      </div>
      <div className="runtime-card">
        <h3>Scheduler</h3>
        <p className="runtime-metric">{scheduler?.mode || "manual"}</p>
        <p className="runtime-muted">{schedulerLabel}</p>
      </div>
    </div>
  );
}

function useAsyncList(loader, deps) {
  const [state, setState] = useState({ loading: true, error: "", items: null });
  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      const items = await loader();
      setState({ loading: false, error: "", items });
    } catch (err) {
      setState({ loading: false, error: err.message || "Failed to load.", items: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => {
    reload();
  }, [reload]);
  return { ...state, reload };
}

function AgentsPanel({ call, projectId, opsSummary: _opsSummary }) {
  const [catalog, setCatalog] = useState([]);
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busySlug, setBusySlug] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    // Catalog and project instances are independent — fetch concurrently.
    const [cat, inst] = await Promise.all([
      call("/api/core/agents"),
      projectId ? call(`/api/core/agents?project_id=${projectId}`) : Promise.resolve(null),
    ]);
    if (cat.ok) setCatalog(cat.data?.catalog || []);
    if (!projectId) {
      setInstances([]);
    } else if (inst.ok) {
      setInstances(inst.data?.instances || []);
    } else {
      setError(errorMessage(inst.data, "Failed to load agents."));
    }
    setLoading(false);
  }, [call, projectId]);

  useEffect(() => {
    load();
  }, [load]);

  async function register(slug) {
    if (!projectId) return;
    if (
      !window.confirm(
        "Advanced Administration: manually register this agent instance? This does not advance the Founder Production Proof."
      )
    ) {
      return;
    }
    setBusySlug(slug);
    await call("/api/core/agents", {
      method: "POST",
      body: JSON.stringify({ project_id: projectId, slug }),
    });
    setBusySlug("");
    load();
  }

  async function setInstanceStatus(id, status) {
    setBusySlug(id);
    await call(`/api/core/agents/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBusySlug("");
    load();
  }

  if (loading) {
    return <DelayedLoader active variant="section" label="Loading agents…" />;
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;

  const hasLifecycle = catalog.some(
    (a) => a.lifecycleStatus != null || a.lifecycle_status != null
  );
  const executableCount = hasLifecycle
    ? catalog.filter((a) => {
        const life = a.lifecycleStatus || a.lifecycle_status;
        return life === "active" || life === "executable";
      }).length
    : catalog.length;
  const activeInstances = instances.filter((i) => i.status === "active").length;
  const idleInstances = instances.filter(
    (i) => i.status === "idle" || i.status === "paused"
  ).length;

  return (
    <div className="runtime-split">
      <section aria-labelledby="catalog-h">
        <h3 id="catalog-h">Agent catalog</h3>
        <div className="runtime-cards" aria-label="Agent counters" data-testid="agent-counters">
          <div className="runtime-card runtime-card-compact">
            <h3>Executable Agent Definitions</h3>
            <p className="runtime-metric">{executableCount}</p>
          </div>
          <div className="runtime-card runtime-card-compact">
            <h3>Agent Catalogue Total</h3>
            <p className="runtime-metric">{catalog.length}</p>
          </div>
          <div className="runtime-card runtime-card-compact">
            <h3>Registered Project Instances</h3>
            <p className="runtime-metric">{instances.length}</p>
          </div>
          <div className="runtime-card runtime-card-compact">
            <h3>Active / Idle</h3>
            <p className="runtime-metric">
              {activeInstances} / {idleInstances}
            </p>
          </div>
          <div className="runtime-card runtime-card-compact">
            <h3>Future Capacity Slots</h3>
            <p className="runtime-metric">445</p>
          </div>
        </div>
        <ul className="runtime-list">
          {catalog.map((a) => {
            const life = a.lifecycleStatus || a.lifecycle_status || "active";
            const isDraft = life === "draft";
            return (
              <li key={a.slug} className="runtime-item">
                <div>
                  <strong>{a.name}</strong>
                  <p className="runtime-muted">
                    {a.slug} · v{a.version || 1} · {life}
                  </p>
                  <p className="runtime-muted">{a.purpose}</p>
                  <p className="runtime-muted">
                    Provider: {a.defaultProvider || a.default_provider || "anthropic"}
                    {(a.defaultModel || a.default_model) ? ` / ${a.defaultModel || a.default_model}` : ""}
                    {(a.requiresHumanApproval || a.requires_human_approval) ? " · approval required" : ""}
                  </p>
                  <p className="runtime-tags">
                    {a.allowedCapabilities?.map((c) => (
                      <span key={c} className="runtime-tag">{c}</span>
                    ))}
                  </p>
                  {a.prohibitedCapabilities?.length > 0 && (
                    <p className="runtime-tags" aria-label="Prohibited capabilities">
                      {a.prohibitedCapabilities.map((c) => (
                        <span key={c} className="runtime-tag" style={{ opacity: 0.7 }}>
                          !{c}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <button
                  className="header-btn"
                  disabled={!projectId || busySlug === a.slug || isDraft}
                  title={isDraft ? "Draft definitions cannot be registered" : undefined}
                  onClick={() => register(a.slug)}
                >
                  {busySlug === a.slug ? (
                    <MianxLoader variant="inline" label="Registering agent…" />
                  ) : (
                    "Register"
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="instances-h">
        <h3 id="instances-h">Registered in this project</h3>
        {instances.length === 0 ? (
          <EmptyState
            title="No agents registered"
            reason="This project has no registered agent instances yet. The catalog above lists definitions you can register — nothing is invented as sample data."
            configuration="Registration requires a selected project and manage_agents capability."
            nextAction="Instances appear after Founder-gated allocation or advanced manual registration."
            projectLabel={projectId || "none"}
            cta={
              projectId ? (
                <Link className="header-btn-ghost" href="/admin/settings">
                  Settings
                </Link>
              ) : (
                <Link className="header-btn" href="/admin/projects">
                  Open projects
                </Link>
              )
            }
          />
        ) : (
          <ul className="runtime-list">
            {instances.map((i) => (
              <li key={i.id} className="runtime-item">
                <div>
                  <strong>{i.display_name || i.agent_definitions?.name}</strong>
                  <p className="runtime-muted">
                    {i.agent_definitions?.slug} ·{" "}
                    <span className={`runtime-status status-${i.status}`}>{i.status}</span>
                  </p>
                </div>
                <div className="runtime-item-actions">
                  {i.status === "active" && (
                    <button
                      type="button"
                      className="header-btn-ghost"
                      disabled={busySlug === i.id}
                      onClick={() => setInstanceStatus(i.id, "paused")}
                    >
                      Pause
                    </button>
                  )}
                  {i.status === "paused" && (
                    <button
                      type="button"
                      className="header-btn"
                      disabled={busySlug === i.id}
                      onClick={() => setInstanceStatus(i.id, "active")}
                    >
                      Activate
                    </button>
                  )}
                  {i.status !== "retired" && (
                    <button
                      type="button"
                      className="header-btn-ghost"
                      disabled={busySlug === i.id}
                      onClick={() => {
                        if (window.confirm("Retire this agent instance? It cannot be reactivated.")) {
                          setInstanceStatus(i.id, "retired");
                        }
                      }}
                    >
                      Retire
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function TasksPanel({ call, projectId, opsSummary }) {
  const [tasks, setTasks] = useState([]);
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = useCallback(async () => {
    if (!projectId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    // Tasks and agent instances are independent — fetch concurrently.
    const [t, inst] = await Promise.all([
      call(`/api/core/tasks?project_id=${projectId}`),
      call(`/api/core/agents?project_id=${projectId}`),
    ]);
    if (t.ok) setTasks(t.data?.tasks || []);
    else setError(errorMessage(t.data, "Failed to load tasks."));
    if (inst.ok) setInstances(inst.data?.instances || []);
    setLoading(false);
  }, [call, projectId]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(
    () =>
      statusFilter === "all"
        ? tasks
        : tasks.filter((t) => t.status === statusFilter),
    [tasks, statusFilter]
  );

  if (!projectId) {
    return (
      <EmptyState
        title="Select a project"
        reason="Tasks are project-scoped work units routed to registered agents."
        configuration="Create or select a project before creating tasks."
        nextAction="Select or create a project, then create a task or start an Objective."
        projectLabel="none"
        cta={
          <>
            <Link className="header-btn" href="/admin/projects">
              Open projects
            </Link>
            <Link className="header-btn-ghost" href="/admin/objectives">
              Objectives
            </Link>
          </>
        }
      />
    );
  }
  if (loading) {
    return <DelayedLoader active variant="section" label="Loading tasks…" />;
  }

  const nextAction = opsSummary?.next_founder_action;

  return (
    <div>
      {nextAction ? (
        <p className="runtime-muted" data-testid="tasks-ops-next">
          Next Founder action:{" "}
          {nextAction.href ? (
            <Link href={nextAction.href}>{nextAction.label || nextAction.reason}</Link>
          ) : (
            nextAction.label || nextAction.reason
          )}
        </p>
      ) : null}
      <TaskCreator
        call={call}
        projectId={projectId}
        onCreated={load}
        opsSummary={opsSummary}
      />
      {error && <p className="runtime-error-text" role="alert">{error}</p>}

      <div className="runtime-filters" role="group" aria-label="Filter tasks by status">
        {["all", "pending", "validated", "awaiting_approval", "running", "completed", "failed", "cancelled"].map(
          (s) => (
            <button
              key={s}
              className={`runtime-chip small${statusFilter === s ? " active" : ""}`}
              aria-pressed={statusFilter === s}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          )
        )}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title={tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
          reason={
            tasks.length === 0
              ? "This project has no tasks yet. Create one below, or start work from Objectives / workflows — the list is not seeded with samples."
              : `No tasks with status “${statusFilter}”.`
          }
          configuration={
            tasks.length === 0
              ? "Enqueueing requires at least one registered agent instance."
              : null
          }
          nextAction={
            tasks.length === 0
              ? "After creating a task, enqueue it to the queue for a worker tick."
              : "Clear or change the status filter."
          }
          projectLabel={projectId}
          cta={
            tasks.length === 0 ? (
              <Link
                className="header-btn-ghost"
                href={`/admin/objectives?project_id=${encodeURIComponent(projectId)}`}
              >
                Objectives
              </Link>
            ) : null
          }
        />
      ) : (
        <ul className="runtime-list">
          {visible.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              instances={instances}
              call={call}
              onChanged={load}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskCreator({ call, projectId, onCreated, opsSummary }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [inputText, setInputText] = useState("{}");
  const [sourceClassification, setSourceClassification] = useState(
    "standalone_advanced"
  );
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    let input;
    try {
      input = inputText.trim() ? JSON.parse(inputText) : {};
    } catch {
      setErr("Input must be valid JSON.");
      return;
    }
    if (sourceClassification === "standalone_advanced") {
      if (
        !window.confirm(
          "Create a standalone advanced runtime task? Manual tasks do not advance the Founder Production Proof unless explicitly linked to its canonical objective and run."
        )
      ) {
        return;
      }
    }
    const titleTrimmed = title.trim();
    const claimProbe = `${titleTrimmed} ${JSON.stringify(input)}`.toLowerCase();
    if (
      claimProbe.includes("integration_proof") ||
      claimProbe.includes("founder production proof")
    ) {
      setErr(
        "Manual runtime tasks cannot claim integration_proof. Use Integration for Founder Production Proof work."
      );
      return;
    }
    const payloadInput = {
      ...input,
      manual_runtime_task: true,
      source_classification: sourceClassification,
    };
    setBusy(true);
    const res = await call("/api/core/tasks", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        title: titleTrimmed,
        priority,
        requires_approval: requiresApproval,
        input: payloadInput,
        source_classification: sourceClassification,
        manual_runtime_task: true,
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const fieldErr = res.data?.error?.details;
      setErr(
        fieldErr
          ? Object.values(fieldErr).join(" ")
          : errorMessage(res.data, "Could not create task.")
      );
      return;
    }
    setTitle("");
    setInputText("{}");
    setRequiresApproval(false);
    setSourceClassification("standalone_advanced");
    onCreated?.();
  }

  const next = opsSummary?.next_founder_action;

  return (
    <form className="runtime-form" onSubmit={submit} aria-label="Advanced Runtime Task">
      <h3>Advanced Runtime Task</h3>
      <p className="runtime-muted" role="note">
        Manual tasks do not advance the active Founder Production Proof unless
        explicitly linked to its canonical objective and run.
      </p>
      {next?.href ? (
        <p className="runtime-muted">
          Prefer the Founder path:{" "}
          <Link href={next.href}>{next.label || "Open next Founder action"}</Link>
        </p>
      ) : null}
      <div className="runtime-form-row">
        <label htmlFor="task-title">Title *</label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
        />
      </div>
      <div className="runtime-form-row">
        <label htmlFor="task-source">Source classification</label>
        <select
          id="task-source"
          value={sourceClassification}
          onChange={(e) => setSourceClassification(e.target.value)}
        >
          <option value="standalone_advanced">standalone_advanced</option>
          <option value="linked_to_objective">linked_to_objective</option>
        </select>
      </div>
      <div className="runtime-form-row">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {["low", "normal", "high", "urgent"].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="runtime-form-row">
        <label htmlFor="task-input">Input (JSON)</label>
        <textarea
          id="task-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={3}
          spellCheck={false}
        />
      </div>
      <div className="runtime-form-row runtime-checkbox">
        <input
          id="task-approval"
          type="checkbox"
          checked={requiresApproval}
          onChange={(e) => setRequiresApproval(e.target.checked)}
        />
        <label htmlFor="task-approval">Require human approval before running</label>
      </div>
      {err && <p className="runtime-error-text" role="alert">{err}</p>}
      <button className="header-btn" type="submit" disabled={busy}>
        {busy ? <MianxLoader variant="inline" label="Creating task…" /> : "Create Task"}
      </button>
    </form>
  );
}

function TaskRow({ task, instances, call, onChanged }) {
  const [agentId, setAgentId] = useState(instances[0]?.id || "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!agentId && instances[0]) setAgentId(instances[0].id);
  }, [instances, agentId]);

  async function run() {
    setBusy(true);
    setMsg("");
    const selected = instances.find((i) => i.id === agentId);
    const agentSlug = selected?.agent_definitions?.slug;
    if (agentSlug && task.project_id) {
      // Preferred production path: durable async enqueue.
      const enqueueRes = await call("/api/core/jobs", {
        method: "POST",
        body: JSON.stringify({
          project_id: task.project_id,
          task_id: task.id,
          agent_slug: agentSlug,
          input: task.input || {},
          idempotency_key: `task-enqueue:${task.id}:${agentSlug}`,
        }),
      });
      if (enqueueRes.ok) {
        setBusy(false);
        setMsg(
          enqueueRes.data?.created === false
            ? "Already queued (idempotent). Open the Queue tab."
            : "Queued for async execution. Open the Queue tab to monitor."
        );
        onChanged?.();
        return;
      }
      // If enqueue failed because agent is draft/disabled, fall through to sync diagnostic.
      if (enqueueRes.status !== 400) {
        setBusy(false);
        setMsg(errorMessage(enqueueRes.data, "Could not enqueue job."));
        onChanged?.();
        return;
      }
    }
    // Compatibility / diagnostic path: synchronous provider call in-request.
    const res = await call(`/api/core/tasks/${task.id}/run`, {
      method: "POST",
      body: JSON.stringify(agentId ? { agent_instance_id: agentId } : {}),
    });
    setBusy(false);
    if (res.status === 202) {
      setMsg("Approval required — see the Approvals tab.");
    } else if (res.status === 503) {
      setMsg("AI provider not configured — task state preserved.");
    } else if (!res.ok) {
      setMsg(errorMessage(res.data, "Run failed."));
    } else {
      setMsg("Synchronous diagnostic run completed.");
    }
    onChanged?.();
  }

  const runnable = !["completed", "cancelled"].includes(task.status);

  return (
    <li className="runtime-item">
      <div>
        <strong>{task.title}</strong>
        <p className="runtime-muted">
          <span className={`runtime-status status-${task.status}`}>{task.status}</span>
          {" · "}
          {task.priority}
          {task.requires_approval ? " · approval required" : ""}
        </p>
        {msg && <p className="runtime-inline-msg" role="status">{msg}</p>}
      </div>
      <div className="runtime-item-actions">
        <label className="sr-only" htmlFor={`agent-${task.id}`}>
          Agent for {task.title}
        </label>
        <select
          id={`agent-${task.id}`}
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          disabled={instances.length === 0}
        >
          {instances.length === 0 && <option value="">No agents</option>}
          {instances.map((i) => (
            <option key={i.id} value={i.id}>
              {i.display_name || i.agent_definitions?.name}
            </option>
          ))}
        </select>
        <button
          className="header-btn"
          disabled={!runnable || busy || instances.length === 0}
          onClick={run}
        >
          {busy ? "Queuing…" : "Enqueue"}
        </button>
      </div>
    </li>
  );
}

function RunsPanel({ call, projectId, opsSummary }) {
  const { loading, error, items } = useAsyncList(async () => {
    if (!projectId) return [];
    const res = await call(`/api/core/runs?project_id=${projectId}`);
    if (!res.ok) throw new Error(errorMessage(res.data, "Failed to load runs."));
    return res.data?.runs || [];
  }, [call, projectId]);

  if (!projectId) {
    return (
      <EmptyState
        title="Select a project"
        reason="Runs are project-scoped records of completed (or failed) agent executions."
        nextAction="Select a project to inspect agent run history."
        projectLabel="none"
        cta={
          <Link className="header-btn" href="/admin/projects">
            Open projects
          </Link>
        }
      />
    );
  }
  if (loading) {
    return <DelayedLoader active variant="section" label="Loading runs…" />;
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) {
    const next = opsSummary?.next_founder_action;
    const integrationHref = `/admin/integration?project_id=${encodeURIComponent(projectId)}`;
    return (
      <EmptyState
        title="No Agent Runtime Runs yet"
        reason="This list shows Agent Runtime Runs (queued agent executions), not Integration Founder Proof Runs. Proof progress lives under Integration."
        nextAction={
          next?.reason ||
          next?.label ||
          "Continue the Founder Production Proof from Integration when that is the active path."
        }
        projectLabel={projectId}
        cta={
          <>
            <Link className="header-btn" href={integrationHref}>
              Open Integration
            </Link>
            {next?.href ? (
              <Link className="header-btn-ghost" href={next.href}>
                {next.label || "Next Founder action"}
              </Link>
            ) : null}
          </>
        }
      />
    );
  }

  return (
    <ul className="runtime-list">
      {items.map((r) => (
        <li key={r.id} className="runtime-item runtime-item-block">
          <div>
            <strong>
              <span className={`runtime-status status-${r.status}`}>{r.status}</span>
            </strong>
            <p className="runtime-muted">
              {r.provider} · {r.model || "—"} · retries {r.retry_count}
            </p>
          </div>
          {r.output && (
            <pre className="runtime-code" aria-label="Run output">
              {JSON.stringify(r.output, null, 2)}
            </pre>
          )}
          {r.error && (
            <pre className="runtime-code runtime-code-error" aria-label="Run error">
              {JSON.stringify(r.error, null, 2)}
            </pre>
          )}
        </li>
      ))}
    </ul>
  );
}

function ApprovalsPanel({ call, projectId, opsSummary: opsSummaryProp }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(null);
  const [explanations, setExplanations] = useState({});
  const [opsSummary, setOpsSummary] = useState(opsSummaryProp || null);

  useEffect(() => {
    setOpsSummary(opsSummaryProp || null);
  }, [opsSummaryProp]);

  const load = useCallback(async () => {
    if (!projectId) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    const res = await call(`/api/core/approvals?project_id=${projectId}`);
    if (res.status === 404) {
      setItems([]);
    } else if (!res.ok) {
      setError(errorMessage(res.data, "Failed to load approvals."));
    } else {
      const approvals = res.data?.approvals || [];
      setItems(approvals);
      const next = {};
      for (const a of approvals) {
        next[a.id] = explainApproval(a);
      }
      setExplanations(next);
    }
    if (!opsSummaryProp) {
      const sumRes = await call(
        `/api/admin/operations/summary?project_id=${encodeURIComponent(projectId)}`
      );
      if (sumRes.ok) setOpsSummary(sumRes.data);
    }
    setLoading(false);
  }, [call, projectId, opsSummaryProp]);

  useEffect(() => {
    load();
  }, [load]);

  async function decide(id, decision) {
    await call(`/api/core/approvals/${id}/decision`, {
      method: "POST",
      body: JSON.stringify({ decision }),
    });
    setConfirming(null);
    load();
  }

  if (!projectId) {
    return (
      <EmptyState
        title="Select a project"
        reason="Approvals are project-scoped Founder decisions for protected actions."
        nextAction="Select a project to review pending protected-action requests."
        projectLabel="none"
        cta={
          <Link className="header-btn" href="/admin/projects">
            Open projects
          </Link>
        }
      />
    );
  }
  if (loading) {
    return <DelayedLoader active variant="section" label="Loading approvals…" />;
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) {
    const next = opsSummary?.next_founder_action;
    const canonical = opsSummary?.canonical_integration_run;
    const objective =
      opsSummary?.objectives?.find(
        (o) => o.is_canonical || o.source_type === "integration_proof"
      ) ||
      opsSummary?.objectives?.[0] ||
      null;
    const integrationHref = `/admin/integration?project_id=${encodeURIComponent(projectId)}`;
    return (
      <EmptyState
        title="No approval is currently due"
        reason={[
          next?.reason || next?.label || "No Founder approval is waiting in runtime for this project.",
          objective ? `Canonical objective: ${objective.title}.` : null,
          canonical
            ? `Canonical run: ${canonical.id}${canonical.stage_label || canonical.stage ? ` · ${canonical.stage_label || canonical.stage}` : ""}.`
            : null,
        ]
          .filter(Boolean)
          .join(" ")}
        nextAction={
          next?.label ||
          "Continue the Founder Production Proof from Integration when that is the active path."
        }
        projectLabel={projectId}
        cta={
          <>
            <Link className="header-btn" href={integrationHref}>
              Open Integration
            </Link>
            {next?.href ? (
              <Link className="header-btn-ghost" href={next.href}>
                {next.label || "Next Founder action"}
              </Link>
            ) : (
              <Link className="header-btn-ghost" href="/admin/inbox">
                Founder Inbox
              </Link>
            )}
          </>
        }
      />
    );
  }

  return (
    <ul className="runtime-list">
      {items.map((a) => {
        const ex = explanations[a.id] || {};
        return (
          <li key={a.id} className="runtime-item runtime-approval-card">
            <div>
              {ex.highRisk ? (
                <p className="runtime-risk-banner">{ex.riskLabel || "PROTECTED ACTION"}</p>
              ) : null}
              <strong>{ex.requestedAction || a.requested_capability}</strong>
              <p className="runtime-muted">
                <span className={`runtime-status status-${a.status}`}>{a.status}</span>
                {" · source=runtime"}
                {ex.requestingAgent ? ` · agent ${ex.requestingAgent}` : ""}
                {a.project_id ? ` · project ${String(a.project_id).slice(0, 8)}…` : ""}
              </p>
              <p className="runtime-muted">
                <strong>Reason:</strong> {ex.reason || a.reason || "No reason recorded"}
              </p>
              {ex.affectedResource ? (
                <p className="runtime-muted">
                  <strong>Affected:</strong> {ex.affectedResource}
                </p>
              ) : null}
              <p className="runtime-muted">
                <strong>If approved:</strong> {ex.whatIfApproved}
              </p>
              <p className="runtime-muted">
                <strong>If rejected:</strong> {ex.whatIfRejected}
              </p>
            </div>
            {a.status === "pending" && (
              <div className="runtime-item-actions">
                {confirming === a.id ? (
                  <>
                    <span className="runtime-muted">Confirm decision:</span>
                    <button className="header-btn" onClick={() => decide(a.id, "approved")}>
                      Approve
                    </button>
                    <button
                      className="header-btn-ghost"
                      onClick={() => decide(a.id, "rejected")}
                    >
                      Reject
                    </button>
                    <button className="header-btn-ghost" onClick={() => setConfirming(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="header-btn" onClick={() => setConfirming(a.id)}>
                    Review decision
                  </button>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function AuditPanel({ call, projectId, opsSummary: _opsSummary }) {
  const { loading, error, items } = useAsyncList(async () => {
    if (!projectId) return [];
    const unified = await call(
      `/api/admin/audit/unified?project_id=${encodeURIComponent(projectId)}`
    );
    if (unified.ok) {
      return (
        unified.data?.events ||
        unified.data?.logs ||
        unified.data?.entries ||
        []
      );
    }
    const res = await call(`/api/core/audit?project_id=${projectId}`);
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(errorMessage(res.data, "Failed to load audit log."));
    return res.data?.logs || [];
  }, [call, projectId]);

  if (!projectId) {
    return (
      <EmptyState
        title="Select a project"
        reason="Audit entries are project-scoped records of runtime actions."
        nextAction="Select a project to inspect the audit log."
        projectLabel="none"
        cta={
          <Link className="header-btn" href="/admin/projects">
            Open projects
          </Link>
        }
      />
    );
  }
  if (loading) {
    return <DelayedLoader active variant="section" label="Loading audit log…" />;
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) {
    return (
      <EmptyState
        title="No audit entries yet"
        reason="No audit rows for this project yet — the log is empty, not filled with sample events."
        configuration="Entries appear as runtime actions (tasks, jobs, approvals) are recorded."
        nextAction="Start an objective or enqueue a task, then reopen Audit after activity."
        projectLabel={projectId}
        cta={
          <Link
            className="header-btn-ghost"
            href={`/admin/objectives?project_id=${encodeURIComponent(projectId)}`}
          >
            Objectives
          </Link>
        }
      />
    );
  }

  return (
    <ul className="runtime-list runtime-audit">
      {items.map((e) => {
        const eventType = e.event_type || e.action || e.type || "event";
        const source = e.source || e.resource_type || "runtime";
        const actor = e.actor || e.actor_id || "system";
        const outcome = e.outcome || e.status || e.result || null;
        const ts = e.timestamp || e.created_at;
        return (
          <li key={e.id || `${eventType}-${ts}`} className="runtime-item">
            <div>
              <strong>{eventType}</strong>
              <p className="runtime-muted">
                source={source} · actor {actor}
                {outcome ? ` · outcome ${outcome}` : ""}
                {e.resource_id ? ` · ${String(e.resource_id).slice(0, 8)}` : ""}
              </p>
              <details className="runtime-audit-details">
                <summary>Technical details</summary>
                <pre className="runtime-code" aria-label="Audit event detail">
                  {JSON.stringify(e, null, 2)}
                </pre>
              </details>
            </div>
            <time className="runtime-muted">
              {ts ? new Date(ts).toLocaleString() : ""}
            </time>
          </li>
        );
      })}
    </ul>
  );
}
