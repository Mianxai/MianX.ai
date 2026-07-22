import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const leads = [
    { name: 'TechCorp Inc.', email: 'contact@techcorp.com', phone: '+1-555-0101', company: 'TechCorp Inc.', source: 'website', status: 'hot', score: 94, value: '$12,500', message: 'Interested in AI automation for sales pipeline' },
    { name: 'Sarah Johnson', email: 'sarah@startupxyz.io', phone: '+1-555-0102', company: 'StartupXYZ', source: 'linkedin', status: 'hot', score: 87, value: '$8,200', message: 'Looking for AI agent solutions' },
    { name: 'GlobalRetail Co.', email: 'info@globalretail.com', phone: '+1-555-0103', company: 'GlobalRetail', source: 'email', status: 'warm', score: 72, value: '$25,000', message: 'Enterprise AI workforce inquiry' },
    { name: 'James Wilson', email: 'james@finserve.com', phone: '+1-555-0104', company: 'FinServe Ltd.', source: 'referral', status: 'warm', score: 65, value: '$18,000', message: 'Referred by existing client' },
    { name: 'CloudBase', email: 'hello@cloudbase.dev', phone: '+1-555-0105', company: 'CloudBase', source: 'api', status: 'hot', score: 91, value: '$15,800', message: 'API integration request for lead management' },
    { name: 'Michael Chen', email: 'mchen@dataflow.ai', phone: '+1-555-0106', company: 'DataFlow AI', source: 'website', status: 'new', score: 45, value: '$5,000', message: 'Want to learn more about MianX.ai' },
    { name: 'Priya Sharma', email: 'priya@nexgen.in', phone: '+91-555-0107', company: 'NexGen Solutions', source: 'linkedin', status: 'warm', score: 78, value: '$22,000', message: 'Interested in enterprise deployment' },
    { name: 'Robert Davis', email: 'rdavis@steelworks.com', phone: '+1-555-0108', company: 'SteelWorks Corp', source: 'referral', status: 'cold', score: 32, value: '$3,500', message: 'General inquiry' },
    { name: 'Emily Zhang', email: 'emily@brightpath.co', phone: '+1-555-0109', company: 'BrightPath', source: 'email', status: 'hot', score: 89, value: '$19,500', message: 'Need AI agents for marketing automation' },
    { name: 'Ahmed Ali', email: 'ahmed@gulftech.ae', phone: '+971-555-0110', company: 'GulfTech', source: 'website', status: 'new', score: 55, value: '$7,200', message: 'AI agency partnership inquiry' },
  ];

  for (const lead of leads) {
    await db.lead.create({ data: lead });
  }

  const activities = [
    { agent: 'Sales AI', action: 'Qualified lead from TechCorp Inc.', status: 'success' },
    { agent: 'Marketing AI', action: 'Sent email campaign to 1,200 prospects', status: 'success' },
    { agent: 'Support AI', action: 'Resolved ticket #4521 for GlobalRetail', status: 'success' },
    { agent: 'Analytics AI', action: 'Generated weekly performance report', status: 'info' },
    { agent: 'Sales AI', action: 'Follow-up email sent to Sarah Johnson', status: 'success' },
    { agent: 'CRM AI', action: 'Updated contact info for CloudBase', status: 'info' },
    { agent: 'Marketing AI', action: 'LinkedIn outreach to 85 prospects', status: 'success' },
    { agent: 'Ops AI', action: 'System health check completed', status: 'info' },
    { agent: 'Sales AI', action: 'Meeting scheduled with BrightPath', status: 'success' },
    { agent: 'Analytics AI', action: 'Lead scoring model updated', status: 'info' },
    { agent: 'Support AI', action: 'Onboarding call completed for NexGen', status: 'success' },
    { agent: 'Sales AI', action: 'Proposal sent to GulfTech', status: 'success' },
  ];

  for (const act of activities) {
    await db.agentActivity.create({ data: act });
  }

  console.log('Seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());