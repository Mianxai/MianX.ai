// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RuntimeWorkspace from "./RuntimeWorkspace";

// Stable router instance — returning a fresh object each call would change the
// useCallback identity every render and cause an infinite re-render loop.
const routerMock = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn() };
vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
  useSearchParams: () => new URLSearchParams(),
}));

const PROJECT = { id: "11111111-1111-4111-8111-111111111111", name: "Beta OS" };

function jsonResponse(status, data) {
  return { ok: status >= 200 && status < 300, status, json: async () => data };
}

// Routes fetch calls to canned responses; each route can be overridden per test.
function installFetch(routes) {
  global.fetch = vi.fn(async (path) => {
    for (const [pattern, handler] of routes) {
      if (path.startsWith(pattern)) return handler(path);
    }
    return jsonResponse(404, { error: { message: "not found" } });
  });
}

const healthOk = () =>
  jsonResponse(200, {
    ok: true,
    service: "mianx-core",
    agents: 3,
    config: { supabase: true, providers: { anthropic: false } },
  });

describe("RuntimeWorkspace", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    routerMock.push.mockClear();
    routerMock.replace.mockClear();
  });

  it("shows a not-configured notice when Supabase is unavailable", async () => {
    installFetch([
      ["/api/core/health", healthOk],
      ["/api/core/projects", () => jsonResponse(503, { error: { message: "no supabase" } })],
    ]);
    render(<RuntimeWorkspace />);
    expect(await screen.findByRole("alert")).toHaveTextContent(/Configuration error/i);
  });

  it("renders the overview with health + project counts", async () => {
    installFetch([
      ["/api/core/health", healthOk],
      ["/api/core/projects", () => jsonResponse(200, { projects: [PROJECT] })],
    ]);
    render(<RuntimeWorkspace />);
    expect(await screen.findByText("Registered agents")).toBeInTheDocument();
    const cards = screen.getByText("Registered agents").closest(".runtime-card");
    expect(within(cards).getByText("3")).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: /runtime sections/i })).toBeInTheDocument();
  });

  it("honors initialTab and deep-links tab changes via router.replace", async () => {
    installFetch([
      ["/api/core/health", healthOk],
      ["/api/core/projects", () => jsonResponse(200, { projects: [PROJECT] })],
      ["/api/core/agents", () => jsonResponse(200, { catalog: [], instances: [] })],
    ]);
    render(<RuntimeWorkspace initialTab="agents" />);
    expect(await screen.findByRole("tab", { name: "Agents" })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    await userEvent.click(screen.getByRole("tab", { name: "Runs" }));
    expect(routerMock.replace).toHaveBeenCalledWith("/admin/runtime/runs");
  });

  it("renders agent/run output as inert text (no script/handler execution)", async () => {
    const MALICIOUS = '<img src=x onerror="alert(1)"><script>evil()</script>';
    installFetch([
      ["/api/core/health", healthOk],
      ["/api/core/projects", () => jsonResponse(200, { projects: [PROJECT] })],
      [
        "/api/core/runs",
        () =>
          jsonResponse(200, {
            runs: [
              {
                id: "r1",
                status: "succeeded",
                provider: "anthropic",
                model: "m",
                retry_count: 0,
                output: { summary: MALICIOUS },
              },
            ],
          }),
      ],
    ]);
    render(<RuntimeWorkspace />);
    await screen.findByText("Registered agents");
    await userEvent.click(screen.getByRole("tab", { name: "Runs" }));

    // The malicious payload is rendered as escaped text, not live DOM.
    await waitFor(() =>
      expect(screen.getByLabelText("Run output")).toHaveTextContent(/onerror/)
    );
    expect(document.querySelector("img[onerror]")).toBeNull();
    expect(document.querySelector("script")).toBeNull();
  });

  it("supports keyboard navigation between tabs", async () => {
    installFetch([
      ["/api/core/health", healthOk],
      ["/api/core/projects", () => jsonResponse(200, { projects: [PROJECT] })],
      ["/api/core/agents", () => jsonResponse(200, { catalog: [], instances: [] })],
    ]);
    render(<RuntimeWorkspace />);
    await screen.findByText("Registered agents");
    const overview = screen.getByRole("tab", { name: "Overview" });
    overview.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Agents" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
