// Structured command allowlist for the controlled coding executor.
// Rejects shell chaining / network / git mutation / destructive ops.

import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

/** Allowed executable tokens (first argv element). */
export const ALLOWED_BINARIES = new Set(["npm", "node", "npx"]);

/** Allowed npm script names (npm run <script>). */
export const ALLOWED_NPM_SCRIPTS = new Set([
  "test",
  "lint",
  "typecheck",
  "build",
]);

/** Allowed bare npm commands: npm <cmd> ... */
export const ALLOWED_NPM_COMMANDS = new Set(["test", "run", "ci"]);

const DENIED_BINARIES = new Set([
  "curl",
  "wget",
  "ssh",
  "scp",
  "sudo",
  "su",
  "bash",
  "sh",
  "zsh",
  "fish",
  "python",
  "python3",
  "perl",
  "ruby",
  "nc",
  "ncat",
  "netcat",
  "docker",
  "kubectl",
  "aws",
  "gcloud",
  "az",
  "vault",
  "gh",
  "git",
  "rm",
  "chmod",
  "chown",
  "dd",
  "mkfs",
]);

/**
 * Parse a command into argv without invoking a shell.
 * Accepts either string[] or a simple space-separated string without metacharacters.
 */
export function parseCommandArgv(command) {
  if (Array.isArray(command)) {
    return command.map((c) => String(c));
  }
  if (typeof command !== "string" || !command.trim()) {
    throw validationError("Invalid command.", { command: "command is required." });
  }
  const raw = command.trim();
  // Reject shell metacharacters used for chaining / expansion.
  if (/[;&|`$<>(){}]|&&|\|\||>>|<<|\n|\r/.test(raw)) {
    throw forbidden("Shell metacharacters and chaining are not allowed.");
  }
  if (raw.includes("*") || raw.includes("?")) {
    throw forbidden("Glob metacharacters are not allowed in coding commands.");
  }
  return raw.split(/\s+/).filter(Boolean);
}

/**
 * Validate a command against the allowlist. Returns normalized argv.
 */
export function assertAllowedCommand(command) {
  const argv = parseCommandArgv(command);
  if (argv.length === 0) {
    throw validationError("Invalid command.", { command: "empty argv." });
  }

  const bin = argv[0];
  if (DENIED_BINARIES.has(bin)) {
    throw forbidden(`Binary "${bin}" is not allowed in coding executor.`);
  }
  if (!ALLOWED_BINARIES.has(bin)) {
    throw forbidden(`Binary "${bin}" is not on the coding executor allowlist.`);
  }

  // node: only allow running local scripts under workspace (relative .js path)
  if (bin === "node") {
    const script = argv[1];
    if (!script || script.startsWith("-")) {
      throw forbidden("node requires a relative script path.");
    }
    if (script.includes("..") || script.startsWith("/") || /^[a-zA-Z]:/.test(script)) {
      throw forbidden("node script path must be a relative workspace path.");
    }
    return { argv, kind: "node_script" };
  }

  // npx: deny by default except vitest run with relative patterns
  if (bin === "npx") {
    if (argv[1] !== "vitest") {
      throw forbidden("npx only allows vitest in coding executor.");
    }
    return { argv, kind: "npx_vitest" };
  }

  // npm
  if (bin === "npm") {
    const sub = argv[1];
    if (!ALLOWED_NPM_COMMANDS.has(sub)) {
      throw forbidden(`npm subcommand "${sub}" is not allowed.`);
    }
    if (sub === "run") {
      const script = argv[2];
      if (!ALLOWED_NPM_SCRIPTS.has(script)) {
        throw forbidden(`npm run "${script}" is not on the allowlist.`);
      }
      return { argv, kind: "npm_run", script };
    }
    if (sub === "test") {
      return { argv, kind: "npm_test" };
    }
    if (sub === "ci") {
      // Install only from lockfile; no scripts network expansion beyond npm's own.
      return { argv, kind: "npm_ci" };
    }
  }

  throw forbidden("Command failed structured allowlist validation.");
}

export function commandForAudit(argv) {
  return clip(argv.join(" "), 500);
}
