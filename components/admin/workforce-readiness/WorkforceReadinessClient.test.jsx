/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import WorkforceReadinessClient from "./WorkforceReadinessClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin/workforce-readiness",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => ({ auth: { signOut: vi.fn() } }),
}));

vi.mock("@/components/admin/AdminShell", () => ({
  default: ({ title, children }) => (
    <div data-testid="admin-shell">
      <aside aria-label="Admin navigation" data-testid="admin-sidebar">
        <a href="/admin/workforce-readiness" aria-current="page">
          Readiness detail
        </a>
      </aside>
      <main>
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  ),
}));

vi.mock("@/components/admin/PageHeader", () => ({
  default: ({ title, description }) => (
    <header>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  ),
}));

vi.mock("@/components/admin/StatusBadge", () => ({
  default: ({ children }) => <span data-testid="status-badge">{children}</span>,
}));

describe("WorkforceReadinessClient foundation closeout", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url) => {
        if (String(url).includes("workforce-readiness")) {
          return {
            ok: true,
            json: async () => ({
              ok: true,
              matrix: {
                totals: { capacitySlots: 445, catalogue: 38, executable: 38 },
                agents: [{ slug: "executive-ceo", name: "CEO", runtime_ready: true, live_tested: false }],
              },
              verify: {
                persistedSeats: 445,
                readyToAllocateSeats: 445,
                allocatedSeats: 0,
                activeInstances: 0,
                foundationReady: true,
                databaseReady: true,
                databaseDurable: true,
                queueDurable: true,
                leasesDurable: true,
                rateLimitDurable: true,
                archetypeCount: 148,
                departmentCount: 20,
              },
            }),
          };
        }
        return {
          ok: true,
          json: async () => ({
            ok: true,
            providerCallsMade: false,
            openrouter: { configured: false },
            compiled: {
              canonicalRolesCompiled: 445,
              documentedSlots: 445,
              unresolvedCapacityGaps: 0,
              note: "Department-pool seats are valid mapped capacity, not gaps.",
            },
            report: {
              readiness: {
                live_tested: 0,
                contract_valid: 38,
                deterministic_ready: 38,
                provider_ready: 0,
                tools_ready: 38,
                runtime_ready: 38,
              },
              capacity: { documentedSlots: 445 },
              agents: [{ slug: "executive-ceo", name: "CEO", runtime_ready: true, live_tested: false }],
              verify: {
                persistedSeats: 445,
                readyToAllocateSeats: 445,
                allocatedSeats: 0,
                foundationReady: true,
              },
            },
            workflows: { founderFamiliesMapped: 13, founderFamiliesRequired: 13 },
            instanceSummary: { running: 0, waiting: 0, blocked: 0, total: 0 },
            queue: { automaticProcessing: false },
          }),
        };
      })
    );
  });

  it("renders inside AdminShell with sidebar", async () => {
    render(<WorkforceReadinessClient />);
    await waitFor(() => expect(screen.getByTestId("admin-shell")).toBeInTheDocument());
    expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("workforce-readiness")).toBeInTheDocument();
    expect(screen.getAllByTestId("admin-sidebar")).toHaveLength(1);
  });

  it("separates capacity truth from live execution with provider-neutral copy", async () => {
    render(<WorkforceReadinessClient />);
    await waitFor(() => expect(screen.getByTestId("wr-persisted")).toHaveTextContent("445"));
    expect(screen.getByTestId("wr-ready")).toHaveTextContent("445");
    expect(screen.getByTestId("wr-allocated")).toHaveTextContent("0");
    expect(screen.getByTestId("wr-active")).toHaveTextContent("0");
    expect(screen.getByTestId("wr-live-tested")).toHaveTextContent("0");
    expect(screen.getByTestId("wr-provider-status")).toHaveTextContent(/AI provider unconfigured/i);
    expect(screen.getByTestId("wr-live-exec")).toHaveTextContent("false");
    expect(screen.getByTestId("wr-foundation-list")).toHaveTextContent(/Database ready/);
    expect(screen.queryByText(/Anthropic/i)).toBeNull();
    expect(screen.queryByText(/445 active agents/i)).toBeNull();
    expect(screen.queryByText(/capacity gaps/i)).toBeNull();
    const details = screen.getByTestId("wr-technical-details");
    expect(details.open).toBe(false);
  });
});
