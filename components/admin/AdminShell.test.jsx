// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminShell from "./AdminShell";

const push = vi.fn();
const refresh = vi.fn();
let pathname = "/admin";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh, replace: vi.fn() }),
  usePathname: () => pathname,
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => ({ auth: { signOut: vi.fn() } }),
}));

function mockMobile(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes("900px") ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("AdminShell", () => {
  beforeEach(() => {
    pathname = "/admin";
    push.mockClear();
    mockMobile(false);
    try {
      window.localStorage.clear();
    } catch {
      /* ignore */
    }
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders grouped primary nav without duplicate Agents/Approvals under Runtime", () => {
    render(
      <AdminShell title="Command Center">
        <p>body</p>
      </AdminShell>
    );

    expect(screen.queryByRole("link", { name: /^Overview$/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^Execution$/i })).toBeNull();
    // Leads / Company Builder live under Advanced Operations (collapsed).
    expect(screen.queryByRole("link", { name: /^Leads$/i })).toBeNull();
    expect(screen.getByRole("link", { name: /^Projects$/i })).toHaveAttribute(
      "href",
      "/admin/projects"
    );
    expect(screen.getByRole("link", { name: /^Home$/i })).toHaveAttribute(
      "href",
      "/admin"
    );
    expect(screen.getByRole("link", { name: /^Objectives$/i })).toHaveAttribute(
      "href",
      "/admin/objectives"
    );
    expect(screen.queryByRole("link", { name: /CEO Brief/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /Company Builder/i })).toBeNull();
    expect(screen.getByRole("link", { name: /Founder Inbox/i })).toHaveAttribute(
      "href",
      "/admin/inbox"
    );
    // Workforce group consolidated to single /admin/workforce entry
    expect(screen.queryByRole("link", { name: /^Workforce$/i })).toHaveAttribute(
      "href",
      "/admin/workforce"
    );
    expect(screen.queryByRole("link", { name: /^Agents$/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /Workforce Setup/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /^Readiness$/i })).toBeNull();
    expect(screen.getByRole("link", { name: /Founder Proof/i })).toHaveAttribute(
      "href",
      "/admin/integration"
    );
    // Advanced Operations is collapsed by default.
    expect(screen.queryByRole("link", { name: /^Instances$/i })).toBeNull();
    expect(screen.getByTestId("advanced-ops-toggle")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Skip to main content/i })).toHaveAttribute(
      "href",
      "#main-content"
    );
  });

  it("expands Advanced Operations to show Runtime children", async () => {
    const user = userEvent.setup();
    render(
      <AdminShell title="Command Center">
        <p>body</p>
      </AdminShell>
    );
    const toggle = screen.getByTestId("advanced-ops-toggle");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.textContent).toMatch(/▸/);
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.textContent).toMatch(/▾/);
    expect(screen.getByRole("link", { name: /Agent Instances/i })).toHaveAttribute(
      "href",
      "/admin/runtime/agents"
    );
    expect(screen.getByRole("link", { name: /Runtime Overview/i })).toHaveAttribute(
      "href",
      "/admin/runtime"
    );
    expect(screen.getByRole("link", { name: /^Tasks$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/tasks"
    );
    expect(screen.getByRole("link", { name: /^Runs$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/runs"
    );
    expect(screen.getByRole("link", { name: /Full Audit/i })).toHaveAttribute(
      "href",
      "/admin/runtime/audit"
    );
    expect(screen.getByRole("link", { name: /Technical Settings/i })).toHaveAttribute(
      "href",
      "/admin/settings"
    );
  });

  it("auto-expands Advanced Operations when a child route is active", () => {
    pathname = "/admin/runtime/queue";
    render(
      <AdminShell title="Queue">
        <p>body</p>
      </AdminShell>
    );
    expect(screen.getByTestId("advanced-ops-toggle").getAttribute("aria-expanded")).toBe(
      "true"
    );
    expect(screen.getByRole("link", { name: /^Queue$/i })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("marks the current route with aria-current", () => {
    pathname = "/admin/analytics";
    render(
      <AdminShell title="Analytics">
        <p>body</p>
      </AdminShell>
    );
    expect(screen.getByRole("link", { name: /Analytics/i })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: /^Home$/i })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("closes the mobile drawer on Escape", async () => {
    mockMobile(true);
    render(
      <AdminShell title="Command Center">
        <p>body</p>
      </AdminShell>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Open navigation/i }));
    const aside = screen.getByLabelText("Admin navigation");
    expect(aside.className).toContain("open");

    await user.keyboard("{Escape}");
    expect(aside.className).not.toContain("open");
  });

  it("shows a newCount badge on Leads when provided", async () => {
    const user = userEvent.setup();
    render(
      <AdminShell title="Command Center" newCount={3}>
        <p>body</p>
      </AdminShell>
    );
    await user.click(screen.getByTestId("advanced-ops-toggle"));
    const badge = screen.getByTestId("submissions-badge");
    expect(badge).toHaveTextContent("3");
    expect(badge).toHaveAttribute("aria-label", "3 new submissions");
  });

  it("hides the badge when newCount is 0", async () => {
    const user = userEvent.setup();
    render(
      <AdminShell title="Command Center" newCount={0}>
        <p>body</p>
      </AdminShell>
    );
    await user.click(screen.getByTestId("advanced-ops-toggle"));
    expect(screen.queryByTestId("submissions-badge")).toBeNull();
  });

  it("displays 99+ for counts above 99", async () => {
    const user = userEvent.setup();
    render(
      <AdminShell title="Command Center" newCount={150}>
        <p>body</p>
      </AdminShell>
    );
    await user.click(screen.getByTestId("advanced-ops-toggle"));
    expect(screen.getByTestId("submissions-badge")).toHaveTextContent("99+");
  });
});
