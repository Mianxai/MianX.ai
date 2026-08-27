// ═══════════════════════════════════════════════════════════════
//  MianX.ai — Specification Reader
//  Reads and parses spec markdown files, analyzes coverage gaps
// ═══════════════════════════════════════════════════════════════

import * as fs from 'fs';
import * as path from 'path';

/* ──────────── Types ──────────── */

export interface SpecDocument {
  id: string;
  title: string;
  category: string; // governance, company, product
  feature: string; // organization-management, authentication, etc.
  path: string;
  status: 'draft' | 'approved' | 'implemented';
  requirements: SpecRequirement[];
  apiEndpoints: SpecAPI[];
  databaseModels: SpecDBModel[];
  lastAnalyzed: Date;
}

export interface SpecRequirement {
  id: string;
  title: string;
  description: string;
  priority: 'must' | 'should' | 'could';
  status: 'pending' | 'partial' | 'implemented' | 'not-applicable';
  evidence?: string;
}

export interface SpecAPI {
  method: string;
  path: string;
  description: string;
  implemented: boolean;
}

export interface SpecDBModel {
  name: string;
  fields: string[];
  implemented: boolean;
}

export interface SpecCoverageReport {
  totalSpecs: number;
  analyzedAt: Date;
  apiCoverage: {
    total: number;
    implemented: number;
    percentage: number;
    missing: string[];
  };
  dbCoverage: {
    total: number;
    implemented: number;
    percentage: number;
    missing: string[];
  };
  featureCoverage: {
    total: number;
    implemented: number;
    partial: number;
    pending: number;
  };
  upgradeTasks: UpgradeTaskSummary[];
  overallReadiness: number;
}

export interface UpgradeTaskSummary {
  id: string;
  specId: string;
  title: string;
  category: 'api' | 'database' | 'ui' | 'auth' | 'agent' | 'config';
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  riskClass: 'R0' | 'R1' | 'R2' | 'R3' | 'R4';
}

/* ──────────── Constants ──────────── */

const SPEC_ROOT = path.resolve(process.cwd(), 'upload/mianx-extracted/mianx-ai-main');
const API_ROOT = path.resolve(process.cwd(), 'src/app/api');
const SCHEMA_PATH = path.resolve(process.cwd(), 'prisma/schema.prisma');
const COMPONENTS_ROOT = path.resolve(process.cwd(), 'src/components');

/* ──────────── Helpers ──────────── */

/** Recursively find all .md files under a directory */
function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Extract YAML frontmatter from markdown */
function extractFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml: Record<string, any> = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val: string | string[] = line.slice(idx + 1).trim();
    // Handle YAML list syntax
    if (val.startsWith('[') && val.endsWith(']')) {
      try { val = JSON.parse(val.replace(/'/g, '"')); } catch { /* keep as string */ }
    }
    yaml[key] = val;
  }
  return yaml;
}

/** Extract document ID from frontmatter or first heading */
function extractDocId(frontmatter: Record<string, any>, content: string): string {
  if (frontmatter.id) return frontmatter.id;
  if (frontmatter.feature) return String(frontmatter.feature);
  // Try to get from first heading
  const headingMatch = content.match(/^#\s+(.+)/m);
  if (headingMatch) {
    const h = headingMatch[1].trim();
    // Look for IDs like FEAT-001, GOV-001, PRD-000
    const idMatch = h.match(/(?:FEAT|GOV|PRD|SPEC)[-_]\d{3}/i);
    if (idMatch) return idMatch[0].toUpperCase();
  }
  // Generate from path as fallback
  return 'UNKNOWN';
}

/** Derive category from folder path */
function deriveCategory(filePath: string): string {
  const rel = path.relative(SPEC_ROOT, filePath);
  if (rel.startsWith('01-governance')) return 'governance';
  if (rel.startsWith('02-company')) return 'company';
  if (rel.startsWith('03-product')) return 'product';
  return 'other';
}

/** Derive feature name from folder path */
function deriveFeature(filePath: string): string {
  const rel = path.relative(SPEC_ROOT, filePath);
  const parts = rel.split(path.sep);
  // Look for pattern: 03-product/features/01-organization-management/...
  const featIdx = parts.findIndex(p => /^\d{2}-.+$/.test(p));
  if (featIdx !== -1 && featIdx + 1 < parts.length && /^\d{2}-.+$/.test(parts[featIdx + 1])) {
    return parts[featIdx + 1].replace(/^\d{2}-/, '');
  }
  return 'general';
}

/** Parse API endpoints from markdown content */
function parseAPIEndpoints(content: string): SpecAPI[] {
  const endpoints: SpecAPI[] = [];
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  // Pattern 1: ```http blocks with METHOD /path
  const httpBlockRegex = /```(?:http|http request)?\n([\s\S]*?)```/gi;
  let blockMatch: RegExpExecArray | null;
  while ((blockMatch = httpBlockRegex.exec(content)) !== null) {
    const block = blockMatch[1];
    for (const method of methods) {
      const re = new RegExp(`${method}\s+(/[^\s\n]+)`, 'g');
      let m: RegExpExecArray | null;
      while ((m = re.exec(block)) !== null) {
        const desc = extractEndpointDescription(content, m[1]);
        endpoints.push({
          method,
          path: m[1],
          description: desc || `${method} ${m[1]}`,
          implemented: false,
        });
      }
    }
  }

  // Pattern 2: Standalone METHOD /path in text (outside code blocks)
  const textContent = content.replace(/```[\s\S]*?```/g, '');
  for (const method of methods) {
    const re = new RegExp(`(?:^|\n)\s*${method}\s+(/[^\s\n]+)`, 'g');
    let m: RegExpExecArray | null;
    while ((m = re.exec(textContent)) !== null) {
      // Avoid duplicates
      if (!endpoints.some(e => e.method === method && e.path === m![1])) {
        const desc = extractEndpointDescription(content, m[1]);
        endpoints.push({
          method,
          path: m[1],
          description: desc || `${method} ${m[1]}`,
          implemented: false,
        });
      }
    }
  }

  return endpoints;
}

/** Try to find a description for an endpoint near its mention */
function extractEndpointDescription(content: string, endpointPath: string): string {
  // Look for the nearest "Purpose" line above the endpoint
  const idx = content.indexOf(endpointPath);
  if (idx === -1) return '';
  const before = content.slice(Math.max(0, idx - 500), idx);
  const purposeMatch = before.match(/Purpose[\s\n]+([A-Z][^.\n]+)/);
  if (purposeMatch) return purposeMatch[1].trim();
  // Look for heading before
  const headingMatch = before.match(/##\s+(.+)/g);
  if (headingMatch && headingMatch.length > 0) {
    return headingMatch[headingMatch.length - 1].replace(/^##\s+/, '').trim();
  }
  return '';
}

/** Parse database model names from markdown content */
function parseDBModels(content: string): SpecDBModel[] {
  const models: SpecDBModel[] = [];
  const seen = new Set<string>();

  // Pattern 1: ## ModelName headings under "## Core Entities" or "# Core Entities"
  const modelHeadingRegex = /^##\s+([A-Z][A-Za-z0-9_]+)\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = modelHeadingRegex.exec(content)) !== null) {
    const name = match[1];
    // Filter out non-model headings
    const skipWords = ['Purpose', 'Relationships', 'Constraints', 'Indexing', 'Security', 'Scalability',
      'Migration', 'Future', 'Related', 'Revision', 'Design', 'Entity', 'Database Scope', 'Overview'];
    if (skipWords.some(w => name.includes(w))) continue;
    if (seen.has(name)) continue;
    seen.add(name);

    // Extract suggested fields from the section after the heading
    const sectionStart = match.index + match[0].length;
    const nextHeading = content.indexOf('\n## ', sectionStart);
    const sectionEnd = nextHeading === -1 ? content.length : nextHeading;
    const section = content.slice(sectionStart, sectionEnd);

    const fields = extractFieldNames(section);
    models.push({ name, fields, implemented: false });
  }

  // Pattern 2: Entity names in ER diagrams
  const erPattern = /([A-Z][A-Za-z\s]+)\n\s*│/g;
  while ((match = erPattern.exec(content)) !== null) {
    const name = match[1].trim().replace(/\s+/g, '');
    if (seen.has(name)) continue;
    if (name.length < 3 || name.length > 40) continue;
    seen.add(name);
    models.push({ name, fields: [], implemented: false });
  }

  return models;
}

/** Extract field names from a section with "Suggested Fields" or field lists */
function extractFieldNames(section: string): string[] {
  const fields: string[] = [];
  // Look for bullet-listed field names
  const bulletRegex = /^[-*]\s+(\w[\w_]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = bulletRegex.exec(section)) !== null) {
    const name = m[1].replace(/_?id$/, ''); // Normalize
    if (name.length >= 2 && !fields.includes(name)) {
      fields.push(name);
    }
  }
  // Also look for "- field_name" patterns
  const dashFieldRegex = /-\s+([a-z][a-z0-9_]*)/g;
  while ((m = dashFieldRegex.exec(section)) !== null) {
    const name = m[1];
    if (name.length >= 2 && !fields.includes(name)) {
      fields.push(name);
    }
  }
  return fields;
}

/** Parse requirements from markdown content */
function parseRequirements(docId: string, content: string): SpecRequirement[] {
  const requirements: SpecRequirement[] = [];
  let reqIdx = 0;

  const lines = content.split('\n');
  let currentHeading = '';
  let currentDesc = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track headings for context
    if (line.startsWith('## ')) {
      currentHeading = line.replace('## ', '').trim();
      currentDesc = '';
    }

    // Look for requirement patterns: "The system shall/should/must/SHALL/SHOULD/MUST"
    const reqMatch = line.match(/(?:The system|It|This module|Every agent)\s+(shall|should|must|SHALL|SHOULD|MUST)\s+(.+)/);
    if (reqMatch) {
      const priorityWord = reqMatch[1].toLowerCase();
      const priority: 'must' | 'should' | 'could' = priorityWord === 'shall' || priorityWord === 'must' ? 'must' : 'should';
      reqIdx++;
      requirements.push({
        id: `${docId}-REQ-${String(reqIdx).padStart(3, '0')}`,
        title: `${currentHeading || 'Requirement'} #${reqIdx}`,
        description: reqMatch[2].trim().replace(/^support\s*:?\s*/i, '').replace(/\.$/, ''),
        priority,
        status: 'pending',
      });
    }

    // Look for bullet items with "shall/should"
    if (line.match(/^\s*[-*]\s+.*\s+(shall|should|must|SHALL|SHOULD|MUST)\b/)) {
      const innerMatch = line.match(/[-*]\s+(.+)/);
      if (innerMatch) {
        const text = innerMatch[1];
        const pWord = text.match(/\b(shall|should|must|SHALL|SHOULD|MUST)\b/);
        const priority: 'must' | 'should' | 'could' =
          (pWord?.[1]?.toLowerCase() === 'shall' || pWord?.[1]?.toLowerCase() === 'must') ? 'must' : 'should';
        reqIdx++;
        requirements.push({
          id: `${docId}-REQ-${String(reqIdx).padStart(3, '0')}`,
          title: `${currentHeading || 'Requirement'} #${reqIdx}`,
          description: text.replace(/^.*?(shall|should|must|SHALL|SHOULD|MUST)\s*/i, '').replace(/\.$/, ''),
          priority,
          status: 'pending',
        });
      }
    }
  }

  return requirements;
}

/** Map spec status from frontmatter */
function mapStatus(raw: string | undefined): SpecDocument['status'] {
  if (!raw) return 'draft';
  const lower = raw.toLowerCase();
  if (lower.includes('approved') || lower.includes('active')) return 'approved';
  if (lower.includes('implemented') || lower.includes('deployed')) return 'implemented';
  return 'draft';
}

/* ──────────── File Existence Checks ──────────── */

/** Get all existing API route paths */
function getExistingAPIRoutes(): Set<string> {
  const routes = new Set<string>();
  if (!fs.existsSync(API_ROOT)) return routes;

  const files = findFilesRecursive(API_ROOT, 'route.ts');
  for (const file of files) {
    const rel = path.relative(API_ROOT, file);
    // Convert path/to/route.ts to /api/path/to
    const routePath = '/' + rel.replace(/\/route\.ts$/, '').replace(/\/\[.*?\]/g, '/:id');
    routes.add(routePath);
  }
  return routes;
}

/** Recursively find files by name */
function findFilesRecursive(dir: string, filename: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFilesRecursive(full, filename));
    } else if (entry.name === filename) {
      results.push(full);
    }
  }
  return results;
}

/** Get all existing Prisma model names */
function getExistingDBModels(): Set<string> {
  const models = new Set<string>();
  if (!fs.existsSync(SCHEMA_PATH)) return models;

  const content = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  const modelRegex = /^model\s+(\w+)/gm;
  let m: RegExpExecArray | null;
  while ((m = modelRegex.exec(content)) !== null) {
    models.add(m[1]);
  }
  return models;
}

/** Get all existing component names (filenames) */
function getExistingComponents(): Set<string> {
  const components = new Set<string>();
  if (!fs.existsSync(COMPONENTS_ROOT)) return components;

  const files = findFilesRecursive(COMPONENTS_ROOT, '.tsx');
  for (const file of files) {
    const name = path.basename(file, '.tsx');
    components.add(name.toLowerCase());
  }
  return components;
}

/* ──────────── Core Functions ──────────── */

/**
 * Scans all .md spec files and returns structured SpecDocument[]
 */
export async function scanSpecs(): Promise<SpecDocument[]> {
  const mdFiles = findMarkdownFiles(SPEC_ROOT);
  const specs: SpecDocument[] = [];

  for (const filePath of mdFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const docId = extractDocId(frontmatter, content);
    const title = frontmatter.title || path.basename(filePath, '.md');
    const category = deriveCategory(filePath);
    const feature = deriveFeature(filePath);
    const status = mapStatus(frontmatter.status);

    const apiEndpoints = parseAPIEndpoints(content);
    const databaseModels = parseDBModels(content);
    const requirements = parseRequirements(docId, content);

    specs.push({
      id: docId,
      title,
      category,
      feature,
      path: filePath,
      status,
      requirements,
      apiEndpoints,
      databaseModels,
      lastAnalyzed: new Date(),
    });
  }

  return specs;
}

/**
 * Analyzes spec coverage against current implementation.
 * Checks APIs, DB models, and features.
 */
export async function analyzeSpecCoverage(): Promise<SpecCoverageReport> {
  const specs = await scanSpecs();
  const existingRoutes = getExistingAPIRoutes();
  const existingModels = getExistingDBModels();
  const existingComponents = getExistingComponents();

  let apiTotal = 0;
  let apiImplemented = 0;
  const apiMissing: string[] = [];

  let dbTotal = 0;
  let dbImplemented = 0;
  const dbMissing: string[] = [];

  let featureTotal = 0;
  let featureImplemented = 0;
  let featurePartial = 0;
  let featurePending = 0;

  const upgradeTasks: UpgradeTaskSummary[] = [];

  // Deduplicate API endpoints across all specs
  const seenAPI = new Set<string>();
  const seenModels = new Set<string>();
  const seenFeatures = new Set<string>();

  for (const spec of specs) {
    // API coverage
    for (const api of spec.apiEndpoints) {
      const key = `${api.method} ${api.path}`;
      if (seenAPI.has(key)) continue;
      seenAPI.add(key);

      apiTotal++;
      // Normalize the spec path to match our route format
      const normalizedPath = api.path
        .replace(/^\/api\/v\d+/, '/api')  // /api/v1/auth/login -> /api/auth/login
        .replace(/\/$/, '');
      // Check if any existing route matches (fuzzy: contains the path segments)
      const isImplemented = Array.from(existingRoutes).some(route => {
        const routeNorm = route.replace(/\/$/, '');
        // Exact match or route contains the spec path
        if (routeNorm === normalizedPath) return true;
        // Check if the last segments match (e.g., /api/auth matches /api/auth/login)
        if (normalizedPath.includes(routeNorm)) return true;
        return false;
      });

      if (isImplemented) {
        apiImplemented++;
      } else {
        apiMissing.push(`${api.method} ${api.path}`);
        upgradeTasks.push({
          id: `task-api-${apiTotal}`,
          specId: spec.id,
          title: `Implement ${api.method} ${api.path}`,
          category: 'api',
          priority: 'high',
          action: `Create API route for ${api.method} ${api.path}: ${api.description}`,
          riskClass: 'R2',
        });
      }
    }

    // DB model coverage
    for (const model of spec.databaseModels) {
      if (seenModels.has(model.name)) continue;
      seenModels.add(model.name);

      dbTotal++;
      // Fuzzy match: check if any existing model name contains or is contained by spec model
      const isImplemented = Array.from(existingModels).some(m =>
        m.toLowerCase() === model.name.toLowerCase() ||
        m.toLowerCase().replace(/_/g, '').includes(model.name.toLowerCase().replace(/\s+/g, ''))
      );

      if (isImplemented) {
        dbImplemented++;
      } else {
        dbMissing.push(model.name);
        upgradeTasks.push({
          id: `task-db-${dbTotal}`,
          specId: spec.id,
          title: `Implement database model: ${model.name}`,
          category: 'database',
          priority: 'high',
          action: `Create Prisma model ${model.name} with fields: ${model.fields.join(', ') || 'TBD'}`,
          riskClass: 'R3',
        });
      }
    }

    // Feature coverage (based on requirements)
    const featureKey = `${spec.category}:${spec.feature}`;
    if (!seenFeatures.has(featureKey) && spec.requirements.length > 0) {
      seenFeatures.add(featureKey);
      featureTotal++;

      const hasReqs = spec.requirements.length > 0;
      if (!hasReqs) {
        featurePending++;
      } else {
        // Check if any related files exist
        const featureName = spec.feature;
        const hasAPI = Array.from(existingRoutes).some(r => r.includes(featureName.replace(/-/g, '/')));
        const hasModels = Array.from(existingModels).some(m =>
          m.toLowerCase().includes(featureName.split('-')[0])
        );

        if (hasAPI && hasModels) {
          featureImplemented++;
        } else if (hasAPI || hasModels) {
          featurePartial++;
        } else {
          featurePending++;
        }
      }
    }
  }

  const apiPct = apiTotal > 0 ? Math.round((apiImplemented / apiTotal) * 100) : 100;
  const dbPct = dbTotal > 0 ? Math.round((dbImplemented / dbTotal) * 100) : 100;
  const featurePct = featureTotal > 0 ? Math.round((featureImplemented / featureTotal) * 100) : 100;

  // Overall readiness = weighted average
  const overallReadiness = Math.round(
    apiPct * 0.35 + dbPct * 0.35 + featurePct * 0.30
  );

  return {
    totalSpecs: specs.length,
    analyzedAt: new Date(),
    apiCoverage: {
      total: apiTotal,
      implemented: apiImplemented,
      percentage: apiPct,
      missing: apiMissing,
    },
    dbCoverage: {
      total: dbTotal,
      implemented: dbImplemented,
      percentage: dbPct,
      missing: dbMissing,
    },
    featureCoverage: {
      total: featureTotal,
      implemented: featureImplemented,
      partial: featurePartial,
      pending: featurePending,
    },
    upgradeTasks,
    overallReadiness,
  };
}

/**
 * Generate concrete upgrade tasks for a given spec document's unimplemented requirements.
 */
export function generateUpgradeTasks(
  specDoc: SpecDocument,
  existingRoutes?: Set<string>,
  existingModels?: Set<string>,
): UpgradeTaskSummary[] {
  const routes = existingRoutes || getExistingAPIRoutes();
  const models = existingModels || getExistingDBModels();
  const tasks: UpgradeTaskSummary[] = [];
  let taskIdx = 0;

  // API tasks
  for (const api of specDoc.apiEndpoints) {
    const normalizedPath = api.path
      .replace(/^\/api\/v\d+/, '/api')
      .replace(/\/$/, '');
    const exists = Array.from(routes).some(route => {
      const r = route.replace(/\/$/, '');
      return r === normalizedPath || normalizedPath.includes(r);
    });

    if (!exists) {
      taskIdx++;
      tasks.push({
        id: `${specDoc.id}-API-${String(taskIdx).padStart(3, '0')}`,
        specId: specDoc.id,
        title: `Implement ${api.method} ${api.path}`,
        category: 'api',
        priority: 'high',
        action: `Create API route for ${api.method} ${api.path}: ${api.description}`,
        riskClass: 'R2',
      });
    }
  }

  // Database tasks
  for (const model of specDoc.databaseModels) {
    const exists = Array.from(models).some(m =>
      m.toLowerCase() === model.name.toLowerCase() ||
      m.toLowerCase().replace(/_/g, '').includes(model.name.toLowerCase().replace(/\s+/g, ''))
    );

    if (!exists) {
      taskIdx++;
      tasks.push({
        id: `${specDoc.id}-DB-${String(taskIdx).padStart(3, '0')}`,
        specId: specDoc.id,
        title: `Implement database model: ${model.name}`,
        category: 'database',
        priority: 'high',
        action: `Create Prisma model ${model.name} with fields: ${model.fields.join(', ') || 'TBD'}`,
        riskClass: 'R3',
      });
    }
  }

  // Requirement tasks (for 'must' priority requirements)
  for (const req of specDoc.requirements) {
    if (req.priority === 'must' && req.status === 'pending') {
      taskIdx++;
      const category = guessCategory(req.description);
      tasks.push({
        id: `${specDoc.id}-REQ-${String(taskIdx).padStart(3, '0')}`,
        specId: specDoc.id,
        title: req.title,
        category,
        priority: 'critical',
        action: `Implement requirement: ${req.description}`,
        riskClass: category === 'config' ? 'R1' : 'R2',
      });
    }
  }

  return tasks;
}

/** Guess task category from description text */
function guessCategory(desc: string): 'api' | 'database' | 'ui' | 'auth' | 'agent' | 'config' {
  const lower = desc.toLowerCase();
  if (lower.includes('api') || lower.includes('endpoint') || lower.includes('route')) return 'api';
  if (lower.includes('database') || lower.includes('model') || lower.includes('table') || lower.includes('schema')) return 'database';
  if (lower.includes('ui') || lower.includes('screen') || lower.includes('page') || lower.includes('component')) return 'ui';
  if (lower.includes('auth') || lower.includes('login') || lower.includes('session') || lower.includes('token')) return 'auth';
  if (lower.includes('agent') || lower.includes('ai') || lower.includes('workflow')) return 'agent';
  return 'config';
}
