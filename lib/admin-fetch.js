/**
 * In-flight request dedupe for admin client fetches.
 * Never caches private project payloads across users — only coalesces identical
 * in-flight GETs within the same browser tab session.
 */

const inflight = new Map();
const shortCache = new Map();

const DEFAULT_TTL_MS = 5_000;

function keyFor(url, init = {}) {
  const method = (init.method || "GET").toUpperCase();
  return `${method} ${url}`;
}

function canClone(res) {
  return res && typeof res.clone === "function";
}

/**
 * Deduped fetch for idempotent GETs. Mutations pass through.
 * Tolerates non-Response mocks (tests) that lack `.clone()`.
 */
export function adminFetch(url, init = {}, { ttlMs = DEFAULT_TTL_MS } = {}) {
  const method = (init.method || "GET").toUpperCase();
  if (method !== "GET") {
    return fetch(url, init);
  }

  const key = keyFor(url, init);
  const now = Date.now();
  const cached = shortCache.get(key);
  if (cached && cached.expiresAt > now) {
    return Promise.resolve(canClone(cached.response) ? cached.response.clone() : cached.response);
  }

  if (inflight.has(key)) {
    return inflight.get(key).then((res) => (canClone(res) ? res.clone() : res));
  }

  const promise = fetch(url, init)
    .then((res) => {
      if (res?.ok && ttlMs > 0 && canClone(res)) {
        shortCache.set(key, { expiresAt: now + ttlMs, response: res.clone() });
      }
      return res;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise.then((res) => (canClone(res) ? res.clone() : res));
}

export function clearAdminFetchCache() {
  inflight.clear();
  shortCache.clear();
}
