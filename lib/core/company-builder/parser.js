// Founder Objective Parser — deterministic, no provider calls.

import { validationError } from "../errors";
import { clip } from "../validate";
import { INDUSTRY_HINTS } from "./schemas";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function detectIndustry(text) {
  for (const hint of INDUSTRY_HINTS) {
    if (hint.re.test(text)) {
      return { industry: hint.industry, productHint: hint.productHint };
    }
  }
  return { industry: "general", productHint: "New Product" };
}

function detectPriority(text) {
  if (/\b(p0|critical|urgent|asap)\b/i.test(text)) return "P0";
  if (/\b(p1|high)\b/i.test(text)) return "P1";
  if (/\b(p3|low)\b/i.test(text)) return "P3";
  return "P2";
}

function detectRisk(text) {
  if (/production|deploy|billing|secret|permission/i.test(text)) return "R3";
  if (/customer|external|launch/i.test(text)) return "R2";
  return "R2";
}

/**
 * Parse a Founder free-text objective into a structured company-builder objective.
 * Never executes industry product work.
 */
export function parseFounderObjective(raw = {}) {
  const text = clip(
    typeof raw === "string" ? raw : raw.objective || raw.text || "",
    4000
  );
  if (!text || text.length < 3) {
    throw validationError("Founder objective text is required.", {
      objective: "required",
    });
  }

  const { industry, productHint } = detectIndustry(text);
  const priority = detectPriority(text);
  const risk = typeof raw.risk === "string" ? raw.risk : detectRisk(text);

  const constraints = [
    "Do not build industry OS products in this planning cycle",
    "Company Builder produces plans and backlog only until Founder approval",
    "No production deploy, secret changes, billing, or external sends",
    "No paid provider calls required for planning",
  ];
  if (Array.isArray(raw.constraints)) {
    for (const c of raw.constraints) {
      if (typeof c === "string" && c.trim()) constraints.push(clip(c, 240));
    }
  }

  const successCriteria = [
    "Structured objective parsed with industry and product hint",
    "CEO strategic plan generated",
    "All required departments produce execution plans",
    "Unified backlog with epics/features/stories/tasks",
    "Cross-department dependency graph and execution roadmap",
    "Founder approval requested — no autonomous execution before approval",
  ];

  return {
    objective_id: raw.objective_id || uid("obj"),
    raw_text: text,
    industry,
    business: clip(raw.business || `${productHint} powered by MianX.ai`, 200),
    product_hint: productHint,
    constraints: [...new Set(constraints)].slice(0, 20),
    success_criteria: successCriteria,
    priority,
    budget: raw.budget || { mode: "unspecified", note: "Budget not provided — planning only" },
    risk_class: ["R1", "R2", "R3", "R4"].includes(risk) ? risk : "R2",
    timeline: raw.timeline || {
      mode: "phased",
      phases: ["discover", "foundation", "build", "harden", "launch-ready"],
      note: "Indicative planning phases — not a production schedule commitment",
    },
    project_id: raw.project_id || null,
    organization_id: raw.organization_id || null,
    parsed_at: new Date().toISOString(),
    engine: "company-builder",
  };
}
