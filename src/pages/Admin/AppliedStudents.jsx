import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { X } from "lucide-react";
import axios from "axios";

const AppliedStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  // ✅ Fetch real data from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/get-students-requests`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setStudents(response.data.requests || []); // adjust if backend key differs
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Format Date (Readable: 23 Sep 2025, 08:52 PM)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Update status via API + update UI
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/update-students-request-status`,
        { requestId: requestId, status: newStatus },
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );

      // update local state
      const updated = students.map((student) =>
        student.request_id === requestId ? { ...student, status: newStatus } : student
      );
      setStudents(updated);

      // update modal state if selected
      if (selectedStudent && selectedStudent.request_id === requestId) {
        setSelectedStudent({ ...selectedStudent, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Layout role="admin">
      <h2
        className={`text-3xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Applied Students
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.request_id}
              onClick={() => setSelectedStudent(student)}
              className={`p-6 rounded-2xl relative border shadow-lg cursor-pointer transition-transform transform hover:scale-105 duration-300 
                ${darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-gray-200"}`}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none 
                  ${darkMode
                    ? "bg-gradient-to-tr from-[#3B82F6]/10 via-transparent to-[#22D3EE]/10"
                    : "bg-gradient-to-tr from-[#2563EB]/10 via-transparent to-[#9333EA]/10"}`}
              ></div>

              <div className="relative z-10">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 mb-2 inline-block text-xs rounded-full font-semibold
                    ${
                      student.status === "Approved"
                        ? "bg-[#4ADE80] text-white"
                        : student.status === "Rejected"
                        ? "bg-[#F87171] text-white"
                        : "bg-[#FACC15] text-black"
                    }`}
                >
                  {student.status}
                </span>

                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {student.student_name}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {student.student_email}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Student ID: {student.student_id}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Applied at: {formatDate(student.applied_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No applied students yet.</p>
        )}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className={`rounded-2xl shadow-xl w-full max-w-2xl p-6 relative 
              ${darkMode ? "bg-[#1E293B] border border-[#334155]" : "bg-white border border-gray-200"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={22} />
            </button>

            <h3
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Student Details
            </h3>

            <div className="space-y-3">
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Name:</strong> {selectedStudent.student_name}
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Email:</strong> {selectedStudent.student_email}
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Student ID:</strong> {selectedStudent.student_id}
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Applied At:</strong> {formatDate(selectedStudent.applied_at)}
              </p>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${
                      selectedStudent.status === "Approved"
                        ? "bg-[#4ADE80] text-white"
                        : selectedStudent.status === "Rejected"
                        ? "bg-[#F87171] text-white"
                        : "bg-[#FACC15] text-black"
                    }`}
                >
                  {selectedStudent.status}
                </span>
              </p>
            </div>

            {/* Dropdown inside modal only */}
            <div className="mt-5">
              <label
                className={`block mb-2 font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Approve / Reject
              </label>
              <select
                value={selectedStudent.status}
                onChange={(e) =>
                  handleStatusChange(selectedStudent.request_id, e.target.value)
                }
                className={`px-3 py-2 rounded-lg border w-full font-medium
                  ${
                    darkMode
                      ? "bg-[#0F172A] border-[#334155] text-gray-200 focus:ring-2 focus:ring-[#3B82F6]"
                      : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
                  }`}
              >
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AppliedStudents;
