import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
function Dashboard() {
  const { userName } = useContext(AuthContext);


  const templateResumes = [
    { id: 1, name: "Basic Resume", image: "basic-resume.jpg" },
    { id: 2, name: "Professional Resume", image: "professional-resume.jpg" },
    { id: 3, name: "Creative Resume", image: "creative-resume.jpg" },
  ];

  const handleUseMeClick = (resumeId) => {
    alert(`You selected the template with ID: ${resumeId}`);
    
  };

  return (
    <div className="dashboard-container">
      <div className="text-center">
        <h1 className="fw-bold mb-4">Welcome, {userName}!</h1>

        {}
        <div className="row justify-content-center">
          {templateResumes.map((resume) => (
            <div key={resume.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={resume.image}
                  alt={resume.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{resume.name}</h5>
                  {}
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleUseMeClick(resume.id)}
                  >
                    Use Me
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;