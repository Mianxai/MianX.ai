/**
 * Deterministic, collision-safe Chrome CDP harness for the MianX browser
 * verification scripts.
 *
 * Every resource this module creates is owned and tracked by the run that
 * created it: Chrome is launched with `--remote-debugging-port=0` into a fresh
 * `mkdtemp` profile, the real CDP port and browser WebSocket path are read back
 * from Chrome's own `DevToolsActivePort` file, and application servers get a
 * separately allocated port. Nothing here ever touches a process, port or
 * directory it did not create.
 *
 * Node built-ins only — no new dependencies.
 */

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createServer as createSocketServer } from "node:net";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve, sep } from "node:path";
import { randomUUID } from "node:crypto";

export const TEMP_PREFIX = "mianx-harness-";
const DEFAULT_TAIL_LINES = 20;

/* ------------------------------------------------------------------ *
 * Small utilities
 * ------------------------------------------------------------------ */

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function createRunId() {
  return `${Date.now().toString(36)}-${randomUUID().slice(0, 8)}`;
}

/**
 * Redacts anything that looks like a credential before it reaches a log line.
 * Diagnostics are printed on failure, so this runs on every emitted string.
 */
export function redact(input) {
  if (input == null) return "";
  let text = String(input);
  const patterns = [
    /(set-cookie|cookie)\s*[:=]\s*[^\n]*/gi,
    /(authorization|proxy-authorization)\s*[:=]\s*[^\n]*/gi,
    /\b(sb-access-token|sb-refresh-token|csrf[-_]?token)\b\s*[:=]\s*\S+/gi,
    /\b([A-Za-z0-9_]*(?:api[-_]?key|secret|password|passwd|token|bearer))\b\s*[:=]\s*\S+/gi,
    /\bsk-[A-Za-z0-9_-]{8,}/g,
    /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{5,}/g,
  ];
  for (const pattern of patterns) {
    text = text.replace(pattern, (match) => {
      const label = match.split(/[:=]/)[0];
      return /^(sk-|eyJ)/.test(match) ? "[REDACTED]" : `${label}=[REDACTED]`;
    });
  }
  return text;
}

/** Bounded ring buffer used for stdout/stderr tails in diagnostics. */
export class LineTail {
  constructor(limit = DEFAULT_TAIL_LINES) {
    this.limit = limit;
    this.lines = [];
    this.partial = "";
  }

  push(chunk) {
    this.partial += String(chunk);
    const parts = this.partial.split(/\r?\n/);
    this.partial = parts.pop() ?? "";
    for (const line of parts) {
      if (!line.trim()) continue;
      this.lines.push(redact(line));
      if (this.lines.length > this.limit) this.lines.shift();
    }
  }

  toArray() {
    const out = [...this.lines];
    if (this.partial.trim()) out.push(redact(this.partial));
    return out.slice(-this.limit);
  }
}

/** Allocates a free TCP port by binding to 0 and reading it back. */
export function getFreePort(host = "127.0.0.1") {
  return new Promise((resolvePort, reject) => {
    const server = createSocketServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, host, () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

/** fetch() with a hard deadline — an accepting-but-silent socket must not hang. */
export async function fetchWithTimeout(url, { timeoutMs = 2000, ...init } = {}) {
  return fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * Polls `probe` until it resolves truthy or the deadline passes.
 * `isAlive` lets a dead child process abort the wait immediately instead of
 * burning the whole timeout.
 */
export async function waitFor(
  probe,
  { timeoutMs = 20000, intervalMs = 100, label = "condition", isAlive } = {}
) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    if (isAlive && !isAlive()) {
      throw new Error(
        `${label}: owned process exited before becoming ready` +
          (lastError ? ` (last error: ${redact(lastError.message)})` : "")
      );
    }
    try {
      const value = await probe();
      if (value) return value;
    } catch (error) {
      lastError = error;
    }
    await sleep(intervalMs);
  }
  throw new TimeoutError(
    `Timed out after ${timeoutMs}ms waiting for ${label}` +
      (lastError ? ` (last error: ${redact(lastError.message)})` : "")
  );
}

/**
 * Parses Chrome's DevToolsActivePort file.
 * Line 1 is the port actually bound; line 2 is the browser WebSocket path.
 */
export function parseDevToolsActivePort(contents) {
  const [portLine, pathLine] = String(contents).split(/\r?\n/);
  const port = Number((portLine || "").trim());
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Malformed DevToolsActivePort port line: ${JSON.stringify(portLine)}`);
  }
  const wsPath = (pathLine || "").trim();
  if (!wsPath.startsWith("/devtools/")) {
    throw new Error(`Malformed DevToolsActivePort websocket path: ${JSON.stringify(pathLine)}`);
  }
  return { port, wsPath };
}

/* ------------------------------------------------------------------ *
 * Temp profile safety
 * ------------------------------------------------------------------ */

/**
 * A directory may only be removed by the harness when it is a `mkdtemp`
 * directory this run created directly under the OS temp dir with our prefix.
 */
export async function assertRemovableTempDir(dir) {
  if (typeof dir !== "string" || !dir.trim()) {
    throw new Error("Refusing to remove an empty temp directory path");
  }
  const target = resolve(dir);
  const root = resolve(await realpath(tmpdir()));
  const realTarget = existsSync(target) ? resolve(await realpath(target)) : target;
  if (!realTarget.startsWith(root + sep)) {
    throw new Error(`Refusing to remove ${target}: outside ${root}`);
  }
  if (!basename(target).startsWith(TEMP_PREFIX)) {
    throw new Error(`Refusing to remove ${target}: missing ${TEMP_PREFIX} prefix`);
  }
  if (realTarget === root) {
    throw new Error("Refusing to remove the OS temp root");
  }
  return target;
}

/* ------------------------------------------------------------------ *
 * Chrome discovery
 * ------------------------------------------------------------------ */

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
];

export function findChromePath() {
  if (process.env.CHROME_PATH) {
    return existsSync(process.env.CHROME_PATH) ? process.env.CHROME_PATH : null;
  }
  return CHROME_CANDIDATES.find((candidate) => existsSync(candidate)) ?? null;
}

export function resolveChromePath() {
  const found = findChromePath();
  if (!found) {
    throw new Error(
      "Chrome binary not found. Set CHROME_PATH to a Chrome/Chromium executable."
    );
  }
  return found;
}

/* ------------------------------------------------------------------ *
 * CDP client (browser endpoint + flat sessions)
 * ------------------------------------------------------------------ */

export class CdpClient {
  constructor(wsUrl, { timeoutMs = 30000 } = {}) {
    this.wsUrl = wsUrl;
    this.timeoutMs = timeoutMs;
    this.ws = null;
    this.nextId = 0;
    this.pending = new Map();
    this.sessions = new Map();
    this.closed = false;
  }

  async connect({ timeoutMs = 15000 } = {}) {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.addEventListener("message", (event) => this.#onMessage(event));
    this.ws.addEventListener("close", () => this.#rejectAll(new Error("CDP socket closed")));
    await new Promise((resolveOpen, reject) => {
      const timer = setTimeout(
        () => reject(new TimeoutError(`Timed out after ${timeoutMs}ms opening CDP socket`)),
        timeoutMs
      );
      this.ws.addEventListener(
        "open",
        () => {
          clearTimeout(timer);
          resolveOpen();
        },
        { once: true }
      );
      this.ws.addEventListener(
        "error",
        () => {
          clearTimeout(timer);
          reject(new Error(`Failed to open CDP socket at ${this.wsUrl}`));
        },
        { once: true }
      );
    });
    return this;
  }

  #onMessage(event) {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    if (message.sessionId && !message.id) {
      this.sessions.get(message.sessionId)?.handleEvent(message);
    }
    if (!message.id) return;
    const pending = this.pending.get(message.id);
    if (!pending) return;
    this.pending.delete(message.id);
    clearTimeout(pending.timer);
    if (message.error) pending.reject(new Error(message.error.message));
    else pending.resolve(message.result);
  }

  #rejectAll(error) {
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }

  send(method, params = {}, sessionId) {
    if (this.closed) return Promise.reject(new Error("CDP client is closed"));
    const id = ++this.nextId;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolveSend, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new TimeoutError(`Timed out after ${this.timeoutMs}ms on CDP ${method}`));
      }, this.timeoutMs);
      this.pending.set(id, { resolve: resolveSend, reject, timer });
      try {
        this.ws.send(JSON.stringify(payload));
      } catch (error) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(error);
      }
    });
  }

  /** Opens a new tab and returns a page-scoped session with Page+Runtime on. */
  async newPage(url = "about:blank") {
    const { targetId } = await this.send("Target.createTarget", { url });
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const page = new CdpPage(this, sessionId, targetId);
    this.sessions.set(sessionId, page);
    await page.send("Page.enable");
    await page.send("Runtime.enable");
    return page;
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.#rejectAll(new Error("CDP client closed"));
    try {
      this.ws?.close();
    } catch {
      /* socket already gone */
    }
  }
}

export class CdpPage {
  constructor(client, sessionId, targetId) {
    this.client = client;
    this.sessionId = sessionId;
    this.targetId = targetId;
    this.consoleErrors = [];
  }

  handleEvent(message) {
    if (message.method === "Runtime.consoleAPICalled" && message.params?.type === "error") {
      this.consoleErrors.push(
        (message.params.args || []).map((a) => a.value ?? a.description).join(" ")
      );
    }
    if (message.method === "Runtime.exceptionThrown") {
      const details = message.params?.exceptionDetails;
      this.consoleErrors.push(`EXC: ${details?.exception?.description || details?.text}`);
    }
  }

  send(method, params = {}) {
    return this.client.send(method, params, this.sessionId);
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails) {
      throw new Error(
        redact(result.exceptionDetails.text || "Browser evaluation failed")
      );
    }
    return result.result?.value;
  }

  /** Navigate and wait for the document to finish loading (no fixed sleeps). */
  async navigate(url, { timeoutMs = 20000 } = {}) {
    await this.send("Page.navigate", { url });
    await waitFor(
      async () => (await this.evaluate("document.readyState")) === "complete",
      { timeoutMs, intervalMs: 50, label: `page load ${url}` }
    );
    await this.evaluate("document.fonts ? document.fonts.ready.then(() => true) : true");
    // One paint boundary so post-load layout/measure work is committed.
    await this.evaluate(
      "new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))"
    );
  }
}

/* ------------------------------------------------------------------ *
 * Harness — owns every process, port, socket and directory of one run
 * ------------------------------------------------------------------ */

export class Harness {
  constructor({ name = "browser-verify", runId = createRunId() } = {}) {
    this.name = name;
    this.runId = runId;
    this.ownedChildren = new Map(); // pid -> record
    this.tempDirs = new Set();
    this.cleanups = [];
    this.appPort = null;
    this.cdpPort = null;
    this.artifactDir = null;
    this.failedCommand = null;
    this.assertionLabel = null;
    this.cleanedUp = false;
  }

  onCleanup(fn) {
    this.cleanups.push(fn);
  }

  ownsPid(pid) {
    return this.ownedChildren.has(pid);
  }

  /** Spawns a child in its own process group and records ownership. */
  spawnOwned(command, args, options = {}) {
    const child = spawn(command, args, {
      ...options,
      detached: true,
      stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
    });
    const record = {
      child,
      pid: child.pid,
      command: `${command} ${args.join(" ")}`,
      stdout: new LineTail(),
      stderr: new LineTail(),
      exited: false,
    };
    child.stdout?.on("data", (d) => record.stdout.push(d));
    child.stderr?.on("data", (d) => record.stderr.push(d));
    child.once("exit", () => {
      record.exited = true;
    });
    child.on("error", (error) => {
      record.exited = true;
      record.spawnError = error;
    });
    this.ownedChildren.set(child.pid, record);
    return record;
  }

  isAlive(record) {
    return !record.exited && record.child.exitCode === null && record.child.signalCode === null;
  }

  /**
   * Terminates a process this run created — and refuses anything else.
   * SIGTERM to the owned process group first, SIGKILL only after the grace
   * period, so we never signal a PID we do not own.
   */
  async terminateOwned(record, { graceMs = 4000 } = {}) {
    if (!record || !this.ownedChildren.has(record.pid)) {
      throw new Error(
        `Refusing to signal pid ${record?.pid ?? "unknown"}: not owned by run ${this.runId}`
      );
    }
    if (!this.isAlive(record)) {
      this.ownedChildren.delete(record.pid);
      return;
    }
    const exited = new Promise((r) => record.child.once("exit", r));
    this.#signalGroup(record, "SIGTERM");
    const killer = setTimeout(() => this.#signalGroup(record, "SIGKILL"), graceMs);
    await exited;
    clearTimeout(killer);
    this.ownedChildren.delete(record.pid);
  }

  #signalGroup(record, signal) {
    try {
      process.kill(-record.pid, signal);
    } catch (error) {
      if (error.code === "ESRCH") return;
      try {
        record.child.kill(signal);
      } catch {
        /* already gone */
      }
    }
  }

  async makeTempDir(suffix = "") {
    const dir = await mkdtemp(resolve(tmpdir(), `${TEMP_PREFIX}${suffix}`));
    this.tempDirs.add(dir);
    return dir;
  }

  /** Artifact directory, preserved on failure so evidence survives cleanup. */
  async ensureArtifactDir() {
    if (this.artifactDir) return this.artifactDir;
    this.artifactDir = resolve(tmpdir(), `mianx-artifacts-${this.name}-${this.runId}`);
    await mkdir(this.artifactDir, { recursive: true });
    return this.artifactDir;
  }

  /* -------------------- servers -------------------- */

  /** Static fixture server on an OS-allocated port — cannot collide. */
  async serveFixture(html) {
    const server = createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
    await new Promise((ready, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", ready);
    });
    const { port } = server.address();
    this.appPort = port;
    this.onCleanup(
      () =>
        new Promise((done) => {
          server.close(() => done());
          server.closeAllConnections?.();
        })
    );
    return { port, url: `http://127.0.0.1:${port}/`, server };
  }

  /**
   * Starts `next start` on its own dynamically allocated port and waits for
   * the server to actually answer before returning.
   */
  async startNextServer({ timeoutMs = 90000 } = {}) {
    if (!existsSync(resolve(process.cwd(), ".next"))) {
      throw new Error(
        "No .next production build found. Run `npm run build` before the browser verifiers."
      );
    }
    const port = await getFreePort();
    this.appPort = port;
    const record = this.spawnOwned(
      process.execPath,
      [resolve(process.cwd(), "node_modules/next/dist/bin/next"), "start", "-p", String(port)],
      { cwd: process.cwd(), env: { ...process.env, PORT: String(port) } }
    );
    this.onCleanup(() => this.terminateOwned(record));
    const baseUrl = `http://127.0.0.1:${port}`;
    await waitFor(
      async () => {
        const response = await fetchWithTimeout(baseUrl + "/", { timeoutMs: 2000 });
        return response.status < 500;
      },
      {
        timeoutMs,
        intervalMs: 250,
        label: `next server ${baseUrl}`,
        isAlive: () => this.isAlive(record),
      }
    );
    return { port, baseUrl, record };
  }

  /* -------------------- chrome -------------------- */

  /**
   * Launches Chrome headless with `--remote-debugging-port=0` into a fresh
   * profile, then reads the real port + browser WS path from DevToolsActivePort.
   * Retries on transient launch failures (common under parallel Vitest load).
   */
  async launchChrome({ timeoutMs = 45000, extraArgs = [], attempts = 3 } = {}) {
    const chromePath = resolveChromePath();
    let lastError = null;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      const profileDir = await this.makeTempDir("chrome-");
      const record = this.spawnOwned(
        chromePath,
        [
          "--remote-debugging-port=0",
          `--user-data-dir=${profileDir}`,
          "--headless=new",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-background-networking",
          "--disable-renderer-backgrounding",
          "--no-first-run",
          "--no-default-browser-check",
          "--no-sandbox",
          ...extraArgs,
          "about:blank",
        ],
        { cwd: process.cwd() }
      );
      this.onCleanup(() => this.terminateOwned(record));

      const portFile = resolve(profileDir, "DevToolsActivePort");
      try {
        const { port, wsPath } = await waitFor(
          async () => {
            try {
              const contents = await readFile(portFile, "utf8");
              if (!contents.includes("\n")) return null;
              return parseDevToolsActivePort(contents);
            } catch (err) {
              if (err && err.code === "ENOENT") return null;
              throw err;
            }
          },
          {
            timeoutMs: Math.max(8000, Math.floor(timeoutMs / attempts)),
            intervalMs: 75,
            label: "Chrome DevToolsActivePort",
            isAlive: () => this.isAlive(record),
          }
        );
        if (this.appPort != null && this.appPort === port) {
          throw new Error(`CDP port ${port} collided with application port ${this.appPort}`);
        }

        const client = new CdpClient(`ws://127.0.0.1:${port}${wsPath}`);
        this.onCleanup(() => client.close());
        await client.connect({ timeoutMs: Math.min(timeoutMs, 15000) });
        this.cdpPort = port;
        return { client, port, wsPath, profileDir, record, chromePath, attempt };
      } catch (err) {
        lastError = err;
        try {
          await this.terminateOwned(record, { graceMs: 1000 });
        } catch {
          /* best-effort */
        }
        if (attempt < attempts) {
          await new Promise((r) => setTimeout(r, 250 * attempt));
          continue;
        }
      }
    }

    throw lastError || new Error("Chrome launch failed");
  }

  /* -------------------- diagnostics + cleanup -------------------- */

  diagnostics(error) {
    const lines = [
      "",
      "──────────── MianX browser harness failure ────────────",
      `verifier:      ${this.name}`,
      `run id:        ${this.runId}`,
      `application:   ${this.appPort ?? "n/a"}`,
      `cdp port:      ${this.cdpPort ?? "not discovered"}`,
      `assertion:     ${this.assertionLabel ?? "n/a"}`,
      `command:       ${redact(this.failedCommand ?? "n/a")}`,
      `artifacts:     ${this.artifactDir ?? "none (no artifacts produced)"}`,
      `error:         ${redact(error?.message ?? String(error))}`,
    ];
    for (const record of this.ownedChildren.values()) {
      const out = record.stdout.toArray();
      const err = record.stderr.toArray();
      if (!out.length && !err.length) continue;
      lines.push(`child:         ${redact(record.command)} (pid ${record.pid})`);
      for (const line of out) lines.push(`  stdout | ${line}`);
      for (const line of err) lines.push(`  stderr | ${line}`);
    }
    lines.push("───────────────────────────────────────────────────────", "");
    return lines.join("\n");
  }

  /**
   * Runs every registered cleanup, terminates leftover owned processes and
   * removes only the temp directories created by this run. Cleanup failures
   * are collected and surfaced — they never pass silently.
   */
  async cleanup({ preserveArtifacts = false } = {}) {
    if (this.cleanedUp) return [];
    this.cleanedUp = true;
    const failures = [];
    for (const fn of this.cleanups.reverse()) {
      try {
        await fn();
      } catch (error) {
        failures.push(error);
      }
    }
    for (const record of [...this.ownedChildren.values()]) {
      try {
        await this.terminateOwned(record);
      } catch (error) {
        failures.push(error);
      }
    }
    for (const dir of this.tempDirs) {
      try {
        const safe = await assertRemovableTempDir(dir);
        await rm(safe, { recursive: true, force: true });
        this.tempDirs.delete(dir);
      } catch (error) {
        failures.push(error);
      }
    }
    if (!preserveArtifacts && this.artifactDir) {
      // Artifacts on a passing run are still useful; they live under tmp and
      // are intentionally left in place rather than deleted.
    }
    return failures;
  }
}

/* ------------------------------------------------------------------ *
 * Top-level runner
 * ------------------------------------------------------------------ */

/**
 * Wraps a verifier body with signal handling, bounded cleanup and honest exit
 * codes. Any thrown error, failed assertion or cleanup failure exits non-zero.
 */
export async function runVerifier(name, body, { runId = createRunId() } = {}) {
  const harness = new Harness({ name, runId });
  let signalCleanup = null;
  const onFatal = (reason) => {
    if (signalCleanup) return;
    signalCleanup = (async () => {
      process.exitCode = 1;
      console.error(`\n[${name}] aborting: ${redact(reason)}`);
      try {
        await harness.cleanup({ preserveArtifacts: true });
      } finally {
        process.exit(1);
      }
    })();
  };
  const onSigint = () => onFatal("received SIGINT");
  const onSigterm = () => onFatal("received SIGTERM");
  const onUncaught = (error) => onFatal(`uncaught exception: ${error?.stack || error}`);
  const onUnhandled = (error) => onFatal(`unhandled rejection: ${error?.stack || error}`);

  process.on("SIGINT", onSigint);
  process.on("SIGTERM", onSigterm);
  process.on("uncaughtException", onUncaught);
  process.on("unhandledRejection", onUnhandled);

  let failed = false;
  try {
    console.log(`[${name}] run ${runId}`);
    await body(harness);
    if (process.exitCode) failed = true;
  } catch (error) {
    failed = true;
    console.error(harness.diagnostics(error));
    if (error?.stack) console.error(redact(error.stack));
    process.exitCode = 1;
  } finally {
    const failures = await harness.cleanup({ preserveArtifacts: failed });
    if (failures.length) {
      for (const failure of failures) {
        console.error(`[${name}] cleanup failure: ${redact(failure.message)}`);
      }
      process.exitCode = 1;
    }
    process.off("SIGINT", onSigint);
    process.off("SIGTERM", onSigterm);
    process.off("uncaughtException", onUncaught);
    process.off("unhandledRejection", onUnhandled);
  }
  return harness;
}
