/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
      <aside aria-label="Admin navigation" data-testid="admin-sidebar" />
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

const foundation = {
  capacitySeats: 445,
  compiledSeats: 445,
  persistedSeats: 445,
  readyToAllocateSeats: 445,
  allocatedSeats: 0,
  activeInstances: 0,
  liveTestedSeats: 0,
  departments: 20,
  archetypes: 148,
  workflowFamilies: 13,
  workflowFamiliesRequired: 13,
  databaseReady: true,
  foundationReady: true,
  databaseDurable: true,
  queueDurable: true,
  leaseDurable: true,
  rateLimitDurable: true,
  providerName: "none",
  providerConfigured: false,
  liveExecutionReady: false,
  executable: {
    catalogueEntries: 43,
    executableDefinitions: 38,
    intentionallyNonExecutable: 5,
    namedRoleRegistryEntries: 92,
    capacityReserveGaps: 291,
  },
};

describe("WorkforceReadinessClient Phase I.6 truth", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url) => {
        if (String(url).includes("readiness_check")) {
          return {
            ok: true,
            json: async () => ({
              ok: true,
              providerCallsMade: false,
              mutatesDatabase: false,
              foundation,
              openrouter: { configured: false },
              report: { readiness: { live_tested: 0 }, agents: [] },
              instanceSummary: { running: 0 },
            }),
          };
        }
        if (String(url).includes("workforce-readiness")) {
          return {
            ok: true,
            json: async () => ({
              ok: true,
              foundation,
              matrix: {
                totals: { capacitySlots: 445, catalogue: 43, executable: 38 },
                agents: [
                  {
                    slug: "executive-ceo",
                    name: "CEO",
                    runtime_ready: true,
                    live_tested: false,
                  },
                ],
              },
            }),
          };
        }
        return {
          ok: true,
          json: async () => ({
            ok: true,
            providerCallsMade: false,
            foundation,
            openrouter: { configured: false },
            compiled: {
              canonicalRolesCompiled: 92,
              warning: "not compiled seats",
            },
            report: {
              readiness: { live_tested: 0 },
              agents: [
                {
                  slug: "executive-ceo",
                  name: "CEO",
                  runtime_ready: true,
                  live_tested: false,
                },
              ],
            },
            workflows: { founderFamiliesMapped: 13, founderFamiliesRequired: 13 },
            instanceSummary: { running: 0, waiting: 0, blocked: 0, total: 0 },
          }),
        };
      })
    );
  });

  it("shows compiled seats 445 not named-role registry 92", async () => {
    render(<WorkforceReadinessClient />);
    await waitFor(() => expect(screen.getByTestId("wr-compiled")).toHaveTextContent("445"));
    expect(screen.getByTestId("wr-persisted")).toHaveTextContent("445");
    expect(screen.getByTestId("wr-ready")).toHaveTextContent("445");
    expect(screen.getByTestId("wr-catalogue-entries")).toHaveTextContent("43");
    expect(screen.getByTestId("wr-executable-count")).toHaveTextContent("38");
    expect(screen.getByTestId("wr-named-role-registry")).toHaveTextContent("92");
    expect(screen.getByTestId("wr-compiled")).not.toHaveTextContent("92");
    expect(screen.queryByText(/445 active agents/i)).toBeNull();
  });

  it("uses accurate readiness action wording and no Anthropic copy", async () => {
    render(<WorkforceReadinessClient />);
    await waitFor(() =>
      expect(screen.getByTestId("wr-run-readiness-check")).toHaveTextContent(
        /Refresh Foundation Readiness/i
      )
    );
    expect(screen.getByTestId("wr-action-disclaimer")).toHaveTextContent(
      /does not call an AI provider/i
    );
    expect(screen.queryByText(/Anthropic/i)).toBeNull();
    fireEvent.click(screen.getByTestId("wr-run-readiness-check"));
    await waitFor(() =>
      expect(screen.getByTestId("wr-check-note")).toHaveTextContent(/no AI provider call/i)
    );
  });
});
