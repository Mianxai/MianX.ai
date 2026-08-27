import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()
const BCRYPT_ROUNDS = 12
const HASH_V2_PREFIX = '$v2$'

async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS)
  return `${HASH_V2_PREFIX}${hash}`
}

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Cleanup existing data (reverse dependency order) ───
  console.log('🧹 Cleaning existing data...')
  await db.agentActivity.deleteMany()
  await db.lead.deleteMany()
  await db.dashboardStat.deleteMany()
  await db.member.deleteMany()
  await db.userAudit.deleteMany()
  await db.session.deleteMany()
  await db.credential.deleteMany()
  await db.user.deleteMany()
  await db.role.deleteMany()
  await db.workspace.deleteMany()
  await db.orgSettings.deleteMany()
  await db.organization.deleteMany()
  console.log('✅ Cleanup complete')

  // ─── 1. Organization ───
  const org = await db.organization.create({
    data: {
      code: 'mianx',
      legalName: 'MianX.ai Inc.',
      displayName: 'MianX.ai',
      description: 'AI-powered lead generation and sales automation platform',
      website: 'https://mianx.ai',
      industry: 'saas',
      companySize: '11-50',
      status: 'active',
    },
  })
  console.log(`✅ Organization created: ${org.displayName} (${org.code})`)

  // ─── 2. OrgSettings ───
  const orgSettings = await db.orgSettings.create({
    data: {
      organizationId: org.id,
      timezone: 'UTC',
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
    },
  })
  console.log(`✅ OrgSettings created for ${org.displayName}`)

  // ─── 3. Workspace ───
  const workspace = await db.workspace.create({
    data: {
      organizationId: org.id,
      name: 'Main Workspace',
      description: 'Default workspace for MianX.ai team',
      status: 'active',
      isDefault: true,
    },
  })
  console.log(`✅ Workspace created: ${workspace.name}`)

  // ─── 4. Roles ───
  const ownerRole = await db.role.create({
    data: {
      name: 'owner',
      description: 'Organization owner with full access',
      permissions: JSON.stringify(['*']),
      isSystem: true,
    },
  })

  const adminRole = await db.role.create({
    data: {
      name: 'admin',
      description: 'Administrator with management access',
      permissions: JSON.stringify(['leads:read', 'leads:write', 'agents:read', 'dashboard:read', 'users:read']),
      isSystem: false,
    },
  })

  const agentRole = await db.role.create({
    data: {
      name: 'agent',
      description: 'Agent with limited read access',
      permissions: JSON.stringify(['leads:read', 'agents:read']),
      isSystem: false,
    },
  })
  console.log(`✅ Roles created: owner, admin, agent`)

  // ─── 5. Users + Credentials ───
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const demoPassword = process.env.DEMO_PASSWORD || 'Demo@123';

  const adminPasswordHash = await hashPassword(adminPassword)
  const aliPasswordHash = await hashPassword(demoPassword)

  const adminUser = await db.user.create({
    data: {
      email: 'admin@mianx.ai',
      passwordHash: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin User',
      phone: '+1-555-0100',
      status: 'active',
      credential: {
        create: {
          passwordHash: adminPasswordHash,
          failedAttempts: 0,
        },
      },
    },
  })

  const aliUser = await db.user.create({
    data: {
      email: 'ali@mianx.ai',
      passwordHash: aliPasswordHash,
      firstName: 'Ali',
      lastName: 'Mian',
      displayName: 'Ali Mian',
      phone: '+1-555-0200',
      status: 'active',
      credential: {
        create: {
          passwordHash: aliPasswordHash,
          failedAttempts: 0,
        },
      },
    },
  })
  console.log(`✅ Users created: ${adminUser.email}, ${aliUser.email}`)

  // ─── 6. Members ───
  await db.member.create({
    data: {
      organizationId: org.id,
      userId: adminUser.id,
      roleId: ownerRole.id,
      status: 'active',
      lastActiveAt: new Date(),
    },
  })

  await db.member.create({
    data: {
      organizationId: org.id,
      userId: aliUser.id,
      roleId: adminRole.id,
      status: 'active',
      lastActiveAt: new Date(),
    },
  })
  console.log(`✅ Members created: admin→owner, ali→admin`)

  // ─── 7. Leads (15) ───
  const leadsData = [
    { name: 'Sarah Chen', email: 'sarah@techcorp.com', phone: '+1-555-1001', company: 'TechCorp Solutions', source: 'website', status: 'new', score: 72, value: '$15,000' },
    { name: 'James Wilson', email: 'james@innovate.io', phone: '+1-555-1002', company: 'Innovate.io', source: 'referral', status: 'hot', score: 95, value: '$32,000' },
    { name: 'Maria Garcia', email: 'maria@globalretail.com', phone: '+1-555-1003', company: 'Global Retail Inc', source: 'linkedin', status: 'warm', score: 68, value: '$8,500' },
    { name: 'David Kim', email: 'david@cloudnine.tech', phone: '+1-555-1004', company: 'CloudNine Technologies', source: 'website', status: 'new', score: 55, value: '$12,000' },
    { name: 'Emma Thompson', email: 'emma@bluewave.co', phone: '+1-555-1005', company: 'BlueWave Consulting', source: 'email_campaign', status: 'converted', score: 88, value: '$45,000' },
    { name: 'Robert Martinez', email: 'robert@nexgen.ai', phone: '+1-555-1006', company: 'NexGen AI Labs', source: 'conference', status: 'hot', score: 91, value: '$28,000' },
    { name: 'Lisa Patel', email: 'lisa@financehub.com', phone: '+1-555-1007', company: 'FinanceHub', source: 'referral', status: 'cold', score: 30, value: '$5,000' },
    { name: 'Michael Brown', email: 'michael@smartlogistics.com', phone: '+1-555-1008', company: 'SmartLogistics', source: 'website', status: 'warm', score: 64, value: '$18,000' },
    { name: 'Jennifer Lee', email: 'jennifer@mediaflux.com', phone: '+1-555-1009', company: 'MediaFlux Digital', source: 'social_media', status: 'new', score: 45, value: '$7,200' },
    { name: 'Andrew Taylor', email: 'andrew@greenenergy.co', phone: '+1-555-1010', company: 'GreenEnergy Solutions', source: 'conference', status: 'lost', score: 20, value: '$22,000' },
    { name: 'Sophie Wang', email: 'sophie@datastream.io', phone: '+1-555-1011', company: 'DataStream Analytics', source: 'linkedin', status: 'hot', score: 87, value: '$35,000' },
    { name: 'Chris Anderson', email: 'chris@buildright.com', phone: '+1-555-1012', company: 'BuildRight Construction', source: 'website', status: 'warm', score: 58, value: '$10,000' },
    { name: 'Natasha Romanov', email: 'natasha@securenet.tech', phone: '+1-555-1013', company: 'SecureNet Technologies', source: 'email_campaign', status: 'new', score: 61, value: '$20,000' },
    { name: 'Daniel Foster', email: 'daniel@eduplus.org', phone: '+1-555-1014', company: 'EduPlus Learning', source: 'referral', status: 'converted', score: 82, value: '$14,500' },
    { name: 'Rachel Green', email: 'rachel@stylecraft.com', phone: '+1-555-1015', company: 'StyleCraft Design', source: 'social_media', status: 'cold', score: 25, value: '$3,800' },
  ]

  const leads: any[] = []
  for (const lead of leadsData) {
    const created = await db.lead.create({
      data: {
        organizationId: org.id,
        ...lead,
        message: `Inquiry from ${lead.name} at ${lead.company}`,
        notes: `Source: ${lead.source}. Initial score: ${lead.score}.`,
      },
    })
    leads.push(created)
  }
  console.log(`✅ ${leads.length} leads created`)

  // ─── 8. Agent Activities (10) ───
  const activitiesData = [
    { agent: 'Lead Qualifier', action: 'qualified_lead', leadId: leads[1].id, status: 'success', metadata: JSON.stringify({ score: 95, reason: 'High intent signals detected' }) },
    { agent: 'Email Agent', action: 'sent_follow_up', leadId: leads[0].id, status: 'success', metadata: JSON.stringify({ template: 'welcome_sequence', subject: 'Welcome to MianX.ai' }) },
    { agent: 'CRM Agent', action: 'updated_lead_status', leadId: leads[4].id, status: 'success', metadata: JSON.stringify({ oldStatus: 'hot', newStatus: 'converted' }) },
    { agent: 'Analytics Agent', action: 'generated_report', status: 'success', metadata: JSON.stringify({ reportType: 'weekly_summary', metrics: { totalLeads: 15, conversionRate: 13.3 } }) },
    { agent: 'Lead Qualifier', action: 'scored_lead', leadId: leads[6].id, status: 'info', metadata: JSON.stringify({ score: 30, reason: 'Low engagement, no response to outreach' }) },
    { agent: 'Email Agent', action: 'sent_email', leadId: leads[3].id, status: 'success', metadata: JSON.stringify({ template: 'product_demo', subject: 'See MianX.ai in Action' }) },
    { agent: 'CRM Agent', action: 'created_task', leadId: leads[10].id, status: 'success', metadata: JSON.stringify({ task: 'Schedule demo call', priority: 'high' }) },
    { agent: 'Analytics Agent', action: 'predicted_churn', leadId: leads[9].id, status: 'warning', metadata: JSON.stringify({ probability: 0.78, factors: ['no_response_14d', 'low_score'] }) },
    { agent: 'Lead Qualifier', action: 'enriched_lead_data', leadId: leads[2].id, status: 'success', metadata: JSON.stringify({ companySize: '200-500', revenue: '$50M', industry: 'retail' }) },
    { agent: 'Email Agent', action: 'email_bounced', leadId: leads[14].id, status: 'error', metadata: JSON.stringify({ error: 'mailbox_full', retryScheduled: true }) },
  ]

  for (const activity of activitiesData) {
    await db.agentActivity.create({
      data: {
        organizationId: org.id,
        ...activity,
      },
    })
  }
  console.log(`✅ ${activitiesData.length} agent activities created`)

  // ─── 9. Dashboard Stats (5) ───
  const statsData = [
    { metric: 'totalLeads', value: '15' },
    { metric: 'conversionRate', value: '13.3' },
    { metric: 'activeAgents', value: '4' },
    { metric: 'avgScore', value: '59.9' },
    { metric: 'weeklyGrowth', value: '8.2' },
  ]

  for (const stat of statsData) {
    await db.dashboardStat.create({ data: stat })
  }
  console.log(`✅ ${statsData.length} dashboard stats created`)

  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
