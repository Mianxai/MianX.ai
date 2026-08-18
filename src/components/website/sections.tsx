"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, Check, Zap, Crown, Building2, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "../animations";

/* ═══ TESTIMONIALS ═══ */
const testimonials = [
  { name: "Sarah Chen", role: "CTO", company: "TechFlow Inc.", avatar: "SC", text: "MianX.ai replaced 5 separate tools for us. Our restaurant chain runs entirely on Restaurant OS — from orders to analytics in one platform.", rating: 5, color: "#FF4D00" },
  { name: "James Rodriguez", role: "Operations Director", company: "BuildMax Construction", avatar: "JR", text: "Construction OS transformed our project management. Real-time resource tracking alone saved us $2.4M in the first quarter.", rating: 5, color: "#00D4FF" },
  { name: "Aisha Patel", role: "CEO", company: "MedCare Hospitals", avatar: "AP", text: "The AI agents handle 80% of our patient scheduling automatically. Our staff focuses on what matters — patient care.", rating: 5, color: "#00FF88" },
  { name: "Michael Torres", role: "Head of Supply Chain", company: "LogiPro", avatar: "MT", text: "Logistics OS cut our delivery times by 35%. Route optimization alone pays for the entire platform 10x over.", rating: 5, color: "#FFD93D" },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-14">
          <span className="section-marker">Trusted by Enterprises</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">What Leaders Say</h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">Hundreds of enterprises trust MianX.ai to run their operations.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i}
              className="notch-corner rounded-2xl border border-[#1E1E2A] bg-[#111118] p-8 hover:bg-[#15151E] transition-colors relative">
              <Quote className="w-8 h-8 text-[#FF4D00]/20 absolute top-6 right-6"/>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#FFD93D] text-[#FFD93D]"/>) }
              </div>
              <p className="text-sm text-[#C0C0CC] leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${t.color}20`, color: t.color }}>{t.avatar}</div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-[11px] text-[#555566]">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ LOGO CLOUD ═══ */
const logos = [
  "TechFlow", "BuildMax", "MedCare", "LogiPro", "EduPrime", "RetailHub", "ManuTech", "FoodChain", "CloudNine", "DataVault"
];

export function LogoCloudSection() {
  return (
    <section className="py-14 px-6 border-b border-[#1E1E2A]/30">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[10px] text-[#555566] uppercase tracking-[0.25em] font-mono mb-8">Trusted by 500+ enterprises worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {logos.map(name => (
            <span key={name} className="text-sm font-bold text-[#2A2A3A] hover:text-[#555566] transition-colors cursor-default tracking-wider">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
const plans = [
  {
    name: "Starter", price: "$299", period: "/month", desc: "Perfect for small businesses getting started with AI automation.",
    color: "#00D4FF", features: ["1 Industry OS", "5 AI Agents", "10K leads/month", "Basic analytics", "Email support", "5 team seats"],
    cta: "Start Free Trial", featured: false,
  },
  {
    name: "Enterprise", price: "$999", period: "/month", desc: "For growing companies that need full AI-powered operations.",
    color: "#FF4D00", features: ["All 7 Industry OS", "Unlimited AI Agents", "100K leads/month", "Advanced analytics + charts", "Priority support", "25 team seats", "Custom integrations", "API access"],
    cta: "Start Free Trial", featured: true,
  },
  {
    name: "Ultimate", price: "$2,499", period: "/month", desc: "For large enterprises requiring dedicated infrastructure.",
    color: "#A78BFA", features: ["Everything in Enterprise", "Unlimited everything", "Dedicated AI models", "White-label options", "SLA guarantee (99.99%)", "Unlimited seats", "Dedicated success manager", "On-premise deployment"],
    cta: "Contact Sales", featured: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-14">
          <span className="section-marker">Pricing</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Scale Without Limits</h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">Start free. Upgrade when you are ready. No hidden fees, cancel anytime.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} variants={fadeUp} custom={i}
              className={`relative rounded-2xl border bg-[#111118] p-8 transition-all duration-300 hover:bg-[#15151E] ${plan.featured ? "border-[#FF4D00]/50 shadow-lg shadow-[#FF4D00]/10 scale-[1.02]" : "border-[#1E1E2A]"}`}>
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF4D00] text-black text-[10px] font-bold">
                  <Crown className="w-3 h-3"/> Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-[11px] text-[#555566] mb-5">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-sm text-[#555566]">{plan.period}</span>
              </div>
              <button className={`w-full py-3 rounded-xl text-sm font-bold transition-colors mb-6 flex items-center justify-center gap-2 ${plan.featured ? "pulse-btn bg-[#FF4D00] text-black hover:bg-[#FF6A2A]" : "border border-[#2A2A3A] text-[#E8E8EC] hover:border-[#FF4D00]/40"}`}>
                {plan.cta} <ArrowRight className="w-4 h-4"/>
              </button>
              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#888899]">
                    <Check className="w-3.5 h-3.5 text-[#00FF88] shrink-0"/> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ STATS COUNTER ═══ */
const counterStats = [
  { value: "500+", label: "Enterprise Clients", sub: "across 40+ countries" },
  { value: "12M+", label: "Leads Processed", sub: "by AI agents monthly" },
  { value: "99.99%", label: "Uptime SLA", sub: "enterprise-grade reliability" },
  { value: "3.2B", label: "Pipeline Value", sub: "managed on platform" },
];

export function StatsCounterSection() {
  return (
    <section className="py-16 px-6 border-t border-[#1E1E2A]/40 bg-[#0A0A0F]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counterStats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#FF4D00] to-[#FFD93D] bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm font-semibold mt-2">{s.label}</p>
              <p className="text-[11px] text-[#555566] mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ HOW IT WORKS ═══ */
const steps = [
  { step: "01", title: "Choose Your OS", desc: "Select from 7 industry-specific operating systems or mix and match capabilities for your unique needs.", color: "#FF4D00" },
  { step: "02", title: "Connect Everything", desc: "Integrate your existing tools, databases, and workflows. 500+ pre-built connectors available.", color: "#00D4FF" },
  { step: "03", title: "Deploy AI Agents", desc: "Activate intelligent agents that learn your business. They work 24/7 to capture, qualify, and convert leads.", color: "#00FF88" },
  { step: "04", title: "Scale Effortlessly", desc: "Monitor real-time dashboards, let AI optimize operations, and scale from 10 to 10,000 users seamlessly.", color: "#FFD93D" },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-5xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0} className="text-center mb-14">
          <span className="section-marker">How It Works</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Four Steps. Full Power.</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="space-y-8">
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={fadeUp} custom={i} className="flex items-start gap-6 group">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold" style={{ background: `${s.color}15`, color: s.color }}>{s.step}</div>
              </div>
              <div className="flex-1 pb-8 border-b border-[#1E1E2A]/30 last:border-0">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF4D00] transition-colors">{s.title}</h3>
                <p className="text-sm text-[#888899] leading-relaxed max-w-xl">{s.desc}</p>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-5 h-5 text-[#2A2A3A] shrink-0 mt-5 hidden sm:block"/>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}