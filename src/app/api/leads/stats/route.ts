import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';

const ALL_STATUSES = ['new', 'hot', 'warm', 'cold', 'converted', 'lost'] as const;

// GET /api/leads/stats — Detailed lead analytics scoped to user's organization
export const GET = withAuth(async (req, { orgId }) => {
  const where: Record<string, unknown> = { organizationId: orgId };

  // ── Run all queries in parallel ──
  const [
    totalLeads,
    statusGroups,
    sourceGroups,
    avgAggregates,
    last30DayLeads,
  ] = await Promise.all([
    // Total lead count
    db.lead.count({ where }),

    // Leads grouped by status
    db.lead.groupBy({
      by: ['status'],
      where,
      _count: { id: true },
    }),

    // Leads grouped by source
    db.lead.groupBy({
      by: ['source'],
      where,
      _count: { id: true },
    }),

    // Average score and average numeric value
    db.lead.aggregate({
      where,
      _avg: { score: true },
      _count: true,
    }),

    // Leads by day (last 30 days)
    db.lead.findMany({
      where: {
        ...where,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  // ── Build leadsByStatus with all statuses represented (including 0 counts) ──
  const leadsByStatus: Record<string, number> = {};
  for (const s of ALL_STATUSES) {
    leadsByStatus[s] = 0;
  }
  for (const group of statusGroups) {
    leadsByStatus[group.status] = group._count.id;
  }

  // ── Build leadsBySource ──
  const leadsBySource: Record<string, number> = {};
  for (const group of sourceGroups) {
    leadsBySource[group.source] = group._count.id;
  }

  // ── Build leadsByDay: last 30 days, keyed by YYYY-MM-DD ──
  const leadsByDay: Record<string, number> = {};
  for (const lead of last30DayLeads) {
    const dayKey = lead.createdAt.toISOString().slice(0, 10);
    leadsByDay[dayKey] = (leadsByDay[dayKey] || 0) + 1;
  }

  // ── Conversion rate: converted / (converted + lost + hot + warm) ──
  const convertedCount = leadsByStatus['converted'] || 0;
  const totalWithOutcome = convertedCount
    + (leadsByStatus['lost'] || 0)
    + (leadsByStatus['hot'] || 0)
    + (leadsByStatus['warm'] || 0);
  const conversionRate = totalWithOutcome > 0
    ? Math.round((convertedCount / totalWithOutcome) * 10000) / 100
    : 0;

  // ── Average value (parse the "$X" string values) ──
  const allLeadsForValue = await db.lead.findMany({
    where,
    select: { value: true },
  });
  let numericSum = 0;
  let valueCount = 0;
  for (const lead of allLeadsForValue) {
    const num = parseFloat(lead.value.replace(/[^0-9.-]/g, ''));
    if (!isNaN(num)) {
      numericSum += num;
      valueCount++;
    }
  }
  const averageValue = valueCount > 0
    ? '$' + Math.round(numericSum / valueCount).toLocaleString()
    : '$0';

  return ok({
    totalLeads,
    leadsByStatus,
    leadsBySource,
    leadsByDay,
    conversionRate,
    averageScore: avgAggregates._avg.score ?? 0,
    averageValue,
  });
}, 'leads:read');
