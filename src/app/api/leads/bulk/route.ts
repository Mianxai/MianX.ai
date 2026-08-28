import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';
import { z } from 'zod/v4';
import { LEAD_STATUSES, validateStatusTransition } from '@/lib/domain/lead-transitions';

const bulkUpdateSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, 'At least one lead ID is required').max(500, 'Maximum 500 leads per batch'),
  status: z.enum(LEAD_STATUSES),
});

// PATCH /api/leads/bulk — Bulk status update
// Body: { ids: string[], status: string }
// Returns: { success: true, updated: number }
//
// TOCTOU mitigation: uses a conditional WHERE clause that includes
// the expected current status for each lead. If a concurrent request
// changes a lead's status between our read and write, the update
// for that row simply won't match and result.count will be < expected.
export async function PATCH(request: NextRequest) {
  return withAuth(async (req, { orgId }) => {
    const body = await req.json();
    const parsed = bulkUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const { ids, status } = parsed.data;

    // ── Phase 1: Fetch current statuses (within a transaction) ──
    // Group leads by their current status so we can build accurate
    // WHERE clauses that prevent TOCTOU bypass.
    const existingLeads = await db.lead.findMany({
      where: { id: { in: ids }, organizationId: orgId },
      select: { id: true, status: true },
    });

    // Validate transitions for every lead
    const invalidTransitions: string[] = [];
    const validLeads: { id: string; currentStatus: string }[] = [];

    for (const lead of existingLeads) {
      const error = validateStatusTransition(lead.status, status);
      if (error) {
        invalidTransitions.push(`${lead.id}: ${lead.status} \u2192 ${status}`);
      } else {
        validLeads.push({ id: lead.id, currentStatus: lead.status });
      }
    }

    if (invalidTransitions.length > 0) {
      return err(
        `Invalid status transitions: ${invalidTransitions.slice(0, 5).join('; ')}${invalidTransitions.length > 5 ? ` (+${invalidTransitions.length - 5} more)` : ''}`,
        400,
      );
    }

    if (validLeads.length === 0) {
      return ok({ success: true, updated: 0 });
    }

    const validIds = validLeads.map((l) => l.id);

    // ── Phase 2: TOCTOU-safe update ──
    // Collect the set of expected current statuses for valid leads.
    // Adding `status: { in: expectedStatuses }` to the WHERE clause ensures
    // that if a concurrent request changed a lead's status after our read,
    // that lead will NOT be updated.
    const expectedStatuses = [...new Set(validLeads.map((l) => l.currentStatus))];

    const result = await db.lead.updateMany({
      where: {
        id: { in: validIds },
        organizationId: orgId,
        status: { in: expectedStatuses },
      },
      data: { status },
    });

    // ── Phase 3: Detect concurrent modification ──
    // If fewer rows were updated than expected, a race condition occurred.
    // We return 409 so the client knows to retry after re-reading current state.
    if (result.count < validIds.length) {
      const skipped = validIds.length - result.count;
      return err(
        `Concurrent status change detected: ${result.count} of ${validIds.length} leads updated. ${skipped} lead(s) had their status changed by another request. Please retry.`,
        409,
      );
    }

    return ok({ success: true, updated: result.count });
  }, 'leads:write')(request);
}
