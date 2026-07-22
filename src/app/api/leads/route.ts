import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { broadcast } from '@/lib/realtime'

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      leads,
      count: leads.length,
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, source, status, score, value, message, assignedTo } = body

    if (!name || !email || !source) {
      return NextResponse.json(
        { error: 'name, email, and source are required' },
        { status: 400 }
      )
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        source,
        status: status ?? 'new',
        score: score ?? 50,
        value: value ?? '$0',
        message,
        assignedTo,
      },
    })

    // System activity
    await db.agentActivity.create({
      data: {
        agent: 'System',
        action: `New lead received: ${lead.name} from ${lead.source}`,
        status: 'success',
      },
    })

    // AI Agent auto-assignment
    const agents = ['Sales AI', 'Marketing AI', 'Support AI']
    const assignedAgent = agents[Math.floor(Math.random() * agents.length)]
    const autoScore = Math.floor(Math.random() * 40) + 40
    await db.lead.update({
      where: { id: lead.id },
      data: { score: autoScore, assignedTo: assignedAgent },
    })
    await db.agentActivity.create({
      data: {
        agent: assignedAgent,
        action: `Analyzing and qualifying lead: ${lead.name} (score: ${autoScore})`,
        status: 'info',
      },
    })

    // Broadcast real-time
    const updatedLead = { ...lead, score: autoScore, assignedTo: assignedAgent }
    await broadcast('lead:created', { lead: updatedLead })
    await broadcast('activity:new', {
      activity: {
        id: Date.now().toString(),
        agent: assignedAgent,
        action: `Analyzing and qualifying lead: ${lead.name} (score: ${autoScore})`,
        status: 'info',
        createdAt: new Date().toISOString(),
      },
    })

    return NextResponse.json(updatedLead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
