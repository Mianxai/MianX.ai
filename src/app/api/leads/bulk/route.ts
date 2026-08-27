import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { z } from 'zod/v4';

const VALID_STATUSES = ['new', 'hot', 'warm', 'cold', 'converted', 'lost'] as const;

// Status transition validation — same rules as individual lead updates
const VALID_TRANSITIONS: Record<string, string[]> = {
  new: ['hot', 'warm', 'cold', 'lost'],
  hot: ['warm', 'converted', 'lost'],
  warm: ['hot', 'converted', 'lost'],
  cold: ['warm', 'hot', 'lost'],
  converted: [],
  lost: ['new'],
};

const bulkUpdateSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, 'At least one lead ID is required').max(500, 'Maximum 500 leads per batch'),
  status: z.enum(VALID_STATUSES),
});

// PATCH /api/leads/bulk — Bulk status update
// Body: { ids: string[], status: string }
// Returns: { success: true, updated: number }
export async function PATCH(request: NextRequest) {
  return withAuth(async (req, { orgId }) => {
    const body = await req.json();
    const parsed = bulkUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const { ids, status } = parsed.data;

    // Validate transitions: fetch current statuses and check each one
    const existingLeads = await db.lead.findMany({
      where: { id: { in: ids }, organizationId: orgId },
      select: { id: true, status: true },
    });

    const invalidTransitions: string[] = [];
    const validIds: string[] = [];

    for (const lead of existingLeads) {
      const allowed = VALID_TRANSITIONS[lead.status] || [];
      if (!allowed.includes(status)) {
        invalidTransitions.push(`${lead.id}: ${lead.status} → ${status}`);
      } else {
        validIds.push(lead.id);
      }
    }

    if (invalidTransitions.length > 0) {
      return err(`Invalid status transitions: ${invalidTransitions.slice(0, 5).join('; ')}${invalidTransitions.length > 5 ? ` (+${invalidTransitions.length - 5} more)` : ''}`, 400);
    }

    if (validIds.length === 0) {
      return ok({ success: true, updated: 0 });
    }

    const result = await db.lead.updateMany({
      where: { id: { in: validIds }, organizationId: orgId },
      data: { status },
    });

    return ok({ success: true, updated: result.count });
  }, 'leads:write')(request);
}
