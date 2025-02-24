import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Templates.css";

function Templates() {
  // Role options with images/icons
  const roles = [
    { id: "software-engineer", name: "Software Engineer", icon: "💻" },
    { id: "financial-manager", name: "Financial Manager", icon: "📊" },
    { id: "marketing-manager", name: "Marketing Manager", icon: "📢" },
  ];

  // Templates categorized by roles
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
  };

  // State to track selected role
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="container templates-container">
      <h3 className="text-center mb-4 fw-bold">Select the Role You Are Applying For</h3>

      {/* 🔹 Role Selection Grid */}
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

      {/* 🔹 Show templates based on selected role */}
      {selectedRole && (
        <>
          <h4 className="text-center mt-5 fw-bold">
            {roles.find((r) => r.id === selectedRole)?.name} Templates
          </h4>
          <div className="row justify-content-center">
            {templatesByRole[selectedRole].map((template) => (
              <div className="col-md-4 col-sm-6 mb-4" key={template.id}>
                <div className="card shadow-lg template-card">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="card-img-top img-fluid rounded"
                    style={{ height: "500px", width:"400px", objectFit: "cover"}}
                  />
                  <div className="card-body text-center">
                    {/* <h5 className="card-title fw-bold">{template.name} Template</h5> */}
                    {/* <p className="card-text text-muted">ATS-friendly & customizable</p> */}
                    <Link
                      to={`/resume-builder/${selectedRole}/${template.id}`}
                      className="useTemplate btn btn-primary w-100"
                    >
                      {/* Use {template.name} Template */}
                      Use this template
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Templates;




