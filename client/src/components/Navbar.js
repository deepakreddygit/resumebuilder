import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);  // Use logout from AuthContext
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false); // Hide modal immediately
    logout(); // Use logout from context to update the authentication state
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <>
      <nav className="top-nav navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
        <div className="container-fluid">
          <div className="navbar-brand">Resume Builder</div>

          {isAuthenticated && (
            <button className="btn btn-outline-light logout-btn" onClick={() => setShowModal(true)}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;
