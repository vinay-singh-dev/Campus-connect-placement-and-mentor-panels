import React, { useState, useEffect, useContext } from "react"; 
import axios from "axios";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { X } from "lucide-react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedAppDetails, setSelectedAppDetails] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const statusOptions = ["Applied", "Under Review", "Interview", "Selected", "Rejected"];

  const getApplications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-applications`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      if (response.data.success) {
        const mappedApps = response.data.applications.map((app) => ({
          id: app.application_id,
          name: app.applicant_name,
          position: app.job_title,
          status: app.status,
          company: app.company_name,
          appliedAt: app.applied_at,
        }));
        setApplications(mappedApps);
      }
    } catch (error) {
      console.log("Error fetching applications:", error);
    }
  };

  const getApplicationDetails = async (applicationId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-applications/${applicationId}`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      if (response.data) setSelectedAppDetails(response.data);
    } catch (error) {
      console.log("Error fetching application details:", error);
    }
  };

  const handleCardClick = (appId) => {
    getApplicationDetails(appId);
  };

  useEffect(() => { getApplications(); }, []);

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/update-application-status`,
        { application_id: applicationId, status: newStatus },
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      if (selectedAppDetails && selectedAppDetails.application_id === applicationId) {
        setSelectedAppDetails({ ...selectedAppDetails, status: newStatus });
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const getGradientByStatus = (status) => {
    switch(status) {
      case "Selected":
        return darkMode 
          ? "from-[#22c55e]/20 via-transparent to-[#16a34a]/20"
          : "from-[#a7f3d0]/20 via-transparent to-[#22c55e]/20";
      case "Rejected":
        return darkMode 
          ? "from-[#ef4444]/20 via-transparent to-[#b91c1c]/20"
          : "from-[#fecaca]/20 via-transparent to-[#ef4444]/20";
      default:
        return darkMode 
          ? "from-[#facc15]/20 via-transparent to-[#ca8a04]/20"
          : "from-[#fde68a]/20 via-transparent to-[#fbbf24]/20";
    }
  };

  return (
    <Layout role="admin">
      <h2 className={`text-3xl font-space font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? "from-[#0ea5e9] to-[#f59e0b]" : "from-[#164e63] to-[#d97706]"}`}>
        Applications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentApplications.length === 0 ? (
          <p className="text-gray-400">No applications found.</p>
        ) : (
          currentApplications.map((app) => (
            <div
              key={app.id}
              onClick={() => handleCardClick(app.id)}
              className={`relative p-8 rounded-xl cursor-pointer overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-300 ${darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-[#ecfeff] border border-[#e2e8f0]"}`}
              style={{ minHeight: "220px" }}
            >
              <div className={`absolute inset-0 pointer-events-none rounded-xl opacity-70 bg-gradient-to-tr ${getGradientByStatus(app.status)}`}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    app.status === "Selected" ? "bg-[#4ADE80] text-white" :
                    app.status === "Rejected" ? "bg-[#F87171] text-white" : "bg-[#FACC15] text-black"
                  }`}>
                    {app.status}
                  </span>
                </div>

                <h3 className={`text-xl font-bold font-space ${darkMode ? "text-white" : "text-gray-900"}`}>{app.name}</h3>
                <p className={`text-base mt-1 font-inter ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Applied for: {app.position} at {app.company}
                </p>
                <p className={`text-sm mt-1 font-inter ${darkMode ? "text-gray-500" : "text-gray-700"}`}>
                  {new Date(app.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fullscreen Scrollable Modal */}
      {selectedAppDetails && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/60 p-4">
          <div
            className={`relative rounded-xl shadow-xl w-full max-w-5xl p-6 mt-12 mb-12 ${darkMode ? "bg-[#1e293b] border border-[#334155]" : "bg-white border border-[#e2e8f0]"}`}
          >
            {/* Sticky Close Button */}
            <button 
              onClick={() => setSelectedAppDetails(null)} 
              className="absolute top-2 right-2 z-50 text-gray-400 hover:text-red-400 bg-white/20 dark:bg-black/20 p-1 rounded-full"
            >
              <X size={22} />
            </button>

            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 pt-6">
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-bold font-space ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {selectedAppDetails.student_name}
                </h3>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  selectedAppDetails.status === "Selected" ? "bg-[#4ADE80] text-white" :
                  selectedAppDetails.status === "Rejected" ? "bg-[#F87171] text-white" : "bg-[#FACC15] text-black"
                }`}>
                  {selectedAppDetails.status}
                </span>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? "bg-[#0f172a]" : "bg-gray-100"} space-y-2`}>
                <p><strong>Position:</strong> {selectedAppDetails.job_title}</p>
                <p><strong>Company:</strong> {selectedAppDetails.company_name}</p>
                <p><strong>Applied At:</strong> {new Date(selectedAppDetails.applied_at).toLocaleString()}</p>
                <p><strong>Email:</strong> {selectedAppDetails.student_email}</p>
                <p><strong>Phone:</strong> {selectedAppDetails.student_phone}</p>
                <p><strong>Resume:</strong> <a href={selectedAppDetails.resume_url} target="_blank" className="underline text-blue-500">View</a></p>
                <p><strong>Cover Letter:</strong> {selectedAppDetails.cover_letter_url ? <a href={selectedAppDetails.cover_letter_url} target="_blank" className="underline text-blue-500">View</a> : "N/A"}</p>
                <p><strong>Job Role:</strong> {selectedAppDetails.job_role}</p>
                <p><strong>Description:</strong> {selectedAppDetails.job_description}</p>
                <p><strong>Requirements:</strong> {selectedAppDetails.requirements}</p>
                <p><strong>Location:</strong> {selectedAppDetails.location}</p>
                <p><strong>Salary:</strong> {selectedAppDetails.salary}</p>
                <p><strong>Stipend:</strong> {selectedAppDetails.stipend || "N/A"}</p>
                <p><strong>Duration:</strong> {selectedAppDetails.duration}</p>
                <p><strong>Deadline:</strong> {new Date(selectedAppDetails.deadline).toLocaleDateString()}</p>
                <p><strong>Recruiter:</strong> {selectedAppDetails.recruiter_name} ({selectedAppDetails.recruiter_position}) at {selectedAppDetails.recruiter_organization}</p>
                <p><strong>Recruiter Email:</strong> {selectedAppDetails.recruiter_email}</p>
              </div>

              <div className="mt-4">
                <strong className={darkMode ? "text-white" : "text-gray-900"}>Update Status:</strong>
                <select
                  value={selectedAppDetails.status}
                  onChange={(e) => handleStatusChange(selectedAppDetails.application_id, e.target.value)}
                  className={`ml-2 px-3 py-2 rounded-lg focus:ring-2 font-inter ${
                    darkMode ? "bg-[#0f172a] text-gray-200 border border-[#334155] focus:ring-[#0ea5e9]" : "bg-gray-100 text-gray-800 border border-[#e2e8f0] focus:ring-[#164e63]"
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminApplications;
