import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { DarkModeContext } from "../context/DarkModeContext";

const Layout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-darkBackground text-darkSecondary" : "bg-background text-secondary"}`}>
      {}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64">
        <Sidebar role={role} />
      </div>

      {}
      <div className="flex-1 lg:ml-64">
        {}
        <Navbar
          role={role}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        >
          {}
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 dark:bg-darkPrimary dark:text-darkSecondary"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </Navbar>

        <main className="p-6 pt-20">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
