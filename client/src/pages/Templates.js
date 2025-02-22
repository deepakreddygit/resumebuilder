import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Templates.css"; 

function Templates() {
  const templateData = [
    { id: 1, name: "Modern", image: "/assets/images/templates/template1.png" },
    { id: 2, name: "Professional", image: "/assets/images/templates/template2.png" },
    { id: 3, name: "Creative", image: "/assets/images/templates/template3.png" },
    { id: 4, name: "Elegant", image: "/assets/images/templates/template4.png" },
    { id: 5, name: "Minimal", image: "/assets/images/templates/template5.png" },
    { id: 6, name: "Compact", image: "/assets/images/templates/template6.png" },
    { id: 7, name: "Stylish", image: "/assets/images/templates/template7.png" },
    { id: 8, name: "Classic", image: "/assets/images/templates/template8.png" },
  ];

  return (
    <div className="templates-container">
      <h3 className="text-center mb-4">Choose Your Resume Template</h3>
      <div className="templates-grid">
        {templateData.map((template) => (
          <div className="template-item" key={template.id}>
            <div className="template-card shadow-lg">
              {/* <img 
                src={template.image} 
                alt={`Template ${template.id}`} 
                className="template-img img-fluid rounded-top" 
              /> */}
              <div className="template-info p-3">
                <h5 className="card-title">{template.name} Template</h5>
                <p className="card-text">ATS-friendly format</p>
                <Link to={`/resume-builder/${template.id}`} className="btn btn-secondary w-100">
                  Use this template
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





