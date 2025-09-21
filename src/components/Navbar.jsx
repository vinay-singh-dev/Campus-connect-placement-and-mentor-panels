import React, { useContext } from "react";
import { FiMenu, FiSearch, FiUser, FiSun, FiMoon, FiBriefcase } from "react-icons/fi";
import { DarkModeContext } from "../context/DarkModeContext";

const Navbar = ({ role, toggleSidebar, onLogout }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav
      className={`flex justify-between items-center px-6 py-3 fixed top-0 left-0 right-0 z-50 shadow transition-colors
        ${darkMode ? "bg-darkCard text-darkSecondary" : "bg-white text-secondary"}`}
    >
      {/* Left: Sidebar toggle + logo + dark mode + role */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <FiMenu size={24} />
        </button>

        <span className={`font-bold text-2xl ${darkMode ? "text-darkPrimary" : "text-blue-600"}`}>
          Campus Connect
        </span>

        {/* Dark/Light Mode Icon */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FiSun size={20} className="text-yellow-400" />
          ) : (
            <FiMoon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Placement Officer / Mentor Role */}
        <div className="flex items-center space-x-1 ml-2">
          <FiBriefcase size={18} className={darkMode ? "text-darkSecondary" : "text-gray-700"} />
          <span className={`font-medium text-sm ${darkMode ? "text-darkSecondary" : "text-gray-700"}`}>
            {role === "admin" ? "Placement Officer" : "Mentor"}
          </span>
        </div>
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex items-center w-1/3">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search for jobs, students..."
            className={`w-full border px-4 py-2 rounded-l-md focus:outline-none focus:ring-2
              ${darkMode
                ? "bg-darkBackground border-darkMuted text-darkSecondary focus:ring-darkPrimary"
                : "border-gray-300 text-secondary focus:ring-blue-500"}`}
          />
          <button
            className={`px-5 rounded-r-md flex items-center justify-center transition
              ${darkMode ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>

      {/* Right: Logout */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onLogout}
          className={`px-4 py-2 rounded transition
              ${darkMode ? "bg-danger text-white hover:bg-danger/90" : "bg-red-600 text-white hover:bg-red-700"}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
