import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/Dashboard";
import Opportunities from "./pages/Admin/Opportunities";
import Applications from "./pages/Admin/Applications";
import Reports from "./pages/Admin/Reports";

import MentorDashboard from "./pages/Mentor/Dashboard";
import StudentList from "./pages/Mentor/StudentList";
import Approvals from "./pages/Mentor/Approvals";
import Feedback from "./pages/Mentor/Feedback";

function AppRoutes() {
  return (
    <Routes>
      {}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/opportunities" element={<Opportunities />} />
      <Route path="/admin/applications" element={<Applications />} />
      <Route path="/admin/reports" element={<Reports />} />

      {}
      <Route path="/mentor/dashboard" element={<MentorDashboard />} />
      <Route path="/mentor/student-list" element={<StudentList />} />
      <Route path="/mentor/approvals" element={<Approvals />} />
      <Route path="/mentor/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default AppRoutes;
