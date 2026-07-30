/**
 * Playwright helpers for deterministic Admin E2E without live AI provider.
 * Auth: structurally valid JWT cookie passes middleware; APIs are mocked.
 */

export function makeStructurallyValidToken(payload = {}) {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString(
    "base64url"
  );
  const body = Buffer.from(
    JSON.stringify({
      sub: "e2e-admin",
      email: "admin@mianx.ai",
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...payload,
    })
  ).toString("base64url");
  return `${header}.${body}.sig`;
}

export const CANONICAL_ADMIN_ROUTES = [
  "/admin/command-center",
  "/admin/ceo-brief",
  "/admin/objectives",
  "/admin/company-builder",
  "/admin/inbox",
  "/admin/agents",
  "/admin/departments",
  "/admin/workflows",
  "/admin/schedule",
  "/admin/leads",
  "/admin/projects",
  "/admin/runtime/approvals",
  "/admin/knowledge",
  "/admin/memory",
  "/admin/learning",
  "/admin/outputs",
  "/admin/analytics",
  "/admin/templates",
  "/admin/planning",
  "/admin/workforce",
  "/admin/integration",
  "/admin/runtime",
  "/admin/runtime/agents",
  "/admin/runtime/tasks",
  "/admin/runtime/queue",
  "/admin/runtime/runs",
  "/admin/runtime/audit",
  "/admin/settings",
];

export const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
];

export const SCREENSHOT_ROUTES = [
  "/admin/command-center",
  "/admin/agents",
  "/admin/departments",
  "/admin/workflows",
  "/admin/objectives",
  "/admin/company-builder",
  "/admin/inbox",
  "/admin/runtime",
  "/admin/leads",
  "/admin/projects",
  "/admin/memory",
  "/admin/learning",
  "/admin/outputs",
];

const PROJECTS = [
  {
    id: "proj-proof-1",
    name: "MianX Internal Production Proof",
    slug: "mianx-internal-production-proof",
    status: "active",
  },
  { id: "proj-1", name: "MianX Core", slug: "mianx-core", status: "active" },
  { id: "proj-2", name: "Demo Workspace", slug: "demo-workspace", status: "active" },
  {
    id: "proj-archived",
    name: "Archived Demo",
    slug: "archived-demo",
    status: "archived",
    archived_at: "2026-01-01T00:00:00Z",
  },
];

function json(route, status, body) {
  return route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

/**
 * Install API mocks + session cookie for an authenticated admin shell.
 */
export async function installAdminMocks(page, { projectId = "proj-1", proofStage = null } = {}) {
  const token = makeStructurallyValidToken();
  const mockState = { proofStage };
  await page.context().addCookies([
    {
      name: "sb-access-token",
      value: token,
      domain: "127.0.0.1",
      path: "/",
      httpOnly: false,
      sameSite: "Lax",
      secure: false,
    },
  ]);

  // Founder Mode tour must not block E2E clicks by default.
  await page.addInitScript(() => {
    try {
      for (const id of ["anon", "e2e-admin"]) {
        window.localStorage.setItem(`mianx.founder.tour.v1.${id}`, "dismissed");
      }
    } catch {
      /* ignore */
    }
  });

  await page.route("**/api/**", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const path = url.pathname;
    const method = req.method();

    if (path === "/api/admin/session" && method === "DELETE") {
      return json(route, 200, { ok: true });
    }
    if (path === "/api/admin/notifications") {
      return json(route, 200, { newSubmissions: 2, inboxAttention: 1 });
    }
    if (path === "/api/admin/overview") {
      return json(route, 200, {
        submissions: { total: 4, new: 2, contacted: 1, converted: 1 },
        projects: { active: 2 },
        tasks: { queued: 1, in_progress: 0, blocked: 0 },
        approvals: { pending: 1 },
        runs: { failed: 0 },
        runtime: { ok: true, service: "mianx-core" },
        config: {
          supabase: true,
          providers: { anthropic: false },
          scheduler: { mode: "automatic", automaticProcessing: true },
        },
      });
    }
    if (path === "/api/admin/command-center") {
      return json(route, 200, {
        ok: true,
        projects: PROJECTS,
        selectedProjectId: url.searchParams.get("project_id") || projectId,
        metrics: {
          activeAgents: { value: 3, available: true },
          idleAgents: { value: 5, available: true },
          waitingApproval: { value: 1, available: true },
          queuedJobs: { value: 0, available: true },
          runningJobs: { value: 0, available: true },
          failedJobs: { value: 0, available: true },
          activeWorkflows: { value: 0, available: true },
          blockedWorkflows: { value: 0, available: true },
          activeProjects: { value: 2, available: true },
        },
        schedule: {
          mode: "automatic",
          automaticProcessing: true,
          platform: "github_actions",
          lastTickAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          expectedIntervalMs: 300000,
          expectedIntervalSec: 300,
        },
        providers: { anthropic: { status: "unconfigured" } },
        agentInventory: { executable: 36, executableCount: 36, catalogCount: 43 },
        hierarchy: { executableCount: 36 },
        agents: Array.from({ length: 36 }, (_, i) => ({
          slug: i === 0 ? "executive-ceo" : `agent-${i + 1}`,
          name: i === 0 ? "Executive Orchestrator" : `Agent ${i + 1}`,
          department: ["executive", "operations", "security", "hr", "qa"][i % 5],
          hierarchyLevel: ["L1", "L2", "L3"][i % 3],
          status: i < 3 ? "idle" : "idle",
          proposed_for_proof: i < 5,
        })),
        workflows: [],
        departments: [],
        ceoBrief: { available: true, items: [] },
        execution: { available: true, items: [] },
      });
    }
    if (path.startsWith("/api/admin/objectives")) {
      return json(route, 200, {
        objectives: [
          {
            id: "obj-proof-1",
            title: "Secure Internal Employee Onboarding Workflow",
            status: "awaiting_founder_action",
            kind: "integration_proof",
            project_id: "proj-proof-1",
          },
          {
            id: "obj-cancelled-1",
            title: "Cancelled duplicate objective",
            status: "cancelled",
            kind: "general",
            project_id: "proj-proof-1",
          },
        ],
        items: [],
        projects: PROJECTS,
      });
    }
    if (path.startsWith("/api/admin/operations/summary")) {
      const awaitingSim = mockState.proofStage === "simulation_approval_required";
      return json(route, 200, {
        ok: true,
        project_id: url.searchParams.get("project_id") || projectId,
        project_name: "MianX Internal Production Proof",
        next_founder_action: awaitingSim
          ? {
              id: "return_plan_for_corrections",
              label: "Return plan for corrections",
              reason:
                "Durable plan assignments are incomplete. Return the plan for corrections before approving simulation.",
              href: "/admin/integration?tab=simulation",
              severity: "action_required",
            }
          : {
              label: "Review Plan",
              reason: "Waiting for Founder Plan Approval",
              href: "/admin/integration?tab=plan",
              severity: "action_required",
            },
        canonical_integration_run: {
          id: "irun-e2e-1",
          stage: awaitingSim
            ? "simulation_approval_required"
            : "founder_approval_required",
          proof_status: awaitingSim
            ? "awaiting_simulation_approval"
            : "awaiting_plan_approval",
          stage_label: awaitingSim
            ? "Waiting for Simulation Approval"
            : "Waiting for Founder Plan Approval",
          current_stage: awaitingSim
            ? "simulation_approval_required"
            : "founder_approval_required",
        },
        integration: { duplicate_warning: false, duplicate_count: 0, duplicate_runs: [] },
      });
    }
    if (path.startsWith("/api/admin/inbox")) {
      return json(route, 200, {
        available: true,
        attentionCount: 1,
        items: [
          {
            id: "integration-founder-action",
            kind: "integration_founder_action",
            severity: "high",
            title: "Review Plan",
            detail: "Waiting for Founder Plan Approval",
            href: "/admin/integration?project_id=proj-proof-1&tab=plan",
            projectId: "proj-proof-1",
            attention_class: "action_required",
          },
          {
            id: "provider",
            kind: "provider",
            severity: "info",
            title: "Live AI provider not configured",
            detail: "Not required for deterministic Founder Proof.",
            href: "/admin/settings",
            projectId: null,
            attention_class: "informational",
          },
        ],
      });
    }
    if (path.startsWith("/api/admin/templates")) {
      const action = url.searchParams.get("action");
      const kind = url.searchParams.get("kind");
      if (action === "overview" || (!kind && !action)) {
        return json(route, 200, {
          ok: true,
          engine_version: "phase-e-test",
          counts: {
            industry: 2,
            business_model: 7,
            capability: 8,
            module: 14,
            workflow: 4,
            compliance: 2,
            architecture: 9,
            risk: 5,
            kpi: 4,
          },
          note: "Template Intelligence is deterministic catalog logic. Provider optional.",
        });
      }
      if (action === "relations") {
        return json(route, 200, { ok: true, relations: [] });
      }
      if (action === "versions") {
        return json(route, 200, { ok: true, versions: [] });
      }
      return json(route, 200, {
        ok: true,
        items: [
          {
            id: "tpl-1",
            kind: kind || "industry",
            slug: "generic-platform",
            name: "Generic industry platform",
            status: "active",
            version: 1,
            description: "Reusable platform template",
          },
        ],
        projects: PROJECTS,
      });
    }
    if (path.startsWith("/api/admin/planning")) {
      const action = url.searchParams.get("action");
      if (action === "overview" || !action) {
        return json(route, 200, {
          ok: true,
          engine_version: "phase-f-test",
          counts: { plans: 0, pending_approval: 0, approved: 0, draft: 0 },
          founder_proof_plans: {
            awaiting_approval: 1,
            approved: 0,
            has_awaiting_plan: true,
            canonical_status: "awaiting_plan_approval",
          },
          advanced_planning_packages: {
            draft: 0,
            awaiting_approval: 0,
            approved: 0,
          },
          note: "Founder Proof plan awaits approval. Advanced Separate Planning Packages remain empty.",
        });
      }
      if (action === "list" || action === "plans") {
        return json(route, 200, { ok: true, plans: [] });
      }
      if (action === "approvals") {
        return json(route, 200, { ok: true, approvals: [] });
      }
      if (action === "history") {
        return json(route, 200, { ok: true, audit: [], memory: [], learning: [] });
      }
      return json(route, 200, { ok: true, plans: [], projects: PROJECTS });
    }
    if (path.startsWith("/api/admin/knowledge")) {
      return json(route, 200, {
        ok: true,
        available: true,
        projectId: url.searchParams.get("project_id") || projectId,
        catalogue_counts: {
          industries: 3,
          business_models: 7,
          capabilities: 12,
          departments: 20,
          modules: 14,
          workflows: 3,
          compliance: 3,
          architecture: 9,
          risks: 10,
          kpis: 5,
        },
        sections: {
          organization: {
            label: "Organization operating knowledge",
            note: "Platform catalogues.",
            href: "/admin/templates",
            action_label: "Open Templates catalogue",
            items: [{ id: "org-1", action: "global_template_catalogue" }],
          },
          global_templates: {
            label: "Global Template Catalogue",
            note: "Reusable platform templates.",
            href: "/admin/templates",
            action_label: "Open Templates",
            items: [{ id: "cat-industries", action: "industries", resourceType: "catalogue", resourceId: "3" }],
          },
          project: {
            label: "Project knowledge",
            note: "Project-scoped trail.",
            href: "/admin/runtime/audit",
            action_label: "Open Audit",
            items: [],
            available: true,
          },
          workflow_outputs: {
            label: "Workflow outputs",
            href: "/admin/outputs",
            action_label: "Open Outputs",
            items: [],
          },
          agent_results: {
            label: "Agent results",
            href: "/admin/runtime/runs",
            action_label: "Open Agent Results",
            items: [],
          },
          integration_evidence: {
            label: "Founder Proof evidence",
            href: "/admin/integration",
            action_label: "Open Founder Proof Evidence",
            items: [],
          },
          verified_memory: {
            label: "Verified memory",
            href: "/admin/memory",
            action_label: "Open Memory",
            items: [],
          },
        },
      });
    }
    if (path.startsWith("/api/admin/analytics")) {
      return json(route, 200, {
        ok: true,
        scope: "project",
        projectId: url.searchParams.get("project_id") || projectId,
        metrics: {
          active_founder_proofs: { value: 1, available: true },
          waiting_for_founder_action: { value: 1, available: true },
          completed_proofs: { value: 0, available: true },
          cancelled_proofs: { value: 1, available: true },
          historical_integration_runs: { value: 3, available: true },
          duplicate_active_runs: { value: 0, available: true },
          runtime_tasks: { value: 0, available: true },
          runtime_agent_runs: { value: 0, available: true },
        },
      });
    }
    if (path.startsWith("/api/admin/workforce")) {
      return json(route, 200, {
        ok: true,
        engine_version: "phase-g-test",
        executable_agents: 36,
        paused: false,
        assigned_count: 0,
        simulation_state: "not_started",
        counts: {
          idle: 36,
          busy: 0,
          waiting: 0,
          blocked: 0,
          executing: 0,
          review: 0,
          failed: 0,
          completed: 0,
        },
        busy_agents: [],
        idle_agents: ["executive-ceo"],
        waiting_agents: [],
        blocked_agents: [],
        running_tasks: 0,
        memory_writes: 0,
        learning_proposals: 0,
        note: "Live dashboard over real executable catalog (36). Simulation safe. No fabricated agents.",
        analytics: { task_count: 0, success_pct: 0 },
        health: { healthy: true, executable_count: 36, dead_agents: [], blocked_agents: [] },
        control: { paused: false, recent: [] },
      });
    }
    if (path.startsWith("/api/admin/integration")) {
      const qsProject = url.searchParams.get("project_id") || projectId;
      if (method === "POST") {
        let body = {};
        try {
          body = route.request().postDataJSON() || {};
        } catch {
          body = {};
        }
        if (body.action === "start_founder_proof" && !body.confirmation) {
          return json(route, 400, {
            ok: false,
            error: { message: "Production proof requires explicit Founder confirmation" },
          });
        }
        if (
          body.action === "return_plan_for_corrections" ||
          (body.action === "return_for_changes" && body.regenerate_plan !== false)
        ) {
          if (body.expected_version === 999) {
            return json(route, 409, {
              ok: false,
              code: "CONFLICT",
              error: "version conflict",
            });
          }
          if (body.project_id && body.project_id !== qsProject && body.project_id !== "proj-proof-1") {
            return json(route, 409, {
              ok: false,
              code: "CONFLICT",
              error: "project scope mismatch",
            });
          }
          mockState.proofStage = "founder_approval_required";
          return json(route, 200, {
            ok: true,
            duplicate_created: false,
            provider_called: false,
            simulation_approved: false,
            simulation_started: false,
            preserved_run_id: body.run_id || "irun-e2e-1",
            preserved_project_id: qsProject,
            proof_status: "awaiting_plan_approval",
            note:
              "Plan corrected and durable task ownership saved. Review the corrected plan before approval. Simulation has not started.",
            run: {
              id: body.run_id || "irun-e2e-1",
              current_stage: "founder_approval_required",
              status: "awaiting_approval",
              execution_mode: "deterministic_simulation",
              project_id: qsProject,
              version: Number(body.expected_version || 3) + 1,
              proof: { is_production_proof: true },
              objective: {
                title: "Secure Internal Employee Onboarding Workflow",
                business_purpose: "Secure internal employee onboarding with least privilege.",
                protected_actions: ["production_deployment"],
                is_production_proof: true,
              },
              plan_correction: {
                regenerated_at: new Date().toISOString(),
                reason: body.note || "corrected",
                provider_called: false,
                duplicate_created: false,
              },
              planning_plan: {
                id: "plan-e2e-corrected",
                wbs: {
                  tasks: [
                    {
                      id: "task-1",
                      title: "Identity and Access",
                      department: "security",
                      proposed_agent: "platform-security",
                      agent_role: "Platform Security Reviewer",
                      payload: { agent_slug: "platform-security", department: "security" },
                    },
                    {
                      id: "task-2",
                      title: "Organisation and Employee Lifecycle Management",
                      department: "hr",
                      proposed_agent: "hr-workforce-planner",
                      agent_role: "HR Workforce Planner",
                      payload: { agent_slug: "hr-workforce-planner", department: "hr" },
                    },
                    {
                      id: "task-3",
                      title: "Security Controls and Access Governance",
                      department: "security",
                      proposed_agent: "platform-security",
                      agent_role: "Platform Security Reviewer",
                      payload: { agent_slug: "platform-security", department: "security" },
                    },
                    {
                      id: "task-4",
                      title: "Operational Onboarding Coordination",
                      department: "operations",
                      proposed_agent: "ops-coordinator",
                      agent_role: "Ops Coordinator",
                      quality_reviewer: { slug: "qa-review", role: "QA Review Agent" },
                      payload: { agent_slug: "ops-coordinator", department: "operations" },
                    },
                  ],
                  edges: [
                    { from: "task-1", to: "task-2", kind: "depends_on" },
                    { from: "task-2", to: "task-3", kind: "depends_on" },
                    { from: "task-3", to: "task-4", kind: "depends_on" },
                  ],
                },
              },
              allocation: {
                count: 0,
                proposed_only: true,
                activated_all_36: false,
                selected_agents: [
                  { slug: "executive-ceo", role: "Executive Orchestrator" },
                  { slug: "hr-workforce-planner", role: "HR Workforce Planner" },
                  { slug: "platform-security", role: "Platform Security Reviewer" },
                  { slug: "ops-coordinator", role: "Ops Coordinator" },
                  { slug: "qa-review", role: "QA Review Agent" },
                ],
              },
              approval_package: { decision: null },
              evidence: { count: 0 },
              memory: { count: 0 },
              learning: { count: 0 },
              provider_called: false,
            },
          });
        }
        return json(route, 200, {
          ok: true,
          run: {
            id: "irun-e2e-1",
            current_stage:
              body.action === "start_founder_proof"
                ? "clarification_required"
                : "founder_approval_required",
            status: "awaiting_approval",
            execution_mode: "deterministic_simulation",
            project_id: qsProject,
            objective: {
              title: "Secure Internal Employee Onboarding Workflow",
            },
            proof: { is_production_proof: body.action === "start_founder_proof" },
            allocation: {
              count: 5,
              activated_all_36: false,
              selection_reasons: [
                { slug: "executive-ceo", selected: true, reason: "hierarchical_delegation_anchor" },
              ],
              rejected_agents: [
                { slug: "legal-counsel", selected: false, reason: "not_required_by_approved_plan" },
              ],
            },
            protected_actions: [
              {
                action: "production_deployment",
                blocked: true,
                executed: false,
              },
            ],
            evidence: { count: 0 },
            memory: { count: 0 },
            learning: { count: 0 },
            recovery_count: 0,
            correlation_id: "corr-e2e",
            trace_id: "trace-e2e",
            fabricated_execution: false,
            provider_called: false,
          },
          proof_status:
            body.action === "start_founder_proof" ? "clarification_required" : "awaiting_plan_approval",
        });
      }
      const action = url.searchParams.get("action") || "dashboard";
      if (action === "run") {
        const awaitingSim = mockState.proofStage === "simulation_approval_required";
        const awaitingPlan =
          qsProject === "proj-proof-1" && !awaitingSim;
        const current_stage = awaitingSim
          ? "simulation_approval_required"
          : awaitingPlan
            ? "founder_approval_required"
            : "founder_final_review";
        const status = awaitingSim
          ? "awaiting_simulation_approval"
          : awaitingPlan
            ? "awaiting_plan_approval"
            : "awaiting_final_review";
        return json(route, 200, {
          ok: true,
          run: {
            id: "irun-e2e-1",
            current_stage,
            status,
            execution_mode: "deterministic_simulation",
            project_id: qsProject,
            version: 3,
            proof: { is_production_proof: true },
            objective: {
              title: "Secure Internal Employee Onboarding Workflow",
              business_purpose: "Secure internal employee onboarding with least privilege.",
              protected_actions: ["production_deployment"],
              is_production_proof: true,
            },
            correlation_id: "corr-e2e",
            trace_id: "trace-e2e",
            allocation: {
              count: awaitingSim ? 0 : 5,
              activated_all_36: false,
              selected_agents: awaitingSim
                ? []
                : [
                    {
                      slug: "executive-ceo",
                      role: "Executive Orchestrator",
                      reason: "Hierarchical delegation anchor for the Founder Proof.",
                    },
                    {
                      slug: "hr-workforce-planner",
                      role: "HR Workforce Planner",
                      reason: "Owns employee lifecycle and onboarding policy design.",
                    },
                    {
                      slug: "platform-security",
                      role: "Platform Security Reviewer",
                      reason: "Reviews identity, least privilege and access revocation controls.",
                    },
                    {
                      slug: "ops-coordinator",
                      role: "Operations Coordinator",
                      reason: "Coordinates onboarding operations and provisioning runbooks.",
                    },
                    {
                      slug: "qa-review",
                      role: "QA Review Agent",
                      reason: "Verifies evidence completeness for the proof pack.",
                    },
                  ],
            },
            planning_plan: {
              id: "plan-e2e-1",
              wbs: {
                tasks: [
                  {
                    id: "task-1",
                    title: "Identity and Access",
                    purpose: "Define least-privilege identity controls.",
                    ...(awaitingSim
                      ? {}
                      : {
                          proposed_agent: "platform-security",
                          agent_role: "Platform Security Reviewer",
                        }),
                  },
                  {
                    id: "task-2",
                    title: "Organisation and Employee Lifecycle Management",
                    purpose: "Map roles and onboarding ownership.",
                    ...(awaitingSim
                      ? {}
                      : {
                          proposed_agent: "hr-workforce-planner",
                          agent_role: "HR Workforce Planner",
                        }),
                  },
                  {
                    id: "task-3",
                    title: "Security Controls and Access Governance",
                    purpose: "Security control coverage.",
                    ...(awaitingSim
                      ? {}
                      : {
                          proposed_agent: "platform-security",
                          agent_role: "Platform Security Reviewer",
                        }),
                  },
                  {
                    id: "task-4",
                    title: "Operational Onboarding Coordination",
                    purpose: "Operationalise provisioning runbooks.",
                    ...(awaitingSim
                      ? {}
                      : {
                          proposed_agent: "ops-coordinator",
                          agent_role: "Ops Coordinator",
                        }),
                  },
                ],
                edges: [
                  { from: "task-1", to: "task-2", kind: "depends_on" },
                  { from: "task-2", to: "task-3", kind: "depends_on" },
                  { from: "task-3", to: "task-4", kind: "depends_on" },
                ],
              },
              risks: [
                {
                  title: "Provider is not configured",
                  severity: "medium",
                  meaning: "Live provider execution is unavailable.",
                  mitigation:
                    "Continue with deterministic simulation and do not claim live AI completion.",
                },
              ],
            },
            approval_package: {
              created_at: "2026-07-29T12:00:00.000Z",
              decision: awaitingSim ? "approve_plan" : null,
              dependencies: [
                { from: "task-1", to: "task-2", kind: "depends_on" },
                { from: "task-2", to: "task-3", kind: "depends_on" },
                { from: "task-3", to: "task-4", kind: "depends_on" },
              ],
              proposed_agents: [
                {
                  slug: "executive-ceo",
                  role: "Executive Orchestrator",
                  reason: "Hierarchical delegation anchor for the Founder Proof.",
                },
                {
                  slug: "hr-workforce-planner",
                  role: "HR Workforce Planner",
                  reason: "Owns employee lifecycle and onboarding policy design.",
                },
              ],
              risks: [
                {
                  title: "Provider is not configured",
                  severity: "medium",
                  meaning: "Live provider execution is unavailable.",
                  mitigation:
                    "Continue with deterministic simulation and do not claim live AI completion.",
                },
              ],
            },
            evidence: { count: awaitingPlan || awaitingSim ? 0 : 4 },
            memory: { count: awaitingPlan || awaitingSim ? 0 : 3 },
            learning: {
              count: awaitingPlan || awaitingSim ? 0 : 8,
              auto_applied: false,
            },
            proof_pack: { secrets_included: false },
          },
        });
      }
      if (action === "memory") {
        return json(route, 200, { ok: true, entries: [] });
      }
      if (action === "learning") {
        return json(route, 200, { ok: true, proposals: [] });
      }
      if (action === "evidence") {
        return json(route, 200, { ok: true, manifest: { items: [] } });
      }
      return json(route, 200, {
        ok: true,
        engine_version: "phase-h-test",
        proof_level: "LEVEL_1_DETERMINISTIC_SIMULATION",
        live_execution_ready: false,
        proof_status:
          qsProject === "proj-proof-1"
            ? "awaiting_plan_approval"
            : "awaiting_final_review",
        proof_template: {
          title: "Secure Internal Employee Onboarding Workflow",
          execution_mode: "deterministic_simulation",
          protected_actions: ["production_deployment"],
        },
        readiness: {
          simulationReady: true,
          integrationPersistenceReady: true,
          integrationProofStatus:
            qsProject === "proj-proof-1"
              ? "awaiting_plan_approval"
              : "awaiting_final_review",
          providerStatus: "unconfigured",
          routableAgentCount: 36,
          persistence: {
            durable: true,
            backend: "supabase",
            reason: null,
            failClosed: false,
          },
          schedulerStatus: { mode: "warning" },
          lastSchedulerTick: null,
        },
        persistence: {
          durable: true,
          backend: "supabase",
          reason: null,
        },
        routable_agent_audit: {
          expected: 36,
          actual_executable: 36,
          actual_routable: 36,
          matches_expected: true,
        },
        runs: [
          {
            id: "irun-e2e-1",
            project_id: qsProject,
            stage:
              mockState.proofStage === "simulation_approval_required"
                ? "simulation_approval_required"
                : qsProject === "proj-proof-1"
                  ? "founder_approval_required"
                  : "founder_final_review",
            status:
              mockState.proofStage === "simulation_approval_required"
                ? "awaiting_simulation_approval"
                : qsProject === "proj-proof-1"
                  ? "awaiting_plan_approval"
                  : "awaiting_final_review",
            mode: "deterministic_simulation",
            objective_title: "Secure Internal Employee Onboarding Workflow",
            evidence_count: 0,
            memory_count: 0,
            learning_count: 0,
            is_canonical_active: true,
            is_production_proof: true,
          },
          ...(mockState.proofStage === "simulation_approval_required"
            ? [
                {
                  id: "irun-cancelled-hist",
                  project_id: qsProject,
                  stage: "cancelled",
                  status: "cancelled",
                  mode: "deterministic_simulation",
                  objective_title: "Cancelled duplicate proof (history)",
                  is_canonical_active: false,
                },
                {
                  id: "irun-live-other",
                  project_id: qsProject,
                  stage: "workforce_allocated",
                  status: "simulating",
                  mode: "live_provider",
                  objective_title: "Unrelated live-provider objective",
                  is_canonical_active: false,
                },
              ]
            : []),
        ],
        canonicalFounderProofRunId: "irun-e2e-1",
      });
    }
    if (path.startsWith("/api/admin/")) {
      return json(route, 200, {
        ok: true,
        items: [],
        objectives: [],
        messages: [],
        entries: [],
        outputs: [],
        blueprints: [],
        projects: PROJECTS,
        projectId: url.searchParams.get("project_id") || projectId,
        config: {
          scheduler: { mode: "automatic", automaticProcessing: true },
          providers: { anthropic: false },
          providerStatus: "unconfigured",
        },
      });
    }
    if (path === "/api/core/health") {
      return json(route, 200, {
        ok: true,
        service: "mianx-core",
        config: {
          supabase: true,
          providers: { anthropic: false },
          providerStatus: { anthropic: "unconfigured" },
          scheduler: {
            mode: "automatic",
            automaticProcessing: true,
            platform: "github_actions",
          },
        },
      });
    }
    if (path.startsWith("/api/core/")) {
      if (path === "/api/core/projects") {
        return json(route, 200, {
          projects: PROJECTS.filter((p) => !p.archived_at && p.status !== "archived"),
        });
      }
      return json(route, 200, {
        items: [],
        data: [],
        jobs: [],
        tasks: [],
        runs: [],
        agents: [],
        approvals: [],
        audit: [],
        projects: PROJECTS,
      });
    }
    if (path === "/api/leads" || path.startsWith("/api/leads/")) {
      return json(route, 200, []);
    }
    if (path.includes("/_vercel/")) {
      return route.fulfill({ status: 204, body: "" });
    }
    return json(route, 200, { ok: true });
  });
}

export async function collectPageDiagnostics(page) {
  const consoleErrors = [];
  const consoleWarnings = [];
  const failedRequests = [];
  const responses = [];

  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === "error") consoleErrors.push(text);
    if (type === "warning") consoleWarnings.push(text);
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(String(err?.message || err));
  });
  page.on("requestfailed", (req) => {
    failedRequests.push({
      url: req.url(),
      error: req.failure()?.errorText || "failed",
    });
  });
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      responses.push({ url: res.url(), status });
    }
  });

  return {
    consoleErrors,
    consoleWarnings,
    failedRequests,
    responses,
    snapshot() {
      return {
        consoleErrors: [...consoleErrors],
        consoleWarnings: [...consoleWarnings],
        failedRequests: [...failedRequests],
        responses: [...responses],
      };
    },
  };
}

/** Filter expected auth / telemetry noise from diagnostics. */
export function isExpectedAuthNoise(entry) {
  const url = typeof entry === "string" ? entry : entry?.url || "";
  const status = entry?.status;
  if (status === 401 || status === 403) return true;
  if (/\/api\/admin\/session/.test(url) && (status === 401 || status === 403)) return true;
  if (/_vercel\/(insights|speed-insights)\//.test(url)) return true;
  if (/favicon\.ico/.test(url)) return true;
  return false;
}

export function isIgnorableConsoleError(text) {
  if (!text) return true;
  if (/Download the React DevTools/i.test(text)) return true;
  if (/_vercel\/(insights|speed-insights)/i.test(text)) return true;
  // Chromium often omits the URL in console text for 404 script tags.
  if (/Failed to load resource:.*status of 404/i.test(text)) return true;
  if (/favicon/i.test(text)) return true;
  if (/AbortError/i.test(text)) return true;
  return false;
}
