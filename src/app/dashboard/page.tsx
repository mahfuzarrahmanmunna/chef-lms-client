"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// --- Types ---
interface DashboardData {
  totalUsers: number;
  totalCourses: number;
  totalOffers: number;
}

// --- Icons ---
const ArrowUp = () => (
  <svg
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#3B6D11"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const ArrowDown = () => (
  <svg
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#A32D2D"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#185FA5"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CoursesIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#3B6D11"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const OffersIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#854F0B"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CompletionIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#534AB7"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// --- Components ---

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#EAF3DE", color: "#3B6D11" },
    Review: { bg: "#FAEEDA", color: "#854F0B" },
    New: { bg: "#E6F1FB", color: "#185FA5" },
    Paused: { bg: "#FCEBEB", color: "#A32D2D" },
  };
  const style = map[status] ?? map["Active"];
  return (
    <span
      className="text-[11px] font-bold px-2 py-1 rounded-full"
      style={{ background: style.bg, color: style.color }}
    >
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  delta,
  deltaUp = true,
  icon,
  accentLight,
}: {
  title: string;
  value: string | number;
  delta?: string;
  deltaUp?: boolean;
  icon: React.ReactNode;
  accentLight: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: accentLight }}
      >
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className="text-3xl font-bold text-[#1a1a2e] leading-none mb-2">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {delta && (
        <div
          className={`flex items-center gap-1.5 text-xs font-medium ${deltaUp ? "text-[#3B6D11]" : "text-[#A32D2D]"}`}
        >
          {deltaUp ? <ArrowUp /> : <ArrowDown />}
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    totalCourses: 0,
    totalOffers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API Call
    axios
      .get("/api/dashboard")
      .then((res) => setData(res.data))
      .catch(() => {
        // Fallback data if API fails
        setData({ totalUsers: 4820, totalCourses: 68, totalOffers: 14 });
      })
      .finally(() => setLoading(false));
  }, []);

  const enrollmentData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Students",
        data: [2800, 3100, 2950, 3400, 3700, 4200, data.totalUsers || 4820],
        borderColor: "#378ADD",
        backgroundColor: "rgba(55,138,221,0.08)",
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: "#378ADD",
        fill: true,
        tension: 0.45,
      },
      {
        label: "Completions",
        data: [1900, 2100, 2000, 2400, 2600, 2950, 3200],
        borderColor: "#639922",
        backgroundColor: "rgba(99,153,34,0.06)",
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: "#639922",
        fill: true,
        tension: 0.45,
        borderDash: [5, 4],
      },
    ],
  };

  const doughnutData = {
    labels: ["Development", "Design", "Data Science", "Business"],
    datasets: [
      {
        data: [42, 27, 18, 13],
        backgroundColor: ["#378ADD", "#7F77DD", "#639922", "#EF9F27"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: "rgba(0,0,0,0.04)" },
        ticks: {
          font: { size: 11 },
          callback: (v: unknown) => {
            const num = typeof v === "number" ? v : parseFloat(String(v));
            return (num / 1000).toFixed(1) + "k";
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    cutout: "70%",
  };

  const topCourses = [
    { name: "Web Dev Bootcamp", students: 1240, status: "Active" },
    { name: "UI/UX Foundations", students: 980, status: "Active" },
    { name: "Data Science 101", students: 860, status: "Review" },
    { name: "Python Mastery", students: 740, status: "Active" },
    { name: "Mobile with React", students: 510, status: "New" },
  ];

  const activity = [
    {
      color: "#378ADD",
      text: "New batch enrolled in Web Dev Bootcamp",
      sub: "2 min ago · 48 students",
    },
    {
      color: "#639922",
      text: "Offer SUMMER30 activated successfully",
      sub: "18 min ago",
    },
    {
      color: "#854F0B",
      text: "Data Science 101 flagged for content review",
      sub: "1 hr ago",
    },
    {
      color: "#534AB7",
      text: "New course Mobile with React published",
      sub: "3 hrs ago",
    },
    {
      color: "#D4537E",
      text: "156 certificates issued this week",
      sub: "Today · 09:00 AM",
    },
  ];

  const categories = [
    { label: "Development", pct: 42, color: "#378ADD" },
    { label: "Design", pct: 27, color: "#7F77DD" },
    { label: "Data Science", pct: 18, color: "#639922" },
    { label: "Business", pct: 13, color: "#EF9F27" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={loading ? "—" : data.totalUsers}
          delta="12% vs last month"
          deltaUp
          icon={<UsersIcon />}
          accentLight="#E6F1FB"
        />
        <MetricCard
          title="Total Courses"
          value={loading ? "—" : data.totalCourses}
          delta="5 new this month"
          deltaUp
          icon={<CoursesIcon />}
          accentLight="#EAF3DE"
        />
        <MetricCard
          title="Active Offers"
          value={loading ? "—" : data.totalOffers}
          delta="3 expire soon"
          deltaUp={false}
          icon={<OffersIcon />}
          accentLight="#FAEEDA"
        />
        <MetricCard
          title="Completion Rate"
          value="74%"
          delta="2% vs last month"
          deltaUp={false}
          icon={<CompletionIcon />}
          accentLight="#EEEDFE"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1a1a2e]">
              Enrollment over time
            </h3>
            <div className="flex gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#378ADD]" />
                Students
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#639922]" />
                Completions
              </span>
            </div>
          </div>
          <div style={{ position: "relative", height: 210 }}>
            <Line data={enrollmentData} options={lineOptions} />
          </div>
        </div>

        {/* Doughnut Chart (Takes 1 column) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">
            Course categories
          </h3>
          <div style={{ position: "relative", height: 130, marginBottom: 16 }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div className="flex flex-col gap-2">
            {categories.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{c.label}</span>
                  <span className="font-semibold text-[#333]">{c.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${c.pct}%`, background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses Table */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">
            Top courses
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Course
                </th>
                <th className="pb-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Students
                </th>
                <th className="pb-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topCourses.map((c) => (
                <tr key={c.name} className="group">
                  <td className="py-3 font-medium text-[#333] group-hover:text-blue-600 transition-colors">
                    {c.name}
                  </td>
                  <td className="py-3 text-gray-500">
                    {c.students.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <StatusPill status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4">
            Recent activity
          </h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: a.color }}
                />
                <div>
                  <p className="text-sm font-medium text-[#333] leading-snug">
                    {a.text}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
