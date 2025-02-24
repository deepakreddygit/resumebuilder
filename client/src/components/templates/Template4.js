import React, { useState, useEffect } from "react";
import "../../styles/Template4.css";

function Template4({ resumeData = {} }) {  
  // Load color only for Template 4
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem("resumeColorTemplate4") || "#2c3e50");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem("resumeColorTemplate4");
    if (savedColor) {
      setSelectedColor(savedColor);
    }
  }, []);

  // Save color only for Template 4
  const handleSaveColor = () => {
    localStorage.setItem("resumeColorTemplate4", selectedColor);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="template4 resume-template">
      
    {/* ✅ Color Picker (Circle + Save Button Only) */}
<div className="color-picker-container">
  <div 
    className="color-circle" 
    style={{ backgroundColor: selectedColor }} 
    onClick={() => document.getElementById("colorInputTemplate4").click()} // Click on hidden input
  ></div>

  {/* Hidden Color Picker */}
  <input 
    type="color" 
    id="colorInputTemplate4"
    className="color-input-hidden"
    value={selectedColor} 
    onChange={(e) => setSelectedColor(e.target.value)}
  />

  <button className="save-color-btn" onClick={handleSaveColor}>Save</button>
  
  {/* ✅ Message Appears After Saving */}
  {showMessage && <span className="color-updated-message">✔ Color Updated!</span>}
</div>


      {/* ✅ Header */}
      <div className="resume-header">
        <h1 style={{ color: selectedColor }}>{resumeData.name || "Your Name"}</h1>
        <p className="tagline">{resumeData.role || "Your Role"}</p>
        <p>{resumeData.email || "your@email.com"} | {resumeData.phone || "Your Phone Number"}</p>
        <p className="summary">{resumeData.summary}</p>
      </div>

      <div className="resume-body">
        {/* ✅ Sidebar */}
        <div className="resume-sidebar">
          <div className="sidebar-section">
            <h3  style={{ color: selectedColor }}>CONTACT</h3>
            <p>{resumeData.email}</p>
            <p>{resumeData.phone}</p>
          </div>

          <div className="sidebar-section">
            <h3 style={{ color: selectedColor }}>EDUCATION</h3>
            {(resumeData.education || []).map((edu, index) => (
              <p key={index}><strong>{edu.degree}</strong> <br/> {edu.institution} ({edu.year})</p>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 style={{ color: selectedColor }}>SKILLS</h3>
            <ul>
              {(resumeData.skills || []).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ Main Content */}
        <div className="resume-main">
          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>WORK EXPERIENCE</h2>
            {(resumeData.experience || []).map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.jobTitle} - <span>{exp.company} ({exp.years})</span></h3>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </div>

          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>INVESTMENTS</h2>
            {(resumeData.investments || []).map((inv, index) => (
              <p key={index}><strong>{inv.type}</strong> - 💰 {inv.amount} | 📅 {inv.years}</p>
            ))}
          </div>

          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>FINANCIAL TOOLS</h2>
            {(resumeData.financialTools || []).map((tool, index) => (
              <p key={index}>{tool.name}</p>
            ))}
          </div>

          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>BUDGET & RISK MANAGEMENT</h2>
            <p>{resumeData.budgetExperience}</p>
          </div>

          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>LEADERSHIP & STRATEGY</h2>
            <p>{resumeData.leadershipExperience}</p>
          </div>

          <div className="resume-section">
            <h2 style={{ color: selectedColor }}>LANGUAGES</h2>
            {(resumeData.languages || []).map((lang, index) => (
              <p key={index}>{lang.language} - {lang.proficiency}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template4;


