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
export async function installAdminMocks(page, { projectId = "proj-1" } = {}) {
  const token = makeStructurallyValidToken();
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
          lastTickAt: new Date().toISOString(),
        },
        providers: { anthropic: { status: "unconfigured" } },
        agentInventory: { executable: 36, executableCount: 36, catalogCount: 43 },
        hierarchy: { executableCount: 36 },
        agents: [
          {
            slug: "executive-ceo",
            name: "CEO",
            department: "executive",
            status: "idle",
          },
        ],
        workflows: [],
        departments: [],
        ceoBrief: { available: true, items: [] },
        execution: { available: true, items: [] },
      });
    }
    if (path.startsWith("/api/admin/objectives")) {
      return json(route, 200, { objectives: [], items: [], projects: PROJECTS });
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
          counts: { plans: 0, pending_approval: 0, approved: 0 },
          note: "Planning Intelligence is read-mostly until Founder approval. Nothing executes.",
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
    if (path.startsWith("/api/admin/workforce")) {
      return json(route, 200, {
        ok: true,
        engine_version: "phase-g-test",
        executable_agents: 36,
        paused: false,
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
        return json(route, 200, {
          ok: true,
          run: {
            id: "irun-e2e-1",
            current_stage: "founder_final_review",
            status: "awaiting_final_review",
            execution_mode: "deterministic_simulation",
            project_id: qsProject,
            objective: { title: "E2E integration objective" },
            correlation_id: "corr-e2e",
            trace_id: "trace-e2e",
            allocation: { count: 5, activated_all_36: false },
            evidence: { count: 4 },
            memory: { count: 3 },
            learning: { count: 8, auto_applied: false },
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
        proof_status: "awaiting_final_review",
        proof_template: {
          title: "Secure Internal Employee Onboarding Workflow",
          execution_mode: "deterministic_simulation",
          protected_actions: ["production_deployment"],
        },
        readiness: {
          simulationReady: true,
          integrationPersistenceReady: true,
          integrationProofStatus: "awaiting_final_review",
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
            stage: "founder_final_review",
            status: "awaiting_final_review",
            mode: "deterministic_simulation",
            objective_title: "E2E integration objective",
            evidence_count: 4,
            memory_count: 3,
            learning_count: 8,
          },
        ],
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
