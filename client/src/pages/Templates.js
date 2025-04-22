import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { submitReview, getAllReviews } from "../api";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Templates.css";

function Templates() {
  const { userId } = useContext(AuthContext);

  const roles = [
    { id: "software-engineer", name: "Software Engineer", icon: "💻" },
    { id: "financial-manager", name: "Financial Manager", icon: "📊" },
    { id: "marketing-manager", name: "Marketing Manager", icon: "📢" },
    { id: "sales-manager", name: "Sales Manager", icon: "📈" },
    { id: "healthcare-professional", name: "Healthcare Professional", icon: "🩺" },
    { id: "content-writer", name: "Content Writer", icon: "✍️" },
  ];

  const templatesByRole = {
    "software-engineer": [
      { id: 1, name: "Modern", image: "/assets/images/templates/template1.png" },
      { id: 2, name: "Professional", image: "/assets/images/templates/template2.png" },
      { id: 3, name: "Creative", image: "/assets/images/templates/template3.png" },
    ],
    "financial-manager": [
      { id: 4, name: "Elegant", image: "/assets/images/templates/template4.png" },
      { id: 5, name: "Minimal", image: "/assets/images/templates/template5.png" },
      { id: 6, name: "Compact", image: "/assets/images/templates/template6.png" },
    ],
    "marketing-manager": [
      { id: 7, name: "Stylish", image: "/assets/images/templates/template7.png" },
      { id: 8, name: "Classic", image: "/assets/images/templates/template8.png" },
      { id: 9, name: "Trendy", image: "/assets/images/templates/template9.png" },
    ],
    "sales-manager": [
      { id: 10, name: "Dynamic", image: "/assets/images/templates/template10.png" },
      { id: 11, name: "Persuasive", image: "/assets/images/templates/template11.png" },
      { id: 12, name: "Strategic", image: "/assets/images/templates/template12.png" },
    ],
    "healthcare-professional": [
      { id: 13, name: "Clinical", image: "/assets/images/templates/template13.png" },
      { id: 14, name: "Clean & Clear", image: "/assets/images/templates/template14.png" },
      { id: 15, name: "Trustworthy", image: "/assets/images/templates/template15.png" },
    ],
  "content-writer": [
    { id: 16, name: "Editorial", image: "/assets/images/templates/template16.png" },
    { id: 17, name: "Narrative", image: "/assets/images/templates/template17.png" },
    { id: 18, name: "Minimalistic", image: "/assets/images/templates/template18.png" },
  ],
  };

  const [selectedRole, setSelectedRole] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null);

  useEffect(() => {
    getAllReviews()
      .then((res) => setReviews(res))
      .catch(() => setReviews([]));
  }, []);

  const handleOpenReviewModal = (template) => {
    setSelectedTemplate(template);
    setShowReviewModal(true);
    setMenuVisible(null);
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || !selectedTemplate) {
      toast.error("Please enter a review.");
      return;
    }

    try {
      await submitReview(userId, selectedTemplate.id, reviewText);
      toast.success("Review submitted successfully!");
      setReviewText("");
      setReviews([...reviews, { templateNumber: selectedTemplate.id, reviewText }]);
      setShowReviewModal(false);
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="container templates-container">
      <h3 className="text-center mb-4 fw-bold">Select the Role You Are Applying For</h3>

      {/* Role Selection */}
      <div className="row justify-content-center">
        {roles.map((role) => (
          <div className="col-md-4 col-sm-6 mb-3" key={role.id}>
            <div
              className={`card role-card text-center p-3 ${selectedRole === role.id ? "active-role" : ""}`}
              onClick={() => setSelectedRole(role.id)}
              style={{
                cursor: "pointer",
                transition: "0.3s",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: selectedRole === role.id ? "2px solid #007bff" : "none",
              }}
            >
              <span className="role-icon display-6">{role.icon}</span>
              <h6 className="fw-bold mt-2">{role.name}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Templates Display */}
      {selectedRole && (
        <>
          <h4 className="text-center mt-5 fw-bold">
            {roles.find((r) => r.id === selectedRole)?.name} Templates
          </h4>
          <div className="row justify-content-center">
            {templatesByRole[selectedRole].map((template) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={template.id}>
                <div className="card shadow-lg template-card h-100">
                  <div className="template-image-container">
                    <img src={template.image} alt={template.name} className="card-img-top img-fluid rounded" />
                  </div>

                  <div className="card-body d-flex justify-content-between align-items-center">
                    <Link to={`/resume-builder/${selectedRole}/${template.id}`} className="btn btn-dark flex-grow-1">
                      Use this template
                    </Link>
                    <div className="position-relative d-flex align-items-center">
                      <span
                        style={{ cursor: "pointer", fontSize: "18px", padding: "5px" }}
                        onClick={() => setMenuVisible(menuVisible === template.id ? null : template.id)}
                      >
                        ⋮
                      </span>

                      {menuVisible === template.id && (
                        <div
                          className="position-absolute shadow-sm rounded p-1"
                          style={{
                            right: "-10px",
                            bottom: "50px",
                            zIndex: 1000,
                            minWidth: "130px",
                            backgroundColor: "#343a40",
                            color: "#fff",
                            borderRadius: "8px",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <button
                            className="btn btn-sm w-100"
                            style={{
                              background: "transparent",
                              color: "#fff",
                              fontWeight: "500",
                              fontSize: "14px",
                              padding: "6px 10px",
                              border: "none",
                            }}
                            onClick={() => handleOpenReviewModal(template)}
                          >
                            Write a Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review for Template {selectedTemplate?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Templates;

