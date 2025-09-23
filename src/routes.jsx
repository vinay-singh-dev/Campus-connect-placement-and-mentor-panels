import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import Opportunities from "./pages/Admin/Opportunities";
import TotalApplicants from "./pages/Admin/TotalApplicants"; // renamed Applications.jsx → TotalApplicants.jsx
import AppliedStudents from "./pages/Admin/AppliedStudents"; // new page
import Reports from "./pages/Admin/Reports";

// ✅ Mentor Pages
import MentorDashboard from "./pages/Mentor/Dashboard";
import StudentList from "./pages/Mentor/StudentList";
import Approvals from "./pages/Mentor/Approvals";
import Feedback from "./pages/Mentor/Feedback";

function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/opportunities" element={<Opportunities />} />
      <Route path="/admin/applications" element={<TotalApplicants />} /> {/* renamed */}
      <Route path="/admin/applied-students" element={<AppliedStudents />} /> {/* new route */}
      {/* <Route path="/admin/applied-students/:Applcation_id" element={<AppliedStudents />} /> new route */}
      <Route path="/admin/reports" element={<Reports />} />

      {/* Mentor Routes */}
      <Route path="/mentor/dashboard" element={<MentorDashboard />} />
      <Route path="/mentor/student-list" element={<StudentList />} />
      <Route path="/mentor/approvals" element={<Approvals />} />
      <Route path="/mentor/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default AppRoutes;
