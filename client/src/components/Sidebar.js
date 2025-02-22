import React, { useState, useEffect, useContext } from "react";
import { FaTachometerAlt, FaFolderOpen, FaFileAlt, FaUser, FaQuestionCircle, FaBars } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>

      <button className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* ✅ Sidebar (Hidden by Default) */}
      <div className={`side-menu-container ${isSidebarOpen ? "open" : ""}`}>
        <div className="side-menu">
          <ul className="list-unstyled">
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeSidebar}>
                <FaTachometerAlt className="sidebar-icon" />
                <span className="sidebar-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-resumes" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeSidebar}>
                <FaFolderOpen className="sidebar-icon" />
                <span className="sidebar-text">Saved</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/templates" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeSidebar}>
                <FaFileAlt className="sidebar-icon" />
                <span className="sidebar-text">Templates</span>
              </NavLink>
            </li>
            {userId && (
              <li>
                <NavLink to={`/profile/${userId}`} className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeSidebar}>
                  <FaUser className="sidebar-icon" />
                  <span className="sidebar-text">Profile</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/help" className={({ isActive }) => (isActive ? "active-link" : "")} onClick={closeSidebar}>
                <FaQuestionCircle className="sidebar-icon" />
                <span className="sidebar-text">Help</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
}

export default Sidebar;
