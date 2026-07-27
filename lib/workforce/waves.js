// Implementation waves — definitions only; do not implement all roles yet.

export const IMPLEMENTATION_WAVES = [
  {
    id: "wave-0",
    name: "Runtime proof agents (already executable)",
    agents: ["lead-intelligence", "research", "qa-review"],
    registrySlugs: [
      "runtime.lead-intelligence",
      "runtime.research",
      "runtime.qa-review",
    ],
    dependencies: ["lib/core/agents.js", "runtime_jobs queue"],
    whyNow: "Already proven async Lead→Research→QA path on main.",
    unlocks: "Truthful vertical slice without claiming a full workforce.",
  },
  {
    id: "wave-1",
    name: "Founder / Executive / C-Suite control plane",
    agents: [
      "mianx.ceo.v1",
      "mianx.cto.v1",
      "mianx.coo.v1",
      "mianx.cmo.v1",
      "mianx.cfo.v1",
      "mianx.chro.v1",
      "mianx.cpo.v1",
      "mianx.cso.v1",
      "mianx.ciso.v1",
      "mianx.clo.v1",
      "mianx.chief-scientist.v1",
    ],
    dependencies: ["wave-0", "admin membership UUID auth", "approval gates"],
    whyNow: "Establish governed orchestration before specialist sprawl.",
    unlocks: "Delegation, escalation, and department ownership without runtime sprawl.",
  },
  {
    id: "wave-2",
    name: "Core Engineering + Product + QA for building MianX itself",
    agents: [
      "delivery-product",
      "delivery-architect",
      "delivery-engineer",
      "delivery-review",
      "delivery-qa",
    ],
    registrySlugs: [
      "product.delivery-owner",
      "engineering.senior-backend",
      "engineering.backend",
      "qa.release-verifier",
    ],
    dependencies: ["wave-1"],
    whyNow: "Continue platform-first build of MianX Core / AI Runtime / Project Factory.",
    unlocks: "Named engineering capacity with independent QA separation of duties.",
  },
  {
    id: "wave-3",
    name: "DevOps + Security + Infrastructure + Data/AI",
    agents: [
      "coding-executor",
      "platform-security",
      "platform-devops",
      "platform-infra",
      "platform-data-ai",
    ],
    registrySlugs: [
      "engineering.backend",
      "security.engineer",
      "devops.cicd",
      "infrastructure.planner",
      "data-ai.governance",
    ],
    dependencies: ["wave-2"],
    whyNow: "Hardening, reliability, and data/model governance for multi-project readiness.",
    unlocks: "Safer deploys, security reviews, governed model routes, controlled coding.",
  },
  {
    id: "wave-4",
    name: "Operations + Support + Analytics",
    agents: ["capacity.operations", "capacity.support", "capacity.analytics"],
    dependencies: ["wave-3"],
    whyNow: "Operational visibility after core platform stability.",
    unlocks: "Honest ops metrics and support workflows.",
  },
  {
    id: "wave-5",
    name: "Sales + Marketing + SEO + Customer Success",
    agents: [
      "capacity.sales",
      "capacity.marketing",
      "capacity.seo",
      "capacity.customer-success",
    ],
    dependencies: ["wave-0", "wave-1"],
    whyNow: "Growth functions after core OS is trustworthy.",
    unlocks: "Governed GTM agent pods without fake full-workforce activation.",
  },
  {
    id: "wave-6",
    name: "Finance + HR + Legal",
    agents: ["capacity.finance", "capacity.hr", "capacity.legal", "mianx.cfo.v1", "mianx.clo.v1"],
    dependencies: ["wave-1"],
    whyNow: "High-risk domains last; recommend-only until human gates proven.",
    unlocks: "Workforce/finance/legal recommendations under strict approval.",
  },
];

export function listWaves() {
  return IMPLEMENTATION_WAVES.map((w) => ({
    ...w,
    agents: [...w.agents],
    dependencies: [...w.dependencies],
  }));
}
