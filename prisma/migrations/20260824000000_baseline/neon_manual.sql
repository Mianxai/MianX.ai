-- ════════════════════════════════════════════════════════════════════════
-- NEON PRODUCTION MIGRATION SCRIPT
-- Date: 2026-08-24
-- ════════════════════════════════════════════════════════════════════════
--
-- ⚠️  STOP: Do NOT run this without explicit approval.
--
-- This script handles the fact that Neon already has 3 tables
-- (Lead, AgentActivity, DashboardStat) with DashboardStat containing
-- 4 rows of data.
--
-- STRATEGY:
-- 1. Create 10 new tables (safe — no existing data conflicts)
-- 2. Alter existing 3 tables to add missing columns (safe — ADD COLUMN)
-- 3. Add foreign keys to existing tables (requires data validation first)
-- 4. Add indexes to existing tables (safe)
--
-- RISK ASSESSMENT:
-- - DashboardStat: 4 rows, adding no new required columns → SAFE
-- - Lead: 0 rows, adding columns → SAFE
-- - AgentActivity: 0 rows, adding columns → SAFE
--
-- ROLLBACK:
-- - New tables: DROP TABLE (10 tables, no data)
-- - Altered tables: ALTER TABLE DROP COLUMN (reversible)
-- - Foreign keys: ALTER TABLE DROP CONSTRAINT (reversible)
-- - DashboardStat data: BACKUP before running
--
-- ════════════════════════════════════════════════════════════════════════

-- STEP 0: Backup DashboardStat (4 rows of production data)
-- CREATE TABLE "DashboardStat_backup" AS SELECT * FROM "DashboardStat";

-- ════════════════════════════════════════════════════════════════════════
-- STEP 1: CREATE 10 NEW TABLES (no conflicts with existing tables)
-- ════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "Organization" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "industry" TEXT NOT NULL DEFAULT 'general',
    "companySize" TEXT NOT NULL DEFAULT '1-10',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "OrgSettings" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "language" TEXT NOT NULL DEFAULT 'en',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "dateFormat" TEXT NOT NULL DEFAULT 'MM/DD/YYYY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OrgSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Workspace" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "displayName" TEXT NOT NULL DEFAULT '',
    "phone" TEXT,
    "avatarUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Credential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "failedAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "passwordChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" TEXT NOT NULL DEFAULT '[]',
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "UserAudit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actorId" TEXT,
    "eventType" TEXT NOT NULL,
    "metadata" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAudit_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Mission" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "plan" TEXT,
    "resultSummary" TEXT,
    "result" TEXT,
    "budget" INTEGER NOT NULL DEFAULT 100000,
    "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "MissionTask" (
    "id" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "dependsOn" TEXT NOT NULL DEFAULT '[]',
    "result" TEXT,
    "evidence" TEXT,
    "maxSteps" INTEGER NOT NULL DEFAULT 8,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "MissionTask_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AgentExecution" (
    "id" TEXT NOT NULL,
    "missionTaskId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'running',
    "stepNumber" INTEGER NOT NULL DEFAULT 1,
    "decision" TEXT,
    "toolCalls" TEXT NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AgentExecution_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ToolExecution" (
    "id" TEXT NOT NULL,
    "agentExecutionId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "arguments" TEXT NOT NULL,
    "result" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ToolExecution_pkey" PRIMARY KEY ("id")
);

-- ════════════════════════════════════════════════════════════════════════
-- STEP 2: ALTER EXISTING TABLES — Add missing columns
-- ════════════════════════════════════════════════════════════════════════

-- Lead: add missing columns (0 rows, safe)
DO $$ BEGIN
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "organizationId" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "phone" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "company" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "score" INTEGER NOT NULL DEFAULT 50;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "value" TEXT NOT NULL DEFAULT '$0';
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "message" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "assignedTo" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "notes" TEXT;
    ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Lead alter error: %', SQLERRM;
END $$;

-- AgentActivity: add missing columns (0 rows, safe)
DO $$ BEGIN
    ALTER TABLE "AgentActivity" ADD COLUMN IF NOT EXISTS "organizationId" TEXT;
    ALTER TABLE "AgentActivity" ADD COLUMN IF NOT EXISTS "leadId" TEXT;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'AgentActivity alter error: %', SQLERRM;
END $$;

-- DashboardStat: may need id and updatedAt columns (4 rows — PRESERVE)
DO $$ BEGIN
    ALTER TABLE "DashboardStat" ADD COLUMN IF NOT EXISTS "id" TEXT;
    ALTER TABLE "DashboardStat" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'DashboardStat alter error: %', SQLERRM;
END $$;

-- ════════════════════════════════════════════════════════════════════════
-- STEP 3: ADD INDEXES (safe — idempotent with IF NOT EXISTS)
-- ════════════════════════════════════════════════════════════════════════

-- New table indexes
CREATE UNIQUE INDEX IF NOT EXISTS "Organization_code_key" ON "Organization"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "OrgSettings_organizationId_key" ON "OrgSettings"("organizationId");
CREATE INDEX IF NOT EXISTS "Workspace_organizationId_idx" ON "Workspace"("organizationId");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Credential_userId_key" ON "Credential"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_token_idx" ON "Session"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "Role_name_key" ON "Role"("name");
CREATE INDEX IF NOT EXISTS "Member_organizationId_idx" ON "Member"("organizationId");
CREATE INDEX IF NOT EXISTS "Member_userId_idx" ON "Member"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "Member_organizationId_userId_key" ON "Member"("organizationId", "userId");
CREATE INDEX IF NOT EXISTS "UserAudit_userId_idx" ON "UserAudit"("userId");
CREATE INDEX IF NOT EXISTS "UserAudit_eventType_idx" ON "UserAudit"("eventType");

-- Existing table indexes
CREATE INDEX IF NOT EXISTS "Lead_organizationId_idx" ON "Lead"("organizationId");
CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX IF NOT EXISTS "AgentActivity_organizationId_idx" ON "AgentActivity"("organizationId");
CREATE INDEX IF NOT EXISTS "AgentActivity_createdAt_idx" ON "AgentActivity"("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "DashboardStat_metric_key" ON "DashboardStat"("metric");

-- Mission-related indexes
CREATE INDEX IF NOT EXISTS "Mission_organizationId_idx" ON "Mission"("organizationId");
CREATE INDEX IF NOT EXISTS "Mission_userId_idx" ON "Mission"("userId");
CREATE INDEX IF NOT EXISTS "Mission_status_idx" ON "Mission"("status");
CREATE INDEX IF NOT EXISTS "MissionTask_missionId_idx" ON "MissionTask"("missionId");
CREATE INDEX IF NOT EXISTS "MissionTask_status_idx" ON "MissionTask"("status");
CREATE INDEX IF NOT EXISTS "AgentExecution_missionTaskId_idx" ON "AgentExecution"("missionTaskId");
CREATE INDEX IF NOT EXISTS "AgentExecution_agentId_idx" ON "AgentExecution"("agentId");
CREATE INDEX IF NOT EXISTS "ToolExecution_agentExecutionId_idx" ON "ToolExecution"("agentExecutionId");
CREATE INDEX IF NOT EXISTS "ToolExecution_toolName_idx" ON "ToolExecution"("toolName");

-- ════════════════════════════════════════════════════════════════════════
-- STEP 4: ADD FOREIGN KEYS (new tables only — safe, no existing data)
-- ════════════════════════════════════════════════════════════════════════

ALTER TABLE "OrgSettings" ADD CONSTRAINT "OrgSettings_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Credential" ADD CONSTRAINT "Credential_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Member" ADD CONSTRAINT "Member_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Member" ADD CONSTRAINT "Member_roleId_fkey"
    FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "UserAudit" ADD CONSTRAINT "UserAudit_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- NOTE: Lead and AgentActivity FKs to Organization are deferred because:
-- 1. The existing tables may have NULL organizationId values
-- 2. FK requires referencing an existing Organization row
-- These FKs should be added AFTER seeding the first organization.
-- Uncomment when ready:
-- ALTER TABLE "Lead" ADD CONSTRAINT "Lead_organizationId_fkey"
--     FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- ALTER TABLE "AgentActivity" ADD CONSTRAINT "AgentActivity_organizationId_fkey"
--     FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Mission" ADD CONSTRAINT "Mission_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Mission" ADD CONSTRAINT "Mission_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "MissionTask" ADD CONSTRAINT "MissionTask_missionId_fkey"
    FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AgentExecution" ADD CONSTRAINT "AgentExecution_missionTaskId_fkey"
    FOREIGN KEY ("missionTaskId") REFERENCES "MissionTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ToolExecution" ADD CONSTRAINT "ToolExecution_agentExecutionId_fkey"
    FOREIGN KEY ("agentExecutionId") REFERENCES "AgentExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ════════════════════════════════════════════════════════════════════════
-- STEP 5: RECORD MIGRATION IN _prisma_migrations
-- ════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL PRIMARY KEY,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMPTZ,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "started_at", "applied_steps_count")
VALUES (
    'baseline-20260824',
    'phase1-5-manual',
    now(),
    '20260824000000_baseline',
    now(),
    1
) ON CONFLICT DO NOTHING;
