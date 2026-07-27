"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroCanvas from "./HeroCanvas";
import BrandLogo from "./BrandLogo";
import { validateLeadSubmission } from "@/lib/leads";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  industry: "",
  phone: "",
  message: "",
  website: "",
};

const NAV_SCROLL_THRESHOLD = 24;
const SECTION_IDS = ["services", "industries", "partners", "testimonials", "contact"];

export default function PublicSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const particlesRef = useRef(null);
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef({});
  const mobileMenuRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const submittingRef = useRef(false);

  // GSAP scroll reveal (one-shot). Content stays visible if GSAP fails,
  // IntersectionObserver is missing, JS is off, or reduced-motion is set.
  useEffect(() => {
    let ctx;
    let cancelled = false;
    const reveals = () => Array.from(document.querySelectorAll(".reveal"));

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) {
      reveals().forEach((el) => el.classList.add("active"));
      return;
    }

    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        const gsap = gsapMod.default || gsapMod.gsap;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        reveals().forEach((el) => el.setAttribute("data-reveal", "pending"));

        ctx = gsap.context(() => {
          const groups = [
            ".steps-grid .reveal",
            ".services-grid .reveal",
            ".industries-grid .reveal",
            ".partners-grid .reveal",
            ".testimonials-grid .reveal",
            ".contact-section .reveal",
          ];

          groups.forEach((selector) => {
            const nodes = gsap.utils.toArray(selector);
            if (!nodes.length) return;
            gsap.fromTo(
              nodes,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power2.out",
                stagger: 0.07,
                overwrite: "auto",
                scrollTrigger: {
                  trigger: nodes[0].parentElement || nodes[0],
                  start: "top 88%",
                  once: true,
                },
                onComplete: () => {
                  nodes.forEach((el) => {
                    el.classList.add("active");
                    el.removeAttribute("data-reveal");
                  });
                },
              }
            );
          });

          // Any remaining .reveal nodes (e.g. partner stat row).
          reveals()
            .filter((el) => el.getAttribute("data-reveal") === "pending" && !el.classList.contains("active"))
            .forEach((el) => {
              gsap.fromTo(
                el,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    once: true,
                  },
                  onComplete: () => {
                    el.classList.add("active");
                    el.removeAttribute("data-reveal");
                  },
                }
              );
            });
        });
      } catch {
        reveals().forEach((el) => {
          el.classList.add("active");
          el.removeAttribute("data-reveal");
        });
      }
    })();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
      reveals().forEach((el) => {
        el.classList.add("active");
        el.removeAttribute("data-reveal");
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking for glowing tabs (one observer, cleaned up).
  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return undefined;
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const ratios = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const id of SECTION_IDS) {
          const r = ratios.get(id) || 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        setActiveSection(bestRatio > 0 ? best : "");
      },
      {
        // Offset for the fixed navbar so the active tab matches visible content.
        rootMargin: "-88px 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8],
      }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Shared glowing-tab indicator: measure the active link and slide a pill under it.
  useEffect(() => {
    const tabs = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!tabs || !indicator) return undefined;

    function place() {
      const id = activeSection;
      const link = id ? linkRefs.current[id] : null;
      if (!link) {
        indicator.style.opacity = "0";
        indicator.style.width = "0px";
        return;
      }
      const tabsRect = tabs.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${linkRect.width}px`;
      // Absolutely positioned children use the track's padding box as their
      // origin. Subtract the border so the pill matches the link rectangle.
      indicator.style.transform = `translateX(${
        linkRect.left - tabsRect.left - tabs.clientLeft
      }px)`;
    }

    place();
    window.addEventListener("resize", place, { passive: true });
    return () => window.removeEventListener("resize", place);
  }, [activeSection]);

  // Subtle local pointer glow inside the desktop tab group (fine pointers only).
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return undefined;
    const fine = window.matchMedia?.("(pointer: fine)")?.matches ?? false;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (!fine || reduced) return undefined;

    const onMove = (e) => {
      const rect = tabs.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tabs.style.setProperty("--tab-glow-x", `${x}%`);
      tabs.style.setProperty("--tab-glow-y", `${y}%`);
      tabs.dataset.glow = "1";
    };
    const onLeave = () => {
      tabs.dataset.glow = "0";
    };
    tabs.addEventListener("pointermove", onMove);
    tabs.addEventListener("pointerleave", onLeave);
    return () => {
      tabs.removeEventListener("pointermove", onMove);
      tabs.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Floating particles (created in-effect to avoid SSR/client hydration mismatch).
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const nodes = [];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 15 + "s";
      p.style.animationDuration = Math.random() * 10 + 10 + "s";
      const size = Math.random() * 4 + 2 + "px";
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
      nodes.push(p);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  // Mobile menu: Escape close + restore focus to the opener.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previouslyFocused = document.activeElement;
    const menu = mobileMenuRef.current;
    const opener = mobileBtnRef.current;
    const focusable = menu?.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus?.();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menu) return;
      const nodes = Array.from(
        menu.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      (opener || previouslyFocused)?.focus?.();
    };
  }, [mobileOpen]);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;

    // Same rules as POST /api/leads — keep client fieldErrors aligned.
    const check = validateLeadSubmission({
      name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
      industry: form.industry,
      need: form.message,
      website: form.website,
    });
    if (check.honeypotTripped) {
      // Silent success for bots; do not hit the API.
      setMessage({
        type: "success",
        text: "Thank you! We will contact you within 24 hours.",
      });
      setForm(EMPTY);
      return;
    }
    const nextErrors = {
      name: Boolean(check.errors.name),
      email: Boolean(check.errors.email),
      industry: Boolean(check.errors.industry),
      message: Boolean(check.errors.message),
    };
    setErrors(nextErrors);
    if (!check.valid) return;

    submittingRef.current = true;
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          industry: form.industry,
          need: form.message,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage({ type: "success", text: "Thank you! We will contact you within 24 hours." });
      setForm(EMPTY);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.message?.includes("Configuration error")
            ? err.message
            : err.message || "Something went wrong. Please try again.",
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  const navLinks = [
    ["#services", "Services"],
    ["#industries", "Industries"],
    ["#partners", "Partners"],
    ["#testimonials", "Testimonials"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="particles" ref={particlesRef} aria-hidden="true" />

      {mobileOpen && (
        <div
          className="mobile-menu active"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          ref={mobileMenuRef}
        >
          <button className="close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          {navLinks.map(([href, label]) => {
            const id = href.slice(1);
            return (
              <a
                key={href}
                href={href}
                className={activeSection === id ? "active" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}

      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--top"}`}
        aria-label="Primary"
      >
        <div className="nav-container">
          <a href="#" className="logo">
            <BrandLogo size={40} />
            <span className="logo-text">MianX.ai</span>
          </a>
          <ul className="nav-links nav-tabs" ref={tabsRef} data-glow="0">
            <li className="nav-tabs-indicator" ref={indicatorRef} aria-hidden="true" />
            {navLinks.map(([href, label]) => {
              const id = href.slice(1);
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    ref={(el) => {
                      linkRefs.current[id] = el;
                    }}
                    className={isActive ? "active" : undefined}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="#contact" className="nav-cta">Get a Demo</a>
          <button
            className="mobile-menu-btn"
            ref={mobileBtnRef}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </nav>

      <main id="main-content">

      <section className="hero" id="hero">
        <HeroCanvas />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse" />
            Trusted by Al Hamdu Lillah Poultry Traders
          </div>
          <h1>
            AI-Powered<br />
            <span className="gradient-text">Industry Operating Systems</span>
          </h1>
          <p className="hero-subtitle">
            One intelligent platform that runs your entire business. From live poultry rates
            to restaurant POS — we build AI-native operating systems tailored for your industry.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Get a Free Demo</a>
            <a href="#services" className="btn-secondary">Explore Services</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><div className="stat-number">2+</div><div className="stat-label">Live Partners</div></div>
            <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">Industries</div></div>
            <div className="stat-item"><div className="stat-number">81+</div><div className="stat-label">Cities Covered</div></div>
            <div className="stat-item"><div className="stat-number">500+</div><div className="stat-label">Active Users</div></div>
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Three Steps to <span className="gradient-text">AI Transformation</span></h2>
          <p className="section-desc">We do not just build software — we transform how your business operates with intelligent AI systems.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card reveal"><div className="step-number">1</div><h3>Discover</h3><p>We study your industry inside-out. Your workflows, pain points, and growth opportunities become our blueprint.</p></div>
          <div className="step-card reveal"><div className="step-number">2</div><h3>Build</h3><p>Our AI-powered platform assembles your custom Industry OS — modules, interfaces, and intelligence tailored to you.</p></div>
          <div className="step-card reveal"><div className="step-number">3</div><h3>Scale</h3><p>Go live with intelligent automation. Gain insights, optimize operations, and grow — all from one powerful platform.</p></div>
        </div>
      </section>

      <section className="platform-section" id="services">
        <div className="section-header">
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Specialist <span className="gradient-text">Services</span></h2>
          <p className="section-desc">Not generic SaaS. Built for your industry, powered by AI, designed for growth.</p>
        </div>
        <div className="services-grid">
          {[
            ["\u{1F3E2}", "Industry Operating Systems", "Complete business platforms built specifically for your industry. One system that handles everything from operations to analytics.", ["Custom Built", "AI-Native", "All-in-One"]],
            ["\u{1F916}", "AI Automation", "Deploy intelligent automation across marketing, sales, finance, support, and operations. Work smarter, not harder.", ["24/7 Active", "Self-Learning", "Multi-Channel"]],
            ["\u{1F504}", "Reusable Architecture", "Our core platform means faster delivery and lower costs. Build once, adapt for any industry. Consistent quality, every time.", ["70-90% Reuse", "Faster Delivery", "Lower Cost"]],
            ["\u{1F4F1}", "Multi-Channel Delivery", "Website, mobile apps, admin panels, POS systems, and dashboards — all connected to one powerful backend with WhatsApp integration.", ["Web + Mobile", "POS + Dashboard", "WhatsApp"]],
            ["\u{1F4C8}", "Live Data & Analytics", "Real-time market rates, predictive insights, and AI-powered forecasting. Make data-driven decisions before your competitors.", ["Real-Time", "Predictive AI", "Market Insights"]],
            ["\u{1F4B0}", "Cash-First Business Model", "Built for Pakistani business culture. 100% cash deals, no credit risk, local language support — Urdu and English.", ["No Credit Risk", "Urdu + English", "Local Focus"]],
          ].map(([icon, title, desc, features]) => (
            <div className="service-card reveal" key={title}>
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service-features">
                {features.map((f) => <span className="service-feature" key={f}>{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="industries">
        <div className="section-header">
          <span className="section-tag">Industries</span>
          <h2 className="section-title">Built for <span className="gradient-text">Your Industry</span></h2>
          <p className="section-desc">From restaurants to poultry farms, hospitals to schools — one platform, infinite possibilities.</p>
        </div>
        <div className="industries-grid">
          {[
            ["status-dev", "In Development", "\u{1F35D}", "RestaurantOS", "Website, online ordering, POS, kitchen display, delivery tracking, and CRM — all in one intelligent system.", ["Online Ordering", "POS", "Kitchen", "Delivery"]],
            ["status-live", "\u2B50 LIVE", "\u{1F413}", "PoultryOS", "Live rates from 81+ cities, AI broker for bird sales, shed monitoring, and B2B marketplace for feed and medicine.", ["Live Rates", "AI Broker", "Shed Monitor", "Marketplace"]],
            ["status-soon", "Coming Soon", "\u{1F3E5}", "HospitalOS", "Patient management, appointments, EMR, pharmacy, lab integration, billing, and AI diagnostics assistance.", ["Patient Mgmt", "EMR", "Pharmacy", "AI Diagnostics"]],
            ["status-soon", "Coming Soon", "\u{1F393}", "SchoolOS", "Student management, attendance, grading, timetable, fee management, parent portal, and AI tutoring.", ["Students", "Attendance", "Grading", "AI Tutor"]],
            ["status-soon", "Coming Soon", "\u{1F683}", "LogisticsOS", "Fleet management, route optimization, shipment tracking, warehouse management, and AI demand forecasting.", ["Fleet", "Routes", "Tracking", "Forecast"]],
            ["status-soon", "Coming Soon", "\u{1F3D7}", "ConstructionOS", "Project management, resource planning, site monitoring, subcontractor management, and AI safety compliance.", ["Projects", "Resources", "Safety", "AI Monitor"]],
          ].map(([statusClass, statusLabel, icon, title, desc, tags]) => (
            <div className="industry-card reveal" key={title}>
              <span className={`industry-status ${statusClass}`}>{statusLabel}</span>
              <div className="industry-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="industry-tags">
                {tags.map((t) => <span className="industry-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="platform-section" id="partners">
        <div className="section-header">
          <span className="section-tag" style={{ background: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.3)", color: "#22c55e" }}>Trusted By</span>
          <h2 className="section-title">Powered by <span className="gradient-text">MianX.ai</span></h2>
          <p className="section-desc">Real businesses running on MianX technology. Proven results, live deployments.</p>
        </div>
        <div className="partners-grid">
          <div className="partner-card reveal">
            <span className="partner-status status-live">{"\u2B50 LIVE NOW"}</span>
            <div className="partner-logo" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>{"\u{1F413}"}</div>
            <h3>Al Hamdu Lillah Poultry Traders</h3>
            <p>Pakistan&apos;s trusted poultry marketplace for 12+ years. Live rates from 81+ cities, AI broker for bird sales, shed monitoring, and B2B marketplace — all powered by MianX.ai.</p>
            <a href="https://alhamdulillahpoultrytraders.com" target="_blank" rel="noreferrer" className="partner-link">
              Visit Live Site
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          </div>
          <div className="partner-card reveal">
            <span className="partner-status status-dev">Building</span>
            <div className="partner-logo" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>{"\u{1F35D}"}</div>
            <h3>Telepizza.pk</h3>
            <p>Pakistan&apos;s growing pizza chain. Complete digital transformation with RestaurantOS — website, online ordering, POS, kitchen dashboard, delivery management, and CRM.</p>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Launching 2026</span>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "3rem auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", textAlign: "center" }}>
          {[["81+", "Cities Covered"], ["500+", "Active Farmers"], ["12+", "Years Trusted"], ["100%", "Cash Deals"]].map(([n, l]) => (
            <div className="reveal" key={l}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>{n}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">What Our <span className="gradient-text">Partners Say</span></h2>
          <p className="section-desc">Real feedback from businesses already transformed by MianX.ai.</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card reveal">
            <div className="testimonial-quote">&ldquo;</div>
            <p className="testimonial-text">MianX.ai transformed our poultry business completely. Live rates from 81+ cities, AI broker for sales, and the B2B marketplace — everything works seamlessly. Our farmers love it.</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">A</div>
              <div className="testimonial-info"><h4>Al Hamdu Lillah Team</h4><span>Poultry Traders, Multan</span></div>
            </div>
          </div>
          <div className="testimonial-card reveal">
            <div className="testimonial-quote">&ldquo;</div>
            <p className="testimonial-text">The speed at which MianX.ai understood our restaurant operations and built a solution was incredible. From menu to delivery — everything in one platform.</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">T</div>
              <div className="testimonial-info"><h4>Telepizza Management</h4><span>Pizza Chain, Pakistan</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-header">
          <span className="section-tag">Get Started</span>
          <h2 className="section-title">Ready to <span className="gradient-text">Transform</span> Your Business?</h2>
          <p className="section-desc">Join industry leaders already using MianX.ai. Get a free demo tailored to your business.</p>
        </div>
        <div className="contact-container">
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="website">Company website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  className={errors.name ? "error" : ""}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your Name"
                  maxLength={200}
                  autoComplete="name"
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <span id="name-error" className={`form-error-msg${errors.name ? " show" : ""}`} role={errors.name ? "alert" : undefined}>Please enter your name</span>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  className={errors.email ? "error" : ""}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  maxLength={254}
                  autoComplete="email"
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <span id="email-error" className={`form-error-msg${errors.email ? " show" : ""}`} role={errors.email ? "alert" : undefined}>Please enter a valid email</span>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Your Company"
                  maxLength={200}
                  autoComplete="organization"
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <select
                  id="industry"
                  className={errors.industry ? "error" : ""}
                  value={form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  aria-invalid={errors.industry ? "true" : undefined}
                  aria-describedby={errors.industry ? "industry-error" : undefined}
                >
                  <option value="">Select Industry</option>
                  <option value="restaurant">Restaurant / Food</option>
                  <option value="poultry">Poultry / Agriculture</option>
                  <option value="hospital">Hospital / Healthcare</option>
                  <option value="school">School / Education</option>
                  <option value="logistics">Logistics / Transport</option>
                  <option value="retail">Retail / E-commerce</option>
                  <option value="construction">Construction</option>
                  <option value="other">Other</option>
                </select>
                <span id="industry-error" className={`form-error-msg${errors.industry ? " show" : ""}`} role={errors.industry ? "alert" : undefined}>Please select an industry</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+92 300 1234567"
                maxLength={40}
                autoComplete="tel"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Tell us about your needs *</label>
              <textarea
                id="message"
                className={errors.message ? "error" : ""}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="What challenges are you facing? What are you looking for?"
                maxLength={4000}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              <span id="message-error" className={`form-error-msg${errors.message ? " show" : ""}`} role={errors.message ? "alert" : undefined}>Please describe your needs</span>
            </div>
            <button type="submit" className={`form-submit${submitting ? " loading" : ""}`} disabled={submitting} aria-busy={submitting}>
              {submitting ? (
                <>
                  <svg className="spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  Request Free Demo
                </>
              )}
            </button>
            {message.type && (
              <div
                className={`form-message ${message.type}`}
                style={{ display: "flex" }}
                role="status"
                aria-live="polite"
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <a href="#" className="logo"><BrandLogo size={40} /><span className="logo-text">MianX.ai</span></a>
            <p>AI-powered Industry Operating Systems that help businesses operate, automate, analyze, and grow from a single platform.</p>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul><li><a href="#services">Industry OS</a></li><li><a href="#services">AI Automation</a></li><li><a href="#services">Multi-Channel</a></li><li><a href="#services">Analytics</a></li></ul>
          </div>
          <div className="footer-links">
            <h4>Industries</h4>
            <ul><li><a href="#industries">RestaurantOS</a></li><li><a href="#industries">PoultryOS</a></li><li><a href="#industries">HospitalOS</a></li><li><a href="#industries">SchoolOS</a></li></ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul><li><a href="#partners">Partners</a></li><li><a href="#testimonials">Testimonials</a></li><li><a href="#contact">Contact</a></li><li><Link href="/admin/login">Admin</Link></li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 MianX.ai. All rights reserved.</p>
        </div>
      </footer>

      <button className={`scroll-top${showTop ? " visible" : ""}`} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
      </button>
    </>
  );
}
