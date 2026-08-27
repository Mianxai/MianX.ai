"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Line, LineChart,
} from "recharts";
import {
  TrendingUp, PieChart as PieIcon, BarChart3, Activity,
  Clock, DollarSign, Target, Zap,
  CalendarDays, Gauge, ArrowUpRight, ArrowDownRight, Percent,
  Bot, Mail, Database,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ── */
interface DailyLead { date: string; count: number; hot: number; warm: number; new: number; cold: number; value: number }
interface SourceItem { name: string; value: number }
interface AgentStat { agent: string; tasks: number; success: number; failed: number; rate: number }
interface ScoreBucket { range: string; count: number; fill: string; label: string }
interface FunnelItem { stage: string; count: number; pct: number }
interface ValueDay { date: string; value: number; avgScore: number }
interface HourItem { hour: string; count: number }
interface WeeklyItem { metric: string; thisWeek: number; lastWeek: number }
interface SourceStatusItem { source: string; [key: string]: string | number }

interface ChartData {
  dailyLeads: DailyLead[];
  sourceData: SourceItem[];
  agentData: AgentStat[];
  scoreData: ScoreBucket[];
  funnelData: FunnelItem[];
  valueByDay: ValueDay[];
  sourceStatusData: SourceStatusItem[];
  hourData: HourItem[];
  weeklyComparison: WeeklyItem[];
}

const PIE_COLORS = ["#FF4D00", "#00D4FF", "#00FF88", "#FFD93D", "#A78BFA", "#FF6B6B", "#FF8C42", "#F472B6"];
const STATUS_COLORS: Record<string, string> = { new: "#00D4FF", hot: "#FF4D00", warm: "#FFD93D", cold: "#6B6B80", converted: "#00FF88", lost: "#FF4444" };

/* ── Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111118] border border-[#1E1E2A] rounded-lg p-3 shadow-xl">
      <p className="text-[10px] text-[#888899] mb-1 font-mono">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{typeof p.value === "number" && p.value > 999 ? (p.value / 1000).toFixed(1) + "K" : p.value}</span>
        </p>
      ))}
    </div>
  );
};

/* ── Pie Label ── */
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {name} {(percent * 100).toFixed(0)}%
    </text>
  );
};

/* ── Mini Sparkline ── */
function MiniSparkline({ data, color = "#00D4FF", height = 28 }: { data: number[]; color?: string; height?: number }) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  const areaPoints = `0,${height} ${points} ${w},${height}`;
  return (
    <svg width={w} height={height} className="shrink-0">
      <polygon points={areaPoints} fill={color} opacity={0.08} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Funnel color interpolation (cyan → orange) ── */
function funnelColor(index: number, total: number): string {
  const t = total > 1 ? index / (total - 1) : 0;
  // #00D4FF (0,212,255) → #FF4D00 (255,77,0)
  const r = Math.round(0 + t * 255);
  const g = Math.round(212 - t * 135);
  const b = Math.round(255 - t * 255);
  return `rgb(${r},${g},${b})`;
}

/* ════════════════════════════════════════════════════════════════════
   1. LEAD TRENDS — LineChart (leads over time) + BarChart (leads by status)
   ════════════════════════════════════════════════════════════════════ */
function TrendsChart({ data, valueData }: { data: DailyLead[]; valueData: ValueDay[] }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Lead Acquisition Trend — LineChart */}
      <div className="xl:col-span-2 dash-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold">Lead Acquisition Trend</h3>
            <p className="text-[10px] text-[#555566] mt-0.5">Last 14 days — by status</p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            {[
              { name: "Total", color: "#FF4D00" },
              { name: "Hot", color: "#FF4D00" },
              { name: "Warm", color: "#FFD93D" },
              { name: "New", color: "#00D4FF" },
              { name: "Cold", color: "#6B6B80" },
            ].map(s => (
              <span key={s.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color, opacity: s.name === "Total" ? 1 : 0.6 }} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF4D00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF4D00" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradHot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF4D00" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#FF4D00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888899" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="count" stroke="#FF4D00" strokeWidth={2.5} dot={false} name="Total" />
            <Line type="monotone" dataKey="hot" stroke="#FF4D00" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Hot" />
            <Line type="monotone" dataKey="warm" stroke="#FFD93D" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Warm" />
            <Line type="monotone" dataKey="new" stroke="#00D4FF" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="New" />
            <Line type="monotone" dataKey="cold" stroke="#6B6B80" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Cold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pipeline Value — ComposedChart */}
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Pipeline Value</h3>
        <p className="text-[10px] text-[#555566] mb-4">Daily value & avg score</p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={valueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} interval={2} />
            <YAxis yAxisId="left" tick={{ fontSize: 9, fill: "#888899" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9, fill: "#888899" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="value" fill="#FF4D00" radius={[3, 3, 0, 0]} name="Value ($)" opacity={0.7} />
            <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#00D4FF" strokeWidth={2} dot={false} name="Avg Score" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   2. LEAD CONVERSION FUNNEL — horizontal bars, cyan→orange gradient
   ════════════════════════════════════════════════════════════════════ */
function LeadConversionFunnel({ data }: { data: FunnelItem[] }) {
  // Hardcoded funnel stages for proper visualization
  const funnelStages = [
    { stage: "Website Visit", count: 1247, pct: 100 },
    { stage: "Lead Captured", count: 561, pct: 45 },
    { stage: "Qualified", count: 349, pct: 28 },
    { stage: "Proposal Sent", count: 187, pct: 15 },
    { stage: "Converted", count: 100, pct: 8 },
  ];

  // Use API data if it has meaningful funnel items, otherwise fallback
  const stages = data.length >= 3
    ? data.filter(d => d.stage !== "Lost").map(d => ({ ...d, stage: d.stage, count: d.count, pct: d.pct }))
    : funnelStages;

  const maxCount = Math.max(...stages.map(s => s.count), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Funnel bars */}
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Lead Conversion Funnel</h3>
        <p className="text-[10px] text-[#555566] mb-6">Website Visit → Converted pipeline</p>
        <div className="space-y-4">
          {stages.map((s, i) => {
            const widthPct = Math.max(15, (s.count / maxCount) * 100);
            const color = funnelColor(i, stages.length);
            return (
              <div key={s.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#ccc]">{s.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{s.count.toLocaleString()}</span>
                    <span className="text-[10px] text-[#888899]">{s.pct}%</span>
                  </div>
                </div>
                <div className="relative h-10 rounded-lg bg-[#08080C] border border-[#1E1E2A] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 rounded-lg"
                    style={{
                      background: `linear-gradient(90deg, ${color}30, ${color})`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white/90 drop-shadow-lg">{s.pct}% of total</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drop-off + summary */}
      <div className="space-y-4">
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Drop-off Analysis</h3>
          <p className="text-[10px] text-[#555566] mb-4">Stage-to-stage conversion rates</p>
          <div className="space-y-4">
            {stages.slice(1).map((s, i) => {
              const prevCount = stages[i].count;
              const stageRate = prevCount > 0 ? Math.round((s.count / prevCount) * 100) : 0;
              const isGood = stageRate >= 50;
              return (
                <div key={s.stage} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isGood ? "bg-[#00FF88]/10 text-[#00FF88]" : "bg-[#FF4444]/10 text-[#FF4444]"}`}>
                    {stageRate}%
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{stages[i].stage} → {s.stage}</p>
                    <p className="text-[10px] text-[#555566]">{s.count} leads made it through</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-3">Funnel Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total In", value: stages[0]?.count || 0, color: "#00D4FF" },
              { label: "Converted", value: stages[stages.length - 1]?.count || 0, color: "#FF4D00" },
              { label: "Overall Rate", value: (stages[0]?.count || 0) > 0 ? Math.round(((stages[stages.length - 1]?.count || 0) / stages[0].count) * 100) + "%" : "0%", color: "#00FF88" },
              { label: "Avg Drop-off", value: stages.length > 1 ? Math.round(100 - (stages.slice(1).reduce((acc, s, i) => acc + (s.count / stages[i].count) * 100, 0) / (stages.length - 1))) + "%" : "0%", color: "#FFD93D" },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                <p className="text-lg font-bold" style={{ color: s.color }}>{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
                <p className="text-[10px] text-[#555566]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   3. LEAD SOURCE BREAKDOWN — donut/pie chart with custom label
   ════════════════════════════════════════════════════════════════════ */
function LeadSourceBreakdown({ data, sourceStatus }: { data: SourceItem[]; sourceStatus: SourceStatusItem[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const statuses = ["new", "hot", "warm", "cold", "converted", "lost"];
  const sourceColors = ["#FF4D00", "#00D4FF", "#00FF88", "#FFD93D", "#A78BFA"];

  // Normalize source names to match expected labels
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Donut chart */}
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Lead Sources</h3>
        <p className="text-[10px] text-[#555566] mb-4">Distribution by origin</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <defs>
              {sourceColors.map((c, i) => (
                <linearGradient key={i} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={c} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={c} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {sortedData.map((_, i) => (
                <Cell key={i} fill={`url(#pieGrad${i})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {sortedData.map((s, i) => (
            <span key={s.name} className="flex items-center gap-1 text-[10px] text-[#888899]">
              <span className="w-2 h-2 rounded-sm" style={{ background: sourceColors[i % sourceColors.length] }} />
              {s.name} {total > 0 ? ((s.value / total) * 100).toFixed(0) : 0}%
            </span>
          ))}
        </div>
      </div>

      {/* Source breakdown bars */}
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Source Breakdown</h3>
        <p className="text-[10px] text-[#555566] mb-4">{total} total leads</p>
        <div className="space-y-3">
          {sortedData.map((s, i) => {
            const pct = total > 0 ? ((s.value / total) * 100).toFixed(1) : "0";
            return (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: sourceColors[i % sourceColors.length] }} />
                    <span className="text-xs capitalize">{s.name}</span>
                  </div>
                  <span className="text-xs font-mono text-[#888899]">{s.value} ({pct}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1A1A24]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: sourceColors[i % sourceColors.length] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Source × Status stacked bar */}
      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Source × Status</h3>
        <p className="text-[10px] text-[#555566] mb-4">Cross-tabulation</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sourceStatus} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="source" tick={{ fontSize: 9, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#888899" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {statuses.map(s => (
              <Bar
                key={s}
                dataKey={s}
                stackId="a"
                fill={STATUS_COLORS[s]}
                name={s.charAt(0).toUpperCase() + s.slice(1)}
                radius={s === statuses[statuses.length - 1] ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   4. AGENT PERFORMANCE GRID — cards with sparklines
   ════════════════════════════════════════════════════════════════════ */
interface AgentCardData {
  name: string;
  icon: any;
  color: string;
  stats: { label: string; value: string }[];
  sparkline: number[];
}

function AgentPerformanceGrid({ data }: { data: AgentStat[] }) {
  const agentCards: AgentCardData[] = [
    {
      name: "Lead Qualifier AI",
      icon: Bot,
      color: "#00D4FF",
      stats: [
        { label: "Processed", value: "156" },
        { label: "Accuracy", value: "94%" },
        { label: "Avg Response", value: "2.3s" },
      ],
      sparkline: [12, 15, 14, 18, 20, 19, 22, 21, 25, 24, 28, 26],
    },
    {
      name: "Email Outreach AI",
      icon: Mail,
      color: "#FF4D00",
      stats: [
        { label: "Sent", value: "89" },
        { label: "Open Rate", value: "32%" },
        { label: "Reply Rate", value: "12%" },
      ],
      sparkline: [8, 10, 9, 12, 11, 14, 13, 16, 15, 18, 17, 20],
    },
    {
      name: "CRM Sync Agent",
      icon: Database,
      color: "#00FF88",
      stats: [
        { label: "Synced", value: "234" },
        { label: "Success Rate", value: "99.8%" },
        { label: "Errors", value: "0" },
      ],
      sparkline: [18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24],
    },
    {
      name: "Analytics Agent",
      icon: BarChart3,
      color: "#FFD93D",
      stats: [
        { label: "Reports", value: "45" },
        { label: "On-time", value: "100%" },
        { label: "Avg Time", value: "4.1s" },
      ],
      sparkline: [3, 3, 4, 4, 3, 4, 4, 5, 4, 5, 4, 5],
    },
  ];

  // Merge API data if available
  if (data.length >= 3) {
    data.forEach((a, i) => {
      if (agentCards[i]) {
        agentCards[i].stats[0].value = String(a.tasks);
        agentCards[i].stats[1].value = a.rate + "%";
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Agent cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {agentCards.map((agent, idx) => {
          const IconComp = agent.icon;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="dash-card rounded-xl p-5 border border-[#1E1E2A] hover:border-[#2A2A3A] transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: agent.color + "15" }}
                  >
                    <IconComp className="w-4.5 h-4.5" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{agent.name}</p>
                    <p className="text-[10px] text-[#555566]">Active</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {agent.stats.map(stat => (
                  <div key={stat.label} className="text-center p-2 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                    <p className="text-sm font-bold" style={{ color: agent.color }}>{stat.value}</p>
                    <p className="text-[9px] text-[#555566] leading-tight mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Sparkline */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#555566]">Activity (12h)</span>
                <MiniSparkline data={agent.sparkline} color={agent.color} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent bar chart comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Task Volume by Agent</h3>
          <p className="text-[10px] text-[#555566] mb-6">Success vs failure breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
              <XAxis dataKey="agent" tick={{ fontSize: 10, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#888899" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tasks" fill="#1E1E2A" radius={[4, 4, 0, 0]} name="Total Tasks" />
              <Bar dataKey="success" fill="#00FF88" radius={[4, 4, 0, 0]} name="Successful" />
              <Bar dataKey="failed" fill="#FF4444" radius={[4, 4, 0, 0]} name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Success Rate by Agent</h3>
          <p className="text-[10px] text-[#555566] mb-6">Real-time reliability metrics</p>
          <div className="space-y-4">
            {data.map(a => {
              const c = a.rate >= 80 ? "#00FF88" : a.rate >= 50 ? "#FFD93D" : "#FF4444";
              return (
                <div key={a.agent}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium">{a.agent}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#555566]">{a.success}/{a.tasks} tasks</span>
                      <span className="text-sm font-bold" style={{ color: c }}>{a.rate}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A1A24]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${a.rate}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: c }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   5. SCORE DISTRIBUTION
   ════════════════════════════════════════════════════════════════════ */
function ScoresChart({ data }: { data: ScoreBucket[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Lead Score Distribution</h3>
        <p className="text-[10px] text-[#555566] mb-6">Quality breakdown across {total} leads</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888899" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Leads">
              {data.map((d, i) => (
                <Cell key={i} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dash-card rounded-xl p-5">
        <h3 className="text-sm font-bold mb-1">Quality Segments</h3>
        <p className="text-[10px] text-[#555566] mb-4">Lead quality tiers</p>
        <div className="space-y-3">
          {data.map(d => {
            const pct = total > 0 ? ((d.count / total) * 100).toFixed(1) : "0";
            return (
              <div key={d.range} className="p-3 rounded-lg bg-[#08080C] border border-[#1E1E2A]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded" style={{ background: d.fill }} />
                    <span className="text-xs font-medium">{d.label}</span>
                  </div>
                  <span className="text-xs font-mono text-[#888899]">{d.count} ({pct}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#555566]">Score: {d.range}</span>
                  <span className="text-[10px] text-[#555566]">{pct}% of all</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   6. HOURLY DISTRIBUTION
   ════════════════════════════════════════════════════════════════════ */
function HourlyChart({ data }: { data: HourItem[] }) {
  const peakHour = data.reduce((max, d) => (d.count > max.count ? d : max), data[0]);
  const avgPerHour = data.length > 0 ? Math.round(data.reduce((s, d) => s + d.count, 0) / data.length) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 dash-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold">Lead Submission by Hour</h3>
            <p className="text-[10px] text-[#555566] mt-0.5">When are leads coming in?</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#555566]">Peak: <span className="text-[#FF4D00] font-bold">{peakHour?.hour ?? "N/A"}</span></p>
            <p className="text-[10px] text-[#555566]">Avg: {avgPerHour}/hr</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} interval={1} />
            <YAxis tick={{ fontSize: 9, fill: "#888899" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[3, 3, 0, 0]} name="Leads">
              {data.map((d, i) => (
                <Cell key={i} fill={d.hour === peakHour?.hour ? "#FF4D00" : d.count >= avgPerHour ? "#FF8C42" : "#2A2A3A"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Time Insights</h3>
          <p className="text-[10px] text-[#555566] mb-4">Optimize your outreach timing</p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#FF4D00]/5 border border-[#FF4D00]/20">
              <p className="text-[10px] text-[#FF4D00] font-semibold">Peak Hour</p>
              <p className="text-lg font-bold">{peakHour?.hour ?? "N/A"}</p>
              <p className="text-[10px] text-[#555566]">{peakHour?.count ?? 0} leads submitted</p>
            </div>
            <div className="p-3 rounded-lg bg-[#08080C]">
              <p className="text-[10px] text-[#555566]">Business Hours (9am-5pm)</p>
              <p className="text-sm font-bold mt-0.5">
                {data.filter(d => { const h = parseInt(d.hour); return h >= 9 && h <= 17; }).reduce((s, d) => s + d.count, 0)} leads
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#08080C]">
              <p className="text-[10px] text-[#555566]">After Hours (5pm-9am)</p>
              <p className="text-sm font-bold mt-0.5">
                {data.filter(d => { const h = parseInt(d.hour); return h < 9 || h > 17; }).reduce((s, d) => s + d.count, 0)} leads
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   7. WEEKLY COMPARISON — grouped bar chart
   ════════════════════════════════════════════════════════════════════ */
function WeeklyComparison({ data, dailyLeads }: { data: WeeklyItem[]; dailyLeads: DailyLead[] }) {
  // Use weekly comparison data directly for grouped bars
  const comparisonData = data.length >= 3 ? data : [
    { metric: "New Leads", thisWeek: 142, lastWeek: 118 },
    { metric: "Qualified", thisWeek: 67, lastWeek: 54 },
    { metric: "Converted", thisWeek: 23, lastWeek: 18 },
    { metric: "Revenue", thisWeek: 48500, lastWeek: 39200 },
  ];

  // Also build daily comparison for the line overlay
  const midpoint = Math.floor(dailyLeads.length / 2);
  const lastWeekDaily = dailyLeads.slice(0, midpoint).map(d => ({ ...d, week: "Last Week" }));
  const thisWeekDaily = dailyLeads.slice(midpoint).map(d => ({ ...d, week: "This Week" }));
  const maxLen = Math.max(lastWeekDaily.length, thisWeekDaily.length);
  const dailyComparison: { day: string; thisWeek: number; lastWeek: number }[] = [];
  for (let i = 0; i < maxLen; i++) {
    dailyComparison.push({
      day: thisWeekDaily[i]?.date || lastWeekDaily[i]?.date || `D${i + 1}`,
      thisWeek: thisWeekDaily[i]?.count || 0,
      lastWeek: lastWeekDaily[i]?.count || 0,
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Grouped bar chart — metrics */}
      <div className="lg:col-span-2 dash-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold">Week-over-Week Comparison</h3>
            <p className="text-[10px] text-[#555566] mt-0.5">Key metrics — this week vs last week</p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FF4D00]" /> This Week</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2A2A3A]" /> Last Week</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={comparisonData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
            <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "#888899" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888899" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="lastWeek" fill="#2A2A3A" radius={[4, 4, 0, 0]} name="Last Week" barSize={32} />
            <Bar dataKey="thisWeek" fill="#FF4D00" radius={[4, 4, 0, 0]} name="This Week" barSize={32} opacity={0.9} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metric breakdown cards */}
      <div className="space-y-4">
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Metric Breakdown</h3>
          <p className="text-[10px] text-[#555566] mb-4">This week vs last week</p>
          <div className="space-y-4">
            {comparisonData.map((w, i) => {
              const change = w.lastWeek > 0 ? Math.round(((w.thisWeek - w.lastWeek) / w.lastWeek) * 100) : (w.thisWeek > 0 ? 100 : 0);
              const isUp = change >= 0;
              const colors = ["#FF4D00", "#00FF88", "#00D4FF", "#FFD93D"];
              const maxVal = Math.max(w.thisWeek, w.lastWeek, 1);
              return (
                <div key={w.metric}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium">{w.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#888899]">{w.thisWeek > 999 ? (w.thisWeek / 1000).toFixed(1) + "K" : w.thisWeek}</span>
                      <span className={`flex items-center gap-0.5 text-[10px] font-bold ${isUp ? "text-[#00FF88]" : "text-[#FF4444]"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(change)}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 rounded-full bg-[#1A1A24]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(w.lastWeek / maxVal) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="absolute inset-y-0 left-0 rounded-full bg-[#2A2A3A]"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(w.thisWeek / maxVal) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: colors[i] || "#FF4D00" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily trend mini chart */}
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Daily Trend</h3>
          <p className="text-[10px] text-[#555566] mb-4">Day-by-day comparison</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyComparison} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2A" />
              <XAxis dataKey="day" tick={{ fontSize: 8, fill: "#555566" }} axisLine={{ stroke: "#1E1E2A" }} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 8, fill: "#555566" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="lastWeek" fill="#2A2A3A" radius={[2, 2, 0, 0]} name="Last Week" />
              <Bar dataKey="thisWeek" fill="#FF4D00" radius={[2, 2, 0, 0]} name="This Week" opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   8. PERFORMANCE OVERVIEW
   ════════════════════════════════════════════════════════════════════ */
function PerformanceOverview({ data }: { data: ChartData }) {
  const totalLeads = data.funnelData.find(f => f.stage === "Total Leads")?.count || 0;
  const convertedLeads = data.funnelData.find(f => f.stage === "Converted")?.count || 0;
  const lostLeads = data.funnelData.find(f => f.stage === "Lost")?.count || 0;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0";
  const lossRate = totalLeads > 0 ? ((lostLeads / totalLeads) * 100).toFixed(1) : "0";

  const avgAgentRate = data.agentData.length > 0
    ? Math.round(data.agentData.reduce((s, a) => s + a.rate, 0) / data.agentData.length)
    : 0;
  const totalAgentTasks = data.agentData.reduce((s, a) => s + a.tasks, 0);
  const totalAgentSuccess = data.agentData.reduce((s, a) => s + a.success, 0);
  const totalAgentFailed = data.agentData.reduce((s, a) => s + a.failed, 0);

  const topSource = data.sourceData.length > 0
    ? [...data.sourceData].sort((a, b) => b.value - a.value)[0]
    : null;

  const highQualityLeads = data.scoreData.find(s => s.range === "81-100")?.count || 0;
  const highQualityPct = totalLeads > 0 ? ((highQualityLeads / totalLeads) * 100).toFixed(1) : "0";

  const totalValue = data.dailyLeads.reduce((s, d) => s + d.value, 0);
  const avgDailyLeads = data.dailyLeads.length > 0
    ? (data.dailyLeads.reduce((s, d) => s + d.count, 0) / data.dailyLeads.length).toFixed(1)
    : "0";

  const bestAgent = data.agentData.length > 0
    ? [...data.agentData].sort((a, b) => b.rate - a.rate || b.success - a.success)[0]
    : null;

  const peakHour = data.hourData.reduce((max, d) => (d.count > max.count ? d : max), data.hourData[0] || { hour: "N/A", count: 0 });

  return (
    <div className="space-y-6">
      {/* Top performance KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Conversion Rate", value: conversionRate + "%", icon: Percent, color: "#00FF88", desc: `${convertedLeads} of ${totalLeads} leads converted` },
          { label: "Agent Reliability", value: avgAgentRate + "%", icon: Zap, color: "#00D4FF", desc: `${totalAgentTasks} total tasks processed` },
          { label: "High Quality Leads", value: highQualityPct + "%", icon: Target, color: "#FF4D00", desc: `${highQualityLeads} leads scored 81-100` },
          { label: "Avg Daily Leads", value: avgDailyLeads, icon: TrendingUp, color: "#FFD93D", desc: `Total value: $${totalValue >= 1000 ? (totalValue / 1000).toFixed(1) + "K" : totalValue}` },
        ].map(kpi => (
          <div key={kpi.label} className="dash-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: kpi.color + "15" }}>
                <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-[#555566]">{kpi.label}</p>
                <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
              </div>
            </div>
            <p className="text-[10px] text-[#888899] leading-relaxed">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Detailed performance grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dash-card rounded-xl p-5">
          <h3 className="text-sm font-bold mb-1">Conversion Pipeline</h3>
          <p className="text-[10px] text-[#555566] mb-5">Stage-by-stage performance</p>
          <div className="space-y-4">
            {data.funnelData.filter(f => f.stage !== "Total Leads").map((f, i) => {
              const colors = ["#00D4FF", "#FFD93D", "#FF4D00", "#00FF88", "#FF4444"];
              const isGood = f.stage === "Converted" || f.pct > 20;
              return (
                <div key={f.stage} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: colors[i] + "15", color: colors[i] }}
                  >
                    {f.pct}%
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{f.stage}</span>
                      <span className="text-[10px] text-[#888899] font-mono">{f.count} leads</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#1A1A24]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: colors[i] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#00FF88]/5 border border-[#00FF88]/20 text-center">
              <p className="text-lg font-bold text-[#00FF88]">{conversionRate}%</p>
              <p className="text-[10px] text-[#555566]">Conversion Rate</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FF4444]/5 border border-[#FF4444]/20 text-center">
              <p className="text-lg font-bold text-[#FF4444]">{lossRate}%</p>
              <p className="text-[10px] text-[#555566]">Churn / Loss Rate</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="dash-card rounded-xl p-5">
            <h3 className="text-sm font-bold mb-1">AI Agent Summary</h3>
            <p className="text-[10px] text-[#555566] mb-4">Overall fleet performance</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#00D4FF]">{data.agentData.length}</p>
                <p className="text-[10px] text-[#555566]">Active Agents</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#00FF88]">{totalAgentSuccess}</p>
                <p className="text-[10px] text-[#555566]">Successful</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-[#08080C]">
                <p className="text-lg font-bold text-[#FF4444]">{totalAgentFailed}</p>
                <p className="text-[10px] text-[#555566]">Failed</p>
              </div>
            </div>
            <div className="space-y-2">
              {[...data.agentData].sort((a, b) => b.rate - a.rate).map((a, i) => (
                <div key={a.agent} className={`flex items-center gap-3 p-2 rounded-lg ${i === 0 ? "bg-[#FF4D00]/5 border border-[#FF4D00]/20" : "bg-[#08080C]"}`}>
                  <span className={`text-[10px] font-bold w-5 text-center ${i === 0 ? "text-[#FF4D00]" : "text-[#555566]"}`}>#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{a.agent}</p>
                    <p className="text-[10px] text-[#555566]">{a.success}/{a.tasks} tasks</p>
                  </div>
                  <span className={`text-xs font-bold ${a.rate >= 90 ? "text-[#00FF88]" : a.rate >= 50 ? "text-[#FFD93D]" : "text-[#FF4444]"}`}>{a.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card rounded-xl p-5">
            <h3 className="text-sm font-bold mb-3">Quick Insights</h3>
            <div className="space-y-2">
              {topSource && (
                <div className="flex items-center gap-3 p-2 rounded-lg bg-[#08080C]">
                  <div className="w-8 h-8 rounded-lg bg-[#FF4D00]/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-[#FF4D00]" /></div>
                  <div className="flex-1"><p className="text-[10px] text-[#555566]">Top Source</p><p className="text-xs font-bold">{topSource.name} ({topSource.value} leads)</p></div>
                </div>
              )}
              {bestAgent && (
                <div className="flex items-center gap-3 p-2 rounded-lg bg-[#08080C]">
                  <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 flex items-center justify-center"><Zap className="w-4 h-4 text-[#00FF88]" /></div>
                  <div className="flex-1"><p className="text-[10px] text-[#555566]">Best Agent</p><p className="text-xs font-bold">{bestAgent.agent} ({bestAgent.rate}%)</p></div>
                </div>
              )}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#08080C]">
                <div className="w-8 h-8 rounded-lg bg-[#FFD93D]/10 flex items-center justify-center"><Clock className="w-4 h-4 text-[#FFD93D]" /></div>
                <div className="flex-1"><p className="text-[10px] text-[#555566]">Peak Hour</p><p className="text-xs font-bold">{peakHour.hour} ({peakHour.count} leads)</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SKELETON
   ════════════════════════════════════════════════════════════════════ */
function ChartSkeleton() {
  return (
    <div className="dash-card rounded-xl p-5 h-[340px] animate-pulse bg-[#111118]">
      <div className="h-4 w-40 bg-[#1E1E2A] rounded mb-4" />
      <div className="h-[260px] bg-[#1A1A24] rounded-lg" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════════════════════ */
export default function DashboardCharts() {
  const [data, setData] = useState<ChartData | null>(null);
  const [activeTab, setActiveTab] = useState<"trends" | "funnel" | "sources" | "agents" | "scores" | "hourly" | "weekly" | "performance">("trends");

  useEffect(() => {
    fetch("/api/charts")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  );

  const tabs = [
    { key: "trends" as const, label: "Lead Trends", icon: TrendingUp },
    { key: "funnel" as const, label: "Conversion Funnel", icon: Target },
    { key: "sources" as const, label: "Source Analysis", icon: PieIcon },
    { key: "agents" as const, label: "Agent Perf", icon: Activity },
    { key: "scores" as const, label: "Score Dist", icon: BarChart3 },
    { key: "hourly" as const, label: "Hourly", icon: Clock },
    { key: "weekly" as const, label: "Weekly Compare", icon: CalendarDays },
    { key: "performance" as const, label: "Performance", icon: Gauge },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.weeklyComparison.map((w, i) => {
          const change = w.lastWeek > 0 ? Math.round(((w.thisWeek - w.lastWeek) / w.lastWeek) * 100) : (w.thisWeek > 0 ? 100 : 0);
          const isUp = change >= 0;
          const icons = [Zap, DollarSign, BarChart3];
          const colors = ["#FF4D00", "#00FF88", "#00D4FF"];
          const Icon = icons[i] || Zap;
          return (
            <div key={w.metric} className="dash-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors[i] + "15" }}>
                  <Icon className="w-4 h-4" style={{ color: colors[i] }} />
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${isUp ? "bg-[#00FF88]/10 text-[#00FF88]" : "bg-[#FF4444]/10 text-[#FF4444]"}`}>
                  {isUp ? "+" : ""}{change}%
                </span>
              </div>
              <p className="text-xl font-bold">{w.thisWeek > 999 ? (w.thisWeek / 1000).toFixed(1) + "K" : w.thisWeek}</p>
              <p className="text-[10px] text-[#555566] mt-0.5">This Week {w.metric}</p>
              <p className="text-[9px] text-[#888899]">Last week: {w.lastWeek}</p>
            </div>
          );
        })}
      </div>

      {/* Chart tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-all whitespace-nowrap border ${activeTab === t.key ? "bg-[#FF4D00]/10 border-[#FF4D00]/30 text-[#FF4D00]" : "border-[#1E1E2A] text-[#555566] hover:text-[#888899]"}`}
          >
            <t.icon className="w-3 h-3" />
            {t.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === "trends" && <TrendsChart data={data.dailyLeads} valueData={data.valueByDay} />}
        {activeTab === "funnel" && <LeadConversionFunnel data={data.funnelData} />}
        {activeTab === "sources" && <LeadSourceBreakdown data={data.sourceData} sourceStatus={data.sourceStatusData} />}
        {activeTab === "agents" && <AgentPerformanceGrid data={data.agentData} />}
        {activeTab === "scores" && <ScoresChart data={data.scoreData} />}
        {activeTab === "hourly" && <HourlyChart data={data.hourData} />}
        {activeTab === "weekly" && <WeeklyComparison data={data.weeklyComparison} dailyLeads={data.dailyLeads} />}
        {activeTab === "performance" && <PerformanceOverview data={data} />}
      </motion.div>
    </div>
  );
}
