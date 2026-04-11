"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

/*  Types  */
interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/*  Nav Data  */
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
  { label: "Signup", href: "/signup" },
];

/*  Animated Hamburger  */
const HamburgerIcon: React.FC<{ isOpen: boolean; isScrolled: boolean }> = ({
  isOpen,
  isScrolled,
}) => (
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

/*  Main Navbar Component  */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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

  const handleLinkClick = useCallback(() => setMobileOpen(false), []);

  // ── Active Link Logic ──
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── 1. TOP BAR (Fixed Position) ── */}
      {/* Fixed at top, z-50, no height in flow. Overlays banner. */}
      <div className=" w-full h-10 bg-[#0d0d0d] text-gray-300 border-b border-gray-800 z-50 hidden md:flex">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 h-full flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          {/* Left: Social Icons (SVG) */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Right: Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+33 1 23 45 67 89</span>
            </a>
            <a
              href="mailto:info@chefacademy.com"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@chefacademy.com</span>
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-[#0d0d0d]/95 backdrop-blur-xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-white/[0.05] py-3"
            : "bg-transparent text-gray-900 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="group flex items-center gap-3 relative z-50 "
            >
              <Image 
                src="/logo.jpg"
                alt="Chef Academy Logo"
                width={60}
                height={60}
              />
            </Link>

            {/* ── Desktop Menu ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-5 py-2 text-[13px] font-medium uppercase tracking-widest transition-all duration-300 group ${
                      active
                        ? "text-red-600"
                        : scrolled
                          ? "text-white/70 hover:text-white"
                          : "text-gray-900 hover:text-red-700"
                    }`}
                  >
                    {item.label}
                    {/* Active underline - Red Gradient */}
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent transition-all duration-500 ${
                        active ? "w-8" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Professional Divider */}
              <div
                className={`w-[1px] h-6 mx-4 transition-opacity duration-300 ${
                  scrolled
                    ? "bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    : "bg-gradient-to-b from-transparent via-gray-200 to-transparent"
                }`}
              />

              {/* Refined CTA Button - Red Gradient */}
              <Link
                href="/signup"
                className="relative px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white bg-gradient-to-r from-red-700 to-red-600 rounded hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-red-700/50 backdrop-blur-sm overflow-hidden group"
              >
                <span className="relative z-10">Enroll Now</span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center transition-colors duration-300 focus:outline-none ${
                scrolled
                  ? "text-white/80 hover:text-red-600"
                  : "text-gray-900 hover:text-red-600"
              }`}
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={mobileOpen} isScrolled={scrolled} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 top-0 z-30 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
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
          {/* Decorative Top Line - Red */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

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
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block py-4 text-3xl font-serif font-semibold tracking-wide transition-all duration-500 border-b border-white/[0.03] hover:border-red-600/20 ${
                    mobileOpen
                      ? `opacity-100 translate-y-0`
                      : `opacity-0 translate-y-8`
                  } ${
                    active
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
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA - Red Gradient */}
          <div
            className={`mt-12 transition-all duration-700 ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: mobileOpen ? "0.6s" : "0s" }}
          >
            <Link
              href="/signup"
              onClick={handleLinkClick}
              className="block w-full py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-red-700 to-red-600 rounded shadow-[0_4px_20px_rgba(220,38,38,0.2)]"
            >
              Enroll Now
            </Link>
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
