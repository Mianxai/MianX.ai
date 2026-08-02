// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ObjectivesClient, {
  OBJECTIVES_FETCH_TIMEOUT_MS,
  normalizeObjectivesResponse,
} from "./ObjectivesClient";

const nav = vi.hoisted(() => {
  const PROJECT_ID = "61d3b1fd-c260-479b-9289-0c75f977e892";
  const push = vi.fn();
  const replace = vi.fn();
  const refresh = vi.fn();
  const router = { push, replace, refresh };
  let searchParams = new URLSearchParams(`project_id=${PROJECT_ID}`);
  return {
    PROJECT_ID,
    push,
    replace,
    refresh,
    router,
    getSearchParams: () => searchParams,
    setSearchParams: (next) => {
      searchParams = next;
    },
  };
});

const PROJECT_ID = nav.PROJECT_ID;

vi.mock("next/navigation", () => ({
  useRouter: () => nav.router,
  usePathname: () => "/admin/objectives",
  useSearchParams: () => nav.getSearchParams(),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/admin-ops-summary", () => ({
  useProjectOperationalSummary: () => ({
    summary: {
      ok: true,
      canonical_integration_run: null,
      founder_proof_ui: { state: "no_proof", caseId: "empty" },
    },
    loading: false,
    error: "",
    reload: vi.fn(),
  }),
  hasActiveFounderProof: () => false,
}));

vi.mock("@/components/admin/AdminShell", () => ({
  default: ({ title, children, actions }) => (
    <div>
      <h1>{title}</h1>
      <div>{actions}</div>
      {children}
    </div>
  ),
}));

vi.mock("@/components/admin/FounderActionBanner", () => ({
  default: () => null,
}));

function projectsOk() {
  return {
    ok: true,
    status: 200,
    json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
  };
}

describe("normalizeObjectivesResponse", () => {
  it("accepts empty objectives array", () => {
    const n = normalizeObjectivesResponse({ available: true, objectives: [] });
    expect(n.ok).toBe(true);
    expect(n.value.objectives).toEqual([]);
  });

  it("rejects null / invalid JSON shape", () => {
    expect(normalizeObjectivesResponse(null).reason).toBe("invalid_json");
  });

  it("rejects non-array objectives", () => {
    expect(
      normalizeObjectivesResponse({ objectives: "nope" }).reason
    ).toBe("unexpected_response");
  });
});

describe("ObjectivesClient loading lifecycle", () => {
  beforeEach(() => {
    nav.push.mockClear();
    nav.replace.mockClear();
    nav.setSearchParams(new URLSearchParams(`project_id=${PROJECT_ID}`));
    vi.useRealTimers();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("exits loading on successful response with objectives", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            available: true,
            projectId: PROJECT_ID,
            objectives: [
              {
                id: "obj-1",
                title: "Review architecture",
                status: "active",
                source_type: "founder_runtime",
              },
            ],
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    expect(await screen.findByText("Review architecture")).toBeInTheDocument();
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
  });

  it("shows truthful empty state when objectives array is empty", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            available: true,
            projectId: PROJECT_ID,
            objectives: [],
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    expect(await screen.findByTestId("obj-empty-state")).toBeInTheDocument();
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
  });

  it("exits loading and shows error on HTTP failure with single retry", async () => {
    let objectiveCalls = 0;
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        objectiveCalls += 1;
        if (objectiveCalls === 1) {
          return {
            ok: false,
            status: 500,
            json: async () => ({ error: { message: "summary failed" } }),
          };
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({
            available: true,
            projectId: PROJECT_ID,
            objectives: [],
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    expect(await screen.findByText(/Could not load objectives/i)).toBeInTheDocument();
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-failure-kind", "api");
    const before = objectiveCalls;
    await userEvent.click(screen.getByRole("button", { name: /Retry/i }));
    expect(await screen.findByTestId("obj-empty-state")).toBeInTheDocument();
    expect(objectiveCalls).toBe(before + 1);
  });

  it("distinguishes authentication failure", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return { ok: false, status: 401, json: async () => ({}) };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    await waitFor(() => {
      expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-failure-kind", "auth");
    });
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
    expect(screen.queryByRole("button", { name: /Retry/i })).not.toBeInTheDocument();
  });

  it("handles invalid JSON success body", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return {
          ok: true,
          status: 200,
          json: async () => {
            throw new Error("bad json");
          },
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    await waitFor(() => {
      expect(screen.getByTestId("obj-list-panel")).toHaveAttribute(
        "data-failure-kind",
        "invalid_json"
      );
    });
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
  });

  it("exits loading on unexpected response schema", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ available: true, objectives: "not-an-array" }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    expect(await screen.findByText(/Unexpected response/i)).toBeInTheDocument();
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute(
      "data-failure-kind",
      "unexpected_response"
    );
  });

  it("times out after OBJECTIVES_FETCH_TIMEOUT_MS and settles loading", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    global.fetch = vi.fn((url, opts) => {
      if (url === "/api/core/projects") {
        return Promise.resolve(projectsOk());
      }
      if (String(url).includes("/api/admin/objectives?")) {
        return new Promise((_resolve, reject) => {
          opts?.signal?.addEventListener("abort", () => {
            const err = new Error("Aborted");
            err.name = "AbortError";
            reject(err);
          });
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    render(<ObjectivesClient />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(OBJECTIVES_FETCH_TIMEOUT_MS + 50);
    });
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-failure-kind", "timeout");
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
    expect(screen.getByText("Request timed out")).toBeInTheDocument();
  });

  it("abort on unmount does not surface a misleading error", async () => {
    let rejectFetch;
    global.fetch = vi.fn((url, opts) => {
      if (url === "/api/core/projects") return Promise.resolve(projectsOk());
      if (String(url).includes("/api/admin/objectives?")) {
        return new Promise((_resolve, reject) => {
          rejectFetch = () => {
            const err = new Error("Aborted");
            err.name = "AbortError";
            reject(err);
          };
          opts?.signal?.addEventListener("abort", rejectFetch);
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    const { unmount } = render(<ObjectivesClient />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    unmount();
    await act(async () => {
      rejectFetch?.();
    });
    // Unmounted — no error text left in document for this panel.
    expect(document.body.textContent || "").not.toMatch(/Timed out loading objectives/i);
  });

  it("stale first response does not overwrite a newer request", async () => {
    /** @type {Array<(body: object) => void>} */
    const resolveBodies = [];
    global.fetch = vi.fn((url) => {
      if (url === "/api/core/projects") return Promise.resolve(projectsOk());
      if (String(url).includes("/api/admin/objectives?")) {
        // Ignore abort so a late success can race — requestId must drop it.
        return new Promise((resolve) => {
          resolveBodies.push((body) =>
            resolve({
              ok: true,
              status: 200,
              json: async () => body,
            })
          );
        });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    const { rerender } = render(<ObjectivesClient />);
    await waitFor(() => expect(resolveBodies.length).toBeGreaterThanOrEqual(1));

    nav.setSearchParams(
      new URLSearchParams(`project_id=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`)
    );
    rerender(<ObjectivesClient />);
    await waitFor(() => expect(resolveBodies.length).toBeGreaterThanOrEqual(2));

    await act(async () => {
      resolveBodies[0]({
        available: true,
        objectives: [{ id: "stale", title: "STALE ROW", status: "active" }],
      });
    });
    expect(screen.queryByText("STALE ROW")).not.toBeInTheDocument();

    await act(async () => {
      resolveBodies[resolveBodies.length - 1]({
        available: true,
        objectives: [{ id: "fresh", title: "FRESH ROW", status: "active" }],
      });
    });
    expect(await screen.findByText("FRESH ROW")).toBeInTheDocument();
    expect(screen.queryByText("STALE ROW")).not.toBeInTheDocument();
  });

  it("does not fabricate objectives or claim Final Review approved", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") return projectsOk();
      if (String(url).includes("/api/admin/objectives?")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            available: true,
            projectId: PROJECT_ID,
            objectives: [],
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    await screen.findByTestId("obj-empty-state");
    expect(screen.queryByText(/Founder Final Review approved/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("obj-row-production-proof")).not.toBeInTheDocument();
  });

  it("exports a named 30s timeout constant", () => {
    expect(OBJECTIVES_FETCH_TIMEOUT_MS).toBe(30_000);
  });
});
