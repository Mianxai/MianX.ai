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
  mapProofStatusFromRun,
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
import { buildFounderProofViewModel } from "@/lib/core/integration/founder-proof-view-model";
import {
  isFounderProductionProofRun,
  isTerminalFounderProofRun,
} from "@/lib/core/integration/founder-proof-canonical";
import IntegrationContextBanner from "@/components/admin/integration/IntegrationContextBanner";
import IntegrationFlowStepper from "@/components/admin/integration/IntegrationFlowStepper";
import IntegrationRunSelector from "@/components/admin/integration/IntegrationRunSelector";
import IntegrationObjectiveForm from "@/components/admin/integration/IntegrationObjectiveForm";
import IntegrationClarificationView from "@/components/admin/integration/IntegrationClarificationView";
import IntegrationFounderWorkflowGuide from "@/components/admin/integration/IntegrationFounderWorkflowGuide";
import IntegrationPlanReview from "@/components/admin/integration/IntegrationPlanReview";
import IntegrationSimulationPanel from "@/components/admin/integration/IntegrationSimulationPanel";
import {
  EvidenceCards,
  MemoryCards,
  LearningCards,
  ProofPackSummary,
} from "@/components/admin/integration/IntegrationArtifactCards";
import FounderGuidedPanel from "@/components/admin/FounderGuidedPanel";
import FounderQuickStart from "@/components/admin/FounderQuickStart";
import ProofRecoveryPanel from "@/components/admin/integration/ProofRecoveryPanel";
import ProofDiagnosticsPanel from "@/components/admin/integration/ProofDiagnosticsPanel";
import { resolveIntegrationTab, tabForFounderProofStage } from "@/lib/core/integration/stage-tab";
import TechnicalDetails from "@/components/admin/integration/TechnicalDetails";

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
  const explicitTab = searchParams?.get("tab");
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
  const [opsSummary, setOpsSummary] = useState(null);
  const [proofStartInFlight, setProofStartInFlight] = useState(false);
  const [clarificationAnswer, setClarificationAnswer] = useState("");
  const [clarificationSubmitting, setClarificationSubmitting] = useState(false);
  const [clarificationError, setClarificationError] = useState("");
  const [proofStatus, setProofStatus] = useState("not_started");
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [correctionNotice, setCorrectionNotice] = useState(null);

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
  const activeFounderProofRunCount = dash?.activeFounderProofRunCount || 0;
  const hasActiveFounderProofRun = activeFounderProofRunCount > 0;
  const duplicateActiveFounderProofDetected = Boolean(
    dash?.duplicateActiveFounderProofDetected
  );
  const nonCanonicalActiveFounderProofRunIds =
    dash?.nonCanonicalActiveFounderProofRunIds || [];
  const canStartProof = Boolean(
    !busy &&
      !loading &&
      !projectsLoading &&
      projectsLoaded &&
      !projectsError &&
      isActiveProofProject(selectedProject) &&
      !hasActiveFounderProofRun &&
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
              : hasActiveFounderProofRun
                ? "A production Founder proof is already in progress. Continue from the current stage."
                : !simulationReady
                  ? "Simulation readiness is false."
                  : null;

  const setTab = useCallback(
    (next, extra = {}) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("tab", next || "dashboard");
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

  // Stage-aware default tab when Founder did not pick an explicit tab.
  useEffect(() => {
    if (explicitTab) return;
    if (!run?.current_stage) return;
    const preferred = tabForFounderProofStage(
      run.current_stage,
      mapProofStatusFromRun(run)
    );
    if (preferred && preferred !== "dashboard") {
      setTab(preferred);
    }
  }, [explicitTab, run?.id, run?.current_stage, setTab, run]);

  const tab = resolveIntegrationTab({
    explicitTab,
    stage: run?.current_stage,
    proofStatus: run ? mapProofStatusFromRun(run) : proofStatus,
  });

  const projectRuns = useMemo(
    () => filterRunsForProject(dash?.runs, projectId),
    [dash?.runs, projectId]
  );

  const evidenceCount = useMemo(() => {
    if (evidence?.items?.length) return evidence.items.length;
    if (evidence?.entries?.length) return evidence.entries.length;
    return Number(run?.evidence?.count || 0) || 0;
  }, [evidence, run]);

  const memoryCount = useMemo(
    () => (Array.isArray(memory) ? memory.length : Number(run?.memory?.count || 0) || 0),
    [memory, run]
  );

  const learningCount = useMemo(
    () => (Array.isArray(learning) ? learning.length : Number(run?.learning?.count || 0) || 0),
    [learning, run]
  );

  const proofViewModel = useMemo(
    () =>
      buildFounderProofViewModel({
        projectId,
        projectName: selectedProject?.name,
        hasProject: Boolean(projectId && selectedProject),
        run,
        evidenceCount,
        memoryCount,
        learningCount,
        selectedAgentCount: Number(run?.allocation?.count || 0) || 0,
        duplicateCount: Number(dash?.nonCanonicalActiveFounderProofRunIds?.length || 0),
        providerConfigured: Boolean(dash?.live_execution_ready),
        liveExecutionReady: Boolean(dash?.live_execution_ready),
      }),
    [
      projectId,
      selectedProject,
      run,
      evidenceCount,
      memoryCount,
      learningCount,
      dash?.nonCanonicalActiveFounderProofRunIds,
      dash?.live_execution_ready,
    ]
  );

  const canonicalRuns = useMemo(() => {
    const canonicalId = dash?.canonicalFounderProofRunId || run?.id;
    return projectRuns.filter(
      (r) =>
        r.id === canonicalId ||
        r.is_canonical_active ||
        (isFounderProductionProofRun(r) && !isTerminalFounderProofRun(r) && !r.is_duplicate_active)
    );
  }, [projectRuns, dash?.canonicalFounderProofRunId, run?.id]);

  const otherRuns = useMemo(() => {
    const canonIds = new Set(canonicalRuns.map((r) => r.id));
    return projectRuns.filter((r) => !canonIds.has(r.id));
  }, [projectRuns, canonicalRuns]);

  const flowCtx = useMemo(
    () => ({
      hasProject: Boolean(projectId && selectedProject),
      hasRun: Boolean(run?.id),
      proofStatus: run ? mapProofStatusFromRun(run) : proofStatus,
      runStage: run?.current_stage,
      runStatus: run?.status,
      run,
      evidenceAvailable: evidenceCount > 0,
      evidenceCount,
      memoryCount,
      learningCount,
      selectedAgentCount: Number(run?.allocation?.count || 0) || 0,
      isProductionProof: Boolean(run?.proof?.is_production_proof),
      objectiveTitle: run?.objective?.title,
    }),
    [
      projectId,
      selectedProject,
      run,
      proofStatus,
      evidenceCount,
      memoryCount,
      learningCount,
    ]
  );

  const stepStates = useMemo(
    () => proofViewModel.stepSets || deriveStepStates(flowCtx),
    [proofViewModel, flowCtx]
  );

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
    if (!projectId || runIdParam || !dash?.canonicalFounderProofRunId) return;
    setTab(tab, { run_id: dash.canonicalFounderProofRunId });
  }, [projectId, runIdParam, dash?.canonicalFounderProofRunId, tab, setTab]);

  useEffect(() => {
    if (!projectId || !runIdParam || !dash?.runs?.length) return;
    const match = dash.runs.find((r) => r.id === runIdParam);
    if (match?.project_id && match.project_id !== projectId) {
      setTab(tab, { run_id: "" });
      return;
    }
    // Never keep a duplicate active run selected — align URL to canonical.
    if (
      match?.is_duplicate_active &&
      dash?.canonicalFounderProofRunId &&
      runIdParam !== dash.canonicalFounderProofRunId
    ) {
      setTab(tab, { run_id: dash.canonicalFounderProofRunId });
    }
  }, [projectId, runIdParam, dash?.runs, dash?.canonicalFounderProofRunId, tab, setTab]);

  useEffect(() => {
    if (!projectId || runIdParam || !projectRuns.length) return;
    if (projectRuns.length === 1 && !projectRuns[0].is_duplicate_active) {
      setTab(tab, { run_id: projectRuns[0].id });
      return;
    }
    const canonical =
      projectRuns.find((r) => r.is_canonical_active) ||
      (dash?.canonicalFounderProofRunId
        ? projectRuns.find((r) => r.id === dash.canonicalFounderProofRunId)
        : null);
    if (canonical?.id) {
      setTab(tab, { run_id: canonical.id });
    }
  }, [projectId, runIdParam, projectRuns, dash?.canonicalFounderProofRunId, tab, setTab]);

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
    const paramRun = runIdParam
      ? runsForProject.find((r) => r.id === runIdParam)
      : null;
    // Prefer canonical; never treat an active duplicate as the loaded run.
    const activeRunId =
      (paramRun && !paramRun.is_duplicate_active ? paramRun.id : null) ||
      dashRes.data?.canonicalFounderProofRunId ||
      (runsForProject.find((r) => r.is_canonical_active)?.id ?? null) ||
      (runsForProject.length === 1 && !runsForProject[0].is_duplicate_active
        ? runsForProject[0].id
        : null);
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
    if (projectId) {
      const opsRes = await getJson(
        `/api/admin/operations/summary?project_id=${encodeURIComponent(projectId)}`,
        router
      );
      setOpsSummary(opsRes.ok ? opsRes.data : null);
    } else {
      setOpsSummary(null);
    }
    setLoading(false);
  }, [projectId, router, runIdParam, executionMode]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(body) {
    setBusy(true);
    setError("");
    setCorrectionNotice(null);
    const res = await postJson("/api/admin/integration", body, router);
    setBusy(false);
    if (!res.ok) {
      const code = res.data?.code || res.data?.error?.code;
      const msg =
        res.data?.error?.message ||
        res.data?.message ||
        res.data?.error ||
        "Action failed";
      setError(typeof msg === "string" ? msg : "Action failed");
      if (code === "CONFLICT" || res.data?.code === "CONFLICT") {
        await load();
      }
      return null;
    }
    const nextRun = res.data?.run || res.data?.value?.run || res.data;
    const preferCanonical =
      res.data?.canonical_run_id || dash?.canonicalFounderProofRunId || null;
    if (
      body?.action === "return_plan_for_corrections" ||
      (body?.action === "return_for_changes" &&
        body?.regenerate_plan !== false)
    ) {
      setCorrectionNotice({
        message:
          "Plan corrected and durable task ownership saved. Review the corrected plan before approval. Simulation has not started.",
        runId: nextRun?.id || body?.run_id,
      });
      if (nextRun?.id) {
        setRun(nextRun);
        setTab("plan", { run_id: nextRun.id });
      }
      await load();
      return res.data;
    }
    if (body?.action === "cancel_founder_proof_duplicate" && preferCanonical) {
      setTab(tab, { run_id: preferCanonical });
    } else if (nextRun?.id && body?.action !== "cancel_founder_proof_duplicate") {
      setRun(nextRun);
      setTab(tab, { run_id: nextRun.id });
    } else if (nextRun?.id && preferCanonical) {
      setTab(tab, { run_id: preferCanonical });
    }
    await load();
    return res.data;
  }

  return (
    <AdminShell
      title="Founder Proof"
      helpProjectName={selectedProject?.name || null}
      helpProofState={opsSummary?.founder_proof_ui || null}
    >
      <PageHeader
        title="Founder Proof"
        description="LEVEL 1 — Deterministic simulation proof. Not live AI execution. Founder-operated: no provider calls, no automatic approvals."
        scope="proof"
        howThisWorks="Follow Next Founder Action and Quick Start. Advanced Runtime tools are optional and not required to complete this proof."
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

      <IntegrationFounderWorkflowGuide
        run={run}
        runStage={run?.current_stage}
        proofStatus={proofStatus}
        hasRun={Boolean(run?.id || hasActiveFounderProofRun)}
        evidenceCount={evidenceCount}
        memoryCount={memoryCount}
        learningCount={learningCount}
      />

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
      {correctionNotice ? (
        <div
          className="admin-success founder-correction-notice"
          role="status"
          data-testid="plan-correction-success"
        >
          <p>{correctionNotice.message}</p>
          <button
            type="button"
            className="header-btn"
            data-testid="review-corrected-plan"
            onClick={() => {
              setTab("plan", {
                run_id: correctionNotice.runId || run?.id || undefined,
              });
              setCorrectionNotice(null);
            }}
          >
            Review corrected plan
          </button>
        </div>
      ) : null}
      {loading ? <MianxLoader variant="section" label="Loading…" /> : null}

      {!loading ? (
        <>
          <IntegrationContextBanner
            projectId={projectId}
            selectedProject={selectedProject}
            onFocusProjectPicker={focusProjectPicker}
          />
          {projectId ? (
            <>
              {(opsSummary?.founder_proof_ui &&
                (Number(activeFounderProofRunCount) === 0 ||
                  ["resolver_error", "persistence_error", "no_proof"].includes(
                    opsSummary.founder_proof_ui.state
                  ) ||
                  ["resumable_historical", "terminal_only", "empty"].includes(
                    opsSummary.founder_proof_ui.caseId
                  ))) ||
              opsSummary?.proof_persistence?.ok === false ? (
                <ProofRecoveryPanel
                  founderProofUi={
                    opsSummary?.founder_proof_ui || {
                      state:
                        opsSummary?.proof_persistence?.ok === false
                          ? "persistence_error"
                          : "no_proof",
                      title: "Founder Proof status could not be verified",
                      explanation:
                        opsSummary?.proof_persistence?.error ||
                        "Check diagnostics before starting a new proof.",
                      severity: "error",
                      primaryCta: { id: "retry", label: "Retry" },
                    }
                  }
                  projectId={projectId}
                  onRetry={load}
                />
              ) : null}
              <FounderGuidedPanel
                summary={opsSummary}
                projectId={projectId}
                projectName={selectedProject?.name}
                projects={selectableProjects}
                onRefresh={load}
                proofViewModel={proofViewModel}
              />
              <FounderQuickStart run={run} hasProject={Boolean(projectId && selectedProject)} />
              {proofViewModel?.planCorrectionRequired ||
              proofViewModel?.simulationReadiness?.status === "blocked" ? (
                <section
                  className="cc-card"
                  data-testid="plan-readiness-summary"
                  aria-labelledby="plan-ready-h"
                >
                  <h2 id="plan-ready-h">Plan / simulation readiness</h2>
                  <p role="status">
                    Simulation Approval is blocked until durable per-task agent assignments are
                    regenerated.
                  </p>
                  <ul>
                    {(proofViewModel.simulationReadiness?.reasons || [])
                      .slice(0, 3)
                      .map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                  </ul>
                </section>
              ) : null}
              <section
                className="cc-card founder-proof-progress-summary"
                data-testid="proof-progress-summary"
              >
                <h2>Proof progress</h2>
                <p>
                  {proofViewModel.founderStageLabel} — {proofViewModel.founderStatusLabel}
                </p>
                <p className="cc-muted">
                  Tasks {proofViewModel.taskCount} · Evidence {proofViewModel.evidenceCount} ·
                  Memory {proofViewModel.memoryCount} · Learning {proofViewModel.learningCount} ·
                  Agents allocated {proofViewModel.selectedAgentCount} (proposed only until Start)
                </p>
              </section>
              <TechnicalDetails title="Advanced / Technical details">
                <ProofDiagnosticsPanel
                  projectId={projectId}
                  runId={runIdParam || run?.id || null}
                />
                <IntegrationFlowStepper stepStates={stepStates} />
                {projectId && projectRuns.length > 0 ? (
                  <IntegrationRunSelector
                    runs={projectRuns}
                    value={runIdParam || run?.id || ""}
                    onChange={(id) => {
                      const target = projectRuns.find((r) => r.id === id);
                      if (target?.is_duplicate_active && dash?.canonicalFounderProofRunId) {
                        setTab(tab, { run_id: dash.canonicalFounderProofRunId });
                        return;
                      }
                      setTab(tab, { run_id: id });
                    }}
                  />
                ) : null}
              </TechnicalDetails>
            </>
          ) : null}
        </>
      ) : null}

      {tab === "dashboard" ? (
        <section className="admin-panel" data-testid="integration-dashboard">
          <h2>Control Room — Founder Proof</h2>
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
            <strong>{dash?.routable_agent_audit?.actual_routable ?? "—"}</strong> / 38 expected.
            Live AI execution remains disabled unless separately configured.
          </p>

          {!projectRuns.length && projectId ? (
            <EmptyState
              title="No integration runs for this project"
              description="Create a Founder objective or start the production proof below."
            />
          ) : null}
          {canonicalRuns.length > 0 ? (
            <ul className="admin-list" data-testid="control-room-canonical-runs">
              {canonicalRuns.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => setTab("plan", { run_id: r.id })}>
                    {r.objective_title || r.id}
                  </button>{" "}
                  <StatusBadge status={r.status} />{" "}
                  {proofViewModel.founderStageLabel || r.stage || r.current_stage}
                </li>
              ))}
            </ul>
          ) : null}
          {otherRuns.length > 0 ? (
            <TechnicalDetails
              title="Other objectives / history — not part of this Founder Proof"
              testId="control-room-other-runs"
            >
              <p className="cc-muted" data-testid="other-objectives-label">
                Other objectives — not part of this Founder Proof. These do not count toward Founder
                Proof progress.
              </p>
              <ul className="admin-list">
                {otherRuns.map((r) => (
                  <li key={r.id}>
                    <button type="button" onClick={() => setTab("plan", { run_id: r.id })}>
                      {r.objective_title || r.id}
                    </button>{" "}
                    <StatusBadge status={r.status} /> stage={r.stage || r.current_stage} mode={r.mode}
                    {r.status === "cancelled" || r.stage === "cancelled" ? " · history" : ""}
                    {r.mode === "live_provider" ? " · live-provider (unrelated)" : ""}
                  </li>
                ))}
              </ul>
            </TechnicalDetails>
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

            {duplicateActiveFounderProofDetected &&
            nonCanonicalActiveFounderProofRunIds.length ? (
              <div
                className="admin-warning"
                role="status"
                data-testid="duplicate-founder-proof-warning"
              >
                <p>
                  Multiple non-terminal active production Founder proof runs were detected.
                  Use the Resolve duplicate proof runs panel above — cancel each non-canonical
                  duplicate before clarification.
                </p>
                <button
                  type="button"
                  className="header-btn-ghost"
                  data-testid="jump-to-duplicate-resolution"
                  onClick={() => {
                    const el = document.getElementById("duplicates");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Jump to duplicate resolution
                </button>
              </div>
            ) : null}

            <div className="admin-actions">
              {hasActiveFounderProofRun ? (
                <button
                  type="button"
                  data-testid="continue-founder-proof"
                  onClick={() => {
                    if (!run?.id) return;
                    if (run.current_stage === "clarification_required") {
                      setTab("objective", { run_id: run.id });
                      return;
                    }
                    if (run.current_stage === "founder_approval_required") {
                      setTab("plan", { run_id: run.id });
                      return;
                    }
                    setTab("simulation", { run_id: run.id });
                  }}
                  aria-disabled={!run?.id}
                  title="Continue from the current production proof stage"
                >
                  {run?.current_stage === "clarification_required"
                    ? "Answer Clarification"
                    : "Continue Founder Proof"}
                </button>
              ) : (
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
              )}
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
                    disabled={busy || proofStartInFlight}
                    onClick={async () => {
                      if (proofStartInFlight) return;
                      setProofStartInFlight(true);
                      try {
                        await act({
                          action: "start_founder_proof",
                          project_id: projectId,
                          confirmation: true,
                          actor: "founder",
                        });
                      } finally {
                        setProofConfirmOpen(false);
                        setProofStartInFlight(false);
                      }
                    }}
                  >
                    {proofStartInFlight ? "Creating Founder Proof…" : "Confirm — start proof"}
                  </button>
                  <button
                    type="button"
                    data-testid="proof-confirm-no"
                    disabled={busy || proofStartInFlight}
                    onClick={() => {
                      if (proofStartInFlight) return;
                      setProofConfirmOpen(false);
                    }}
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
          {run?.current_stage === "clarification_required" ? (
            <>
              {duplicateActiveFounderProofDetected ? (
                <p className="admin-warning" role="status">
                  Resolve duplicates in the panel above before submitting clarification. Your typed
                  answer is retained.
                </p>
              ) : null}
              <IntegrationClarificationView
                run={run}
                projectName={selectedProject?.name}
                answer={clarificationAnswer}
                setAnswer={setClarificationAnswer}
                busy={busy}
                submitting={clarificationSubmitting}
                error={clarificationError || error}
                duplicateActive={duplicateActiveFounderProofDetected}
                duplicateCount={nonCanonicalActiveFounderProofRunIds.length}
                onSubmit={async () => {
                  if (clarificationSubmitting || busy) return;
                  if (duplicateActiveFounderProofDetected) {
                    setClarificationError(
                      "Duplicate active Founder proof runs exist — resolve duplicates before clarification."
                    );
                    return;
                  }
                  setClarificationSubmitting(true);
                  setClarificationError("");
                  setError("");
                  const res = await postJson(
                    "/api/admin/integration",
                    {
                      action: "submit_clarification",
                      project_id: projectId,
                      run_id: run.id,
                      answer: clarificationAnswer,
                      actor: "founder",
                    },
                    router
                  );
                  setClarificationSubmitting(false);
                  if (!res.ok) {
                    const msg =
                      res.data?.error?.message ||
                      res.data?.message ||
                      "Clarification submission failed";
                    setClarificationError(msg);
                    setError(msg);
                    // Retain typed answer on failure / duplicate rejection.
                    return;
                  }
                  const nextRun = res.data?.run;
                  if (nextRun?.id) {
                    setRun(nextRun);
                    if (res.data?.proof_status) setProofStatus(res.data.proof_status);
                    setTab("plan", { run_id: nextRun.id });
                  }
                  setClarificationAnswer("");
                  await load();
                }}
              />
            </>
          ) : hasActiveFounderProofRun && run ? (
            <div data-testid="integration-objective-readonly">
              <h2>Canonical objective</h2>
              <p className="cc-muted">
                A Founder Proof is already active. Objective creation is unavailable for this
                project until the current run completes or is cancelled.
              </p>
              <dl className="cc-detail-dl">
                <div>
                  <dt>Title</dt>
                  <dd>{run.objective?.title || "—"}</dd>
                </div>
                <div>
                  <dt>Stage</dt>
                  <dd>{run.current_stage}</dd>
                </div>
                <div>
                  <dt>Canonical run</dt>
                  <dd>
                    <code>{run.id}</code>
                  </dd>
                </div>
              </dl>
              <p role="status" data-testid="create-objective-disabled-reason">
                Create objective is unavailable while an active Founder Proof exists. Use the next
                Founder action for the current stage.
              </p>
              <details>
                <summary>Technical details</summary>
                <pre className="runtime-code">{JSON.stringify(run.objective, null, 2)}</pre>
              </details>
            </div>
          ) : (
            <>
              <h2>Founder Objective Intake</h2>
              <p>
                <Link href="/admin/company-builder">Company Builder</Link> can attach an integration
                pipeline after blueprint approval. Simulation does not equal a completed real
                company.
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
                clarificationRequired={false}
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
                onSubmitClarification={() => {}}
              />
            </>
          )}
        </section>
      ) : null}

      {!loading && tab === "plan" ? (
        <section className="admin-panel" data-testid="integration-plan">
          {getPlanGuidance(flowCtx) ? (
            <EmptyState
              title={getPlanGuidance(flowCtx).title}
              reason={getPlanGuidance(flowCtx).reason}
              nextAction={getPlanGuidance(flowCtx).nextAction}
              cta={
                getPlanGuidance(flowCtx).actionTab ? (
                  <button
                    type="button"
                    className="header-btn"
                    onClick={() => setTab(getPlanGuidance(flowCtx).actionTab)}
                  >
                    Go to{" "}
                    {getPlanGuidance(flowCtx).actionTab === "objective"
                      ? "Objective"
                      : "Control Room"}
                  </button>
                ) : null
              }
            />
          ) : null}
          {run?.current_stage === "objective_validated" ? (
            <button
              type="button"
              className="header-btn"
              disabled={busy}
              onClick={() => act({ action: "plan", run_id: run.id, project_id: projectId })}
            >
              Generate deterministic plan
            </button>
          ) : null}
          {run &&
          ([
            "founder_approval_required",
            "simulation_approval_required",
            "approved_for_simulation",
            "founder_final_review",
            "completed",
          ].includes(run.current_stage) ||
            run.approval_package) ? (
            <IntegrationPlanReview
              run={run}
              projectName={selectedProject?.name}
              busy={busy}
              onApprove={() =>
                act({
                  action: "approve_plan",
                  run_id: run.id,
                  project_id: projectId,
                })
              }
              onReturn={(note) =>
                act({
                  action: "return_for_changes",
                  run_id: run.id,
                  project_id: projectId,
                  note,
                })
              }
              onReject={(note) =>
                act({
                  action: "reject",
                  run_id: run.id,
                  project_id: projectId,
                  note,
                })
              }
            />
          ) : null}
          {run &&
          ["objective_validated", "clarification_required", "founder_approval_required"].includes(
            run.current_stage
          ) ? (
            <p role="status" data-testid="sim-blocked-banner">
              Simulation is blocked until Founder explicitly approves the plan and then the
              simulation. Tasks cannot be claimed yet.
            </p>
          ) : null}
        </section>
      ) : null}

      {!loading && tab === "simulation" ? (
        <section className="admin-panel" data-testid="integration-simulation">
          <IntegrationSimulationPanel
            run={run}
            busy={busy}
            projectName={selectedProject?.name}
            guidance={getSimulationGuidance(flowCtx)}
            onOpenPlan={() => setTab("plan")}
            onApproveSimulation={() =>
              act({
                action: "approve_deterministic_simulation",
                run_id: run.id,
                project_id: projectId,
                expected_stage: run.current_stage,
                expected_status: run.status,
                expected_version: run.version ?? null,
                idempotency_key: `sim-approve:${run.id}:${run.version || 0}`,
              })
            }
            onReturnPlanForCorrections={(note) =>
              act({
                action: "return_plan_for_corrections",
                run_id: run.id,
                project_id: projectId,
                note,
                expected_stage: "simulation_approval_required",
                expected_version: run.version ?? null,
                idempotency_key: `return-corrections:${run.id}:${run.version || 0}`,
              })
            }
            onStartSimulation={() =>
              act({ action: "start_simulation", run_id: run.id, project_id: projectId })
            }
            onPause={() => act({ action: "pause", run_id: run.id })}
            onResume={() => act({ action: "resume", run_id: run.id })}
            onCancel={() => act({ action: "cancel", run_id: run.id })}
            onRecoveryTest={() =>
              act({ action: "deterministic_recovery_test", run_id: run.id })
            }
          />
          {run?.current_stage === "founder_final_review" ? (
            <div className="admin-actions">
              <button
                type="button"
                className="header-btn"
                disabled={busy}
                onClick={() => setTab("proof", { run_id: run.id })}
              >
                Open Proof Pack / Final Review
              </button>
            </div>
          ) : null}
        </section>
      ) : null}

      {!loading && tab === "evidence" ? (
        <section className="admin-panel" data-testid="integration-evidence">
          <h2>Evidence</h2>
          <p className="cc-muted">Readable simulation artefacts — not raw JSON.</p>
          {getEvidenceGuidance(flowCtx) ? (
            <EmptyState
              title={getEvidenceGuidance(flowCtx).title}
              reason={getEvidenceGuidance(flowCtx).reason}
              nextAction={getEvidenceGuidance(flowCtx).nextAction}
            />
          ) : (
            <EvidenceCards
              evidence={evidence}
              empty={
                <EmptyState
                  title="No evidence yet"
                  reason="Evidence appears after deterministic simulation completes verification."
                  nextAction="Start or continue simulation from the Simulation tab."
                />
              }
            />
          )}
          <details className="cc-card">
            <summary>Technical details</summary>
            <pre className="admin-pre">{JSON.stringify(evidence, null, 2)}</pre>
          </details>
        </section>
      ) : null}

      {!loading && tab === "memory" ? (
        <section className="admin-panel" data-testid="integration-memory">
          <h2>Memory candidates</h2>
          <p className="cc-muted">Candidates only — nothing auto-promotes.</p>
          {getMemoryGuidance(flowCtx) ? (
            <div data-testid="memory-empty-state">
              <EmptyState
                title={getMemoryGuidance(flowCtx).title}
                reason={getMemoryGuidance(flowCtx).reason}
              />
            </div>
          ) : (
            <MemoryCards memory={memory} />
          )}
          <details className="cc-card">
            <summary>Technical details</summary>
            <pre className="admin-pre">{JSON.stringify(memory, null, 2)}</pre>
          </details>
        </section>
      ) : null}

      {!loading && tab === "learning" ? (
        <section className="admin-panel" data-testid="integration-learning">
          <h2>Learning proposals</h2>
          <p className="cc-muted">Never auto-applied to agent system prompts.</p>
          {getLearningGuidance(flowCtx) ? (
            <div data-testid="learning-empty-state">
              <EmptyState
                title={getLearningGuidance(flowCtx).title}
                reason={getLearningGuidance(flowCtx).reason}
              />
            </div>
          ) : (
            <LearningCards learning={learning} />
          )}
          <details className="cc-card">
            <summary>Technical details</summary>
            <pre className="admin-pre">{JSON.stringify(learning, null, 2)}</pre>
          </details>
        </section>
      ) : null}

      {!loading && tab === "proof" ? (
        <section className="admin-panel" data-testid="integration-proof">
          {getProofPackGuidance(flowCtx) ? (
            <EmptyState
              title={getProofPackGuidance(flowCtx).title}
              reason={getProofPackGuidance(flowCtx).reason}
              nextAction={getProofPackGuidance(flowCtx).nextAction}
              data-testid="proof-pack-guided-empty"
            />
          ) : null}
          <ProofPackSummary
            run={run}
            proof={proof}
            busy={busy}
            onFinalApprove={() =>
              act({ action: "final_review", run_id: run.id, decision: "approve" })
            }
            onFinalReject={() =>
              act({ action: "final_review", run_id: run.id, decision: "reject" })
            }
            onFinalReturn={() =>
              act({
                action: "final_review",
                run_id: run.id,
                decision: "return_for_changes",
              })
            }
          />
        </section>
      ) : null}
    </AdminShell>
  );
}
