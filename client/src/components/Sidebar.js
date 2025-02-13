import React, { useState, useEffect, useContext } from "react";
import { FaTachometerAlt, FaFolderOpen, FaFileAlt, FaUser, FaQuestionCircle, FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* 🔥 Mobile Hamburger Menu Button (Positioned Inside Navbar) */}
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      {/* ✅ Sidebar (Desktop & Mobile) */}
      <div className={`side-menu-container ${isMinimized ? "minimized" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="side-menu">
          <ul className="list-unstyled">
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <FaTachometerAlt className="sidebar-icon" />
                {!isMinimized && <span className="sidebar-text">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-resumes" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <FaFolderOpen className="sidebar-icon" />
                {!isMinimized && <span className="sidebar-text">Saved</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/templates" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <FaFileAlt className="sidebar-icon" />
                {!isMinimized && <span className="sidebar-text">Templates</span>}
              </NavLink>
            </li>
            <li>
              {userId && (
                <NavLink to={`/profile/${userId}`} className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <FaUser className="sidebar-icon" />
                  {!isMinimized && <span className="sidebar-text">Profile</span>}
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to="/help" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <FaQuestionCircle className="sidebar-icon" />
                {!isMinimized && <span className="sidebar-text">Help</span>}
              </NavLink>
            </li>
          </ul>

          {/* ✅ Sidebar Toggle Button */}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isMinimized ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>
      </div>

      {/* 🔥 Overlay when Mobile Menu is open */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
}

export default Sidebar;
