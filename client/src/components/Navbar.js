import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false); 
    logout(); 
    navigate("/login", { replace: true }); 
  };

  return (
    <>
      <nav className="top-nav navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
        <div className="container-fluid">
          {/* Logo */}
          <div className="navbar-brand">
            <img 
              src="/assets/images/logos/Logo.png" 
              alt="Resume Builder Logo" 
              className="navbar-logo"
            />
          </div>

          {isAuthenticated && (
           <button
           className="btn btn-outline-light logout-btn"
           onClick={() => setShowModal(true)}
           style={{
             padding: "10px 20px",
             fontSize: "16px",
             fontWeight: "600",
             borderRadius: "8px",
             border: "2px solid white",
             color: "white",
             backgroundColor: "transparent",
             transition: "all 0.3s ease-in-out",
             display: "flex",
             alignItems: "center",
             cursor: "pointer",
           }}
           onMouseOver={(e) => {
             e.target.style.backgroundColor = "white";
             e.target.style.color = "#333";
           }}
           onMouseOut={(e) => {
             e.target.style.backgroundColor = "transparent";
             e.target.style.color = "white";
           }}
         >
           <i className="fas fa-sign-out-alt"></i> Logout
         </button>
         
          )}
        </div>
      </nav>

   {/* Logout Confirmation Modal */}
<Modal 
  show={showModal} 
  onHide={() => setShowModal(false)} 
  centered 
  style={{ 
    backdropFilter: "blur(5px)", 
    transition: "opacity 0.3s ease-in-out" 
  }}
>
  <Modal.Header 
    closeButton 
    style={{ 
      backgroundColor: "#f8f9fa", 
      borderBottom: "2px solid #dee2e6", 
      padding: "15px" 
    }}
  >
    <Modal.Title 
      style={{ 
        fontWeight: "600", 
        fontSize: "18px", 
        color: "#333" 
      }}
    >
      Confirm Logout
    </Modal.Title>
  </Modal.Header>

  <Modal.Body 
    style={{ 
      fontSize: "16px", 
      color: "#555", 
      padding: "20px", 
      textAlign: "center" 
    }}
  >
    Are you sure you want to log out?
  </Modal.Body>

  <Modal.Footer 
    style={{ 
      borderTop: "2px solid #dee2e6", 
      padding: "15px", 
      display: "flex", 
      justifyContent: "center" 
    }}
  >
    <Button 
      variant="secondary" 
      onClick={() => setShowModal(false)} 
      style={{ 
        backgroundColor: "#6c757d", 
        color: "white", 
        fontWeight: "600", 
        padding: "8px 16px", 
        borderRadius: "5px", 
        border: "none", 
        transition: "all 0.3s ease", 
        cursor: "pointer"
      }}
    >
      Cancel
    </Button>

    <Button 
      className="btn-danger" 
      onClick={handleLogout} 
      style={{ 
        backgroundColor: "#dc3545", 
        color: "white", 
        fontWeight: "600", 
        padding: "8px 16px", 
        borderRadius: "5px", 
        border: "none", 
        transition: "all 0.3s ease", 
        cursor: "pointer", 
        marginLeft: "10px"
      }}
    >
      Logout
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}

export default Navbar;
