import React, { useContext } from "react";
import { FiMenu, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { DarkModeContext } from "../context/DarkModeContext";

const Navbar = ({ role, toggleSidebar, onLogout }) => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav
      className={`flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow transition-colors
        ${darkMode ? "bg-darkCard text-darkSecondary" : "bg-white text-secondary"}`}
    >
      {}
      <div className="flex items-center space-x-3">
        {}
        <button onClick={toggleSidebar} className="lg:hidden">
          <FiMenu size={24} />
        </button>

        {}
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            {}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 sm:w-7 sm:h-7 ${darkMode ? "text-white" : "text-blue-600"}`}
            >
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>

            {}
            <span className={`font-bold text-xl sm:text-2xl ${darkMode ? "text-white" : "text-blue-600"}`}>
              Campus Connect
            </span>
          </div>

          {}
          <span className={`text-sm sm:text-base ${darkMode ? "text-darkSecondary" : "text-gray-700"} ml-8`}>
            {role === "admin" ? "Placement Officer Panel" : "Mentor Panel"}
          </span>
        </div>

        {}
        <button
          onClick={toggleDarkMode}
          className="ml-3 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FiSun size={18} className="text-yellow-400" />
          ) : (
            <FiMoon size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {}
      <div className="hidden md:flex items-center w-1/3">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search for jobs, students..."
            className={`w-full border px-3 py-1.5 rounded-l-md focus:outline-none focus:ring-2
              ${darkMode
                ? "bg-darkBackground border-darkMuted text-darkSecondary focus:ring-darkPrimary"
                : "border-gray-300 text-secondary focus:ring-blue-500"}`}
          />
          <button
            className={`px-4 rounded-r-md flex items-center justify-center transition
              ${darkMode ? "bg-darkPrimary text-darkSecondary hover:bg-darkPrimary/90" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            <FiSearch size={18} />
          </button>
        </div>
      </div>

      {}
      <div className="flex items-center">
        <button
          onClick={onLogout}
          className={`px-4 py-1.5 rounded-full transition
              ${darkMode ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-400 text-white hover:bg-red-500"}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
