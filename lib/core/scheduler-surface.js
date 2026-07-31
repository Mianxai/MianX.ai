/**
 * Load durable scheduler snapshot for Founder surfaces (no secrets).
 */
import * as repo from "./repo";
import { runtimeConfigStatus } from "./config";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import {
  buildDurableSchedulerViewModel,
  fetchSupabaseCronMeta,
} from "./scheduler-view-model";

export async function loadCronMetaRpc() {
  if (!isSupabaseConfigured()) return null;
  const admin = getSupabaseAdmin();
  if (!admin) return null;
  return fetchSupabaseCronMeta(async () => {
    const { data, error } = await admin.rpc("mianx_scheduler_status");
    if (error) throw error;
    return data;
  });
}

/**
 * Canonical scheduler payload for command-center / schedule / health.
 */
export async function buildSchedulerSurfaceSnapshot(opts = {}) {
  let lastTick = opts.lastTick;
  if (lastTick === undefined) {
    try {
      lastTick = await repo.getLastRuntimeTick();
    } catch {
      lastTick = null;
    }
  }

  const config = runtimeConfigStatus({ lastTickAt: lastTick?.at || null });
  let cronMeta = opts.cronMeta;
  if (cronMeta === undefined) {
    cronMeta = await loadCronMetaRpc();
  }

  const durable = buildDurableSchedulerViewModel({
    lastTick,
    cronMeta,
    configScheduler: config.scheduler,
    now: opts.now,
    providerName: opts.providerName || "none",
    liveExecutionReady: false,
  });

  return {
    ...config.scheduler,
    ...durable,
    lastTick: lastTick?.at || null,
    lastTickAt: lastTick?.at || null,
    recentWorkerProcessing: lastTick,
    lastClaimed: lastTick?.claimed ?? durable.claimed,
    lastSucceeded: lastTick?.succeeded ?? durable.succeeded,
    lastFailed: lastTick?.failed ?? durable.failed,
    durable,
    cronMeta: cronMeta
      ? {
          vaultConfigured: cronMeta.vaultConfigured,
          jobScheduled: cronMeta.jobScheduled,
          jobActive: cronMeta.jobActive,
          jobSchedule: cronMeta.jobSchedule,
          lastCronRunStatus: cronMeta.lastCronRunStatus,
          lastCronRunStartedAt: cronMeta.lastCronRunStartedAt,
          secretsExposed: false,
        }
      : null,
  };
}
