/**
 * Load env for workforce CLIs without printing secrets.
 * Supports: process.env (CI/prod), --env-file=PATH, --env-local (.env.local).
 */
import { readFileSync, existsSync } from "fs";
import path from "path";

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return { loaded: false, path: filePath, keys: 0 };
  const text = readFileSync(filePath, "utf8");
  let keys = 0;
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
      keys += 1;
    }
  }
  return { loaded: true, path: filePath, keys };
}

export function loadWorkforceCliEnv(argv = process.argv.slice(2)) {
  const loaded = [];
  const envFileArg = argv.find((a) => a.startsWith("--env-file="));
  if (envFileArg) {
    loaded.push(parseEnvFile(path.resolve(envFileArg.slice("--env-file=".length))));
  }
  const envFileIdx = argv.indexOf("--env-file");
  if (envFileIdx >= 0 && argv[envFileIdx + 1]) {
    loaded.push(parseEnvFile(path.resolve(argv[envFileIdx + 1])));
  }
  if (argv.includes("--env-local")) {
    loaded.push(parseEnvFile(path.resolve(process.cwd(), ".env.local")));
  }
  // Node 20+ --env-file is handled by the runtime before this script runs.
  return {
    loadedFiles: loaded.filter((f) => f.loaded),
    note: "Secret values are never printed. Prefer: vercel env run -- npm run workforce:verify",
  };
}

export function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || "")
  );
}
