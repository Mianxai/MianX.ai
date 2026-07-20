"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Bot,
  BrainCircuit,
  Cpu,
  Globe,
  Layers,
  Lock,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  BarChart3,
  Activity,
  MessageSquare,
  ChevronRight,
  Eye,
  MonitorSmartphone,
  Workflow,
  Database,
  Settings,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.6 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ============================================================
   3D FLOATING PARTICLE COMPONENT
   ============================================================ */

function FloatingParticle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ============================================================
   3D ORBITING RING COMPONENT
   ============================================================ */

function OrbitRing({ size = 280, color = "cyan", duration = 20, reverse = false }: { size?: number; color?: string; duration?: number; reverse?: boolean }) {
  const colorMap: Record<string, string> = {
    cyan: "rgba(0, 240, 255, 0.3)",
    purple: "rgba(139, 92, 246, 0.25)",
    green: "rgba(0, 255, 136, 0.2)",
  };
  return (
    <div
      className="absolute rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: colorMap[color] || colorMap.cyan,
        animation: `${reverse ? "orbit-reverse" : "orbit"} ${duration}s linear infinite`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute w-3 h-3 rounded-full"
        style={{
          top: -6,
          left: "50%",
          marginLeft: -6,
          background: color === "cyan" ? "#00F0FF" : color === "purple" ? "#8B5CF6" : "#00FF88",
          boxShadow: `0 0 12px ${colorMap[color]}`,
        }}
      />
    </div>
  );
}

/* ============================================================
   LOGO COMPONENT
   ============================================================ */

function MianxLogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = { small: "text-lg", default: "text-2xl", large: "text-4xl" };
  const iconSizes = { small: 18, default: 24, large: 36 };
  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: iconSizes[size], height: iconSizes[size] }}>
        <div
          className="absolute inset-0 rounded-lg gradient-border"
          style={{
            background: "linear-gradient(135deg, #00F0FF, #8B5CF6)",
            borderRadius: size === "small" ? 6 : size === "default" ? 8 : 12,
            padding: 2,
          }}
        >
          <div
            className="flex items-center justify-center w-full h-full"
            style={{
              background: "#06060B",
              borderRadius: size === "small" ? 4 : size === "default" ? 6 : 10,
            }}
          >
            <BrainCircuit
              size={iconSizes[size] * 0.55}
              className="text-[#00F0FF]"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </div>
      <span className={`${sizes[size]} font-bold tracking-tight`}>
        <span className="gradient-text-static">Mianx</span>
        <span className="text-muted-foreground font-light">.ai</span>
      </span>
    </div>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "AI Workforce", href: "#workforce" },
    { label: "Dashboard", href: "#dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <MianxLogo size="small" />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-[#00F0FF] transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button className="bg-[#00F0FF] text-[#06060B] hover:bg-[#00D4E0] font-semibold text-sm px-6">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pb-4 border-t border-white/5"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-muted-foreground hover:text-[#00F0FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" className="text-sm flex-1">
                Sign In
              </Button>
              <Button className="bg-[#00F0FF] text-[#06060B] hover:bg-[#00D4E0] font-semibold text-sm flex-1">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00FF88]/3 rounded-full blur-[100px]" />

      {/* Floating Particles */}
      <FloatingParticle className="w-2 h-2 bg-[#00F0FF]/30 top-[15%] left-[10%]" delay={0} />
      <FloatingParticle className="w-3 h-3 bg-[#8B5CF6]/20 top-[25%] right-[15%]" delay={1} />
      <FloatingParticle className="w-1.5 h-1.5 bg-[#00FF88]/25 bottom-[30%] left-[20%]" delay={2} />
      <FloatingParticle className="w-2 h-2 bg-[#00F0FF]/20 top-[60%] right-[25%]" delay={0.5} />
      <FloatingParticle className="w-1 h-1 bg-[#8B5CF6]/30 top-[40%] left-[70%]" delay={1.5} />

      {/* 3D Orbiting Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-1500">
        <div className="preserve-3d relative">
          <OrbitRing size={320} color="cyan" duration={25} />
          <OrbitRing size={240} color="purple" duration={18} reverse />
          <OrbitRing size={160} color="green" duration={12} />
        </div>
      </div>

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} className="mb-6 sm:mb-8">
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-xs sm:text-sm text-muted-foreground tracking-wider uppercase">
                AI-Native Enterprise Platform
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="block">Your AI</span>
            <span className="block gradient-text">Agents Agency</span>
            <span className="block text-muted-foreground/60 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mt-2 sm:mt-3">
              Starts Here
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
          >
            Autonomous AI workforces that capture leads from clients, display them in your
            super admin dashboard, and let AI agents work on them — <span className="text-[#00F0FF]">all on autopilot</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div custom={3} variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-[#00F0FF] text-[#06060B] hover:bg-[#00D4E0] font-semibold text-base px-8 py-6 rounded-xl glow-cyan hover:scale-105 transition-transform duration-300"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Launch Your Agency
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-foreground hover:bg-white/5 text-base px-8 py-6 rounded-xl"
            >
              <MonitorSmartphone className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-12 max-w-lg mx-auto"
          >
            {[
              { value: "10x", label: "Faster" },
              { value: "24/7", label: "Autonomous" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text-static">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ============================================================
   FEATURES SECTION
   ============================================================ */

const features = [
  {
    icon: Target,
    title: "Lead Capture Agents",
    description:
      "AI agents deployed across your channels that intelligently capture, qualify, and route every lead to your dashboard in real-time. No lead ever falls through the cracks.",
    color: "#00F0FF",
    glow: "glow-cyan",
  },
  {
    icon: MonitorSmartphone,
    title: "Super Admin Dashboard",
    description:
      "A unified command center where you see every lead, every agent's activity, and every outcome. Full visibility, full control, designed for founders and operators.",
    color: "#8B5CF6",
    glow: "glow-purple",
  },
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    description:
      "Once a lead enters the system, specialized AI agents take over — analyzing, qualifying, nurturing, and converting leads while you focus on strategy.",
    color: "#00FF88",
    glow: "glow-green",
  },
  {
    icon: BrainCircuit,
    title: "AI Workforce OS",
    description:
      "Deploy entire AI departments — Sales AI, Marketing AI, Support AI — working collaboratively as a coordinated team under your leadership.",
    color: "#00F0FF",
    glow: "glow-cyan",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Zero-trust architecture, end-to-end encryption, and role-based access control. Your data and your clients' data stay protected at all times.",
    color: "#8B5CF6",
    glow: "glow-purple",
  },
  {
    icon: TrendingUp,
    title: "Intelligence Platform",
    description:
      "Every interaction feeds into organizational intelligence. Knowledge compounds across projects, making your AI workforce smarter with every engagement.",
    color: "#00FF88",
    glow: "glow-green",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div custom={0} variants={fadeUp} className="mb-4">
            <span className="text-xs sm:text-sm text-[#00F0FF] tracking-[0.2em] uppercase font-mono">
              Core Capabilities
            </span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Everything You Need to
            <br />
            <span className="gradient-text">Run an AI Agency</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="mt-4 sm:mt-6 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            From lead capture to conversion, Mianx.ai provides the complete infrastructure for building and scaling your AI-powered business.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative glass rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:border-white/10"
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.color}08, transparent 40%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 ${feature.glow} transition-all duration-300`}
                  style={{ background: `${feature.color}10` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-5 flex items-center text-sm" style={{ color: feature.color }}>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS SECTION (Lead Flow)
   ============================================================ */

const steps = [
  {
    step: "01",
    title: "Client Submits Lead",
    description:
      "Leads flow in from multiple channels — your website forms, social media, email campaigns, or direct API integrations. Every lead is automatically captured and logged.",
    icon: Globe,
    color: "#00F0FF",
  },
  {
    step: "02",
    title: "Super Admin Dashboard",
    description:
      "All leads appear in real-time on your unified command center. See source, quality score, contact info, and AI analysis — all in one beautiful, intuitive dashboard.",
    icon: BarChart3,
    color: "#8B5CF6",
  },
  {
    step: "03",
    title: "AI Agents Take Over",
    description:
      "Specialized AI agents activate — qualifying leads, sending personalized follow-ups, scheduling meetings, and nurturing prospects through your sales pipeline automatically.",
    icon: Bot,
    color: "#00FF88",
  },
  {
    step: "04",
    title: "Conversion & Growth",
    description:
      "Watch as your AI workforce converts leads into clients. Real-time analytics, performance tracking, and continuous learning ensure your agency scales without limits.",
    icon: TrendingUp,
    color: "#FFD93D",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-dense opacity-50" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div custom={0} variants={fadeUp}>
            <span className="text-xs sm:text-sm text-[#8B5CF6] tracking-[0.2em] uppercase font-mono">
              The Process
            </span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            How <span className="gradient-text-static">Mianx.ai</span> Works
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="mt-4 sm:mt-6 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A seamless four-step pipeline from lead capture to conversion, all powered by autonomous AI.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-[#00F0FF]/20 via-[#8B5CF6]/20 via-[#00FF88]/20 to-[#FFD93D]/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="relative group"
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                      border: `1px solid ${step.color}20`,
                    }}
                  >
                    <step.icon size={28} style={{ color: step.color }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold z-20"
                    style={{
                      background: step.color,
                      color: "#06060B",
                    }}
                  >
                    {step.step}
                  </div>
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `${step.color}15` }}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[3.25rem] -right-3 text-white/10">
                    <ChevronRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   AI WORKFORCE SECTION
   ============================================================ */

const agents = [
  { name: "Sales AI", role: "Lead Conversion", icon: Target, color: "#00F0FF", status: "Active", tasks: 47 },
  { name: "Marketing AI", role: "Campaign Automation", icon: TrendingUp, color: "#8B5CF6", status: "Active", tasks: 23 },
  { name: "Support AI", role: "Client Communication", icon: MessageSquare, color: "#00FF88", status: "Active", tasks: 89 },
  { name: "Analytics AI", role: "Data Intelligence", icon: BarChart3, color: "#FFD93D", status: "Active", tasks: 15 },
  { name: "CRM AI", role: "Relationship Management", icon: Users, color: "#FF6B6B", status: "Standby", tasks: 0 },
  { name: "Ops AI", role: "Business Operations", icon: Settings, color: "#00F0FF", status: "Active", tasks: 34 },
];

function AIWorkforceSection() {
  return (
    <section id="workforce" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#00F0FF]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div custom={0} variants={slideLeft}>
              <span className="text-xs sm:text-sm text-[#00FF88] tracking-[0.2em] uppercase font-mono">
                AI Workforce
              </span>
            </motion.div>
            <motion.h2 custom={1} variants={slideLeft} className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
              Deploy Your
              <br />
              <span className="gradient-text">AI Department</span>
            </motion.h2>
            <motion.p custom={2} variants={slideLeft} className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
              Each AI agent is a specialized worker that operates within your organization. They collaborate
              as a team, share knowledge, and continuously improve through every interaction. Think of them
              as your always-on, never-tiring digital workforce.
            </motion.p>

            <motion.div custom={3} variants={slideLeft} className="mt-8 space-y-4">
              {[
                "Autonomous task execution with human oversight",
                "Cross-agent knowledge sharing and learning",
                "Real-time performance monitoring",
                "Scalable from 1 agent to 1,000+",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Agent Cards 3D */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="perspective-1000"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  custom={i}
                  variants={scaleIn}
                  whileHover={{
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="glass rounded-xl p-4 sm:p-5 preserve-3d cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${agent.color}10` }}
                    >
                      <agent.icon size={18} style={{ color: agent.color }} />
                    </div>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{
                      background: agent.status === "Active" ? "#00FF88" : "#8888AA",
                    }} />
                  </div>
                  <h4 className="font-semibold text-sm">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{agent.role}</p>
                  {agent.tasks > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{agent.tasks} tasks</span>
                      <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(agent.tasks, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className="h-full rounded-full"
                          style={{ background: agent.color }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DASHBOARD PREVIEW SECTION
   ============================================================ */

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("leads");

  const leads = [
    { name: "TechCorp Inc.", source: "Website", score: 94, status: "Hot", value: "$12,500" },
    { name: "StartupXYZ", source: "LinkedIn", score: 87, status: "Hot", value: "$8,200" },
    { name: "GlobalRetail", source: "Email", score: 72, status: "Warm", value: "$25,000" },
    { name: "FinServe Ltd.", source: "Referral", score: 65, status: "Warm", value: "$18,000" },
    { name: "CloudBase", source: "API", score: 91, status: "Hot", value: "$15,800" },
  ];

  const agentActivity = [
    { agent: "Sales AI", action: "Qualified lead from TechCorp", time: "2m ago", status: "success" },
    { agent: "Marketing AI", action: "Sent campaign to 1,200 prospects", time: "5m ago", status: "success" },
    { agent: "Support AI", action: "Resolved ticket #4521", time: "8m ago", status: "success" },
    { agent: "Analytics AI", action: "Generated weekly report", time: "15m ago", status: "info" },
  ];

  const stats = [
    { label: "Total Leads", value: "2,847", change: "+12.5%", icon: Users, color: "#00F0FF" },
    { label: "Active Agents", value: "24", change: "+3", icon: Bot, color: "#8B5CF6" },
    { label: "Conversions", value: "389", change: "+8.2%", icon: TrendingUp, color: "#00FF88" },
    { label: "Revenue", value: "$124K", change: "+23.1%", icon: BarChart3, color: "#FFD93D" },
  ];

  return (
    <section id="dashboard" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#00FF88]/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div custom={0} variants={fadeUp}>
            <span className="text-xs sm:text-sm text-[#FFD93D] tracking-[0.2em] uppercase font-mono">
              Command Center
            </span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Super Admin
            <br />
            <span className="gradient-text">Dashboard</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="mt-4 sm:mt-6 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Every lead, every agent, every metric — unified in one powerful interface built for founders.
          </motion.p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={0}
          variants={scaleIn}
          className="dashboard-mockup relative scan-line"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <MianxLogo size="small" />
              <span className="text-xs text-muted-foreground hidden sm:block">Super Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Search size={14} className="text-muted-foreground" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center relative">
                <Bell size={14} className="text-muted-foreground" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full border-2 border-[#0D0D14]" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6]" />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/[0.03] rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}10` }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <span className="text-xs text-[#00FF88]">{stat.change}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 sm:px-6 border-b border-white/5">
            {[
              { id: "leads", label: "Leads" },
              { id: "agents", label: "Agent Activity" },
              { id: "analytics", label: "Analytics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-[#00F0FF]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 min-h-[280px]">
            {activeTab === "leads" && (
              <div className="space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground px-3 hidden sm:grid">
                  <span>Company</span>
                  <span>Source</span>
                  <span>Score</span>
                  <span>Status</span>
                  <span className="text-right">Value</span>
                </div>
                {/* Rows */}
                {leads.map((lead, i) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center bg-white/[0.02] hover:bg-white/[0.04] rounded-xl px-3 sm:px-4 py-3 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium truncate">{lead.name}</span>
                    <span className="text-xs text-muted-foreground sm:block hidden">{lead.source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.score}%`,
                            background: lead.score >= 85 ? "#00FF88" : lead.score >= 70 ? "#FFD93D" : "#FF6B6B",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{lead.score}</span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full w-fit hidden sm:block"
                      style={{
                        background: lead.status === "Hot" ? "#FF6B6B15" : "#FFD93D15",
                        color: lead.status === "Hot" ? "#FF6B6B" : "#FFD93D",
                      }}
                    >
                      {lead.status}
                    </span>
                    <span className="text-sm font-semibold text-right">{lead.value}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "agents" && (
              <div className="space-y-3">
                {agentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-white/[0.02] rounded-xl px-4 py-3"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: activity.status === "success" ? "#00FF88" : "#00F0FF",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium text-[#00F0FF]">{activity.agent}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <span className="text-xs text-muted-foreground/60">{activity.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="flex items-center justify-center h-48 sm:h-64">
                <div className="text-center">
                  <Activity className="mx-auto h-12 w-12 text-[#8B5CF6]/30 mb-3" />
                  <p className="text-muted-foreground text-sm">Real-time analytics dashboard</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Charts, graphs, and AI-powered insights</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   STRATEGIC PILLARS SECTION
   ============================================================ */

const pillars = [
  {
    number: "01",
    title: "AI Software House",
    description: "Enterprise-grade software solutions — ERP systems, SaaS platforms, mobile apps, and AI automation delivered by your AI workforce.",
    icon: Cpu,
    color: "#00F0FF",
  },
  {
    number: "02",
    title: "AI Workforce OS",
    description: "A complete operating system for deploying, managing, and scaling specialized AI departments that collaborate as one intelligent system.",
    icon: Network,
    color: "#8B5CF6",
  },
  {
    number: "03",
    title: "Autonomous Product Factory",
    description: "Build internal products using the same AI systems — SaaS tools, business apps, and productivity solutions that generate recurring revenue.",
    icon: Layers,
    color: "#00FF88",
  },
  {
    number: "04",
    title: "Enterprise Intelligence",
    description: "Every project compounds knowledge. Architecture patterns, market insights, and business intelligence that make every future project better.",
    icon: BrainCircuit,
    color: "#FFD93D",
  },
];

function PillarsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div custom={0} variants={fadeUp}>
            <span className="text-xs sm:text-sm text-[#00F0FF] tracking-[0.2em] uppercase font-mono">
              Strategic Vision
            </span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Four Pillars of
            <br />
            <span className="gradient-text">Mianx.ai</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              custom={i}
              variants={fadeUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative glass rounded-2xl p-6 sm:p-8 overflow-hidden"
            >
              {/* Background number */}
              <div
                className="absolute -right-4 -top-4 text-8xl font-bold opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                style={{ color: pillar.color }}
              >
                {pillar.number}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${pillar.color}10` }}
                  >
                    <pillar.icon size={24} style={{ color: pillar.color }} />
                  </div>
                  <span className="text-xs font-mono tracking-wider" style={{ color: pillar.color }}>
                    PILLAR {pillar.number}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA SECTION
   ============================================================ */

function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dense opacity-30" />

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#00F0FF]/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div custom={0} variants={scaleIn} className="mb-6 sm:mb-8 inline-flex">
            <div className="relative">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #00F0FF10, #8B5CF610)",
                  border: "1px solid rgba(0, 240, 255, 0.1)",
                }}
              >
                <Rocket size={36} className="text-[#00F0FF]" />
              </div>
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              />
            </div>
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Ready to Build Your
            <br />
            <span className="gradient-text">AI Empire?</span>
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
          >
            Join the next generation of enterprise builders. Deploy your AI workforce, capture leads, and scale your business — all on autopilot.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#00F0FF] text-[#06060B] hover:bg-[#00D4E0] font-semibold text-base px-10 py-6 rounded-xl glow-cyan hover:scale-105 transition-transform duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-foreground hover:bg-white/5 text-base px-10 py-6 rounded-xl"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Talk to Sales
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  const footerLinks = {
    Platform: ["Features", "AI Workforce", "Dashboard", "Security", "Integrations"],
    Company: ["About", "Careers", "Blog", "Press", "Contact"],
    Resources: ["Documentation", "API Reference", "Status", "Changelog", "Community"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <MianxLogo size="default" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The operating system for AI-powered enterprises. Build, operate, and scale through autonomous AI workforces.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-[#00F0FF] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Mianx.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Built with</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            </div>
            <span className="text-xs text-muted-foreground">AI + Human Leadership</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIWorkforceSection />
      <DashboardPreview />
      <PillarsSection />
      <CTASection />
      <Footer />
    </main>
  );
}