import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Each statement must be a separate call — PostgreSQL prepared statements
// don't support multiple commands in one $executeRawUnsafe

const CREATE_LEAD = `
  CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "source" TEXT NOT NULL DEFAULT 'website',
    "status" TEXT NOT NULL DEFAULT 'new',
    "score" INTEGER NOT NULL DEFAULT 50,
    "value" TEXT NOT NULL DEFAULT '$0',
    "message" TEXT,
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`

const CREATE_ACTIVITY = `
  CREATE TABLE IF NOT EXISTS "AgentActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "agent" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "leadId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'info',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`

const CREATE_STAT = `
  CREATE TABLE IF NOT EXISTS "DashboardStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metric" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`

const CREATE_INDEX = `
  CREATE UNIQUE INDEX IF NOT EXISTS "DashboardStat_metric_key" ON "DashboardStat"("metric")
`

async function ensureTables() {
  await db.$executeRawUnsafe(CREATE_LEAD)
  await db.$executeRawUnsafe(CREATE_ACTIVITY)
  await db.$executeRawUnsafe(CREATE_STAT)
  try { await db.$executeRawUnsafe(CREATE_INDEX) } catch { /* index may already exist */ }
}

async function seedDefaults() {
  try {
    const statCount = await db.dashboardStat.count()
    if (statCount === 0) {
      await db.dashboardStat.createMany({
        data: [
          { metric: 'totalLeads', value: '0' },
          { metric: 'conversionRate', value: '0' },
          { metric: 'activeAgents', value: '6' },
          { metric: 'revenue', value: '$0' },
        ],
        skipDuplicates: true,
      })
    }
  } catch { /* ignore */ }
}

// POST /api/setup
export async function POST() {
  try {
    await ensureTables()
    await seedDefaults()
    const leadCount = await db.lead.count()
    return NextResponse.json({ success: true, message: 'Database setup complete', tables: ['Lead', 'AgentActivity', 'DashboardStat'], existingLeads: leadCount })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('DB Setup error:', msg)
    return NextResponse.json({ error: 'Setup failed', details: msg }, { status: 500 })
  }
}

// GET /api/setup — auto-create tables + return status
export async function GET() {
  try {
    await ensureTables()
    await seedDefaults()
    const leadCount = await db.lead.count()
    return NextResponse.json({ connected: true, message: 'Database ready', tables: ['Lead', 'AgentActivity', 'DashboardStat'], leads: leadCount })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('DB Setup error:', msg)
    return NextResponse.json({ connected: false, error: msg }, { status: 500 })
  }
}
