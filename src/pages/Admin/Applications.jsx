import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { X } from "lucide-react";

const sampleApplications = [
  { id: 1, name: "John Doe", position: "Frontend Intern", status: "Pending" },
  { id: 2, name: "Jane Smith", position: "Backend Intern", status: "Pending" },
  { id: 3, name: "Alice Johnson", position: "AI Intern", status: "Approved" },
];

const AdminApplications = () => {
  const [applications, setApplications] = useState(sampleApplications);
  const [selectedCard, setSelectedCard] = useState(null); 
  const { darkMode } = useContext(DarkModeContext);

  const handleStatusChange = (id, newStatus) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
  };

  return (
    <Layout role="admin">
      <h2
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-darkPrimary" : "text-secondary"
        }`}
      >
        Applications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.length === 0 ? (
          <p className={`${darkMode ? "text-darkMuted" : "text-gray-500"}`}>
            No applications found.
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedCard(app.id)}
              className={`p-6 rounded-2xl shadow-card transition-transform transform hover:scale-105 duration-300 cursor-pointer 
                ${darkMode ? "bg-darkCard border border-darkMuted" : "bg-white border border-gray-200"}`}
            >
              {/* Header with Status */}
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`px-2 py-1 text-white text-xs rounded-full font-semibold ${
                    app.status === "Approved"
                      ? "bg-green-600"
                      : app.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {/* Basic Info */}
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-darkPrimary" : "text-gray-900"
                }`}
              >
                {app.name}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-darkSecondary" : "text-gray-600"
                }`}
              >
                Applied for: {app.position}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Expanded Card Modal */}
      {selectedCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className={`rounded-2xl shadow-card w-full max-w-2xl p-6 relative ${
              darkMode ? "bg-darkCard" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {(() => {
              const app = applications.find((a) => a.id === selectedCard);
              if (!app) return null;
              return (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-2 py-1 text-white text-xs rounded-full font-semibold ${
                        app.status === "Approved"
                          ? "bg-green-600"
                          : app.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold ${
                      darkMode ? "text-darkPrimary" : "text-gray-900"
                    }`}
                  >
                    {app.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-darkSecondary" : "text-gray-600"
                    }`}
                  >
                    Position: {app.position}
                  </p>

                  {/* Dropdown only inside modal */}
                  <div className="mt-4">
                    <strong>Status:</strong>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className={`ml-2 border p-2 rounded-lg ${
                        darkMode
                          ? "bg-darkMuted text-darkSecondary border-darkMuted"
                          : "bg-gray-100 text-gray-900 border-gray-300"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Interview Scheduled">
                        Interview Scheduled
                      </option>
                      <option value="Completed">Completed</option>
                      <option value="Selected">Selected</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminApplications;
