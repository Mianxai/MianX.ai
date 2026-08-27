import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import type { PoolConfig } from '@neondatabase/serverless'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Support both Vercel (POSTGRES_URL_NON_POOLING) and local dev (DATABASE_URL)
  const databaseUrl =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    ''

  if (!databaseUrl) {
    throw new Error('DATABASE_URL or POSTGRES_URL_NON_POOLING environment variable is not set')
  }

  const poolConfig: PoolConfig = { connectionString: databaseUrl }
  const adapter = new PrismaNeon(poolConfig)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
