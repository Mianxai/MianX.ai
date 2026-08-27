// ═══════════════════════════════════════════════════════════════
//  MianX.ai — Agent Processing Engine
//  In-memory agent registry, task queue, and lead processing simulation
// ═══════════════════════════════════════════════════════════════

/* ──────────── Types ──────────── */

export type AgentType = 'qualifier' | 'outreach' | 'analytics' | 'crm' | 'support' | 'custom' | 'upgrade';

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  capabilities: string[];
  config: Record<string, any>;
}

export interface AgentTask {
  id: string;
  agentId: string;
  leadId?: string;
  type: string;
  payload: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface AgentResult {
  success: boolean;
  action: string;
  data: Record<string, any>;
  confidence: number;
}

export interface AgentStatus {
  agentId: string;
  name: string;
  type: AgentType;
  state: 'idle' | 'processing';
  tasksCompleted: number;
  tasksInQueue: number;
  tasksFailed: number;
  lastActivity: Date | null;
}
/* ──────────── Agent Registry ──────────── */

export const AGENT_REGISTRY: AgentDefinition[] = [
  {
    id: 'lead-qualifier',
    name: 'Lead Qualifier AI',
    description: 'Analyzes lead quality, assigns score, recommends status change based on completeness and engagement signals',
    type: 'qualifier',
    capabilities: ['lead-scoring', 'status-recommendation', 'completeness-check', 'engagement-analysis'],
    config: { autoScore: true, minScoreForHot: 75, minScoreForWarm: 50 },
  },
  {
    id: 'email-outreach',
    name: 'Email Outreach AI',
    description: 'Drafts personalized emails, tracks engagement metrics, and manages follow-up sequences',
    type: 'outreach',
    capabilities: ['email-drafting', 'personalization', 'engagement-tracking', 'follow-up-sequencing'],
    config: { tone: 'professional', maxFollowUps: 3, delayHours: 24 },
  },
  {
    id: 'crm-sync',
    name: 'CRM Sync Agent',
    description: 'Syncs lead data to organization records, ensures data consistency across systems',
    type: 'crm',
    capabilities: ['data-sync', 'field-mapping', 'duplicate-detection', 'record-matching'],
    config: { syncInterval: '5m', conflictStrategy: 'latest-wins' },
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    description: 'Generates insights from lead data, identifies trends, and produces summary statistics',
    type: 'analytics',
    capabilities: ['trend-analysis', 'summary-stats', 'conversion-funnel', 'source-attribution'],
    config: { lookbackDays: 30, includeCharts: true },
  },
  {
    id: 'support-copilot',
    name: 'Support Copilot',
    description: 'Handles customer queries, generates suggested responses based on lead context and history',
    type: 'support',
    capabilities: ['query-understanding', 'response-generation', 'knowledge-base-search', 'escalation-detection'],
    config: { maxResponseLength: 500, escalationThreshold: 0.3 },
  },
  {
    id: 'data-enrichment',
    name: 'Data Enrichment AI',
    description: 'Enriches lead data with additional info like company size, industry, social profiles, and technographics',
    type: 'custom',
    capabilities: ['company-lookup', 'social-finding', 'technographics', 'firmographic-enrichment'],
    config: { sources: ['linkedin', 'clearbit', 'hunter'], autoEnrich: true },
  },
  {
    id: 'self-upgrade',
    name: 'Self-Upgrade Agent',
    description: 'Reads specification documents, analyzes platform gaps, and executes autonomous upgrades within Constitutional authority bounds',
    type: 'upgrade',
    capabilities: ['spec-scanning', 'coverage-analysis', 'gap-detection', 'upgrade-planning', 'auto-execution', 'audit-logging'],
    config: { autoScanInterval: '1h', maxRiskClass: 'R1', requireApproval: true },
  },
];

/* ──────────── In-memory Task Queue ──────────── */

const taskQueue: AgentTask[] = [];

// Track per-agent stats (survives across requests in server memory)
const agentStats: Record<string, { completed: number; failed: number; lastActivity: Date | null }> = {};

// Initialize stats for all registered agents
for (const agent of AGENT_REGISTRY) {
  agentStats[agent.id] = { completed: 0, failed: 0, lastActivity: null };
}

type LeadLike = {
  id?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  source?: string | null;
  status?: string | null;
  score?: number | null;
  value?: string | null;
  message?: string | null;
};

/* ──────────── Core Processing Functions ──────────── */

/**
 * Simulate AI processing of a lead by a specific agent.
 * Returns an AgentResult with action, data, and confidence.
 */
export function processLead(lead: LeadLike, agentId: string): AgentResult {
  const agent = AGENT_REGISTRY.find(a => a.id === agentId);
  if (!agent) {
    return { success: false, action: 'error', data: { reason: `Agent ${agentId} not found` }, confidence: 0 };
  }

  switch (agent.type) {
    case 'qualifier':
      return qualifyLead(lead);
    case 'outreach':
      return generateOutreach(lead);
    case 'crm':
      return syncToCRM(lead);
    case 'analytics':
      return generateAnalytics(lead);
    case 'support':
      return generateSupportResponse(lead);
    case 'custom':
      return enrichLeadData(lead);
    case 'upgrade':
      return analyzeSelfUpgrade(lead);
    default:
      return { success: false, action: 'error', data: { reason: 'Unknown agent type' }, confidence: 0 };
  }
}

/** Self-Upgrade: return spec coverage info */
function analyzeSelfUpgrade(_lead: LeadLike): AgentResult {
  return {
    success: true,
    action: 'self_upgrade_analysis',
    data: {
      summary: 'Self-Upgrade Agent analyzed platform specifications against current implementation',
      capabilities: [
        'spec-scanning: Reads markdown specification files from upload directory',
        'coverage-analysis: Compares spec requirements against existing codebase',
        'gap-detection: Identifies unimplemented APIs, DB models, and features',
        'upgrade-planning: Generates prioritized upgrade tasks with risk classification',
        'auto-execution: Automatically executes R0 (read-only) and R1 (reversible) tasks',
        'audit-logging: Creates AgentActivity records for all upgrade operations',
      ],
      constitutionalBounds: {
        maxAutoRiskClass: 'R1',
        approvalRequired: true,
        r2PlusBlocked: 'R2/R3/R4 tasks require human approval per AI Constitution',
        readOnlyMode: true,
      },
      availableEndpoints: [
        'GET /api/agents/upgrade — Spec coverage report',
        'POST /api/agents/upgrade — Start upgrade session',
        'GET /api/agents/upgrade/:sessionId — Session status',
        'POST /api/agents/upgrade/:sessionId — Execute a task',
        'PATCH /api/agents/upgrade/:sessionId — Pause/resume session',
      ],
      analyzedAt: new Date().toISOString(),
    },
    confidence: 0.92,
  };
}

/** Qualifier: analyze lead fields and return score recommendation + status change */
function qualifyLead(lead: LeadLike): AgentResult {
  let score = 20; // base
  const factors: Record<string, boolean> = {};

  if (lead.name) { score += 8; factors.hasName = true; }
  if (lead.email) { score += 12; factors.hasEmail = true; }
  if (lead.phone) { score += 15; factors.hasPhone = true; }
  if (lead.company) { score += 15; factors.hasCompany = true; }
  if (lead.message && lead.message.length > 20) { score += 10; factors.hasDetailedMessage = true; }
  if (lead.value && lead.value !== '$0') { score += 10; factors.hasBudget = true; }
  if (lead.source === 'referral') { score += 5; factors.isReferral = true; }
  if (lead.source === 'demo_request') { score += 10; factors.isDemoRequest = true; }

  score = Math.min(100, score);

  let recommendedStatus: string;
  if (score >= 75) recommendedStatus = 'hot';
  else if (score >= 50) recommendedStatus = 'warm';
  else if (score >= 30) recommendedStatus = 'new';
  else recommendedStatus = 'cold';

  return {
    success: true,
    action: 'qualify',
    data: {
      score,
      recommendedStatus,
      previousStatus: lead.status || 'new',
      factors,
      reasoning: `Lead has ${Object.values(factors).filter(Boolean).length}/8 positive signals. Score increased from ${lead.score || 0} to ${score}.`,
    },
    confidence: 0.85,
  };
}

/** Outreach: generate a draft email subject + body based on lead info */
function generateOutreach(lead: LeadLike): AgentResult {
  const firstName = (lead.name || '').split(' ')[0] || 'there';
  const company = lead.company || 'your company';
  const source = lead.source || 'our website';

  const subjects = [
    `Quick question about ${company}'s growth plans`,
    `Following up from ${source} — ${firstName}`,
    `${company} + MianX: A potential fit?`,
    `Saw you came through ${source}, ${firstName}`,
  ];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  const bodies = [
    `Hi ${firstName},\n\nI noticed ${company} came through ${source} recently. Based on what I can see, there might be a strong alignment between what your team is building and how we help organizations like yours streamline lead management.\n\nWould you be open to a brief 15-minute call this week to explore whether it makes sense to talk further?\n\nBest,\nThe MianX Team`,
    `Hi ${firstName},\n\nThanks for your interest from ${source}. I wanted to reach out personally because companies in ${company}'s space have been seeing great results with our platform — particularly around lead qualification and automated outreach.\n\nDo you have 10 minutes this week for a quick overview?\n\nCheers,\nThe MianX Team`,
  ];
  const body = bodies[Math.floor(Math.random() * bodies.length)];

  return {
    success: true,
    action: 'outreach',
    data: {
      subject,
      body,
      recipient: lead.email,
      type: 'initial_outreach',
      followUpScheduled: true,
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    confidence: 0.78,
  };
}

/** CRM: confirm sync success */
function syncToCRM(lead: LeadLike): AgentResult {
  const fields = ['name', 'email', 'phone', 'company', 'source', 'status', 'score'];
  const syncedFields: string[] = [];
  const missingFields: string[] = [];

  for (const field of fields) {
    if (lead[field as keyof LeadLike]) {
      syncedFields.push(field);
    } else {
      missingFields.push(field);
    }
  }

  return {
    success: true,
    action: 'crm_sync',
    data: {
      leadId: lead.id,
      syncedFields,
      missingFields,
      totalFieldsSynced: syncedFields.length,
      totalFields: fields.length,
      syncPercentage: Math.round((syncedFields.length / fields.length) * 100),
      duplicateCheck: 'no_duplicates_found',
      syncedAt: new Date().toISOString(),
    },
    confidence: 0.95,
  };
}

/** Analytics: return summary stats */
function generateAnalytics(_lead: LeadLike): AgentResult {
  return {
    success: true,
    action: 'analytics',
    data: {
      summary: 'Lead analytics snapshot generated',
      insights: [
        'Top conversion source: referral leads convert 2.3x higher than organic',
        'Leads with phone numbers have 40% higher qualification rates',
        'Average response time to new leads: under 2 minutes',
        'Warm leads from demos show 67% conversion probability',
      ],
      metrics: {
        qualificationRate: 0.72,
        avgScore: 58,
        outreachOpenRate: 0.45,
        responseRate: 0.23,
      },
      generatedAt: new Date().toISOString(),
    },
    confidence: 0.82,
  };
}

/** Support: generate a suggested response */
function generateSupportResponse(lead: LeadLike): AgentResult {
  const firstName = (lead.name || '').split(' ')[0] || 'there';
  const message = lead.message || '';

  let suggestedResponse: string;
  if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('pricing')) {
    suggestedResponse = `Hi ${firstName}, thanks for reaching out about pricing! I'd love to get you the most accurate information. Could you tell me a bit more about your team size and what features are most important to you? This way I can recommend the best plan for ${lead.company || 'your organization'}.`;
  } else if (message.toLowerCase().includes('demo') || message.toLowerCase().includes('trial')) {
    suggestedResponse = `Hi ${firstName}, great to hear you're interested in a demo! I can set that up for you right away. What day and time works best for your team at ${lead.company || 'your company'}? We typically do 30-minute sessions where we walk through the platform and answer any questions.`;
  } else if (message.toLowerCase().includes('integrat') || message.toLowerCase().includes('connect')) {
    suggestedResponse = `Hi ${firstName}, thanks for asking about integrations! We support a wide range of tools including Salesforce, HubSpot, Slack, and Zapier. Could you share which specific tools your team at ${lead.company || 'your company'} uses? I'll make sure we cover those in our discussion.`;
  } else {
    suggestedResponse = `Hi ${firstName}, thank you for your interest! I'd be happy to help you learn more about how MianX can benefit ${lead.company || 'your team'}. Could you share a bit more about what you're looking to achieve? This will help me provide the most relevant information.`;
  }

  return {
    success: true,
    action: 'support_response',
    data: {
      suggestedResponse,
      leadId: lead.id,
      detectedIntent: message.includes('price') || message.includes('cost') ? 'pricing_inquiry'
        : message.includes('demo') ? 'demo_request'
        : message.includes('integrat') ? 'integration_question'
        : 'general_inquiry',
      confidence: 0.88,
      needsEscalation: false,
      suggestedPriority: 'medium',
    },
    confidence: 0.88,
  };
}

/** Enrichment: suggest additional data points */
function enrichLeadData(lead: LeadLike): AgentResult {
  const suggestions: Record<string, string> = {};
  if (!lead.company) {
    suggestions.companySuggestion = 'Could not determine company — suggest asking the lead';
  }
  if (!lead.phone) {
    suggestions.phoneSuggestion = 'Phone number missing — consider requesting via email';
  }

  return {
    success: true,
    action: 'enrich',
    data: {
      leadId: lead.id,
      enrichmentResults: {
        companySize: lead.company ? '51-200 employees (estimated)' : null,
        industry: lead.company ? 'Technology' : null,
        location: 'San Francisco, CA (estimated from email domain)',
        socialProfiles: lead.company ? {
          linkedin: `https://linkedin.com/company/${lead.company.toLowerCase().replace(/\s+/g, '-')}`,
          twitter: `@${lead.company?.toLowerCase().replace(/\s+/g, '')}`,
        } : null,
        technographics: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        annualRevenue: '$5M - $20M (estimated)',
      },
      suggestions,
      dataPointsFound: 5,
      dataPointsMissing: Object.keys(suggestions).length,
      enrichedAt: new Date().toISOString(),
    },
    confidence: 0.72,
  };
}

/* ──────────── Task Queue Management ──────────── */

/** Generate a unique task ID */
function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Add a task to the in-memory queue.
 * Returns the task ID.
 */
export function queueTask(task: Omit<AgentTask, 'id' | 'status' | 'createdAt'>): string {
  const id = generateTaskId();
  const newTask: AgentTask = {
    ...task,
    id,
    status: 'pending',
    createdAt: new Date(),
  };
  taskQueue.push(newTask);
  return id;
}

/**
 * Process all pending tasks in the queue.
 * Returns results for all processed tasks.
 */
export function processQueue(): AgentTask[] {
  const processed: AgentTask[] = [];
  const pending = taskQueue.filter(t => t.status === 'pending');

  for (const task of pending) {
    task.status = 'running';
    task.startedAt = new Date();

    try {
      // Simulate processing using the agent engine
      const result = processLead(task.payload.lead || {}, task.agentId);
      task.result = result;
      task.status = result.success ? 'completed' : 'failed';

      // Update agent stats
      if (agentStats[task.agentId]) {
        agentStats[task.agentId].completed += result.success ? 1 : 0;
        agentStats[task.agentId].failed += result.success ? 0 : 1;
        agentStats[task.agentId].lastActivity = new Date();
      }
    } catch (error: any) {
      task.status = 'failed';
      task.error = error.message || 'Unknown processing error';

      if (agentStats[task.agentId]) {
        agentStats[task.agentId].failed += 1;
        agentStats[task.agentId].lastActivity = new Date();
      }
    }

    task.completedAt = new Date();
    processed.push(task);
  }

  return processed;
}

/**
 * Get the current status of a specific agent.
 */
export function getAgentStatus(agentId: string): AgentStatus | null {
  const agent = AGENT_REGISTRY.find(a => a.id === agentId);
  const stats = agentStats[agentId];
  if (!agent || !stats) return null;

  const queuedCount = taskQueue.filter(t => t.agentId === agentId && t.status === 'pending').length;
  const runningCount = taskQueue.filter(t => t.agentId === agentId && t.status === 'running').length;

  return {
    agentId: agent.id,
    name: agent.name,
    type: agent.type,
    state: (queuedCount + runningCount) > 0 ? 'processing' : 'idle',
    tasksCompleted: stats.completed,
    tasksInQueue: queuedCount + runningCount,
    tasksFailed: stats.failed,
    lastActivity: stats.lastActivity,
  };
}

/**
 * Get status for all registered agents.
 */
export function getAllAgentStatuses(): AgentStatus[] {
  return AGENT_REGISTRY.map(agent => getAgentStatus(agent.id)!);
}

/**
 * Get recent tasks from the queue for a specific agent.
 */
export function getRecentTasks(agentId?: string, limit = 20): AgentTask[] {
  let tasks = agentId
    ? taskQueue.filter(t => t.agentId === agentId)
    : [...taskQueue];

  return tasks
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

/**
 * Clear completed/failed tasks older than a certain age.
 */
export function pruneOldTasks(maxAgeMs = 30 * 60 * 1000): number {
  const cutoff = Date.now() - maxAgeMs;
  let pruned = 0;
  for (let i = taskQueue.length - 1; i >= 0; i--) {
    const task = taskQueue[i];
    if ((task.status === 'completed' || task.status === 'failed') && task.completedAt && task.completedAt.getTime() < cutoff) {
      taskQueue.splice(i, 1);
      pruned++;
    }
  }
  return pruned;
}