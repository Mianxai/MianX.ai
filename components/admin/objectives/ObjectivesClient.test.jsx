// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ObjectivesClient from "./ObjectivesClient";

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

describe("ObjectivesClient loading truth", () => {
  beforeEach(() => {
    nav.push.mockClear();
    nav.replace.mockClear();
    nav.setSearchParams(new URLSearchParams(`project_id=${PROJECT_ID}`));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exits loading on successful response with objectives", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [{ id: PROJECT_ID, name: "MianX Internal Production Proof" }],
          }),
        };
      }
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
    const panel = screen.getByTestId("obj-list-panel");
    expect(panel).toHaveAttribute("data-loading", "false");
  });

  it("shows truthful empty state when objectives array is empty", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
        };
      }
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
    expect(screen.getByText(/No objectives yet/i)).toBeInTheDocument();
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
  });

  it("exits loading and shows error on API failure with retry", async () => {
    let calls = 0;
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
        };
      }
      if (String(url).includes("/api/admin/objectives?")) {
        calls += 1;
        if (calls === 1) {
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
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-failure-kind", "api");

    await userEvent.click(screen.getByRole("button", { name: /Retry/i }));
    expect(await screen.findByTestId("obj-empty-state")).toBeInTheDocument();
  });

  it("exits loading on unexpected response schema", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
        };
      }
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
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
    expect(screen.getByTestId("obj-list-panel")).toHaveAttribute(
      "data-failure-kind",
      "unexpected_response"
    );
  });

  it("exits loading when fetch throws (network / uncaught)", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
        };
      }
      if (String(url).includes("/api/admin/objectives?")) {
        throw new Error("network down");
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ObjectivesClient />);
    await waitFor(() => {
      expect(screen.getByTestId("obj-list-panel")).toHaveAttribute("data-loading", "false");
    });
    expect(screen.getByText(/Could not load objectives/i)).toBeInTheDocument();
  });

  it("does not fabricate objectives or claim Final Review approved", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ projects: [{ id: PROJECT_ID, name: "P" }] }),
        };
      }
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
});
