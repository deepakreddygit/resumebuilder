import React, { useState, useEffect } from "react";
import "../../styles/Template4.css";

function Template4({ resumeData = {} }) {  
  // ✅ Generate a Unique Number if None Exists
  const templateNumber = resumeData.templateNumber || "4";  
  const uniqueKey = `resumeColor-${templateNumber}-Session-${sessionStorage.getItem("sessionKey") || Date.now()}`;

  console.log("🔹 Using Storage Key:", uniqueKey);
  console.log("📌 Template Number:", templateNumber);

  const [selectedColor, setSelectedColor] = useState("#2c3e50");
  const [showMessage, setShowMessage] = useState(false);

  // ✅ Ensure session key is stored in sessionStorage
  useEffect(() => {
    if (!sessionStorage.getItem("sessionKey")) {
      sessionStorage.setItem("sessionKey", Date.now().toString());
    }
  }, []);

  // ✅ Load Color from localStorage when component mounts
  useEffect(() => {
    console.log("🔄 Attempting to load color from storage...");
    const savedColor = localStorage.getItem(uniqueKey);

    if (savedColor) {
      console.log("🎨 Loaded color from storage:", savedColor);
      setSelectedColor(savedColor);
    } else {
      console.warn("⚠ No color found in storage. Defaulting to:", selectedColor);
    }
  }, [uniqueKey]); // ✅ Runs when uniqueKey changes

  // ✅ Save Color to localStorage
  const handleSaveColor = () => {
    console.log("💾 Saving color:", selectedColor, "for Key:", uniqueKey);
    localStorage.setItem(uniqueKey, selectedColor);

    // Verify that it was stored correctly
    const verifyColor = localStorage.getItem(uniqueKey);
    console.log("✅ Verified color in storage:", verifyColor);

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
        onClick={() => document.getElementById(`colorInput-${templateNumber}`).click()}
      ></div>

      {/* Hidden Color Picker */}
      <input 
        type="color" 
        id={`colorInput-${templateNumber}`}
        className="color-input-hidden"
        value={selectedColor} 
        onChange={(e) => {
          console.log("🎨 Color Changed:", e.target.value);
          setSelectedColor(e.target.value);
        }}
      />

      <button className="save-color-btn" onClick={handleSaveColor}>Save</button>
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



