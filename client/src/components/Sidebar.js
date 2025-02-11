import React, { useState, useEffect, useContext } from "react";
import { FaTachometerAlt, FaFolderOpen, FaFileAlt, FaUser, FaQuestionCircle, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import AuthContext
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  const { userId } = useContext(AuthContext);  // Get userId from AuthContext

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`side-menu-container`}>
      <div className={`side-menu ${isMinimized ? "minimized" : ""}`}>
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
              {!isMinimized && <span className="sidebar-text">Saved Resumes</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/templates" className={({ isActive }) => (isActive ? "active-link" : "")}>
              <FaFileAlt className="sidebar-icon" />
              {!isMinimized && <span className="sidebar-text">Templates</span>}
            </NavLink>
          </li>
          <li>
            {/* Use dynamic userId in Profile link */}
            <NavLink to={`/profile/${userId}`} className={({ isActive }) => (isActive ? "active-link" : "")}>
              <FaUser className="sidebar-icon" />
              {!isMinimized && <span className="sidebar-text">Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className={({ isActive }) => (isActive ? "active-link" : "")}>
              <FaQuestionCircle className="sidebar-icon" />
              {!isMinimized && <span className="sidebar-text">Help</span>}
            </NavLink>
          </li>
        </ul>

        {/* Toggle Button at the Bottom */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isMinimized ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
