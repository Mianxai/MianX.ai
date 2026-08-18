// Agent run contract + execution.

import { buildExecutionInput, buildExecutionResult } from "../execution/envelope";
import { assertNoCapabilityEscalation } from "./allocation";
import { transitionState, canTransition } from "./state-machine";
import {
  saveItem,
  appendEvent,
  saveHandoff,
  saveAllocation,
  listAllocations,
} from "./store";
import { defaultProviderAdapter } from "./provider-adapter";
import { createHandoff } from "./handoff";
import { requireReviewsOrPass } from "./review";
import { classifyFailure, applyRetryOrDeadLetter } from "./recovery";
import { proposeExecutionMemory, proposeExecutionLearning } from "./memory-bridge";
import { ALLOCATION_BOUNDS } from "./states";
import { ERROR_CODES } from "../errors";

/**
 * Build strict run contract for an item.
 */
export function buildAgentRunContract(item, program) {
  return {
    item_id: item.id,
    program_id: program.id,
    project_id: program.project_id,
    agent_slug: item.assigned_agent,
    input_envelope: {
      project_id: program.project_id,
      agent_slug: item.assigned_agent || "research",
      objective_id: program.objective_id,
      constraints: [
        "advisory/planning deliverable only",
        "no industry OS build",
        "no protected actions",
      ],
      success_criteria: ["structured output", "evidence present"],
      risk_class: item.risk_level,
    },
    expected_output_schema: {
      type: "object",
      required: ["summary"],
      properties: {
        summary: { type: "string" },
        findings: { type: "array" },
        evidence: { type: "array" },
      },
    },
    allowed_tools: ["analyze", "summarize"],
    forbidden_actions: [
      "production_deploy",
      "send_email",
      "secret_change",
      "industry_os_build",
    ],
    timeout_ms: 30_000,
    retry_policy: {
      max_attempts: item.max_attempts || ALLOCATION_BOUNDS.maxAttempts,
      backoff: "exponential",
    },
    quality_requirements: ["schema_valid", "reviews_pass"],
    evidence_requirements: ["at_least_one_evidence_or_finding"],
    memory_retrieval_scope: "project",
    learning_eligibility: true,
    approval_requirements: [],
  };
}

export async function executeAgentRun({
  item,
  program,
  providerAdapter = null,
  now = Date.now(),
} = {}) {
  const contract = buildAgentRunContract(item, program);
  try {
    assertNoCapabilityEscalation(item.assigned_agent, []);
    buildExecutionInput({
      ...contract.input_envelope,
      agent_slug: item.assigned_agent,
      project_id: program.project_id,
    });
  } catch (err) {
    appendEvent({
      program_id: program.id,
      project_id: program.project_id,
      item_id: item.id,
      event_type: "capability_or_envelope_rejected",
      payload: { message: err.message, code: err.code || null },
    });
    const failed = transitionState(item, "failed", { reason: err.message });
    saveItem(failed);
    return { status: "failed", error: err };
  }

  let running = item;
  if (canTransition(item.status, "running")) {
    running = transitionState(item, "running", { reason: "start" });
    running = { ...running, attempt: (running.attempt || 0) + 1 };
    saveItem(running);
  }

  const impl = providerAdapter || defaultProviderAdapter;
  try {
    const raw = await impl({
      agentSlug: running.assigned_agent,
      input: contract.input_envelope,
      item: running,
    });
    const result = buildExecutionResult({
      status: raw.status || "succeeded",
      structured_output: raw.output || raw.structured_output,
      evidence: raw.output?.evidence || [],
      usage: raw.usage,
    });

    if (result.status !== "succeeded" || !result.structured_output?.summary) {
      throw Object.assign(new Error("Malformed agent output"), {
        code: "OUTPUT_VALIDATION_FAILED",
        transient: false,
      });
    }

    let inReview = transitionState(running, "review", { reason: "output_ok" });
    inReview = {
      ...inReview,
      last_output: result.structured_output,
      audit_metadata: {
        ...(inReview.audit_metadata || {}),
        result_envelope: { status: result.status },
      },
    };
    saveItem(inReview);

    const review = requireReviewsOrPass({
      item: inReview,
      reviewer: "qa-review",
      author: running.assigned_agent,
    });
    if (!review.passed) {
      const failed = transitionState(inReview, "failed", {
        reason: "review_failed",
      });
      saveItem(failed);
      return { status: "failed", review };
    }

    const done = transitionState(inReview, "succeeded", { reason: "review_passed" });
    saveItem(done);

    const handoff = createHandoff({
      producing_agent: running.assigned_agent,
      receiving_department: running.department || "operations",
      task_id: done.id,
      deliverable_type: "structured_summary",
      summary: result.structured_output.summary,
      evidence_references: result.structured_output.evidence || [],
      unresolved_issues: [],
      risks: [],
      acceptance_criteria: contract.success_criteria || [],
    });
    saveHandoff(handoff);

    await proposeExecutionMemory({
      program,
      item: done,
      content: result.structured_output.summary,
      agent: running.assigned_agent,
    });
    await proposeExecutionLearning({
      program,
      item: done,
      outcome: "success",
    });

    // free allocation
    for (const a of listAllocations({ projectId: program.project_id })) {
      if (a.item_id === done.id) {
        saveAllocation({ ...a, status: "released", updated_at: new Date().toISOString() });
      }
    }

    return { status: "succeeded", result, handoff };
  } catch (err) {
    const classified = classifyFailure(err);
    const next = applyRetryOrDeadLetter(running, classified);
    saveItem(next);
    appendEvent({
      program_id: program.id,
      project_id: program.project_id,
      item_id: running.id,
      event_type: "run_failed",
      payload: {
        code: err.code || classified.kind,
        message: String(err.message || "").slice(0, 200),
        next_status: next.status,
      },
    });
    if (err.code === ERROR_CODES.PROVIDER_UNAVAILABLE || err.code === "PROVIDER_UNAVAILABLE") {
      // never mark succeeded
    }
    return { status: next.status, error: err };
  }
}
