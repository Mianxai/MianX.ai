"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed, HeartPulse, GraduationCap, HardHat, ShoppingBag, Truck, Factory,
  ArrowRight, Zap, Shield, Globe, Cpu, ChevronRight, Menu, X,
  Package, Puzzle, Palette, Bot, BarChart3, Link2, Star, Download, TrendingUp, Users, Crown, Search,
  // Dashboard icons
  LayoutDashboard, Users as UsersIcon, DollarSign, Activity, Radio, Clock, Filter, MoreVertical, Trash2, Eye, RefreshCw,
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";

/* ══════════════════════════ WEBSITE DATA ══════════════════════════ */

const industries = [
  { name: "Restaurant OS", icon: UtensilsCrossed, tagline: "Orders, menus, inventory & analytics — one unified platform.", color: "#FF6B35", bg: "rgba(255,107,53,0.08)" },
  { name: "Hospital OS", icon: HeartPulse, tagline: "Patient records, scheduling, billing & compliance automation.", color: "#00D4FF", bg: "rgba(0,212,255,0.08)" },
  { name: "School OS", icon: GraduationCap, tagline: "Admissions, attendance, grading & parent communication hub.", color: "#00FF88", bg: "rgba(0,255,136,0.08)" },
  { name: "Construction OS", icon: HardHat, tagline: "Project timelines, resource planning, safety & cost tracking.", color: "#FFD93D", bg: "rgba(255,217,61,0.08)" },
  { name: "Retail OS", icon: ShoppingBag, tagline: "POS, stock management, customer loyalty & multi-channel sales.", color: "#FF4D00", bg: "rgba(255,77,0,0.08)" },
  { name: "Logistics OS", icon: Truck, tagline: "Fleet tracking, route optimization, warehousing & delivery ops.", color: "#A78BFA", bg: "rgba(167,139,250,0.08)" },
  { name: "Manufacturing OS", icon: Factory, tagline: "Production lines, quality control, supply chain & IoT integration.", color: "#F472B6", bg: "rgba(244,114,182,0.08)" },
];

const capabilities = [
  { icon: Zap, title: "AI-Native Intelligence", desc: "Every module is powered by autonomous AI agents that learn, adapt, and execute tasks without manual intervention." },
  { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption, role-based access control, SOC 2 compliance, and real-time threat monitoring built in." },
  { icon: Globe, title: "Multi-Location Ready", desc: "Operate across cities, countries, and time zones with centralized control and localized execution." },
  { icon: Cpu, title: "Infinite Integrations", desc: "Connect with 500+ tools, payment gateways, CRMs, ERPs, and custom APIs through our universal connector." },
];

type Category = "all" | "apps" | "plugins" | "themes" | "agents" | "reports" | "integrations";

const categories: { key: Category; label: string; icon: typeof Package; count: number }[] = [
  { key: "all", label: "All", icon: Package, count: 42 },
  { key: "apps", label: "Apps", icon: Package, count: 12 },
  { key: "plugins", label: "Plugins", icon: Puzzle, count: 8 },
  { key: "themes", label: "Themes", icon: Palette, count: 6 },
  { key: "agents", label: "AI Agents", icon: Bot, count: 7 },
  { key: "reports", label: "Reports", icon: BarChart3, count: 5 },
  { key: "integrations", label: "Integrations", icon: Link2, count: 4 },
];

interface MarketplaceItem {
  name: string; desc: string; category: Category; icon: typeof Package;
  color: string; rating: number; reviews: number; installs: string;
  price: string; badge?: string; badgeColor?: string; featured?: boolean;
}

const marketplaceItems: MarketplaceItem[] = [
  { name: "Smart Billing Pro", desc: "Automated invoicing, recurring payments, and tax compliance across 40+ countries.", category: "apps", icon: Crown, color: "#FF4D00", rating: 4.9, reviews: 1247, installs: "24.5K", price: "Free", badge: "Popular", badgeColor: "rgba(255,77,0,0.15)" },
  { name: "Staff Scheduler", desc: "AI shift planning, time-off management, and labor cost optimization.", category: "apps", icon: Users, color: "#00D4FF", rating: 4.8, reviews: 892, installs: "18.2K", price: "$29/mo" },
  { name: "Inventory Pulse", desc: "Real-time stock tracking, auto-reorder alerts, and supplier management.", category: "apps", icon: TrendingUp, color: "#00FF88", rating: 4.7, reviews: 634, installs: "12.8K", price: "$19/mo" },
  { name: "Customer CRM", desc: "360-degree customer profiles, interaction history, and loyalty engine.", category: "apps", icon: Users, color: "#A78BFA", rating: 4.8, reviews: 1056, installs: "21.3K", price: "$39/mo" },
  { name: "WhatsApp Connector", desc: "Two-way WhatsApp messaging for orders, updates, and support tickets.", category: "plugins", icon: Link2, color: "#25D366", rating: 4.9, reviews: 2103, installs: "45.1K", price: "Free", badge: "Top Rated", badgeColor: "rgba(0,255,136,0.12)" },
  { name: "Payment Gateway", desc: "Stripe, PayPal, JazzCash, EasyPaisa — unified checkout experience.", category: "plugins", icon: Crown, color: "#FFD93D", rating: 4.8, reviews: 1567, installs: "38.7K", price: "$49/mo" },
  { name: "DarkOps Pro", desc: "Ultra-modern dark theme with glassmorphism, gradients, and micro-animations.", category: "themes", icon: Palette, color: "#FF4D00", rating: 4.9, reviews: 3241, installs: "52.3K", price: "$59", badge: "Best Seller", badgeColor: "rgba(255,77,0,0.15)" },
  { name: "Neon Grid", desc: "Cyberpunk-inspired theme with neon accents and dynamic grid layouts.", category: "themes", icon: Palette, color: "#00D4FF", rating: 4.6, reviews: 756, installs: "11.2K", price: "$49" },
  { name: "Lead Qualifier AI", desc: "Automatically scores and qualifies incoming leads using behavioral signals.", category: "agents", icon: Bot, color: "#FF4D00", rating: 4.9, reviews: 1876, installs: "31.4K", price: "$79/mo", badge: "Featured", badgeColor: "rgba(0,212,255,0.12)", featured: true },
  { name: "Support Copilot", desc: "AI chatbot that resolves 70% of support tickets autonomously.", category: "agents", icon: Bot, color: "#00D4FF", rating: 4.8, reviews: 1432, installs: "26.8K", price: "$59/mo" },
  { name: "Content Writer AI", desc: "Generates product descriptions, emails, and social posts in your brand voice.", category: "agents", icon: Bot, color: "#00FF88", rating: 4.7, reviews: 987, installs: "15.9K", price: "$49/mo" },
  { name: "Revenue Dashboard", desc: "Real-time revenue tracking, MRR/ARR, churn rate, and forecast models.", category: "reports", icon: BarChart3, color: "#FF4D00", rating: 4.8, reviews: 1123, installs: "22.1K", price: "Free", badge: "Essential", badgeColor: "rgba(255,217,61,0.12)" },
  { name: "Customer Analytics", desc: "Cohort analysis, LTV prediction, and segment-based behavior insights.", category: "reports", icon: TrendingUp, color: "#A78BFA", rating: 4.7, reviews: 678, installs: "13.5K", price: "$29/mo" },
  { name: "Google Workspace", desc: "Sync contacts, calendars, and drive files directly into your OS.", category: "integrations", icon: Link2, color: "#4285F4", rating: 4.8, reviews: 2340, installs: "41.2K", price: "Free" },
  { name: "Slack Bridge", desc: "Post alerts, lead updates, and AI summaries to your Slack channels.", category: "integrations", icon: Link2, color: "#E01E5A", rating: 4.7, reviews: 1567, installs: "29.8K", price: "Free" },
];

/* ══════════════════════════ ANIMS ══════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const dashFade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }),
};

/* ══════════════════════════ DASHBOARD TYPES ══════════════════════════ */

interface Lead {
  id: string; name: string; email: string; phone: string | null;
  company: string | null; source: string; status: string; score: number;
  value: string; message: string | null; assignedTo: string | null;
  createdAt: string; updatedAt: string;
}

interface AgentActivity {
  id: string; agent: string; action: string; status: string; createdAt: string;
}

interface DashboardStats {
  totalLeads: number; hotLeads: number; warmLeads: number; newLeads: number;
  totalValue: number; activeAgents: number; conversions: number; recentLeads: number;
}

/* ══════════════════════════ COMPONENTS ══════════════════════════ */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-[#FFD93D] text-[#FFD93D]" : "text-[#2A2A3A]"}`} />
      ))}
    </div>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-[#FF4D00]" : score >= 50 ? "bg-[#FFD93D]" : "bg-[#6B6B80]";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-[#1A1A24] overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-[#888899] w-6 text-right">{score}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    hot: "status-bg-hot", warm: "status-bg-warm", new: "status-bg-new", cold: "status-bg-cold",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ${map[status] || "status-bg-cold"}`}>
      {status}
    </span>
  );
}

function RelativeTime({ dateStr }: { dateStr: string }) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return <span className="text-[#555566]">just now</span>;
  if (mins < 60) return <span className="text-[#555566]">{mins}m ago</span>;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return <span className="text-[#555566]">{hrs}h ago</span>;
  const days = Math.floor(hrs / 24);
  return <span className="text-[#555566]">{days}d ago</span>;
}

/* ══════════════════════════ DASHBOARD VIEW ══════════════════════════ */

function DashboardView() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, leadsRes, actRes] = await Promise.all([
        fetch("/api/stats"), fetch("/api/leads"), fetch("/api/activity"),
      ]);
      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      const actData = await actRes.json();
      setStats(statsData);
      setLeads(leadsData.leads || []);
      setActivities(actData || []);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-refresh every 15s
  useEffect(() => {
    const iv = setInterval(fetchData, 15000);
    return () => clearInterval(iv);
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleDeleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
    fetchData();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const filteredLeads = statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#FF4D00]/30 border-t-[#FF4D00] rounded-full animate-spin" />
          <p className="text-sm text-[#555566] font-mono">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto w-full">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-[#FF4D00]" />
            Super Admin Dashboard
          </h1>
          <p className="text-sm text-[#555566] mt-1">Real-time lead intelligence & AI agent monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#00FF88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] accent-dot" />
            Live
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[#1E1E2A] bg-[#111118] text-[#888899] hover:border-[#FF4D00]/40 hover:text-[#E8E8EC] transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats && [
          { label: "Total Leads", value: stats.totalLeads, icon: UsersIcon, color: "#FF4D00", sub: `+${stats.recentLeads} this week` },
          { label: "Hot Leads", value: stats.hotLeads, icon: TrendingUp, color: "#FF4D00", sub: `${stats.conversions} conversions` },
          { label: "Pipeline Value", value: `$${(stats.totalValue / 1000).toFixed(1)}K`, icon: DollarSign, color: "#00FF88", sub: "all industries" },
          { label: "Active Agents", value: stats.activeAgents, icon: Activity, color: "#00D4FF", sub: "3 AI agents" },
        ].map((stat, i) => (
          <motion.div key={stat.label} variants={dashFade} custom={i}
            className="dash-card rounded-xl p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <Radio className="w-3 h-3 text-[#00FF88] rec-dot" />
            </div>
            <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
            <p className="text-xs text-[#555566]">{stat.label}</p>
            <p className="text-[10px] text-[#888899] mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid: Leads table + Activity feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Leads Table - 2 cols */}
        <div className="xl:col-span-2 dash-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[#1E1E2A]">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-[#FF4D00]" /> Leads
              </h2>
              <p className="text-xs text-[#555566] mt-0.5">{filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} {statusFilter !== "all" && `filtered by ${statusFilter}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#555566]" />
              {[
                { key: "all", label: "All" },
                { key: "hot", label: "Hot" },
                { key: "warm", label: "Warm" },
                { key: "new", label: "New" },
                { key: "cold", label: "Cold" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                    statusFilter === f.key
                      ? "bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30"
                      : "text-[#555566] border border-transparent hover:text-[#888899]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-[#111118] z-10">
                <tr className="text-[10px] text-[#555566] uppercase tracking-wider border-b border-[#1E1E2A]">
                  <th className="px-5 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Agent</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E2A]/50">
                <AnimatePresence>
                  {filteredLeads.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="hover:bg-[#15151E] transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-sm font-semibold truncate max-w-[160px]">{lead.name}</p>
                          <p className="text-[11px] text-[#555566] truncate max-w-[160px]">{lead.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-[#888899] capitalize font-mono">{lead.source}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="text-[10px] font-semibold px-2 py-1 rounded-md border-none bg-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF4D00]/50 status-bg-${lead.status}"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="new">New</option>
                          <option value="hot">Hot</option>
                          <option value="warm">Warm</option>
                          <option value="cold">Cold</option>
                        </select>
                      </td>
                      <td className="px-4 py-3.5">
                        <ScoreBar score={lead.score} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-mono text-[#E8E8EC]">{lead.value}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-[11px] text-[#00D4FF] font-medium">{lead.assignedTo || "—"}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <RelativeTime dateStr={lead.createdAt} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-md hover:bg-[#1A1A24] text-[#555566] hover:text-[#00D4FF] transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }}
                            className="p-1.5 rounded-md hover:bg-[#FF4444]/10 text-[#555566] hover:text-[#FF4444] transition-colors" title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-sm text-[#555566]">No leads found</div>
            )}
          </div>
        </div>

        {/* Activity Feed - 1 col */}
        <div className="dash-card rounded-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#1E1E2A] flex items-center justify-between">
            <h2 className="text-base font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00D4FF]" /> Agent Activity
            </h2>
            <span className="text-[10px] text-[#555566] font-mono">LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[520px] divide-y divide-[#1E1E2A]/30">
            {activities.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-3.5 hover:bg-[#15151E]/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    act.status === "success" ? "bg-[#00FF88]" : act.agent === "System" ? "bg-[#FFD93D]" : "bg-[#00D4FF]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#E8E8EC] leading-relaxed">{act.action}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        act.agent === "System" ? "bg-[#FFD93D]/10 text-[#FFD93D]" : "bg-[#00D4FF]/10 text-[#00D4FF]"
                      }`}>
                        {act.agent}
                      </span>
                      <RelativeTime dateStr={act.createdAt} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-12 text-sm text-[#555566]">No activity yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ WEBSITE VIEW ══════════════════════════ */

function WebsiteView() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let items = activeCategory === "all" ? marketplaceItems : marketplaceItems.filter((item) => item.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#FF4D00]/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/[0.03] blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex justify-center mb-8">
            <span className="section-marker">Enterprise Platform</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            The Enterprise Operating System{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#FF4D00] via-[#FF8C42] to-[#FFD93D] bg-clip-text text-transparent">for Modern Businesses</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="max-w-2xl mx-auto text-base sm:text-lg text-[#888899] leading-relaxed mb-10">
            One intelligent platform. Seven industry-specific operating systems.
            Automate operations, eliminate manual work, and scale effortlessly with AI-powered agents that run your business 24/7.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#industries" className="pulse-btn px-8 py-3.5 text-sm font-bold rounded-xl bg-[#FF4D00] text-black hover:bg-[#FF6A2A] transition-colors inline-flex items-center gap-2">
              Explore Industries <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#marketplace" className="px-8 py-3.5 text-sm font-semibold rounded-xl border border-[#2A2A3A] text-[#E8E8EC] hover:border-[#FF4D00]/40 hover:text-white transition-colors">
              Browse Marketplace
            </a>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-[#555566] tracking-widest uppercase font-mono">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] accent-dot" />All Systems Operational</span>
            <span className="hidden sm:inline">|</span><span>7 Industry Verticals</span>
            <span className="hidden sm:inline">|</span><span>500+ Integrations</span>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[#1E1E2A]/60 py-4 overflow-hidden">
        <div className="marquee-track">
          {[...industries, ...industries].map((ind, i) => (
            <span key={i} className="mx-8 text-sm font-mono text-[#555566] tracking-widest uppercase whitespace-nowrap flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ind.color }} />{ind.name}
            </span>
          ))}
        </div>
      </div>

      {/* INDUSTRIES */}
      <section id="industries" className="py-20 md:py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-14">
            <span className="section-marker">Industry Solutions</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Seven OS. Every Industry Covered.</h2>
            <p className="mt-4 max-w-xl mx-auto text-[#888899]">Purpose-built operating systems for the world's most critical industries. Deploy in days, not months.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <motion.div key={ind.name} variants={fadeUp} custom={i} className="group relative rounded-2xl border border-[#1E1E2A] bg-[#111118] p-6 hover:border-transparent transition-all duration-500 cursor-pointer overflow-hidden" style={{ "--card-accent": ind.color } as React.CSSProperties}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${ind.bg}, transparent 70%)` }} />
                <div className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${ind.color}, transparent)` }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: ind.bg }}>
                    <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">{ind.name}<ChevronRight className="w-4 h-4 text-[#555566] group-hover:text-[#E8E8EC] group-hover:translate-x-1 transition-all duration-300" /></h3>
                  <p className="text-sm text-[#888899] leading-relaxed">{ind.tagline}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section id="marketplace" className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-10">
            <span className="section-marker">Level 5</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">MianX Marketplace</h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#888899]">Extend your OS with apps, plugins, themes, AI agents, reports, and integrations.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} custom={1} className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555566]" />
              <input type="text" placeholder="Search apps, plugins, agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#111118] border border-[#1E1E2A] text-sm text-[#E8E8EC] placeholder:text-[#555566] focus:outline-none focus:border-[#FF4D00]/50 transition-colors" />
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} custom={2} className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${isActive ? "bg-[#FF4D00]/10 border-[#FF4D00]/40 text-[#FF4D00]" : "bg-[#111118] border-[#1E1E2A] text-[#888899] hover:border-[#2A2A3A] hover:text-[#E8E8EC]"}`}>
                  <cat.icon className="w-3.5 h-3.5" />{cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${isActive ? "bg-[#FF4D00]/20 text-[#FF4D00]" : "bg-[#1A1A24] text-[#555566]"}`}>{cat.count}</span>
                </button>
              );
            })}
          </motion.div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-[#555566] font-mono tracking-wider uppercase">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            <a href="#marketplace" className="text-xs text-[#555566] hover:text-[#FF4D00] transition-colors flex items-center gap-1">Powered by MianX.ai <Cpu className="w-3 h-3" /></a>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} variants={stagger} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <motion.div key={item.name} variants={fadeUp} custom={i} className={`group relative rounded-2xl border bg-[#111118] p-5 transition-all duration-400 hover:bg-[#15151E] cursor-pointer overflow-hidden ${item.featured ? "border-[#FF4D00]/30 hover:border-[#FF4D00]/50" : "border-[#1E1E2A] hover:border-[#2A2A3A]"}`}>
                  {item.featured && <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent" />}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${item.color}15` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold truncate">{item.name}</h3>
                        {item.badge && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0" style={{ background: item.badgeColor, color: item.color }}>{item.badge}</span>}
                      </div>
                      <p className="text-xs text-[#888899] leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5"><Stars rating={item.rating} /><span className="text-xs text-[#888899]">{item.rating}</span><span className="text-[10px] text-[#555566]">({item.reviews.toLocaleString()})</span></div>
                        <span className="text-[10px] text-[#555566]">|</span>
                        <div className="flex items-center gap-1"><Download className="w-3 h-3 text-[#555566]" /><span className="text-xs text-[#888899]">{item.installs}</span></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${item.price === "Free" ? "text-[#00FF88]" : "text-[#E8E8EC]"}`}>{item.price}</span>
                        <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#FF4D00] text-black hover:bg-[#FF6A2A] transition-colors inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>Install <Download className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-[#2A2A3A] mx-auto mb-4" />
              <p className="text-[#888899] text-sm">No results found</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="mt-3 text-xs text-[#FF4D00] hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-14">
            <span className="section-marker">Platform Capabilities</span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Built for Scale. Powered by AI.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} custom={i} className="notch-corner rounded-2xl border border-[#1E1E2A] bg-[#111118] p-8 hover:bg-[#15151E] transition-colors">
                <cap.icon className="w-8 h-8 text-[#FF4D00] mb-4" /><h3 className="text-xl font-bold mb-3">{cap.title}</h3><p className="text-sm text-[#888899] leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              Ready to Transform <span className="bg-gradient-to-r from-[#FF4D00] to-[#00D4FF] bg-clip-text text-transparent">Your Business?</span>
            </h2>
            <p className="text-[#888899] max-w-lg mx-auto mb-10">Join hundreds of enterprises already running on MianX.ai. Deploy your industry OS in under 48 hours.</p>
            <a href="#marketplace" className="pulse-btn inline-flex items-center gap-2 px-10 py-4 text-base font-bold rounded-xl bg-[#FF4D00] text-black hover:bg-[#FF6A2A] transition-colors">Start Free Trial <ArrowRight className="w-5 h-5" /></a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════ MAIN PAGE ══════════════════════════ */

export default function HomePage() {
  const [view, setView] = useState<"site" | "dashboard">("site");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#08080C] text-[#E8E8EC] overflow-x-hidden">
      <div className="grain" />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#08080C]/70 border-b border-[#1E1E2A]/60">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
          <a href="/" className="flex items-center gap-2.5 group" onClick={() => setView("site")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF8C42] flex items-center justify-center shadow-lg shadow-[#FF4D00]/20 group-hover:shadow-[#FF4D00]/40 transition-shadow">
              <Cpu className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">Mian<span className="text-[#FF4D00]">X</span>.ai</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {view === "site" ? (
              <>
                <a href="#industries" className="nav-link">Industries</a>
                <a href="#marketplace" className="nav-link">Marketplace</a>
                <a href="#capabilities" className="nav-link">Capabilities</a>
              </>
            ) : null}
            <button
              onClick={() => setView(view === "site" ? "dashboard" : "site")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                view === "dashboard"
                  ? "bg-[#111118] border border-[#1E1E2A] text-[#888899] hover:text-[#E8E8EC]"
                  : "bg-[#FF4D00] text-black hover:bg-[#FF6A2A]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {view === "dashboard" ? "Back to Site" : "Dashboard"}
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden border-t border-[#1E1E2A]/60 bg-[#08080C]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-4 px-6 py-5">
              {view === "site" && (
                <>
                  <a href="#industries" className="nav-link" onClick={() => setMobileOpen(false)}>Industries</a>
                  <a href="#marketplace" className="nav-link" onClick={() => setMobileOpen(false)}>Marketplace</a>
                  <a href="#capabilities" className="nav-link" onClick={() => setMobileOpen(false)}>Capabilities</a>
                </>
              )}
              <button
                onClick={() => { setView(view === "site" ? "dashboard" : "site"); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#FF4D00] text-black justify-center"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {view === "dashboard" ? "Back to Site" : "Dashboard"}
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* CONTENT */}
      <main className={`flex-1 ${view === "dashboard" ? "pt-20" : ""}`}>
        <AnimatePresence mode="wait">
          {view === "site" ? (
            <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <WebsiteView />
            </motion.div>
          ) : (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <DashboardView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1E1E2A]/60 py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#555566]">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#FF4D00] to-[#FF8C42] flex items-center justify-center"><Cpu className="w-2.5 h-2.5 text-black" /></div>
            <span>MianX.ai</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#555566]"><span>2025 MianX.ai. All rights reserved.</span></div>
          <a href="/" className="group flex items-center gap-1.5 text-xs text-[#555566] hover:text-[#FF4D00] transition-colors">
            Powered by <span className="font-bold text-[#888899] group-hover:text-[#FF4D00] transition-colors">MianX.ai</span>
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </div>
      </footer>
    </div>
  );
}
