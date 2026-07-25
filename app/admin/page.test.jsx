// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
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

vi.mock("@/lib/after-paint", () => ({
  afterNextPaint: () => Promise.resolve(),
}));

const OVERVIEW = {
  submissions: { total: 4, new: 2, contacted: 1, converted: 1 },
  projects: { active: 3 },
  tasks: { queued: 5, in_progress: 1, blocked: 0 },
  approvals: { pending: 2 },
  runs: { failed: 1 },
  runtime: { ok: true, service: "mianx-core" },
  config: { supabase: true, providers: { anthropic: false } },
};

function deferredJson(status, data) {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  const response = {
    status,
    ok: status >= 200 && status < 300,
    json: async () => data,
  };
  return {
    promise: promise.then(() => response),
    resolve: () => resolve(response),
  };
}

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
      json: async () => OVERVIEW,
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

  it("centres the section loader inside an admin-loading-region below the heading", async () => {
    const deferred = deferredJson(200, OVERVIEW);
    global.fetch.mockReturnValueOnce(deferred.promise);
    render(<AdminOverviewPage />);

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    const region = await screen.findByTestId("admin-loading-region");
    expect(region.querySelector(".mx-loader")).not.toBeNull();
    expect(region.contains(screen.getByRole("heading", { name: "Overview" }))).toBe(false);
    deferred.resolve();
    await waitFor(() => expect(screen.queryByTestId("admin-loading-region")).toBeNull());
  });

  it("shows inline pending feedback and keeps prior cards during background refresh", async () => {
    global.fetch
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => OVERVIEW,
      })
      .mockImplementationOnce(() => {
        const deferred = deferredJson(200, {
          ...OVERVIEW,
          submissions: { ...OVERVIEW.submissions, total: 9 },
        });
        global.__deferredRefresh = deferred;
        return deferred.promise;
      });

    render(<AdminOverviewPage />);
    expect(await screen.findByText("Total submissions")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    const user = userEvent.setup();
    const btn = screen.getByTestId("admin-refresh");
    await user.click(btn);

    expect(await screen.findByText(/Refreshing overview/i)).toBeInTheDocument();
    expect(screen.getByText("Total submissions")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(btn).toBeDisabled();

    await act(async () => {
      global.__deferredRefresh.resolve();
    });
    await waitFor(() => expect(screen.getByText("9")).toBeInTheDocument());
    expect(btn).toBeEnabled();
  });

  it("prevents duplicate Refresh while pending (single active sequence)", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => OVERVIEW,
    });
    render(<AdminOverviewPage />);
    await screen.findByText("4");

    const deferred = deferredJson(200, OVERVIEW);
    global.fetch.mockReturnValue(deferred.promise);

    const user = userEvent.setup();
    const btn = screen.getByTestId("admin-refresh");
    await user.click(btn);
    await user.click(btn);
    expect(btn).toBeDisabled();
    // Only one background refresh fetch after the initial load.
    expect(global.fetch.mock.calls.length).toBe(2);

    await act(async () => {
      deferred.resolve();
    });
    await waitFor(() => expect(btn).toBeEnabled());
  });

  it("restores the Refresh button and shows a controlled error when refresh fails", async () => {
    global.fetch
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => OVERVIEW,
      })
      .mockResolvedValueOnce({
        status: 500,
        ok: false,
        json: async () => ({ error: { message: "overview failed" } }),
      });

    render(<AdminOverviewPage />);
    await screen.findByText("4");
    const user = userEvent.setup();
    await user.click(screen.getByTestId("admin-refresh"));
    expect(await screen.findByRole("alert")).toHaveTextContent(/overview failed/i);
    expect(screen.getByTestId("admin-refresh")).toBeEnabled();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
