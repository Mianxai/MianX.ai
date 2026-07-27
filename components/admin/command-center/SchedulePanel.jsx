"use client";

export default function SchedulePanel({ schedule, readiness }) {
  if (!schedule) return null;
  return (
    <section className="cc-card" aria-labelledby="cc-sched-h">
      <h2 id="cc-sched-h">Schedule</h2>
      <dl className="cc-detail-dl">
        <div>
          <dt>Mode</dt>
          <dd>
            <code>{schedule.mode}</code>
          </dd>
        </div>
        <div>
          <dt>Worker configured</dt>
          <dd>{schedule.workerSecretConfigured ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Platform cron</dt>
          <dd>{schedule.platformCronConfigured ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Automatic processing</dt>
          <dd>{schedule.automaticProcessing ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Tick endpoint</dt>
          <dd>
            <code>{schedule.tickEndpoint}</code>
          </dd>
        </div>
        <div>
          <dt>Last tick</dt>
          <dd className="cc-unavailable">
            {schedule.lastTick || "Data unavailable (not persisted)"}
          </dd>
        </div>
        <div>
          <dt>Schema readiness</dt>
          <dd>
            jobs: {readiness?.runtime_jobs_schema || "unknown"} · membership:{" "}
            {readiness?.admin_membership_schema || "unknown"}
          </dd>
        </div>
      </dl>
      {schedule.founderGuidance ? (
        <p className="cc-muted cc-guidance">{schedule.founderGuidance}</p>
      ) : null}
    </section>
  );
}
