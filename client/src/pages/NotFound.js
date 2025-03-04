import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/NotFound.css";

function NotFound() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="not-found-container text-center">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-text">Oops! The page you are looking for does not exist.</p>

      <button className="btn btn-primary" onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}>
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
