"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RUNTIME_TAB_PATHS } from "@/components/admin/nav";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";
import { afterNextPaint } from "@/lib/after-paint";

const TABS = [
  ["overview", "Overview"],
  ["agents", "Agents"],
  ["tasks", "Tasks"],
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
    router?.push("/admin/login");
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
        <ProjectCreator
          disabled={notConfigured || bootstrapping}
          call={call}
          onCreated={() => void loadProjects({ background: true })}
        />
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

      <div
        role="tabpanel"
        id={`runtime-panel-${activeTab}`}
        aria-labelledby={`runtime-tab-${activeTab}`}
        className="runtime-panel"
      >
        {bootstrapping ? (
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading runtime…" />
          </AdminLoadingRegion>
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
              <AgentsPanel call={call} projectId={projectId} />
            )}
            {activeTab === "tasks" && (
              <TasksPanel call={call} projectId={projectId} />
            )}
            {activeTab === "runs" && <RunsPanel call={call} projectId={projectId} />}
            {activeTab === "approvals" && (
              <ApprovalsPanel call={call} projectId={projectId} />
            )}
            {activeTab === "audit" && (
              <AuditPanel call={call} projectId={projectId} />
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

function AgentsPanel({ call, projectId }) {
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
    return (
      <AdminLoadingRegion>
        <MianxLoader variant="section" label="Loading agents…" />
      </AdminLoadingRegion>
    );
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;

  return (
    <div className="runtime-split">
      <section aria-labelledby="catalog-h">
        <h3 id="catalog-h">Agent catalog</h3>
        <ul className="runtime-list">
          {catalog.map((a) => (
            <li key={a.slug} className="runtime-item">
              <div>
                <strong>{a.name}</strong>
                <p className="runtime-muted">
                  {a.slug} · v{a.version || 1} · {a.lifecycleStatus || a.lifecycle_status || "active"}
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
                disabled={!projectId || busySlug === a.slug}
                onClick={() => register(a.slug)}
              >
                {busySlug === a.slug ? (
                  <MianxLoader variant="inline" label="Registering agent…" />
                ) : (
                  "Register"
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="instances-h">
        <h3 id="instances-h">Registered in this project</h3>
        {instances.length === 0 ? (
          <p className="runtime-muted">No agents registered yet.</p>
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

function TasksPanel({ call, projectId }) {
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

  if (!projectId) return <p className="runtime-muted">Select or create a project first.</p>;
  if (loading) {
    return (
      <AdminLoadingRegion>
        <MianxLoader variant="section" label="Loading tasks…" />
      </AdminLoadingRegion>
    );
  }

  return (
    <div>
      <TaskCreator call={call} projectId={projectId} onCreated={load} />
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
        <p className="runtime-muted">No tasks match this filter.</p>
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

function TaskCreator({ call, projectId, onCreated }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [inputText, setInputText] = useState("{}");
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
    setBusy(true);
    const res = await call("/api/core/tasks", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        title: title.trim(),
        priority,
        requires_approval: requiresApproval,
        input,
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
    onCreated?.();
  }

  return (
    <form className="runtime-form" onSubmit={submit} aria-label="Create task">
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
      setMsg("Run completed.");
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
          {busy ? "Running…" : "Run"}
        </button>
      </div>
    </li>
  );
}

function RunsPanel({ call, projectId }) {
  const { loading, error, items } = useAsyncList(async () => {
    if (!projectId) return [];
    const res = await call(`/api/core/runs?project_id=${projectId}`);
    if (!res.ok) throw new Error(errorMessage(res.data, "Failed to load runs."));
    return res.data?.runs || [];
  }, [call, projectId]);

  if (!projectId) return <p className="runtime-muted">Select a project first.</p>;
  if (loading) {
    return (
      <AdminLoadingRegion>
        <MianxLoader variant="section" label="Loading runs…" />
      </AdminLoadingRegion>
    );
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) return <p className="runtime-muted">No runs yet.</p>;

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

function ApprovalsPanel({ call, projectId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(null);

  const load = useCallback(async () => {
    if (!projectId) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    // Approvals are listed via the runs of a project; use the dedicated route.
    const res = await call(`/api/core/approvals?project_id=${projectId}`);
    if (res.status === 404) {
      // No list route configured; fall back to empty.
      setItems([]);
    } else if (!res.ok) {
      setError(errorMessage(res.data, "Failed to load approvals."));
    } else {
      setItems(res.data?.approvals || []);
    }
    setLoading(false);
  }, [call, projectId]);

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

  if (!projectId) return <p className="runtime-muted">Select a project first.</p>;
  if (loading) {
    return (
      <AdminLoadingRegion>
        <MianxLoader variant="section" label="Loading approvals…" />
      </AdminLoadingRegion>
    );
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) return <p className="runtime-muted">No approval requests.</p>;

  return (
    <ul className="runtime-list">
      {items.map((a) => (
        <li key={a.id} className="runtime-item">
          <div>
            <strong>{a.requested_capability}</strong>
            <p className="runtime-muted">
              <span className={`runtime-status status-${a.status}`}>{a.status}</span>
              {a.reason ? ` · ${a.reason}` : ""}
            </p>
          </div>
          {a.status === "pending" && (
            <div className="runtime-item-actions">
              {confirming === a.id ? (
                <>
                  <span className="runtime-muted">Confirm:</span>
                  <button className="header-btn" onClick={() => decide(a.id, "approved")}>
                    Approve
                  </button>
                  <button className="header-btn-ghost" onClick={() => decide(a.id, "rejected")}>
                    Reject
                  </button>
                  <button className="header-btn-ghost" onClick={() => setConfirming(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="header-btn" onClick={() => setConfirming(a.id)}>
                  Decide
                </button>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function AuditPanel({ call, projectId }) {
  const { loading, error, items } = useAsyncList(async () => {
    if (!projectId) return [];
    const res = await call(`/api/core/audit?project_id=${projectId}`);
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(errorMessage(res.data, "Failed to load audit log."));
    return res.data?.logs || [];
  }, [call, projectId]);

  if (!projectId) return <p className="runtime-muted">Select a project first.</p>;
  if (loading) {
    return (
      <AdminLoadingRegion>
        <MianxLoader variant="section" label="Loading audit log…" />
      </AdminLoadingRegion>
    );
  }
  if (error) return <p className="runtime-error-text" role="alert">{error}</p>;
  if (items.length === 0) return <p className="runtime-muted">No audit entries yet.</p>;

  return (
    <ul className="runtime-list runtime-audit">
      {items.map((e) => (
        <li key={e.id} className="runtime-item">
          <div>
            <strong>{e.action}</strong>
            <p className="runtime-muted">
              {e.actor} · {e.resource_type}
              {e.resource_id ? ` · ${e.resource_id.slice(0, 8)}` : ""}
            </p>
          </div>
          <time className="runtime-muted">
            {e.created_at ? new Date(e.created_at).toLocaleString() : ""}
          </time>
        </li>
      ))}
    </ul>
  );
}
