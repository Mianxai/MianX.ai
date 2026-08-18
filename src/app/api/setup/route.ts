import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/setup — Auto-create tables on first request
// Uses raw SQL to create tables if they don't exist (works without prisma cli)
export async function POST() {
  try {
    // Test connection and create tables via raw SQL
    await db.$executeRawUnsafe(`
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
      );

      CREATE TABLE IF NOT EXISTS "AgentActivity" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "agent" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "leadId" TEXT,
        "status" TEXT NOT NULL DEFAULT 'info',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "DashboardStat" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "metric" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      DO $$ BEGIN
        CREATE UNIQUE INDEX IF NOT EXISTS "DashboardStat_metric_key" ON "DashboardStat"("metric");
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `)

    // Verify
    const leadCount = await db.lead.count()

    // Insert default stats if empty
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

    return NextResponse.json({
      success: true,
      message: 'Database setup complete',
      tables: ['Lead', 'AgentActivity', 'DashboardStat'],
      existingLeads: leadCount,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('DB Setup error:', msg)
    return NextResponse.json(
      { error: 'Setup failed', details: msg },
      { status: 500 }
    )
  }
}

// GET /api/setup — Auto-setup: create tables if missing, then return status
export async function GET() {
  try {
    // First, ensure tables exist
    await db.$executeRawUnsafe(`
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
      );

      CREATE TABLE IF NOT EXISTS "AgentActivity" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "agent" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "leadId" TEXT,
        "status" TEXT NOT NULL DEFAULT 'info',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "DashboardStat" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "metric" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      DO $$ BEGIN
        CREATE UNIQUE INDEX IF NOT EXISTS "DashboardStat_metric_key" ON "DashboardStat"("metric");
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `)

    // Insert default stats if empty
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
    } catch { /* stats table might not be visible to Prisma yet, that's ok */ }

    const leadCount = await db.lead.count()
    return NextResponse.json({
      connected: true,
      message: 'Database ready',
      tables: ['Lead', 'AgentActivity', 'DashboardStat'],
      leads: leadCount,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({
      connected: false,
      error: msg,
    }, { status: 500 })
  }
}
