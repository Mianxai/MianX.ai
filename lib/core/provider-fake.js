// Deterministic fake AI provider for tests and offline development.
//
// Produces schema-valid outputs for each registry agent without any network
// call, so no real Anthropic request (and no cost) is ever incurred in tests.
// Failure modes are injectable so retry/backoff, dead-letter and validation
// paths can be exercised deterministically.

import { ApiError, ERROR_CODES } from "./errors";

// Deterministic score derived from the input so tests are stable.
function stableScore(seed) {
  let h = 0;
  const s = String(seed || "");
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 101;
  return h;
}

export function fakeOutputFor(slug, input = {}) {
  switch (slug) {
    case "lead-intelligence": {
      const score = stableScore(input.email || input.message);
      return {
        score,
        temperature: score >= 70 ? "hot" : score >= 40 ? "warm" : "cold",
        summary: `Deterministic evaluation of lead ${input.email || "unknown"}.`,
        next_actions: ["Review the draft reply", "Schedule a follow-up"],
        draft_reply: `Hello ${input.name || "there"}, thank you for contacting Mianx.ai.`,
      };
    }
    case "research":
      return {
        summary: `Deterministic findings for: ${String(input.question || "").slice(0, 80)}`,
        findings: ["Finding one (reasoned, no external citations)", "Finding two"],
        open_questions: ["What constraints apply?"],
      };
    case "qa-review": {
      const fail = String(input.result || "").includes("FORCE_QA_FAIL");
      return {
        verdict: fail ? "fail" : "pass",
        issues: fail ? ["Result contained a forced QA failure marker."] : [],
        recommendations: fail ? ["Correct the flagged output and re-run."] : [],
      };
    }
    case "workflow-orchestrator":
      return {
        plan: [
          "Clarify the objective and its constraints",
          "Draft the requirements",
          "Review the plan with a human",
        ],
        risks: ["The objective may be under-specified."],
      };
    case "requirements-analyst":
      return {
        summary: `Deterministic requirements for: ${String(input.request || "").slice(0, 80)}`,
        requirements: ["Requirement one", "Requirement two"],
        assumptions: ["The request is complete as written."],
        open_questions: ["Who signs off on the result?"],
      };
    case "engineering-planning":
      return {
        summary: `Deterministic plan for: ${String(input.requirements || "").slice(0, 80)}`,
        work_items: ["Define the module boundary", "Implement the change"],
        risks: ["Scope may grow beyond the stated requirements."],
        test_plan: ["Unit test the new module", "Run the existing suite"],
      };
    case "test-qa": {
      const fail = String(input.evidence || "").includes("FORCE_QA_FAIL");
      return {
        verdict: fail ? "fail" : "pass",
        issues: fail ? ["Evidence contained a forced QA failure marker."] : [],
        recommendations: fail ? ["Fix the failing test and re-submit evidence."] : [],
      };
    }
    case "security-review": {
      const fail = String(input.evidence || "").includes("FORCE_SECURITY_FAIL");
      return {
        verdict: fail ? "fail" : "needs_review",
        findings: fail ? ["Evidence contained a forced security failure marker."] : [],
        recommendations: ["Have a human security reviewer confirm this verdict."],
      };
    }
    case "release-readiness": {
      const blocked =
        String(input.qa_verdict || "") === "fail" ||
        String(input.security_verdict || "") === "fail";
      return {
        recommendation: blocked ? "no_go" : "hold",
        rationale: blocked
          ? "A supplied verdict failed, so the change is not releasable."
          : "Deterministic recommendation: a human must confirm before release.",
        blockers: blocked ? ["A QA or security verdict is failing."] : [],
      };
    }
    case "follow-up-draft":
      return {
        subject: "Following up",
        draft_body: `Hello ${input.audience || "there"}, following up on ${String(
          input.context || "our conversation"
        ).slice(0, 80)}.`,
        caveats: ["Draft only — a human must review and send this."],
      };
    case "executive-ceo": {
      const proposed =
        input.proposed_action || input.plan?.proposed_action || null;
      if (input.mode === "synthesize") {
        const assessments = input.assessments || {};
        const blockers = [];
        for (const [s, out] of Object.entries(assessments)) {
          if (out?.recommendation === "blocked") {
            blockers.push(`${s}: blocked`);
          } else if (out?.recommendation === "hold") {
            blockers.push(`${s}: hold`);
          }
        }
        const blocked = blockers.some((b) => b.includes("blocked"));
        // Provider output is advisory; runtime re-derives approval from proposed_action.
        return {
          objective_summary: String(input.plan?.objective_summary || input.objective || "").slice(
            0,
            500
          ),
          workstreams: (input.plan?.workstreams || []).map((ws) => ({
            ...ws,
            status: assessments[ws.owner_agent]?.recommendation === "blocked" ? "failed" : "succeeded",
          })),
          status: blocked ? "blocked" : proposed ? "awaiting_founder" : "aggregated",
          executive_result: blocked
            ? "Executive assessment blocked by a C-Suite workstream."
            : proposed
              ? `Aggregated. Protected action "${proposed}" requires Founder approval.`
              : "Aggregated. Advisory assessment complete — no protected action proposed.",
          blockers,
          proposed_action: proposed,
          approval_required: Boolean(proposed),
        };
      }
      return {
        objective_summary: `Deterministic plan for: ${String(input.objective || "").slice(0, 120)}`,
        workstreams: [
          {
            id: "ws-tech",
            owner_agent: "executive-cto",
            domain: "technology",
            title: "Technical readiness",
            priority: "high",
            dependencies: [],
            success_criteria: ["Architecture risks identified", "No silent production claims"],
            risk_class: "R3",
            approval_required: false,
            status: "planned",
          },
          {
            id: "ws-product",
            owner_agent: "executive-cpo",
            domain: "product",
            title: "Product readiness",
            priority: "high",
            dependencies: [],
            success_criteria: ["Scope bounded", "Success metrics defined"],
            risk_class: "R2",
            approval_required: false,
            status: "planned",
          },
          {
            id: "ws-security",
            owner_agent: "executive-ciso",
            domain: "security",
            title: "Security / risk readiness",
            priority: "urgent",
            dependencies: [],
            success_criteria: ["Threat surface reviewed", "No policy exceptions assumed"],
            risk_class: "R4",
            approval_required: false,
            status: "planned",
          },
        ],
        status: "planned",
        blockers: [],
        proposed_action: proposed,
        approval_required: Boolean(proposed),
      };
    }
    case "executive-cto":
    case "executive-cpo":
    case "executive-ciso":
    case "executive-coo":
    case "executive-cmo":
    case "executive-cfo":
    case "executive-chro":
    case "executive-cso":
    case "executive-clo":
    case "executive-chief-scientist": {
      const fail = String(input.objective || "").includes("FORCE_EXEC_FAIL");
      const domain = slug.replace("executive-", "");
      // Assessments are advisory by default. Protected actions are proposed
      // only when the objective/input explicitly asks for one.
      const proposed = input.proposed_action || null;
      return {
        domain,
        summary: fail
          ? `Deterministic blocked assessment (${domain}).`
          : `Deterministic ${domain} assessment for: ${String(input.objective || "").slice(0, 80)}`,
        findings: fail
          ? ["Forced failure marker present in objective."]
          : [`${domain} surface reviewed with no fabricated evidence.`],
        risks: fail ? ["Workstream blocked"] : ["Residual advisory uncertainty"],
        recommendation: fail ? "blocked" : "ready",
        proposed_action: proposed || undefined,
        approval_required: false,
      };
    }
    default:
      return { note: "No fake output registered for this agent." };
  }
}

// Creates a runAgentPrompt-compatible fake. Options:
//   failures: number of leading calls that throw a transient error
//   permanentFailure: throw a non-transient error on every call
//   invalidOutput: return schema-invalid output
//   latencyMs / tokens: deterministic metrics
export function createFakeProvider({
  failures = 0,
  permanentFailure = false,
  invalidOutput = false,
  latencyMs = 12,
  inputTokens = 100,
  outputTokens = 50,
} = {}) {
  let calls = 0;
  const fake = async ({ slug, model, input }) => {
    calls += 1;
    fake.calls = calls;
    if (permanentFailure) {
      const err = new ApiError(
        502,
        ERROR_CODES.PROVIDER_ERROR,
        "Fake provider permanent failure."
      );
      err.transient = false;
      throw err;
    }
    if (calls <= failures) {
      const err = new ApiError(
        502,
        ERROR_CODES.PROVIDER_ERROR,
        "Fake provider transient failure (HTTP 429)."
      );
      err.status = 429;
      err.transient = true;
      throw err;
    }
    const output = invalidOutput
      ? { unexpected: "shape" }
      : fakeOutputFor(slug, input);
    return {
      output,
      provider: "none",
      model: model || "fake-model",
      usage: { input_tokens: inputTokens, output_tokens: outputTokens },
      latencyMs,
      estimatedCost: 0,
    };
  };
  fake.calls = 0;
  return fake;
}
