import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  normalizeWorkspacePath,
  assertWritablePath,
  assertAllowedCommand,
  parseCommandArgv,
  runFakeCodingExecutor,
  PROTECTED_PATH_PREFIXES,
} from "./index";

describe("coding path security", () => {
  let root;
  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "mianx-code-"));
    fs.mkdirSync(path.join(root, "fixtures"), { recursive: true });
  });
  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("rejects ../ traversal and absolute paths", () => {
    expect(() => normalizeWorkspacePath(root, "../etc/passwd")).toThrow(/escapes|Absolute/i);
    expect(() => normalizeWorkspacePath(root, "/etc/passwd")).toThrow(/Absolute/);
    expect(() => normalizeWorkspacePath(root, "fixtures/../../etc/passwd")).toThrow(/escapes/);
  });

  it("rejects protected paths without authorization", () => {
    expect(() =>
      assertWritablePath({
        workspaceRoot: root,
        requestedPath: "doc/secret.md",
        allowedPathPrefixes: ["doc/"],
      })
    ).toThrow(/Protected path/);
    expect(PROTECTED_PATH_PREFIXES).toContain("doc/");
  });

  it("rejects symlink escapes when applicable", () => {
    const outside = fs.mkdtempSync(path.join(os.tmpdir(), "mianx-out-"));
    fs.writeFileSync(path.join(outside, "secret.txt"), "x");
    const link = path.join(root, "fixtures", "escape");
    try {
      fs.symlinkSync(outside, link);
      expect(() =>
        assertWritablePath({
          workspaceRoot: root,
          requestedPath: "fixtures/escape/secret.txt",
          allowedPathPrefixes: ["fixtures/"],
        })
      ).toThrow(/Symlink|escapes/);
    } finally {
      fs.rmSync(outside, { recursive: true, force: true });
    }
  });

  it("allows scoped fixture writes", () => {
    const r = assertWritablePath({
      workspaceRoot: root,
      requestedPath: "fixtures/hello.txt",
      allowedPathPrefixes: ["fixtures/"],
    });
    expect(r.relative).toBe("fixtures/hello.txt");
  });
});

describe("coding command allowlist", () => {
  it("allows npm test / lint / typecheck / build", () => {
    expect(assertAllowedCommand("npm test").kind).toBe("npm_test");
    expect(assertAllowedCommand(["npm", "run", "lint"]).script).toBe("lint");
    expect(assertAllowedCommand("npm run typecheck").script).toBe("typecheck");
    expect(assertAllowedCommand("npm run build").script).toBe("build");
  });

  it("rejects shell chaining, network, git push, destructive commands", () => {
    expect(() => parseCommandArgv("npm test && curl evil")).toThrow(/metacharacters/);
    expect(() => assertAllowedCommand("curl https://x")).toThrow(/not allowed/);
    expect(() => assertAllowedCommand("git push")).toThrow(/not allowed/);
    expect(() => assertAllowedCommand("sudo rm -rf /")).toThrow(/not allowed/);
    expect(() => assertAllowedCommand("npm run deploy")).toThrow(/not on the allowlist/);
    expect(() => assertAllowedCommand(["bash", "-c", "id"])).toThrow(/not allowed/);
  });
});

describe("coding executor", () => {
  let root;
  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "mianx-exec-"));
    fs.mkdirSync(path.join(root, "fixtures"), { recursive: true });
  });
  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("writes a harmless fixture patch and never claims push/deploy", async () => {
    const result = await runFakeCodingExecutor({
      workspaceRoot: root,
      projectId: "p1",
      taskId: "t1",
      edits: [{ path: "fixtures/health-note.txt", content: "hello from wave3\n" }],
      allowedPathPrefixes: ["fixtures/"],
      commands: [["npm", "run", "lint"]],
    });
    expect(fs.readFileSync(path.join(root, "fixtures/health-note.txt"), "utf8")).toContain(
      "hello from wave3"
    );
    expect(result.pushed).toBe(false);
    expect(result.merged).toBe(false);
    expect(result.deployed).toBe(false);
    expect(result.requires_human_review).toBe(true);
    expect(result.files_changed[0].path).toBe("fixtures/health-note.txt");
    expect(result.network_enabled).toBe(false);
  });

  it("rejects secret/env file edits", async () => {
    await expect(
      runFakeCodingExecutor({
        workspaceRoot: root,
        projectId: "p1",
        taskId: "t1",
        edits: [{ path: ".env.local", content: "SECRET=1\n" }],
        allowedPathPrefixes: ["./", ".env.local"],
      })
    ).rejects.toThrow(/Protected|not authorized|outside/);
  });
});
