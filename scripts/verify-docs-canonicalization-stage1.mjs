#!/usr/bin/env node
/**
 * Stage 1 documentation canonicalization checks.
 * Does not parse or rewrite the complete roadmap body.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function read(rel) {
  const p = join(root, rel);
  if (!existsSync(p)) {
    failures.push(`missing file: ${rel}`);
    return "";
  }
  return readFileSync(p, "utf8");
}

function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

const readme = read("doc/README.md");
const roadmap = read("doc/complete-roadmap.md");
const current = read("doc/CURRENT-STATE.md");
const registry = read("doc/DOCUMENT-STATUS-REGISTRY.md");
const map = read("doc/CANONICAL-DOCUMENT-MAP.md");
const tree = read("doc/COMPLETE_PROJECT_TREE.txt");
const plan = read("doc/DOCUMENTATION-REFACTOR-PLAN.md");

// One authoritative README front matter block
const fmBlocks = readme.match(/^---\n[\s\S]*?\n---\n/gm) || [];
assert(fmBlocks.length >= 1, "README missing front matter");
const firstFm = fmBlocks[0] || "";
assert(firstFm.includes("version: 2.1.0"), "README front matter version must be 2.1.0");
assert(!/^version:\s*2\.0\.0$/m.test(firstFm), "README front matter must not keep version 2.0.0");
assert(
  !/^status:\s*Production Ready$/m.test(firstFm),
  "README front matter must not use ambiguous status: Production Ready"
);
assert(firstFm.includes("document_status: review"), "README missing document_status");
assert(
  firstFm.includes("documentation_scope_status: enterprise-draft-complete"),
  "README missing documentation_scope_status"
);
assert(firstFm.includes("implementation_status: partial"), "README missing implementation_status");
assert(firstFm.includes("production_status: pilot"), "README missing production_status");
assert(
  firstFm.includes("verification_status: partially_verified"),
  "README missing verification_status"
);
assert(
  firstFm.includes("canonical_final_document_marker: README Completion Status"),
  "README missing canonical final document marker"
);

// No contradictory version values in front matter / Version table region
assert(
  !readme.includes("| Documentation Version | 2.0.0 |"),
  "README Version table still lists 2.0.0"
);
assert(
  (readme.match(/^version:\s+/gm) || []).length === 1,
  "README must have exactly one version: key in file-level front matter sense (first block only expected)"
);

// Required canonical links
for (const link of [
  "./CURRENT-STATE.md",
  "./DOCUMENT-STATUS-REGISTRY.md",
  "./CANONICAL-DOCUMENT-MAP.md",
  "./DOCUMENTATION-REFACTOR-PLAN.md",
]) {
  assert(readme.includes(link), `README missing link ${link}`);
}

// Registry dimensions
for (const dim of [
  "document_status",
  "implementation_status",
  "production_status",
  "verification_status",
  "authority_status",
]) {
  assert(registry.includes(dim), `REGISTRY missing dimension ${dim}`);
}

// CURRENT-STATE required counters / truths
for (const needle of [
  "Stage 1 — Foundation and Core Platform",
  "capacitySeats",
  "445",
  "allocatedSeats",
  "liveTestedSeats",
  "providerName",
  "none",
  "awaiting_final_review",
  "Genuine provider calls",
  "0",
  "not yet have 445 active or\nlive-tested AI agents",
]) {
  assert(current.includes(needle) || current.replace(/\n/g, " ").includes(needle.replace(/\n/g, " ")),
    `CURRENT-STATE missing truth: ${needle.replace(/\n/g, " ")}`);
}

assert(!/live[- ]tested agents[:\s]+\*\*[1-9]/i.test(current), "CURRENT-STATE must not claim live-tested > 0");
assert(!/active agents[:\s]+\*\*[1-9]/i.test(current), "CURRENT-STATE must not claim active agents > 0");
assert(current.includes("providerName | none") || current.includes("providerName") && current.includes("none"),
  "CURRENT-STATE provider must remain none");
assert(
  current.toLowerCase().includes("not approved") ||
    current.includes("Final Founder Review | not approved"),
  "Founder Final Review must remain unapproved"
);

// Roadmap banner
assert(roadmap.includes("CURRENT-STATE.md"), "roadmap missing CURRENT-STATE link");
assert(roadmap.includes("DOCUMENT-STATUS-REGISTRY.md"), "roadmap missing registry link");
assert(roadmap.includes("CANONICAL-DOCUMENT-MAP.md"), "roadmap missing canonical map link");
assert(
  roadmap.includes("planned future state") || roadmap.includes("planned-future-state"),
  "roadmap must label long-term sections as planned future state"
);
assert(
  roadmap.includes("Elapsed calendar time does not complete a stage"),
  "roadmap missing elapsed-time statement"
);
assert(
  roadmap.includes("Stage 2 cannot be declared complete before Stage 1"),
  "roadmap missing Stage 2 vs Stage 1 exit statement"
);

// Generated tree classification
assert(
  /NON-CANONICAL/i.test(tree) || /non-canonical/i.test(registry),
  "generated tree must be labeled non-canonical"
);
assert(registry.includes("COMPLETE_PROJECT_TREE.txt"), "registry must register tree");
assert(map.includes("COMPLETE_PROJECT_TREE.txt"), "canonical map must classify tree");

// Supporting files exist
assert(plan.includes("Phase 1"), "refactor plan missing Phase 1");
assert(plan.includes("Do not execute in Stage 1") || plan.includes("not executed"),
  "refactor plan must defer later phases");

if (failures.length) {
  console.error("Documentation Stage 1 validation FAILED:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log("Documentation Stage 1 validation PASS");
console.log(" checks: README front matter, links, registry dimensions, CURRENT-STATE counters,");
console.log("         roadmap banner, generated-tree non-canonical classification");
