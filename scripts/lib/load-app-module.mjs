/**
 * Shared Vite SSR loader so CLI scripts can import app modules with `@/` aliases
 * without wrapping Vitest tests.
 */
import { createServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

let serverPromise = null;

async function getServer() {
  if (!serverPromise) {
    serverPromise = createServer({
      configFile: false,
      root,
      logLevel: "error",
      resolve: { alias: { "@": root } },
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true },
      appType: "custom",
    });
  }
  return serverPromise;
}

export async function loadAppModule(absoluteFromRoot) {
  const server = await getServer();
  const rel = absoluteFromRoot.startsWith("/")
    ? absoluteFromRoot
    : `/${absoluteFromRoot.replace(/^\.\//, "")}`;
  return server.ssrLoadModule(rel);
}

export async function closeAppLoader() {
  if (serverPromise) {
    const s = await serverPromise;
    serverPromise = null;
    await s.close();
  }
}
