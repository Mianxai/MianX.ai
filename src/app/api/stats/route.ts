import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok } from '@/lib/api-guard';

export const GET = withAuth(async (req, { orgId }) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const where: Record<string, unknown> = { organizationId: orgId };

  const [totalLeads, hotLeads, warmLeads, newLeads, coldLeads, convertedLeads, lostLeads, allLeads, recentLeads, lastWeekLeads] =
    await Promise.all([
      db.lead.count({ where }),
      db.lead.count({ where: { ...where, status: 'hot' } }),
      db.lead.count({ where: { ...where, status: 'warm' } }),
      db.lead.count({ where: { ...where, status: 'new' } }),
      db.lead.count({ where: { ...where, status: 'cold' } }),
      db.lead.count({ where: { ...where, status: 'converted' } }),
      db.lead.count({ where: { ...where, status: 'lost' } }),
      db.lead.findMany({ where, select: { value: true, score: true, createdAt: true, status: true, source: true } }),
      db.lead.count({ where: { ...where, createdAt: { gte: sevenDaysAgo } } }),
      db.lead.count({ where: { ...where, createdAt: { gte: thirtyDaysAgo, lt: sevenDaysAgo } } }),
    ]);

  const totalValue = allLeads.reduce((sum, lead) => {
    const v = parseFloat(lead.value.replace(/[^0-9.-]/g, ''));
    return sum + (isNaN(v) ? 0 : v);
  }, 0);

  const avgScore = allLeads.length > 0
    ? Math.round(allLeads.reduce((s, l) => s + l.score, 0) / allLeads.length)
    : 0;

  const conversionRate = totalLeads > 0
    ? Math.round((convertedLeads / totalLeads) * 100)
    : 0;

  const weeklyGrowth = lastWeekLeads > 0
    ? Math.round(((recentLeads - lastWeekLeads) / lastWeekLeads) * 100)
    : recentLeads > 0 ? 100 : 0;

  // Unique sources
  const uniqueSources = new Set(allLeads.map(l => l.source)).size;

  // Avg value per lead
  const avgValue = totalLeads > 0 ? Math.round(totalValue / totalLeads) : 0;

  return ok({
    totalLeads,
    hotLeads,
    warmLeads,
    newLeads,
    coldLeads,
    convertedLeads,
    lostLeads,
    totalValue,
    avgScore,
    conversionRate,
    activeAgents: 6,
    conversions: convertedLeads,
    recentLeads,
    weeklyGrowth,
    uniqueSources,
    avgValue,
  });
}, 'leads:read');
