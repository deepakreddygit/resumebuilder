import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Templates.css"; 

function Templates() {
  return (
    <div className="templates-container">
      <h3 className="text-center mb-4">Choose Your Resume Template</h3>
      <div className="templates-grid">
        {[...Array(8)].map((_, index) => (
          <div className="template-item" key={index}>
            <div className="template-card shadow-lg">
              <img 
                src={`/assets/images/templates/template1.png`} 
                alt={`Template ${index + 1}`} 
                className="template-img img-fluid rounded-top" 
              />
              <div className="template-info p-3">
                <h5 className="card-title">Template {index + 1}</h5>
                <p className="card-text">ATS-friendly format</p>
                <Link to={`/template/${index + 1}`} className="btn btn-secondary w-100">
                  View this template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
