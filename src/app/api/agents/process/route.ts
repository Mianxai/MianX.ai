import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { AGENT_REGISTRY, queueTask, processQueue } from '@/lib/agents/engine';

// POST /api/agents/process — Auto-process all new/unqualified leads through the qualifier agent
// This is the "AI autopilot" endpoint
export const POST = withAuth(async (_req, { orgId }) => {
  const qualifierAgent = AGENT_REGISTRY.find(a => a.type === 'qualifier');
  if (!qualifierAgent) {
    return err('Lead Qualifier AI agent not found', 500);
  }

  // Find all new and unqualified leads
  const where: Record<string, unknown> = {
    status: { in: ['new', 'cold'] },
    organizationId: orgId,
  };

  const leads = await db.lead.findMany({ where });

  if (leads.length === 0) {
    return ok({
      message: 'No new or unqualified leads to process',
      processedCount: 0,
      agentName: qualifierAgent.name,
    });
  }

  // Queue all leads for qualification
  const taskIds: string[] = [];
  for (const lead of leads) {
    const taskId = queueTask({
      agentId: qualifierAgent.id,
      leadId: lead.id,
      type: 'qualifier',
      payload: { lead },
      priority: 'high',
    });
    taskIds.push(taskId);
  }

  // Process the queue
  const processed = processQueue();

  // Apply results to leads and log activities
  let updatedCount = 0;
  let failedCount = 0;

  for (const task of processed) {
    const lead = leads.find(l => l.id === task.leadId);
    if (!lead) continue;

    const success = task.result?.success ?? false;

    if (success && task.result?.data) {
      const { score, recommendedStatus, reasoning } = task.result.data;

      await db.lead.update({
        where: { id: lead.id },
        data: {
          score,
          status: recommendedStatus,
          assignedTo: qualifierAgent.name,
        },
      });

      updatedCount++;

      // Log the activity
      await db.agentActivity.create({
        data: {
          agent: qualifierAgent.name,
          action: `Auto-qualified lead: ${lead.name} — score ${lead.score} → ${score}, status ${lead.status} → ${recommendedStatus}. ${reasoning || ''}`,
          leadId: lead.id,
          status: 'success',
          organizationId: orgId,
          metadata: JSON.stringify({
            taskId: task.id,
            previousScore: lead.score,
            newScore: score,
            previousStatus: lead.status,
            newStatus: recommendedStatus,
            confidence: task.result.confidence,
            autopilot: true,
          }),
        },
      });
    } else {
      failedCount++;

      await db.agentActivity.create({
        data: {
          agent: qualifierAgent.name,
          action: `Failed to auto-qualify lead: ${lead.name} — ${task.error || 'unknown error'}`,
          leadId: lead.id,
          status: 'error',
          organizationId: orgId,
          metadata: JSON.stringify({
            taskId: task.id,
            error: task.error,
            autopilot: true,
          }),
        },
      });
    }
  }

  return ok({
    message: `AI Autopilot processed ${leads.length} leads`,
    agentName: qualifierAgent.name,
    totalLeadsFound: leads.length,
    processedCount: updatedCount,
    failedCount,
    results: processed.map(t => ({
      leadId: t.leadId,
      success: t.result?.success ?? false,
      score: t.result?.data?.score,
      recommendedStatus: t.result?.data?.recommendedStatus,
      confidence: t.result?.confidence,
    })),
  });
}, 'leads:write');
