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
  { id: "proj-1", name: "MianX Core", status: "active" },
  { id: "proj-2", name: "Demo Workspace", status: "active" },
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
        return json(route, 200, { projects: PROJECTS });
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
