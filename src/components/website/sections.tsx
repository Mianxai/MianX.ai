"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Bot, Brain, TrendingUp, Globe, Zap, Shield, ArrowRight, Check } from "lucide-react";
import { fadeUp, stagger } from "../animations";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 2) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, target, {
        duration,
        ease: "easeOut",
      });
      const unsubscribe = rounded.on("change", (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [inView, target, duration, motionVal, rounded]);

  return { ref, display };
}

/* ═══════════════════════════════════════════════════════════════
   STATS COUNTER SECTION
   ═══════════════════════════════════════════════════════════════ */
const counterStats = [
  { value: 500, suffix: "+", label: "AI Agents Deployed", sub: "across 40+ countries", icon: Bot },
  { value: 10, suffix: "M+", label: "Leads Processed", sub: "by AI agents monthly", icon: Globe },
  { value: 99.9, suffix: "%", label: "Uptime", sub: "enterprise-grade reliability", icon: Shield, decimals: 1 },
  { value: 150, suffix: "+", label: "Enterprise Clients", sub: "and growing fast", icon: Zap },
];

function AnimatedStat({ stat, index }: { stat: typeof counterStats[number]; index: number }) {
  const decimals = "decimals" in stat && stat.decimals ? stat.decimals : 0;
  const { ref, display } = useCountUp(stat.value, 2.2);
  const Icon = stat.icon;

  const formatNum = (n: number) => {
    if (decimals > 0) return n.toFixed(decimals);
    return n.toLocaleString();
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="relative text-center group"
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#FF4D00]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 rounded-2xl border border-transparent group-hover:border-[#1E1E2A] transition-all duration-300">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF4D00]/10 text-[#FF4D00] mb-4">
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span ref={ref} className="bg-gradient-to-r from-[#FF4D00] to-[#FFD93D] bg-clip-text text-transparent">
            {formatNum(display)}{stat.suffix}
          </span>
        </p>
        <p className="text-sm font-semibold mt-2 text-[#E8E8EC]">{stat.label}</p>
        <p className="text-[11px] text-[#888899] mt-0.5">{stat.sub}</p>
      </div>
    </motion.div>
  );
}

export function StatsCounterSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40 bg-[#0A0A0F]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/20 mb-4">
            By the Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Trusted at Scale
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">
            Real results from real enterprises powered by MianX.ai agents.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {counterStats.map((s, i) => (
            <AnimatedStat key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS SECTION
   ═══════════════════════════════════════════════════════════════ */
const steps = [
  {
    step: "01",
    title: "Capture Leads",
    desc: "AI agents scan your website, social channels, and ads to capture and centralize every incoming lead in real-time.",
    icon: Globe,
    color: "#00D4FF",
  },
  {
    step: "02",
    title: "AI Qualifies",
    desc: "Our Brain engine scores each lead using behavioral signals, intent analysis, and firmographic data to prioritize hot prospects.",
    icon: Brain,
    color: "#FF4D00",
  },
  {
    step: "03",
    title: "Agents Engage",
    desc: "Autonomous AI agents initiate personalized conversations across email, chat, and phone — 24/7, at infinite scale.",
    icon: Bot,
    color: "#00FF88",
  },
  {
    step: "04",
    title: "Convert & Scale",
    desc: "Nurture qualified leads through automated pipelines, close deals faster, and scale your revenue without adding headcount.",
    icon: TrendingUp,
    color: "#FFD93D",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 mb-4">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Four Steps. Full Power.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">
            From first touch to closed deal — AI handles the entire pipeline.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] h-px bg-gradient-to-r from-[#1E1E2A] via-[#FF4D00]/30 to-[#1E1E2A]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step icon with ring */}
                  <div className="relative z-10 mb-6">
                    <div
                      className="w-[5.5rem] h-[5.5rem] rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `${s.color}10`,
                        borderColor: `${s.color}30`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: s.color }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border"
                      style={{
                        background: "#08080C",
                        borderColor: `${s.color}50`,
                        color: s.color,
                      }}
                    >
                      {s.step}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-[#E8E8EC] group-hover:text-[#FF4D00] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#888899] leading-relaxed max-w-[18rem]">
                    {s.desc}
                  </p>

                  {/* Arrow connector (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="mt-6 md:hidden">
                      <ArrowRight className="w-5 h-5 text-[#2A2A3A] rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
   ═══════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechCorp",
    avatar: "SC",
    quote:
      "MianX.ai agents handle our entire lead pipeline — from capture to qualification to meeting booking. Our sales team now only talks to hot leads. Conversion rate tripled in 60 days.",
    rating: 5,
    color: "#FF4D00",
  },
  {
    name: "James Rodriguez",
    role: "CEO",
    company: "GrowthLab",
    avatar: "JR",
    quote:
      "We replaced 4 different tools and a VA team with MianX.ai. The AI agents qualify leads better than humans ever could — and they never sleep. Our CAC dropped 45%.",
    rating: 5,
    color: "#00D4FF",
  },
  {
    name: "Aisha Khan",
    role: "VP Marketing",
    company: "RetailPro",
    avatar: "AK",
    quote:
      "The multi-channel engagement is insane. Email, chat, social — our AI agents maintain personalized conversations at scale. We onboarded 3x more clients this quarter.",
    rating: 5,
    color: "#00FF88",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[#FFD93D]/10 text-[#FFD93D] border border-[#FFD93D]/20 mb-4">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            What Leaders Say
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">
            Hundreds of enterprises trust MianX.ai to power their growth.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              className="relative rounded-2xl border border-[#1E1E2A] bg-[#111118] p-8 hover:bg-[#15151E] transition-all duration-300 hover:border-[#2A2A3A] group"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-5xl font-serif leading-none text-[#FF4D00]/10 select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[#FFD93D] text-[#FFD93D]"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm text-[#C0C0CC] leading-relaxed mb-7">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[#1E1E2A]/50">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: `${t.color}18`,
                    color: t.color,
                    boxShadow: `0 0 0 1px ${t.color}25`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#E8E8EC]">{t.name}</p>
                  <p className="text-[11px] text-[#888899]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGO CLOUD SECTION
   ═══════════════════════════════════════════════════════════════ */
const logos = ["Google", "Microsoft", "Amazon", "Meta", "Stripe", "Shopify"];

export function LogoCloudSection() {
  return (
    <section className="py-16 px-6 border-b border-[#1E1E2A]/30">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[10px] text-[#555566] uppercase tracking-[0.25em] font-mono mb-10">
          Trusted by innovative teams worldwide
        </p>

        {/* Scroll container with fade edges */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#08080C] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#08080C] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-12 overflow-x-auto py-4 px-4 scrollbar-hide snap-x snap-mandatory">
            {logos.map((name) => (
              <div
                key={name}
                className="shrink-0 snap-center flex items-center justify-center min-w-[8rem] opacity-30 hover:opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
              >
                <span className="text-lg font-bold tracking-wider text-[#E8E8EC]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Perfect for small businesses getting started with AI lead generation.",
    features: [
      "3 AI Agents",
      "5,000 leads/month",
      "Basic analytics dashboard",
      "Email support",
      "2 team seats",
      "Lead capture forms",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    desc: "For growing companies that need full AI-powered sales pipelines.",
    features: [
      "Unlimited AI Agents",
      "50,000 leads/month",
      "Advanced analytics + charts",
      "Multi-channel engagement",
      "Priority support",
      "10 team seats",
      "CRM integrations",
      "Custom agent training",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations requiring dedicated infrastructure and SLAs.",
    features: [
      "Everything in Professional",
      "Unlimited leads",
      "Dedicated AI models",
      "White-label options",
      "SLA guarantee (99.99%)",
      "Unlimited seats",
      "Dedicated success manager",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-24 px-6 border-t border-[#1E1E2A]/40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20 mb-4">
            Pricing
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Scale Without Limits
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#888899]">
            Start free. Upgrade when you&apos;re ready. No hidden fees, cancel
            anytime.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              custom={i}
              className={`relative rounded-2xl border p-8 transition-all duration-300 group ${
                plan.featured
                  ? "border-[#FF4D00]/50 bg-[#111118] shadow-[0_0_40px_-12px_rgba(255,77,0,0.25)] scale-[1.02] md:scale-105 hover:shadow-[0_0_60px_-12px_rgba(255,77,0,0.35)]"
                  : "border-[#1E1E2A] bg-[#111118] hover:bg-[#15151E] hover:border-[#2A2A3A]"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4D00] text-black text-[10px] font-bold uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}

              {/* Plan header */}
              <h3 className="text-lg font-bold text-[#E8E8EC] mb-1">
                {plan.name}
              </h3>
              <p className="text-[11px] text-[#888899] mb-6 leading-relaxed">
                {plan.desc}
              </p>

              {/* Price */}
              <div className="mb-7">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.featured
                      ? "bg-gradient-to-r from-[#FF4D00] to-[#FF6A2A] bg-clip-text text-transparent"
                      : "text-[#E8E8EC]"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-[#888899]">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 mb-7 flex items-center justify-center gap-2 ${
                  plan.featured
                    ? "bg-[#FF4D00] text-black hover:bg-[#FF6A2A] hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
                    : "border border-[#2A2A3A] text-[#E8E8EC] hover:border-[#FF4D00]/40 hover:text-[#FF4D00]"
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-xs text-[#888899]"
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 ${
                        plan.featured ? "text-[#FF4D00]" : "text-[#00FF88]"
                      }`}
                    />
                    {f}
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

/* ═══════════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════════════ */
export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 px-6 border-t border-[#1E1E2A]/40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080C] via-[#0E0A08] to-[#08080C]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[#FF4D00]/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full bg-[#00D4FF]/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-semibold mb-8">
            <Zap className="w-3.5 h-3.5" />
            Start building in minutes
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1]">
            Ready to Deploy{" "}
            <span className="bg-gradient-to-r from-[#FF4D00] to-[#FFD93D] bg-clip-text text-transparent">
              Your AI Workforce
            </span>
            ?
          </h2>

          <p className="mt-6 text-[#888899] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Join 150+ enterprises that automated their lead pipelines with
            MianX.ai. Set up your first AI agent in under 5 minutes — no code
            required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF4D00] text-black font-bold text-sm hover:bg-[#FF6A2A] hover:shadow-[0_0_30px_rgba(255,77,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#2A2A3A] text-[#E8E8EC] font-bold text-sm hover:border-[#FF4D00]/40 hover:text-[#FF4D00] transition-all duration-300 flex items-center justify-center gap-2">
              Book a Demo
            </button>
          </div>

          <p className="mt-6 text-[11px] text-[#555566]">
            No credit card required &middot; 14-day free trial &middot; Cancel
            anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
