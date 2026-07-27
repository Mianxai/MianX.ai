#!/usr/bin/env node
/**
 * Local/staging helper: POST one runtime worker tick.
 *
 * Requires INTERNAL_RUNTIME_SECRET or CRON_SECRET (≥16 chars) and a running
 * app. Never prints the secret. Uses the fake/deterministic provider when
 * ANTHROPIC_API_KEY is unset on the server.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3000 INTERNAL_RUNTIME_SECRET=… \
 *     node scripts/runtime-tick.mjs
 */
import { randomUUID } from "node:crypto";

const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const secret =
  process.env.INTERNAL_RUNTIME_SECRET?.trim() ||
  process.env.CRON_SECRET?.trim() ||
  "";

if (secret.length < 16) {
  console.error(
    "Set INTERNAL_RUNTIME_SECRET or CRON_SECRET (≥16 characters). Secret not printed."
  );
  process.exit(1);
}

const requestId = randomUUID();
const res = await fetch(`${base}/api/internal/runtime/tick`, {
  method: "POST",
  headers: {
    authorization: `Bearer ${secret}`,
    "content-type": "application/json",
    "x-request-id": requestId,
  },
  body: "{}",
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = { raw: text.slice(0, 200) };
}

console.log(
  JSON.stringify(
    {
      ok: res.ok,
      status: res.status,
      requestId,
      tick: body.tick || null,
      error: body.error?.code || null,
    },
    null,
    2
  )
);
process.exit(res.ok ? 0 : 1);
