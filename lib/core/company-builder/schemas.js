// Company Builder hierarchy + constants.
// Traceability: Company → Product → Program → Epic → Feature → Story → Task → Agent Run

export const BUILDER_LEVELS = [
  "company",
  "product",
  "program",
  "epic",
  "feature",
  "story",
  "task",
  "agent_run",
];

export const BUILDER_DEPARTMENTS = [
  "product",
  "engineering",
  "design",
  "research",
  "qa",
  "security",
  "devops",
  "marketing",
  "sales",
  "support",
  "finance",
  "legal",
  "operations",
];

export const BUILDER_STATUSES = [
  "draft",
  "planned",
  "awaiting_founder_approval",
  "approved",
  "rejected",
  "cancelled",
];

/** Industry keywords → structured industry slug (planning only — never builds the OS). */
export const INDUSTRY_HINTS = [
  { re: /restaurant\s*os|restaurant|hospitality\s*os/i, industry: "restaurant", productHint: "RestaurantOS" },
  { re: /poultry\s*os|poultry/i, industry: "poultry", productHint: "PoultryOS" },
  { re: /hospital\s*os|healthcare\s*os|hospital/i, industry: "healthcare", productHint: "HospitalOS" },
  { re: /school\s*os|education\s*os|school/i, industry: "education", productHint: "SchoolOS" },
  { re: /retail\s*os|retail/i, industry: "retail", productHint: "RetailOS" },
  { re: /mianx\s*core|platform/i, industry: "platform", productHint: "MianX Core" },
];

export const ENGINE_VERSION = 1;
