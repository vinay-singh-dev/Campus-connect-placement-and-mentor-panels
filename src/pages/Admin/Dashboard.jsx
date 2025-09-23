import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { DarkModeContext } from "../../context/DarkModeContext";
import { X } from "lucide-react";

const CARD_COLORS = ["#4ADE80", "#FACC15", "#F87171", "#60A5FA", "#A78BFA"];
const PIE_COLORS = ["#4ADE80", "#FACC15", "#F87171", "#60A5FA", "#A78BFA"];

const pieData = [
  { name: "Computer Science", value: 95 },
  { name: "Electronics", value: 72 },
  { name: "Mechanical", value: 55 },
  { name: "Civil", value: 45 },
  { name: "IT", value: 53 },
];

const departments = [
  { name: "Computer Science", placed: 95, total: 120 },
  { name: "Electronics", placed: 72, total: 100 },
  { name: "Mechanical", placed: 55, total: 80 },
  { name: "Civil", placed: 45, total: 70 },
  { name: "IT", placed: 53, total: 80 },
];

const upcomingDeadlinesData = [
  { name: "TechCorp Internship", date: "2025-09-23" },
  { name: "InnovateTech Placement", date: "2025-09-29" },
];

const recentActivitiesData = [
  "📌 New application from John Smith for TechCorp internship",
  "📌 Interview scheduled for Emily Davis at InnovateTech",
  "📌 Mentor approval pending for 5 applications",
];

const exampleTrendData = [
  { month: "May", value: 10 },
  { month: "Jun", value: 12 },
  { month: "Jul", value: 15 },
  { month: "Aug", value: 14 },
  { month: "Sep", value: 18 },
];

const AdminDashboard = () => {
  const [sdata, setData] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-static`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setData(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const openModal = (stat) => {
    setSelectedStat(stat);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStat(null);
    setModalOpen(false);
  };

  const calculateDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = (deadlineDate - today) / (1000 * 3600 * 24);
    return diff <= 5 ? "bg-red-500 text-white" : "bg-green-500 text-white";
  };

  return (
    <Layout role="admin">
      <h2 className="text-2xl font-bold text-primary dark:text-darkPrimary mb-6">
        Placement Cell Dashboard
      </h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        {sdata.length
          ? sdata.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl shadow-card cursor-pointer transform hover:scale-105 transition text-center"
                style={{ backgroundColor: CARD_COLORS[idx % CARD_COLORS.length], color: "#000" }}
                onClick={() => openModal(stat)}
              >
                <h3 className="font-medium text-sm">{stat.name}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.change.includes("-") ? "text-red-800" : "text-green-800"}`}>
                  {stat.change} from last month
                </p>
              </div>
            ))
          : 
            [
              { name: "Total Students", value: 12, change: "+12%" },
              { name: "Placed Students", value: 0, change: "+8%" },
              { name: "Active Opportunities", value: 17, change: "+5%" },
              { name: "Pending Applications", value: 14, change: "-3%" },
              { name: "Interviews Scheduled", value: 0, change: "+15%" },
              { name: "Placement Rate", value: 49.5, change: "+2.1%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl shadow-card cursor-pointer transform hover:scale-105 transition text-center"
                style={{ backgroundColor: CARD_COLORS[idx % CARD_COLORS.length], color: "#000" }}
                onClick={() => openModal(stat)}
              >
                <h3 className="font-medium text-sm">{stat.name}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.change.includes("-") ? "text-red-800" : "text-green-800"}`}>
                  {stat.change} from last month
                </p>
              </div>
            ))}
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-card hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-semibold text-secondary dark:text-darkSecondary mb-4">
            Department-wise Placement
          </h3>
          <ul className="space-y-4">
            {departments.map((dept, idx) => {
              const percentage = ((dept.placed / dept.total) * 100).toFixed(1);
              const color = PIE_COLORS[idx % PIE_COLORS.length];
              return (
                <li key={idx}>
                  <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{dept.name}</span>
                    <span>
                      {dept.placed} / {dept.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-card hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-semibold text-secondary dark:text-darkSecondary mb-4">
            Placement Statistics
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sdata.length ? sdata : pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {(sdata.length ? sdata : pieData).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {}
          <div className="mt-4 flex flex-wrap gap-4">
            {(sdata.length ? sdata : pieData).map((dept, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-card hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-semibold text-secondary dark:text-darkSecondary mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-3 text-sm text-gray-900 dark:text-gray-100">
            {recentActivitiesData.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-card hover:scale-105 transition transform cursor-pointer">
          <h3 className="font-semibold text-secondary dark:text-darkSecondary mb-4">
            Upcoming Deadlines
          </h3>
          <ul className="space-y-3 text-sm">
            {upcomingDeadlinesData.map((item, idx) => {
              const colorClass = calculateDeadlineColor(item.date);
              return (
                <li key={idx} className={`${colorClass} px-2 py-1 rounded`}>
                  {item.name} – {new Date(item.date).toLocaleDateString()}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {}
      {modalOpen && selectedStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card w-full max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {selectedStat.name} Details
            </h3>
            <ul className="space-y-2 mb-4">
              <li
                className={`p-2 rounded-lg ${
                  selectedStat.change.includes("-")
                    ? "bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200"
                    : "bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200"
                }`}
              >
                <span className="font-medium">Value:</span> {selectedStat.value}
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-200">
                Change: {selectedStat.change} from last month
              </li>
            </ul>

            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-100">
                Last 5 Months Trend
              </h4>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={exampleTrendData}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={CARD_COLORS[0]}
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
