import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { FiDownload } from "react-icons/fi";

const Reports = () => {
  const { darkMode } = useContext(DarkModeContext);

  const downloadAllApplications = (e) => {
    e.stopPropagation();
    console.log("Downloading All Applications...");
  };

  const downloadFilteredApplications = (e) => {
    e.stopPropagation();
    console.log("Downloading Filtered Applications...");
  };

  const applications = [
    { name: "John Doe", email: "john@example.com", appliedFor: "Software Engineer", status: "Pending" },
    { name: "Jane Smith", email: "jane@example.com", appliedFor: "Data Analyst", status: "Approved" },
  ];

  return (
    <Layout role="admin">
      <div
        className={`min-h-screen pt-6 px-6 transition-colors ${
          darkMode ? "bg-darkBackground text-darkSecondary" : "bg-gray-50 text-secondary"
        }`}
      >
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>Reports</h1>

        {}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={downloadAllApplications}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition
              ${darkMode ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            <FiDownload size={20} />
            Download All Applications
          </button>

          <button
            onClick={downloadFilteredApplications}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition
              ${darkMode ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90" : "bg-green-600 text-white hover:bg-green-700"}`}
          >
            <FiDownload size={20} />
            Download Filtered Applications
          </button>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow transition-colors ${
                darkMode ? "bg-darkCard hover:bg-darkCard/90" : "bg-white hover:bg-gray-100"
              }`}
            >
              <h2 className={`font-semibold text-lg mb-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                {app.name}
              </h2>
              <p className={`text-sm mb-1 ${darkMode ? "text-darkSecondary" : "text-gray-600"}`}>Email: {app.email}</p>
              <p className={`text-sm mb-1 ${darkMode ? "text-darkSecondary" : "text-gray-600"}`}>
                Applied For: {app.appliedFor}
              </p>
              <p
                className={`text-sm font-medium ${
                  app.status === "Approved"
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                Status: {app.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
