// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminOverviewPage from "./page";

const push = vi.fn();
const refresh = vi.fn();
const routerStub = { push, refresh, replace: vi.fn() };

vi.mock("next/navigation", () => ({
  useRouter: () => routerStub,
  usePathname: () => "/admin",
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => null,
}));

describe("Admin Overview page", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    push.mockClear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a configuration notice on 503 instead of crashing", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 503,
      ok: false,
      json: async () => ({ error: "Configuration error" }),
    });
    render(<AdminOverviewPage />);

    expect(await screen.findByText(/Configuration unavailable/i)).toBeInTheDocument();
  });

  it("redirects to /admin/login on a 401 from the overview API", async () => {
    global.fetch.mockResolvedValueOnce({ status: 401, ok: false, json: async () => ({}) });
    render(<AdminOverviewPage />);

    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin/login"));
  });

  it("renders truthful overview cards from the API (no fake metrics)", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        submissions: { total: 4, new: 2, contacted: 1, converted: 1 },
        projects: { active: 3 },
        tasks: { queued: 5, in_progress: 1, blocked: 0 },
        approvals: { pending: 2 },
        runs: { failed: 1 },
        runtime: { ok: true, service: "mianx-core" },
        config: { supabase: true, providers: { anthropic: false } },
      }),
    });
    render(<AdminOverviewPage />);

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("Total submissions").closest("a")).toHaveAttribute(
      "href",
      "/admin/submissions"
    );
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("New leads").closest("a")).toHaveAttribute(
      "href",
      "/admin/submissions?status=new"
    );
    expect(screen.getByText("Pending approvals")).toBeInTheDocument();
    expect(screen.getByText("Failed runs")).toBeInTheDocument();
    // Boolean config cards show Yes/No, never invent extra counts
    expect(screen.getByText("Supabase").closest("a")).toHaveTextContent("Yes");
    expect(screen.getByText("AI provider").closest("a")).toHaveTextContent("No");
  });

  it("shows an error state when the overview API fails", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 500,
      ok: false,
      json: async () => ({ error: { message: "boom" } }),
    });
    render(<AdminOverviewPage />);
    expect(await screen.findByRole("alert")).toHaveTextContent(/boom/i);
  });
});
