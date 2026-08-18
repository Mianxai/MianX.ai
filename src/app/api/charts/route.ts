import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const days = 14
    const now = new Date()
    const dailyLeads: { date: string; count: number; hot: number; warm: number; new: number; cold: number; value: number }[] = []

    for (let i = days - 1; i >= 0; i--) {
      const start = new Date(now)
      start.setDate(start.getDate() - i)
      start.setHours(0, 0, 0, 0)
      const end = new Date(start)
      end.setHours(23, 59, 59, 999)

      const dateStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      const leads = await db.lead.findMany({
        where: { createdAt: { gte: start, lte: end } },
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

    // Source distribution
    const allLeads = await db.lead.findMany({ select: { source: true, status: true, score: true } })
    const sourceMap: Record<string, number> = {}
    allLeads.forEach(l => { sourceMap[l.source] = (sourceMap[l.source] || 0) + 1 })
    const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }))

    // Agent performance
    const activities = await db.agentActivity.findMany({
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

    // Score distribution
    const scoreBuckets = [0, 0, 0, 0, 0] // 0-20, 21-40, 41-60, 61-80, 81-100
    allLeads.forEach(l => {
      if (l.score <= 20) scoreBuckets[0]++
      else if (l.score <= 40) scoreBuckets[1]++
      else if (l.score <= 60) scoreBuckets[2]++
      else if (l.score <= 80) scoreBuckets[3]++
      else scoreBuckets[4]++
    })
    const scoreData = [
      { range: '0-20', count: scoreBuckets[0], fill: '#6B6B80' },
      { range: '21-40', count: scoreBuckets[1], fill: '#00D4FF' },
      { range: '41-60', count: scoreBuckets[2], fill: '#FFD93D' },
      { range: '61-80', count: scoreBuckets[3], fill: '#FF8C42' },
      { range: '81-100', count: scoreBuckets[4], fill: '#FF4D00' },
    ]

    return NextResponse.json({ dailyLeads, sourceData, agentData, scoreData })
  } catch (error) {
    console.error('Charts API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
