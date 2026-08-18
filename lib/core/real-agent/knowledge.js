/**
 * Bounded Markdown knowledge index for agent retrieval.
 * Does not send entire corpus to the provider.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const DEFAULT_GLOBS = [
  "doc/19-ai-workforce",
  "doc/05-workforce",
  "AGENTS.md",
  "README.md",
  "execution/PHASE-I-OPERATIONAL-WORKFORCE-REPORT.md",
  "execution/WORKFORCE-COMPLETION-MATRIX.md",
];

let cachedIndex = null;

function walkMd(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const st = fs.statSync(dir);
  if (st.isFile()) {
    if (dir.endsWith(".md")) out.push(dir);
    return out;
  }
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    walkMd(path.join(dir, name), out);
  }
  return out;
}

function hashContent(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
}

export function buildKnowledgeIndex({ roots = DEFAULT_GLOBS, force = false } = {}) {
  if (cachedIndex && !force) return cachedIndex;
  const docs = [];
  for (const rel of roots) {
    const abs = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
    for (const file of walkMd(abs)) {
      try {
        const content = fs.readFileSync(file, "utf8");
        const relPath = path.relative(ROOT, file);
        docs.push({
          path: relPath,
          hash: hashContent(content),
          title: path.basename(file, ".md"),
          preview: content.slice(0, 400),
          content,
          scope: relPath.startsWith("doc/") ? "organization" : "repository",
        });
      } catch {
        /* skip unreadable */
      }
    }
  }
  cachedIndex = {
    version: `knowledge_${docs.length}_${Date.now()}`,
    documentCount: docs.length,
    documents: docs,
  };
  return cachedIndex;
}

function scoreDoc(doc, query) {
  const q = String(query || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!q.length) return 0;
  const hay = `${doc.path} ${doc.title} ${doc.preview}`.toLowerCase();
  let score = 0;
  for (const term of q) {
    if (hay.includes(term)) score += 1;
  }
  return score / q.length;
}

export function searchKnowledgeIndex({ query, limit = 5, projectId = null } = {}) {
  const index = buildKnowledgeIndex();
  const ranked = index.documents
    .map((d) => ({
      path: d.path,
      title: d.title,
      hash: d.hash,
      score: scoreDoc(d, query),
      scope: d.scope,
      chunk: d.preview,
    }))
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, Math.min(limit, 10)));

  return {
    query: String(query || "").slice(0, 500),
    projectId,
    knowledgeVersion: index.version,
    searched: index.documentCount,
    selected: ranked.length,
    documents: ranked,
  };
}

export function readKnowledgeDocument({ path: docPath, projectId = null } = {}) {
  const index = buildKnowledgeIndex();
  const hit = index.documents.find((d) => d.path === docPath);
  if (!hit) {
    return { found: false, path: docPath, projectId };
  }
  return {
    found: true,
    path: hit.path,
    hash: hit.hash,
    title: hit.title,
    scope: hit.scope,
    content: hit.content.slice(0, 12000),
    knowledgeVersion: index.version,
    projectId,
  };
}

export function clearKnowledgeCache() {
  cachedIndex = null;
}
