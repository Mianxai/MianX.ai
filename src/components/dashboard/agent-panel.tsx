"use client";

import { useState, useEffect } from "react";
import { Bot, Zap, CheckCircle2, XCircle, Clock, Brain, Target, MessageSquare, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "processing";
  tasksCompleted: number;
  tasksQueued: number;
  successRate: number;
  avgResponseTime: string;
  lastActive: string;
  capabilities: string[];
  icon: any;
  color: string;
}

const INITIAL_AGENTS: Agent[] = [
  {
    id: "sales-ai", name: "Sales AI", role: "Lead Qualification & Conversion",
    status: "active", tasksCompleted: 147, tasksQueued: 5, successRate: 94,
    avgResponseTime: "1.2s", lastActive: "Just now",
    capabilities: ["Lead scoring", "Auto-qualify", "Follow-up generation", "Deal tracking"],
    icon: Target, color: "#FF4D00",
  },
  {
    id: "marketing-ai", name: "Marketing AI", role: "Campaign Intelligence & Analytics",
    status: "processing", tasksCompleted: 231, tasksQueued: 12, successRate: 97,
    avgResponseTime: "0.8s", lastActive: "2 min ago",
    capabilities: ["Campaign analysis", "A/B testing", "Audience segmentation", "Content optimization"],
    icon: Zap, color: "#00D4FF",
  },
  {
    id: "support-ai", name: "Support AI", role: "Customer Success & Ticket Resolution",
    status: "active", tasksCompleted: 89, tasksQueued: 3, successRate: 91,
    avgResponseTime: "2.1s", lastActive: "30s ago",
    capabilities: ["Auto-response", "Ticket routing", "Knowledge base", "Escalation"],
    icon: MessageSquare, color: "#00FF88",
  },
  {
    id: "analytics-ai", name: "Analytics AI", role: "Predictive Insights & Reporting",
    status: "idle", tasksCompleted: 56, tasksQueued: 0, successRate: 99,
    avgResponseTime: "3.4s", lastActive: "15 min ago",
    capabilities: ["Forecasting", "Anomaly detection", "Report generation", "Trend analysis"],
    icon: Brain, color: "#FFD93D",
  },
  {
    id: "ops-ai", name: "Operations AI", role: "Workflow Automation & Orchestration",
    status: "active", tasksCompleted: 312, tasksQueued: 8, successRate: 96,
    avgResponseTime: "0.5s", lastActive: "5s ago",
    capabilities: ["Workflow builder", "Task routing", "SLA monitoring", "Resource optimization"],
    icon: Cpu, color: "#A78BFA",
  },
  {
    id: "outreach-ai", name: "Outreach AI", role: "Multi-Channel Engagement Engine",
    status: "processing", tasksCompleted: 178, tasksQueued: 15, successRate: 88,
    avgResponseTime: "1.8s", lastActive: "1 min ago",
    capabilities: ["Email sequences", "SMS campaigns", "Social DMs", "Personalization"],
    icon: Bot, color: "#FF6B6B",
  },
];

const stagger = { visible: { transition: { staggerChildren: 0.06 } }, hidden: {} };
const fadeUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function AgentCommandCenter() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selected, setSelected] = useState<Agent | null>(null);

  // Simulate live activity
  useEffect(() => {
    const iv = setInterval(() => {
      setAgents(prev => prev.map(a => {
        if (a.status === "idle" && Math.random() > 0.8) return { ...a, status: "active" as const, lastActive: "Just now" };
        if (a.status === "processing" && Math.random() > 0.6) {
          const completed = a.tasksCompleted + 1;
          const queued = Math.max(0, a.tasksQueued - 1 + (Math.random() > 0.5 ? 1 : 0));
          return { ...a, tasksCompleted: completed, tasksQueued: queued, status: (queued > 0 ? "processing" : "active") as any, lastActive: "Just now" };
        }
        if (a.status === "active" && Math.random() > 0.7) return { ...a, status: "processing" as const, tasksQueued: a.tasksQueued + Math.floor(Math.random() * 3) + 1 };
        return a;
      }));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const totalTasks = agents.reduce((s, a) => s + a.tasksCompleted, 0);
  const totalQueued = agents.reduce((s, a) => s + a.tasksQueued, 0);
  const avgSuccess = Math.round(agents.reduce((s, a) => s + a.successRate, 0) / agents.length);
  const activeCount = agents.filter(a => a.status !== "idle").length;

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Agents", value: agents.length, color: "#FF4D00" },
          { label: "Active Now", value: activeCount, color: "#00FF88" },
          { label: "Tasks Done", value: totalTasks, color: "#00D4FF" },
          { label: "In Queue", value: totalQueued, color: "#FFD93D" },
        ].map(s => (
          <div key={s.label} className="text-center p-3 rounded-xl bg-[#08080C] border border-[#1E1E2A]">
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#555566] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map(agent => {
          const Icon = agent.icon;
          const isSel = selected?.id === agent.id;
          return (
            <motion.div key={agent.id} variants={fadeUp}
              onClick={() => setSelected(isSel ? null : agent)}
              className={`dash-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${isSel ? "border-[#FF4D00]/50 shadow-lg shadow-[#FF4D00]/5" : ""}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${agent.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: agent.color }}/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">{agent.name}
                      <span className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-[#00FF88]" : agent.status === "processing" ? "bg-[#FFD93D] animate-pulse" : "bg-[#555566]"}`}/>
                    </h3>
                    <p className="text-[10px] text-[#555566]">{agent.role}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                  agent.status === "active" ? "bg-[#00FF88]/10 text-[#00FF88]" :
                  agent.status === "processing" ? "bg-[#FFD93D]/10 text-[#FFD93D]" :
                  "bg-[#555566]/10 text-[#555566]"
                }`}>{agent.status}</span>
              </div>
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
              {isSel && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-3 border-t border-[#1E1E2A]">
                  <p className="text-[10px] text-[#555566] mb-2">Capabilities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-md bg-[#1A1A24] text-[#888899]">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-[10px] text-[#555566]">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>Avg {agent.avgResponseTime}</span>
                    <span>Last: {agent.lastActive}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}