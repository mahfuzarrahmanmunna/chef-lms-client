"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

/*  Types  */
interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/*  Nav Data  */
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/*  Animated Hamburger (Refined)  */
const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="relative w-6 h-5 flex flex-col justify-between items-end group">
    <span
      className={`block h-[1.5px] w-full bg-current origin-left transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isOpen ? "rotate-[45deg] translate-y-[5px]" : ""
      }`}
    />
    <span
      className={`block h-[1.5px] w-2/3 bg-current transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isOpen ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
      }`}
    />
    <span
      className={`block h-[1.5px] w-full bg-current origin-left transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isOpen ? "-rotate-[45deg] -translate-y-[5px]" : ""
      }`}
    />
  </div>
);

/*  Main Navbar  */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll ──
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Close on resize ──
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  // ── Active section tracking ──
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-[#0d0d0d]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-white/[0.05] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* ── Logo (Professional Serif Look) ── */}
            <a
              href="#home"
              className="group flex items-center gap-3 relative z-10"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a96e] to-[#a0814a] flex items-center justify-center shadow-[0_0_20px_rgba(201,169,110,0.3)] group-hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg font-serif font-bold tracking-wide leading-tight">
                  Chef<span className="text-red-600">Academy</span>
                </span>
                <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">
                  Est. 1985
                </span>
              </div>
            </a>

            {/* ── Desktop Menu ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-5 py-2 text-[13px] font-medium uppercase tracking-widest transition-all duration-300 group ${
                      isActive
                        ? "text-red-600"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {/* Active underline with glow */}
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent transition-all duration-500 ${
                        isActive ? "w-8" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </a>
                );
              })}

              {/* Professional Divider */}
              <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-4" />

              {/* Refined CTA Button */}
              <a
                href="#courses"
                className="relative px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-[#0d0d0d] bg-gradient-to-r from-[#c9a96e] to-[#d4b06a] rounded hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-[#c9a96e]/30 backdrop-blur-sm overflow-hidden group"
              >
                <span className="relative z-10">Enroll Now</span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-red-600 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay (Luxurious Feel) ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop with texture */}
        <div
          className={`absolute inset-0 bg-[#0d0d0d] transition-opacity duration-700 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Menu Content */}
        <div
          ref={mobileMenuRef}
          className={`relative h-full flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            mobileOpen ? "translate-y-0" : "translate-y-12"
          }`}
        >
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />

          {/* Decorative Watermark Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] text-[#1a1a1a] opacity-10 pointer-events-none">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z" />
            </svg>
          </div>

          <div className="space-y-2">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block py-4 text-3xl font-serif font-semibold tracking-wide transition-all duration-500 border-b border-white/[0.03] hover:border-[#c9a96e]/20 ${
                    mobileOpen
                      ? `opacity-100 translate-y-0`
                      : `opacity-0 translate-y-8`
                  } ${
                    isActive
                      ? "text-red-600 pl-4"
                      : "text-white/80 hover:text-white hover:pl-4"
                  }`}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${0.2 + i * 0.08}s`
                      : `${(navItems.length - i) * 0.04}s`,
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile CTA with Style */}
          <div
            className={`mt-12 transition-all duration-700 ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: mobileOpen ? "0.6s" : "0s" }}
          >
            <a
              href="#courses"
              onClick={handleLinkClick}
              className="block w-full py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#0d0d0d] bg-gradient-to-r from-[#c9a96e] to-[#d4b06a] rounded shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
            >
              Enroll Now
            </a>
          </div>

          {/* Footer Info inside Menu */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/20 text-[10px] uppercase tracking-widest">
            <span>© 2026 ChefAcademy</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-600 transition-colors">
                Inst
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Fb
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global Animation Keyframes ── */}
      <style jsx global>{`
        @keyframes navbarSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        nav {
          animation: navbarSlideDown 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
