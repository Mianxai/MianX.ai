"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";

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
  const { projectId, setProjectId } = useAdminProject();
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
  const [title, setTitle] = useState("Prove MianX end-to-end autonomous integration");
  const [purpose, setPurpose] = useState(
    "Exercise template, planning, execution, and workforce engines as one operating system for MianX Core platform proof."
  );
  const [deliverables, setDeliverables] = useState("evidence manifest, founder proof pack");
  const [criteria, setCriteria] = useState("final founder review reached, lineage intact");

  const setTab = useCallback(
    (next, extra = {}) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "dashboard") params.delete("tab");
      else params.set("tab", next);
      if (extra.run_id) params.set("run_id", extra.run_id);
      else if (runIdParam) params.set("run_id", runIdParam);
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/integration?${qs}` : "/admin/integration");
    },
    [router, searchParams, projectId, runIdParam]
  );

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

    const activeRunId = runIdParam || dashRes.data?.runs?.[0]?.id;
    if (activeRunId) {
      const runRes = await getJson(
        `/api/admin/integration?action=run&run_id=${encodeURIComponent(activeRunId)}${q}`,
        router
      );
      if (runRes.ok) setRun(runRes.data?.run || null);
      if (tab === "evidence") {
        const ev = await getJson(
          `/api/admin/integration?action=evidence&run_id=${encodeURIComponent(activeRunId)}`,
          router
        );
        setEvidence(ev.data?.manifest || null);
      }
      if (tab === "memory") {
        const mem = await getJson(
          `/api/admin/integration?action=memory&run_id=${encodeURIComponent(activeRunId)}${q}`,
          router
        );
        setMemory(mem.data?.entries || []);
      }
      if (tab === "learning") {
        const learn = await getJson(
          `/api/admin/integration?action=learning&run_id=${encodeURIComponent(activeRunId)}${q}`,
          router
        );
        setLearning(learn.data?.proposals || []);
      }
      if (tab === "proof") {
        const pr = await getJson(
          `/api/admin/integration?action=proof&run_id=${encodeURIComponent(activeRunId)}`,
          router
        );
        setProof(pr.data?.proof_pack || null);
      }
    } else {
      setRun(null);
    }
    setLoading(false);
  }, [projectId, router, runIdParam, tab]);

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
        actions={<ProjectPicker value={projectId} onChange={setProjectId} />}
      />

      <div className="admin-truth-banner" data-testid="integration-truth-banner">
        <strong>Proof level:</strong> DETERMINISTIC SIMULATION. Live provider execution stays
        blocked unless a provider is configured and Founder enables live mode separately.
      </div>

      <div className="admin-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "is-active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error ? <div className="admin-error">{error}</div> : null}
      {loading ? <MianxLoader variant="section" label="Loading…" /> : null}

      {!loading && tab === "dashboard" ? (
        <section className="admin-panel" data-testid="integration-dashboard">
          <h2>Control Room — Integration</h2>
          <p>
            Routable agents:{" "}
            <strong>{dash?.routable_agent_audit?.actual_routable ?? "—"}</strong> / 36 expected.
            Live execution ready:{" "}
            <StatusBadge status={dash?.live_execution_ready ? "ready" : "blocked"} />
          </p>
          {!dash?.runs?.length ? (
            <EmptyState
              title="No integration runs"
              description="Create a Founder objective to start the end-to-end proof chain."
            />
          ) : (
            <ul className="admin-list">
              {dash.runs.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => setTab("plan", { run_id: r.id })}>
                    {r.objective_title || r.id}
                  </button>{" "}
                  <StatusBadge status={r.status} /> stage={r.stage} mode={r.mode} evidence=
                  {r.evidence_count} memory={r.memory_count} learning={r.learning_count}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {!loading && tab === "objective" ? (
        <section className="admin-panel" data-testid="integration-objective">
          <h2>Founder Objective Intake</h2>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Business purpose
            <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={4} />
          </label>
          <label>
            Deliverables
            <input value={deliverables} onChange={(e) => setDeliverables(e.target.value)} />
          </label>
          <label>
            Success criteria
            <input value={criteria} onChange={(e) => setCriteria(e.target.value)} />
          </label>
          <button
            type="button"
            disabled={busy || !projectId}
            onClick={() =>
              act({
                action: "create",
                objective: {
                  title,
                  business_purpose: purpose,
                  expected_deliverables: deliverables,
                  success_criteria: criteria,
                  project_id: projectId,
                  industry: "technology",
                  business_model: "subscription",
                  execution_mode: "deterministic_simulation",
                },
              })
            }
          >
            Create objective
          </button>
          {run?.current_stage === "clarification_required" ? (
            <button
              type="button"
              disabled={busy}
              onClick={() =>
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
            >
              Submit clarification
            </button>
          ) : null}
        </section>
      ) : null}

      {!loading && tab === "plan" ? (
        <section className="admin-panel" data-testid="integration-plan">
          <h2>Plan & Approval</h2>
          {!run ? (
            <EmptyState title="No run selected" description="Create an objective first." />
          ) : (
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
              {run.approval_package ? (
                <pre className="admin-pre">{JSON.stringify(run.approval_package, null, 2)}</pre>
              ) : null}
            </>
          )}
        </section>
      ) : null}

      {!loading && tab === "simulation" ? (
        <section className="admin-panel" data-testid="integration-simulation">
          <h2>Workforce Simulation</h2>
          <p>Simulation does not equal a completed real company or live AI execution.</p>
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
                disabled={busy}
                onClick={() => act({ action: "cancel", run_id: run.id })}
              >
                Cancel
              </button>
            </div>
          ) : null}
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
            <p>
              Allocated agents: {run.allocation.count} (not all 36). Delegation:{" "}
              {run.delegation?.chain?.map((c) => `${c.from}→${c.to}`).join(", ")}
            </p>
          ) : null}
        </section>
      ) : null}

      {!loading && tab === "evidence" ? (
        <section className="admin-panel">
          <h2>Evidence Manifest</h2>
          <pre className="admin-pre">{JSON.stringify(evidence || run?.evidence, null, 2)}</pre>
        </section>
      ) : null}

      {!loading && tab === "memory" ? (
        <section className="admin-panel">
          <h2>Memory (project-scoped)</h2>
          <pre className="admin-pre">{JSON.stringify(memory, null, 2)}</pre>
        </section>
      ) : null}

      {!loading && tab === "learning" ? (
        <section className="admin-panel">
          <h2>Learning Proposals (never auto-applied)</h2>
          <pre className="admin-pre">{JSON.stringify(learning, null, 2)}</pre>
        </section>
      ) : null}

      {!loading && tab === "proof" ? (
        <section className="admin-panel" data-testid="integration-proof">
          <h2>Founder Proof Pack</h2>
          <pre className="admin-pre">{JSON.stringify(proof || run?.proof_pack, null, 2)}</pre>
        </section>
      ) : null}
    </AdminShell>
  );
}
