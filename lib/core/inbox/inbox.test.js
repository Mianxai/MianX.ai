import { describe, it, expect, vi, beforeEach } from "vitest";

const repoMock = vi.hoisted(() => ({
  listApprovals: vi.fn(),
  listTasks: vi.fn(),
  countJobsByStatus: vi.fn(),
  countByStatus: vi.fn(),
}));

vi.mock("@/lib/core/repo", () => repoMock);
vi.mock("@/lib/core/config", () => ({
  runtimeConfigStatus: () => ({
    scheduler: {
      mode: "external_scheduler_required",
      automaticProcessing: false,
      founderGuidance: "Configure external scheduler",
    },
  }),
}));
vi.mock("@/lib/core/production-readiness", () => ({
  productionReadinessStatusAsync: async () => ({
    provider: "unconfigured",
    database: "configured",
  }),
}));

import { buildFounderInbox, inboxBadgeCount } from "./build";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Founder Inbox", () => {
  it("lists pending approvals and failed jobs for a project", async () => {
    repoMock.listApprovals.mockResolvedValue([
      {
        id: "a1",
        status: "pending",
        requested_capability: "approve_production_action",
        reason: "Deploy candidate",
        project_id: "p1",
      },
    ]);
    repoMock.listTasks.mockResolvedValue([]);
    repoMock.countJobsByStatus.mockResolvedValue({ failed: 1, dead_letter: 1 });

    const inbox = await buildFounderInbox({ projectId: "p1" });
    expect(inbox.available).toBe(true);
    expect(inbox.items.some((i) => i.kind === "approval")).toBe(true);
    expect(inbox.items.some((i) => i.kind === "failed_jobs")).toBe(true);
    expect(inboxBadgeCount(inbox)).toBeGreaterThan(0);
    expect(inbox.items.every((i) => typeof i.href === "string")).toBe(true);
  });

  it("does not invent attention when empty project has no failures", async () => {
    repoMock.listApprovals.mockResolvedValue([]);
    repoMock.listTasks.mockResolvedValue([]);
    repoMock.countJobsByStatus.mockResolvedValue({ queued: 2 });

    const inbox = await buildFounderInbox({ projectId: "p1" });
    // scheduler + provider tips may remain; attentionCount excludes them
    expect(inbox.attentionCount).toBe(0);
    expect(inboxBadgeCount(inbox)).toBe(0);
  });
});
