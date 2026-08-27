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

  const poolConfig: PoolConfig = {
    connectionString: databaseUrl,
    // Configurable pool settings with production-safe defaults
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS || '10000', 10),
  }

  const adapter = new PrismaNeon(poolConfig)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
