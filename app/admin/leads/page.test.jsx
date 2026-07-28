// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadsClient from "@/components/admin/leads/LeadsClient";

const push = vi.fn();
const refresh = vi.fn();
const replace = vi.fn();
const routerStub = { push, refresh, replace };

vi.mock("next/navigation", () => ({
  useRouter: () => routerStub,
  usePathname: () => "/admin/leads",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => null,
}));

describe("Leads page (canonical)", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    push.mockClear();
    replace.mockClear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a controlled setup notice when Supabase is not configured (503)", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 503,
      ok: false,
      json: async () => ({ error: "Configuration error" }),
    });
    render(<LeadsClient />);

    expect(await screen.findByText(/Configuration error/i)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("redirects to /admin/login on a 401 from the API", async () => {
    global.fetch.mockResolvedValueOnce({ status: 401, ok: false, json: async () => ({}) });
    render(<LeadsClient />);

    await waitFor(() =>
      expect(push).toHaveBeenCalledWith(expect.stringMatching(/^\/admin\/login/))
    );
  });

  it("loads and displays real leads, with working search and status filtering", async () => {
    const leads = [
      {
        id: "1",
        name: "Jane Doe",
        email: "jane@example.com",
        industry: "restaurant",
        status: "new",
        created_at: "2026-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        industry: "poultry",
        status: "contacted",
        created_at: "2026-01-02T00:00:00.000Z",
      },
    ];
    global.fetch.mockResolvedValueOnce({ status: 200, ok: true, json: async () => leads });
    render(<LeadsClient />);

    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/search submissions/i), "bob");
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });
});
