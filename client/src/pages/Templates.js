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
    <div className="templates-container">
      <h3 className="text-center mb-4">Select the Role You Are Applying For</h3>


      {/* 🔹 Role Selection Grid */}
      <div className="roles-grid">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? "active-role" : ""}`}
            onClick={() => setSelectedRole(role.id)}
          >
            <span className="role-icon">{role.icon}</span>
            <h6>{role.name}</h6>
          </div>
        ))}
      </div>

      {/* 🔹 Show templates based on selected role */}
      {selectedRole && (
        <>
          <h4 className="text-center mt-4">{roles.find((r) => r.id === selectedRole)?.name} Templates</h4>
          <div className="templates-grid">
            {templatesByRole[selectedRole].map((template) => (
              <div className="template-item" key={template.id}>
                <div className="template-card shadow-lg">
                  {/* Uncomment the following line to display images */}
                  {/* <img src={template.image} alt={template.name} className="template-img img-fluid rounded-top" /> */}
                  <div className="template-info p-3">
                    <h5 className="card-title">{template.name} Template</h5>
                    <p className="card-text">ATS-friendly format</p>
                    <Link to={`/resume-builder/${selectedRole}/${template.id}`} className="btn btn-secondary w-100">
                      Use {template.name} Template
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
