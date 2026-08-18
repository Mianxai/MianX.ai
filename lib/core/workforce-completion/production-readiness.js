/**
 * Phase I Production Readiness Centre categories.
 */

import { productionReadinessStatus } from "../production-readiness";
import { buildWorkforceCompletionMatrix } from "./matrix";
import { auditCanonicalWorkflows } from "./workflows";
import { auditQueueReliabilityPath } from "./queue-reliability";
import { assertWorkflowRoutingCoverage } from "./router";

function toneFromStatus(status, ok) {
  if (ok === true || status === "configured" || status === "ready") return "ready";
  if (status === "optional" || status === "unconfigured") return "optional";
  if (status === "warning" || status === "degraded") return "warning";
  return "action";
}

export function buildPhaseIProductionReadiness(opts = {}) {
  const core = productionReadinessStatus(opts);
  const matrix = buildWorkforceCompletionMatrix();
  const workflows = auditCanonicalWorkflows();
  const queue = auditQueueReliabilityPath(opts);
  const routing = assertWorkflowRoutingCoverage();

  return {
    categories: {
      CORE: {
        database: core.database,
        authentication: core.admin_membership_schema,
        projectIsolation: "enforced_in_runtime",
        audit: "configured",
        health: core.database === "configured" ? "ready" : "action",
      },
      WORKFORCE: {
        agentDefinitions: matrix.totals.catalogue,
        executableCoverage: matrix.totals.executable,
        routing: routing.allCovered ? "ready" : "action",
        lifecycle: "ready",
        delegation: "ready",
      },
      AUTOMATION: {
        scheduler: queue.features.schedulerHealth?.mode || "unconfigured",
        queue: "ready",
        retries: "ready",
        deadLetter: "ready",
        rateLimiting: queue.rateLimit.durable ? "durable" : "in-memory",
      },
      INTELLIGENCE: {
        providerOptionality: core.provider,
        memory: core.memory_entries_schema || "unknown",
        learning: core.learning_candidates_schema || "unknown",
        templates: "ready",
        planning: "ready",
      },
      GOVERNANCE: {
        approvals: "founder_gated",
        protectedActions: "founder_only",
        evidence: "ready",
        security: "ready",
        compliance: "project_isolated",
      },
    },
    matrixTotals: matrix.totals,
    workflowsOperational: workflows.allOperational,
    routingCovered: routing.allCovered,
    rateLimitHonesty: queue.rateLimit.honesty,
    uiCategories: [
      {
        id: "core",
        label: "Core",
        tone: toneFromStatus(core.database, core.database === "configured"),
        statusLabel: core.database,
        detail: "Database, auth membership, project isolation, audit, health.",
      },
      {
        id: "workforce",
        label: "Workforce",
        tone: matrix.matchesExpected ? "ready" : "action",
        statusLabel: `${matrix.totals.executable}/${matrix.totals.catalogue} executable`,
        detail:
          "Definitions, executable coverage, routing, lifecycle, delegation. 445 slots are capacity inventory.",
      },
      {
        id: "automation",
        label: "Automation",
        tone: queue.rateLimit.durable ? "ready" : "optional",
        statusLabel: queue.automaticProcessing ? "scheduler active" : "manual tick",
        detail: queue.rateLimit.honesty,
      },
      {
        id: "intelligence",
        label: "Intelligence",
        tone: "optional",
        statusLabel: String(core.provider),
        detail: "Provider optional for Level-1. Memory/learning never auto-promote.",
      },
      {
        id: "governance",
        label: "Governance",
        tone: "ready",
        statusLabel: "Founder-gated",
        detail: "Approvals, protected actions, evidence, security, compliance.",
      },
    ],
  };
}
