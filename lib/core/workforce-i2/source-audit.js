/**
 * Phase I.2 — authoritative workforce source audit.
 * Records conflicts; resolves via explicit precedence (never silently).
 */

import { createHash } from "crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { SOURCE_PRECEDENCE } from "./constants";

const ROOT = process.cwd();

const SOURCE_GLOBS = [
  { path: "doc/19-ai-workforce", precedence: "approved_workforce_registries" },
  { path: "doc/20-ai-operating-system", precedence: "operating_system_specs" },
  { path: "doc/01-governance", precedence: "governance_constitution" },
  { path: "lib/workforce", precedence: "approved_workforce_registries" },
  { path: "lib/core/agents.js", precedence: "approved_workforce_registries" },
  { path: "execution/PHASE-I1-REAL-AGENT-RUNTIME-REPORT.md", precedence: "historical_documentation" },
  { path: "execution/445-ROLE-COMPILATION-REPORT.md", precedence: "historical_documentation" },
  { path: "execution/PHASE-I-OPERATIONAL-WORKFORCE-REPORT.md", precedence: "historical_documentation" },
];

function hashContent(content) {
  return createHash("sha256").update(content).digest("hex").slice(0, 16);
}

function walkMarkdown(dir, out = []) {
  if (!existsSync(dir)) return out;
  const st = statSync(dir);
  if (st.isFile()) {
    if (/\.(md|js|mjs)$/i.test(dir)) out.push(dir);
    return out;
  }
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    walkMarkdown(join(dir, name), out);
  }
  return out;
}

function extractHints(content, rel) {
  const roles = [];
  const capacityMentions = [];
  const deptMatch = content.match(/department[s]?:?\s*[`"']?([a-z0-9-_]+)/gi) || [];
  const capacityMatch = content.match(/\b(445|258\+|capacity.?slot|role.?slot)/gi) || [];
  if (capacityMatch.length) {
    capacityMentions.push(...capacityMatch.slice(0, 5).map((m) => m.toString()));
  }
  const levelMatch = content.match(/\bL[0-5]\b/g) || [];
  return {
    roleHints: roles,
    capacityMentions,
    departmentsMentioned: [...new Set(deptMatch.map((m) => m.split(/[:\s]+/).pop()))].slice(0, 10),
    levelsMentioned: [...new Set(levelMatch)].slice(0, 6),
    path: rel,
  };
}

/**
 * Build machine-readable source manifest.
 */
export function auditWorkforceSources({ root = ROOT } = {}) {
  const entries = [];
  const conflicts = [];

  for (const src of SOURCE_GLOBS) {
    const abs = join(root, src.path);
    if (!existsSync(abs)) {
      entries.push({
        documentPath: src.path,
        contentHash: null,
        authoritativeStatus: "missing",
        precedence: src.precedence,
        conflicts: [`Path not found: ${src.path}`],
        superseded: false,
        unresolvedGaps: ["source_missing"],
      });
      continue;
    }
    const files = walkMarkdown(abs).slice(0, 200);
    for (const file of files) {
      let content = "";
      try {
        content = readFileSync(file, "utf8");
      } catch {
        continue;
      }
      const rel = relative(root, file);
      const hints = extractHints(content, rel);
      const canonical = /canonical:\s*true/i.test(content);
      const draft = /status:\s*Draft/i.test(content) || /canonical:\s*false/i.test(content);
      entries.push({
        documentPath: rel,
        contentHash: hashContent(content),
        roleOrCapacityExtracted: {
          capacityMentions: hints.capacityMentions,
          departments: hints.departmentsMentioned,
          levels: hints.levelsMentioned,
        },
        department: hints.departmentsMentioned[0] || null,
        level: hints.levelsMentioned[0] || null,
        authoritativeStatus: canonical ? "canonical" : draft ? "draft" : "code_registry",
        precedence: src.precedence,
        conflicts: [],
        superseded: /superseded|deprecated|historical/i.test(content.slice(0, 2000)),
        unresolvedGaps: [],
      });
    }
  }

  // Known documented conflicts (445 vs 258+) — resolve explicitly
  const has445 = entries.some((e) =>
    (e.roleOrCapacityExtracted?.capacityMentions || []).some((m) => String(m).includes("445"))
  );
  const has258 = entries.some((e) =>
    (e.roleOrCapacityExtracted?.capacityMentions || []).some((m) => String(m).includes("258"))
  );
  if (has445 && has258) {
    conflicts.push({
      id: "capacity_445_vs_258",
      description:
        "Master Blueprint historical 258+ vs AGENT-CAPACITY-BASELINE department allocation 445.",
      resolution:
        "445 is the authoritative operational seat baseline (approved_workforce_registries). 258+ is historical planning claim only.",
      precedenceApplied: "approved_workforce_registries > historical_documentation",
      winningValue: 445,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    precedenceOrder: SOURCE_PRECEDENCE,
    entryCount: entries.length,
    entries,
    conflicts,
    unresolvedGaps: entries.flatMap((e) => e.unresolvedGaps || []).filter(Boolean),
    note: "Conflicts are recorded and resolved via explicit precedence — never silently overwritten.",
  };
}
