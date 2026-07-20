import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

    await db.agentActivity.create({
      data: {
        agent: 'System',
        action: `New lead received: ${lead.name}`,
        status: 'success',
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}