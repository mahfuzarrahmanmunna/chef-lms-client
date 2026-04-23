"use client";

import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Add Courses", path: "/dashboard/add-course" },
  { name: "Manage Courses", path: "/dashboard/manage-courses" },
  { name: "Review", path: "/dashboard/review" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <h2 className="logo">LMS</h2>

      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`menu-item ${pathname === item.path ? "active" : ""}`}
          >
            {item.name}
          </div>
        ))}
      </div>

      <style jsx>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #fff;
          border-right: 1px solid #eee;
          padding: 20px;
          position: fixed;
          left: 0;
          top: 0;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menu-item {
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #444;
          transition: 0.2s;
        }

        .menu-item:hover {
          background: #f5f6fa;
        }

        .active {
          background: #e6f1fb;
          color: #185fa5;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}