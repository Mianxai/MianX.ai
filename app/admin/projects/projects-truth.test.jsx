// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import ProjectsPage from "./page";

const PROJECT_ID = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin/projects",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => null,
}));

function awaitingFinalReviewSummary() {
  return {
    ok: true,
    project_id: PROJECT_ID,
    active_objective_count: 1,
    assigned_agents_count: 0,
    open_founder_actions: 1,
    last_activity_at: "2026-08-02T12:00:00.000Z",
    runtime_health: { provider: "not_configured", jobs_failed: 0 },
    next_founder_action: {
      label: "Open Final Review",
      reason: "Simulation complete — explicit Founder final review required.",
      severity: "action_required",
    },
    canonical_integration_run: {
      id: RUN_ID,
      stage: "founder_final_review",
      stage_label: "Final review",
      status: "awaiting_final_review",
      proof_status: "awaiting_final_review",
    },
    founder_proof_ui: {
      state: "awaiting_final_review",
      title: "Waiting for final Founder review",
      caseId: "active",
      machineStatus: "awaiting_final_review",
      machineStage: "founder_final_review",
    },
  };
}

describe("Projects page — Founder Proof truth consistency", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => vi.restoreAllMocks());

  it("shows active review-pending proof for awaiting_final_review", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [
              {
                id: PROJECT_ID,
                name: "MianX Internal Production Proof",
                status: "active",
                updated_at: "2026-08-02T12:00:00.000Z",
              },
            ],
          }),
        };
      }
      if (String(url).includes("/api/admin/operations/summary")) {
        return {
          ok: true,
          status: 200,
          json: async () => awaitingFinalReviewSummary(),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ProjectsPage />);

    const proof = await screen.findByTestId("projects-founder-proof");
    await waitFor(() => {
      expect(proof).toHaveTextContent(/Waiting for final Founder review/i);
    });
    expect(proof).not.toHaveTextContent(/No active Founder Proof/i);
    const card = screen.getByTestId("projects-item");
    expect(card).toHaveAttribute("data-proof-kind", "active");
    expect(card).toHaveAttribute("data-proof-review-pending", "true");

    expect(screen.getByTestId("projects-active-objectives")).toHaveTextContent("1");
    expect(screen.getByTestId("projects-assigned-agents")).toHaveTextContent("0");
    expect(screen.getByTestId("projects-open-founder-actions")).toHaveTextContent("1");
    expect(screen.getByTestId("projects-runtime-health").textContent).not.toMatch(/^\.\.\.?$/);
    expect(screen.getByTestId("projects-active-objectives").textContent).not.toBe("…");
  });

  it("shows truthful no-proof empty state when proof is absent", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [{ id: PROJECT_ID, name: "Empty Project", status: "active" }],
          }),
        };
      }
      if (String(url).includes("/api/admin/operations/summary")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            project_id: PROJECT_ID,
            active_objective_count: 0,
            assigned_agents_count: 0,
            open_founder_actions: 0,
            canonical_integration_run: null,
            founder_proof_ui: {
              state: "no_proof",
              title: "No active Founder Proof",
              caseId: "empty",
            },
            runtime_health: { provider: "not_configured", jobs_failed: 0 },
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ProjectsPage />);
    const proof = await screen.findByTestId("projects-founder-proof");
    await waitFor(() => {
      expect(proof).toHaveTextContent("No active Founder Proof");
    });
    expect(screen.getByTestId("projects-item")).toHaveAttribute("data-proof-kind", "empty");
  });

  it("shows unavailable when operational summary fails", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [{ id: PROJECT_ID, name: "Proof Project", status: "active" }],
          }),
        };
      }
      if (String(url).includes("/api/admin/operations/summary")) {
        return {
          ok: false,
          status: 500,
          json: async () => ({ error: { message: "boom" } }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ProjectsPage />);
    await waitFor(() => {
      expect(screen.getByTestId("projects-founder-proof")).toHaveTextContent("Unavailable");
    });
    expect(screen.getByTestId("projects-founder-proof")).not.toHaveTextContent(
      /No active Founder Proof/i
    );
    expect(screen.getByTestId("projects-active-objectives")).toHaveTextContent("Unavailable");
    expect(screen.getByTestId("projects-assigned-agents")).toHaveTextContent("Unavailable");
    expect(screen.getByTestId("projects-open-founder-actions")).toHaveTextContent(
      "Unavailable"
    );
    expect(screen.getByTestId("projects-runtime-health")).toHaveTextContent("Unavailable");
  });

  it("displays zero metrics as 0, not Unavailable", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [{ id: PROJECT_ID, name: "Zero Metrics", status: "active" }],
          }),
        };
      }
      if (String(url).includes("/api/admin/operations/summary")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            ok: true,
            project_id: PROJECT_ID,
            active_objective_count: 0,
            assigned_agents_count: 0,
            open_founder_actions: 0,
            canonical_integration_run: null,
            founder_proof_ui: {
              state: "no_proof",
              title: "No active Founder Proof",
              caseId: "empty",
            },
            runtime_health: { provider: "not_configured", jobs_failed: 0 },
          }),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ProjectsPage />);
    await waitFor(() => {
      expect(screen.getByTestId("projects-active-objectives")).toHaveTextContent("0");
    });
    expect(screen.getByTestId("projects-assigned-agents")).toHaveTextContent("0");
    expect(screen.getByTestId("projects-open-founder-actions")).toHaveTextContent("0");
    expect(screen.getByTestId("projects-active-objectives")).toHaveAttribute(
      "data-metric-kind",
      "ready"
    );
  });

  it("does not invent Founder Final Review approval or agent allocation", async () => {
    global.fetch = vi.fn(async (url) => {
      if (url === "/api/core/projects") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            projects: [
              {
                id: PROJECT_ID,
                name: "MianX Internal Production Proof",
                status: "active",
              },
            ],
          }),
        };
      }
      if (String(url).includes("/api/admin/operations/summary")) {
        return {
          ok: true,
          status: 200,
          json: async () => awaitingFinalReviewSummary(),
        };
      }
      return { ok: false, status: 404, json: async () => ({}) };
    });

    render(<ProjectsPage />);
    await screen.findByTestId("projects-founder-proof");
    expect(screen.queryByText(/Founder Final Review approved/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("projects-assigned-agents")).toHaveTextContent("0");
    const body = within(document.body);
    expect(body.queryByText(/allocated agents:\s*[1-9]/i)).not.toBeInTheDocument();
  });
});
