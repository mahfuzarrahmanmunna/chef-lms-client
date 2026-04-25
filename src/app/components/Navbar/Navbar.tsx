"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";


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
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // FIX: Changed 'signOut' to 'logout' to match useAuth.tsx
  const { user, logout } = useAuth();

  const profileRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Click Outside for Profile Dropdown ──
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleSignOut = async () => {
    // FIX: Call 'logout' instead of 'signOut'
    if (logout) {
      await logout();
      // Note: useAuth.tsx redirects to '/signin', but this redirects to '/'
      router.push("/");
    }
  };

  // ── Active Link Logic ──
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {/* ── 1. TOP BAR (Fixed Position) ── */}
      <div className="w-full h-10 bg-[#0d0d0d] text-gray-300 border-b border-gray-800 z-10 hidden md:flex">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 h-full flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          {/* Left: Social Icons */}
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
        className={`fixed left-0 w-full z-40 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-[#ff0909]/5 backdrop-blur-xl top-0 text-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-white/[0.05] py-2"
            : "bg-transparent text-gray-900 py-2 md:top-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 relative z-50"
            >
              <div>
                <h3 className=" text-xl font-bold text-red-700 leading-tight">
                  BPSTI
                </h3>
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  Chef Training Institute
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-5 py-2 text-[13px] font-medium uppercase tracking-widest transition-all duration-300 group ${
                      active
                        ? "text-[#ea393a]"
                        : scrolled
                          ? "text-gray-900/75 hover:text-white"
                          : "text-gray-900 hover:text-red-700"
                    }`}
                  >
                    {item.label}
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

              {/* AUTH LOGIC: Desktop */}
              {!user ? (
                /* Show Enroll Button */
                <Link
                  href="/signup"
                  className="relative px-8 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white bg-gradient-to-r from-red-700 to-red-600 rounded hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-red-700/50 backdrop-blur-sm overflow-hidden group"
                >
                  <span className="relative z-10">Enroll Now</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              ) : (
                /* Show Profile Avatar & Dropdown */
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 focus:outline-none group"
                  >
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide group-hover:text-white transition-colors">
                        My Account
                      </p>
                      <p className="text-xs font-bold truncate max-w-[100px] text-gray-200 group-hover:text-white transition-colors">
                        {user.name}
                      </p>
                    </div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-red-900 text-white flex items-center justify-center text-xs font-bold border border-white/10 shadow-md group-hover:ring-2 group-hover:ring-red-500/50 transition-all">
                      {getInitials(user.name)}
                      <ChevronDown
                        className={`absolute -bottom-1 -right-1 w-3 h-3 text-black bg-white rounded-full p-0.5 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 animate-fade-in z-50">
                      {/* User Info Header */}
                      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Signed in as
                        </p>
                        <p className="text-sm  font-bold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Admin Dashboard Link */}
                      {user.role === "admin" && (
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group/item"
                        >
                          <div className="p-1.5 rounded bg-blue-50 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Dashboard
                          </span>
                        </Link>
                      )}

                      {/* Settings Link */}
                      <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer group/item">
                        <div className="p-1.5 rounded bg-gray-100 text-gray-600 group-hover/item:bg-gray-900 group-hover/item:text-white transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Profile Settings
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-100 my-1"></div>

                      {/* Logout */}
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors text-left group/item"
                      >
                        <div className="p-1.5 rounded bg-red-50 text-[#ea393a] group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-[#ea393a] group-hover/item:text-red-700">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center transition-colors duration-300 focus:outline-none ${
                scrolled
                  ? "text-white/80 hover:text-[#ea393a]"
                  : "text-gray-900 hover:text-[#ea393a]"
              }`}
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={mobileOpen} isScrolled={scrolled} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
          className={`relative h-full flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            mobileOpen ? "translate-y-0" : "translate-y-12"
          }`}
        >
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          {/* Links */}
          <div className="space-y-2">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block py-4 text-3xl  font-semibold tracking-wide transition-all duration-500 border-b border-white/[0.03] hover:border-red-600/20 ${
                    mobileOpen
                      ? `opacity-100 translate-y-0`
                      : `opacity-0 translate-y-8`
                  } ${
                    active
                      ? "text-[#ea393a] pl-4"
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

            {/* Admin Link in Mobile Menu */}
            {user && user.role === "admin" && (
              <Link
                href="/dashboard"
                onClick={handleLinkClick}
                className={`block py-4 text-2xl  font-semibold tracking-wide transition-all duration-500 border-b border-white/[0.03] hover:border-red-600/20 ${
                  mobileOpen
                    ? `opacity-100 translate-y-0`
                    : `opacity-0 translate-y-8`
                } text-[#ea393a] hover:text-red-500 pl-4`}
                style={{ transitionDelay: mobileOpen ? "0.6s" : "0s" }}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Auth Logic */}
          <div
            className={`mt-12 transition-all duration-700 ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: mobileOpen ? "0.6s" : "0s" }}
          >
            {!user ? (
              <Link
                href="/signup"
                onClick={handleLinkClick}
                className="block w-full py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-red-700 to-red-600 rounded shadow-[0_4px_20px_rgba(220,38,38,0.2)]"
              >
                Enroll Now
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="text-center text-white/50 text-xs uppercase tracking-widest">
                  Welcome back
                </div>
                <div className="text-center text-2xl  text-white">
                  {user.name}
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-400 border border-gray-700 hover:text-white hover:border-white rounded transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/20 text-[10px] uppercase tracking-widest">
            <span>© 2026 ChefAcademy</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#ea393a] transition-colors">
                Inst
              </a>
              <a href="#" className="hover:text-[#ea393a] transition-colors">
                Fb
              </a>
            </div>
          </div>
        </div>
      </div>

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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
 
};

export default Navbar;
