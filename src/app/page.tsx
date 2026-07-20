"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit, Bot, Target, TrendingUp, Users, BarChart3,
  MessageSquare, Settings, ArrowRight, Zap, Shield, Globe,
  Cpu, Network, Layers, Eye, Bell, Search, Menu, X,
  ChevronDown, Plus, Filter, RefreshCw, Activity, Send,
  Clock, Mail, Phone, Building2, Trash2, UserCheck, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ============================================================
   TYPES
   ============================================================ */

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  score: number;
  value: string;
  message: string | null;
  assignedTo: string | null;
  createdAt: string;
}

interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  status: string;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  newLeads: number;
  totalValue: number;
  activeAgents: number;
  conversions: number;
  recentLeads: number;
}

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

/* ============================================================
   LOGO COMPONENT
   ============================================================ */

function MianXLogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sz = { small: 28, default: 36, large: 48 }[size];
  const txtSz = { small: "text-base", default: "text-xl", large: "text-3xl" }[size];
  const subSz = { small: "text-[7px]", default: "text-[9px]", large: "text-[11px]" }[size];
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative" style={{ width: sz, height: sz }}>
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ background: "#FF4D00", borderRadius: size === "small" ? 6 : 8 }}
        >
          <BrainCircuit size={sz * 0.5} color="#000" strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <div className={`${txtSz} font-bold leading-none tracking-wider`} style={{ fontFamily: "var(--font-geist-sans)" }}>
          <span className="text-[#E8E8EC]">Mian</span><span className="text-[#FF4D00]">X</span><span className="text-[#6B6B80] font-light">.ai</span>
        </div>
        {size !== "small" && (
          <div className={`${subSz} tracking-[0.25em] text-[#6B6B80] mt-0.5 font-mono`}>
            AI AGENTS AGENCY
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   TOAST SYSTEM
   ============================================================ */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed top-20 right-6 z-[150] transition-all duration-500 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
      }`}
      style={{
        background: "#111118",
        border: "1px solid #FF4D00",
        borderLeft: "3px solid #FF4D00",
        padding: "0.75rem 1.25rem",
        maxWidth: "360px",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */

function Navbar({
  onOpenDashboard,
  isDashboard,
  onBackToLanding,
}: {
  onOpenDashboard: () => void;
  isDashboard: boolean;
  onBackToLanding: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const landingLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "AI Workforce", href: "#workforce" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8,8,12,0.85)" : "rgba(8,8,12,0.5)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-3.5 flex items-center justify-between">
        <button onClick={isDashboard ? onBackToLanding : () => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <MianXLogo size="small" />
        </button>

        {!isDashboard && (
          <nav className="hidden lg:flex items-center gap-9">
            {landingLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isDashboard ? (
            <Button
              onClick={onBackToLanding}
              variant="ghost"
              className="text-xs uppercase tracking-wider text-[#888899] hover:text-[#E8E8EC]"
            >
              <ArrowRight className="mr-1.5 h-3.5 w-3.5 rotate-180" />
              Back to Site
            </Button>
          ) : (
            <>
              <Button
                onClick={onOpenDashboard}
                variant="ghost"
                className="text-xs uppercase tracking-wider text-[#888899] hover:text-[#E8E8EC] hidden sm:flex"
              >
                Dashboard
              </Button>
              <Button
                onClick={onOpenDashboard}
                className="pulse-btn text-xs uppercase tracking-wider font-semibold px-5 py-2"
                style={{ background: "#FF4D00", color: "#000", borderRadius: 4 }}
              >
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                Launch Dashboard
              </Button>
            </>
          )}
          <button className="lg:hidden text-[#E8E8EC]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden pb-4 border-t border-white/5 px-5"
        >
          {!isDashboard &&
            landingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-xs uppercase tracking-wider text-[#888899]"
              >
                {link.label}
              </a>
            ))}
          <button
            onClick={() => { onOpenDashboard(); setMobileOpen(false); }}
            className="w-full mt-2 py-3 text-xs uppercase tracking-wider font-semibold text-left"
            style={{ color: "#FF4D00" }}
          >
            {isDashboard ? "Back to Site" : "Launch Dashboard"}
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ============================================================
   LANDING PAGE
   ============================================================ */

function LandingPage({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  const features = [
    { icon: Target, title: "Lead Capture", desc: "AI agents deployed across channels that intelligently capture, qualify, and route every lead to your dashboard in real-time.", color: "#FF4D00" },
    { icon: Eye, title: "Super Admin Dashboard", desc: "Unified command center — every lead, every agent, every outcome. Full visibility and control designed for founders.", color: "#00D4FF" },
    { icon: Bot, title: "Autonomous AI Agents", desc: "Specialized AI agents take over — analyzing, qualifying, nurturing, and converting leads while you focus on strategy.", color: "#00FF88" },
    { icon: BrainCircuit, title: "AI Workforce OS", desc: "Deploy entire AI departments — Sales, Marketing, Support — working as a coordinated team under your leadership.", color: "#FF4D00" },
    { icon: Shield, title: "Enterprise Security", desc: "Zero-trust architecture, end-to-end encryption, and role-based access. Your data stays protected.", color: "#00D4FF" },
    { icon: TrendingUp, title: "Intelligence Platform", desc: "Every interaction compounds knowledge. Making your AI workforce smarter with every single engagement.", color: "#00FF88" },
  ];

  const steps = [
    { step: "01", title: "Client Submits Lead", desc: "Leads flow from your website, social media, email, or API. Every lead is captured and logged automatically.", icon: Globe, color: "#FF4D00" },
    { step: "02", title: "Dashboard Shows Lead", desc: "Real-time unified command center. See source, quality score, contact info, and AI analysis in one view.", icon: BarChart3, color: "#00D4FF" },
    { step: "03", title: "AI Agents Activate", desc: "Sales AI qualifies. Marketing AI nurtures. Support AI communicates. All simultaneously, all autonomously.", icon: Bot, color: "#00FF88" },
    { step: "04", title: "Conversion & Scale", desc: "Real-time analytics and performance tracking ensure your agency scales without limits.", icon: TrendingUp, color: "#FFD93D" },
  ];

  const agents = [
    { name: "Sales AI", role: "Lead Conversion", tasks: 47, color: "#FF4D00", status: "active" },
    { name: "Marketing AI", role: "Campaigns", tasks: 23, color: "#00D4FF", status: "active" },
    { name: "Support AI", role: "Communication", tasks: 89, color: "#00FF88", status: "active" },
    { name: "Analytics AI", role: "Intelligence", tasks: 15, color: "#FFD93D", status: "active" },
    { name: "CRM AI", role: "Relationships", tasks: 0, color: "#FF6B6B", status: "standby" },
    { name: "Ops AI", role: "Operations", tasks: 34, color: "#FF4D00", status: "active" },
  ];

  return (
    <div className="bg-textured">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "rgba(255,77,0,0.06)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(0,212,255,0.04)" }} />

        <motion.div initial="hidden" animate="visible" className="relative z-10 max-w-5xl mx-auto px-5 text-center">
          <motion.div custom={0} variants={fadeUp} className="mb-6">
            <div className="section-marker">AI-Native Platform</div>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tight"
          >
            <span className="block">Your AI</span>
            <span className="block" style={{ color: "#FF4D00" }}>Agents Agency</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl font-light tracking-wider text-[#6B6B80] mt-2 sm:mt-3">
              STARTS HERE
            </span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="mt-6 sm:mt-8 text-sm sm:text-base text-[#888899] max-w-xl mx-auto leading-relaxed">
            Autonomous AI workforces that capture leads from clients, display them in your
            super admin dashboard, and let AI agents work on them — <span className="text-[#FF4D00]">all on autopilot</span>.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenDashboard}
              className="pulse-btn text-xs uppercase tracking-[0.15em] font-bold px-8 py-3.5 transition-transform hover:scale-105"
              style={{ background: "#FF4D00", color: "#000", borderRadius: 4 }}
            >
              <Zap className="inline mr-2 h-4 w-4" />
              Launch Dashboard
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="text-xs uppercase tracking-[0.15em] px-8 py-3.5 transition-colors hover:text-white"
              style={{ border: "1px solid #2A2A3A", color: "#888899", borderRadius: 4 }}
            >
              Explore Features
            </button>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} className="mt-12 sm:mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { value: "10x", label: "Faster" },
              { value: "24/7", label: "Autonomous" },
              { value: "99.9%", label: "Uptime" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black" style={{ color: "#FF4D00" }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B80] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #08080C, transparent)" }} />
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-6 border-y" style={{ borderColor: "#1E1E2A" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              {["LEAD CAPTURE", "AI AGENTS", "DASHBOARD", "AUTONOMOUS", "ENTERPRISE", "REAL-TIME", "SCALABLE", "INTELLIGENT"].map((t) => (
                <span key={t} className="text-xs uppercase tracking-[0.3em] text-[#3A3A4A] whitespace-nowrap font-mono">
                  {t} <span className="mx-4" style={{ color: "#FF4D00" }}>&#x2022;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="relative py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div custom={0} variants={fadeUp}><div className="section-marker">Capabilities</div></motion.div>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-4">
              Everything You Need
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title} custom={i} variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="notch-corner p-6 cursor-pointer"
                style={{ background: "#111118", border: "1px solid #1E1E2A", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF4D0040")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E1E2A")}
              >
                <div className="w-10 h-10 rounded flex items-center justify-center mb-4" style={{ background: `${f.color}12` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wider mb-2">{f.title}</h3>
                <p className="text-xs text-[#6B6B80] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-20 sm:py-28" style={{ background: "#0A0A10" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div custom={0} variants={fadeUp}><div className="section-marker">The Process</div></motion.div>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-4">
              How It Works
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="relative group"
              >
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: s.color, color: "#000" }}>
                    {s.step}
                  </div>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{s.title}</h3>
                <p className="text-xs text-[#6B6B80] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI WORKFORCE */}
      <section id="workforce" className="relative py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <motion.div custom={0} variants={fadeUp}><div className="section-marker">AI Workforce</div></motion.div>
              <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-4">
                Deploy Your <span style={{ color: "#FF4D00" }}>AI Department</span>
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="mt-5 text-sm text-[#888899] leading-relaxed">
                Each AI agent is a specialized worker in your organization. They collaborate as a team,
                share knowledge, and continuously improve. Your always-on, never-tiring digital workforce.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="mt-6 space-y-3">
                {["Autonomous task execution with human oversight", "Cross-agent knowledge sharing", "Real-time performance monitoring", "Scalable from 1 to 1,000+ agents"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF4D00" }} />
                    <span className="text-xs text-[#888899]">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {agents.map((a, i) => (
                <motion.div key={a.name} custom={i} variants={scaleIn}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  className="p-4 scan-line-effect"
                  style={{ background: "#111118", border: "1px solid #1E1E2A", borderRadius: 8 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: `${a.color}10` }}>
                      <Bot size={14} style={{ color: a.color }} />
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${a.status === "active" ? "accent-dot" : ""}`} style={{
                      background: a.status === "active" ? "#00FF88" : "#6B6B80",
                    }} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider">{a.name}</div>
                  <div className="text-[10px] text-[#6B6B80] mt-0.5">{a.role}</div>
                  {a.tasks > 0 && (
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[10px] text-[#6B6B80]">{a.tasks} tasks</span>
                      <div className="w-10 h-1 rounded-full overflow-hidden" style={{ background: "#1E1E2A" }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.min(a.tasks, 100)}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.15 }} className="h-full rounded-full" style={{ background: a.color }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28" style={{ background: "#0A0A10" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full blur-[150px]" style={{ background: "rgba(255,77,0,0.06)" }} />
        </div>
        <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">
              Ready to Build Your<br /><span style={{ color: "#FF4D00" }}>AI Empire?</span>
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-5 text-sm text-[#888899] max-w-lg mx-auto">
              Join the next generation of enterprise builders. Deploy your AI workforce, capture leads, and scale — all on autopilot.
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="mt-8">
              <button
                onClick={onOpenDashboard}
                className="pulse-btn text-xs uppercase tracking-[0.15em] font-bold px-10 py-4 transition-transform hover:scale-105"
                style={{ background: "#FF4D00", color: "#000", borderRadius: 4 }}
              >
                <Zap className="inline mr-2 h-4 w-4" />
                Open Dashboard Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12" style={{ borderColor: "#1E1E2A" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <MianXLogo size="small" />
            <div className="flex items-center gap-3 text-[10px] text-[#6B6B80] uppercase tracking-wider">
              <span>&copy; 2026 MianX.ai</span>
              <span style={{ color: "#FF4D00" }}>&#x2022;</span>
              <span>AI + Human Leadership</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SUPER ADMIN DASHBOARD (WORKING)
   ============================================================ */

function SuperAdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState("leads");
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [filterStatus, setFilterStatus] = useState("all");
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", company: "", source: "website", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [leadsRes, actRes, statsRes] = await Promise.all([
        fetch("/api/leads"), fetch("/api/activity"), fetch("/api/stats"),
      ]);
      const leadsData = await leadsRes.json();
      const actData = await actRes.json();
      const statsData = await statsRes.json();
      setLeads(leadsData.leads || []);
      setActivities(actData || []);
      setStats(statsData);
    } catch {
      // silently retry on next interval
    }
  }, []);

  useEffect(() => {
    const load = () => { fetchData(); };
    load();
    intervalRef.current = setInterval(load, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchData]);

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        showToast(`New lead received: ${newLead.name}`);
        setNewLead({ name: "", email: "", phone: "", company: "", source: "website", message: "" });
        setShowAddForm(false);
        fetchData();
      }
    } catch {
      showToast("Failed to add lead");
    }
    setSubmitting(false);
  };

  const handleDeleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    fetchData();
    showToast("Lead deleted");
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
    showToast(`Lead status updated to ${status}`);
  };

  const filteredLeads = filterStatus === "all" ? leads : leads.filter((l) => l.status === filterStatus);

  const statusCounts = {
    all: leads.length,
    hot: leads.filter((l) => l.status === "hot").length,
    warm: leads.filter((l) => l.status === "warm").length,
    new: leads.filter((l) => l.status === "new").length,
    cold: leads.filter((l) => l.status === "cold").length,
  };

  const statCards = stats
    ? [
        { label: "Total Leads", value: stats.totalLeads.toString(), change: `+${stats.recentLeads} this week`, icon: Users, color: "#FF4D00" },
        { label: "Active Agents", value: stats.activeAgents.toString(), change: "All online", icon: Bot, color: "#00D4FF" },
        { label: "Conversions", value: stats.conversions.toString(), change: "Hot leads", icon: TrendingUp, color: "#00FF88" },
        { label: "Pipeline Value", value: `$${(stats.totalValue / 1000).toFixed(1)}K`, change: "Total value", icon: BarChart3, color: "#FFD93D" },
      ]
    : [];

  return (
    <div className="min-h-screen pt-16" style={{ background: "#08080C" }}>
      <Toast message={toast.message} visible={toast.visible} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full rec-dot" style={{ background: "#FF4D00" }} />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B80] font-mono">Live</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider">Super Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { fetchData(); showToast("Data refreshed"); }} className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-wider" style={{ border: "1px solid #1E1E2A", color: "#888899", borderRadius: 4 }}>
              <RefreshCw size={12} /> Refresh
            </button>
            <button onClick={() => setShowAddForm(!showAddForm)} className="pulse-btn flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-wider font-bold" style={{ background: "#FF4D00", color: "#000", borderRadius: 4 }}>
              <Plus size={12} /> Add Lead
            </button>
          </div>
        </div>

        {/* Add Lead Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <form onSubmit={handleSubmitLead} className="notch-corner p-5" style={{ background: "#111118", border: "1px solid #1E1E2A" }}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#FF4D00" }}>New Lead</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input required value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} placeholder="NAME *" className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#E8E8EC" }} />
                  <input required type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} placeholder="EMAIL *" className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#E8E8EC" }} />
                  <input value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} placeholder="PHONE" className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#E8E8EC" }} />
                  <input value={newLead.company} onChange={(e) => setNewLead({ ...newLead, company: e.target.value })} placeholder="COMPANY" className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#E8E8EC" }} />
                  <select value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#6B6B80" }}>
                    <option value="website" style={{ background: "#111118" }}>Website</option>
                    <option value="linkedin" style={{ background: "#111118" }}>LinkedIn</option>
                    <option value="email" style={{ background: "#111118" }}>Email</option>
                    <option value="referral" style={{ background: "#111118" }}>Referral</option>
                    <option value="api" style={{ background: "#111118" }}>API</option>
                  </select>
                  <input value={newLead.message} onChange={(e) => setNewLead({ ...newLead, message: e.target.value })} placeholder="MESSAGE" className="w-full bg-transparent border-b text-sm py-2 focus:outline-none" style={{ borderColor: "#1E1E2A", color: "#E8E8EC" }} />
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <button type="submit" disabled={submitting} className="flex items-center gap-1.5 px-5 py-2.5 text-[10px] uppercase tracking-wider font-bold" style={{ background: "#FF4D00", color: "#000", borderRadius: 4 }}>
                    <Send size={12} /> {submitting ? "Submitting..." : "Submit Lead"}
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2.5 text-[10px] uppercase tracking-wider" style={{ border: "1px solid #1E1E2A", color: "#6B6B80", borderRadius: 4 }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="dash-card p-4" style={{ borderRadius: 8 }}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: `${s.color}10` }}>
                  <s.icon size={16} style={{ color: s.color }} />
                </div>
                <span className="text-[10px]" style={{ color: s.color }}>{s.change}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black">{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#6B6B80] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Leads + Activity */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-4" style={{ borderBottom: "1px solid #1E1E2A" }}>
              {[{ id: "leads", label: "Leads" }, { id: "agents", label: "Agent Activity" }].map((tab) => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-[11px] uppercase tracking-wider font-semibold transition-colors relative ${
                    activeTab === tab.id ? "text-[#FF4D00]" : "text-[#6B6B80] hover:text-[#888899]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="dash-tab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#FF4D00" }} />
                  )}
                </button>
              ))}
            </div>

            {/* LEADS TAB */}
            {activeTab === "leads" && (
              <div>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Filter size={12} className="text-[#6B6B80]" />
                  {["all", "hot", "warm", "new", "cold"].map((s) => (
                    <button
                      key={s} onClick={() => setFilterStatus(s)}
                      className="text-[10px] uppercase tracking-wider px-3 py-1.5 transition-all"
                      style={{
                        background: filterStatus === s ? "#FF4D00" : "transparent",
                        color: filterStatus === s ? "#000" : "#6B6B80",
                        border: `1px solid ${filterStatus === s ? "#FF4D00" : "#1E1E2A"}`,
                        borderRadius: 3,
                        fontWeight: filterStatus === s ? 700 : 400,
                      }}
                    >
                      {s} ({statusCounts[s as keyof typeof statusCounts]})
                    </button>
                  ))}
                </div>

                {/* Leads Table */}
                <div className="space-y-2">
                  {/* Header */}
                  <div className="hidden sm:grid grid-cols-12 gap-2 text-[9px] uppercase tracking-wider text-[#6B6B80] px-4 py-2">
                    <span className="col-span-3">Company / Name</span>
                    <span className="col-span-2">Source</span>
                    <span className="col-span-2">Score</span>
                    <span className="col-span-2">Status</span>
                    <span className="col-span-2 text-right">Value</span>
                    <span className="col-span-1" />
                  </div>
                  {/* Rows */}
                  {filteredLeads.map((lead) => (
                    <motion.div
                      key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="dash-card px-4 py-3 cursor-pointer group"
                      style={{ borderRadius: 6 }}
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-12 gap-2 items-center">
                        <div className="col-span-2 sm:col-span-3 min-w-0">
                          <div className="text-sm font-semibold truncate">{lead.company || lead.name}</div>
                          <div className="text-[10px] text-[#6B6B80] truncate sm:block hidden">{lead.email}</div>
                        </div>
                        <div className="col-span-1 sm:col-span-2 flex items-center gap-1.5 text-[10px] text-[#6B6B80]">
                          <Globe size={10} />
                          <span className="capitalize">{lead.source}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#1E1E2A" }}>
                            <div className="h-full rounded-full" style={{
                              width: `${lead.score}%`,
                              background: lead.score >= 80 ? "#FF4D00" : lead.score >= 60 ? "#FFD93D" : "#6B6B80",
                            }} />
                          </div>
                          <span className="text-[10px] text-[#6B6B80] w-6 text-right">{lead.score}</span>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <select
                            value={lead.status} onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className={`text-[10px] uppercase tracking-wider px-2 py-1 w-full cursor-pointer bg-transparent border-none focus:outline-none status-${lead.status}`}
                            style={{ borderRadius: 3 }}
                          >
                            <option value="new" style={{ background: "#111118" }}>New</option>
                            <option value="warm" style={{ background: "#111118" }}>Warm</option>
                            <option value="hot" style={{ background: "#111118" }}>Hot</option>
                            <option value="cold" style={{ background: "#111118" }}>Cold</option>
                          </select>
                        </div>
                        <div className="col-span-1 sm:col-span-2 text-sm font-bold text-right">{lead.value}</div>
                        <div className="col-span-1 sm:col-span-1 flex justify-end">
                          <button onClick={() => handleDeleteLead(lead.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1" style={{ color: "#6B6B80" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      {lead.message && (
                        <div className="mt-2 text-[10px] text-[#6B6B80] truncate sm:block hidden" style={{ borderTop: "1px solid #1E1E2A", paddingTop: 8, marginTop: 8 }}>
                          {lead.message}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {filteredLeads.length === 0 && (
                    <div className="text-center py-12 text-[#6B6B80] text-xs uppercase tracking-wider">
                      No leads found
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AGENT ACTIVITY TAB */}
            {activeTab === "agents" && (
              <div className="space-y-2">
                {activities.map((act) => (
                  <div key={act.id} className="dash-card px-4 py-3 flex items-start gap-3" style={{ borderRadius: 6 }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{
                      background: act.status === "success" ? "#00FF88" : "#00D4FF",
                    }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs">
                        <span className="font-bold" style={{ color: "#FF4D00" }}>{act.agent}</span>{" "}
                        <span className="text-[#6B6B80]">{act.action}</span>
                      </p>
                      <span className="text-[9px] text-[#3A3A4A] font-mono">
                        {new Date(act.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <div className="text-center py-12 text-[#6B6B80] text-xs uppercase tracking-wider">
                    No activity yet
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Status Breakdown */}
            <div className="dash-card p-5" style={{ borderRadius: 8 }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B80] mb-4">Lead Status Breakdown</h3>
              {[
                { label: "Hot", count: statusCounts.hot, color: "#FF4D00" },
                { label: "Warm", count: statusCounts.warm, color: "#FFD93D" },
                { label: "New", count: statusCounts.new, color: "#00D4FF" },
                { label: "Cold", count: statusCounts.cold, color: "#6B6B80" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs uppercase tracking-wider">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "#1E1E2A" }}>
                      <div className="h-full rounded-full" style={{ width: `${leads.length > 0 ? (s.count / leads.length) * 100 : 0}%`, background: s.color }} />
                    </div>
                    <span className="text-xs font-bold w-5 text-right">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Source Breakdown */}
            <div className="dash-card p-5" style={{ borderRadius: 8 }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B80] mb-4">Lead Sources</h3>
              {Object.entries(
                leads.reduce((acc: Record<string, number>, l) => { acc[l.source] = (acc[l.source] || 0) + 1; return acc; }, {})
              ).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between mb-2.5">
                  <span className="text-xs capitalize text-[#888899]">{source}</span>
                  <span className="text-xs font-bold">{count}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="dash-card p-5" style={{ borderRadius: 8 }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B80] mb-4">AI Agents Status</h3>
              {["Sales AI", "Marketing AI", "Support AI", "Analytics AI", "CRM AI", "Ops AI"].map((agent) => (
                <div key={agent} className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full accent-dot" style={{ background: agent === "CRM AI" ? "#6B6B80" : "#00FF88" }} />
                    <span className="text-xs">{agent}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: agent === "CRM AI" ? "#6B6B80" : "#00FF88" }}>
                    {agent === "CRM AI" ? "Standby" : "Active"}
                  </span>
                </div>
              ))}
            </div>

            {/* Auto-refresh indicator */}
            <div className="flex items-center justify-center gap-2 py-3">
              <RefreshCw size={10} className="text-[#6B6B80] animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-[9px] uppercase tracking-wider text-[#6B6B80] font-mono">Auto-refreshing every 5s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Home() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  return (
    <main className="min-h-screen flex flex-col">
      <div className="grain" />
      <Navbar
        isDashboard={view === "dashboard"}
        onOpenDashboard={() => setView("dashboard")}
        onBackToLanding={() => setView("landing")}
      />
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LandingPage onOpenDashboard={() => setView("dashboard")} />
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SuperAdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}