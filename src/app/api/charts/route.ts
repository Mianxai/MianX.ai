import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAuth } from '@/lib/api-guard'

export const GET = withAuth(async (_req, { orgId }) => {
  const where: Record<string, unknown> = { organizationId: orgId }

  const days = 14
  const now = new Date()

  // ── 1. Daily Lead Trends ──
  const dailyLeads: { date: string; count: number; hot: number; warm: number; new: number; cold: number; value: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const start = new Date(now)
    start.setDate(start.getDate() - i)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setHours(23, 59, 59, 999)

    const dateStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const leads = await db.lead.findMany({
      where: { ...where, createdAt: { gte: start, lte: end } },
    })

    dailyLeads.push({
      date: dateStr,
      count: leads.length,
      hot: leads.filter(l => l.status === 'hot').length,
      warm: leads.filter(l => l.status === 'warm').length,
      new: leads.filter(l => l.status === 'new').length,
      cold: leads.filter(l => l.status === 'cold').length,
      value: leads.reduce((s, l) => s + (parseFloat(l.value.replace(/[^0-9.-]/g, '')) || 0), 0),
    })
  }

  // ── 2. Source Distribution ──
  const allLeads = await db.lead.findMany({
    where,
    select: { source: true, status: true, score: true, createdAt: true, value: true },
  })
  const sourceMap: Record<string, number> = {}
  allLeads.forEach(l => { sourceMap[l.source] = (sourceMap[l.source] || 0) + 1 })
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }))

  // ── 3. Agent Performance ──
  const activities = await db.agentActivity.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })
  const agentMap: Record<string, { tasks: number; success: number; failed: number }> = {}
  activities.forEach(a => {
    if (!agentMap[a.agent]) agentMap[a.agent] = { tasks: 0, success: 0, failed: 0 }
    agentMap[a.agent].tasks++
    if (a.status === 'success') agentMap[a.agent].success++
    if (a.status === 'error') agentMap[a.agent].failed++
  })
  const agentData = Object.entries(agentMap).map(([agent, stats]) => ({
    agent,
    ...stats,
    rate: stats.tasks > 0 ? Math.round((stats.success / stats.tasks) * 100) : 0,
  }))

  // ── 4. Score Distribution ──
  const scoreBuckets = [0, 0, 0, 0, 0]
  allLeads.forEach(l => {
    if (l.score <= 20) scoreBuckets[0]++
    else if (l.score <= 40) scoreBuckets[1]++
    else if (l.score <= 60) scoreBuckets[2]++
    else if (l.score <= 80) scoreBuckets[3]++
    else scoreBuckets[4]++
  })
  const scoreData = [
    { range: '0-20', count: scoreBuckets[0], fill: '#6B6B80', label: 'Low Quality' },
    { range: '21-40', count: scoreBuckets[1], fill: '#00D4FF', label: 'Below Average' },
    { range: '41-60', count: scoreBuckets[2], fill: '#FFD93D', label: 'Average' },
    { range: '61-80', count: scoreBuckets[3], fill: '#FF8C42', label: 'Good' },
    { range: '81-100', count: scoreBuckets[4], fill: '#FF4D00', label: 'High Quality' },
  ]

  // ── 5. Conversion Funnel ──
  const totalAll = allLeads.length
  const newCount = allLeads.filter(l => l.status === 'new').length
  const warmCount = allLeads.filter(l => l.status === 'warm').length
  const hotCount = allLeads.filter(l => l.status === 'hot').length
  const convertedCount = allLeads.filter(l => l.status === 'converted').length
  const lostCount = allLeads.filter(l => l.status === 'lost').length
  const funnelData = [
    { stage: 'Total Leads', count: totalAll, pct: 100 },
    { stage: 'New', count: newCount, pct: totalAll > 0 ? Math.round((newCount / totalAll) * 100) : 0 },
    { stage: 'Contacted (Warm)', count: warmCount, pct: totalAll > 0 ? Math.round((warmCount / totalAll) * 100) : 0 },
    { stage: 'Qualified (Hot)', count: hotCount, pct: totalAll > 0 ? Math.round((hotCount / totalAll) * 100) : 0 },
    { stage: 'Converted', count: convertedCount, pct: totalAll > 0 ? Math.round((convertedCount / totalAll) * 100) : 0 },
    { stage: 'Lost', count: lostCount, pct: totalAll > 0 ? Math.round((lostCount / totalAll) * 100) : 0 },
  ]

  // ── 6. Pipeline Value Trend ──
  const valueByDay: { date: string; value: number; avgScore: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const start = new Date(now)
    start.setDate(start.getDate() - i)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setHours(23, 59, 59, 999)
    const dateStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const dayLeads = allLeads.filter(l => {
      const d = new Date(l.createdAt)
      return d >= start && d <= end
    })
    valueByDay.push({
      date: dateStr,
      value: dayLeads.reduce((s, l) => s + (parseFloat(l.value.replace(/[^0-9.-]/g, '')) || 0), 0),
      avgScore: dayLeads.length > 0 ? Math.round(dayLeads.reduce((s, l) => s + l.score, 0) / dayLeads.length) : 0,
    })
  }

  // ── 7. Source by Status Breakdown ──
  const sources = [...new Set(allLeads.map(l => l.source))]
  const statuses = ['new', 'hot', 'warm', 'cold', 'converted', 'lost']
  const sourceStatusData = sources.map(source => {
    const sourceLeads = allLeads.filter(l => l.source === source)
    const entry: Record<string, string | number> = { source }
    statuses.forEach(s => { entry[s] = sourceLeads.filter(l => l.status === s).length })
    entry.total = sourceLeads.length
    return entry
  })

  // ── 8. Hour-of-day Distribution ──
  const hourBuckets = new Array(24).fill(0)
  allLeads.forEach(l => {
    const h = new Date(l.createdAt).getHours()
    hourBuckets[h]++
  })
  const hourData = hourBuckets.map((count, hour) => {
    const label = hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`
    return { hour: label, count }
  })

  // ── 9. Weekly Comparison ──
  const thisWeekStart = new Date(now)
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())
  thisWeekStart.setHours(0, 0, 0, 0)
  const lastWeekStart = new Date(thisWeekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)
  const lastWeekEnd = new Date(thisWeekStart)
  lastWeekEnd.setHours(23, 59, 59, 999)

  const thisWeekLeads = allLeads.filter(l => new Date(l.createdAt) >= thisWeekStart)
  const lastWeekLeads = allLeads.filter(l => {
    const d = new Date(l.createdAt)
    return d >= lastWeekStart && d <= lastWeekEnd
  })

  const weeklyComparison = [
    { metric: 'Leads', thisWeek: thisWeekLeads.length, lastWeek: lastWeekLeads.length },
    { metric: 'Value', thisWeek: Math.round(thisWeekLeads.reduce((s, l) => s + (parseFloat(l.value.replace(/[^0-9.-]/g, '')) || 0), 0)), lastWeek: Math.round(lastWeekLeads.reduce((s, l) => s + (parseFloat(l.value.replace(/[^0-9.-]/g, '')) || 0), 0)) },
    { metric: 'Avg Score', thisWeek: thisWeekLeads.length > 0 ? Math.round(thisWeekLeads.reduce((s, l) => s + l.score, 0) / thisWeekLeads.length) : 0, lastWeek: lastWeekLeads.length > 0 ? Math.round(lastWeekLeads.reduce((s, l) => s + l.score, 0) / lastWeekLeads.length) : 0 },
  ]

  return NextResponse.json({
    dailyLeads, sourceData, agentData, scoreData,
    funnelData, valueByDay, sourceStatusData, hourData, weeklyComparison,
  })
}, 'leads:read')
