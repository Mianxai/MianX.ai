import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { broadcast } from '@/lib/realtime';
import { withAuth, parsePagination, ok, err } from '@/lib/api-guard';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod/v4';

const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.email('Invalid email'),
  phone: z.string().max(30).optional(),
  company: z.string().max(200).optional(),
  source: z.string().max(50).default('website'),
  status: z.enum(['new', 'hot', 'warm', 'cold', 'converted', 'lost']).default('new'),
  score: z.int().min(0).max(100).default(50),
  value: z.string().max(50).default('$0'),
  message: z.string().max(2000).optional(),
});

// Allowed sort fields mapped to Prisma fields
const SORTABLE_FIELDS = ['createdAt', 'updatedAt', 'name', 'email', 'score', 'status', 'value'] as const;

type SortField = (typeof SORTABLE_FIELDS)[number];

// GET /api/leads — List leads with filtering, sorting, pagination
export const GET = withAuth(async (req, { orgId }) => {
  const { skip, take, page } = parsePagination(req.nextUrl);

  // Filtering
  const status = req.nextUrl.searchParams.get('status');
  const source = req.nextUrl.searchParams.get('source');
  const search = req.nextUrl.searchParams.get('search');
  const sort = (req.nextUrl.searchParams.get('sort') || 'createdAt') as SortField;
  const order = (req.nextUrl.searchParams.get('order') || 'desc') as 'asc' | 'desc';

  const where: Record<string, unknown> = { organizationId: orgId };
  if (status) where.status = status;
  if (source) where.source = source;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { company: { contains: search } },
    ];
  }

  // Validate sort field
  const orderBy: Record<string, 'asc' | 'desc'> = SORTABLE_FIELDS.includes(sort)
    ? { [sort]: order }
    : { createdAt: 'desc' };

  const [leads, count] = await Promise.all([
    db.lead.findMany({ where, orderBy, skip, take }),
    db.lead.count({ where }),
  ]);

  return ok({
    leads,
    count,
    page,
    limit: take,
    totalPages: Math.ceil(count / take),
  });
}, 'leads:read');

// POST /api/leads — Create lead (public for capture form, auth for dashboard)
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 leads per hour per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { success } = rateLimit(ip, 60 * 60 * 1000, 10);
    if (!success) {
      return err('Rate limit exceeded. Maximum 10 leads per hour.', 429);
    }

    const body = await request.json();
    const parsed = createLeadSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues.map(i => i.message).join(', ');
      return err(msg, 400);
    }

    const data = parsed.data;

    // Try to get org from session (if authenticated)
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get('mianx_session')?.value;
    let orgId: string | undefined;
    if (token) {
      const { validateSession } = await import('@/lib/auth');
      const session = await validateSession(token);
      const membership = session?.user.memberships.find(m => m.status === 'active');
      if (membership) orgId = membership.organizationId;
    }

    const lead = await db.lead.create({
      data: { ...data, organizationId: orgId },
    });

    // System activity
    await db.agentActivity.create({
      data: {
        agent: 'System',
        action: `New lead received: ${lead.name} from ${lead.source}`,
        status: 'success',
        organizationId: orgId,
      },
    });

    // AI Agent auto-assignment
    const agents = ['Sales AI', 'Marketing AI', 'Support AI'];
    const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
    const autoScore = Math.floor(Math.random() * 40) + 40;
    const updatedLead = await db.lead.update({
      where: { id: lead.id },
      data: { score: autoScore, assignedTo: assignedAgent },
    });

    await db.agentActivity.create({
      data: {
        agent: assignedAgent,
        action: `Analyzing and qualifying lead: ${lead.name} (score: ${autoScore})`,
        status: 'info',
        organizationId: orgId,
      },
    });

    // Broadcast real-time
    await broadcast('lead:created', { lead: updatedLead });
    await broadcast('activity:new', {
      activity: {
        id: Date.now().toString(),
        agent: assignedAgent,
        action: `Analyzing and qualifying lead: ${lead.name} (score: ${autoScore})`,
        status: 'info',
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(updatedLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return err('Failed to create lead');
  }
}
