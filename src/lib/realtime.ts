// Polling-based realtime utility.
// Server-side only — queries the database for changes since a given timestamp.

import { db } from './db';

// ─── Types ───

export interface RealtimeLead {
  id: string;
  organizationId: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  score: number;
  value: string;
  message: string | null;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RealtimeActivity {
  id: string;
  organizationId: string | null;
  agent: string;
  action: string;
  leadId: string | null;
  status: string;
  metadata: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  newLeads: number;
  coldLeads: number;
  convertedLeads: number;
  lostLeads: number;
  totalValue: number;
  avgScore: number;
  conversionRate: number;
  activeAgents: number;
  conversions: number;
  recentLeads: number;
  weeklyGrowth: number;
  uniqueSources: number;
  avgValue: number;
}

export interface RealtimeUpdates {
  leads: RealtimeLead[];
  activities: RealtimeActivity[];
  stats: DashboardStats;
  timestamp: string;
}

// ─── Backward-compatible stub ───
// Keep as no-op so existing `broadcast()` calls in leads routes don't break.
// With polling-based realtime, the client pulls changes on its own schedule.

export async function broadcast(_event: string, _payload?: Record<string, unknown>): Promise<void> {
  // No-op: polling replaces push-based broadcasting
}

// ─── Core functions ───

/**
 * Query the database for new leads and activities since a given ISO timestamp,
 * plus the current dashboard stats.
 */
export async function getRealtimeUpdates(
  since: string,
  orgId: string,
): Promise<RealtimeUpdates> {
  const sinceDate = new Date(since);

  // Guard against invalid dates
  if (isNaN(sinceDate.getTime())) {
    throw new Error(`Invalid "since" timestamp: ${since}`);
  }

  const baseWhere: Record<string, unknown> = { organizationId: orgId };

  const [leads, activities] = await Promise.all([
    db.lead.findMany({
      where: { ...baseWhere, createdAt: { gt: sinceDate } },
      orderBy: { createdAt: 'asc' },
      take: 100,
    }),
    db.agentActivity.findMany({
      where: { ...baseWhere, createdAt: { gt: sinceDate } },
      orderBy: { createdAt: 'asc' },
      take: 100,
    }),
  ]);

  const stats = await getLatestStats(orgId);

  return {
    leads: leads.map(serializeDates) as unknown as RealtimeLead[],
    activities: activities.map(serializeDates) as unknown as RealtimeActivity[],
    stats,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Return the current dashboard stats, optionally scoped to an organization.
 */
export async function getLatestStats(orgId: string): Promise<DashboardStats> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const where: Record<string, unknown> = { organizationId: orgId };

  const [
    totalLeads,
    hotLeads,
    warmLeads,
    newLeads,
    coldLeads,
    convertedLeads,
    lostLeads,
    allLeads,
    recentLeads,
    lastWeekLeads,
  ] = await Promise.all([
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

  const uniqueSources = new Set(allLeads.map(l => l.source)).size;
  const avgValue = totalLeads > 0 ? Math.round(totalValue / totalLeads) : 0;

  return {
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
  };
}

// ─── Helpers ───

/** Convert Date fields in a Prisma record to ISO strings for JSON serialization. */
function serializeDates<T extends Record<string, unknown>>(record: T): T {
  const result = { ...record };
  for (const key of Object.keys(result) as (keyof T)[]) {
    const val = result[key];
    if (val instanceof Date) {
      (result as Record<string, unknown>)[key as string] = val.toISOString();
    }
  }
  return result;
}
