import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { AGENT_REGISTRY, getAgentStatus, getRecentTasks, queueTask, processQueue } from '@/lib/agents/engine';
import { z } from 'zod/v4';

const bulkSchema = z.object({
  leadIds: z.array(z.string().min(1)).min(1).max(100),
  action: z.string().min(1).optional(),
});

// GET /api/agents/[id] — Get specific agent details + recent activity
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (_req, { orgId }) => {
    const { id } = await params;

    const agent = AGENT_REGISTRY.find(a => a.id === id);
    if (!agent) {
      return err(`Agent "${id}" not found`, 404);
    }

    const status = getAgentStatus(id);
    const recentTasks = getRecentTasks(id, 20);

    // Fetch recent DB activity for this agent
    const recentActivities = await db.agentActivity.findMany({
      where: {
        agent: agent.name,
        organizationId: orgId,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Count total activities
    const totalActivities = await db.agentActivity.count({
      where: {
        agent: agent.name,
        organizationId: orgId,
      },
    });

    return ok({
      agent,
      status,
      recentTasks,
      recentActivities,
      totalActivities,
    });
  }, 'leads:read')(req);
}

// POST /api/agents/[id] — Execute agent on multiple leads (bulk processing)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (_req, { orgId }) => {
    const { id } = await params;
    const body = await _req.json();
    const parsed = bulkSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues.map(i => i.message).join(', ');
      return err(msg, 400);
    }

    const { leadIds } = parsed.data;

    // Verify the agent exists
    const agent = AGENT_REGISTRY.find(a => a.id === id);
    if (!agent) {
      return err(`Agent "${id}" not found`, 404);
    }

    // Fetch all leads
    const leads = await db.lead.findMany({
      where: { id: { in: leadIds }, organizationId: orgId },
    });

    if (leads.length === 0) {
      return err('No valid leads found for the provided IDs', 404);
    }

    // Queue all tasks
    const taskIds: string[] = [];
    for (const lead of leads) {
      const taskId = queueTask({
        agentId: id,
        leadId: lead.id,
        type: agent.type,
        payload: { lead },
        priority: 'high',
      });
      taskIds.push(taskId);
    }

    // Process the queue
    const processed = processQueue();

    // Update leads and log activities
    const results: Array<{
      leadId: string;
      leadName: string;
      taskId: string;
      status: string;
      success: boolean;
    }> = [];

    for (const task of processed) {
      const lead = leads.find(l => l.id === task.leadId);
      if (!lead) continue;

      const success = task.result?.success ?? false;

      // Update lead if qualifier
      if (agent.type === 'qualifier' && success) {
        const { score, recommendedStatus } = task.result.data;
        await db.lead.update({
          where: { id: lead.id },
          data: { score, status: recommendedStatus, assignedTo: agent.name },
        });
      }

      // Update lead if outreach
      if (agent.type === 'outreach' && success) {
        await db.lead.update({
          where: { id: lead.id },
          data: {
            notes: `Outreach draft generated: "${task.result.data.subject}"

${task.result.data.body}`,
            assignedTo: agent.name,
          },
        });
      }

      // Log activity
      await db.agentActivity.create({
        data: {
          agent: agent.name,
          action: `${success ? 'Successfully processed' : 'Failed to process'} lead: ${lead.name} — ${task.result?.action || 'unknown'}`,
          leadId: lead.id,
          status: success ? 'success' : 'error',
          organizationId: orgId,
          metadata: JSON.stringify({
            taskId: task.id,
            agentId: id,
            confidence: task.result?.confidence,
          }),
        },
      });

      results.push({
        leadId: lead.id,
        leadName: lead.name,
        taskId: task.id,
        status: task.status,
        success,
      });
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return ok({
      agent: agent.name,
      agentId: id,
      totalLeads: leads.length,
      processed: results.length,
      successCount,
      failCount,
      results,
    });
  }, 'leads:write')(req);
}
