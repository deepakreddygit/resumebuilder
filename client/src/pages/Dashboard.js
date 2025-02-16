import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Dashboard.css"; 

function Dashboard() {
  const { isAuthenticated, userName } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!isAuthenticated) {
    window.location.href = "/login"; 
  }

  return (
    <div className="dashboard-container d-flex flex-column justify-content-center align-items-center vh-100">


      <h1 className="welcome-text">Welcome, {userName}!</h1>
      <p className="sub-text">Create an ATS-friendly resume in just minutes.</p>

      <div className="button-group">
        <button className="btn btn-primary action-btn" onClick={() => navigate("/templates")}>
          Create new resume
        </button>
      </div>

    </div>
  );
}

export default Dashboard;



