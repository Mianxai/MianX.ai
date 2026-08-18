// Controlled coding executor — patch-first, workspace-scoped, no network by default.
// Never pushes, merges, deploys, or reads production secrets.

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";
import { assertWritablePath, clipPathForAudit, isProtectedRelativePath } from "./paths";
import { assertAllowedCommand, commandForAudit } from "./commands";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

export const CODING_DEFAULTS = {
  maxExecutionMs: 60_000,
  maxOutputBytes: 256_000,
  maxFilesChanged: 40,
  maxFileBytes: 200_000,
  network: false,
};

/**
 * Apply a list of file edits inside a disposable workspace and optionally run
 * allowlisted verification commands. Returns a candidate patch summary.
 *
 * @param {object} args
 * @param {string} args.workspaceRoot absolute path to disposable workspace
 * @param {string} args.projectId
 * @param {string} args.taskId
 * @param {Array<{path:string, content:string, operation?:'write'|'create'}>} args.edits
 * @param {string[]} [args.allowedPathPrefixes]
 * @param {string[]} [args.authorizedProtectedPaths]
 * @param {Array<string|string[]>} [args.commands]
 * @param {object} [args.limits]
 * @param {boolean} [args.dryRun] if true, validate only — no writes
 */
export async function runCodingExecutor({
  workspaceRoot,
  projectId,
  taskId,
  agentId = "coding-executor",
  edits = [],
  allowedPathPrefixes = ["fixtures/", "src/", "lib/", "app/", "components/", "scripts/"],
  authorizedProtectedPaths = [],
  commands = [],
  limits = {},
  dryRun = false,
  spawnImpl = spawn,
  now = () => Date.now(),
}) {
  const started = now();
  const cfg = { ...CODING_DEFAULTS, ...limits };
  let root = path.resolve(workspaceRoot);
  try {
    if (fs.existsSync(root)) root = fs.realpathSync(root);
  } catch {
    /* keep resolved */
  }

  if (!projectId || !taskId) {
    throw validationError("Coding executor requires project and task scope.", {
      project_id: projectId ? undefined : "required",
      task_id: taskId ? undefined : "required",
    });
  }
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    throw validationError("Workspace root must be an existing directory.", {
      workspace: root,
    });
  }
  if (!Array.isArray(edits) || edits.length === 0) {
    throw validationError("At least one edit is required.", { edits: "required" });
  }
  if (edits.length > cfg.maxFilesChanged) {
    throw forbidden(`Too many file edits (max ${cfg.maxFilesChanged}).`);
  }

  const files_changed = [];
  const warnings = [];
  const audit_events = [];

  for (const edit of edits) {
    const content = typeof edit.content === "string" ? edit.content : "";
    if (Buffer.byteLength(content, "utf8") > cfg.maxFileBytes) {
      throw forbidden(`File content exceeds maxFileBytes for "${edit.path}".`);
    }
    const { absolute, relative } = assertWritablePath({
      workspaceRoot: root,
      requestedPath: edit.path,
      allowedPathPrefixes,
      authorizedProtectedPaths,
    });

    if (!dryRun) {
      fs.mkdirSync(path.dirname(absolute), { recursive: true });
      const before = fs.existsSync(absolute) ? fs.readFileSync(absolute, "utf8") : null;
      fs.writeFileSync(absolute, content, "utf8");
      files_changed.push({
        path: relative,
        operation: before === null ? "create" : "write",
        bytes: Buffer.byteLength(content, "utf8"),
        sha256: createHash("sha256").update(content, "utf8").digest("hex").slice(0, 16),
        protected: isProtectedRelativePath(relative),
      });
    } else {
      files_changed.push({
        path: relative,
        operation: "dry_run",
        bytes: Buffer.byteLength(content, "utf8"),
        protected: isProtectedRelativePath(relative),
      });
    }

    audit_events.push({
      type: "file_edit",
      path: clipPathForAudit(relative),
      project_id: projectId,
      task_id: taskId,
      agent_id: agentId,
    });
  }

  const commands_run = [];
  const test_results = [];

  for (const cmd of commands) {
    const { argv, kind } = assertAllowedCommand(cmd);
    if (dryRun) {
      commands_run.push({
        argv,
        kind,
        skipped: true,
        reason: "dry_run",
      });
      continue;
    }

    const result = await runBoundedCommand({
      argv,
      cwd: root,
      maxMs: cfg.maxExecutionMs,
      maxOutputBytes: cfg.maxOutputBytes,
      spawnImpl,
      env: buildSanitizedEnv(),
    });

    commands_run.push({
      argv,
      kind,
      exit_status: result.exitCode,
      duration_ms: result.durationMs,
      timed_out: result.timedOut,
      stdout_bytes: result.stdoutBytes,
      stderr_bytes: result.stderrBytes,
    });
    audit_events.push({
      type: "command",
      command: commandForAudit(argv),
      exit_status: result.exitCode,
      duration_ms: result.durationMs,
      project_id: projectId,
      task_id: taskId,
      agent_id: agentId,
    });

    test_results.push({
      command: commandForAudit(argv),
      passed: result.exitCode === 0 && !result.timedOut,
      exit_status: result.exitCode,
      timed_out: result.timedOut,
    });

    if (result.timedOut) {
      warnings.push(`Command timed out: ${commandForAudit(argv)}`);
    } else if (result.exitCode !== 0) {
      warnings.push(`Command failed (exit ${result.exitCode}): ${commandForAudit(argv)}`);
    }
    if (result.truncated) {
      warnings.push(`Command output truncated: ${commandForAudit(argv)}`);
    }
  }

  const patch = buildUnifiedDiffSummary(files_changed);
  const allCommandsPassed =
    test_results.length === 0 || test_results.every((t) => t.passed);

  const risk_class = files_changed.some((f) => f.protected)
    ? "R4"
    : warnings.length
      ? "R3"
      : "R2";

  return {
    workspace_root: root,
    project_id: projectId,
    task_id: taskId,
    agent_id: agentId,
    files_changed,
    patch_summary: patch,
    commands_run,
    test_results,
    warnings,
    risk_class,
    requires_human_review: true,
    repository_write_outside_workspace: false,
    network_enabled: false,
    pushed: false,
    merged: false,
    deployed: false,
    validation_passed: allCommandsPassed && warnings.every((w) => !w.includes("timed out")),
    duration_ms: now() - started,
    audit_events,
  };
}

function buildSanitizedEnv() {
  // Minimal env — no inherited secrets.
  return {
    PATH: process.env.PATH || "/usr/bin:/bin:/usr/local/bin",
    HOME: process.env.HOME || "/tmp",
    LANG: "C",
    NODE_ENV: "test",
    // Explicitly omit: ANTHROPIC_API_KEY, SUPABASE_*, tokens, etc.
  };
}

async function runBoundedCommand({
  argv,
  cwd,
  maxMs,
  maxOutputBytes,
  spawnImpl,
  env,
}) {
  const started = Date.now();
  return new Promise((resolve) => {
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let truncated = false;
    let timedOut = false;
    let settled = false;

    const child = spawnImpl(argv[0], argv.slice(1), {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        child.kill("SIGKILL");
      } catch {
        /* ignore */
      }
    }, maxMs);

    const onChunk = (stream) => (buf) => {
      const n = Buffer.byteLength(buf);
      if (stream === "out") stdoutBytes += n;
      else stderrBytes += n;
      if (stdoutBytes + stderrBytes > maxOutputBytes) {
        truncated = true;
        try {
          child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }
    };

    child.stdout?.on("data", onChunk("out"));
    child.stderr?.on("data", onChunk("err"));

    const finish = (exitCode) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        exitCode: timedOut ? 124 : exitCode ?? 1,
        durationMs: Date.now() - started,
        timedOut,
        truncated,
        stdoutBytes,
        stderrBytes,
      });
    };

    child.on("error", () => finish(127));
    child.on("close", (code) => finish(code));
  });
}

function buildUnifiedDiffSummary(files_changed) {
  return {
    format: "summary",
    files: files_changed.map((f) => ({
      path: f.path,
      operation: f.operation,
      sha256_prefix: f.sha256 || null,
    })),
    note: "Wave-3 returns a patch summary; full unified diffs are workspace-local.",
  };
}

/**
 * Deterministic fake executor for tests (no real spawn).
 */
export async function runFakeCodingExecutor(args) {
  return runCodingExecutor({
    ...args,
    spawnImpl: () => {
      const ee = new EventEmitter();
      ee.stdout = new EventEmitter();
      ee.stderr = new EventEmitter();
      ee.kill = () => {};
      setTimeout(() => {
        ee.stdout.emit("data", Buffer.from("ok"));
        ee.emit("close", 0);
      }, 0);
      return ee;
    },
  });
}
