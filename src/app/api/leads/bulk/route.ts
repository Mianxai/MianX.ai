import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { z } from 'zod/v4';

const VALID_STATUSES = ['new', 'hot', 'warm', 'cold', 'converted', 'lost'] as const;

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

    // Build where clause: only update leads that belong to the user's org and are in the ids list
    const where: Record<string, unknown> = { id: { in: ids }, organizationId: orgId };

    const result = await db.lead.updateMany({
      where,
      data: { status },
    });

    return ok({ success: true, updated: result.count });
  }, 'leads:write')(request);
}
