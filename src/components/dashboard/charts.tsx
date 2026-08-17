"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface DailyLead { date: string; count: number; hot: number; warm: number; new: number; cold: number; value: number }
interface SourceItem { name: string; value: number }
interface AgentStat { agent: string; tasks: number; success: number; failed: number; rate: number }
interface ScoreBucket { range: string; count: number; fill: string }

interface ChartData {
  dailyLeads: DailyLead[];
  sourceData: SourceItem[];
  agentData: AgentStat[];
  scoreData: ScoreBucket[];
}

const PIE_COLORS = ["#FF4D00", "#00D4FF", "#00FF88", "#FFD93D", "#A78BFA", "#FF6B6B"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111118] border border-[#1E1E2A] rounded-lg p-3 shadow-xl">
      <p className="text-[10px] text-[#555566] mb-1 font-mono">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function DashboardCharts() {
  const [data, setData] = useState<ChartData | null>(null);
  const [activeTab, setActiveTab] = useState<"trends" | "sources" | "agents" | "scores">("trends");

  useEffect(() => {
    fetch("/api/charts").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><ChartSkeleton/><ChartSkeleton/></div>;

  const tabs = [
    { key: "trends" as const, label: "Lead Trends", icon: TrendingUp },
    { key: "sources" as const, label: "Sources", icon: PieIcon },
    { key: "agents" as const, label: "Agent Perf", icon: Activity },
    { key: "scores" as const, label: "Score Dist", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Chart tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map(t => {
          const a = activeTab === t.key;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-all whitespace-nowrap border ${
                a ? "bg-[#FF4D00]/10 border-[#FF4D00]/30 text-[#FF4D00]" : "border-[#1E1E2A] text-[#555566] hover:text-[#888899]"
              }`}>
              <t.icon className="w-3 h-3"/>{t.label}
            </button>
          );
        })}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === "trends" && <TrendsChart data={data.dailyLeads} />}
        {activeTab === "sources" && <SourcesChart data={data.sourceData} />}
        {activeTab === "agents" && <AgentsChart data={data.agentData} />}
        {activeTab === "scores" && <ScoresChart data={data.scoreData} />}
      </motion.div>
    </div>
  );
}

function TrendsChart({ data }: { data: DailyLead[] }) {
  return (
    <div className="dash-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold">Lead Acquisition Trend</h3>
          <p className="text-[10px] text-[#555566] mt-0.5">Last 14 days — all sources</p>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          {[{ name: "Total", color: "#FF4D00" }, { name: "Hot", color: "#FF4D00" }, { name: "Warm", color: "#FFD93D" }, { name: "New", color: "#00D4FF" }].map(s => (
            <span key={s.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: s.color }}/> {s.name}</span>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4D00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF4D00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#555566" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#555566" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="count" stroke="#FF4D00" fill="url(#gradTotal)" strokeWidth={2} name="Total" />
          <Area type="monotone" dataKey="hot" stroke="#FF4D00" fill="none" strokeWidth={1.5} strokeDasharray="4 2" name="Hot" />
          <Area type="monotone" dataKey="warm" stroke="#FFD93D" fill="none" strokeWidth={1.5} strokeDasharray="4 2" name="Warm" />
          <Area type="monotone" dataKey="new" stroke="#00D4FF" fill="none" strokeWidth={1.5} strokeDasharray="4 2" name="New" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SourcesChart({ data }: { data: SourceItem[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Lead Sources</h3>
        <p className="text-[10px] text-[#555566] mb-4">Distribution by origin</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
              {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Source Breakdown</h3>
        <p className="text-[10px] text-[#555566] mb-4">{total} total leads</p>
        <div className="space-y-3">
          {data.sort((a, b) => b.value - a.value).map((s, i) => {
            const pct = total > 0 ? ((s.value / total) * 100).toFixed(1) : "0";
            return (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}/>
                    <span className="text-xs capitalize">{s.name}</span>
                  </div>
                  <span className="text-xs font-mono text-[#888899]">{s.value} ({pct}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1A1A24]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AgentsChart({ data }: { data: AgentStat[] }) {
  return (
    <div className="dash-card rounded-xl p-5">
      <h3 className="text-sm font-bold mb-1">AI Agent Performance</h3>
      <p className="text-[10px] text-[#555566] mb-6">Task completion rates across all agents</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
          <XAxis dataKey="agent" tick={{ fontSize: 10, fill: "#555566" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#555566" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="tasks" fill="#1E1E2A" radius={[4, 4, 0, 0]} name="Total Tasks" />
          <Bar dataKey="success" fill="#00FF88" radius={[4, 4, 0, 0]} name="Successful" />
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {data.map(a => (
          <div key={a.agent} className="text-center p-2 rounded-lg bg-[#08080C]">
            <p className="text-[10px] text-[#555566]">{a.agent}</p>
            <p className="text-lg font-bold mt-0.5" style={{ color: a.rate >= 80 ? "#00FF88" : a.rate >= 50 ? "#FFD93D" : "#FF4444" }}>{a.rate}%</p>
            <p className="text-[10px] text-[#555566]">success rate</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoresChart({ data }: { data: ScoreBucket[] }) {
  return (
    <div className="dash-card rounded-xl p-5">
      <h3 className="text-sm font-bold mb-1">Lead Score Distribution</h3>
      <p className="text-[10px] text-[#555566] mb-6">Quality breakdown across all leads</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
          <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#555566" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#555566" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Leads">
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartSkeleton() {
  return <div className="dash-card rounded-xl p-5 h-[340px] animate-pulse bg-[#111118]">
    <div className="h-4 w-40 bg-[#1E1E2A] rounded mb-4"/>
    <div className="h-[260px] bg-[#1A1A24] rounded-lg"/>
  </div>;
}
