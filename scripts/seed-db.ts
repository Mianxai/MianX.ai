import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const leadData = [
  { name: 'Sarah Johnson', email: 'sarah@techcorp.com', phone: '+1-555-0101', company: 'TechCorp Inc', source: 'website', status: 'hot', score: 92, value: '$15,000', message: 'Interested in enterprise AI agents for our sales team', assignedTo: 'Sales AI' },
  { name: 'Michael Chen', email: 'mchen@dataflow.io', phone: '+1-555-0102', company: 'DataFlow', source: 'linkedin', status: 'hot', score: 88, value: '$12,500', message: 'Looking for AI-powered lead management solution', assignedTo: 'Sales AI' },
  { name: 'Emily Rodriguez', email: 'emily@growthlab.co', phone: '+1-555-0103', company: 'GrowthLab', source: 'email', status: 'warm', score: 72, value: '$8,000', message: 'Want to automate our lead nurturing process', assignedTo: 'Marketing AI' },
  { name: 'James Wilson', email: 'jwilson@nexgen.ai', phone: '+1-555-0104', company: 'NexGen Solutions', source: 'website', status: 'hot', score: 95, value: '$22,000', message: 'Need full AI workforce deployment for our agency', assignedTo: 'Sales AI' },
  { name: 'Aisha Patel', email: 'aisha@cloudscale.com', phone: '+1-555-0105', company: 'CloudScale', source: 'referral', status: 'warm', score: 68, value: '$9,500', message: 'Referred by James Wilson - interested in AI ops', assignedTo: 'Ops AI' },
  { name: 'David Kim', email: 'dkim@stellarx.io', phone: '+1-555-0106', company: 'StellarX', source: 'api', status: 'new', score: 45, value: '$3,000', message: null, assignedTo: null },
  { name: 'Lisa Thompson', email: 'lisa@bluewave.co', phone: '+1-555-0107', company: 'BlueWave Media', source: 'website', status: 'new', score: 52, value: '$5,500', message: 'Saw the demo, wants to learn more about pricing', assignedTo: null },
  { name: 'Robert Martinez', email: 'rmartinez@zenithgroup.com', phone: '+1-555-0108', company: 'Zenith Group', source: 'linkedin', status: 'warm', score: 75, value: '$11,000', message: 'Interested in multi-agent deployment for marketing', assignedTo: 'Marketing AI' },
  { name: 'Sophie Laurent', email: 'sophie@eurotech.fr', phone: '+33-555-0109', company: 'EuroTech Solutions', source: 'email', status: 'hot', score: 85, value: '$18,000', message: 'Enterprise client looking for complete AI agency platform', assignedTo: 'Sales AI' },
  { name: 'Alex Nakamura', email: 'alex@tokyodev.jp', phone: '+81-555-0110', company: 'TokyoDev', source: 'referral', status: 'new', score: 40, value: '$2,500', message: null, assignedTo: null },
  { name: 'Rachel Green', email: 'rgreen@startuphub.com', phone: '+1-555-0111', company: 'StartupHub', source: 'website', status: 'cold', score: 25, value: '$1,000', message: 'Not ready yet, keeping for future follow-up', assignedTo: null },
  { name: 'Omar Hassan', email: 'omar@gulftech.ae', phone: '+971-555-0112', company: 'GulfTech', source: 'api', status: 'warm', score: 65, value: '$7,500', message: 'API integration for existing CRM system', assignedTo: 'CRM AI' },
  { name: 'Nina Petrov', email: 'nina@balticdata.ee', phone: '+372-555-0113', company: 'Baltic Data', source: 'linkedin', status: 'new', score: 55, value: '$4,000', message: 'Exploring AI options for data processing leads', assignedTo: null },
  { name: 'Chris Taylor', email: 'ctaylor@velocitysales.com', phone: '+1-555-0114', company: 'Velocity Sales', source: 'website', status: 'hot', score: 90, value: '$20,000', message: 'Ready to deploy - need onboarding ASAP', assignedTo: 'Sales AI' },
  { name: 'Maria Santos', email: 'maria@latamdigital.br', phone: '+55-555-0115', company: 'LatAm Digital', source: 'referral', status: 'warm', score: 70, value: '$6,500', message: 'Regional partnership opportunity for Latin America', assignedTo: 'Marketing AI' },
  { name: 'Kevin O\'Brien', email: 'kevin@irish tech.ie', phone: '+353-555-0116', company: null, source: 'email', status: 'cold', score: 20, value: '$500', message: 'General inquiry about AI agents', assignedTo: null },
  { name: 'Yuki Tanaka', email: 'yuki@osakaai.jp', phone: '+81-555-0117', company: 'Osaka AI Lab', source: 'api', status: 'new', score: 48, value: '$3,500', message: 'Testing API for lead scoring integration', assignedTo: null },
  { name: 'Laura Mueller', email: 'laura@berlinstartup.de', phone: '+49-555-0118', company: 'Berlin Startup Hub', source: 'linkedin', status: 'warm', score: 62, value: '$5,000', message: 'Interested in pilot program for 3 months', assignedTo: 'Support AI' },
]

const agentNames = ['Sales AI', 'Marketing AI', 'Support AI', 'Analytics AI', 'CRM AI', 'Ops AI']
const actions = [
  { agent: 'Sales AI', actions: ['Qualified lead: Sarah Johnson (score: 92)', 'Follow-up email sent to Michael Chen', 'Proposal generated for James Wilson', 'Lead score updated for Chris Taylor', 'Initial contact made with Sophie Laurent'] },
  { agent: 'Marketing AI', actions: ['Nurture sequence started for Emily Rodriguez', 'Campaign analysis completed - Q2 results', 'Content strategy generated for GrowthLab', 'Social media scan for new leads', 'Email drip campaign activated for Maria Santos'] },
  { agent: 'Support AI', actions: ['Response sent to Lisa Thompson inquiry', 'FAQ updated based on common questions', 'Support ticket created for Omar Hassan', 'Live chat simulation completed', 'Onboarding docs sent to Laura Mueller'] },
  { agent: 'Analytics AI', actions: ['Lead scoring model updated - v2.3', 'Conversion funnel analysis completed', 'Weekly performance report generated', 'Pipeline value forecast: $164,000', 'Source attribution report ready'] },
  { agent: 'Ops AI', actions: ['System health check: all services nominal', 'Database optimization completed', 'API rate limits adjusted for peak hours', 'Backup verification successful', 'Performance metrics within SLA'] },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await db.lead.deleteMany()
  await db.agentActivity.deleteMany()
  await db.dashboardStat.deleteMany()

  // Create leads with staggered timestamps
  for (let i = 0; i < leadData.length; i++) {
    const lead = leadData[i]
    const daysAgo = Math.floor(i / 3)
    const hoursAgo = (i % 3) * 6
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)
    createdAt.setHours(createdAt.getHours() - hoursAgo)

    await db.lead.create({
      data: { ...lead, createdAt, updatedAt: createdAt },
    })
  }
  console.log(`✅ Created ${leadData.length} leads`)

  // Create agent activities
  let actCount = 0
  for (const group of actions) {
    for (const action of group.actions) {
      const hoursAgo = Math.floor(Math.random() * 48)
      const createdAt = new Date()
      createdAt.setHours(createdAt.getHours() - hoursAgo)

      await db.agentActivity.create({
        data: {
          agent: group.agent,
          action,
          status: Math.random() > 0.1 ? 'success' : 'info',
          createdAt,
        },
      })
      actCount++
    }
  }
  console.log(`✅ Created ${actCount} agent activities`)

  // Create dashboard stats
  const statsData = [
    { metric: 'totalLeads', value: leadData.length.toString() },
    { metric: 'activeAgents', value: '5' },
    { metric: 'conversions', value: '5' },
  ]
  for (const stat of statsData) {
    await db.dashboardStat.upsert({
      where: { metric: stat.metric },
      update: { value: stat.value },
      create: stat,
    })
  }
  console.log('✅ Dashboard stats updated')
  console.log('🎉 Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
