"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- Icons (SVGs) ---
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const DashboardIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

const AddCourseIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const ManageCoursesIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ReviewIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Handle Mobile Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Closed on mobile logic
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    {
      label: "Add Courses",
      href: "/courses/addcourses",
      icon: <AddCourseIcon />,
    },
    {
      label: "Manage Courses",
      href: "/courses/managecourses",
      icon: <ManageCoursesIcon />,
    },
    { label: "Review", href: "/dashboard/review", icon: <ReviewIcon /> },
  ];

  // Helper to determine active state
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8fc] font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#a0a0ff] bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-xs text-white/60 mt-1">Control Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 md:hidden transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-500/20 border-l-4 border-blue-500 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                }`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-0 transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white border border-gray-100 rounded-xl p-4 m-4 mb-0 flex items-center justify-between shadow-sm sticky top-4 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <MenuIcon />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-[#1a1a2e]">
                {pathname === "/dashboard" && "Learning Dashboard"}
                {pathname === "/courses/addcourses" && "Add New Course"}
                {pathname === "/courses/managecourses" && "Manage Courses"}
                {pathname === "/dashboard/review" && "Course Reviews"}
              </h1>
              <p className="text-xs text-gray-400">
                {pathname === "/dashboard" && "Overview · April 2026"}
                {pathname.includes("addcourses") &&
                  "Create and publish new courses"}
                {pathname.includes("managecourses") &&
                  "Edit and organize curriculum"}
                {pathname.includes("review") &&
                  "Moderate student feedback and ratings"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#378ADD] to-[#7F77DD] flex items-center justify-center text-white font-bold text-sm shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
