import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TemplatePage.css"; 

function TemplatePage() {
  const { templateNumber } = useParams(); 

  return (
    <div className="template-page-container d-flex">
      
      {/* Main Content */}
      <div className="template-page-content p-4">
        <h2 className="text-center mb-4">You are using Template {templateNumber}</h2>
        
        <div className="row">

          <div className="col-md-6 d-flex justify-content-center mb-4">
            <img 
              src={`/assets/images/templates/template1.png`}  
              alt="Template 1" 
              className="template-page-img-preview img-fluid rounded shadow-lg"
            />
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center mb-4">
            <button className="btn btn-primary btn-lg w-75 template-page-btn">
              Create Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatePage;
