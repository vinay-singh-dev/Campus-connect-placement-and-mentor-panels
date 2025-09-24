import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { FiDownload } from "react-icons/fi";

// ✅ Helper function to generate and download CSV
const downloadCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data available to download!");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","), // header row
    ...data.map((row) =>
      headers.map((field) => `"${row[field] ?? ""}"`).join(",")
    ),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const Reports = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterChoice, setFilterChoice] = useState("all");

  // ✅ This would eventually come from API (get all students with status)
  const applications = [
    {
      name: "John Doe",
      email: "john@example.com",
      appliedFor: "Software Engineer",
      status: "Pending",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      appliedFor: "Data Analyst",
      status: "Approved",
    },
    {
      name: "Sam Lee",
      email: "sam@example.com",
      appliedFor: "Frontend Developer",
      status: "Rejected",
    },
  ];

  // ✅ Download All Applications
  const downloadAllApplications = (e) => {
    e.stopPropagation();
    downloadCSV(applications, "all_applications.csv");
  };

  // ✅ Handle filtered download (Pending / Approved / Rejected / All)
  const handleFilteredDownload = (e) => {
    e.stopPropagation();

    const filtered = applications.filter(
      (app) =>
        filterChoice === "all" ||
        app.status.toLowerCase() === filterChoice.toLowerCase()
    );

    const dataToDownload = filtered.length > 0 ? filtered : applications;

    downloadCSV(dataToDownload, `${filterChoice}_applications.csv`);
    setShowFilterModal(false);
  };

  return (
    <Layout role="admin">
      <div
        className={`min-h-screen pt-6 px-6 transition-colors ${
          darkMode
            ? "bg-darkBackground text-darkSecondary"
            : "bg-gray-50 text-secondary"
        }`}
      >
        {/* Gradient Title */}
        <h2 className="text-3xl font-space font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#f59e0b]">
          Reports
        </h2>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={downloadAllApplications}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition
              ${
                darkMode
                  ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            <FiDownload size={20} />
            Download All Applications
          </button>

          <button
            onClick={() => setShowFilterModal(true)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition
              ${
                darkMode
                  ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            <FiDownload size={20} />
            Download Filtered Applications
          </button>
        </div>

        {/* Applications Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow transition-colors ${
                darkMode
                  ? "bg-darkCard hover:bg-darkCard/90"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <h2
                className={`font-semibold text-lg mb-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {app.name}
              </h2>
              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-darkSecondary" : "text-gray-600"
                }`}
              >
                Email: {app.email}
              </p>
              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-darkSecondary" : "text-gray-600"
                }`}
              >
                Applied For: {app.appliedFor}
              </p>
              <p
                className={`text-sm font-medium ${
                  app.status === "Approved"
                    ? "text-green-600 dark:text-green-400"
                    : app.status === "Rejected"
                    ? "text-red-600 dark:text-red-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                Status: {app.status}
              </p>
            </div>
          ))}
        </div>

        {/* Modal for Filtered Reports */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className={`p-6 rounded-2xl shadow-xl w-[90%] max-w-md ${
                darkMode ? "bg-darkCard text-white" : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0ea5e9] to-[#f59e0b]">
                Select Report Type
              </h3>

              <select
                value={filterChoice}
                onChange={(e) => setFilterChoice(e.target.value)}
                className={`border p-2 rounded w-full mb-4 focus:outline-none ${
                  darkMode
                    ? "bg-[#0F172A] border-[#334155] text-gray-200"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 rounded-lg font-medium transition bg-gray-300 hover:bg-gray-400 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFilteredDownload}
                  className="px-4 py-2 rounded-lg font-medium transition bg-gradient-to-r from-[#0ea5e9] to-[#f59e0b] text-white hover:opacity-90"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
