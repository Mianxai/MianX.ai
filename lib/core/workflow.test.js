import { describe, it, expect, beforeEach, vi } from "vitest";

const repoMock = vi.hoisted(() => ({
  getLead: vi.fn(),
  getProject: vi.fn(),
  createTask: vi.fn(),
  createJob: vi.fn(),
  findJobByIdempotency: vi.fn(),
  findPendingApprovalForTask: vi.fn(),
  createApproval: vi.fn(),
  getTask: vi.fn(),
  updateTask: vi.fn(),
}));
vi.mock("@/lib/core/repo", () => repoMock);

const auditMock = vi.hoisted(() => ({ recordAudit: vi.fn(async () => true) }));
vi.mock("@/lib/core/audit", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, recordAudit: auditMock.recordAudit };
});
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => null }));

import {
  startLeadQualification,
  startProductPlanning,
  startReleaseReadiness,
  advanceWorkflow,
  validateWorkflowStart,
} from "./workflow";

const LEAD = {
  id: "lead1",
  name: "Ada",
  email: "ada@corp.com",
  company: "Corp",
  industry: "retail",
  message: "We need automation.",
  archived_at: null,
};

function wfJob(overrides = {}) {
  return {
    id: "j1",
    project_id: "p1",
    task_id: "t1",
    agent_slug: "lead-intelligence",
    workflow: "lead-qualification",
    workflow_step: 0,
    priority: 0,
    idempotency_key: "wf:lead-qualification:lead1:step:0",
    input: { include_research: false },
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  repoMock.getLead.mockResolvedValue(LEAD);
  repoMock.getProject.mockResolvedValue({ id: "p1" });
  repoMock.createTask.mockResolvedValue({ row: { id: "t1" }, created: true });
  repoMock.createJob.mockImplementation(async (row) => ({
    row: { id: "j-next", ...row },
    created: true,
  }));
  repoMock.findPendingApprovalForTask.mockResolvedValue(null);
  repoMock.createApproval.mockImplementation(async (row) => ({ id: "ap1", ...row }));
  repoMock.getTask.mockResolvedValue({ id: "t1", status: "running", project_id: "p1" });
  repoMock.updateTask.mockImplementation(async (id, patch) => ({ id, ...patch }));
});

describe("validateWorkflowStart", () => {
  it("rejects unknown workflows and missing ids", () => {
    expect(() => validateWorkflowStart({ workflow: "evil" })).toThrow();
    expect(() =>
      validateWorkflowStart({ workflow: "lead-qualification" })
    ).toThrow();
  });
  it("accepts a valid payload with a safe default for include_research", () => {
    const out = validateWorkflowStart({
      workflow: "lead-qualification",
      project_id: "p1",
      lead_id: "l1",
    });
    expect(out.include_research).toBe(false);
  });

  it("accepts product-planning and release-readiness payloads", () => {
    expect(
      validateWorkflowStart({
        workflow: "product-planning",
        project_id: "p1",
        request: "Build a lead triage board",
      }).workflow
    ).toBe("product-planning");
    expect(
      validateWorkflowStart({
        workflow: "release-readiness",
        project_id: "p1",
        change_summary: "Ship queue worker",
      }).workflow
    ).toBe("release-readiness");
  });
});

describe("startProductPlanning / startReleaseReadiness", () => {
  it("enqueues delivery-product as step 0 for product planning", async () => {
    const { job } = await startProductPlanning({
      projectId: "p1",
      request: "Plan a project factory board",
      actor: "admin@mianx.ai",
    });
    const row = repoMock.createJob.mock.calls[0][0];
    expect(row.agent_slug).toBe("delivery-product");
    expect(row.workflow).toBe("product-planning");
    expect(row.workflow_step).toBe(0);
    expect(job).toBeTruthy();
  });

  it("enqueues qa-review as step 0 for release readiness", async () => {
    const { job } = await startReleaseReadiness({
      projectId: "p1",
      changeSummary: "Harden tick auth",
      evidence: "unit tests green",
      actor: "admin@mianx.ai",
    });
    const row = repoMock.createJob.mock.calls[0][0];
    expect(row.agent_slug).toBe("qa-review");
    expect(row.workflow).toBe("release-readiness");
    expect(job).toBeTruthy();
  });
});

describe("startLeadQualification", () => {
  it("loads the lead server-side and enqueues step 0 with server data only", async () => {
    const { job } = await startLeadQualification({
      projectId: "p1",
      leadId: "lead1",
      actor: "admin@mianx.ai",
    });
    expect(repoMock.getLead).toHaveBeenCalledWith("lead1");
    const jobRow = repoMock.createJob.mock.calls[0][0];
    expect(jobRow.agent_slug).toBe("lead-intelligence");
    expect(jobRow.input.email).toBe("ada@corp.com"); // from the DB, not the client
    expect(jobRow.idempotency_key).toBe("wf:lead-qualification:lead1:step:0");
    expect(job).toBeTruthy();
  });

  it("is idempotent per lead (deterministic root key)", async () => {
    repoMock.createTask.mockResolvedValue({ row: { id: "t1" }, created: false });
    repoMock.createJob.mockResolvedValue({ row: { id: "j1" }, created: false });
    const { created } = await startLeadQualification({
      projectId: "p1",
      leadId: "lead1",
      actor: "admin",
    });
    expect(created).toBe(false);
  });
});

describe("advanceWorkflow", () => {
  const LEAD_OUTPUT = {
    score: 80,
    temperature: "hot",
    summary: "Strong lead.",
    next_actions: ["Call"],
    draft_reply: "Hello Ada",
  };

  it("routes lead-intelligence → qa-review when research is not requested", async () => {
    const res = await advanceWorkflow({ job: wfJob(), output: LEAD_OUTPUT });
    expect(res.done).toBe(false);
    const next = repoMock.createJob.mock.calls[0][0];
    expect(next.agent_slug).toBe("qa-review");
    expect(next.workflow_step).toBe(1);
    expect(next.idempotency_key).toBe("wf:lead-qualification:lead1:step:1");
    expect(next.input.result).toContain("Strong lead.");
  });

  it("routes lead-intelligence → research when requested, then research → qa-review", async () => {
    const res = await advanceWorkflow({
      job: wfJob({ input: { include_research: true } }),
      output: LEAD_OUTPUT,
    });
    expect(repoMock.createJob.mock.calls[0][0].agent_slug).toBe("research");
    expect(res.done).toBe(false);

    const res2 = await advanceWorkflow({
      job: wfJob({
        agent_slug: "research",
        workflow_step: 1,
        idempotency_key: "wf:lead-qualification:lead1:step:1",
        input: {
          include_research: true,
          prior: { "lead-intelligence": LEAD_OUTPUT },
        },
      }),
      output: { summary: "s", findings: ["f"] },
    });
    const qa = repoMock.createJob.mock.calls[1][0];
    expect(qa.agent_slug).toBe("qa-review");
    expect(qa.input.result).toContain("lead-intelligence");
    expect(res2.done).toBe(false);
  });

  it("routes QA pass → follow-up-draft (no approval yet)", async () => {
    const res = await advanceWorkflow({
      job: wfJob({
        agent_slug: "qa-review",
        workflow_step: 1,
        input: {
          include_research: false,
          prior: { "lead-intelligence": LEAD_OUTPUT },
        },
      }),
      output: { verdict: "pass", issues: [], recommendations: [] },
    });
    expect(res.done).toBe(false);
    expect(repoMock.createApproval).not.toHaveBeenCalled();
    const next = repoMock.createJob.mock.calls[0][0];
    expect(next.agent_slug).toBe("follow-up-draft");
    expect(next.workflow_step).toBe(2);
  });

  it("creates a PENDING human approval after follow-up draft — nothing auto-approved, nothing sent", async () => {
    const res = await advanceWorkflow({
      job: wfJob({
        agent_slug: "follow-up-draft",
        workflow_step: 2,
        idempotency_key: "wf:lead-qualification:lead1:step:2",
        input: {
          prior: {
            "lead-intelligence": LEAD_OUTPUT,
            "qa-review": { verdict: "pass" },
          },
        },
      }),
      output: {
        subject: "Hello",
        body: "Draft only",
        tone: "professional",
        call_to_action: "Reply",
      },
    });
    expect(res.done).toBe(false);
    expect(res.awaitingApproval).toBe(true);
    expect(repoMock.createApproval).toHaveBeenCalledOnce();
    const approval = repoMock.createApproval.mock.calls[0][0];
    expect(approval.status).toBe("pending");
    expect(approval.requested_capability).toBe("send_email");
    expect(repoMock.createJob).not.toHaveBeenCalled();
    expect(repoMock.updateTask).toHaveBeenCalledWith("t1", {
      status: "awaiting_approval",
    });
  });

  it("reuses an existing pending approval instead of duplicating it", async () => {
    repoMock.findPendingApprovalForTask.mockResolvedValue({ id: "existing" });
    const res = await advanceWorkflow({
      job: wfJob({
        agent_slug: "follow-up-draft",
        workflow_step: 2,
        idempotency_key: "wf:lead-qualification:lead1:step:2",
      }),
      output: {
        subject: "Hello",
        body: "Draft",
        tone: "professional",
        call_to_action: "Reply",
      },
    });
    expect(res.approval.id).toBe("existing");
    expect(res.awaitingApproval).toBe(true);
    expect(res.done).toBe(false);
    expect(repoMock.createApproval).not.toHaveBeenCalled();
  });

  it("halts the workflow on a QA failure — no approval, no next step", async () => {
    const res = await advanceWorkflow({
      job: wfJob({ agent_slug: "qa-review", workflow_step: 1 }),
      output: { verdict: "fail", issues: ["bad"], recommendations: ["fix"] },
    });
    expect(res.halted).toBe(true);
    expect(repoMock.createApproval).not.toHaveBeenCalled();
    expect(repoMock.createJob).not.toHaveBeenCalled();
    const actions = auditMock.recordAudit.mock.calls.map(([, e]) => e.action);
    expect(actions).toContain("workflow.halted");
  });

  it("advances product-planning through QA to completion without external side effects", async () => {
    const res = await advanceWorkflow({
      job: wfJob({
        workflow: "product-planning",
        agent_slug: "delivery-architect",
        workflow_step: 2,
        idempotency_key: "wf:product-planning:p1:x:step:2",
        input: { prior: { "delivery-product": { objective: "s", problem_statement: "s" } } },
      }),
      output: {
        components: ["a"],
        affected_areas: [],
        interfaces: [],
        data_changes: [],
        security_considerations: [],
        implementation_steps: ["step"],
        verification_requirements: ["t"],
        rollback_considerations: [],
      },
    });
    expect(res.done).toBe(false);
    expect(repoMock.createJob.mock.calls[0][0].agent_slug).toBe("qa-review");

    const done = await advanceWorkflow({
      job: wfJob({
        workflow: "product-planning",
        agent_slug: "qa-review",
        workflow_step: 3,
        idempotency_key: "wf:product-planning:p1:x:step:3",
      }),
      output: { verdict: "pass", issues: [], recommendations: [] },
    });
    expect(done.done).toBe(true);
    expect(repoMock.createApproval).not.toHaveBeenCalled();
  });

  it("requests human production approval after release-readiness recommendation", async () => {
    const res = await advanceWorkflow({
      job: wfJob({
        workflow: "release-readiness",
        agent_slug: "release-readiness",
        workflow_step: 2,
        idempotency_key: "wf:release-readiness:p1:x:step:2",
      }),
      output: {
        recommendation: "hold",
        blocking_issues: [],
        residual_risks: ["r"],
        checklist: ["c"],
      },
    });
    expect(res.done).toBe(false);
    expect(res.awaitingApproval).toBe(true);
    expect(repoMock.createApproval).toHaveBeenCalledOnce();
    expect(repoMock.createApproval.mock.calls[0][0].requested_capability).toBe(
      "approve_production_action"
    );
    expect(repoMock.createJob).not.toHaveBeenCalled();
  });

  it("does nothing for non-workflow jobs", async () => {
    const res = await advanceWorkflow({
      job: wfJob({ workflow: null }),
      output: LEAD_OUTPUT,
    });
    expect(res.done).toBe(true);
    expect(repoMock.createJob).not.toHaveBeenCalled();
  });
});
