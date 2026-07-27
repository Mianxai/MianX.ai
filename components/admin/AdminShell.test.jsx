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
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders primary nav links including nested runtime routes", () => {
    render(
      <AdminShell title="Overview">
        <p>body</p>
      </AdminShell>
    );

    expect(screen.getByRole("link", { name: /Overview/i })).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("link", { name: /Submissions/i })).toHaveAttribute(
      "href",
      "/admin/submissions"
    );
    expect(screen.getByRole("link", { name: /^Projects$/i })).toHaveAttribute(
      "href",
      "/admin/projects"
    );
    expect(screen.getByRole("link", { name: /Command Center/i })).toHaveAttribute(
      "href",
      "/admin/command-center"
    );
    expect(screen.getByRole("link", { name: /^Objectives$/i })).toHaveAttribute(
      "href",
      "/admin/objectives"
    );
    expect(screen.getByRole("link", { name: /CEO Brief/i })).toHaveAttribute(
      "href",
      "/admin/ceo-brief"
    );
    expect(screen.getByRole("link", { name: /^Runtime$/i })).toHaveAttribute(
      "href",
      "/admin/runtime"
    );
    expect(screen.getByRole("link", { name: /^Agents$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/agents"
    );
    expect(screen.getByRole("link", { name: /^Tasks$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/tasks"
    );
    expect(screen.getByRole("link", { name: /^Runs$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/runs"
    );
    expect(screen.getByRole("link", { name: /^Approvals$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/approvals"
    );
    expect(screen.getByRole("link", { name: /^Audit$/i })).toHaveAttribute(
      "href",
      "/admin/runtime/audit"
    );
    expect(screen.getByRole("link", { name: /Analytics/i })).toHaveAttribute(
      "href",
      "/admin/analytics"
    );
    expect(screen.getByRole("link", { name: /Settings/i })).toHaveAttribute(
      "href",
      "/admin/settings"
    );
    expect(screen.getByRole("link", { name: /Skip to main content/i })).toHaveAttribute(
      "href",
      "#main-content"
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
    expect(screen.getByRole("link", { name: /Overview/i })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("closes the mobile drawer on Escape", async () => {
    mockMobile(true);
    render(
      <AdminShell title="Overview">
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

  it("shows a newCount badge on Submissions when provided", () => {
    render(
      <AdminShell title="Overview" newCount={3}>
        <p>body</p>
      </AdminShell>
    );
    const badge = screen.getByTestId("submissions-badge");
    expect(badge).toHaveTextContent("3");
    expect(badge).toHaveAttribute("aria-label", "3 new submissions");
  });

  it("hides the badge when newCount is 0", () => {
    render(
      <AdminShell title="Overview" newCount={0}>
        <p>body</p>
      </AdminShell>
    );
    expect(screen.queryByTestId("submissions-badge")).toBeNull();
  });

  it("displays 99+ for counts above 99", () => {
    render(
      <AdminShell title="Overview" newCount={150}>
        <p>body</p>
      </AdminShell>
    );
    expect(screen.getByTestId("submissions-badge")).toHaveTextContent("99+");
  });
});
