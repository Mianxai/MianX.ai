// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import {
  AdminNotificationProvider,
  useAdminNotifications,
} from "./AdminNotificationProvider";
import AdminShell from "./AdminShell";
import {
  invalidateSubmissionCount,
  resetCachedNewSubmissions,
  SUBMISSION_COUNT_INVALIDATED,
} from "@/lib/admin-notifications";

const push = vi.fn();
const refresh = vi.fn();
let pathname = "/admin";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh, replace: vi.fn() }),
  usePathname: () => pathname,
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => ({ auth: { signOut: vi.fn() } }),
}));

function Probe() {
  const { newSubmissions, badgeText, ariaLabel } = useAdminNotifications();
  return (
    <div>
      <span data-testid="count">{newSubmissions}</span>
      <span data-testid="badge">{badgeText ?? "hidden"}</span>
      <span data-testid="aria">{ariaLabel}</span>
    </div>
  );
}

function mockVisibility(hidden) {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => (hidden ? "hidden" : "visible"),
  });
  Object.defineProperty(document, "hidden", {
    configurable: true,
    get: () => hidden,
  });
}

describe("AdminNotificationProvider + badge persistence", () => {
  beforeEach(() => {
    pathname = "/admin";
    resetCachedNewSubmissions();
    push.mockClear();
    mockVisibility(false);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 6 }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    resetCachedNewSubmissions();
  });

  it("loads the new-submissions count and shows it on Overview", async () => {
    render(
      <AdminNotificationProvider>
        <AdminShell title="Overview">
          <p>body</p>
        </AdminShell>
      </AdminNotificationProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("6");
    });
    expect(screen.getByTestId("submissions-badge")).toHaveAttribute(
      "aria-label",
      "6 new submissions"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/admin/notifications",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("keeps the badge after navigating to other admin routes", async () => {
    const { rerender } = render(
      <AdminNotificationProvider>
        <AdminShell title="Overview">
          <p>body</p>
        </AdminShell>
      </AdminNotificationProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("6");
    });

    for (const path of [
      "/admin/projects",
      "/admin/runtime",
      "/admin/runtime/agents",
      "/admin/analytics",
      "/admin/settings",
    ]) {
      pathname = path;
      rerender(
        <AdminNotificationProvider>
          <AdminShell title={path}>
            <p>body</p>
          </AdminShell>
        </AdminNotificationProvider>
      );
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("6");
    }
  });

  it("hides the badge at 0 and shows 99+ above 99", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 0 }),
    });
    const { unmount } = render(
      <AdminNotificationProvider>
        <AdminShell title="Overview">
          <p>body</p>
        </AdminShell>
      </AdminNotificationProvider>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(screen.queryByTestId("submissions-badge")).toBeNull();
    unmount();
    resetCachedNewSubmissions();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 120 }),
    });
    render(
      <AdminNotificationProvider>
        <AdminShell title="Overview">
          <p>body</p>
        </AdminShell>
      </AdminNotificationProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("99+");
    });
    expect(screen.getByTestId("submissions-badge")).toHaveAttribute(
      "aria-label",
      "120 new submissions"
    );
  });

  it("preserves the last successful count when a refresh fails", async () => {
    render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("6");
    });

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: { message: "boom" } }),
    });
    await act(async () => {
      invalidateSubmissionCount();
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(screen.getByTestId("count")).toHaveTextContent("6");
  });

  it("pauses interval polling while the document is hidden", async () => {
    vi.useFakeTimers();
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 6 }),
    });

    render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });
    const callsAfterMount = global.fetch.mock.calls.length;

    mockVisibility(true);
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await act(async () => {
      vi.advanceTimersByTime(120_000);
    });
    expect(global.fetch.mock.calls.length).toBe(callsAfterMount);

    mockVisibility(false);
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(global.fetch.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });

  it("refreshes on window focus when visible", async () => {
    render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );
    await waitFor(() => expect(screen.getByTestId("count")).toHaveTextContent("6"));
    const before = global.fetch.mock.calls.length;

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 4 }),
    });
    await act(async () => {
      window.dispatchEvent(new Event("focus"));
    });
    await waitFor(() => {
      expect(global.fetch.mock.calls.length).toBeGreaterThan(before);
    });
    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("4");
    });
  });

  it("coalesces invalidation events and prevents duplicate in-flight requests", async () => {
    let resolveFetch;
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = () =>
            resolve({
              ok: true,
              status: 200,
              json: async () => ({ newSubmissions: 2 }),
            });
        })
    );

    render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );

    // Initial fetch is in flight.
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Burst of invalidations while in flight — should not start parallel fetches.
    await act(async () => {
      window.dispatchEvent(new CustomEvent(SUBMISSION_COUNT_INVALIDATED));
      window.dispatchEvent(new CustomEvent(SUBMISSION_COUNT_INVALIDATED));
      window.dispatchEvent(new CustomEvent(SUBMISSION_COUNT_INVALIDATED));
      await new Promise((r) => setTimeout(r, 300));
    });
    expect(global.fetch.mock.calls.length).toBe(1);

    await act(async () => {
      resolveFetch();
      await Promise.resolve();
    });
    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("2");
    });
  });

  it("updates immediately when a submission mutation invalidates the count", async () => {
    render(
      <AdminNotificationProvider>
        <AdminShell title="Submissions">
          <p>body</p>
        </AdminShell>
      </AdminNotificationProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("6");
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ newSubmissions: 5 }),
    });
    await act(async () => {
      invalidateSubmissionCount();
      await new Promise((r) => setTimeout(r, 300));
    });
    await waitFor(() => {
      expect(screen.getByTestId("submissions-badge")).toHaveTextContent("5");
    });
  });

  it("cleans up listeners and aborts in-flight fetches on unmount", async () => {
    const removeVis = vi.spyOn(document, "removeEventListener");
    const removeWin = vi.spyOn(window, "removeEventListener");

    let resolveFetch;
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    const { unmount } = render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );

    unmount();
    expect(removeVis).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    expect(removeWin).toHaveBeenCalledWith("focus", expect.any(Function));
    expect(removeWin).toHaveBeenCalledWith(
      SUBMISSION_COUNT_INVALIDATED,
      expect.any(Function)
    );

    // Resolving after unmount must not throw / update state.
    await act(async () => {
      resolveFetch({
        ok: true,
        status: 200,
        json: async () => ({ newSubmissions: 9 }),
      });
      await Promise.resolve();
    });
  });

  it("does not poll on the login route", async () => {
    pathname = "/admin/login";
    render(
      <AdminNotificationProvider>
        <Probe />
      </AdminNotificationProvider>
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
