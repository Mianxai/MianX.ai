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
    case "delivery-product": {
      const bad = String(input.objective || "").includes("FORCE_PRODUCT_MALFORMED");
      if (bad) {
        return {
          objective: "x",
          problem_statement: "y",
          scope: "z",
          out_of_scope: ["a"],
          requirements: ["r"],
          acceptance_criteria: ["ac"],
          constraints: [],
          dependencies: [],
          risk_level: "R2",
          recommendation: "blocked",
          summary: "Forced product malformed path uses blocked recommendation",
        };
      }
      const noAc = String(input.objective || "").includes("FORCE_MISSING_AC");
      return {
        objective: String(input.objective || "Delivery objective").slice(0, 500),
        problem_statement: "Operators lack a concise project-health summary in admin.",
        scope: "Internal admin project-health summary capability (read-only).",
        out_of_scope: ["Production deploy", "Public website changes", "Billing changes"],
        requirements: [
          "Surface project health indicators in admin runtime views",
          "Reuse existing runtime metrics without new external calls",
        ],
        acceptance_criteria: noAc
          ? []
          : [
              "Health summary fields are defined and evidence-backed",
              "No production mutation is claimed",
              "QA maps each acceptance criterion to a check",
            ],
        constraints: ["Project-scoped data only", "No paid provider calls in tests"],
        dependencies: ["existing runtime health/metrics APIs"],
        risk_level: "R2",
      };
    }
    case "delivery-architect": {
      if (String(input.objective || "").includes("FORCE_ARCH_FAIL")) {
        return {
          components: ["blocked-component"],
          affected_areas: ["n/a"],
          interfaces: ["n/a"],
          data_changes: ["none"],
          security_considerations: ["Architecture forced failure"],
          implementation_steps: ["Do not proceed"],
          verification_requirements: ["n/a"],
          rollback_considerations: ["n/a"],
          recommendation: "blocked",
          summary: "Forced architecture failure",
        };
      }
      return {
        components: ["Admin runtime panel", "Project health aggregator module"],
        affected_areas: ["components/admin/runtime", "lib/core"],
        interfaces: ["Internal JSON health summary DTO"],
        data_changes: ["None — read existing task/job aggregates only"],
        security_considerations: ["No secret leakage in health summary", "Project scope enforced"],
        implementation_steps: [
          "Define health summary schema",
          "Map existing metrics into summary fields",
          "Expose via admin panel read path",
        ],
        verification_requirements: ["Unit tests for aggregator", "QA acceptance mapping"],
        rollback_considerations: ["Feature flag / remove panel section — no data migration"],
      };
    }
    case "delivery-engineer": {
      if (String(input.objective || "").includes("FORCE_ENG_FAIL")) {
        return {
          work_packages: [
            {
              task_id: "wp-fail",
              owner: "delivery-engineer",
              files_or_components: ["n/a"],
              change_intent: "Forced engineering failure",
              dependencies: [],
              acceptance_criteria: ["Must not proceed"],
              risk_class: "R3",
              approval_required: false,
            },
          ],
          implementation_result: {
            summary: "Forced engineering failure",
            artifacts: [],
            status: "failed",
          },
          repository_write_performed: false,
          known_risks: ["Forced failure"],
          recommendation: "blocked",
        };
      }
      const proposed = input.proposed_action || null;
      return {
        work_packages: [
          {
            task_id: "wp-health-1",
            owner: "delivery-engineer",
            files_or_components: ["lib/core/health-summary (planned)", "QueuePanel note"],
            change_intent: "Add structured project-health summary plan artifacts",
            dependencies: [],
            acceptance_criteria: [
              "Health summary fields are defined and evidence-backed",
              "No production mutation is claimed",
            ],
            risk_class: "R2",
            approval_required: false,
            proposed_action: proposed,
          },
        ],
        implementation_result: {
          summary:
            "Structured implementation plan produced. No repository files were modified " +
            "(Wave-2 has no autonomous repo-write authority).",
          artifacts: ["engineering_work_packages.json", "implementation_plan.md"],
          status: "planned",
        },
        repository_write_performed: false,
        known_risks: ["Plan may need refinement before human coding"],
        proposed_action: proposed,
      };
    }
    case "delivery-review": {
      if (String(input.objective || "").includes("FORCE_REVIEW_REJECT")) {
        return {
          verdict: "reject",
          findings: ["Forced review rejection marker present."],
          scope_ok: false,
          architecture_ok: false,
          missing_acceptance_criteria: ["Forced"],
          unsafe_capability_requests: [],
        };
      }
      return {
        verdict: "pass",
        findings: ["Implementation plan matches architecture steps", "Scope remains advisory"],
        scope_ok: true,
        architecture_ok: true,
        missing_acceptance_criteria: [],
        unsafe_capability_requests: [],
      };
    }
    case "delivery-qa": {
      const fail = String(input.objective || "").includes("FORCE_QA_FAIL");
      const blocked = String(input.objective || "").includes("FORCE_QA_BLOCKED");
      const risks = String(input.objective || "").includes("FORCE_QA_RISKS");
      const proposed = input.proposed_action || null;
      const qa_status = fail ? "FAIL" : blocked ? "BLOCKED" : risks ? "PASS_WITH_RISKS" : "PASS";
      const criteria = input.product_spec?.acceptance_criteria || [
        "Health summary fields are defined and evidence-backed",
      ];
      return {
        qa_plan: {
          acceptance_criteria_mapping: criteria.map(
            (c) => `${c} → verified against engineering artifacts`
          ),
          functional_tests: ["Validate product spec schema", "Validate architecture required fields"],
          regression_tests: ["Existing Wave-1 executive tests remain green"],
          security_checks: ["No secrets in delivery artifacts"],
          negative_cases: ["Reject empty acceptance criteria", "Reject repo_write=true claims"],
          expected_result: "PASS with evidence-backed readiness",
        },
        qa_status,
        delivery_readiness: {
          requirements_status: fail || blocked ? "incomplete" : "satisfied",
          engineering_status: fail || blocked ? "insufficient" : "planned_ok",
          qa_status,
          known_risks: risks ? ["Residual documentation risk"] : [],
          blockers: fail
            ? ["Forced QA failure"]
            : blocked
              ? ["Forced QA blocked — missing evidence"]
              : [],
          approval_required: Boolean(proposed),
          recommended_next_action: fail || blocked
            ? "Repair failing stage and re-run delivery"
            : proposed
              ? "Await Founder approval for protected action"
              : "Human may implement from plan; no production action required",
          proposed_action: proposed,
        },
        evidence: [
          "Deterministic fake-provider QA evidence",
          "Acceptance criteria mapped 1:1",
        ],
      };
    }
    case "coding-executor": {
      // Prefer real workspace executor when a disposable root + edits are supplied.
      if (input.workspace_root && Array.isArray(input.edits) && input.edits.length) {
        return import("./coding/executor.js").then(({ runFakeCodingExecutor }) =>
          runFakeCodingExecutor({
            workspaceRoot: input.workspace_root,
            projectId: input.project_id || "p-test",
            taskId: input.task_id || "t-test",
            edits: input.edits,
            allowedPathPrefixes: input.allowed_path_prefixes || ["fixtures/"],
            commands: input.commands || [],
            authorizedProtectedPaths: input.authorized_protected_paths || [],
          })
        );
      }
      return {
        files_changed: [{ path: "fixtures/example.txt", operation: "create", bytes: 12 }],
        patch_summary: { format: "summary", files: [{ path: "fixtures/example.txt" }] },
        commands_run: [],
        test_results: [],
        warnings: ["No workspace supplied — synthetic candidate only"],
        risk_class: "R2",
        requires_human_review: true,
        validation_passed: true,
        pushed: false,
        merged: false,
        deployed: false,
      };
    }
    case "platform-security": {
      const fail = String(input.objective || "").includes("FORCE_SECURITY_FAIL");
      const blocked = String(input.objective || "").includes("FORCE_SECURITY_BLOCKED");
      return {
        security_status: fail ? "FAIL" : blocked ? "BLOCKED" : "PASS",
        findings: fail
          ? ["Forced security failure"]
          : blocked
            ? ["Forced security blocked"]
            : ["No secret exposure in candidate paths"],
        recommendations: ["Keep Founder gate for production deploy"],
        secret_exposure: false,
        capability_changes: [],
        production_impact: "none_for_advisory_candidate",
      };
    }
    case "platform-devops": {
      const fail = String(input.objective || "").includes("FORCE_DEVOPS_FAIL");
      return {
        build_status: fail ? "fail" : "pass",
        lint_status: fail ? "fail" : "pass",
        test_status: fail ? "fail" : "pass",
        artifact_readiness: fail ? "not_ready" : "ready_for_human_review",
        deployment_plan: [
          "Human reviews patch",
          "CI on PR",
          "Founder approval before production deploy",
        ],
        rollback_plan: ["Revert PR", "Redeploy previous artifact"],
        risk_assessment: fail
          ? "Forced devops failure"
          : "Advisory candidate — no production deploy executed",
        devops_status: fail ? "FAIL" : "PASS",
      };
    }
    case "platform-infra": {
      const blocked = String(input.objective || "").includes("FORCE_INFRA_BLOCKED");
      return {
        required_services: ["Node.js runtime", "optional local Supabase for app features"],
        runtime_dependencies: ["npm packages from lockfile"],
        environment_requirements: ["No production credentials in coding workspace"],
        health_checks: ["Process boots", "Health endpoint when configured"],
        capacity_assumptions: ["Single-project disposable workspace"],
        failure_modes: ["Workspace unavailable", "Allowlisted command timeout"],
        rollback_considerations: ["Discard disposable workspace"],
        infra_status: blocked ? "BLOCKED" : "PASS",
      };
    }
    case "platform-data-ai": {
      const fail = String(input.objective || "").includes("FORCE_DATA_AI_FAIL");
      return {
        provider_allowed: true,
        model_policy_ok: true,
        fake_provider_for_tests: true,
        schema_ok: true,
        project_isolation_ok: true,
        telemetry_ok: true,
        sensitive_logging_avoided: true,
        data_ai_status: fail ? "FAIL" : "PASS",
        findings: fail ? ["Forced data/AI failure"] : ["Fake provider used; no paid calls"],
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
      : await Promise.resolve(fakeOutputFor(slug, input));
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
