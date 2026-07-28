import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetWorkforceRuntime,
  bootstrapWorkforce,
  transitionAgent,
  recoverWorkforce,
  buildAgentExecutionContext,
  delegateWork,
  receiveWork,
  replyWork,
  escalateWork,
  detectCircularDelegation,
  distributeWork,
  assignFromQueue,
  startCollaboration,
  shareOutput,
  mergeDecision,
  runPipeline,
  founderApprovePipeline,
  writeTaskExperience,
  listMemoryWrites,
  proposeWorkforceLearning,
  assessLearningProposal,
  pauseWorkforce,
  resumeWorkforce,
  stopAgent,
  startSimulation,
  approveSimulation,
  getWorkforceDashboard,
  getAgentDetail,
  computeWorkloadAnalytics,
  assessWorkforceHealth,
  isTaskClaimed,
  listAgentStates,
} from "./index.js";
import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";

describe("Phase G real autonomous workforce", () => {
  beforeEach(() => {
    __resetWorkforceRuntime();
  });

  it("locks executable catalog at 36 — no filler agents", () => {
    const n = listActiveAgentDefinitions().filter(isAgentExecutable).length;
    expect(n).toBe(36);
    const boot = bootstrapWorkforce({ project_id: "p1" });
    expect(boot.agents).toBe(36);
  });

  it("lifecycle transitions and recovery", () => {
    bootstrapWorkforce({ project_id: "p1" });
    transitionAgent("executive-ceo", "assigned", { project_id: "p1", task_id: "t1" });
    transitionAgent("executive-ceo", "thinking", { project_id: "p1", task_id: "t1" });
    const rec = recoverWorkforce({ project_id: "p1" });
    expect(rec.ok).toBe(true);
    expect(listAgentStates({ project_id: "p1" }).length).toBe(36);
  });

  it("builds full execution context", () => {
    bootstrapWorkforce({ project_id: "p1" });
    const ctx = buildAgentExecutionContext({
      agent_slug: "executive-ceo",
      objective: "Coordinate planning",
      project_id: "p1",
      memory: [{ k: 1 }],
      approval_state: "pending",
      simulation: true,
    });
    expect(ctx.fabricated_execution).toBe(false);
    expect(ctx.provider_called).toBe(false);
    expect(ctx.objective).toMatch(/Coordinate/);
  });

  it("delegation chain with circular detection", () => {
    bootstrapWorkforce({ project_id: "p1" });
    const agents = listActiveAgentDefinitions().filter(isAgentExecutable);
    const a = agents[0].slug;
    const b = agents[1].slug;
    const { message } = delegateWork({
      from_agent: a,
      to_agent: b,
      task_id: "t-del",
      summary: "do work",
      project_id: "p1",
      simulation: true,
    });
    receiveWork({
      agent_slug: b,
      thread_id: message.thread_id,
      task_id: "t-del",
      project_id: "p1",
      simulation: true,
    });
    replyWork({
      from_agent: b,
      to_agent: a,
      thread_id: message.thread_id,
      task_id: "t-del",
      summary: "done",
      project_id: "p1",
      simulation: true,
    });
    // Force circular open edges — must be rejected
    expect(() =>
      delegateWork({
        from_agent: b,
        to_agent: a,
        task_id: "t-circ",
        summary: "back",
        project_id: "p1",
        simulation: true,
      })
    ).toThrow(/Circular delegation rejected/i);
    const circ = detectCircularDelegation("p1");
    expect(circ.ok).toBe(true);
    escalateWork({
      from_agent: b,
      to_agent: "executive-ceo",
      thread_id: message.thread_id,
      task_id: "t-del",
      reason: "need founder",
      project_id: "p1",
      simulation: true,
    });
  });

  it("distribution and collaboration", () => {
    const q = distributeWork({
      objective: "Plan platform work",
      project_id: "p1",
      simulation: true,
    });
    const assigned = assignFromQueue(q, { project_id: "p1" });
    expect(assigned.agent_slug).toBeTruthy();
    const c = startCollaboration({
      participants: ["executive-ceo", assigned.agent_slug === "executive-ceo" ? listActiveAgentDefinitions().filter(isAgentExecutable)[1].slug : assigned.agent_slug],
      project_id: "p1",
      simulation: true,
    });
    shareOutput(c.id, { key: "x", value: 1, agent: "executive-ceo" });
    const c2 = shareOutput(c.id, { key: "x", value: 2, agent: assigned.agent_slug });
    expect(c2.conflicts.length).toBeGreaterThan(0);
    mergeDecision(c.id, { key: "x", chosen_output_id: c2.shared_outputs[0].id, actor: "founder" });
  });

  it("pipeline blocks duplicate claims and requires founder approval", () => {
    bootstrapWorkforce({ project_id: "p1", simulation: true });
    const r1 = runPipeline({
      task_id: "pipe-1",
      agent_slug: "executive-ceo",
      project_id: "p1",
      objective: "sim",
      simulation: true,
      founder_approved: false,
    });
    expect(r1.pending_approval).toBe(true);
    expect(isTaskClaimed("pipe-1")).toBe(true);
    expect(() =>
      runPipeline({
        task_id: "pipe-1",
        agent_slug: "executive-ceo",
        project_id: "p1",
        simulation: true,
      })
    ).toThrow(/Duplicate/);
    const approved = founderApprovePipeline({
      task_id: "pipe-1",
      agent_slug: "executive-ceo",
      project_id: "p1",
      decision: "approve",
    });
    expect(approved.ok).toBe(true);
  });

  it("live pipeline does not fabricate execution without provider", () => {
    bootstrapWorkforce({ project_id: "p1" });
    const r = runPipeline({
      task_id: "live-1",
      agent_slug: "executive-ceo",
      project_id: "p1",
      objective: "live",
      simulation: false,
      founder_approved: false,
    });
    expect(r.ok).toBe(false);
    expect(r.executeResult.provider_called).toBe(false);
    expect(r.executeResult.fabricated_execution ?? false).toBe(false);
  });

  it("memory and learning never auto-approve", () => {
    writeTaskExperience({
      agent_slug: "executive-ceo",
      task_id: "t-m",
      project_id: "p1",
      experience: { ok: true },
      simulation: true,
    });
    expect(listMemoryWrites({ project_id: "p1" }).length).toBeGreaterThan(0);
    const props = proposeWorkforceLearning({
      agent_slug: "executive-ceo",
      project_id: "p1",
      simulation: true,
    });
    expect(props.every((p) => p.auto_approved === false)).toBe(true);
    const bad = assessLearningProposal({ auto_approved: true, evidence: [], confidence: 0.1 });
    expect(bad.safe).toBe(false);
  });

  it("founder control pause/resume/stop", () => {
    bootstrapWorkforce({ project_id: "p1" });
    pauseWorkforce({ actor: "founder" });
    expect(() =>
      distributeWork({ objective: "x", project_id: "p1", simulation: true })
    ).toThrow(/paused/i);
    resumeWorkforce({ actor: "founder" });
    stopAgent("executive-ceo", { project_id: "p1" });
  });

  it("simulation runs without provider and requires explicit founder approval", () => {
    expect(() =>
      startSimulation({ auto_founder_approve: true })
    ).toThrow(/auto-complete|auto/i);
    const { simulation, pipeline } = startSimulation({
      objective: "Simulate workforce collaboration",
      project_id: "sim-p",
    });
    expect(simulation.provider_called).toBe(false);
    expect(simulation.production_mutation).toBe(false);
    expect(simulation.paid_provider).toBe(false);
    expect(pipeline.pending_approval).toBe(true);
    const done = approveSimulation(simulation.id, { decision: "approve" });
    expect(done.simulation.status).toBe("completed");
  });

  it("dashboard and agent detail over real agents", () => {
    const dash = getWorkforceDashboard({ project_id: "p1" });
    expect(dash.executable_agents).toBe(36);
    expect(dash.counts.idle).toBeGreaterThan(0);
    const detail = getAgentDetail("executive-ceo", { project_id: "p1" });
    expect(detail.profile.slug).toBe("executive-ceo");
    const analytics = computeWorkloadAnalytics({ project_id: "p1" });
    expect(analytics).toHaveProperty("success_pct");
    const health = assessWorkforceHealth({ project_id: "p1" });
    expect(health.executable_count).toBe(36);
  });
});
