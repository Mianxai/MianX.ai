// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QueuePanel, { formatDuration, formatCost, formatTokens } from "./QueuePanel";

const PROJECT_ID = "11111111-1111-4111-8111-111111111111";

function job(overrides = {}) {
  return {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    project_id: PROJECT_ID,
    agent_slug: "lead-intelligence",
    workflow: "lead-qualification",
    workflow_step: 0,
    status: "queued",
    attempt: 0,
    max_attempts: 3,
    provider: "anthropic",
    model: "claude-sonnet-4-6",
    input_tokens: 100,
    output_tokens: 50,
    estimated_cost: 0.00105,
    latency_ms: 1234,
    created_at: "2026-07-25T10:00:00Z",
    heartbeat_at: null,
    cancel_requested_at: null,
    error: null,
    output: null,
    ...overrides,
  };
}

function okList({ jobs = [], counts = {}, total = jobs.length } = {}) {
  return { ok: true, status: 200, data: { jobs, counts, total } };
}

function makeCall(responses) {
  // responses: array of { match, response } tried in order; or a fn.
  return vi.fn(async (path, options) => {
    for (const { match, response } of responses) {
      if (path.includes(match) && (!response.method || response.method === options?.method)) {
        return typeof response === "function" ? response(path, options) : response;
      }
    }
    return { ok: false, status: 404, data: { error: { message: "not found" } } };
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("format helpers", () => {
  it("formats duration from latency or timestamps", () => {
    expect(formatDuration({ latency_ms: 500 })).toBe("500ms");
    expect(formatDuration({ latency_ms: 2500 })).toBe("2.5s");
    expect(
      formatDuration({
        started_at: "2026-07-25T10:00:00Z",
        finished_at: "2026-07-25T10:00:03Z",
      })
    ).toBe("3.0s");
    expect(formatDuration({})).toBe("—");
  });
  it("formats cost and tokens truthfully, including unknowns", () => {
    expect(formatCost(0.0012)).toBe("$0.0012");
    expect(formatCost(null)).toBe("—");
    expect(formatTokens({ input_tokens: 10, output_tokens: 5 })).toBe("10 in / 5 out");
    expect(formatTokens({})).toBe("—");
  });
});

describe("QueuePanel", () => {
  it("asks for a project when none is selected", () => {
    render(<QueuePanel call={vi.fn()} projectId="" />);
    expect(screen.getByText(/select or create a project/i)).toBeTruthy();
  });

  it("renders status counts and job rows", async () => {
    const call = makeCall([
      {
        match: "/api/core/jobs?",
        response: okList({
          jobs: [job(), job({ id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", status: "dead_letter", error: { code: "PROVIDER_ERROR", message: "The AI provider returned an error (HTTP 429)." } })],
          counts: { queued: 1, dead_letter: 1 },
          total: 2,
        }),
      },
    ]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    await waitFor(() => {
      expect(screen.getByTestId("queue-count-queued").textContent).toBe("1");
    });
    expect(screen.getByTestId("queue-count-dead_letter").textContent).toBe("1");
    expect(screen.getByTestId("queue-count-running").textContent).toBe("0");
    // attempt/max, provider/model, tokens, cost are visible.
    expect(screen.getAllByText(/attempt 0\/3/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/anthropic \/ claude-sonnet-4-6/i).length).toBeGreaterThan(0);
    // Sanitized error surfaces on the dead-letter row.
    expect(screen.getByTestId("job-error").textContent).toContain("PROVIDER_ERROR");
    expect(screen.getByTestId("queue-page-info").textContent).toBe("1–2 of 2");
  });

  it("shows a truthful empty state", async () => {
    const call = makeCall([{ match: "/api/core/jobs?", response: okList() }]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    await waitFor(() => {
      expect(screen.getByText(/no jobs in the queue yet/i)).toBeTruthy();
    });
  });

  it("shows a controlled error state on API failure", async () => {
    const call = makeCall([
      {
        match: "/api/core/jobs?",
        response: { ok: false, status: 500, data: { error: { message: "boom" } } },
      },
    ]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain("boom");
    });
  });

  it("requires confirmation before retrying, then calls the retry endpoint", async () => {
    const user = userEvent.setup();
    const failed = job({ status: "failed", error: { code: "PROVIDER_ERROR", message: "err" } });
    const call = makeCall([
      { match: "/retry", response: { ok: true, status: 200, data: { job: { ...failed, status: "queued" } } } },
      { match: "/api/core/jobs?", response: okList({ jobs: [failed], counts: { failed: 1 } }) },
    ]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    const retryBtn = await screen.findByTestId(`job-retry-${failed.id}`);
    await user.click(retryBtn);
    // No API call yet — confirmation required.
    expect(call.mock.calls.some(([p]) => p.includes("/retry"))).toBe(false);
    expect(screen.getByText(/confirm retry/i)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Yes" }));
    await waitFor(() => {
      expect(call.mock.calls.some(([p]) => p.includes("/retry"))).toBe(true);
    });
  });

  it("declining the confirmation makes no mutation call", async () => {
    const user = userEvent.setup();
    const queued = job({ status: "queued" });
    const call = makeCall([
      { match: "/api/core/jobs?", response: okList({ jobs: [queued], counts: { queued: 1 } }) },
    ]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    const cancelBtn = await screen.findByTestId(`job-cancel-${queued.id}`);
    await user.click(cancelBtn);
    await user.click(screen.getByRole("button", { name: "No" }));
    expect(call.mock.calls.some(([p]) => p.includes("/cancel"))).toBe(false);
  });

  it("keeps existing rows visible during a background refresh (no full-page loader)", async () => {
    let resolveSecond;
    let calls = 0;
    const first = okList({ jobs: [job()], counts: { queued: 1 } });
    const call = vi.fn(async () => {
      calls += 1;
      if (calls === 1) return first;
      return new Promise((resolve) => {
        resolveSecond = () => resolve(first);
      });
    });
    const user = userEvent.setup();
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    await screen.findByTestId("queue-list");
    await user.click(screen.getByTestId("queue-refresh"));
    // While the refresh is in flight the list is still there.
    expect(screen.getByTestId("queue-list")).toBeTruthy();
    expect(document.querySelector(".mx-loader-section")).toBeNull();
    resolveSecond?.();
  });

  it("expands a job to show its output detail", async () => {
    const user = userEvent.setup();
    const done = job({ status: "succeeded", output: { score: 88, temperature: "hot" } });
    const call = makeCall([
      { match: "/api/core/jobs?", response: okList({ jobs: [done], counts: { succeeded: 1 } }) },
    ]);
    render(<QueuePanel call={call} projectId={PROJECT_ID} />);
    await user.click(await screen.findByRole("button", { name: "Detail" }));
    expect(screen.getByLabelText("Job output").textContent).toContain('"score": 88');
  });
});
