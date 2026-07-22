import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { broadcast } from '@/lib/realtime'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, score, assignedTo } = body

    const lead = await db.lead.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(score !== undefined && { score }),
        ...(assignedTo !== undefined && { assignedTo }),
      },
    })

    await db.agentActivity.create({
      data: {
        agent: 'Dashboard',
        action: `Lead updated: ${lead.name} -> status: ${status || lead.status}`,
        status: 'success',
      },
    })

    await broadcast('lead:updated', { lead })
    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await db.lead.findUnique({ where: { id } })
    await db.lead.delete({ where: { id } })

    await db.agentActivity.create({
      data: {
        agent: 'System',
        action: `Lead deleted: ${lead?.name || id}`,
        status: 'info',
      },
    })

    await broadcast('lead:deleted', { id })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
