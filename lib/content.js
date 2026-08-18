// Public-site content, centralized so the locked platform order can be
// asserted in tests and never silently drifts between components.
//
// Content rule: no unverified business claims (live-partner counts, active
// users, testimonials, deployment counts, performance percentages, or a
// "live" status for Telepizza/Poultry). Everything here is either an
// architectural fact about this repository or explicitly marked as planned/
// future.

export const LOCKED_SEQUENCE = [
  {
    n: "01",
    title: "Mianx Core",
    desc: "Identity, security, communication, automation, and the shared infrastructure every product is built on.",
    status: null,
  },
  {
    n: "02",
    title: "AI Runtime",
    desc: "The governed execution layer that routes tasks to models and agents, enforces policy, and records evidence.",
    status: null,
  },
  {
    n: "03",
    title: "Project Factory",
    desc: 'Turns an approved idea into a running project — scaffolding, data model, APIs, and UI — on top of Mianx Core.',
    status: null,
  },
  {
    n: "04",
    title: "Founder Workspace",
    desc: "One place to direct the AI workforce, review work, and approve what ships.",
    status: null,
  },
  {
    n: "05",
    title: "Core Runtime Agents",
    desc: "10–12 governed AI Workforce roles activated on top of the AI Runtime.",
    status: "In development",
  },
  {
    n: "06",
    title: "End-to-End Beta",
    desc: "The full loop — Founder Workspace to Core Runtime Agents — proven with one real workflow.",
    status: "Planned",
  },
  {
    n: "07",
    title: "Industry Products",
    desc: 'Telepizza, Poultry, and future verticals ship later, as "Powered by Mianx.ai" products.',
    status: "Planned",
  },
];

export const CAPABILITIES = [
  {
    icon: "🏗️",
    title: "Reusable Core Architecture",
    desc: "One shared foundation — identity, security, automation, communication — every future product builds on, instead of being rebuilt from scratch.",
    tags: ["Shared Core", "Reuse-first", "API-first"],
  },
  {
    icon: "🤖",
    title: "Governed AI Runtime",
    desc: "A policy-enforcing execution layer that routes work to models and agents, and records evidence for every material task.",
    tags: ["Task routing", "Policy enforcement", "Evidence"],
  },
  {
    icon: "🏭",
    title: "Autonomous Product Factory",
    desc: "Turns an approved idea into a running project — scaffolding, data model, APIs, and UI — on top of Mianx Core.",
    tags: ["Idea → Product", "Scaffolding", "Faster delivery"],
  },
  {
    icon: "🧑‍💼",
    title: "Founder Workspace",
    desc: "A human-led control surface: direct the AI workforce, review its work, and approve what ships before it goes live.",
    tags: ["Human-in-the-loop", "Review & approve", "Full visibility"],
  },
  {
    icon: "👥",
    title: "AI Workforce",
    desc: "Server-side, governed AI roles — sales, support, ops, research, and more — designed to work under Founder direction, not autonomously unattended.",
    tags: ["Server-side AI", "Role-based", "Human-directed"],
  },
  {
    icon: "📊",
    title: "Observability & Evidence",
    desc: "Every material task is expected to produce evidence — what ran, what changed, and what was verified — not just a completion claim.",
    tags: ["Verifiable work", "Audit trail", "Truthful status"],
  },
];

export const FUTURE_PRODUCTS = [
  {
    icon: "🍕",
    title: "RestaurantOS",
    desc: "Website, online ordering, POS, kitchen display, and delivery tracking for restaurant operators.",
    tags: ["Online Ordering", "POS", "Kitchen", "Delivery"],
    partner: "Founding design partner: Telepizza.pk",
  },
  {
    icon: "🐔",
    title: "PoultryOS",
    desc: "Live market rates, a bird/feed marketplace, and shed monitoring for poultry trading businesses.",
    tags: ["Live Rates", "Marketplace", "Shed Monitor"],
    partner: "Founding design partner: Al Hamdu Lillah Poultry Traders",
  },
  {
    icon: "🏥",
    title: "HospitalOS",
    desc: "Patient management, appointments, EMR, pharmacy, and billing for healthcare providers.",
    tags: ["Patient Mgmt", "EMR", "Pharmacy", "Billing"],
    partner: null,
  },
  {
    icon: "🎓",
    title: "SchoolOS",
    desc: "Student management, attendance, grading, timetable, and fee management for schools.",
    tags: ["Students", "Attendance", "Grading", "Fees"],
    partner: null,
  },
  {
    icon: "🚚",
    title: "LogisticsOS",
    desc: "Fleet management, route planning, shipment tracking, and warehouse management.",
    tags: ["Fleet", "Routes", "Tracking", "Warehouse"],
    partner: null,
  },
  {
    icon: "🏗️",
    title: "ConstructionOS",
    desc: "Project management, resource planning, site monitoring, and subcontractor management.",
    tags: ["Projects", "Resources", "Site Monitor"],
    partner: null,
  },
];

export const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Discover",
    desc: "We study the business inside-out — workflows, pain points, and where the AI Runtime can genuinely help.",
  },
  {
    n: "2",
    title: "Build",
    desc: "The Project Factory assembles the product on Mianx Core — modules, interfaces, and the intelligence it needs.",
  },
  {
    n: "3",
    title: "Operate",
    desc: "The Founder Workspace directs the AI workforce, reviews its work, and approves what ships.",
  },
];
