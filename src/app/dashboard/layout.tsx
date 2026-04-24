"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "./useAuth"; // Adjust import path as needed
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Star,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  Home,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// --- COMPONENT ---

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  // Navigation Items Configuration
  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Add Courses",
      href: "/dashboard/addcourses",
      icon: <BookOpen size={20} />,
    },
    {
      label: "Manage Courses",
      href: "/dashboard/managecourses",
      icon: <BookOpen size={20} />, // You can replace with a different icon if you have one
    },
    {
      label: "Banner Leads",
      href: "/dashboard/managebannercontact",
      icon: <MessageSquare size={20} />,
    },
    {
      label: "Contact Forms",
      href: "/dashboard/managecontact",
      icon: <MessageSquare size={20} />,
    },
    {
      label: "Reviews",
      href: "/dashboard/review",
      icon: <Star size={20} />,
    },
  ];

  // Page Title Logic
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.includes("addcourses")) return "Add New Course";
    if (pathname.includes("managecourses")) return "Manage Courses";
    if (pathname.includes("managebannercontact")) return "Banner Inquiries";
    if (pathname.includes("managecontact")) return "Contact Messages";
    if (pathname.includes("review")) return "Student Reviews";
    return "Admin Panel";
  };

  const getPageSubtitle = () => {
    if (pathname === "/dashboard")
      return "Welcome back, " + (user?.name || "Admin");
    if (pathname.includes("addcourses"))
      return "Create and publish new learning material.";
    if (pathname.includes("managecourses"))
      return "Edit curriculum and organize content.";
    if (pathname.includes("managebannercontact"))
      return "Leads collected from website banners.";
    if (pathname.includes("managecontact"))
      return "Messages from the contact form.";
    if (pathname.includes("review")) return "Moderate student feedback.";
    return "Manage your application.";
  };

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">
      {/* --- MOBILE OVERLAY --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
              <p className="text-xs text-slate-400">Control Center</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActiveLink(item.href)
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div
                className={`${
                  isActiveLink(item.href)
                    ? "text-white"
                    : "text-slate-500 group-hover:text-white"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-72" : "lg:pl-0"
        }`}
      >
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left: Menu Toggle & Breadcrumbs */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-slate-800">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-slate-500">{getPageSubtitle()}</p>
              </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Notification Bell (Placeholder) */}
              <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                >
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-slate-700 leading-none">
                      {loading ? "Loading..." : user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-slate-500 capitalize mt-1 leading-none">
                      {user?.role || "Administrator"}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-slate-400 hidden md:block"
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50">
                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#ea393a] hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
