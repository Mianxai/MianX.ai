import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// One-time setup: pushes Prisma schema to the database
// Call POST /api/setup once after setting DATABASE_URL
export async function POST() {
  try {
    const { execSync } = await import('child_process')
    
    // Run prisma db push to create/update tables
    execSync('npx prisma db push --accept-data-loss 2>&1', {
      stdio: 'pipe',
      timeout: 30000,
    })

    // Verify connection
    const prisma = new PrismaClient()
    await prisma.$connect()
    const leadCount = await prisma.lead.count()
    await prisma.$disconnect()

    return NextResponse.json({ 
      success: true, 
      message: 'Database tables created successfully',
      tables: ['Lead', 'AgentActivity', 'DashboardStat'],
      existingLeads: leadCount 
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Setup error:', msg)
    return NextResponse.json(
      { error: 'Setup failed', details: msg },
      { status: 500 }
    )
  }
}
