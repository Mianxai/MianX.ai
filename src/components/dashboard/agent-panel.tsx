"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bot, Zap, CheckCircle2, XCircle, Clock, Brain, Target, MessageSquare, Cpu,
  Shield, Scale, DollarSign, Users, BarChart3, Lock, Globe, FileSearch,
  AlertTriangle, Pause, RotateCcw, Play, ChevronRight, ChevronDown,
  Activity, Eye, Ban, RefreshCw, ArrowUpRight, ArrowDownRight,
  Crown, Mail, Database, Search, type LucideIcon, Loader2, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════ CONSTITUTIONAL TYPES ══════════════════════════ */

const HIERARCHY_LEVELS = [
  { level: "L1", label: "AI CEO", desc: "Enterprise strategy & executive coordination" },
  { level: "L2", label: "C-Suite", desc: "Domain strategy, policy execution, budgets" },
  { level: "L3", label: "Director", desc: "Department programs & standards" },
  { level: "L4", label: "Manager", desc: "Work planning & delivery coordination" },
  { level: "L5", label: "Specialist", desc: "Bounded task execution" },
] as const;

const RISK_CLASSES = [
  { cls: "R0", label: "Read-Only", color: "#00FF88", desc: "Autonomous within task" },
  { cls: "R1", label: "Reversible", color: "#00D4FF", desc: "Autonomous with evidence" },
  { cls: "R2", label: "Controlled", color: "#FFD93D", desc: "Manager approval" },
  { cls: "R3", label: "Production", color: "#FF8C42", desc: "Independent approval" },
  { cls: "R4", label: "Critical", color: "#FF4444", desc: "Executive / Founder approval" },
] as const;

const LIFECYCLE_STAGES = [
  "Requested", "Designed", "Reviewed", "Evaluated", "Approved",
  "Provisioned", "Activated", "Monitored", "Updated", "Suspended", "Retired",
] as const;

type CsuiteDomain = "Technology" | "Operations" | "Finance" | "Marketing" | "Product" | "Sales" | "HR" | "Security" | "Legal" | "Research" | "Data & Analytics";

/* ══════════════════════════ AGENT ENGINE TYPES (from engine.ts) ══════════════════════════ */

interface EngineAgent {
  id: string;
  name: string;
  description: string;
  type: 'qualifier' | 'outreach' | 'analytics' | 'crm' | 'support' | 'custom';
  capabilities: string[];
  config: Record<string, any>;
  state?: 'idle' | 'processing';
  tasksCompleted?: number;
  tasksInQueue?: number;
  tasksFailed?: number;
  lastActivity?: string | null;
  recentActivityCount?: number;
}

interface DBActivity {
  id: string;
  agent: string;
  action: string;
  leadId?: string | null;
  status: string;
  metadata?: string | null;
  createdAt: string;
}

/* ══════════════════════════ AGENT TYPE ICON MAP ══════════════════════════ */

const AGENT_TYPE_ICONS: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  qualifier: { icon: Bot, color: "#FF4D00", label: "Qualifier" },
  outreach: { icon: Mail, color: "#00D4FF", label: "Outreach" },
  crm: { icon: Database, color: "#A78BFA", label: "CRM" },
  analytics: { icon: BarChart3, color: "#FFD93D", label: "Analytics" },
  support: { icon: MessageSquare, color: "#00FF88", label: "Support" },
  custom: { icon: Search, color: "#FF6B6B", label: "Enrichment" },
};

/* ══════════════════════════ CONSTITUTIONAL AGENT TYPE ══════════════════════════ */

interface Agent {
  id: string;
  name: string;
  role: string;
  domain: CsuiteDomain;
  hierarchyLevel: string;
  lifecycleStage: string;
  status: "active" | "idle" | "processing" | "suspended" | "halted";
  tasksCompleted: number;
  tasksQueued: number;
  tasksFailed: number;
  successRate: number;
  avgResponseTime: string;
  lastActive: string;
  capabilities: string[];
  tools: string[];
  riskClass: string;
  complianceStatus: "compliant" | "warning" | "violation";
  violations: number;
  constitutionVersion: string;
  promptVersion: string;
  modelProvider: string;
  modelName: string;
  costThisSession: string;
  uptime: string;
  icon: LucideIcon;
  color: string;
}

const CONSTITUTIONAL_AGENTS: Agent[] = [
  {
    id: "ceo-ai", name: "AI CEO", role: "Enterprise Strategy & Executive Coordination",
    domain: "Product", hierarchyLevel: "L1", lifecycleStage: "Activated",
    status: "active", tasksCompleted: 89, tasksQueued: 3, tasksFailed: 0,
    successRate: 100, avgResponseTime: "2.1s", lastActive: "Just now",
    capabilities: ["Strategy translation", "C-Suite coordination", "Program prioritization", "Risk escalation", "Performance review"],
    tools: ["Strategy Engine", "Resource Allocator", "Risk Evaluator", "Policy Checker"],
    riskClass: "R4", complianceStatus: "compliant", violations: 0,
    constitutionVersion: "1.0.0", promptVersion: "3.2.1", modelProvider: "OpenAI", modelName: "GPT-4o",
    costThisSession: "$142.50", uptime: "99.97%",
    icon: Crown, color: "#FF4D00",
  },
  {
    id: "sales-ai", name: "Sales AI", role: "Lead Qualification & Conversion",
    domain: "Sales", hierarchyLevel: "L3", lifecycleStage: "Activated",
    status: "active", tasksCompleted: 147, tasksQueued: 5, tasksFailed: 8,
    successRate: 94, avgResponseTime: "1.2s", lastActive: "Just now",
    capabilities: ["Lead scoring", "Auto-qualify", "Follow-up generation", "Deal tracking", "Pipeline analysis"],
    tools: ["Lead Scorer", "CRM Connector", "Email Composer", "Deal Tracker"],
    riskClass: "R2", complianceStatus: "compliant", violations: 0,
    constitutionVersion: "1.0.0", promptVersion: "2.8.0", modelProvider: "OpenAI", modelName: "GPT-4o-mini",
    costThisSession: "$87.30", uptime: "99.82%",
    icon: Target, color: "#FF4D00",
  },
  {
    id: "marketing-ai", name: "Marketing AI", role: "Campaign Intelligence & Analytics",
    domain: "Marketing", hierarchyLevel: "L3", lifecycleStage: "Activated",
    status: "processing", tasksCompleted: 231, tasksQueued: 12, tasksFailed: 4,
    successRate: 97, avgResponseTime: "0.8s", lastActive: "2 min ago",
    capabilities: ["Campaign analysis", "A/B testing", "Audience segmentation", "Content optimization", "Channel attribution"],
    tools: ["Campaign Analyzer", "A/B Engine", "Segment Builder", "Content Optimizer"],
    riskClass: "R1", complianceStatus: "compliant", violations: 0,
    constitutionVersion: "1.0.0", promptVersion: "3.1.0", modelProvider: "Anthropic", modelName: "Claude 3.5",
    costThisSession: "$203.15", uptime: "99.91%",
    icon: Zap, color: "#00D4FF",
  },
  {
    id: "support-ai", name: "Customer Success AI", role: "Ticket Resolution & Customer Retention",
    domain: "Product", hierarchyLevel: "L4", lifecycleStage: "Activated",
    status: "active", tasksCompleted: 89, tasksQueued: 3, tasksFailed: 7,
    successRate: 91, avgResponseTime: "2.1s", lastActive: "30s ago",
    capabilities: ["Auto-response", "Ticket routing", "Knowledge base", "Escalation", "Sentiment analysis"],
    tools: ["Ticket Router", "KB Search", "Sentiment Analyzer", "Escalation Trigger"],
    riskClass: "R1", complianceStatus: "warning", violations: 1,
    constitutionVersion: "1.0.0", promptVersion: "2.5.2", modelProvider: "OpenAI", modelName: "GPT-4o-mini",
    costThisSession: "$56.80", uptime: "98.74%",
    icon: MessageSquare, color: "#00FF88",
  },
  {
    id: "analytics-ai", name: "Data & Analytics AI", role: "Predictive Insights & Business Intelligence",
    domain: "Data & Analytics", hierarchyLevel: "L3", lifecycleStage: "Activated",
    status: "idle", tasksCompleted: 56, tasksQueued: 0, tasksFailed: 1,
    successRate: 99, avgResponseTime: "3.4s", lastActive: "15 min ago",
    capabilities: ["Forecasting", "Anomaly detection", "Report generation", "Trend analysis", "Cohort analysis"],
    tools: ["Forecast Engine", "Anomaly Detector", "Report Builder", "Query Translator"],
    riskClass: "R0", complianceStatus: "compliant", violations: 0,
    constitutionVersion: "1.0.0", promptVersion: "2.9.0", modelProvider: "Anthropic", modelName: "Claude 3.5",
    costThisSession: "$34.20", uptime: "99.99%",
    icon: Brain, color: "#FFD93D",
  },
  {
    id: "ops-ai", name: "Operations AI", role: "Workflow Automation & Orchestration",
    domain: "Operations", hierarchyLevel: "L2", lifecycleStage: "Activated",
    status: "active", tasksCompleted: 312, tasksQueued: 8, tasksFailed: 3,
    successRate: 96, avgResponseTime: "0.5s", lastActive: "5s ago",
    capabilities: ["Workflow builder", "Task routing", "SLA monitoring", "Resource optimization", "Deployment orchestration"],
    tools: ["Workflow Engine", "Task Router", "SLA Monitor", "Resource Optimizer"],
    riskClass: "R3", complianceStatus: "compliant", violations: 0,
    constitutionVersion: "1.0.0", promptVersion: "4.0.1", modelProvider: "OpenAI", modelName: "GPT-4o",
    costThisSession: "$312.90", uptime: "99.95%",
    icon: Cpu, color: "#A78BFA",
  },
];

const stagger = { visible: { transition: { staggerChildren: 0.05 } }, hidden: {} };
const fadeUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

/* ══════════════════════════ HELPER: Relative Time ══════════════════════════ */

function relTime(d: string): string {
  const diff = Date.now() - new Date(d).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h ago";
  const days = Math.floor(h / 24);
  return days + "d ago";
}

/* ══════════════════════════ PROCESSING AGENT PANEL ══════════════════════════ */

export default function AgentCommandCenter() {
  // Engine agents from API
  const [engineAgents, setEngineAgents] = useState<EngineAgent[]>([]);
  const [activities, setActivities] = useState<DBActivity[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // Processing states
  const [autoProcessing, setAutoProcessing] = useState(false);
  const [autoProcessResult, setAutoProcessResult] = useState<{ message: string; processedCount: number; failedCount: number } | null>(null);
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);
  const [quickActionResult, setQuickActionResult] = useState<{ message: string; successCount: number; failCount: number } | null>(null);

  // Constitutional agents (client-side simulated)
  const [agents, setAgents] = useState<Agent[]>(CONSTITUTIONAL_AGENTS);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeSection, setActiveSection] = useState<"processing" | "constitutional" | "self-upgrade">("processing");

  // Self-upgrade states
  const [upgradeCoverage, setUpgradeCoverage] = useState<any>(null);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeSession, setUpgradeSession] = useState<any>(null);
  const [upgradeRunning, setUpgradeRunning] = useState(false);

  const fetchUpgradeCoverage = useCallback(async () => {
    try {
      const res = await fetch('/api/agents/upgrade');
      if (res.ok) {
        const data = await res.json();
        setUpgradeCoverage(data);
      }
    } catch (e) {
      console.error('Failed to fetch upgrade coverage:', e);
    }
  }, []);

  const handleStartUpgrade = async (autoExecute: boolean) => {
    setUpgradeRunning(true);
    try {
      const res = await fetch('/api/agents/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoExecute }),
      });
      if (res.ok) {
        const data = await res.json();
        setUpgradeSession(data);
        fetchUpgradeCoverage();
      }
    } catch (e) {
      console.error('Upgrade failed:', e);
    } finally {
      setUpgradeRunning(false);
    }
  };

  // Fetch engine agents
  const fetchEngineAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/agents");
      if (res.ok) {
        const data = await res.json();
        setEngineAgents(data.agents || []);
      }
    } catch (e) {
      console.error("Failed to fetch engine agents:", e);
    } finally {
      setLoadingAgents(false);
    }
  }, []);

  // Fetch recent activities
  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch("/api/activity");
      if (res.ok) {
        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error("Failed to fetch activities:", e);
    } finally {
      setLoadingActivities(false);
    }
  }, []);

  useEffect(() => {
    fetchEngineAgents();
    fetchActivities();
    const iv = setInterval(() => {
      fetchEngineAgents();
      fetchActivities();
    }, 15000);
    return () => clearInterval(iv);
  }, [fetchEngineAgents, fetchActivities]);

  // Simulate constitutional agent status changes
  useEffect(() => {
    const iv = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => {
          if (a.status === "suspended" || a.status === "halted") return a;
          if (a.status === "idle" && Math.random() > 0.8)
            return { ...a, status: "active" as const, lastActive: "Just now" };
          if (a.status === "processing" && Math.random() > 0.6) {
            const completed = a.tasksCompleted + 1;
            const failed = Math.random() > 0.92 ? a.tasksFailed + 1 : a.tasksFailed;
            const queued = Math.max(0, a.tasksQueued - 1 + (Math.random() > 0.5 ? 1 : 0));
            const totalTasks = completed + failed;
            return {
              ...a,
              tasksCompleted: completed,
              tasksFailed: failed,
              tasksQueued: queued,
              successRate: Math.round((completed / totalTasks) * 100),
              status: (queued > 0 ? "processing" : "active") as Agent["status"],
              lastActive: "Just now",
            };
          }
          if (a.status === "active" && Math.random() > 0.7)
            return {
              ...a,
              status: "processing" as const,
              tasksQueued: a.tasksQueued + Math.floor(Math.random() * 3) + 1,
            };
          return a;
        })
      );
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Auto-process leads handler
  const handleAutoProcess = async () => {
    setAutoProcessing(true);
    setAutoProcessResult(null);
    try {
      const res = await fetch("/api/agents/process", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setAutoProcessResult({
          message: data.message,
          processedCount: data.processedCount,
          failedCount: data.failedCount,
        });
        fetchActivities();
      }
    } catch (e) {
      setAutoProcessResult({ message: "Failed to run autopilot", processedCount: 0, failedCount: 0 });
    } finally {
      setAutoProcessing(false);
    }
  };

  // Quick action handler
  const handleQuickAction = async (agentId: string, agentName: string) => {
    setQuickActionLoading(agentId);
    setQuickActionResult(null);
    try {
      // First fetch new/cold leads to get IDs
      const leadsRes = await fetch("/api/leads?status=new&limit=50");
      if (!leadsRes.ok) throw new Error("Failed to fetch leads");
      const leadsData = await leadsRes.json();
      const leadIds = (leadsData.leads || []).map((l: { id: string }) => l.id);

      if (leadIds.length === 0) {
        setQuickActionResult({ message: `No leads available for ${agentName}`, successCount: 0, failCount: 0 });
        setQuickActionLoading(null);
        return;
      }

      const res = await fetch(`/api/agents/${agentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadIds, action: agentName }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuickActionResult({
          message: `${agentName} processed ${data.processed} leads`,
          successCount: data.successCount,
          failCount: data.failCount,
        });
        fetchActivities();
      } else {
        setQuickActionResult({ message: `Failed to run ${agentName}`, successCount: 0, failCount: 0 });
      }
    } catch {
      setQuickActionResult({ message: `Error running ${agentName}`, successCount: 0, failCount: 0 });
    } finally {
      setQuickActionLoading(null);
    }
  };

  const handleHalt = useCallback((agentId: string) => {
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "halted" as const } : a)));
  }, []);
  const handleResume = useCallback((agentId: string) => {
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "active" as const, lifecycleStage: "Activated" } : a)));
  }, []);
  const handleSuspend = useCallback((agentId: string) => {
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "suspended" as const, lifecycleStage: "Suspended" } : a)));
  }, []);

  const domains = [...new Set(agents.map((a) => a.domain))].sort();
  const levels = [...new Set(agents.map((a) => a.hierarchyLevel))].sort();
  const filtered = agents.filter((a) => {
    if (filterDomain !== "all" && a.domain !== filterDomain) return false;
    if (filterLevel !== "all" && a.hierarchyLevel !== filterLevel) return false;
    return true;
  });
  const totalTasks = agents.reduce((s, a) => s + a.tasksCompleted + a.tasksFailed, 0);
  const totalQueued = agents.reduce((s, a) => s + a.tasksQueued, 0);
  const avgSuccess = Math.round(agents.reduce((s, a) => s + a.successRate, 0) / agents.length);
  const activeCount = agents.filter(
    (a) => a.status !== "idle" && a.status !== "suspended" && a.status !== "halted"
  ).length;
  const totalViolations = agents.reduce((s, a) => s + a.violations, 0);
  const compliantCount = agents.filter((a) => a.complianceStatus === "compliant").length;

  return (
    <div className="space-y-5">
      {/* ═══ Section Toggle ═══ */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveSection("processing")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeSection === "processing"
              ? "bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/30"
              : "text-[#555566] border border-transparent hover:text-[#888899]"
          }`}
        >
          <Cpu className="w-4 h-4"/> Processing Agents
        </button>
        <button
          onClick={() => setActiveSection("constitutional")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeSection === "constitutional"
              ? "bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/30"
              : "text-[#555566] border border-transparent hover:text-[#888899]"
          }`}
        >
          <Shield className="w-4 h-4"/> Constitutional Fleet
        </button>
        <button
          onClick={() => { setActiveSection('self-upgrade'); fetchUpgradeCoverage(); }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeSection === 'self-upgrade'
              ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30'
              : 'text-[#555566] border border-transparent hover:text-[#888899]'
          }`}
        >
          <Sparkles className="w-4 h-4"/> Self-Upgrade
        </button>
      </div>

      {/* ═══ PROCESSING AGENTS SECTION ═══ */}
      {activeSection === "processing" && (
        <>
          {/* Quick Actions Bar */}
          <div className="dash-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#FF4D00]"/>
              <span className="text-xs font-bold">Quick Actions</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Auto-Process Leads */}
              <button
                onClick={handleAutoProcess}
                disabled={autoProcessing}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF4D00] text-black text-xs font-bold hover:bg-[#FF6A2A] transition-colors disabled:opacity-50"
              >
                {autoProcessing ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin"/> Processing...</>
                ) : (
                  <><Sparkles className="w-3.5 h-3.5"/> Auto-Process Leads</>
                )}
              </button>

              {/* Qualify All New */}
              <button
                onClick={() => handleQuickAction("lead-qualifier", "Lead Qualifier AI")}
                disabled={quickActionLoading === "lead-qualifier"}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF4D00]/10 text-[#FF4D00] text-xs font-semibold hover:bg-[#FF4D00]/20 transition-colors disabled:opacity-50 border border-[#FF4D00]/20"
              >
                {quickActionLoading === "lead-qualifier" ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Bot className="w-3.5 h-3.5"/>}
                Qualify All New
              </button>

              {/* Send Emails */}
              <button
                onClick={() => handleQuickAction("email-outreach", "Email Outreach AI")}
                disabled={quickActionLoading === "email-outreach"}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-semibold hover:bg-[#00D4FF]/20 transition-colors disabled:opacity-50 border border-[#00D4FF]/20"
              >
                {quickActionLoading === "email-outreach" ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Mail className="w-3.5 h-3.5"/>}
                Send Emails
              </button>

              {/* Run Analytics */}
              <button
                onClick={() => handleQuickAction("analytics", "Analytics Agent")}
                disabled={quickActionLoading === "analytics"}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFD93D]/10 text-[#FFD93D] text-xs font-semibold hover:bg-[#FFD93D]/20 transition-colors disabled:opacity-50 border border-[#FFD93D]/20"
              >
                {quickActionLoading === "analytics" ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <BarChart3 className="w-3.5 h-3.5"/>}
                Run Analytics
              </button>
            </div>

            {/* Quick Action Result Toast */}
            <AnimatePresence>
              {(autoProcessResult || quickActionResult) && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-[#111118] border border-[#1E1E2A]"
                >
                  {autoProcessResult && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#E8E8EC]">{autoProcessResult.message}</p>
                        <p className="text-[10px] text-[#888899] mt-0.5">
                          {autoProcessResult.processedCount} qualified, {autoProcessResult.failedCount} failed
                        </p>
                      </div>
                    </>
                  )}
                  {quickActionResult && (
                    <>
                      {quickActionResult.successCount > 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0"/>
                      ) : (
                        <XCircle className="w-4 h-4 text-[#FFD93D] shrink-0"/>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#E8E8EC]">{quickActionResult.message}</p>
                        {quickActionResult.successCount > 0 && (
                          <p className="text-[10px] text-[#888899] mt-0.5">
                            {quickActionResult.successCount} succeeded, {quickActionResult.failCount} failed
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <button onClick={() => { setAutoProcessResult(null); setQuickActionResult(null); }} className="shrink-0 text-[#555566] hover:text-[#E8E8EC]">
                    <XCircle className="w-4 h-4"/>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Processing Agent Cards + Activity Feed */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Agent Cards */}
            <div className="xl:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-[#00D4FF]"/>
                <span className="text-sm font-bold">Processing Agents</span>
                <span className="text-[10px] text-[#555566] font-mono">{engineAgents.length} registered</span>
              </div>

              {loadingAgents ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <Loader2 className="w-5 h-5 text-[#FF4D00] animate-spin"/>
                  <span className="text-sm text-[#555566]">Loading agents...</span>
                </div>
              ) : (
                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {engineAgents.map((agent) => {
                    const typeInfo = AGENT_TYPE_ICONS[agent.type] || AGENT_TYPE_ICONS.custom;
                    const Icon = typeInfo.icon;
                    const isOnline = agent.state === 'processing' || (agent.tasksCompleted ?? 0) > 0;

                    return (
                      <motion.div key={agent.id} variants={fadeUp}
                        className="dash-card rounded-xl p-4 hover:border-[#FF4D00]/30 transition-all cursor-pointer"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: typeInfo.color + "15" }}>
                              <Icon className="w-4.5 h-4.5" style={{ color: typeInfo.color }} />
                            </div>
                            <div>
                              <h3 className="text-xs font-bold flex items-center gap-2">
                                {agent.name}
                                <span className={`w-2 h-2 rounded-full ${agent.state === 'processing' ? 'bg-[#FFD93D] animate-pulse' : 'bg-[#00FF88]'}`}/>
                              </h3>
                              <p className="text-[10px] text-[#555566]">{typeInfo.label}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className={`flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg ${
                          agent.state === 'processing' ? 'bg-[#FFD93D]/10' : 'bg-[#00FF88]/5'
                        }`}>
                          {agent.state === 'processing' ? (
                            <>
                              <Loader2 className="w-3 h-3 text-[#FFD93D] animate-spin"/>
                              <span className="text-[10px] font-semibold text-[#FFD93D]">Processing</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-[#00FF88]"/>
                              <span className="text-[10px] font-semibold text-[#00FF88]">Online</span>
                            </>
                          )}
                          {agent.lastActivity && (
                            <span className="text-[9px] text-[#555566] ml-auto">{relTime(agent.lastActivity)}</span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="text-center p-1.5 rounded-lg bg-[#08080C]">
                            <p className="text-sm font-bold text-[#E8E8EC]">{agent.tasksCompleted ?? 0}</p>
                            <p className="text-[9px] text-[#555566]">Done</p>
                          </div>
                          <div className="text-center p-1.5 rounded-lg bg-[#08080C]">
                            <p className="text-sm font-bold text-[#FFD93D]">{agent.tasksInQueue ?? 0}</p>
                            <p className="text-[9px] text-[#555566]">Queued</p>
                          </div>
                          <div className="text-center p-1.5 rounded-lg bg-[#08080C]">
                            <p className="text-sm font-bold text-[#FF4444]">{agent.tasksFailed ?? 0}</p>
                            <p className="text-[9px] text-[#555566]">Failed</p>
                          </div>
                        </div>

                        {/* Capabilities */}
                        <div className="flex flex-wrap gap-1">
                          {agent.capabilities.slice(0, 3).map((cap) => (
                            <span key={cap} className="text-[9px] px-2 py-0.5 rounded-md bg-[#1A1A24] text-[#888899] border border-[#1E1E2A]">{cap}</span>
                          ))}
                          {agent.capabilities.length > 3 && (
                            <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#1A1A24] text-[#555566]">+{agent.capabilities.length - 3}</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Recent Activity Feed */}
            <div className="dash-card rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1E1E2A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00D4FF]"/>
                  <span className="text-sm font-bold">Recent Activity</span>
                </div>
                <button onClick={fetchActivities} className="text-[10px] text-[#FF4D00] hover:underline flex items-center gap-1">
                  <RefreshCw className="w-3 h-3"/> Refresh
                </button>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-[#1E1E2A]/30">
                {loadingActivities ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-5 h-5 text-[#FF4D00] animate-spin"/>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-12 text-sm text-[#555566]">No activity yet</div>
                ) : (
                  activities.map((act) => {
                    const statusColor = act.status === 'success' ? '#00FF88'
                      : act.status === 'error' ? '#FF4444'
                      : act.status === 'warning' ? '#FFD93D'
                      : '#00D4FF';

                    return (
                      <motion.div
                        key={act.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 hover:bg-[#15151E]/50 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: statusColor }}/>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-[#E8E8EC] leading-relaxed line-clamp-2">{act.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{
                                color: act.agent === 'System' ? '#FFD93D' : '#00D4FF',
                                background: act.agent === 'System' ? 'rgba(255,217,61,0.1)' : 'rgba(0,212,255,0.1)',
                              }}>{act.agent}</span>
                              <span className="text-[9px] text-[#555566]">{relTime(act.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ CONSTITUTIONAL FLEET SECTION ═══ */}
      {activeSection === "constitutional" && (
        <>
          {/* Fleet Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Total Agents", value: agents.length, color: "#FF4D00", sub: "Constitutional fleet" },
              { label: "Active Now", value: activeCount, color: "#00FF88", sub: "Processing + Active" },
              { label: "Tasks Done", value: totalTasks, color: "#00D4FF", sub: "All time" },
              { label: "In Queue", value: totalQueued, color: "#FFD93D", sub: "Pending execution" },
              { label: "Compliance", value: `${compliantCount}/${agents.length}`, color: compliantCount === agents.length ? "#00FF88" : "#FFD93D", sub: totalViolations > 0 ? `${totalViolations} violation(s)` : "Fully compliant" },
              { label: "Avg Success", value: `${avgSuccess}%`, color: avgSuccess >= 95 ? "#00FF88" : "#FFD93D", sub: "Fleet reliability" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-[#08080C] border border-[#1E1E2A]">
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] text-[#555566] mt-0.5">{s.label}</p>
                <p className="text-[9px] text-[#888899]">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)}
                className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border border-[#1E1E2A] bg-[#08080C] text-[#888899] focus:outline-none focus:border-[#FF4D00]/50 cursor-pointer">
                <option value="all">All Domains</option>
                {domains.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
              <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}
                className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border border-[#1E1E2A] bg-[#08080C] text-[#888899] focus:outline-none focus:border-[#FF4D00]/50 cursor-pointer">
                <option value="all">All Levels</option>
                {levels.map((l) => (<option key={l} value={l}>{l} {HIERARCHY_LEVELS.find((h) => h.level === l)?.label || l}</option>))}
              </select>
              <span className="text-[10px] text-[#555566] font-mono">{filtered.length} agent{filtered.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#555566] font-mono mr-1">AI-CONSTITUTION v1.0.0</span>
              <button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-semibold rounded-lg border border-[#1E1E2A] text-[#555566] hover:text-[#888899] hover:border-[#2A2A3A] transition-colors">
                <BarChart3 className="w-3 h-3"/> {viewMode === "grid" ? "List" : "Grid"}
              </button>
            </div>
          </div>

          {/* Authority Hierarchy Reference Bar */}
          <div className="dash-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-[#FF4D00]"/>
              <span className="text-xs font-bold">Constitutional Authority Hierarchy</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {HIERARCHY_LEVELS.map((h, i) => (
                <div key={h.level} className="flex items-center shrink-0">
                  <div className="px-3 py-2 rounded-lg bg-[#08080C] border border-[#1E1E2A] text-center min-w-[100px]">
                    <p className="text-[10px] font-bold" style={{ color: ["#FF4D00", "#00D4FF", "#00FF88", "#FFD93D", "#A78BFA"][i] }}>{h.level}</p>
                    <p className="text-[9px] text-[#888899]">{h.label}</p>
                  </div>
                  {i < HIERARCHY_LEVELS.length - 1 && <ChevronRight className="w-3 h-3 text-[#2A2A3A] mx-0.5 shrink-0"/>}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible"
            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
            {filtered.map((agent) => (
              <ConstitutionalAgentCard
                key={agent.id} agent={agent}
                isSelected={selected?.id === agent.id}
                onSelect={() => setSelected(selected?.id === agent.id ? null : agent)}
                onHalt={() => handleHalt(agent.id)}
                onResume={() => handleResume(agent.id)}
                onSuspend={() => handleSuspend(agent.id)}
                viewMode={viewMode}
              />
            ))}
          </motion.div>

          {/* Risk Classification Reference */}
          <div className="dash-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#FFD93D]"/>
              <span className="text-xs font-bold">Action Risk Classification (Constitution Section 13)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {RISK_CLASSES.map((r) => (
                <div key={r.cls} className="p-2 rounded-lg bg-[#08080C] border border-[#1E1E2A] text-center">
                  <p className="text-xs font-bold" style={{ color: r.color }}>{r.cls}</p>
                  <p className="text-[9px] text-[#888899]">{r.label}</p>
                  <p className="text-[8px] text-[#555566] mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Detail Modal */}
          <AnimatePresence>
            {selected && (
              <ConstitutionalAgentDetailModal agent={selected} onClose={() => setSelected(null)} onHalt={() => handleHalt(selected.id)} onResume={() => handleResume(selected.id)} onSuspend={() => handleSuspend(selected.id)} />
            )}
          </AnimatePresence>
        </>
      )}

      {/* ═══ SELF-UPGRADE SECTION ═══ */}
      {activeSection === "self-upgrade" && (
        <div className="space-y-4">
          {/* Header */}
          <div className="dash-card rounded-xl p-5 border border-[#00FF88]/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00FF88]"/>
                </div>
                <div>
                  <h3 className="text-sm font-bold">Self-Upgrading Agent</h3>
                  <p className="text-[10px] text-[#888899]">Reads spec docs, analyzes gaps, upgrades autonomously</p>
                </div>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${upgradeCoverage?.overallReadiness >= 80 ? 'bg-[#00FF88]' : upgradeCoverage?.overallReadiness >= 50 ? 'bg-[#FFD93D]' : 'bg-[#FF4444]'}`}/>
            </div>
            <p className="text-[10px] text-[#555566] leading-relaxed mb-4">
              This agent reads the MianX.ai specification documents from the repository, compares them against the current platform implementation,
              identifies gaps in API endpoints, database models, and features, then creates and executes upgrade tasks.
              R0/R1 tasks (read-only/reversible) execute automatically per the AI Constitution. R2+ tasks require approval.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleStartUpgrade(false)} disabled={upgradeRunning}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00FF88] text-black text-xs font-bold hover:bg-[#00FF88]/80 transition-colors disabled:opacity-50">
                {upgradeRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <RefreshCw className="w-3.5 h-3.5"/>}
                Analyze Specs
              </button>
              <button onClick={() => handleStartUpgrade(true)} disabled={upgradeRunning}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00FF88]/10 text-[#00FF88] text-xs font-bold hover:bg-[#00FF88]/20 transition-colors disabled:opacity-50 border border-[#00FF88]/30">
                {upgradeRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Sparkles className="w-3.5 h-3.5"/>}
                Auto-Upgrade (R0/R1)
              </button>
            </div>
          </div>

          {/* Coverage Report */}
          {upgradeCoverage && (
            <>
              {/* Overall Readiness */}
              <div className="dash-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold">Platform Readiness</span>
                  <span className={`text-2xl font-black ${upgradeCoverage.overallReadiness >= 80 ? 'text-[#00FF88]' : upgradeCoverage.overallReadiness >= 50 ? 'text-[#FFD93D]' : 'text-[#FF4444]'}`}>
                    {upgradeCoverage.overallReadiness || 0}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#1A1A24] mb-5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${upgradeCoverage.overallReadiness || 0}%` }} transition={{ duration: 1.5 }}
                    className="h-full rounded-full" style={{ background: upgradeCoverage.overallReadiness >= 80 ? '#00FF88' : upgradeCoverage.overallReadiness >= 50 ? '#FFD93D' : '#FF4444' }}/>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-[#08080C]">
                    <p className="text-lg font-bold text-[#00D4FF]">{upgradeCoverage.apiCoverage?.percentage || 0}%</p>
                    <p className="text-[9px] text-[#555566]">API Coverage</p>
                    <p className="text-[9px] text-[#888899]">{upgradeCoverage.apiCoverage?.implemented || 0}/{upgradeCoverage.apiCoverage?.total || 0}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#08080C]">
                    <p className="text-lg font-bold text-[#FFD93D]">{upgradeCoverage.dbCoverage?.percentage || 0}%</p>
                    <p className="text-[9px] text-[#555566]">DB Coverage</p>
                    <p className="text-[9px] text-[#888899]">{upgradeCoverage.dbCoverage?.implemented || 0}/{upgradeCoverage.dbCoverage?.total || 0}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#08080C]">
                    <p className="text-lg font-bold text-[#A78BFA]">{upgradeCoverage.featureCoverage?.implemented || 0}</p>
                    <p className="text-[9px] text-[#555566]">Features Done</p>
                    <p className="text-[9px] text-[#888899]">of {upgradeCoverage.featureCoverage?.total || 0} total</p>
                  </div>
                </div>
              </div>

              {/* Missing Items */}
              {(upgradeCoverage.apiCoverage?.missing?.length > 0 || upgradeCoverage.dbCoverage?.missing?.length > 0) && (
                <div className="dash-card rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-[#FFD93D]"/>
                    <span className="text-xs font-bold">Identified Gaps</span>
                  </div>
                  <div className="space-y-2">
                    {upgradeCoverage.apiCoverage?.missing?.slice(0, 8).map((m: string) => (
                      <div key={m} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4444]"/>
                        <span className="text-[10px] font-mono text-[#FF8C42]">API</span>
                        <span className="text-[10px] text-[#888899]">{m}</span>
                      </div>
                    ))}
                    {upgradeCoverage.dbCoverage?.missing?.slice(0, 8).map((m: string) => (
                      <div key={m} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4444]"/>
                        <span className="text-[10px] font-mono text-[#00D4FF]">DB</span>
                        <span className="text-[10px] text-[#888899]">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upgrade Tasks */}
              {upgradeCoverage.upgradeTasks && upgradeCoverage.upgradeTasks.length > 0 && (
                <div className="dash-card rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[#FF4D00]"/>
                    <span className="text-xs font-bold">Upgrade Tasks ({upgradeCoverage.upgradeTasks.length})</span>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {upgradeCoverage.upgradeTasks.slice(0, 15).map((task: any, i: number) => (
                      <div key={task.id || i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.status === 'completed' ? 'bg-[#00FF88]' : task.status === 'blocked' ? 'bg-[#FF4444]' : task.status === 'in-progress' ? 'bg-[#FFD93D]' : 'bg-[#555566]'}`}/>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${task.riskClass === 'R0' || task.riskClass === 'R1' ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-[#FF4444]/10 text-[#FF4444]'}`}>{task.riskClass}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1A1A24] text-[#888899] shrink-0">{task.category}</span>
                        <span className="text-[10px] text-[#E8E8EC] truncate flex-1">{task.title}</span>
                        <span className={`text-[9px] font-semibold shrink-0 ${task.status === 'completed' ? 'text-[#00FF88]' : task.status === 'blocked' ? 'text-[#FF4444]' : 'text-[#888899]'}`}>{task.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Last Session */}
              {upgradeSession && (
                <div className="dash-card rounded-xl p-5 border border-[#00FF88]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-[#00FF88]"/>
                    <span className="text-xs font-bold">Last Upgrade Session</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${upgradeSession.status === 'completed' ? 'bg-[#00FF88]/10 text-[#00FF88]' : 'bg-[#FFD93D]/10 text-[#FFD93D]'}`}>{upgradeSession.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 rounded-lg bg-[#08080C]">
                      <p className="text-sm font-bold">{upgradeSession.totalTasks || 0}</p>
                      <p className="text-[9px] text-[#555566]">Total Tasks</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#08080C]">
                      <p className="text-sm font-bold text-[#00FF88]">{upgradeSession.completedTasks || 0}</p>
                      <p className="text-[9px] text-[#555566]">Completed</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[#08080C]">
                      <p className="text-sm font-bold text-[#FF4444]">{upgradeSession.failedTasks || 0}</p>
                      <p className="text-[9px] text-[#555566]">Failed</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!upgradeCoverage && !upgradeLoading && (
            <div className="dash-card rounded-xl p-10 text-center">
              <Sparkles className="w-10 h-10 text-[#00FF88]/30 mx-auto mb-3"/>
              <p className="text-sm font-bold text-[#888899] mb-1">No Analysis Yet</p>
              <p className="text-[10px] text-[#555566]">Click "Analyze Specs" to scan spec documents and identify upgrade opportunities</p>
            </div>
          )}
          {upgradeLoading && (
            <div className="dash-card rounded-xl p-10 text-center">
              <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin mx-auto mb-3"/>
              <p className="text-sm text-[#888899]">Scanning specifications...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ CONSTITUTIONAL AGENT CARD ══════════════════════════ */
function ConstitutionalAgentCard({ agent, isSelected, onSelect, onHalt, onResume, onSuspend, viewMode }: {
  agent: Agent; isSelected: boolean; onSelect: () => void; onHalt: () => void; onResume: () => void; onSuspend: () => void; viewMode: "grid" | "list";
}) {
  const Icon = agent.icon;
  const isHaltedOrSuspended = agent.status === "halted" || agent.status === "suspended";
  const riskInfo = RISK_CLASSES.find((r) => r.cls === agent.riskClass);
  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    active: { color: "#00FF88", bg: "rgba(0,255,136,0.1)", label: "Active" },
    processing: { color: "#FFD93D", bg: "rgba(255,217,61,0.1)", label: "Processing" },
    idle: { color: "#555566", bg: "rgba(85,85,102,0.1)", label: "Idle" },
    suspended: { color: "#FF8C42", bg: "rgba(255,140,66,0.1)", label: "Suspended" },
    halted: { color: "#FF4444", bg: "rgba(255,68,68,0.1)", label: "HALTED" },
  };
  const stCfg = statusConfig[agent.status] || statusConfig.active;
  const complianceCfg = { compliant: { color: "#00FF88", icon: CheckCircle2, label: "Compliant" }, warning: { color: "#FFD93D", icon: AlertTriangle, label: "Warning" }, violation: { color: "#FF4444", icon: XCircle, label: "Violation" } }[agent.complianceStatus];
  const CompIcon = complianceCfg.icon;

  if (viewMode === "list") {
    return (
      <motion.div variants={fadeUp} onClick={onSelect}
        className={`dash-card rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center gap-4 ${isSelected ? "border-[#FF4D00]/50 shadow-lg shadow-[#FF4D00]/5" : isHaltedOrSuspended ? "opacity-60" : ""}`}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${agent.color}15` }}>
          <Icon className="w-5 h-5" style={{ color: agent.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold truncate">{agent.name}</h3>
            <span className={`w-2 h-2 rounded-full shrink-0 ${agent.status === "active" ? "bg-[#00FF88]" : agent.status === "processing" ? "bg-[#FFD93D] animate-pulse" : agent.status === "halted" ? "bg-[#FF4444]" : "bg-[#555566]"}`}/>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ color: agent.color, background: agent.color + "15" }}>{agent.hierarchyLevel}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ color: riskInfo?.color, background: (riskInfo?.color || "#555") + "15" }}>{agent.riskClass}</span>
          </div>
          <p className="text-[10px] text-[#555566] truncate">{agent.domain} — {agent.role}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">{agent.tasksCompleted}</p>
            <p className="text-[9px] text-[#555566]">tasks</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold" style={{ color: agent.successRate >= 90 ? "#00FF88" : "#FFD93D" }}>{agent.successRate}%</p>
            <p className="text-[9px] text-[#555566]">success</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md`} style={{ color: stCfg.color, background: stCfg.bg }}>{stCfg.label}</span>
          <CompIcon className="w-3.5 h-3.5" style={{ color: complianceCfg.color }}/>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} onClick={onSelect}
      className={`dash-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${isSelected ? "border-[#FF4D00]/50 shadow-lg shadow-[#FF4D00]/5" : isHaltedOrSuspended ? "opacity-60" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${agent.color}15` }}>
            <Icon className="w-5 h-5" style={{ color: agent.color }} />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2">
              {agent.name}
              <span className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-[#00FF88]" : agent.status === "processing" ? "bg-[#FFD93D] animate-pulse" : agent.status === "halted" ? "bg-[#FF4444]" : "bg-[#555566]"}`}/>
            </h3>
            <p className="text-[10px] text-[#555566]">{agent.domain}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <CompIcon className="w-3 h-3" style={{ color: complianceCfg.color }}/>
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md`} style={{ color: stCfg.color, background: stCfg.bg }}>{stCfg.label}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[9px] px-2 py-0.5 rounded-md font-bold" style={{ color: agent.color, background: agent.color + "15" }}>
          {agent.hierarchyLevel} — {HIERARCHY_LEVELS.find((h) => h.level === agent.hierarchyLevel)?.label}
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded-md font-bold" style={{ color: riskInfo?.color, background: (riskInfo?.color || "#555") + "15" }}>
          {agent.riskClass} — {riskInfo?.label}
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#1A1A24] text-[#888899]">
          {agent.lifecycleStage}
        </span>
        {agent.violations > 0 && (
          <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#FF4444]/10 text-[#FF4444] font-bold">
            {agent.violations} violation{agent.violations > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded-lg bg-[#08080C]">
          <p className="text-sm font-bold text-[#E8E8EC]">{agent.tasksCompleted}</p>
          <p className="text-[9px] text-[#555566]">Completed</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[#08080C]">
          <p className="text-sm font-bold text-[#E8E8EC]">{agent.tasksQueued}</p>
          <p className="text-[9px] text-[#555566]">Queued</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[#08080C]">
          <p className="text-sm font-bold" style={{ color: agent.successRate >= 90 ? "#00FF88" : "#FFD93D" }}>{agent.successRate}%</p>
          <p className="text-[9px] text-[#555566]">Success</p>
        </div>
      </div>

      {/* Controls */}
      {isHaltedOrSuspended ? (
        <div className="flex items-center gap-2 pt-2 border-t border-[#1E1E2A]">
          <button onClick={(e) => { e.stopPropagation(); onResume(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#00FF88]/10 text-[#00FF88] text-[10px] font-bold hover:bg-[#00FF88]/20 transition-colors">
            <Play className="w-3 h-3"/> Resume Agent
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 pt-2 border-t border-[#1E1E2A]">
          <button onClick={(e) => { e.stopPropagation(); onHalt(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#FF4444]/5 text-[#FF4444] text-[9px] font-semibold hover:bg-[#FF4444]/15 transition-colors">
            <Ban className="w-3 h-3"/> HALT
          </button>
          <button onClick={(e) => { e.stopPropagation(); onSuspend(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#FF8C42]/5 text-[#FF8C42] text-[9px] font-semibold hover:bg-[#FF8C42]/15 transition-colors">
            <Pause className="w-3 h-3"/> Suspend
          </button>
          <button onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#00D4FF]/5 text-[#00D4FF] text-[9px] font-semibold hover:bg-[#00D4FF]/15 transition-colors">
            <Eye className="w-3 h-3"/> Details
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════ CONSTITUTIONAL AGENT DETAIL MODAL ══════════════════════════ */
function ConstitutionalAgentDetailModal({ agent, onClose, onHalt, onResume, onSuspend }: {
  agent: Agent; onClose: () => void; onHalt: () => void; onResume: () => void; onSuspend: () => void;
}) {
  const Icon = agent.icon;
  const riskInfo = RISK_CLASSES.find((r) => r.cls === agent.riskClass);
  const hierarchyInfo = HIERARCHY_LEVELS.find((h) => h.level === agent.hierarchyLevel);
  const isHaltedOrSuspended = agent.status === "halted" || agent.status === "suspended";

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0C0C12] border-l border-[#1E1E2A] z-[80] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0C0C12] border-b border-[#1E1E2A] p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${agent.color}15` }}>
              <Icon className="w-5 h-5" style={{ color: agent.color }} />
            </div>
            <div>
              <h2 className="text-base font-bold">{agent.name}</h2>
              <p className="text-[10px] text-[#555566]">{agent.id} — {agent.domain}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#1A1A24] transition-colors text-[#555566] hover:text-[#E8E8EC]">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          {/* Role */}
          <p className="text-xs text-[#888899] leading-relaxed">{agent.role}</p>
          {/* Constitutional Identity */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-[#FF4D00]"/>
              <span className="text-xs font-bold">Constitutional Identity</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Authority Level", value: `${agent.hierarchyLevel} — ${hierarchyInfo?.label}`, color: agent.color },
                { label: "Risk Class", value: `${agent.riskClass} — ${riskInfo?.label}`, color: riskInfo?.color },
                { label: "Lifecycle Stage", value: agent.lifecycleStage, color: "#E8E8EC" },
                { label: "Domain", value: agent.domain, color: "#E8E8EC" },
                { label: "Compliance", value: agent.complianceStatus === "compliant" ? "Compliant" : `${agent.complianceStatus} (${agent.violations})`, color: agent.complianceStatus === "compliant" ? "#00FF88" : agent.complianceStatus === "warning" ? "#FFD93D" : "#FF4444" },
                { label: "Constitution", value: `v${agent.constitutionVersion}`, color: "#888899" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[9px] text-[#555566] uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Model & Prompt */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-[#00D4FF]"/>
              <span className="text-xs font-bold">Model & Prompt Configuration</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-[9px] text-[#555566] uppercase tracking-wider">Model Provider</p><p className="text-xs font-semibold mt-0.5">{agent.modelProvider}</p></div>
              <div><p className="text-[9px] text-[#555566] uppercase tracking-wider">Model</p><p className="text-xs font-semibold mt-0.5">{agent.modelName}</p></div>
              <div><p className="text-[9px] text-[#555566] uppercase tracking-wider">Prompt Version</p><p className="text-xs font-semibold mt-0.5 font-mono">{agent.promptVersion}</p></div>
              <div><p className="text-[9px] text-[#555566] uppercase tracking-wider">Cost This Session</p><p className="text-xs font-semibold mt-0.5 text-[#00FF88]">{agent.costThisSession}</p></div>
            </div>
          </div>
          {/* Performance */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-[#00FF88]"/>
              <span className="text-xs font-bold">Performance Metrics</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#E8E8EC]">{agent.tasksCompleted}</p>
                <p className="text-[9px] text-[#555566]">Completed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#FF4444]">{agent.tasksFailed}</p>
                <p className="text-[9px] text-[#555566]">Failed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#FFD93D]">{agent.tasksQueued}</p>
                <p className="text-[9px] text-[#555566]">Queued</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#888899]">Success Rate</span>
                  <span className="text-xs font-bold" style={{ color: agent.successRate >= 90 ? "#00FF88" : "#FFD93D" }}>{agent.successRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1A1A24]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${agent.successRate}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: agent.successRate >= 90 ? "#00FF88" : "#FFD93D" }}/>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#555566]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>Avg Response: {agent.avgResponseTime}</span>
                <span>Uptime: {agent.uptime}</span>
              </div>
            </div>
          </div>
          {/* Capabilities */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#FF4D00]"/>
              <span className="text-xs font-bold">Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map((c) => (
                <span key={c} className="text-[10px] px-2.5 py-1 rounded-md bg-[#1A1A24] text-[#888899] border border-[#1E1E2A]">{c}</span>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#A78BFA]"/>
              <span className="text-xs font-bold">Authorized Tools</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {agent.tools.map((t) => (
                <span key={t} className="text-[10px] px-2.5 py-1 rounded-md bg-[#A78BFA]/5 text-[#A78BFA] border border-[#A78BFA]/20">{t}</span>
              ))}
            </div>
          </div>
          {/* Lifecycle */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 text-[#00D4FF]"/>
              <span className="text-xs font-bold">Agent Lifecycle (Section 15)</span>
            </div>
            <div className="flex items-center gap-0.5 overflow-x-auto pb-1">
              {LIFECYCLE_STAGES.map((stage) => {
                const isActive = stage === agent.lifecycleStage;
                const isPast = LIFECYCLE_STAGES.indexOf(stage as any) < LIFECYCLE_STAGES.indexOf(agent.lifecycleStage as any);
                return (
                  <div key={stage} className="shrink-0">
                    <div className={`px-2 py-1.5 rounded-md text-[8px] font-semibold text-center min-w-[60px] transition-colors ${
                      isActive ? "bg-[#FF4D00]/20 text-[#FF4D00] border border-[#FF4D00]/40" :
                      isPast ? "bg-[#00FF88]/10 text-[#00FF88]" :
                      "bg-[#08080C] text-[#555566]"
                    }`}>{stage}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Emergency Controls */}
          <div className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2A]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#FF4444]"/>
              <span className="text-xs font-bold">Emergency Controls (Section 8)</span>
            </div>
            {isHaltedOrSuspended ? (
              <button onClick={onResume}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00FF88]/10 text-[#00FF88] text-xs font-bold hover:bg-[#00FF88]/20 transition-colors">
                <Play className="w-4 h-4"/> Resume Agent — Reactivate to Activated stage
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { onHalt(); onClose(); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF4444]/10 text-[#FF4444] text-xs font-bold hover:bg-[#FF4444]/20 transition-colors border border-[#FF4444]/20">
                  <Ban className="w-4 h-4"/> HALT
                </button>
                <button onClick={() => { onSuspend(); onClose(); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF8C42]/10 text-[#FF8C42] text-xs font-bold hover:bg-[#FF8C42]/20 transition-colors border border-[#FF8C42]/20">
                  <Pause className="w-4 h-4"/> Suspend
                </button>
              </div>
            )}
            <p className="text-[9px] text-[#555566] mt-2">HALT stops all work and moves to safe state. Suspend moves to Suspended lifecycle stage. Both are auditable constitutional actions.</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}