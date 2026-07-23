"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useFocusTrap } from "@/components/shared/useFocusTrap";

const NAV_LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFocusTrap(menuRef, menuOpen, () => setMenuOpen(false));

  function closeMenu() {
    setMenuOpen(false);
    menuBtnRef.current?.focus();
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar" aria-label="Primary">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon" aria-hidden="true">M</span>
            <span className="logo-text">Mianx.ai</span>
          </Link>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta">
            Talk to us
          </a>
          <button
            ref={menuBtnRef}
            className="mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          ref={menuRef}
          tabIndex={-1}
        >
          <button className="close-btn" aria-label="Close menu" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu}>
            Talk to us
          </a>
        </div>
      )}
    </>
  );
}
