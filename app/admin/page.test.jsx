// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminDashboard from "./page";

const push = vi.fn();
const refresh = vi.fn();
// Real Next.js `useRouter()` returns a stable object reference across
// renders — mock it the same way, otherwise a `useCallback` depending on
// `router` (as AdminDashboard's loadLeads does) would get a new function
// identity every render and loop its effect forever.
const routerStub = { push, refresh };
vi.mock("next/navigation", () => ({
  useRouter: () => routerStub,
}));

describe("AdminDashboard", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    push.mockClear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a controlled setup notice when Supabase is not configured (503), instead of crashing", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 503,
      ok: false,
      json: async () => ({ error: "Configuration error" }),
    });
    render(<AdminDashboard />);

    expect(await screen.findByText(/Configuration error/i)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("redirects to /admin/login on a 401 from the API", async () => {
    global.fetch.mockResolvedValueOnce({ status: 401, ok: false, json: async () => ({}) });
    render(<AdminDashboard />);

    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin/login"));
  });

  it("loads and displays real leads, with working search and status filtering", async () => {
    const leads = [
      { id: "1", name: "Jane Doe", email: "jane@example.com", industry: "restaurant", status: "new", created_at: "2026-01-01T00:00:00.000Z" },
      { id: "2", name: "Bob Smith", email: "bob@example.com", industry: "poultry", status: "contacted", created_at: "2026-01-02T00:00:00.000Z" },
    ];
    global.fetch.mockResolvedValueOnce({ status: 200, ok: true, json: async () => leads });
    render(<AdminDashboard />);

    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();

    const user = userEvent.setup();

    // Search narrows the visible list.
    await user.type(screen.getByLabelText(/search submissions/i), "bob");
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/search submissions/i));

    // Status filter narrows the visible list.
    await user.click(screen.getByRole("button", { name: /^new$/i }));
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
  });

  it("shows accurate stats derived from the real loaded leads", async () => {
    const leads = [
      { id: "1", name: "A", email: "a@x.com", status: "new", created_at: "2026-01-01" },
      { id: "2", name: "B", email: "b@x.com", status: "new", created_at: "2026-01-01" },
      { id: "3", name: "C", email: "c@x.com", status: "converted", created_at: "2026-01-01" },
    ];
    global.fetch.mockResolvedValueOnce({ status: 200, ok: true, json: async () => leads });
    render(<AdminDashboard />);

    await screen.findByText("A");
    expect(screen.getByText("Total Submissions").closest(".stat-card")).toHaveTextContent("3");
    expect(screen.getByText("New Leads").closest(".stat-card")).toHaveTextContent("2");
    expect(screen.getByText("Converted", { selector: ".stat-card-label" }).closest(".stat-card")).toHaveTextContent("1");
  });
});
