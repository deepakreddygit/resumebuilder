import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import Logo from "../components/Logo.png"

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="top-nav navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand on the left */}
        <div className="navbar-brand "><img src={Logo} alt="Logo" style={{ height: "50px", width: "auto" }} /></div>

        {/* Logout button on the right */}
        {isAuthenticated && (
          <button className="btn btn-outline-light logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
