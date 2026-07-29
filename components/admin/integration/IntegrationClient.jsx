"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";
import {
  filterProofSelectableProjects,
  isActiveProofProject,
} from "@/lib/core/integration/project-access-shared";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "@/lib/core/integration/proof";
import {
  filterRunsForProject,
  deriveStepStates,
  getPlanGuidance,
  getSimulationGuidance,
  getEvidenceGuidance,
  getMemoryGuidance,
  getLearningGuidance,
  getProofPackGuidance,
  getCreateObjectiveDisabledReason,
  normalizeListField,
  parseListField,
} from "@/lib/core/integration/founder-flow";
import IntegrationContextBanner from "@/components/admin/integration/IntegrationContextBanner";
import IntegrationFlowStepper from "@/components/admin/integration/IntegrationFlowStepper";
import IntegrationRunSelector from "@/components/admin/integration/IntegrationRunSelector";
import IntegrationObjectiveForm from "@/components/admin/integration/IntegrationObjectiveForm";

const TABS = [
  { id: "dashboard", label: "Control Room" },
  { id: "objective", label: "Objective" },
  { id: "plan", label: "Plan" },
  { id: "simulation", label: "Simulation" },
  { id: "evidence", label: "Evidence" },
  { id: "memory", label: "Memory" },
  { id: "learning", label: "Learning" },
  { id: "proof", label: "Proof Pack" },
];

async function getJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/integration"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

async function postJson(path, body, router) {
  const res = await fetch(path, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/integration"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function IntegrationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, setProjectId, suggestStoredProjectId } = useAdminProject();
  const tab = searchParams?.get("tab") || "dashboard";
  const runIdParam = searchParams?.get("run_id") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dash, setDash] = useState(null);
  const [run, setRun] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [memory, setMemory] = useState(null);
  const [learning, setLearning] = useState(null);
  const [proof, setProof] = useState(null);
  const [title, setTitle] = useState("Secure internal employee onboarding workflow");
  const [purpose, setPurpose] = useState(
    "Design a secure internal employee onboarding workflow for a generic digital company, covering identity, access provisioning, and Founder-visible evidence."
  );
  const [deliverables, setDeliverables] = useState(
    "onboarding workflow blueprint, access provisioning checklist, evidence pack"
  );
  const [criteria, setCriteria] = useState(
    normalizeListField(FOUNDER_PRODUCTION_PROOF_OBJECTIVE.success_criteria)
  );
  const [constraints, setConstraints] = useState(
    normalizeListField(FOUNDER_PRODUCTION_PROOF_OBJECTIVE.constraints)
  );
  const [questions, setQuestions] = useState(
    FOUNDER_PRODUCTION_PROOF_OBJECTIVE.unresolved_questions[0] || ""
  );
  const [priority, setPriority] = useState(FOUNDER_PRODUCTION_PROOF_OBJECTIVE.priority);
  const [riskTolerance, setRiskTolerance] = useState(
    FOUNDER_PRODUCTION_PROOF_OBJECTIVE.risk_tolerance
  );
  const protectedActions = FOUNDER_PRODUCTION_PROOF_OBJECTIVE.protected_actions;
  const [executionMode, setExecutionMode] = useState("deterministic_simulation");
  const [providerGate, setProviderGate] = useState(null);
  const [proofConfirmOpen, setProofConfirmOpen] = useState(false);
  const [proofStatus, setProofStatus] = useState("not_started");
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  const selectableProjects = useMemo(
    () => filterProofSelectableProjects(projects),
    [projects]
  );
  const selectedProject = useMemo(
    () => selectableProjects.find((p) => p.id === projectId) || null,
    [selectableProjects, projectId]
  );

  const persistenceReady = Boolean(dash?.readiness?.persistence?.durable);
  const simulationReady = Boolean(
    dash?.readiness?.simulationReady ?? dash?.simulation_ready
  );
  const canStartProof = Boolean(
    !busy &&
      !loading &&
      !projectsLoading &&
      projectsLoaded &&
      !projectsError &&
      isActiveProofProject(selectedProject) &&
      persistenceReady &&
      simulationReady
  );

  const proofDisabledReason = !projectsLoaded || projectsLoading
    ? "Loading projects…"
    : loading
      ? "Loading integration dashboard…"
    : projectsError
      ? "Project catalogue failed to load."
      : !projectId
        ? "Select a project before starting the production proof."
        : !selectedProject
          ? "Selected project is inaccessible. Choose another project."
          : !isActiveProofProject(selectedProject)
            ? "Selected project must be active (not archived or paused)."
            : !persistenceReady
              ? "Durable integration persistence is not ready."
              : !simulationReady
                ? "Simulation readiness is false."
                : null;

  const setTab = useCallback(
    (next, extra = {}) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "dashboard") params.delete("tab");
      else params.set("tab", next);
      if (extra.run_id !== undefined) {
        if (extra.run_id) params.set("run_id", extra.run_id);
        else params.delete("run_id");
      } else if (runIdParam) params.set("run_id", runIdParam);
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/integration?${qs}` : "/admin/integration");
    },
    [router, searchParams, projectId, runIdParam]
  );

  const projectRuns = useMemo(
    () => filterRunsForProject(dash?.runs, projectId),
    [dash?.runs, projectId]
  );

  const flowCtx = useMemo(
    () => ({
      hasProject: Boolean(projectId && selectedProject),
      hasRun: Boolean(run?.id),
      proofStatus,
      runStage: run?.current_stage,
      runStatus: run?.status,
      evidenceAvailable: Boolean(
        evidence?.items?.length ||
          evidence?.entries?.length ||
          run?.evidence?.count > 0
      ),
      memoryCount: Array.isArray(memory) ? memory.length : run?.memory?.count || 0,
      learningCount: Array.isArray(learning) ? learning.length : run?.learning?.count || 0,
    }),
    [projectId, selectedProject, run, proofStatus, evidence, memory, learning]
  );

  const stepStates = useMemo(() => deriveStepStates(flowCtx), [flowCtx]);

  const createObjectiveDisabledReason = getCreateObjectiveDisabledReason({
    projectsLoading,
    projectsLoaded,
    projectId,
    selectedProject,
    persistenceReady,
    title,
    purpose,
    deliverables,
    criteria,
    executionMode,
    busy,
  });

  function applyProofTemplate() {
    const t = FOUNDER_PRODUCTION_PROOF_OBJECTIVE;
    setTitle(t.title);
    setPurpose(t.business_purpose);
    setDeliverables(normalizeListField(t.expected_deliverables));
    setCriteria(normalizeListField(t.success_criteria));
    setConstraints(normalizeListField(t.constraints));
    setQuestions(t.unresolved_questions[0] || "");
    setExecutionMode(t.execution_mode);
    setPriority(t.priority);
    setRiskTolerance(t.risk_tolerance);
  }

  function focusProjectPicker() {
    const el = document.getElementById("integration-project-picker");
    if (el) el.focus();
  }

  const loadProjects = useCallback(async () => {
    setProjectsLoading(true);
    setProjectsError("");
    const res = await getJson("/api/core/projects", router);
    setProjectsLoading(false);
    setProjectsLoaded(true);
    if (!res.ok) {
      setProjects([]);
      setProjectsError(res.data?.error?.message || "Failed to load projects");
      return;
    }
    const list = Array.isArray(res.data?.projects) ? res.data.projects : [];
    setProjects(filterProofSelectableProjects(list));
  }, [router]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Restore stored project or clear inaccessible URL project_id.
  useEffect(() => {
    if (!projectsLoaded || projectsLoading) return;
    if (projectId) {
      if (!selectableProjects.some((p) => p.id === projectId)) {
        setProjectId("");
      }
      return;
    }
    if (
      suggestStoredProjectId &&
      selectableProjects.some((p) => p.id === suggestStoredProjectId)
    ) {
      setProjectId(suggestStoredProjectId);
    }
  }, [
    projectsLoaded,
    projectsLoading,
    projectId,
    selectableProjects,
    suggestStoredProjectId,
    setProjectId,
  ]);

  useEffect(() => {
    if (!projectId || !runIdParam || !dash?.runs?.length) return;
    const match = dash.runs.find((r) => r.id === runIdParam);
    if (match?.project_id && match.project_id !== projectId) {
      setTab(tab, { run_id: "" });
    }
  }, [projectId, runIdParam, dash?.runs, tab, setTab]);

  useEffect(() => {
    if (!projectId || runIdParam || !projectRuns.length) return;
    if (projectRuns.length === 1) {
      setTab(tab, { run_id: projectRuns[0].id });
    }
  }, [projectId, runIdParam, projectRuns, tab, setTab]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `&project_id=${encodeURIComponent(projectId)}` : "";
    const dashRes = await getJson(`/api/admin/integration?action=dashboard${q}`, router);
    if (!dashRes.ok) {
      setLoading(false);
      setError(dashRes.data?.error?.message || "Failed to load integration dashboard");
      return;
    }
    setDash(dashRes.data);
    setProofStatus(
      dashRes.data?.readiness?.integrationProofStatus ||
        dashRes.data?.proof_status ||
        "not_started"
    );

    const runsForProject = filterRunsForProject(dashRes.data?.runs, projectId);
    const activeRunId =
      runIdParam || (runsForProject.length === 1 ? runsForProject[0].id : null);
    if (activeRunId) {
      const runRes = await getJson(
        `/api/admin/integration?action=run&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (runRes.ok) {
        setRun(runRes.data?.run || null);
        if (runRes.data?.proof_status) setProofStatus(runRes.data.proof_status);
      }
      const ev = await getJson(
        `/api/admin/integration?action=evidence&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (ev.ok) setEvidence(ev.data?.manifest ?? null);
      const mem = await getJson(
        `/api/admin/integration?action=memory&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (mem.ok) setMemory(mem.data?.entries ?? []);
      const learn = await getJson(
        `/api/admin/integration?action=learning&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (learn.ok) setLearning(learn.data?.proposals ?? []);
      const pr = await getJson(
        `/api/admin/integration?action=proof&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (pr.ok) setProof(pr.data?.proof_pack ?? null);
      const gate = await getJson(
        `/api/admin/integration?action=provider&mode=${encodeURIComponent(executionMode)}`,
        router
      );
      if (gate.ok) setProviderGate(gate.data?.gate || null);
    } else {
      setRun(null);
      setEvidence(null);
      setMemory([]);
      setLearning([]);
      setProof(null);
      const gate = await getJson(
        `/api/admin/integration?action=provider&mode=${encodeURIComponent(executionMode)}`,
        router
      );
      if (gate.ok) setProviderGate(gate.data?.gate || null);
    }
    setLoading(false);
  }, [projectId, router, runIdParam, executionMode]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(body) {
    setBusy(true);
    setError("");
    const res = await postJson("/api/admin/integration", body, router);
    setBusy(false);
    if (!res.ok) {
      setError(res.data?.error?.message || res.data?.message || "Action failed");
      return null;
    }
    const nextRun = res.data?.run || res.data?.value?.run || res.data;
    if (nextRun?.id) {
      setRun(nextRun);
      setTab(tab, { run_id: nextRun.id });
    }
    await load();
    return res.data;
  }

  return (
    <AdminShell title="End-to-End Integration">
      <PageHeader
        title="End-to-End Integration"
        description="LEVEL 1 — Deterministic simulation proof. Not live AI execution."
        actions={
          <div className="integration-project-picker" data-testid="integration-project-picker">
            {projectsLoading ? (
              <MianxLoader variant="inline" label="Loading projects…" />
            ) : (
              <ProjectPicker
                id="integration-project-picker"
                value={projectId}
                onChange={setProjectId}
                projects={selectableProjects}
                allowAll
                label="Project"
              />
            )}
          </div>
        }
      />

      {projectsError ? (
        <div className="admin-error" role="alert" data-testid="projects-load-error">
          {projectsError}{" "}
          <Link href="/admin/projects">Open Projects</Link>
        </div>
      ) : null}
      {projectsLoaded && !projectsLoading && !projectsError && selectableProjects.length === 0 ? (
        <div className="admin-error" role="status" data-testid="projects-empty">
          No active projects available.{" "}
          <Link href="/admin/projects">Create or open a project</Link>
        </div>
      ) : null}

      <div className="admin-truth-banner" data-testid="integration-truth-banner">
        <strong>Proof level:</strong> DETERMINISTIC SIMULATION. Live provider execution stays
        blocked unless a provider is configured and Founder enables live mode separately.
      </div>

      <div className="admin-tabs" role="tablist" aria-label="Integration views">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            data-testid={`integration-tab-${t.id}`}
            aria-selected={tab === t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error ? <div className="admin-error">{error}</div> : null}
      {loading ? <MianxLoader variant="section" label="Loading…" /> : null}

      {!loading ? (
        <>
          <IntegrationContextBanner
            projectId={projectId}
            selectedProject={selectedProject}
            onFocusProjectPicker={focusProjectPicker}
          />
          <IntegrationFlowStepper stepStates={stepStates} />
          {projectId && projectRuns.length > 0 ? (
            <IntegrationRunSelector
              runs={projectRuns}
              value={runIdParam || run?.id || ""}
              onChange={(id) => setTab(tab, { run_id: id })}
            />
          ) : null}
        </>
      ) : null}

      {tab === "dashboard" ? (
        <section className="admin-panel" data-testid="integration-dashboard">
          <h2>Control Room — Integration</h2>
          {loading ? <MianxLoader variant="section" label="Loading integration…" /> : null}
          {!loading ? (
          <>
          {!projectId ? (
            <div data-testid="control-room-no-project">
              <EmptyState
                title="Select an active project to begin the Founder production proof"
                reason="All projects is read-only here. Choose MianX Internal Production Proof (or another active project) to start."
                nextAction="Use the project selector in the page header or the Select project action above."
                cta={
                  <button type="button" className="header-btn" onClick={focusProjectPicker}>
                    Focus project selector
                  </button>
                }
              />
            </div>
          ) : null}
          <p>
            Routable agents:{" "}
            <strong>{dash?.routable_agent_audit?.actual_routable ?? "—"}</strong> / 36 expected.
            Live execution ready:{" "}
            <StatusBadge status={dash?.live_execution_ready ? "ready" : "blocked"} />
          </p>

          {!projectRuns.length && projectId ? (
            <EmptyState
              title="No integration runs for this project"
              description="Create a Founder objective or start the production proof below."
            />
          ) : null}
          {projectRuns.length > 0 ? (
            <ul className="admin-list">
              {projectRuns.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => setTab("plan", { run_id: r.id })}>
                    {r.objective_title || r.id}
                  </button>{" "}
                  <StatusBadge status={r.status} /> stage={r.stage || r.current_stage} mode={r.mode}
                </li>
              ))}
            </ul>
          ) : null}
          </>
          ) : null}

          <section
            className="admin-panel admin-proof-panel"
            data-testid="production-proof-panel"
            aria-labelledby="production-proof-heading"
          >
            <h2 id="production-proof-heading">Production Founder Proof</h2>
            {!projectId ? (
              <EmptyState
                title="Select an active project to begin the Founder production proof"
                reason="All projects is read-only here. Choose an active project from the selector."
                nextAction="Use the project selector in the page header."
              />
            ) : null}
            <p role="status" data-testid="selected-project-label">
              Selected project:{" "}
              <strong>
                {selectedProject?.name || (projectId ? projectId : "All projects")}
              </strong>
              {selectedProject?.slug ? (
                <>
                  {" "}
                  <span className="admin-muted">({selectedProject.slug})</span>
                </>
              ) : null}
            </p>
            <p role="status">
              Proof status: <StatusBadge status={proofStatus} />{" "}
              <span data-testid="proof-status-text">{proofStatus}</span>
            </p>
            <dl className="admin-kv" data-testid="proof-readiness-grid">
              <div>
                <dt>Current integration run</dt>
                <dd>
                  <code>{run?.id || dash?.runs?.[0]?.id || "none"}</code>
                </dd>
              </div>
              <div>
                <dt>Production persistence</dt>
                <dd data-testid="persistence-status">
                  {dash?.readiness?.persistence?.durable
                    ? `durable (${dash.readiness.persistence.backend})`
                    : dash?.readiness?.persistence?.reason ||
                      dash?.persistence?.reason ||
                      "unknown / not probed"}
                  {dash?.readiness?.persistence?.failClosed ? " · fail-closed" : ""}
                </dd>
              </div>
              <div>
                <dt>Simulation readiness</dt>
                <dd>
                  {String(
                    dash?.readiness?.simulationReady ?? dash?.simulation_ready ?? false
                  )}
                </dd>
              </div>
              <div>
                <dt>Provider status</dt>
                <dd>{dash?.readiness?.providerStatus || "unconfigured"}</dd>
              </div>
              <div>
                <dt>Routable agent count</dt>
                <dd>{dash?.readiness?.routableAgentCount ?? dash?.routable_agent_audit?.actual_routable ?? "—"}</dd>
              </div>
              <div>
                <dt>Scheduler status</dt>
                <dd>
                  {dash?.readiness?.schedulerStatus?.mode || "unknown"}
                  {dash?.readiness?.lastSchedulerTick
                    ? ` · last tick ${dash.readiness.lastSchedulerTick}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>Current stage</dt>
                <dd>{run?.current_stage || "—"}</dd>
              </div>
              <div>
                <dt>Selected agents</dt>
                <dd>{run?.allocation?.count ?? run?.allocation?.selected_agents?.length ?? 0}</dd>
              </div>
              <div>
                <dt>Task / evidence / memory / learning / recovery</dt>
                <dd>
                  {run?.payload?.tasks?.length || run?.task_count || 0} /{" "}
                  {run?.evidence?.count || 0} / {run?.memory?.count || 0} /{" "}
                  {run?.learning?.count || 0} / {run?.recovery_count || 0}
                </dd>
              </div>
              <div>
                <dt>Final Founder review</dt>
                <dd>
                  {run?.current_stage === "founder_final_review"
                    ? "awaiting explicit Founder decision"
                    : run?.current_stage === "completed"
                      ? "approved"
                      : run?.current_stage === "rejected"
                        ? "rejected"
                        : "not reached"}
                </dd>
              </div>
            </dl>

            <details data-testid="proof-objective-template" open>
              <summary>Proof objective template</summary>
              <pre className="admin-pre">
                {JSON.stringify(
                  dash?.proof_template || {
                    title: "Secure Internal Employee Onboarding Workflow",
                    execution_mode: "deterministic_simulation",
                    protected_actions: ["production_deployment"],
                  },
                  null,
                  2
                )}
              </pre>
            </details>

            <div className="admin-actions">
              <button
                type="button"
                data-testid="start-founder-proof"
                disabled={!canStartProof}
                aria-haspopup="dialog"
                aria-disabled={!canStartProof}
                title={proofDisabledReason || "Start Founder Proof"}
                onClick={() => {
                  if (!canStartProof) return;
                  setProofConfirmOpen(true);
                }}
              >
                Start Founder Proof
              </button>
            </div>
            {proofDisabledReason ? (
              <p role="status" data-testid="proof-disabled-reason">
                {proofDisabledReason}
              </p>
            ) : (
              <p role="status" data-testid="proof-ready-hint">
                Ready — press Start Founder Proof, then confirm. Nothing starts automatically.
              </p>
            )}

            {proofConfirmOpen ? (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="proof-confirm-title"
                data-testid="proof-confirm-dialog"
                className="admin-dialog"
              >
                <h3 id="proof-confirm-title">Confirm production proof start</h3>
                <p>
                  This creates a durable production integration run for the Secure Internal
                  Employee Onboarding Workflow objective. It will not auto-approve simulation,
                  will not call a live provider, and will not execute production_deployment.
                </p>
                <div className="admin-actions">
                  <button
                    type="button"
                    data-testid="proof-confirm-yes"
                    autoFocus
                    disabled={busy}
                    onClick={async () => {
                      setProofConfirmOpen(false);
                      await act({
                        action: "start_founder_proof",
                        project_id: projectId,
                        confirmation: true,
                        actor: "founder",
                      });
                    }}
                  >
                    Confirm — start proof
                  </button>
                  <button
                    type="button"
                    data-testid="proof-confirm-no"
                    disabled={busy}
                    onClick={() => setProofConfirmOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </section>
      ) : null}

      {!loading && tab === "objective" ? (
        <section className="admin-panel" data-testid="integration-objective">
          <h2>Founder Objective Intake</h2>
          <p>
            <Link href="/admin/company-builder">Company Builder</Link> can attach an integration
            pipeline after blueprint approval. Simulation does not equal a completed real company.
          </p>
          <IntegrationObjectiveForm
            title={title}
            setTitle={setTitle}
            purpose={purpose}
            setPurpose={setPurpose}
            deliverables={deliverables}
            setDeliverables={setDeliverables}
            criteria={criteria}
            setCriteria={setCriteria}
            constraints={constraints}
            setConstraints={setConstraints}
            questions={questions}
            setQuestions={setQuestions}
            executionMode={executionMode}
            setExecutionMode={setExecutionMode}
            priority={priority}
            setPriority={setPriority}
            riskTolerance={riskTolerance}
            setRiskTolerance={setRiskTolerance}
            protectedActions={protectedActions}
            providerGate={providerGate}
            selectedProjectName={selectedProject?.name}
            createDisabledReason={createObjectiveDisabledReason}
            busy={busy}
            clarificationRequired={run?.current_stage === "clarification_required"}
            run={run}
            onPrefillTemplate={applyProofTemplate}
            onCreate={() =>
              act({
                action: "create",
                objective: {
                  title,
                  business_purpose: purpose,
                  expected_deliverables: parseListField(deliverables),
                  success_criteria: parseListField(criteria),
                  constraints: parseListField(constraints),
                  unresolved_questions: questions ? [questions] : [],
                  protected_actions: protectedActions,
                  project_id: projectId,
                  industry: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.industry,
                  business_model: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.business_model,
                  priority,
                  risk_tolerance: riskTolerance,
                  execution_mode: executionMode,
                  required_approvals: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.required_approvals,
                  known_assumptions: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.known_assumptions,
                },
              })
            }
            onSubmitClarification={() =>
              act({
                action: "clarify",
                run_id: run.id,
                answers: {
                  title,
                  business_purpose: purpose,
                  expected_deliverables: deliverables,
                  success_criteria: criteria,
                  clear_questions: true,
                },
              })
            }
          />
        </section>
      ) : null}

      {!loading && tab === "plan" ? (
        <section className="admin-panel" data-testid="integration-plan">
          <h2>Plan & Approval</h2>
          {getPlanGuidance(flowCtx) ? (
            <EmptyState
              title={getPlanGuidance(flowCtx).title}
              reason={getPlanGuidance(flowCtx).reason}
              nextAction={getPlanGuidance(flowCtx).nextAction}
              cta={
                getPlanGuidance(flowCtx).actionTab
                  ? (
                      <button
                        type="button"
                        className="header-btn"
                        onClick={() => setTab(getPlanGuidance(flowCtx).actionTab)}
                      >
                        Go to {getPlanGuidance(flowCtx).actionTab === "objective" ? "Objective" : "Control Room"}
                      </button>
                    )
                  : null
              }
            />
          ) : null}
          {!run ? null : (
            <>
              <p>
                Stage: <StatusBadge status={run.current_stage} /> Status:{" "}
                <StatusBadge status={run.status} />
              </p>
              <p>Correlation: {run.correlation_id}</p>
              <p>Trace: {run.trace_id}</p>
              {run.current_stage === "objective_validated" ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => act({ action: "plan", run_id: run.id })}
                >
                  Generate deterministic plan
                </button>
              ) : null}
              {run.current_stage === "founder_approval_required" ? (
                <div className="admin-actions">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => act({ action: "approve_simulation", run_id: run.id })}
                  >
                    Approve Simulation
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => act({ action: "return_for_changes", run_id: run.id })}
                  >
                    Return for Changes
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => act({ action: "reject", run_id: run.id })}
                  >
                    Reject
                  </button>
                </div>
              ) : null}
              {["objective_validated", "clarification_required", "founder_approval_required"].includes(
                run.current_stage
              ) ? (
                <p role="status" data-testid="sim-blocked-banner">
                  Simulation is blocked until Founder explicitly approves. Tasks cannot be claimed
                  yet.
                </p>
              ) : null}
              <h3>Inspect</h3>
              <details open>
                <summary>Templates</summary>
                <pre className="admin-pre">
                  {JSON.stringify(
                    {
                      selected:
                        run.template_plan?.match?.selected_templates ||
                        run.template_plan?.selected_templates,
                      rejected:
                        run.template_plan?.match?.rejected_templates ||
                        run.template_plan?.rejected_templates,
                      confidence: run.template_plan?.match?.confidence,
                      assumptions: run.objective?.known_assumptions,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
              <details>
                <summary>Plan / WBS / capabilities</summary>
                <pre className="admin-pre">
                  {JSON.stringify(
                    {
                      plan_id: run.planning_plan?.id,
                      departments:
                        run.planning_plan?.capability_plan?.department_ownership ||
                        run.planning_plan?.departments,
                      risks: run.planning_plan?.risks,
                      preview: run.execution_preview || run.planning_plan?.execution_preview,
                      validation: run.validation,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
              {run.approval_package ? (
                <details>
                  <summary>Founder approval package</summary>
                  <pre className="admin-pre">{JSON.stringify(run.approval_package, null, 2)}</pre>
                </details>
              ) : null}
            </>
          )}
        </section>
      ) : null}

      {!loading && tab === "simulation" ? (
        <section className="admin-panel" data-testid="integration-simulation">
          <h2>Workforce Simulation</h2>
          <p>Simulation does not equal a completed real company or live AI execution.</p>
          {getSimulationGuidance(flowCtx) ? (
            <EmptyState
              title={getSimulationGuidance(flowCtx).title}
              reason={getSimulationGuidance(flowCtx).reason}
              nextAction={getSimulationGuidance(flowCtx).nextAction}
              cta={
                getSimulationGuidance(flowCtx).actionTab
                  ? (
                      <button
                        type="button"
                        className="header-btn"
                        onClick={() => setTab(getSimulationGuidance(flowCtx).actionTab)}
                      >
                        Open {getSimulationGuidance(flowCtx).actionTab === "plan" ? "Plan" : "Objective"}
                      </button>
                    )
                  : null
              }
              data-testid="simulation-guided-empty"
            />
          ) : null}
          {run?.current_stage === "approved_for_simulation" ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => act({ action: "start_simulation", run_id: run.id })}
            >
              Start simulation
            </button>
          ) : null}
          {run && !["completed", "rejected", "cancelled"].includes(run.current_stage) ? (
            <div className="admin-actions">
              <button
                type="button"
                disabled={busy}
                onClick={() => act({ action: "pause", run_id: run.id })}
              >
                Pause
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => act({ action: "resume", run_id: run.id })}
              >
                Resume
              </button>
              <button
                type="button"
                data-testid="deterministic-recovery-test"
                disabled={busy}
                onClick={() =>
                  act({ action: "deterministic_recovery_test", run_id: run.id })
                }
              >
                Deterministic recovery test
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => act({ action: "cancel", run_id: run.id })}
              >
                Cancel
              </button>
            </div>
          ) : null}
          <p className="admin-note" role="note">
            Deterministic recovery test creates/restores a checkpoint without simulating a live
            outage. It increments recovery count and writes an audit event.
          </p>
          {run?.current_stage === "founder_final_review" ? (
            <div className="admin-actions">
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  act({ action: "final_review", run_id: run.id, decision: "approve" })
                }
              >
                Approve final result
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  act({ action: "final_review", run_id: run.id, decision: "reject" })
                }
              >
                Reject final result
              </button>
            </div>
          ) : null}
          {run?.allocation ? (
            <div data-testid="agent-allocation">
              <p>
                Available/routable workforce: 36. Participating: {run.allocation.count}.{" "}
                activated_all_36: {String(run.allocation.activated_all_36)}
              </p>
              <details open>
                <summary>Why each participating agent was selected</summary>
                <pre className="admin-pre">
                  {JSON.stringify(run.allocation.selection_reasons || [], null, 2)}
                </pre>
              </details>
              <details>
                <summary>High-ranking agents not selected (sample)</summary>
                <pre className="admin-pre">
                  {JSON.stringify((run.allocation.rejected_agents || []).slice(0, 8), null, 2)}
                </pre>
              </details>
              <p>
                Delegation:{" "}
                {run.delegation?.chain?.map((c) => `${c.from}→${c.to}`).join(", ") || "—"}
              </p>
            </div>
          ) : null}
          {run?.protected_actions || run?.proof_pack?.protected_actions ? (
            <div data-testid="protected-actions">
              <h3>Protected actions</h3>
              <pre className="admin-pre">
                {JSON.stringify(
                  run.protected_actions || run.proof_pack?.protected_actions,
                  null,
                  2
                )}
              </pre>
            </div>
          ) : null}
          <div data-testid="simulation-progress">
            <h3>Simulation progress</h3>
            {run ? (
              <dl className="integration-metrics-grid">
                <div className="integration-metric-card">
                  <dt>Ready tasks</dt>
                  <dd>{run?.progress?.ready || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Running</dt>
                  <dd>{run?.progress?.running || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Blocked</dt>
                  <dd>{run?.progress?.blocked || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Completed</dt>
                  <dd>{run?.progress?.completed ?? (run?.verification?.ok ? 1 : 0)}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Evidence</dt>
                  <dd>{run?.evidence?.count || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Memory</dt>
                  <dd>{run?.memory?.count || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Learning</dt>
                  <dd>{run?.learning?.count || 0}</dd>
                </div>
                <div className="integration-metric-card">
                  <dt>Recovery</dt>
                  <dd>{run?.recovery_count || 0}</dd>
                </div>
              </dl>
            ) : null}
            <details>
              <summary>Technical JSON</summary>
              <pre className="admin-pre">
                {JSON.stringify(
                  run
                    ? {
                        active_stage: run.current_stage,
                        status: run.status,
                        verification: run.verification,
                        delegations: run.delegation?.chain || [],
                        note: "No fabricated live agent prose.",
                      }
                    : { note: "No run loaded" },
                  null,
                  2
                )}
              </pre>
            </details>
          </div>
        </section>
      ) : null}

      {!loading && tab === "evidence" ? (
        <section className="admin-panel" data-testid="integration-evidence">
          <h2>Evidence Manifest</h2>
          {getEvidenceGuidance(flowCtx) ? (
            <EmptyState
              title={getEvidenceGuidance(flowCtx).title}
              reason={getEvidenceGuidance(flowCtx).reason}
              nextAction={getEvidenceGuidance(flowCtx).nextAction}
            />
          ) : (
            <ul className="admin-list" data-testid="evidence-list">
              {(evidence?.items || evidence?.entries || []).map((item, i) => (
                <li key={item.id || i}>
                  <strong>{item.kind || item.type || "evidence"}</strong>
                  {item.task_id ? ` · task ${item.task_id}` : ""}
                  {item.agent ? ` · ${item.agent}` : ""}
                  {item.verified != null ? ` · verified: ${item.verified}` : ""}
                  {item.created_at ? ` · ${item.created_at}` : ""}
                </li>
              ))}
            </ul>
          )}
          <details>
            <summary>Technical JSON</summary>
            <pre className="admin-pre">{JSON.stringify(evidence || run?.evidence, null, 2)}</pre>
          </details>
        </section>
      ) : null}

      {!loading && tab === "memory" ? (
        <section className="admin-panel" data-testid="integration-memory">
          <h2>Memory (project-scoped)</h2>
          {getMemoryGuidance(flowCtx) ? (
            <div data-testid="memory-empty-state">
              <EmptyState
                title={getMemoryGuidance(flowCtx).title}
                reason={getMemoryGuidance(flowCtx).reason}
              />
            </div>
          ) : (
            <ul className="admin-list" data-testid="memory-list">
              {memory.map((entry, i) => (
                <li key={entry.id || i}>
                  <strong>{entry.scope || entry.kind || "memory"}</strong>
                  {entry.summary ? ` — ${entry.summary}` : ""}
                  {entry.created_at ? ` · ${entry.created_at}` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {!loading && tab === "learning" ? (
        <section className="admin-panel" data-testid="integration-learning">
          <h2>Learning Proposals (never auto-applied)</h2>
          {getLearningGuidance(flowCtx) ? (
            <div data-testid="learning-empty-state">
              <EmptyState
                title={getLearningGuidance(flowCtx).title}
                reason={getLearningGuidance(flowCtx).reason}
              />
            </div>
          ) : (
            <ul className="admin-list" data-testid="learning-list">
              {learning.map((p, i) => (
                <li key={p.id || i}>
                  <strong>{p.status || "proposal"}</strong>
                  {p.scope ? ` · ${p.scope}` : ""}
                  {p.summary ? ` — ${p.summary}` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {!loading && tab === "proof" ? (
        <section className="admin-panel" data-testid="integration-proof">
          <h2>Founder Proof Pack</h2>
          <p role="status">
            Proof status: <StatusBadge status={proofStatus} />{" "}
            <span data-testid="proof-pack-status">{proofStatus}</span>
          </p>
          {getProofPackGuidance(flowCtx) ? (
            <EmptyState
              title={getProofPackGuidance(flowCtx).title}
              reason={getProofPackGuidance(flowCtx).reason}
              nextAction={getProofPackGuidance(flowCtx).nextAction}
              data-testid="proof-pack-guided-empty"
            >
              {getProofPackGuidance(flowCtx).prerequisites ? (
                <ul>
                  {getProofPackGuidance(flowCtx).prerequisites.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : null}
              <p className="admin-muted">
                Live execution: false · Fabricated execution: false · Provider: unconfigured
              </p>
            </EmptyState>
          ) : null}
          <details>
            <summary>Lineage (technical details)</summary>
            <pre className="admin-pre">
              {JSON.stringify(
                {
                  objective: run?.objective,
                  approval: run?.approval_package,
                  evidence: run?.evidence,
                  memory: run?.memory,
                  learning: run?.learning,
                  final_review: run?.final_review,
                  live_provider_limitations: {
                    provider_called: run?.provider_called === true,
                    fabricated_execution: run?.fabricated_execution === true,
                    live_execution_ready: false,
                  },
                },
                null,
                2
              )}
            </pre>
          </details>
          {proof || run?.proof_pack ? (
            <details>
              <summary>Raw proof pack JSON</summary>
              <pre className="admin-pre">{JSON.stringify(proof || run?.proof_pack, null, 2)}</pre>
            </details>
          ) : null}
        </section>
      ) : null}
    </AdminShell>
  );
}
