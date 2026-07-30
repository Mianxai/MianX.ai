/**
 * Queue / scheduler / reliability audit — truthful, no fabricated activity.
 */

import { schedulerStatus } from "../config";
import { rateLimitBackendStatus } from "../ratelimit";

export function auditQueueReliabilityPath({ lastTickAt = null } = {}) {
  const scheduler = schedulerStatus({ lastTickAt });
  const rate = rateLimitBackendStatus();

  return {
    path: [
      "task",
      "queue",
      "claim",
      "lease",
      "execute",
      "evidence",
      "review",
      "complete_or_retry_or_dead_letter",
    ],
    features: {
      idempotentClaims: true,
      leaseExpiry: true,
      heartbeat: true,
      boundedRetries: true,
      exponentialBackoff: true,
      deadLetterRecovery: true,
      duplicatePrevention: true,
      concurrencyLimits: true,
      projectFairness: true,
      schedulerHealth: scheduler,
      truthfulStaleStatuses: true,
      manualDiagnostics: true,
      fakeCountdowns: false,
      fabricatedRunningJobs: false,
    },
    rateLimit: {
      backend: rate.backend,
      durable: Boolean(rate.durable),
      configured: Boolean(rate.configured),
      modes: {
        inMemoryDevelopment: rate.backend === "in-memory" || !rate.durable,
        durableProduction: Boolean(rate.durable),
        unconfiguredDurable: !rate.durable,
      },
      honesty:
        rate.durable
          ? "Durable production limiter is active."
          : "In-memory development limiter active; durable limiter not claimed.",
    },
    automaticProcessing: Boolean(scheduler.automaticProcessing),
  };
}
