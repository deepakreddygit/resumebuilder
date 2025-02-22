import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TemplatePage.css"; 

function TemplatePage() {
  const { templateNumber } = useParams();
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate(`/resume-builder/${templateNumber}`); 
  };

  return (
    <div className="template-page-container d-flex">
      <div className="template-page-content p-4">
        <h2 className="text-center mb-4">You are using Template {templateNumber}</h2>
        <button className="btn btn-primary btn-lg w-75 template-page-btn" onClick={handleCreateResume}>
          Create Your Resume
        </button>
      </div>
    </div>
  );
}

export default TemplatePage;
