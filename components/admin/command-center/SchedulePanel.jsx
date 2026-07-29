"use client";

import SchedulerStatus from "@/components/admin/SchedulerStatus";

export default function SchedulePanel({ schedule, readiness, provider, rateLimit }) {
  if (!schedule) return null;
  const tick = schedule.recentWorkerProcessing;
  return (
    <section className="cc-card" aria-labelledby="cc-sched-h" data-testid="schedule-panel">
      <h2 id="cc-sched-h">Schedule</h2>
      <SchedulerStatus
        scheduler={{
          ...schedule,
          lastTickAt: schedule.lastTick || schedule.lastTickAt || null,
          lastClaimed: tick?.claimed ?? schedule.lastClaimed,
          lastSucceeded: tick?.succeeded ?? schedule.lastSucceeded,
          lastFailed: tick?.failed ?? schedule.lastFailed,
        }}
      />
      <dl className="cc-detail-dl">
        <div>
          <dt>Worker configured</dt>
          <dd>{schedule.workerSecretConfigured ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Platform cron</dt>
          <dd>{schedule.platformCronConfigured ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Tick endpoint</dt>
          <dd>
            <code>{schedule.tickEndpoint || "/api/internal/runtime/tick"}</code>
          </dd>
        </div>
        <div>
          <dt>Provider</dt>
          <dd>{provider?.status || readiness?.provider || "unconfigured"}</dd>
        </div>
        <div>
          <dt>Rate limit</dt>
          <dd>{rateLimit?.backend || rateLimit?.mode || "in-memory"}</dd>
        </div>
      </dl>
    </section>
  );
}
