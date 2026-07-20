import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [
      totalLeads,
      hotLeads,
      warmLeads,
      newLeads,
      allLeads,
      recentLeads,
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: 'hot' } }),
      db.lead.count({ where: { status: 'warm' } }),
      db.lead.count({ where: { status: 'new' } }),
      db.lead.findMany({ select: { value: true } }),
      db.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    ])

    const totalValue = allLeads.reduce((sum, lead) => {
      const numericValue = parseFloat(lead.value.replace(/[^0-9.-]/g, ''))
      return sum + (isNaN(numericValue) ? 0 : numericValue)
    }, 0)

    return NextResponse.json({
      totalLeads,
      hotLeads,
      warmLeads,
      newLeads,
      totalValue,
      activeAgents: 6,
      conversions: hotLeads,
      recentLeads,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}