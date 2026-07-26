/**
 * Regression tests for the deterministic browser verification harness.
 *
 * The pure-logic tests always run. The tests that need a real browser are
 * skipped (loudly, via the suite name) when no Chrome/Chromium binary is
 * available, rather than silently passing.
 */

import { afterAll, afterEach, describe, expect, it } from "vitest";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
  CdpClient,
  Harness,
  LineTail,
  TEMP_PREFIX,
  assertRemovableTempDir,
  createRunId,
  fetchWithTimeout,
  findChromePath,
  getFreePort,
  parseDevToolsActivePort,
  redact,
  runVerifier,
  waitFor,
} from "./lib/browser-harness.mjs";
import { runSequential } from "./verify-browser-harness.mjs";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const COLLISION_PORTS = [9333, 9334, 9335, 9336];
const chromePath = findChromePath();
const describeBrowser = chromePath ? describe : describe.skip;

/** Runs a verifier body without leaking its exit code into the test process. */
async function runVerifierIsolated(name, body) {
  const previous = process.exitCode;
  process.exitCode = 0;
  try {
    const harness = await runVerifier(name, body);
    return { harness, exitCode: process.exitCode ?? 0 };
  } finally {
    process.exitCode = previous;
  }
}

/** Occupies a port with a socket that accepts but never answers — the exact
 *  failure mode that used to hang the fixed-port verifiers forever. */
function occupyPort(port) {
  return new Promise((resolvePort) => {
    const sockets = new Set();
    const server = createServer((socket) => {
      // Accept and stay silent; keep the handle so close() can force it shut.
      sockets.add(socket);
      socket.on("close", () => sockets.delete(socket));
    });
    server.on("error", () => resolvePort({ port, bound: false, close: async () => {} }));
    server.listen(port, "127.0.0.1", () =>
      resolvePort({
        port,
        bound: true,
        close: () =>
          new Promise((done) => {
            for (const socket of sockets) socket.destroy();
            server.close(() => done());
          }),
      })
    );
  });
}

function isPidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function tempDirsWithPrefix() {
  const entries = await readdir(tmpdir());
  return entries.filter((entry) => entry.startsWith(TEMP_PREFIX));
}

/** Temp dirs created by the tests themselves, removed when the suite ends. */
const scratchDirs = [];
async function makeScratchDir(prefix) {
  const dir = await mkdtemp(join(tmpdir(), prefix));
  scratchDirs.push(dir);
  return dir;
}

afterEach(() => {
  process.exitCode = 0;
});

afterAll(async () => {
  for (const dir of scratchDirs) await rm(dir, { recursive: true, force: true });
});

/* ------------------------------------------------------------------ */

describe("DevToolsActivePort discovery", () => {
  it("parses the port and browser websocket path", () => {
    const parsed = parseDevToolsActivePort("54321\n/devtools/browser/abc-123\n");
    expect(parsed).toEqual({ port: 54321, wsPath: "/devtools/browser/abc-123" });
  });

  it("rejects a malformed port line", () => {
    expect(() => parseDevToolsActivePort("not-a-port\n/devtools/browser/x")).toThrow(
      /Malformed DevToolsActivePort port line/
    );
    expect(() => parseDevToolsActivePort("0\n/devtools/browser/x")).toThrow(
      /Malformed DevToolsActivePort port line/
    );
  });

  it("rejects a malformed websocket path", () => {
    expect(() => parseDevToolsActivePort("54321\n")).toThrow(
      /Malformed DevToolsActivePort websocket path/
    );
  });

  it("never assumes the legacy fixed ports", () => {
    for (const port of COLLISION_PORTS) {
      expect(parseDevToolsActivePort(`${port + 1000}\n/devtools/browser/x`).port).toBe(
        port + 1000
      );
    }
    const sources = [
      "scripts/verify-navbar-geometry.mjs",
      "scripts/verify-admin-loader-geometry.mjs",
      "scripts/verify-login-geometry.mjs",
      "scripts/verify-submission-badge-geometry.mjs",
      "scripts/lib/browser-harness.mjs",
    ];
    for (const source of sources) {
      const text = readFileSync(join(REPO_ROOT, source), "utf8");
      expect(text).not.toMatch(/remote-debugging-port=(?!0\b)\d+/);
      for (const port of COLLISION_PORTS) {
        expect(text).not.toContain(`${port}`);
      }
    }
  });
});

describe("temp profile isolation", () => {
  it("creates a unique prefixed temp profile per invocation", async () => {
    const dirs = [];
    const harnesses = [];
    for (let i = 0; i < 3; i += 1) {
      const harness = new Harness({ name: "unit", runId: createRunId() });
      harnesses.push(harness);
      dirs.push(await harness.makeTempDir("chrome-"));
    }
    expect(new Set(dirs).size).toBe(3);
    for (const dir of dirs) {
      expect(dir.startsWith(resolve(tmpdir()))).toBe(true);
      expect(dir).toContain(TEMP_PREFIX);
      expect(existsSync(dir)).toBe(true);
    }
    for (const harness of harnesses) {
      expect(await harness.cleanup()).toEqual([]);
    }
    for (const dir of dirs) expect(existsSync(dir)).toBe(false);
  });

  it("refuses to remove directories it did not create", async () => {
    await expect(assertRemovableTempDir("")).rejects.toThrow(/empty temp directory/);
    await expect(assertRemovableTempDir("/")).rejects.toThrow(/outside/);
    await expect(assertRemovableTempDir(REPO_ROOT)).rejects.toThrow(/outside/);
    const foreign = await makeScratchDir("someone-elses-");
    await expect(assertRemovableTempDir(foreign)).rejects.toThrow(/missing .* prefix/);
  });
});

describe("process ownership", () => {
  it("refuses to signal a process it does not own", async () => {
    const harness = new Harness({ name: "unit" });
    const stranger = spawn(process.execPath, ["-e", "setTimeout(() => {}, 30000)"], {
      stdio: "ignore",
      detached: true,
    });
    try {
      expect(harness.ownsPid(stranger.pid)).toBe(false);
      await expect(harness.terminateOwned({ pid: stranger.pid, child: stranger })).rejects.toThrow(
        /Refusing to signal pid/
      );
      // Cleanup of an unrelated-process-free harness must leave it running.
      expect(await harness.cleanup()).toEqual([]);
      expect(isPidAlive(stranger.pid)).toBe(true);
    } finally {
      stranger.kill("SIGKILL");
    }
  });

  it("terminates only the children it spawned", async () => {
    const harness = new Harness({ name: "unit" });
    const stranger = spawn(process.execPath, ["-e", "setTimeout(() => {}, 30000)"], {
      stdio: "ignore",
      detached: true,
    });
    const owned = harness.spawnOwned(process.execPath, ["-e", "setTimeout(() => {}, 30000)"]);
    try {
      expect(harness.ownsPid(owned.pid)).toBe(true);
      expect(await harness.cleanup()).toEqual([]);
      expect(isPidAlive(owned.pid)).toBe(false);
      expect(isPidAlive(stranger.pid)).toBe(true);
    } finally {
      stranger.kill("SIGKILL");
    }
  });
});

describe("bounded readiness", () => {
  it("times out instead of hanging on a socket that never answers", async () => {
    const holder = await occupyPort(await getFreePort());
    try {
      const started = Date.now();
      await expect(
        fetchWithTimeout(`http://127.0.0.1:${holder.port}/json/version`, { timeoutMs: 300 })
      ).rejects.toThrow();
      expect(Date.now() - started).toBeLessThan(3000);
    } finally {
      await holder.close();
    }
  });

  it("aborts a readiness wait as soon as the owned process dies", async () => {
    const harness = new Harness({ name: "unit" });
    const record = harness.spawnOwned(process.execPath, ["-e", "process.exit(3)"]);
    await expect(
      waitFor(() => false, {
        timeoutMs: 10000,
        intervalMs: 20,
        label: "never ready",
        isAlive: () => harness.isAlive(record),
      })
    ).rejects.toThrow(/owned process exited before becoming ready/);
    expect(await harness.cleanup()).toEqual([]);
  });
});

describe("cleanup on every failure mode", () => {
  it("cleans up and exits non-zero when Chrome fails to start", async () => {
    const previousChrome = process.env.CHROME_PATH;
    process.env.CHROME_PATH = "/usr/bin/false";
    let profileDir;
    try {
      const { harness, exitCode } = await runVerifierIsolated("chrome-start-failure", async (h) => {
        const original = h.makeTempDir.bind(h);
        h.makeTempDir = async (suffix) => {
          profileDir = await original(suffix);
          return profileDir;
        };
        await h.launchChrome({ timeoutMs: 5000 });
        throw new Error("unreachable: Chrome should not have started");
      });
      expect(exitCode).toBe(1);
      expect(harness.ownedChildren.size).toBe(0);
      expect(profileDir).toBeTruthy();
      expect(existsSync(profileDir)).toBe(false);
    } finally {
      if (previousChrome === undefined) delete process.env.CHROME_PATH;
      else process.env.CHROME_PATH = previousChrome;
    }
  });

  it("cleans up and exits non-zero when a server never becomes ready", async () => {
    let ownedPid;
    const { harness, exitCode } = await runVerifierIsolated("server-readiness-failure", async (h) => {
      const port = await getFreePort();
      h.appPort = port;
      const record = h.spawnOwned(process.execPath, ["-e", "setTimeout(() => {}, 30000)"]);
      ownedPid = record.pid;
      h.onCleanup(() => h.terminateOwned(record));
      await waitFor(
        async () => (await fetchWithTimeout(`http://127.0.0.1:${port}/`, { timeoutMs: 200 })).ok,
        { timeoutMs: 800, intervalMs: 100, label: "server", isAlive: () => h.isAlive(record) }
      );
    });
    expect(exitCode).toBe(1);
    expect(harness.ownedChildren.size).toBe(0);
    expect(isPidAlive(ownedPid)).toBe(false);
  });

  it("cleans up and exits non-zero when the CDP connection fails", async () => {
    const deadPort = await getFreePort();
    let tempDir;
    const { harness, exitCode } = await runVerifierIsolated("cdp-failure", async (h) => {
      tempDir = await h.makeTempDir("cdp-");
      const client = new CdpClient(`ws://127.0.0.1:${deadPort}/devtools/browser/none`);
      h.onCleanup(() => client.close());
      await client.connect({ timeoutMs: 1500 });
    });
    expect(exitCode).toBe(1);
    expect(existsSync(tempDir)).toBe(false);
    expect(harness.ownedChildren.size).toBe(0);
  });

  it("cleans up and exits non-zero on a geometry assertion failure", async () => {
    let tempDir;
    const { harness, exitCode } = await runVerifierIsolated("assertion-failure", async (h) => {
      tempDir = await h.makeTempDir("assert-");
      const record = h.spawnOwned(process.execPath, ["-e", "setTimeout(() => {}, 30000)"]);
      h.onCleanup(() => h.terminateOwned(record));
      h.assertionLabel = "navbar @ 1440px top";
      throw new Error("1440px top: center delta 12.000px");
    });
    expect(exitCode).toBe(1);
    expect(existsSync(tempDir)).toBe(false);
    expect(harness.ownedChildren.size).toBe(0);
  });

  it("cleans up and exits zero on success", async () => {
    let tempDir;
    let ownedPid;
    const { harness, exitCode } = await runVerifierIsolated("success", async (h) => {
      tempDir = await h.makeTempDir("ok-");
      const record = h.spawnOwned(process.execPath, ["-e", "setTimeout(() => {}, 30000)"]);
      ownedPid = record.pid;
      h.onCleanup(() => h.terminateOwned(record));
      const fixture = await h.serveFixture("<!doctype html><title>ok</title>");
      expect(fixture.port).toBeGreaterThan(0);
    });
    expect(exitCode).toBe(0);
    expect(existsSync(tempDir)).toBe(false);
    expect(isPidAlive(ownedPid)).toBe(false);
    expect(harness.ownedChildren.size).toBe(0);
  });

  it("reports cleanup failures instead of swallowing them", async () => {
    const { exitCode } = await runVerifierIsolated("cleanup-failure", async (h) => {
      h.onCleanup(() => {
        throw new Error("cleanup exploded");
      });
    });
    expect(exitCode).toBe(1);
  });
});

describe("diagnostics redaction", () => {
  it("redacts credentials from arbitrary text", () => {
    const dirty = [
      "Cookie: sb-access-token=abc.def.ghi",
      "authorization: Bearer sk-live-1234567890",
      "ANTHROPIC_API_KEY=sk-ant-super-secret-value",
      "jwt eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.QWERTYU",
    ].join("\n");
    const clean = redact(dirty);
    expect(clean).not.toContain("abc.def.ghi");
    expect(clean).not.toContain("sk-live-1234567890");
    expect(clean).not.toContain("sk-ant-super-secret-value");
    expect(clean).not.toContain("eyJhbGciOiJIUzI1NiJ9");
    expect(clean).toContain("[REDACTED]");
  });

  it("keeps secrets out of harness diagnostics", async () => {
    const harness = new Harness({ name: "diag", runId: "run-1" });
    const record = harness.spawnOwned(process.execPath, [
      "-e",
      "console.error('authorization: Bearer sk-secret-token-123'); setTimeout(() => {}, 30000)",
    ]);
    await waitFor(() => record.stderr.toArray().length > 0, {
      timeoutMs: 5000,
      intervalMs: 25,
      label: "child stderr",
    });
    harness.appPort = 4001;
    harness.cdpPort = 4002;
    const text = harness.diagnostics(new Error("cookie: sb-access-token=leak-me"));
    expect(text).not.toContain("sk-secret-token-123");
    expect(text).not.toContain("leak-me");
    expect(text).toContain("run id:        run-1");
    expect(text).toContain("cdp port:      4002");
    expect(await harness.cleanup()).toEqual([]);
  });

  it("bounds the stdout/stderr tail", () => {
    const tail = new LineTail(3);
    for (let i = 0; i < 50; i += 1) tail.push(`line ${i}\n`);
    expect(tail.toArray()).toEqual(["line 47", "line 48", "line 49"]);
  });
});

describe("sequential orchestration", () => {
  async function makeFakeVerifiers(specs) {
    const dir = await makeScratchDir(`${TEMP_PREFIX}orch-`);
    const timeline = join(dir, "timeline.jsonl");
    await writeFile(timeline, "");
    const verifiers = [];
    for (const spec of specs) {
      const file = `${spec.name}.mjs`;
      await writeFile(
        join(dir, file),
        `import { appendFileSync } from "node:fs";
const log = (event) => appendFileSync(${JSON.stringify(timeline)},
  JSON.stringify({ name: ${JSON.stringify(spec.name)}, event, pid: process.pid, t: Date.now() }) + "\\n");
log("start");
await new Promise((r) => setTimeout(r, ${spec.durationMs ?? 150}));
log("end");
process.exit(${spec.exitCode ?? 0});
`
      );
      verifiers.push({ name: spec.name, script: file });
    }
    return { dir, timeline, verifiers };
  }

  it("runs verifiers one at a time with no overlap", async () => {
    const { dir, timeline, verifiers } = await makeFakeVerifiers([
      { name: "alpha" },
      { name: "beta" },
      { name: "gamma" },
    ]);
    const summary = await runSequential(verifiers, { cwd: dir, stdio: "pipe" });
    expect(summary.ok).toBe(true);
    expect(summary.maxConcurrency).toBe(1);

    const events = (await readFile(timeline, "utf8"))
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    expect(events.map((e) => e.event)).toEqual([
      "start",
      "end",
      "start",
      "end",
      "start",
      "end",
    ]);
    expect(events.map((e) => e.name)).toEqual([
      "alpha",
      "alpha",
      "beta",
      "beta",
      "gamma",
      "gamma",
    ]);
    for (let i = 1; i < summary.results.length; i += 1) {
      expect(summary.results[i].startedAt).toBeGreaterThanOrEqual(
        summary.results[i - 1].endedAt
      );
    }
    for (const result of summary.results) {
      expect(isPidAlive(result.pid)).toBe(false);
    }
  });

  it("stops at the first failure and reports a non-zero result", async () => {
    const { dir, verifiers } = await makeFakeVerifiers([
      { name: "alpha" },
      { name: "beta", exitCode: 7 },
      { name: "gamma" },
    ]);
    const summary = await runSequential(verifiers, { cwd: dir, stdio: "pipe" });
    expect(summary.ok).toBe(false);
    expect(summary.results).toHaveLength(2);
    expect(summary.results[1].code).toBe(7);
    expect(summary.skipped).toEqual(["gamma"]);
  });

  it("treats a crashing verifier as a failure", async () => {
    const dir = await makeScratchDir(`${TEMP_PREFIX}orch-crash-`);
    await writeFile(join(dir, "boom.mjs"), "throw new Error('boom');\n");
    const summary = await runSequential([{ name: "boom", script: "boom.mjs" }], {
      cwd: dir,
      stdio: "pipe",
    });
    expect(summary.ok).toBe(false);
    expect(summary.results[0].code).not.toBe(0);
  });
});

describe("geometry contracts are still enforced", () => {
  const contracts = [
    { file: "scripts/verify-navbar-geometry.mjs", viewports: 6, tolerance: "TOLERANCE = 0.5" },
    { file: "scripts/verify-admin-loader-geometry.mjs", viewports: 7, tolerance: "TOLERANCE_PX = 8" },
    { file: "scripts/verify-login-geometry.mjs", viewports: 7, tolerance: "TOLERANCE_PX = 8" },
    { file: "scripts/verify-submission-badge-geometry.mjs", viewports: 5, tolerance: null },
  ];

  it.each(contracts)("$file keeps its viewports and tolerance", ({ file, viewports, tolerance }) => {
    const text = readFileSync(join(REPO_ROOT, file), "utf8");
    const block = text.match(/const VIEWPORTS = \[(?:.|\n)*?\];/)[0];
    const entries = block.match(/\d{3,4}/g).length / (file.includes("navbar") ? 1 : 2);
    expect(entries).toBe(viewports);
    if (tolerance) expect(text).toContain(tolerance);
    expect(text).toContain("runVerifier(");
    expect(text).not.toContain("process.exit(0)");
  });

  it("keeps every verifier in the orchestrator list", async () => {
    const { DEFAULT_VERIFIERS } = await import("./verify-browser-harness.mjs");
    expect(DEFAULT_VERIFIERS.map((v) => v.script).sort()).toEqual(
      contracts.map((c) => c.file).sort()
    );
    for (const verifier of DEFAULT_VERIFIERS) {
      expect(existsSync(join(REPO_ROOT, verifier.script))).toBe(true);
    }
  });
});

/* ------------------------------------------------------------------ *
 * Real-browser tests
 * ------------------------------------------------------------------ */

describeBrowser("real Chrome (dynamic port discovery)", () => {
  it(
    "launches on an OS-assigned CDP port distinct from the application port",
    async () => {
      const { harness, exitCode } = await runVerifierIsolated("real-chrome", async (h) => {
        const fixture = await h.serveFixture(
          "<!doctype html><title>t</title><div id='x'>hello</div>"
        );
        const { client, port, profileDir } = await h.launchChrome();
        expect(COLLISION_PORTS).not.toContain(port);
        expect(port).not.toBe(fixture.port);
        expect(profileDir).toContain(TEMP_PREFIX);
        const page = await client.newPage("about:blank");
        await page.navigate(fixture.url);
        expect(await page.evaluate("document.getElementById('x').textContent")).toBe("hello");
      });
      expect(exitCode).toBe(0);
      expect(harness.ownedChildren.size).toBe(0);
      expect(existsSync(harness.tempDirs.values().next().value ?? "/nonexistent")).toBe(false);
    },
    60000
  );

  it(
    "works while 9333-9336 are occupied, twice in a row, leaking nothing",
    async () => {
      const holders = await Promise.all(COLLISION_PORTS.map(occupyPort));
      const before = await tempDirsWithPrefix();
      const pids = [];
      try {
        expect(holders.some((h) => h.bound)).toBe(true);
        for (const attempt of [1, 2]) {
          const summary = await runSequential(
            [
              {
                name: `badge-${attempt}`,
                script: "scripts/verify-submission-badge-geometry.mjs",
              },
            ],
            { cwd: REPO_ROOT, stdio: "pipe" }
          );
          expect(summary.ok, summary.results[0]?.output).toBe(true);
          // Every viewport assertion actually ran — nothing silently skipped.
          expect(summary.results[0].output).toContain("PASS: badge layout OK at all 5 viewports");
          expect((summary.results[0].output.match(/^\d+x\d+: PASS/gm) || []).length).toBe(5);
          expect(summary.results[0].output).not.toMatch(/9333|9334|9335|9336/);
          pids.push(summary.results[0].pid);
        }
      } finally {
        for (const holder of holders) await holder.close();
      }
      for (const pid of pids) expect(isPidAlive(pid)).toBe(false);
      expect(await tempDirsWithPrefix()).toEqual(before);
    },
    120000
  );
});
