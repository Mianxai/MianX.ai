// Canonical workforce role definitions (organizational registry).
//
// Rules:
// - Do NOT invent filler persona names to pad to 445.
// - Named entries come from AGENT-CAPACITY-BASELINE / C-SUITE registry.
// - Incomplete departments use capacity_reserve definitions that hold remaining
//   planned slots honestly until a named inventory is approved.
// - capacitySlots contribute to the 445 planned total; one definition may
//   cover multiple slots (e.g. "Senior Backend Engineers × 10").
// - Executable runtime agents stay in lib/core/agents.js; link via runtimeSlug.

import { DEPARTMENTS } from "./departments";

function def(partial) {
  return {
    version: 1,
    roleType: "specialist",
    hierarchyLevel: "L5",
    reportsTo: null,
    purpose: "",
    responsibilities: [],
    allowedCapabilities: ["summarize", "draft_text"],
    prohibitedCapabilities: [
      "send_email",
      "approve_production_action",
      "budget_recommend",
    ],
    requiredInputs: ["task_context"],
    expectedOutputs: ["structured_result"],
    tools: [],
    providerClass: "none", // org registry; runtime provider chosen on activation
    modelPolicy: "allowlist_only",
    memoryScope: "project",
    knowledgeScope: "project",
    projectScope: "assigned_only",
    approvalPolicy: "human_for_protected",
    riskClass: "R1",
    dataAccessClass: "project_scoped",
    autonomyLevel: "recommend",
    canDelegate: false,
    canApprove: false,
    canSelfApprove: false,
    humanGateRequirements: ["protected_actions"],
    qualityRequirements: ["verifiable_work_envelope_when_material"],
    costBudgetPolicy: "project_budget",
    timeoutPolicy: "default_30s",
    retryPolicy: "bounded_queue_retry",
    lifecycleStatus: "proposed",
    activationClass: "shared",
    capacitySlots: 1,
    subdepartment: null,
    runtimeSlug: null,
    notes: [],
    ...partial,
  };
}

/** Leadership — 11 unique named executives (1 slot each). */
const LEADERSHIP = [
  def({
    id: "role.mianx.ceo.v1",
    slug: "mianx.ceo.v1",
    name: "AI Chief Executive Officer",
    department: "leadership",
    hierarchyLevel: "L1",
    roleType: "executive",
    reportsTo: "founder", // L0 human — not an AI definition
    purpose: "Enterprise strategy and executive coordination under Founder authority.",
    responsibilities: ["coordinate_c_suite", "escalate_to_founder", "strategy_alignment"],
    allowedCapabilities: ["orchestrate", "delegate", "summarize", "plan"],
    prohibitedCapabilities: [
      "approve_production_action",
      "send_email",
      "budget_recommend",
    ],
    riskClass: "R4",
    autonomyLevel: "recommend",
    canDelegate: true,
    canApprove: false,
    canSelfApprove: false,
    humanGateRequirements: ["founder_for_constitutional", "human_for_protected"],
    activationClass: "shared",
    dataAccessClass: "enterprise_read",
  }),
  def({
    id: "role.mianx.cto.v1",
    slug: "mianx.cto.v1",
    name: "AI Chief Technology Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Technology, architecture, engineering, and platform leadership.",
    responsibilities: ["tech_strategy", "engineering_oversight", "platform_health"],
    allowedCapabilities: ["orchestrate", "delegate", "engineering_plan", "plan"],
    riskClass: "R3",
    canDelegate: true,
    activationClass: "shared",
  }),
  def({
    id: "role.mianx.coo.v1",
    slug: "mianx.coo.v1",
    name: "AI Chief Operating Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Operations, service delivery, support, and continuity.",
    responsibilities: ["ops_cadence", "continuity", "support_oversight"],
    allowedCapabilities: ["orchestrate", "delegate", "observe_metrics"],
    riskClass: "R3",
    canDelegate: true,
  }),
  def({
    id: "role.mianx.cmo.v1",
    slug: "mianx.cmo.v1",
    name: "AI Chief Marketing Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Marketing, SEO, brand, and growth.",
    responsibilities: ["brand", "demand", "seo_oversight"],
    allowedCapabilities: ["orchestrate", "delegate", "draft_text"],
    riskClass: "R3",
    canDelegate: true,
  }),
  def({
    id: "role.mianx.cfo.v1",
    slug: "mianx.cfo.v1",
    name: "AI Chief Financial Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Finance, budgets, controls, and financial risk (recommend only).",
    responsibilities: ["budget_oversight", "controls", "financial_risk"],
    allowedCapabilities: ["observe_metrics", "summarize"],
    prohibitedCapabilities: [
      "approve_production_action",
      "send_email",
      "budget_recommend",
    ],
    riskClass: "R4",
    activationClass: "approval_only",
    humanGateRequirements: ["human_for_all_financial_actions"],
  }),
  def({
    id: "role.mianx.chro.v1",
    slug: "mianx.chro.v1",
    name: "AI Chief Human Resources Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "AI workforce structure, lifecycle, and capability.",
    responsibilities: ["workforce_policy", "capacity_planning"],
    allowedCapabilities: ["orchestrate", "delegate", "hire_recommend"],
    riskClass: "R3",
    canDelegate: true,
  }),
  def({
    id: "role.mianx.cpo.v1",
    slug: "mianx.cpo.v1",
    name: "AI Chief Product Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Product strategy, discovery, portfolio, and outcomes.",
    responsibilities: ["product_strategy", "portfolio"],
    allowedCapabilities: ["orchestrate", "delegate", "requirements", "plan"],
    riskClass: "R3",
    canDelegate: true,
  }),
  def({
    id: "role.mianx.cso.v1",
    slug: "mianx.cso.v1",
    name: "AI Chief Sales Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Sales strategy, pipeline, and revenue operations.",
    responsibilities: ["pipeline", "revenue_ops"],
    allowedCapabilities: ["orchestrate", "delegate", "summarize"],
    riskClass: "R3",
    canDelegate: true,
  }),
  def({
    id: "role.mianx.ciso.v1",
    slug: "mianx.ciso.v1",
    name: "AI Chief Information Security Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Security, identity, cyber risk, and incident response.",
    responsibilities: ["security_governance", "incident_oversight"],
    allowedCapabilities: [
      "orchestrate",
      "delegate",
      "security_review",
      "incident_coordinate",
    ],
    riskClass: "R4",
    canDelegate: true,
    activationClass: "shared",
  }),
  def({
    id: "role.mianx.clo.v1",
    slug: "mianx.clo.v1",
    name: "AI Chief Legal Officer",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Legal, privacy, contracts, regulation, and ethics (recommend only).",
    responsibilities: ["legal_review", "privacy", "ethics"],
    allowedCapabilities: ["summarize", "review_work"],
    riskClass: "R4",
    activationClass: "approval_only",
    humanGateRequirements: ["human_for_all_legal_commitments"],
  }),
  def({
    id: "role.mianx.chief-scientist.v1",
    slug: "mianx.chief-scientist.v1",
    name: "AI Chief Scientist",
    department: "leadership",
    hierarchyLevel: "L2",
    roleType: "executive",
    reportsTo: "mianx.ceo.v1",
    purpose: "Research, experimentation, evaluation, and innovation.",
    responsibilities: ["research_agenda", "evaluation_standards"],
    allowedCapabilities: ["research_summary", "orchestrate", "delegate"],
    riskClass: "R3",
    canDelegate: true,
  }),
];

/** Engineering — named role types with slot multiplicity (78). */
const ENGINEERING = [
  def({
    id: "role.eng.senior-backend",
    slug: "engineering.senior-backend",
    name: "Senior Backend Engineer",
    department: "engineering",
    subdepartment: "backend",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 10,
    purpose: "Own complex backend services and domain boundaries.",
    allowedCapabilities: ["engineering_plan", "draft_text", "summarize"],
    lifecycleStatus: "active",
    notes: [
      "VP Engineering L3 director slot is not separately named in the 78; CTO owns until L3 filled.",
      "Wave-2 runtime instances: delivery-architect, delivery-review (project-scoped peers).",
    ],
  }),
  def({
    id: "role.eng.backend",
    slug: "engineering.backend",
    name: "Backend Engineer",
    department: "engineering",
    subdepartment: "backend",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 10,
    purpose: "Implement and maintain backend services.",
    lifecycleStatus: "active",
    notes: ["Wave-2 runtime instance: delivery-engineer (structured plans only — no repo write authority)."],
  }),
  def({
    id: "role.eng.junior-backend",
    slug: "engineering.junior-backend",
    name: "Junior Backend Engineer",
    department: "engineering",
    subdepartment: "backend",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Support backend delivery under supervision.",
    autonomyLevel: "draft",
  }),
  def({
    id: "role.eng.senior-frontend",
    slug: "engineering.senior-frontend",
    name: "Senior Frontend Engineer",
    department: "engineering",
    subdepartment: "frontend",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 8,
    purpose: "Own complex frontend surfaces and UX engineering.",
  }),
  def({
    id: "role.eng.frontend",
    slug: "engineering.frontend",
    name: "Frontend Engineer",
    department: "engineering",
    subdepartment: "frontend",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 8,
    purpose: "Implement product UI within approved design systems.",
  }),
  def({
    id: "role.eng.junior-frontend",
    slug: "engineering.junior-frontend",
    name: "Junior Frontend Engineer",
    department: "engineering",
    subdepartment: "frontend",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 4,
    purpose: "Support frontend delivery under supervision.",
    autonomyLevel: "draft",
  }),
  def({
    id: "role.eng.ios",
    slug: "engineering.ios",
    name: "iOS Engineer",
    department: "engineering",
    subdepartment: "mobile",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "iOS client engineering for Powered-by-MianX products.",
  }),
  def({
    id: "role.eng.android",
    slug: "engineering.android",
    name: "Android Engineer",
    department: "engineering",
    subdepartment: "mobile",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Android client engineering for Powered-by-MianX products.",
  }),
  def({
    id: "role.eng.react-native",
    slug: "engineering.react-native",
    name: "React Native Engineer",
    department: "engineering",
    subdepartment: "mobile",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Cross-platform mobile engineering.",
  }),
  def({
    id: "role.eng.ml",
    slug: "engineering.ml",
    name: "Machine Learning Engineer",
    department: "engineering",
    subdepartment: "ai-ml",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "ML systems within governed model policy.",
    riskClass: "R2",
  }),
  def({
    id: "role.eng.ai",
    slug: "engineering.ai",
    name: "AI Engineer",
    department: "engineering",
    subdepartment: "ai-ml",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 3,
    purpose: "Agent/runtime AI feature engineering.",
  }),
  def({
    id: "role.eng.nlp",
    slug: "engineering.nlp",
    name: "NLP Engineer",
    department: "engineering",
    subdepartment: "ai-ml",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 2,
    purpose: "Language-model application engineering.",
  }),
  def({
    id: "role.eng.senior-qa",
    slug: "engineering.senior-qa",
    name: "Senior QA Engineer (Engineering)",
    department: "engineering",
    subdepartment: "engineering-qa",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 3,
    purpose: "Engineering-embedded QA. Overlaps with independent QA department — keep separation of duties for release gates.",
    allowedCapabilities: ["qa_review", "test_review", "summarize"],
    canApprove: false,
    canSelfApprove: false,
    notes: ["OVERLAP: engineering-qa vs dept.qa — engineering QA cannot waive independent release gates."],
  }),
  def({
    id: "role.eng.qa",
    slug: "engineering.qa",
    name: "QA Engineer (Engineering)",
    department: "engineering",
    subdepartment: "engineering-qa",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 3,
    purpose: "Embedded test engineering.",
    allowedCapabilities: ["qa_review", "test_review"],
  }),
  def({
    id: "role.eng.junior-qa",
    slug: "engineering.junior-qa",
    name: "Junior QA Engineer (Engineering)",
    department: "engineering",
    subdepartment: "engineering-qa",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 2,
    purpose: "Support embedded QA under supervision.",
    autonomyLevel: "draft",
  }),
];

const DEVOPS = [
  def({
    id: "role.devops.senior-sre",
    slug: "devops.senior-sre",
    name: "Senior Site Reliability Engineer",
    department: "devops",
    subdepartment: "sre",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Own reliability for critical services.",
    riskClass: "R3",
    humanGateRequirements: ["human_for_production_changes"],
  }),
  def({
    id: "role.devops.sre",
    slug: "devops.sre",
    name: "Site Reliability Engineer",
    department: "devops",
    subdepartment: "sre",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Operate and improve service reliability.",
  }),
  def({
    id: "role.devops.platform",
    slug: "devops.platform",
    name: "Platform Engineer",
    department: "devops",
    subdepartment: "platform",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 5,
    purpose: "Internal developer platforms and paved paths.",
  }),
  def({
    id: "role.devops.kubernetes",
    slug: "devops.kubernetes",
    name: "Kubernetes Engineer",
    department: "devops",
    subdepartment: "platform",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 3,
    purpose: "Container orchestration platforms.",
  }),
  def({
    id: "role.devops.automation",
    slug: "devops.automation",
    name: "Automation Engineer",
    department: "devops",
    subdepartment: "automation",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 4,
    purpose: "Automation of delivery and operations workflows.",
  }),
  def({
    id: "role.devops.cicd",
    slug: "devops.cicd",
    name: "CI/CD Engineer",
    department: "devops",
    subdepartment: "automation",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 2,
    purpose: "Continuous integration and delivery pipelines.",
    lifecycleStatus: "active",
    notes: ["Wave-3 runtime: platform-devops"],
  }),
];

const SECURITY = [
  def({
    id: "role.sec.architect",
    slug: "security.architect",
    name: "Security Architect",
    department: "security",
    subdepartment: "security-architecture",
    reportsTo: "mianx.ciso.v1",
    hierarchyLevel: "L4",
    roleType: "manager",
    capacitySlots: 3,
    purpose: "Security architecture and control design.",
    allowedCapabilities: ["security_review", "plan", "summarize"],
    riskClass: "R3",
  }),
  def({
    id: "role.sec.engineer",
    slug: "security.engineer",
    name: "Security Engineer",
    department: "security",
    subdepartment: "security-architecture",
    reportsTo: "mianx.ciso.v1",
    capacitySlots: 5,
    purpose: "Implement and verify security controls.",
    allowedCapabilities: ["security_review", "summarize"],
    riskClass: "R3",
    lifecycleStatus: "active",
    notes: ["Wave-3 runtime: platform-security"],
  }),
  def({
    id: "role.sec.pentest",
    slug: "security.penetration-tester",
    name: "Penetration Tester",
    department: "security",
    subdepartment: "red-team",
    reportsTo: "mianx.ciso.v1",
    capacitySlots: 4,
    purpose: "Authorized offensive testing within approved scope.",
    riskClass: "R4",
    activationClass: "approval_only",
    humanGateRequirements: ["human_for_offensive_engagement"],
  }),
  def({
    id: "role.sec.red-team",
    slug: "security.red-team",
    name: "Red Team Engineer",
    department: "security",
    subdepartment: "red-team",
    reportsTo: "mianx.ciso.v1",
    capacitySlots: 3,
    purpose: "Adversarial simulation under explicit authorization.",
    riskClass: "R4",
    activationClass: "approval_only",
  }),
  def({
    id: "role.sec.compliance",
    slug: "security.compliance",
    name: "Compliance Specialist",
    department: "security",
    subdepartment: "compliance-audit",
    reportsTo: "mianx.ciso.v1",
    capacitySlots: 5,
    purpose: "Compliance evidence and control mapping.",
    riskClass: "R2",
  }),
  def({
    id: "role.sec.audit",
    slug: "security.audit",
    name: "Audit Specialist",
    department: "security",
    subdepartment: "compliance-audit",
    reportsTo: "mianx.ciso.v1",
    capacitySlots: 5,
    purpose: "Independent audit evidence collection and reporting.",
    canApprove: false,
    canSelfApprove: false,
    riskClass: "R2",
  }),
];

/**
 * Existing runtime proof agents — linked into the org model without claiming
 * they fill department headcount slots beyond documentation.
 * They are WAVE 0 executable definitions in lib/core/agents.js.
 */
const RUNTIME_LINKED = [
  def({
    id: "role.runtime.lead-intelligence",
    slug: "runtime.lead-intelligence",
    name: "Lead Intelligence Agent (runtime)",
    department: "sales",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cso.v1",
    capacitySlots: 0, // does not consume the 445 planning slots; already counted via capacity_reserve
    purpose: "Evaluate inbound leads; active in lib/core/agents.js.",
    lifecycleStatus: "active",
    runtimeSlug: "lead-intelligence",
    activationClass: "persistent_operational",
    allowedCapabilities: ["read_lead", "score_lead", "summarize", "draft_text"],
    notes: ["Runtime proof agent. Slot accounting remains in sales capacity_reserve."],
  }),
  def({
    id: "role.runtime.research",
    slug: "runtime.research",
    name: "Research Agent (runtime)",
    department: "research",
    hierarchyLevel: "L5",
    reportsTo: "mianx.chief-scientist.v1",
    capacitySlots: 0,
    purpose: "Bounded research summaries; active in lib/core/agents.js.",
    lifecycleStatus: "active",
    runtimeSlug: "research",
    activationClass: "ephemeral",
    allowedCapabilities: ["research_summary", "summarize"],
  }),
  def({
    id: "role.runtime.qa-review",
    slug: "runtime.qa-review",
    name: "QA Review Agent (runtime)",
    department: "qa",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 0,
    purpose: "Structured QA verdicts; cannot approve protected production actions.",
    lifecycleStatus: "active",
    runtimeSlug: "qa-review",
    activationClass: "ephemeral",
    allowedCapabilities: ["qa_review", "summarize"],
    canApprove: false,
    canSelfApprove: false,
    prohibitedCapabilities: [
      "approve_production_action",
      "send_email",
      "budget_recommend",
    ],
  }),
];

/**
 * Product — promote one named delivery owner from capacity.product (not filler).
 * Remaining product capacity stays in capacity.product reserve.
 */
const PRODUCT = [
  def({
    id: "role.product.delivery-owner",
    slug: "product.delivery-owner",
    name: "Product Delivery Owner",
    department: "product",
    subdepartment: "product-management",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cpo.v1",
    capacitySlots: 1,
    purpose:
      "Own product specifications, acceptance criteria, and scope for delivery pods.",
    responsibilities: [
      "interpret_objectives",
      "define_requirements",
      "acceptance_criteria",
      "scope_boundaries",
    ],
    allowedCapabilities: ["requirements", "plan", "summarize"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: [
      "Promoted from capacity.product for Wave-2 minimum pod — not a capacity_reserve persona.",
      "Runtime agent: delivery-product (lib/core/delivery).",
    ],
  }),
];

/**
 * Independent QA — final release verification owner (dept.qa).
 * Engineering-embedded QA remains non-certifying support.
 */
const QA = [
  def({
    id: "role.qa.release-verifier",
    slug: "qa.release-verifier",
    name: "Release QA Verifier",
    department: "qa",
    subdepartment: "release-qa",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 1,
    purpose:
      "Independent quality gates for software-delivery readiness. Cannot certify own implementation.",
    responsibilities: [
      "test_plan",
      "functional_verification",
      "regression_verification",
      "acceptance_validation",
      "release_readiness_evidence",
    ],
    allowedCapabilities: ["qa_review", "test_review", "summarize"],
    canApprove: false,
    canSelfApprove: false,
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R3",
    notes: [
      "FINAL independent QA owner for Wave-2. engineering.senior-qa / engineering.qa cannot waive this gate.",
      "Promoted from capacity.qa — remaining QA slots stay in capacity reserve.",
      "Runtime agent: delivery-qa (lib/core/delivery).",
    ],
  }),
];

/** Infrastructure — promote one planner from capacity.infrastructure. */
const INFRASTRUCTURE = [
  def({
    id: "role.infra.planner",
    slug: "infrastructure.planner",
    name: "Infrastructure Planner",
    department: "infrastructure",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 1,
    purpose:
      "Environment and runtime readiness planning. Never mutates production infrastructure.",
    allowedCapabilities: ["plan", "summarize"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R3",
    notes: ["Promoted from capacity.infrastructure for Wave-3. Runtime: platform-infra"],
  }),
];

/** Data & AI — promote one governance role from capacity.data-ai. */
const DATA_AI = [
  def({
    id: "role.data-ai.governance",
    slug: "data-ai.governance",
    name: "Data & AI Governance Specialist",
    department: "data-ai",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 1,
    purpose:
      "Validate provider/model policy, schemas, isolation, and telemetry hygiene.",
    allowedCapabilities: ["summarize", "plan", "research_summary"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R3",
    notes: ["Promoted from capacity.data-ai for Wave-3. Runtime: platform-data-ai"],
  }),
];

/** Wave-4 — Operations / Support / Analytics named minimums. */
const OPERATIONS = [
  def({
    id: "role.operations.coordinator",
    slug: "operations.coordinator",
    name: "Operations Coordinator",
    department: "operations",
    hierarchyLevel: "L5",
    reportsTo: "mianx.coo.v1",
    capacitySlots: 1,
    purpose: "Coordinate operating plans, blockers, SLA signals, and incident workflows.",
    allowedCapabilities: ["incident_coordinate", "plan", "summarize", "observe_metrics"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: ["Wave-4. Runtime: ops-coordinator"],
  }),
];

const SUPPORT = [
  def({
    id: "role.support.triage",
    slug: "support.triage",
    name: "Support Triage Specialist",
    department: "support",
    hierarchyLevel: "L5",
    reportsTo: "mianx.coo.v1",
    capacitySlots: 1,
    purpose: "Issue intake, classification, and knowledge-assisted draft responses (no send).",
    allowedCapabilities: ["draft_text", "summarize", "plan", "follow_up_draft"],
    prohibitedCapabilities: ["send_email", "approve_production_action", "budget_recommend"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: ["Wave-4. Runtime: support-triage"],
  }),
];

const ANALYTICS = [
  def({
    id: "role.analytics.reporter",
    slug: "analytics.reporter",
    name: "Analytics Reporter",
    department: "analytics",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cto.v1",
    capacitySlots: 1,
    purpose: "Truthful metrics with data_available / insufficient_data semantics.",
    allowedCapabilities: ["observe_metrics", "summarize", "plan"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R1",
    notes: ["Wave-4. Runtime: analytics-reporter"],
  }),
];

/** Wave-5 — Sales / Marketing / SEO / Customer Success named minimums. */
const SALES = [
  def({
    id: "role.sales.opportunity",
    slug: "sales.opportunity",
    name: "Sales Opportunity Analyst",
    department: "sales",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cso.v1",
    capacitySlots: 1,
    purpose: "Opportunity analysis and proposal drafting — never autonomous outreach.",
    allowedCapabilities: [
      "score_lead",
      "research_summary",
      "draft_text",
      "plan",
      "summarize",
      "follow_up_draft",
    ],
    prohibitedCapabilities: ["send_email", "approve_production_action", "budget_recommend"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: ["Wave-5. Runtime: sales-opportunity"],
  }),
];

const MARKETING = [
  def({
    id: "role.marketing.planner",
    slug: "marketing.planner",
    name: "Marketing Planner",
    department: "marketing",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cmo.v1",
    capacitySlots: 1,
    purpose: "Campaign and content planning recommendations — no publish/spend.",
    allowedCapabilities: ["plan", "summarize", "draft_text", "research_summary"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: ["Wave-5. Runtime: marketing-planner"],
  }),
];

const SEO = [
  def({
    id: "role.seo.analyst",
    slug: "seo.analyst",
    name: "SEO Analyst",
    department: "seo",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cmo.v1",
    capacitySlots: 1,
    purpose: "Keyword, technical SEO, and content-gap recommendations.",
    allowedCapabilities: ["plan", "summarize", "research_summary"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R1",
    notes: ["Wave-5. Runtime: seo-analyst"],
  }),
];

const CUSTOMER_SUCCESS = [
  def({
    id: "role.customer-success.advisor",
    slug: "customer-success.advisor",
    name: "Customer Success Advisor",
    department: "customer-success",
    hierarchyLevel: "L5",
    reportsTo: "mianx.coo.v1",
    capacitySlots: 1,
    purpose: "Onboarding, health, adoption, and renewal-risk recommendations.",
    allowedCapabilities: ["plan", "summarize", "draft_text"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: ["Wave-5. Runtime: customer-success-advisor"],
  }),
];

/** Wave-6 — Finance / HR / Legal advisory named minimums. */
const FINANCE = [
  def({
    id: "role.finance.advisor",
    slug: "finance.advisor",
    name: "Finance Advisor",
    department: "finance",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cfo.v1",
    capacitySlots: 1,
    purpose: "Budget/cost/forecast recommendations — never transfers or billing changes.",
    allowedCapabilities: ["budget_recommend", "plan", "summarize", "observe_metrics"],
    prohibitedCapabilities: [
      "send_email",
      "approve_production_action",
      "set_policy_recommend",
      "transfer_funds",
      "execute_payment",
      "modify_billing",
    ],
    lifecycleStatus: "active",
    activationClass: "approval_only",
    riskClass: "R4",
    notes: ["Wave-6. Runtime: finance-advisor"],
  }),
];

const HR = [
  def({
    id: "role.hr.workforce-planner",
    slug: "hr.workforce-planner",
    name: "HR Workforce Planner",
    department: "hr",
    hierarchyLevel: "L5",
    reportsTo: "mianx.chro.v1",
    capacitySlots: 1,
    purpose: "Workforce planning, role analysis, hiring-plan and training recommendations. Never hires/fires or changes compensation.",
    allowedCapabilities: ["hire_recommend", "plan", "summarize"],
    prohibitedCapabilities: [
      "send_email",
      "approve_production_action",
      "hire_decide",
      "fire_decide",
      "change_compensation",
    ],
    lifecycleStatus: "active",
    activationClass: "approval_only",
    riskClass: "R3",
    notes: ["Wave-6. Runtime: hr-workforce-planner"],
  }),
];

const LEGAL = [
  def({
    id: "role.legal.risk-advisor",
    slug: "legal.risk-advisor",
    name: "Legal Risk Advisor",
    department: "legal",
    hierarchyLevel: "L5",
    reportsTo: "mianx.clo.v1",
    capacitySlots: 1,
    purpose:
      "Legal-risk analysis and review preparation — not licensed legal advice; never signs/filings.",
    allowedCapabilities: ["plan", "summarize", "review_work"],
    prohibitedCapabilities: [
      "send_email",
      "approve_production_action",
      "sign_agreement",
      "file_regulatory",
      "accept_legal_terms",
    ],
    lifecycleStatus: "active",
    activationClass: "approval_only",
    riskClass: "R4",
    notes: ["Wave-6. Runtime: legal-risk-advisor"],
  }),
];

/** Release-candidate — Design + Research named minimums (no filler personas). */
const DESIGN = [
  def({
    id: "role.design.experience",
    slug: "design.experience",
    name: "Design Experience Reviewer",
    department: "design",
    hierarchyLevel: "L5",
    reportsTo: "mianx.cpo.v1",
    capacitySlots: 1,
    purpose:
      "Interface/design-system/usability/accessibility analysis and handoff. Public site remains locked.",
    allowedCapabilities: ["plan", "summarize", "review_work", "qa_review"],
    prohibitedCapabilities: [
      "send_email",
      "approve_production_action",
      "budget_recommend",
    ],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: [
      "RC minimum for design dept. Runtime: design-reviewer",
      "Does not own Product requirements or QA release gates.",
    ],
  }),
];

const RESEARCH = [
  def({
    id: "role.research.evidence",
    slug: "research.evidence",
    name: "Research Evidence Analyst",
    department: "research",
    hierarchyLevel: "L5",
    reportsTo: "mianx.chief-scientist.v1",
    capacitySlots: 1,
    purpose:
      "Structured research planning, evidence synthesis, source-quality and uncertainty handling.",
    allowedCapabilities: ["research_summary", "plan", "summarize"],
    lifecycleStatus: "active",
    activationClass: "project_dedicated",
    riskClass: "R2",
    notes: [
      "RC minimum for research dept. Runtime: research-evidence",
      "Complements runtime.research (wave-0 summary); does not replace it.",
      "Not marketing research or Product ownership.",
    ],
  }),
];

/**
 * For departments without named role inventories, hold remaining planned slots
 * in an honest capacity_reserve definition (not a fake specialist persona).
 */
function capacityReserves() {
  const namedByDept = {};
  for (const d of [
    ...LEADERSHIP,
    ...ENGINEERING,
    ...DEVOPS,
    ...SECURITY,
    ...PRODUCT,
    ...QA,
    ...INFRASTRUCTURE,
    ...DATA_AI,
    ...OPERATIONS,
    ...SUPPORT,
    ...ANALYTICS,
    ...SALES,
    ...MARKETING,
    ...SEO,
    ...CUSTOMER_SUCCESS,
    ...FINANCE,
    ...HR,
    ...LEGAL,
    ...DESIGN,
    ...RESEARCH,
  ]) {
    namedByDept[d.department] = (namedByDept[d.department] || 0) + d.capacitySlots;
  }

  const reserves = [];
  for (const dept of DEPARTMENTS) {
    const used = namedByDept[dept.slug] || 0;
    const remaining = dept.plannedRoleSlots - used;
    if (remaining < 0) {
      throw new Error(
        `Department ${dept.slug} over-allocated: used ${used} > planned ${dept.plannedRoleSlots}`
      );
    }
    if (remaining === 0) continue;
    reserves.push(
      def({
        id: `role.capacity.${dept.slug}`,
        slug: `capacity.${dept.slug}`,
        name: `${dept.name} capacity reserve (unnamed)`,
        department: dept.slug,
        roleType: "capacity_reserve",
        hierarchyLevel: "L5",
        reportsTo: dept.executiveAgentSlug,
        capacitySlots: remaining,
        purpose:
          "Placeholder capacity for planned role slots without an approved named inventory. Not instantiable as an agent persona.",
        lifecycleStatus: "planned_capacity",
        activationClass: "shared",
        autonomyLevel: "observe",
        allowedCapabilities: [],
        prohibitedCapabilities: [
          "send_email",
          "approve_production_action",
          "budget_recommend",
          "set_policy_recommend",
        ],
        canDelegate: false,
        canApprove: false,
        canSelfApprove: false,
        notes: [
          "Do not invent specialist names to fill this reserve.",
          "Promote to named definitions only after Founder/workforce inventory approval.",
        ],
      })
    );
  }
  return reserves;
}

export const WORKFORCE_DEFINITIONS = [
  ...LEADERSHIP,
  ...ENGINEERING,
  ...DEVOPS,
  ...SECURITY,
  ...PRODUCT,
  ...QA,
  ...INFRASTRUCTURE,
  ...DATA_AI,
  ...OPERATIONS,
  ...SUPPORT,
  ...ANALYTICS,
  ...SALES,
  ...MARKETING,
  ...SEO,
  ...CUSTOMER_SUCCESS,
  ...FINANCE,
  ...HR,
  ...LEGAL,
  ...DESIGN,
  ...RESEARCH,
  ...capacityReserves(),
  ...RUNTIME_LINKED,
];

export function listDefinitions({ includeRuntimeLinks = true, includeCapacityReserves = true } = {}) {
  return WORKFORCE_DEFINITIONS.filter((d) => {
    if (!includeRuntimeLinks && d.runtimeSlug) return false;
    if (!includeCapacityReserves && d.roleType === "capacity_reserve") return false;
    return true;
  }).map((d) => ({ ...d }));
}

export function getDefinition(slug) {
  return WORKFORCE_DEFINITIONS.find((d) => d.slug === slug) || null;
}

export function plannedSlotContribution() {
  return WORKFORCE_DEFINITIONS.reduce((sum, d) => sum + (d.capacitySlots || 0), 0);
}

export function namedDefinitionCount() {
  return WORKFORCE_DEFINITIONS.filter(
    (d) => d.roleType !== "capacity_reserve" && !d.runtimeSlug
  ).length;
}

export function capacityReserveSlotTotal() {
  return WORKFORCE_DEFINITIONS.filter((d) => d.roleType === "capacity_reserve").reduce(
    (sum, d) => sum + d.capacitySlots,
    0
  );
}
