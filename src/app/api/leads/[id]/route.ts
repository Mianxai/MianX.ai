import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { broadcast } from '@/lib/realtime';
import { withAuth, ok, err } from '@/lib/api-guard';
import { z } from 'zod/v4';

const patchSchema = z.object({
  status: z.enum(['new', 'hot', 'warm', 'cold', 'converted', 'lost']).optional(),
  score: z.int().min(0).max(100).optional(),
  assignedTo: z.string().max(100).optional(),
});

const putSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.email('Invalid email'),
  phone: z.string().max(30).optional(),
  company: z.string().max(200).optional(),
  source: z.string().max(50),
  status: z.enum(['new', 'hot', 'warm', 'cold', 'converted', 'lost']),
  score: z.int().min(0).max(100),
  value: z.string().max(50),
  message: z.string().max(2000).optional(),
  assignedTo: z.string().max(100).optional(),
  notes: z.string().max(5000).optional(),
});

// ─── Status Transition Rules ───
// Defines valid from → to transitions.
// 'lost' can only transition to 'new' (re-opened).
// 'converted' is terminal — no transitions out.
const VALID_TRANSITIONS: Record<string, string[]> = {
  new:      ['new', 'hot', 'warm', 'cold', 'converted', 'lost'],
  hot:      ['hot', 'warm', 'cold', 'converted', 'lost'],
  warm:     ['warm', 'hot', 'cold', 'converted', 'lost'],
  cold:     ['cold', 'warm', 'hot', 'converted', 'lost'],
  converted: [],         // terminal state
  lost:     ['new'],      // only re-open
};

function validateStatusTransition(from: string, to: string): string | null {
  if (from === to) return null; // same status is always fine
  const allowed = VALID_TRANSITIONS[from];
  if (!allowed || !allowed.includes(to)) {
    if (from === 'converted') return 'Cannot change status from "converted" — it is a terminal state.';
    if (from === 'lost' && to !== 'new') return 'Cannot change status from "lost" to "' + to + '" — only "new" is allowed to re-open a lost lead.';
    return 'Invalid status transition from "' + from + '" to "' + to + '".';
  }
  return null;
}

// GET /api/leads/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (req, ctx) => {
    const { id } = await params;
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) return err('Lead not found', 404);
    if (lead.organizationId !== ctx.orgId) return err('Forbidden', 403);
    return ok(lead);
  }, 'leads:read')(req);
}

// PUT /api/leads/[id] — Full update with status transition validation and notes support
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (req, ctx) => {
    const { id } = await params;
    const body = await req.json();
    const parsed = putSchema.safeParse(body);
    if (!parsed.success) return err(parsed.error.issues[0].message, 400);

    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) return err('Lead not found', 404);
    if (lead.organizationId !== ctx.orgId) return err('Forbidden', 403);

    // Validate status transition
    if (parsed.data.status && parsed.data.status !== lead.status) {
      const transitionError = validateStatusTransition(lead.status, parsed.data.status);
      if (transitionError) return err(transitionError, 400);
    }

    const updated = await db.lead.update({ where: { id }, data: parsed.data });

    const actionDesc = parsed.data.status && parsed.data.status !== lead.status
      ? `Lead updated: ${lead.name} → status ${lead.status} → ${parsed.data.status}`
      : `Lead updated: ${lead.name}`;

    await db.agentActivity.create({
      data: {
        agent: 'Dashboard',
        action: actionDesc,
        status: 'success',
        organizationId: lead.organizationId,
      },
    });
    await broadcast('lead:updated', { lead: updated });
    return ok(updated);
  }, 'leads:write')(req);
}

// PATCH /api/leads/[id] — Partial update
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (req, ctx) => {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) return err(parsed.error.issues[0].message, 400);

    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) return err('Lead not found', 404);
    if (lead.organizationId !== ctx.orgId) return err('Forbidden', 403);

    // Validate status transition
    if (parsed.data.status && parsed.data.status !== lead.status) {
      const transitionError = validateStatusTransition(lead.status, parsed.data.status);
      if (transitionError) return err(transitionError, 400);
    }

    const updated = await db.lead.update({ where: { id }, data: parsed.data });
    await db.agentActivity.create({
      data: {
        agent: 'Dashboard',
        action: `Lead updated: ${lead.name} -> ${parsed.data.status || 'fields changed'}`,
        status: 'success',
        organizationId: lead.organizationId,
      },
    });
    await broadcast('lead:updated', { lead: updated });
    return ok(updated);
  }, 'leads:write')(req);
}

// DELETE /api/leads/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async (req, ctx) => {
    const { id } = await params;
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) return err('Lead not found', 404);
    if (lead.organizationId !== ctx.orgId) return err('Forbidden', 403);

    await db.lead.delete({ where: { id } });
    await db.agentActivity.create({
      data: { agent: 'System', action: `Lead deleted: ${lead.name}`, status: 'info', organizationId: lead.organizationId },
    });
    await broadcast('lead:deleted', { id });
    return ok({ success: true });
  }, 'leads:delete')(req);
}