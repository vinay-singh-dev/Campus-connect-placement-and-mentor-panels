import React, { useContext } from "react";
import Layout from "../../components/Layout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Users, Zap, Briefcase, MessageCircle } from "lucide-react";

/**
 * MentorDashboard (upgraded)
 * - 12 months data for charts
 * - Gradient colored stat cards with sparkline mini-charts
 * - Improved, responsive Area + Line chart for trends
 * - Recent Students list with avatar initials + status badges (color-coded)
 * - Dark/light theme styling
 * - Minor micro-interactions: hover scale, subtle glow
 */

/* --- 12-month sample data (replace with real data later) --- */
const months12 = [
  { m: "Jan" },
  { m: "Feb" },
  { m: "Mar" },
  { m: "Apr" },
  { m: "May" },
  { m: "Jun" },
  { m: "Jul" },
  { m: "Aug" },
  { m: "Sep" },
  { m: "Oct" },
  { m: "Nov" },
  { m: "Dec" },
];

/* Example metric trend over 12 months (students joined and approvals) */
const trendData12 = [
  { month: "Jan", students: 20, approved: 8, rejected: 2 },
  { month: "Feb", students: 28, approved: 12, rejected: 3 },
  { month: "Mar", students: 35, approved: 18, rejected: 4 },
  { month: "Apr", students: 40, approved: 22, rejected: 5 },
  { month: "May", students: 50, approved: 30, rejected: 6 },
  { month: "Jun", students: 62, approved: 38, rejected: 7 },
  { month: "Jul", students: 75, approved: 44, rejected: 10 },
  { month: "Aug", students: 88, approved: 55, rejected: 12 },
  { month: "Sep", students: 95, approved: 60, rejected: 13 },
  { month: "Oct", students: 110, approved: 78, rejected: 16 },
  { month: "Nov", students: 130, approved: 90, rejected: 18 },
  { month: "Dec", students: 150, approved: 110, rejected: 20 },
];

/* Top stat cards — each has a small trend (5 point sparkline) */
const statsData = [
  { title: "Students", value: 150, change: "+8.1%", trend: [110, 120, 130, 140, 150], icon: <Users size={26} /> },
  { title: "Approvals", value: 110, change: "+12.5%", trend: [80, 92, 95, 105, 110], icon: <Zap size={26} /> },
  { title: "Pending", value: 18, change: "-2.7%", trend: [20, 19, 20, 18, 18], icon: <Briefcase size={26} /> },
  { title: "Feedbacks", value: 8, change: "+11%", trend: [4, 5, 6, 7, 8], icon: <MessageCircle size={26} /> },
];

/* Recent students sample */
const recentStudents = [
  { name: "Aman Verma", branch: "CSE", status: "Approved", joined: "2025-09-15" },
  { name: "Neha Singh", branch: "ECE", status: "Pending", joined: "2025-09-17" },
  { name: "Ravi Kumar", branch: "IT", status: "Rejected", joined: "2025-09-18" },
  { name: "Priya Sharma", branch: "ME", status: "Approved", joined: "2025-09-20" },
  { name: "Karan Patel", branch: "CSE", status: "Pending", joined: "2025-09-22" },
];

const statusBadge = (status, darkMode) => {
  if (status === "Approved") return `${darkMode ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`;
  if (status === "Pending") return `${darkMode ? "bg-yellow-500 text-black" : "bg-yellow-100 text-yellow-800"}`;
  return `${darkMode ? "bg-red-600 text-white" : "bg-red-100 text-red-800"}`;
};

const cardBgStyles = [
  // subtle gradients that suit both light & dark themes
  "from-[#eff6ff] to-[#e0f2fe] dark:from-[#0b1220] dark:to-[#071028]",
  "from-[#ecfdf5] to-[#dcfce7] dark:from-[#07120b] dark:to-[#07160b]",
  "from-[#fff7ed] to-[#fff1e6] dark:from-[#1a0f08] dark:to-[#120b06]",
  "from-[#f5f3ff] to-[#eef2ff] dark:from-[#120b1a] dark:to-[#120815]",
];

const MentorDashboard = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Layout role="mentor">
      <div className="space-y-8">
        {/* Page title */}
        <h2 className="text-3xl font-space font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#f59e0b]">
          Mentor Dashboard
        </h2>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl p-5 shadow-lg transform transition hover:scale-105`}
              style={{
                background: darkMode
                  ? "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
                  : undefined,
                border: darkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
              }}
            >
              {/* subtle gradient overlay (status-aware) */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-8"
                style={{
                  background:
                    idx === 0
                      ? "linear-gradient(135deg, rgba(14,165,233,0.06), rgba(245,158,11,0.03))"
                      : idx === 1
                      ? "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(99,102,241,0.03))"
                      : idx === 2
                      ? "linear-gradient(135deg, rgba(250,204,21,0.05), rgba(245,158,11,0.02))"
                      : "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(14,165,233,0.02))",
                }}
              />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{stat.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  <p className={`mt-2 text-sm ${stat.change.includes("-") ? "text-red-500" : "text-green-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>

                <div className="ml-3 flex w-12 h-12 items-center justify-center rounded-lg bg-white/10">
                  {stat.icon}
                </div>
              </div>

              {/* Sparkline */}
              <div className="mt-4 w-full" style={{ height: 48 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stat.trend.map((v, i) => ({ x: i, value: v }))}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={stat.change.includes("-") ? "#F87171" : "#4ADE80"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Large Trends chart */}
        <div
          className={`p-6 rounded-2xl shadow-lg ${darkMode ? "bg-[#0b1220] border border-[#0f1724]" : "bg-white border border-gray-200"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>12-Month Trends</h3>
            <div className="text-sm text-gray-500">{/* placeholder for controls/legend if needed */}</div>
          </div>

          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={trendData12} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.26} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.26} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(255,255,255,0.03)" : "#f1f5f9"} />
              <XAxis dataKey="month" stroke={darkMode ? "#94a3b8" : "#334155"} />
              <YAxis stroke={darkMode ? "#94a3b8" : "#334155"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#0b1220" : "#fff",
                  borderColor: darkMode ? "#1f2a37" : "#e5e7eb",
                  color: darkMode ? "#fff" : "#000",
                }}
              />

              {/* Students area (bigger) */}
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="url(#gradStudents)" strokeWidth={2} name="Students Joined" />
              {/* Approved line */}
              <Line type="monotone" dataKey="approved" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} name="Approved" />
              {/* Rejected as a lighter line */}
              <Line type="monotone" dataKey="rejected" stroke="#fb7185" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Rejected" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Students List */}
        <div className={`p-6 rounded-2xl shadow-lg ${darkMode ? "bg-[#0b1220] border border-[#0f1724]" : "bg-white border border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Recent Students</h3>
            <button
              className={`px-3 py-1 rounded-md text-sm ${darkMode ? "bg-indigo-600 text-white" : "bg-blue-600 text-white"} hover:opacity-95`}
              onClick={() => { /* navigation hook or callback to full students list */ }}
            >
              View all
            </button>
          </div>

          <ul className="space-y-3">
            {recentStudents.map((s, idx) => (
              <li key={idx} className={`flex items-center justify-between p-3 rounded-lg transition ${darkMode ? "hover:bg-white/2" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${idx % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}`}>
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{s.name}</div>
                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{s.branch} · Joined {new Date(s.joined).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusBadge(s.status, darkMode)}`}>
                    {s.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MentorDashboard;
