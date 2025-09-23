import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { DarkModeContext } from "../context/DarkModeContext";

const Sidebar = ({ role }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { darkMode } = useContext(DarkModeContext);

  // ✅ Updated Admin Menu
  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Opportunities", path: "/admin/opportunities" },
    { name: "Total Applicants", path: "/admin/applications" }, // renamed
    { name: "Applied Students", path: "/admin/applied-students" }, // new section
    { name: "Reports", path: "/admin/reports" },
  ];

  const mentorMenu = [
    { name: "Dashboard", path: "/mentor/dashboard" },
    { name: "Student List", path: "/mentor/student-list" },
    { name: "Approvals", path: "/mentor/approvals" },
    { name: "Feedback", path: "/mentor/feedback" },
  ];

  const menu = role === "admin" ? adminMenu : mentorMenu;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`m-4 p-2 rounded-md lg:hidden z-50 relative transition-colors
          ${darkMode ? "bg-darkPrimary text-darkSecondary" : "bg-gray-800 text-white"}`}
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64
          ${darkMode ? "bg-darkCard border-darkMuted text-darkSecondary" : "bg-white border-gray-200 text-secondary"}
          transform ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className={`text-2xl font-bold px-6 py-4
          ${darkMode ? "text-darkPrimary" : "text-gray-900"}`}
        >
          {role === "admin" ? "Recruiter" : "Mentor"}
        </h2>

        <nav>
          {menu.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`block px-6 py-3 rounded-md mx-2 my-1 transition-colors
                  ${active
                    ? darkMode
                      ? "bg-darkPrimary text-darkSecondary font-semibold"
                      : "bg-gray-100 text-blue-600 font-semibold"
                    : darkMode
                    ? "text-darkSecondary hover:bg-darkMuted"
                    : "text-gray-800 hover:bg-gray-50"
                  }`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
