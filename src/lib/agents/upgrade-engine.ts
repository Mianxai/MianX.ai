// ═══════════════════════════════════════════════════════════════
//  MianX.ai — Upgrade Engine
//  Manages upgrade sessions, task execution, and audit trails
//  Operates within Constitutional authority bounds (R0-R4)
// ═══════════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { scanSpecs, analyzeSpecCoverage, generateUpgradeTasks, type SpecDocument, type UpgradeTaskSummary } from './spec-reader';
import { AGENT_REGISTRY } from './engine';
import * as fs from 'fs';
import * as path from 'path';

/* ──────────── Types ──────────── */

export interface UpgradeTask {
  id: string;
  specId: string;
  title: string;
  description: string;
  category: 'api' | 'database' | 'ui' | 'auth' | 'agent' | 'config';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'planned' | 'in-progress' | 'completed' | 'failed' | 'blocked';
  riskClass: 'R0' | 'R1' | 'R2' | 'R3' | 'R4';
  action: string;
  targetFile?: string;
  dependencies: string[];
  progress: number;
  result?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface UpgradeSession {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'running' | 'completed' | 'failed' | 'paused';
  specId: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  tasks: UpgradeTask[];
}

export interface SpecCoverageReport {
  totalSpecs: number;
  analyzedAt: Date;
  apiCoverage: { total: number; implemented: number; percentage: number; missing: string[] };
  dbCoverage: { total: number; implemented: number; percentage: number; missing: string[] };
  featureCoverage: { total: number; implemented: number; partial: number; pending: number };
  upgradeTasks: UpgradeTaskSummary[];
  overallReadiness: number;
}

/* ──────────── In-Memory Session Store ──────────── */

const sessions = new Map<string, UpgradeSession>();

/* ──────────── Helpers ──────────── */

function generateSessionId(): string {
  return `upsess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function generateTaskId(specId: string, idx: number): string {
  return `${specId}-T${String(idx).padStart(3, '0')}`;
}

/** Log an agent activity to the database for audit trail */
async function logActivity(
  agent: string,
  action: string,
  status: string,
  metadata?: any,
) {
  try {
    await db.agentActivity.create({
      data: {
        agent,
        action,
        status: status as 'success' | 'error' | 'info' | 'warning',
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch {
    // Non-blocking — audit logging failure should not break the upgrade flow
  }
}

/** Determine risk class for a task category */
function assignRiskClass(task: UpgradeTaskSummary): UpgradeTask['riskClass'] {
  // R0 = read-only, R1 = reversible, R2+ = requires approval
  if (task.category === 'config' && task.priority === 'low') return 'R1';
  if (task.category === 'config') return 'R2';
  if (task.category === 'api') return 'R2';
  if (task.category === 'database') return 'R3';
  if (task.category === 'auth') return 'R4';
  if (task.category === 'ui') return 'R2';
  if (task.category === 'agent') return 'R3';
  return 'R2';
}

/** Convert a task summary to a full UpgradeTask */
function toUpgradeTask(summary: UpgradeTaskSummary, idx: number): UpgradeTask {
  const riskClass = summary.riskClass || assignRiskClass(summary);
  return {
    id: summary.id || generateTaskId(summary.specId, idx),
    specId: summary.specId,
    title: summary.title,
    description: summary.action,
    category: summary.category,
    priority: summary.priority,
    status: riskClass === 'R0' || riskClass === 'R1' ? 'planned' : 'blocked',
    riskClass,
    action: summary.action,
    targetFile: inferTargetFile(summary),
    dependencies: [],
    progress: 0,
    createdAt: new Date(),
  };
}

/** Infer the target file path for a task */
function inferTargetFile(task: UpgradeTaskSummary): string | undefined {
  if (task.category === 'api') {
    const pathMatch = task.action.match(/(\/api\/[^:\s]+)/);
    if (pathMatch) {
      const apiPath = pathMatch[1].replace(/^\/api\//, '');
      return `src/app/api/${apiPath}/route.ts`;
    }
  }
  if (task.category === 'database') {
    return 'prisma/schema.prisma';
  }
  return undefined;
}

/* ──────────── Core Functions ──────────── */

/**
 * Start a new upgrade session.
 * Scans specs, analyzes coverage, generates tasks for gaps.
 */
export async function startUpgradeSession(specId?: string): Promise<UpgradeSession> {
  const sessionId = generateSessionId();
  const targetSpecId = specId || 'ALL';

  await logActivity('self-upgrade', 'session-started', 'info', {
    sessionId,
    specId: targetSpecId,
  });

  // Scan specs and analyze coverage
  const coverage = await analyzeSpecCoverage();

  let allTasks: UpgradeTask[] = [];

  if (specId) {
    // Single spec mode: scan all, filter to specific
    const specs = await scanSpecs();
    const targetSpec = specs.find(s => s.id === specId);
    if (targetSpec) {
      const taskSummaries = generateUpgradeTasks(targetSpec);
      allTasks = taskSummaries.map((t, i) => toUpgradeTask(t, i));
    } else {
      await logActivity('self-upgrade', 'spec-not-found', 'warning', { specId });
    }
  } else {
    // Full scan mode
    allTasks = coverage.upgradeTasks.map((t, i) => toUpgradeTask(t, i));
  }

  // R0 tasks: classify read-only checks
  // Auto-assign R0 to analysis/check tasks (no file modification)
  allTasks.forEach(task => {
    if (task.category === 'config' && task.action.includes('check')) {
      task.riskClass = 'R0';
      task.status = 'planned';
    }
  });

  const session: UpgradeSession = {
    id: sessionId,
    startedAt: new Date(),
    status: 'running',
    specId: targetSpecId,
    totalTasks: allTasks.length,
    completedTasks: 0,
    failedTasks: 0,
    tasks: allTasks,
  };

  sessions.set(sessionId, session);

  await logActivity('self-upgrade', 'session-created', 'success', {
    sessionId,
    totalTasks: allTasks.length,
    blockedTasks: allTasks.filter(t => t.status === 'blocked').length,
  });

  return session;
}

/**
 * Execute a single upgrade task within a session.
 * R0/R1 tasks execute automatically (read-only/reversible).
 * R2+ tasks remain blocked (require approval per AI Constitution).
 */
export async function executeUpgradeTask(sessionId: string, taskId: string): Promise<UpgradeTask> {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error(`Upgrade session ${sessionId} not found`);
  }

  const task = session.tasks.find(t => t.id === taskId);
  if (!task) {
    throw new Error(`Task ${taskId} not found in session ${sessionId}`);
  }

  if (task.status === 'completed') {
    return task;
  }

  // Check dependencies
  for (const depId of task.dependencies) {
    const dep = session.tasks.find(t => t.id === depId);
    if (dep && dep.status !== 'completed') {
      task.status = 'blocked';
      task.error = `Dependency ${depId} not completed`;
      await logActivity('self-upgrade', 'task-blocked', 'warning', { taskId, reason: 'dependency' });
      return task;
    }
  }

  // Constitutional authority check
  if (task.riskClass === 'R2' || task.riskClass === 'R3' || task.riskClass === 'R4') {
    task.status = 'blocked';
    task.error = `Risk class ${task.riskClass} requires human approval per AI Constitution. Auto-execution not permitted.`;
    await logActivity('self-upgrade', 'task-blocked-constitution', 'warning', {
      taskId,
      riskClass: task.riskClass,
      reason: 'constitutional_authority_boundary',
    });
    return task;
  }

  task.status = 'in-progress';
  task.progress = 10;

  await logActivity('self-upgrade', 'task-started', 'info', {
    sessionId,
    taskId,
    riskClass: task.riskClass,
    category: task.category,
  });

  try {
    task.progress = 30;

    // Execute based on category and risk class
    const result = await executeTaskByCategory(task);

    task.result = result;
    task.progress = 100;
    task.status = 'completed';
    task.completedAt = new Date();

    session.completedTasks++;
    await logActivity('self-upgrade', 'task-completed', 'success', {
      sessionId,
      taskId,
      category: task.category,
    });

  } catch (error: any) {
    task.status = 'failed';
    task.error = error.message || 'Unknown execution error';
    task.completedAt = new Date();
    session.failedTasks++;

    await logActivity('self-upgrade', 'task-failed', 'error', {
      sessionId,
      taskId,
      error: task.error,
    });
  }

  // Update session status
  updateSessionStatus(session);

  return task;
}

/** Execute a task based on its category — READ ONLY, no modifications */
async function executeTaskByCategory(task: UpgradeTask): Promise<any> {
  const projectRoot = process.cwd();

  switch (task.category) {
    case 'api': {
      // R0/R1: Check if route file exists, report status
      const targetFile = task.targetFile
        ? path.resolve(projectRoot, task.targetFile)
        : null;

      if (targetFile && fs.existsSync(targetFile)) {
        return {
          check: 'route_exists',
          file: task.targetFile,
          exists: true,
          message: `API route already exists at ${task.targetFile}`,
        };
      }

      // Search for partial matches in the API directory
      const apiDir = path.resolve(projectRoot, 'src/app/api');
      const apiFiles = listFilesRecursive(apiDir);
      const matches = apiFiles.filter(f =>
        task.title.toLowerCase().includes(path.basename(path.dirname(f)).toLowerCase()) ||
        task.action.toLowerCase().split(' ').some(word => f.toLowerCase().includes(word))
      );

      return {
        check: 'route_not_found',
        file: task.targetFile,
        exists: false,
        partialMatches: matches.slice(0, 5),
        message: `API route not found at ${task.targetFile}. ${matches.length} partial matches found.`,
      };
    }

    case 'database': {
      // R0/R1: Check if model exists in schema
      const schemaPath = path.resolve(projectRoot, 'prisma/schema.prisma');
      const schemaContent = fs.existsSync(schemaPath)
        ? fs.readFileSync(schemaPath, 'utf-8')
        : '';

      const modelName = task.title.replace('Implement database model: ', '').trim();
      const modelRegex = new RegExp(`model\\s+${escapeRegex(modelName)}\\b`, 'i');
      const modelExists = modelRegex.test(schemaContent);

      if (modelExists) {
        return {
          check: 'model_exists',
          model: modelName,
          exists: true,
          message: `Database model '${modelName}' already exists in schema`,
        };
      }

      return {
        check: 'model_not_found',
        model: modelName,
        exists: false,
        message: `Database model '${modelName}' not found in schema. Requires R3 approval to create.`,
      };
    }

    case 'config': {
      // R0: Check if config file or value exists
      const configPaths = [
        'next.config.ts', 'next.config.js', 'next.config.mjs',
        '.env', '.env.local',
        'tailwind.config.ts', 'tailwind.config.js',
        'tsconfig.json',
      ];

      const found = configPaths.filter(p => fs.existsSync(path.resolve(projectRoot, p)));
      return {
        check: 'config_scan',
        existingConfigs: found,
        message: `Found ${found.length} config files in project root`,
      };
    }

    default: {
      return {
        check: 'analysis_only',
        category: task.category,
        message: `Read-only analysis completed for ${task.category} task. No modifications made.`,
      };
    }
  }
}

/** Update session status based on task completion */
function updateSessionStatus(session: UpgradeSession): void {
  const allDone = session.tasks.every(t =>
    t.status === 'completed' || t.status === 'failed' || t.status === 'blocked'
  );

  if (allDone) {
    session.status = session.failedTasks > 0 ? 'failed' : 'completed';
    session.completedAt = new Date();
  }

  // Also check if all non-blocked tasks are done
  const actionableTasks = session.tasks.filter(t => t.status !== 'blocked');
  const allActionableDone = actionableTasks.every(t =>
    t.status === 'completed' || t.status === 'failed'
  );

  if (allActionableDone && session.status === 'running') {
    const blockedCount = session.tasks.filter(t => t.status === 'blocked').length;
    if (blockedCount > 0) {
      session.status = 'paused';
      session.completedAt = new Date();
    }
  }
}

/** Get a specific upgrade session */
export function getUpgradeSession(sessionId: string): UpgradeSession | null {
  return sessions.get(sessionId) || null;
}

/** Get all active (running/paused) upgrade sessions */
export function getActiveUpgradeSessions(): UpgradeSession[] {
  return Array.from(sessions.values()).filter(
    s => s.status === 'running' || s.status === 'paused'
  );
}

/** Get all upgrade sessions (history) */
export function getUpgradeHistory(): UpgradeSession[] {
  return Array.from(sessions.values()).sort(
    (a, b) => b.startedAt.getTime() - a.startedAt.getTime()
  );
}

/** Pause a running session */
export function pauseSession(sessionId: string): UpgradeSession | null {
  const session = sessions.get(sessionId);
  if (!session || session.status !== 'running') return null;
  session.status = 'paused';
  return session;
}

/** Resume a paused session */
export function resumeSession(sessionId: string): UpgradeSession | null {
  const session = sessions.get(sessionId);
  if (!session || session.status !== 'paused') return null;
  session.status = 'running';
  session.completedAt = undefined;
  return session;
}

/** Auto-execute all R0/R1 tasks in a session */
export async function autoExecuteSafeTasks(sessionId: string): Promise<{
  executed: number;
  skipped: number;
  results: UpgradeTask[];
}> {
  const session = sessions.get(sessionId);
  if (!session) throw new Error(`Session ${sessionId} not found`);

  const safeTasks = session.tasks.filter(
    t => (t.riskClass === 'R0' || t.riskClass === 'R1') && t.status === 'planned'
  );

  const results: UpgradeTask[] = [];
  let executed = 0;
  let skipped = 0;

  await logActivity('self-upgrade', 'auto-execute-start', 'info', {
    sessionId,
    safeTaskCount: safeTasks.length,
  });

  for (const task of safeTasks) {
    try {
      const result = await executeUpgradeTask(sessionId, task.id);
      results.push(result);
      if (result.status === 'completed') executed++;
      else skipped++;
    } catch {
      skipped++;
    }
  }

  await logActivity('self-upgrade', 'auto-execute-complete', 'success', {
    sessionId,
    executed,
    skipped,
  });

  return { executed, skipped, results };
}

/* ──────────── Utility ──────────── */

function listFilesRecursive(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
