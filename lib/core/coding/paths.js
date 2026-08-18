// Centralized protected-path and workspace path security for coding tasks.

import path from "node:path";
import fs from "node:fs";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

/** Paths that always require explicit authorized_paths on the task. */
export const PROTECTED_PATH_PREFIXES = [
  "doc/",
  ".cursor/",
  "design/",
  "execution/",
  "supabase/migrations/",
  ".env",
  ".env.local",
  ".env.production",
  "secrets/",
  "middleware.js",
  "lib/admin-auth.js",
  "lib/core/auth.js",
  "lib/core/internal-auth.js",
  ".github/workflows/",
  "vercel.json",
];

/** Hard-denied basenames (never writable by coding executor). */
export const DENIED_BASENAMES = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  "credentials.json",
  "id_rsa",
  "id_ed25519",
];

/**
 * Normalize a relative path under workspaceRoot.
 * Rejects absolute paths, null bytes, and .. escapes.
 */
export function normalizeWorkspacePath(workspaceRoot, requestedPath) {
  // Resolve symlinks on the workspace root first (e.g. macOS /var → /private/var).
  let root = path.resolve(workspaceRoot);
  try {
    if (fs.existsSync(root)) root = fs.realpathSync(root);
  } catch {
    /* keep resolved root */
  }
  if (!requestedPath || typeof requestedPath !== "string") {
    throw validationError("Invalid path.", { path: "path is required." });
  }
  if (requestedPath.includes("\0")) {
    throw forbidden("Null byte in path is not allowed.");
  }
  // Reject absolute and Windows drive paths before join.
  if (path.isAbsolute(requestedPath) || /^[a-zA-Z]:[\\/]/.test(requestedPath)) {
    throw forbidden("Absolute paths are not allowed in coding tasks.");
  }
  const normalizedRequest = requestedPath.replace(/\\/g, "/");
  if (normalizedRequest.startsWith("/") || normalizedRequest.includes("://")) {
    throw forbidden("Absolute or URL paths are not allowed.");
  }

  const joined = path.resolve(root, normalizedRequest);
  const rel = path.relative(root, joined);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw forbidden("Path escapes the workspace root.");
  }

  // Symlink escape: if the path exists, realpath must stay under root.
  try {
    if (fs.existsSync(joined)) {
      const real = fs.realpathSync(joined);
      const realRel = path.relative(root, real);
      if (realRel.startsWith("..") || path.isAbsolute(realRel)) {
        throw forbidden("Symlink escapes the workspace root.");
      }
    }
    // Also check parent directories for symlink escapes when creating files.
    let parent = path.dirname(joined);
    while (parent.startsWith(root) && parent !== root) {
      if (fs.existsSync(parent)) {
        const realParent = fs.realpathSync(parent);
        const rp = path.relative(root, realParent);
        if (rp.startsWith("..") || path.isAbsolute(rp)) {
          throw forbidden("Parent symlink escapes the workspace root.");
        }
      }
      parent = path.dirname(parent);
    }
  } catch (err) {
    if (err?.status === 403 || err?.code === "FORBIDDEN") throw err;
    if (err?.code && err.code !== "ENOENT") {
      throw forbidden(`Path resolution failed: ${err.code}`);
    }
  }

  return {
    absolute: joined,
    relative: rel.split(path.sep).join("/"),
  };
}

export function isProtectedRelativePath(relativePath) {
  const rel = String(relativePath || "").replace(/\\/g, "/");
  const base = path.posix.basename(rel);
  if (DENIED_BASENAMES.includes(base)) return true;
  if (base.startsWith(".env")) return true;
  return PROTECTED_PATH_PREFIXES.some(
    (p) => rel === p.replace(/\/$/, "") || rel.startsWith(p)
  );
}

/**
 * Assert a relative path may be written given task policy.
 * @param {object} opts
 * @param {string} opts.workspaceRoot
 * @param {string} opts.requestedPath
 * @param {string[]} [opts.allowedPathPrefixes] scoped allowlist (relative)
 * @param {string[]} [opts.authorizedProtectedPaths] explicit exceptions
 */
export function assertWritablePath({
  workspaceRoot,
  requestedPath,
  allowedPathPrefixes = [],
  authorizedProtectedPaths = [],
}) {
  const { absolute, relative } = normalizeWorkspacePath(workspaceRoot, requestedPath);

  if (isProtectedRelativePath(relative)) {
    const authorized = (authorizedProtectedPaths || []).map((p) =>
      String(p).replace(/\\/g, "/")
    );
    if (!authorized.includes(relative) && !authorized.some((p) => relative.startsWith(p))) {
      throw forbidden(
        `Protected path "${relative}" is not authorized for this coding task.`
      );
    }
  }

  if (Array.isArray(allowedPathPrefixes) && allowedPathPrefixes.length > 0) {
    const ok = allowedPathPrefixes.some((prefix) => {
      const p = String(prefix).replace(/\\/g, "/").replace(/^\.\//, "");
      return relative === p || relative.startsWith(p.endsWith("/") ? p : `${p}/`) || relative.startsWith(p);
    });
    if (!ok) {
      throw forbidden(
        `Path "${relative}" is outside the allowed path prefixes for this task.`
      );
    }
  }

  return { absolute, relative };
}

export function clipPathForAudit(relativePath) {
  return clip(relativePath, 500);
}
