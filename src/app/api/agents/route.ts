import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { AGENT_REGISTRY, getAllAgentStatuses, queueTask, processQueue, processLead } from '@/lib/agents/engine';
import { z } from 'zod/v4';

const triggerSchema = z.object({
  agentId: z.string().min(1),
  leadId: z.string().min(1),
});

// GET /api/agents — List all registered agents with their status
export const GET = withAuth(async (_req, { orgId }) => {
  // Prune old tasks periodically
  const { pruneOldTasks } = await import('@/lib/agents/engine');
  pruneOldTasks();

  const statuses = getAllAgentStatuses();

  // Fetch recent activity from DB for each agent
  const recentActivities = await db.agentActivity.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  // Map recent activity counts per agent
  const activityByAgent: Record<string, number> = {};
  for (const act of recentActivities) {
    activityByAgent[act.agent] = (activityByAgent[act.agent] || 0) + 1;
  }

  const agents = AGENT_REGISTRY.map(agent => {
    const status = statuses.find(s => s.agentId === agent.id);
    return {
      ...agent,
      ...status,
      recentActivityCount: activityByAgent[agent.name] || 0,
    };
  });

  return ok({ agents, totalRegistered: AGENT_REGISTRY.length });
}, 'leads:read');

// POST /api/agents — Trigger agent processing for a lead
export const POST = withAuth(async (req, { orgId }) => {
  const body = await req.json();
  const parsed = triggerSchema.safeParse(body);

  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => i.message).join(', ');
    return err(msg, 400);
  }

  const { agentId, leadId } = parsed.data;

  // Verify the agent exists
  const agent = AGENT_REGISTRY.find(a => a.id === agentId);
  if (!agent) {
    return err(`Agent "${agentId}" not found`, 404);
  }

  // Fetch the lead and verify it belongs to the user's organization
  const lead = await db.lead.findFirst({ where: { id: leadId, organizationId: orgId } });
  if (!lead) {
    return err(`Lead "${leadId}" not found`, 404);
  }

  // Queue the task
  const taskId = queueTask({
    agentId,
    leadId,
    type: agent.type,
    payload: { lead },
    priority: 'high',
  });

  // Process the queue immediately
  const processed = processQueue();
  const taskResult = processed.find(t => t.id === taskId);

  if (!taskResult) {
    return err('Task processing failed', 500);
  }

  // If the agent is a qualifier and it succeeded, update the lead
  if (agent.type === 'qualifier' && taskResult.result?.success) {
    const { score, recommendedStatus } = taskResult.result.data;
    await db.lead.update({
      where: { id: leadId },
      data: {
        score,
        status: recommendedStatus,
        assignedTo: agent.name,
      },
    });
  }

  // If the agent is outreach and it succeeded, store the draft
  if (agent.type === 'outreach' && taskResult.result?.success) {
    await db.lead.update({
      where: { id: leadId },
      data: {
        notes: `Outreach draft generated: "${taskResult.result.data.subject}"

${taskResult.result.data.body}`,
        assignedTo: agent.name,
      },
    });
  }

  // Log agent activity
  await db.agentActivity.create({
    data: {
      agent: agent.name,
      action: `${taskResult.result?.success ? 'Successfully processed' : 'Failed to process'} lead: ${lead.name} — ${taskResult.result?.action || 'unknown'}`,
      leadId,
      status: taskResult.result?.success ? 'success' : 'error',
      organizationId: orgId,
      metadata: JSON.stringify({
        taskId: taskResult.id,
        agentId,
        confidence: taskResult.result?.confidence,
        action: taskResult.result?.action,
      }),
    },
  });

  return ok({
    taskId: taskResult.id,
    status: taskResult.status,
    result: taskResult.result,
    agent: agent.name,
    leadId,
  });
}, 'leads:write');
