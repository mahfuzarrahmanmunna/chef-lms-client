"use client";

import axios from "axios";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface DashboardData {
  totalUsers: number;
  totalCourses: number;
  totalOffers: number;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaUp?: boolean;
  icon: React.ReactNode;
  accent: string;
  accentLight: string;
}

// ─── Icons ────────────
// ────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DashboardIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const AddCourseIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.8"/>
  </svg>
);

const ManageCoursesIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8"/>
  </svg>
);

const ReviewIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const UsersIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.8" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CoursesIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.8" />
  </svg>
);

const OffersIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={color} strokeWidth="1.8" />
  </svg>
);

const CompletionIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUp = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
    <path d="M12 19V5M5 12l7-7 7 7" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
    <path d="M12 5v14M19 12l-7 7-7-7" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({ title, value, delta, deltaUp = true, icon, accent, accentLight }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: accentLight }}>
        {icon}
      </div>
      <p className="metric-label">{title}</p>
      <p className="metric-value">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {delta && (
        <div className={`metric-delta ${deltaUp ? "delta-up" : "delta-down"}`}>
          {deltaUp ? <ArrowUp /> : <ArrowDown />}
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}

// ─── StatusPill ───────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active:  { bg: "#EAF3DE", color: "#3B6D11" },
    Review:  { bg: "#FAEEDA", color: "#854F0B" },
    New:     { bg: "#E6F1FB", color: "#185FA5" },
    Paused:  { bg: "#FCEBEB", color: "#A32D2D" },
  };
  const style = map[status] ?? map["Active"];
  return (
    <span style={{
      fontSize: 11, padding: "3px 9px", borderRadius: 20,
      fontWeight: 600, background: style.bg, color: style.color,
    }}>
      {status}
    </span>
  );
}

// ─── Page Components ────────────────────────────────────────────────────────────────
function AddCoursesPage() {
  return (
    <div className="page-content">
      <h2 className="page-title">Add New Course</h2>
      <div className="form-container">
        <div className="form-group">
          <label>Course Title</label>
          <input type="text" placeholder="Enter course title" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea rows={4} placeholder="Enter course description"></textarea>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select>
            <option>Development</option>
            <option>Design</option>
            <option>Data Science</option>
            <option>Business</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" placeholder="$" />
        </div>
        <button className="submit-btn">Add Course</button>
      </div>
    </div>
  );
}

function ReviewPage() {
  const reviews = [
    { id: 1, course: "Data Science 101", reviewer: "John Doe", rating: 4.5, comment: "Great course! Very comprehensive.", status: "Pending" },
    { id: 2, course: "Web Dev Bootcamp", reviewer: "Jane Smith", rating: 5, comment: "Excellent content and teaching style.", status: "Approved" },
    { id: 3, course: "UI/UX Foundations", reviewer: "Mike Johnson", rating: 4, comment: "Good fundamentals, but needs more examples.", status: "Pending" },
    { id: 4, course: "Python Mastery", reviewer: "Sarah Williams", rating: 4.5, comment: "Very practical and hands-on.", status: "Approved" },
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Course Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.course}</h3>
              <span className={`review-status ${review.status.toLowerCase()}`}>{review.status}</span>
            </div>
            <div className="review-rating">Rating: {"★".repeat(Math.floor(review.rating))}{"☆".repeat(5-Math.floor(review.rating))} ({review.rating})</div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              <span>- {review.reviewer}</span>
              <div className="review-actions">
                <button className="review-btn approve">Approve</button>
                <button className="review-btn reject">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    totalCourses: 0,
    totalOffers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check screen size on mount
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => setData(res.data))
      .catch(() => {
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
    { color: "#378ADD", text: "New batch enrolled in Web Dev Bootcamp", sub: "2 min ago · 48 students" },
    { color: "#639922", text: "Offer SUMMER30 activated successfully", sub: "18 min ago" },
    { color: "#854F0B", text: "Data Science 101 flagged for content review", sub: "1 hr ago" },
    { color: "#534AB7", text: "New course Mobile with React published", sub: "3 hrs ago" },
    { color: "#D4537E", text: "156 certificates issued this week", sub: "Today · 09:00 AM" },
  ];

  const categories = [
    { label: "Development", pct: 42, color: "#378ADD" },
    { label: "Design",      pct: 27, color: "#7F77DD" },
    { label: "Data Science",pct: 18, color: "#639922" },
    { label: "Business",    pct: 13, color: "#EF9F27" },
  ];

  const renderPage = () => {
    switch(activePage) {
      case "add-courses":
        return <AddCoursesPage />;
      case "review":
        return <ReviewPage />;
      default:
        return (
          <>
            <div className="metrics-grid">
              <MetricCard
                title="Total Students"
                value={loading ? "—" : data.totalUsers}
                delta="12% vs last month"
                deltaUp
                accent="#185FA5"
                accentLight="#E6F1FB"
                icon={<UsersIcon color="#185FA5" />}
              />
              <MetricCard
                title="Total Courses"
                value={loading ? "—" : data.totalCourses}
                delta="5 new this month"
                deltaUp
                accent="#3B6D11"
                accentLight="#EAF3DE"
                icon={<CoursesIcon color="#3B6D11" />}
              />
              <MetricCard
                title="Active Offers"
                value={loading ? "—" : data.totalOffers}
                delta="3 expire soon"
                deltaUp={false}
                accent="#854F0B"
                accentLight="#FAEEDA"
                icon={<OffersIcon color="#854F0B" />}
              />
              <MetricCard
                title="Completion Rate"
                value="74%"
                delta="2% vs last month"
                deltaUp={false}
                accent="#534AB7"
                accentLight="#EEEDFE"
                icon={<CompletionIcon color="#534AB7" />}
              />
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <div className="card-head">
                  <span className="card-title">Enrollment over time</span>
                  <div className="legend-row">
                    <span className="leg-item">
                      <span className="leg-dot" style={{ background: "#378ADD" }} />
                      Students
                    </span>
                    <span className="leg-item">
                      <span className="leg-dot" style={{ background: "#639922" }} />
                      Completions
                    </span>
                  </div>
                </div>
                <div style={{ position: "relative", height: 210 }}>
                  <Line data={enrollmentData} options={lineOptions} />
                </div>
              </div>

              <div className="chart-card">
                <div className="card-head">
                  <span className="card-title">Course categories</span>
                </div>
                <div style={{ position: "relative", height: 130, marginBottom: 16 }}>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {categories.map((c) => (
                    <div key={c.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 3 }}>
                        <span>{c.label}</span>
                        <span style={{ fontWeight: 600, color: "#333" }}>{c.pct}%</span>
                      </div>
                      <div style={{ background: "#f3f4f6", borderRadius: 4, height: 5 }}>
                        <div style={{ width: `${c.pct}%`, background: c.color, borderRadius: 4, height: 5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bottom-row">
              <div className="chart-card">
                <div className="card-head">
                  <span className="card-title">Top courses</span>
                </div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Students</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCourses.map((c) => (
                      <tr key={c.name}>
                        <td style={{ fontWeight: 500 }}>{c.name}</td>
                        <td style={{ color: "#888" }}>{c.students.toLocaleString()}</td>
                        <td><StatusPill status={c.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="chart-card">
                <div className="card-head">
                  <span className="card-title">Recent activity</span>
                </div>
                <div>
                  {activity.map((a, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-dot" style={{ background: a.color }} />
                      <div>
                        <div className="activity-text">{a.text}</div>
                        <div className="activity-sub">{a.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f7f8fc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 100;
          box-shadow: 2px 0 12px rgba(0,0,0,0.1);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #a0a0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sidebar-header p {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          margin-top: 0.25rem;
        }

        .close-sidebar-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .close-sidebar-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .nav-menu {
          flex: 1;
          padding: 1.5rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.875rem 1.5rem;
          margin: 0.25rem 0;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .nav-item.active {
          background: rgba(55,138,221,0.15);
          border-left-color: #378ADD;
          color: #fff;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }

        .nav-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
          transition: margin-left 0.3s ease-in-out;
        }

        .main-content.sidebar-closed {
          margin-left: 0;
        }

        /* Top Bar */
        .top-bar {
          background: #fff;
          border-radius: 14px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          border: 1px solid #f0f0f0;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a2e;
          transition: background 0.2s;
        }

        .menu-toggle:hover {
          background: #f0f0f0;
        }

        .page-info {
          flex: 1;
          margin-left: 1rem;
        }

        .page-info h1 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 4px;
        }

        .page-info p {
          font-size: 13px;
          color: #999;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #378ADD, #7F77DD);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
        }

        /* Overlay for mobile */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
          display: none;
        }

        .sidebar-overlay.visible {
          display: block;
        }

        .metric-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #f0f0f0;
          padding: 1.1rem 1.25rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .metric-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }
        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .metric-label {
          font-size: 12px;
          color: #888;
          margin-bottom: 4px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .metric-value {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1;
          margin-bottom: 8px;
        }
        .metric-delta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .delta-up { color: #3B6D11; }
        .delta-down { color: #A32D2D; }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 1.5rem;
        }

        .charts-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 14px;
          margin-bottom: 1.5rem;
        }

        .chart-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #f0f0f0;
          padding: 1.25rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .legend-row {
          display: flex;
          gap: 14px;
        }

        .leg-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #999;
        }

        .leg-dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        .bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .tbl {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .tbl th {
          font-size: 11px;
          font-weight: 600;
          color: #aaa;
          text-align: left;
          padding: 0 0 10px;
          border-bottom: 1px solid #f0f0f0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .tbl td {
          padding: 9px 0;
          border-bottom: 1px solid #f7f7f7;
          color: #333;
        }

        .tbl tr:last-child td { border-bottom: none; }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #f7f7f7;
        }

        .activity-item:last-child { border-bottom: none; }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .activity-text {
          font-size: 13px;
          color: #333;
          line-height: 1.45;
        }

        .activity-sub {
          font-size: 11px;
          color: #aaa;
          margin-top: 2px;
        }

        /* Page Content Styles */
        .page-content {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #f0f0f0;
          padding: 2rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 2rem;
        }

        .form-container {
          max-width: 600px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #378ADD;
        }

        .submit-btn {
          background: #378ADD;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #2a6eb5;
        }

        .manage-table {
          width: 100%;
          border-collapse: collapse;
        }

        .manage-table th,
        .manage-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
        }

        .manage-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #555;
        }

        .action-btn {
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          margin-right: 0.5rem;
        }

        .action-btn.edit {
          background: #378ADD;
          color: #fff;
        }

        .action-btn.delete {
          background: #dc3545;
          color: #fff;
        }

        .reviews-container {
          display: grid;
          gap: 1rem;
        }

        .review-card {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.5rem;
          transition: box-shadow 0.2s;
        }

        .review-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .review-header h3 {
          font-size: 18px;
          color: #1a1a2e;
        }

        .review-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .review-status.pending {
          background: #fff3cd;
          color: #856404;
        }

        .review-status.approved {
          background: #d4edda;
          color: #155724;
        }

        .review-rating {
          margin-bottom: 0.75rem;
          color: #f5a623;
        }

        .review-comment {
          color: #666;
          margin-bottom: 1rem;
          font-style: italic;
        }

        .review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #888;
          font-size: 13px;
        }

        .review-actions {
          display: flex;
          gap: 0.5rem;
        }

        .review-btn {
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .review-btn.approve {
          background: #28a745;
          color: #fff;
        }

        .review-btn.reject {
          background: #dc3545;
          color: #fff;
        }

        @media (max-width: 1024px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .charts-row { grid-template-columns: 1fr; }
          .bottom-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>

      <div className="dashboard-layout">
        {/* Overlay for mobile */}
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} 
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
          <div className="sidebar-header">
            <div>
              
              <p>Admin Dashboard</p>
            </div>
            <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="nav-menu">
            <div 
              className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setActivePage("dashboard");
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <div className="nav-icon"><DashboardIcon color="currentColor" /></div>
              <span className="nav-label">Dashboard</span>
            </div>
            <div 
              className={`nav-item`}
              onClick={() => {
                router.push("/courses/addcourses");
              }}
            >
              <div className="nav-icon">
                <AddCourseIcon color="currentColor" />
              </div>
              <span className="nav-label">Add Courses</span>
            </div>
            <div 
              className={`nav-item`}
              onClick={() => {
                router.push("/courses/managecourses");
              }}
            >
              <div className="nav-icon"><ManageCoursesIcon color="currentColor" /></div>
              <span className="nav-label">Manage Courses</span>
            </div>
            <div 
              className={`nav-item ${activePage === "review" ? "active" : ""}`}
              onClick={() => {
                setActivePage("review");
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <div className="nav-icon"><ReviewIcon color="currentColor" /></div>
              <span className="nav-label">Review</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          {/* Top Bar */}
          <div className="top-bar">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon />
            </button>
            <div className="page-info">
              <h1>
                {activePage === "dashboard" && "Learning Dashboard"}
                {activePage === "add-courses" && "Add New Course"}
                {activePage === "review" && "Course Reviews"}
              </h1>
              <p>
                {activePage === "dashboard" && "Overview · April 2026"}
                {activePage === "add-courses" && "Create and publish new courses"}
                {activePage === "review" && "Moderate student feedback and ratings"}
              </p>
            </div>
            <div className="user-badge">
              <div className="avatar">AD</div>
            </div>
          </div>
          
          {renderPage()}
        </div>
      </div>
    </>
  );
}