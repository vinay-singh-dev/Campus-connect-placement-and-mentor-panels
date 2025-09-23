import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { X } from "lucide-react";

const sampleStudents = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    studentId: "CSE2025001",
    appliedAt: "2025-09-20 10:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    name: "Riya Verma",
    email: "riya.verma@example.com",
    studentId: "ECE2025012",
    appliedAt: "2025-09-20 11:15 AM",
    status: "Pending",
  },
  {
    id: 3,
    name: "Karan Singh",
    email: "karan.singh@example.com",
    studentId: "ME2025045",
    appliedAt: "2025-09-20 01:05 PM",
    status: "Pending",
  },
];

const AppliedStudents = () => {
  const [students, setStudents] = useState(sampleStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const handleStatusChange = (id, newStatus) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, status: newStatus } : student
    );
    setStudents(updated);
    const changedStudent = updated.find((s) => s.id === id);
    setSelectedStudent(changedStudent);
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
        {students.map((student) => (
          <div
            key={student.id}
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
                {student.name}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {student.email}
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Student ID: {student.studentId}
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Applied at: {student.appliedAt}
              </p>
            </div>
          </div>
        ))}
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
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Student ID:</strong> {selectedStudent.studentId}
              </p>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Applied At:</strong> {selectedStudent.appliedAt}
              </p>
              <p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
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
                  handleStatusChange(selectedStudent.id, e.target.value)
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
