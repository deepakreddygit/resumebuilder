// import React, { useState, useEffect } from "react";
// import "../../styles/Template7.css";
// import { FaEnvelope, FaPhone, FaGraduationCap, FaTools, FaGlobe, FaUser } from "react-icons/fa";

// function Template7({ resumeData }) {
//   // ✅ Load saved color from localStorage specific to Template7
//   const [selectedColor, setSelectedColor] = useState(localStorage.getItem("resumeColor7") || "#2c3e50");
//   const [showMessage, setShowMessage] = useState(false);

//   useEffect(() => {
//     const savedColor = localStorage.getItem("resumeColor7");
//     if (savedColor) {
//       setSelectedColor(savedColor);
//     }
//   }, []);

//   // ✅ Save color for Template7 only
//   const handleSaveColor = () => {
//     localStorage.setItem("resumeColor7", selectedColor);
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), 2000);
//   };

//   if (!resumeData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="template7 resume-container">

//       {/* 🔹 Color Picker Section */}
//       <div className="color-picker-container">
//         <div className="color-preview" style={{ backgroundColor: selectedColor }}></div>
//         <input 
//           type="color" 
//           className="color-input" 
//           value={selectedColor} 
//           onChange={(e) => setSelectedColor(e.target.value)}
//         />
//         <button className="save-color-btn" onClick={handleSaveColor}>Save</button>
//         {showMessage && <span className="color-updated-message">✔ Color Updated!</span>}
//       </div>

//       {/* ✅ Header Section */}
//       <div className="resume-header" style={{ borderBottom: `3px solid ${selectedColor}` }}>
//         <h1 style={{ color: selectedColor }} className="name" >{resumeData.name || "Your Name"}</h1>
//         <div className="contact-info">
//           <p><FaEnvelope className="icon" /> {resumeData.email || "your@email.com"}</p>
//           <p><FaPhone className="icon" /> {resumeData.phone || "Your Phone Number"}</p>
//         </div>
//       </div>

//       {/* ✅ Summary Section */}
//       {resumeData.summary && (
//         <div style={{ borderBottom: `3px solid ${selectedColor}` }} className="resume-section">
//           <h2 style={{ color: selectedColor }} ><FaUser className="icon" /> Summary</h2>
//           <p className="summary-text">{resumeData.summary}</p>
//         </div>
//       )}

//       {/* ✅ Work Experience */}
//       <div  style={{ borderBottom: `3px solid ${selectedColor}` }} className="resume-section">
//         <h2 style={{ color: selectedColor }}>📌 Work Experience</h2>
//         {Array.isArray(resumeData.experience) ? resumeData.experience.map((exp, index) => (
//           <div key={index} className="experience-item">
//             <h3 >{exp.jobTitle || "Job Title"}</h3>
//             <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
//             <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
//           </div>
//         )) : <p>No experience added.</p>}
//       </div>

//       {/* ✅ Education Section */}
//       <div  style={{ borderBottom: `3px solid ${selectedColor}` }} className="resume-section">
//         <h2  style={{ color: selectedColor }}><FaGraduationCap className="icon" /> Education</h2>
//         {Array.isArray(resumeData.education) && resumeData.education.length > 0 ? (
//           resumeData.education.map((edu, index) => (
//             <div key={index} className="education-item">
//               <h3 >{edu.degree || "Degree"}</h3>
//               <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
//             </div>
//           ))
//         ) : <p>No education added.</p>}
//       </div>

//       {/* ✅ Skills Section */}
//       <div  style={{ borderBottom: `3px solid ${selectedColor}` }} className="resume-section">
//         <h2 style={{ color: selectedColor }}><FaTools className="icon" /> Skills</h2>
//         <div className="skills-list">
//           {Array.isArray(resumeData.skills) && resumeData.skills.length > 0 ? (
//             resumeData.skills.map((skill, index) => (
//               <span key={index} className="skill-badge">{skill}</span>
//             ))
//           ) : <p>No skills added.</p>}
//         </div>
//       </div>

//       {/* ✅ Languages Section */}
//       <div style={{ borderBottom: `3px solid ${selectedColor}` }}  className="resume-section">
//         <h2 style={{ color: selectedColor }}><FaGlobe className="icon" /> Languages</h2>
//         {Array.isArray(resumeData.languages) && resumeData.languages.length > 0 ? (
//           resumeData.languages.map((lang, index) => (
//             <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
//           ))
//         ) : <p>No languages added.</p>}
//       </div>

//       {/* ✅ Marketing Strategies */}
//       <div style={{ borderBottom: `3px solid ${selectedColor}` }}  className="resume-section">
//         <h2 style={{ color: selectedColor }}>📢 Marketing Strategies</h2>
//         {Array.isArray(resumeData.marketingStrategies) ? resumeData.marketingStrategies.map((strategy, index) => (
//           <div key={index} className="strategy-item">
//             <h3 >{strategy.strategy || "Strategy Name"}</h3>
//             <p>{strategy.impact || "Impact (e.g., Increased engagement by 30%)"}</p>
//           </div>
//         )) : <p>No marketing strategies added.</p>}
//       </div>

//       {/* ✅ Social Media Campaigns */}
//       <div style={{ borderBottom: `3px solid ${selectedColor}` }}  className="resume-section">
//         <h2 style={{ color: selectedColor }}>📲 Social Media Campaigns</h2>
//         {Array.isArray(resumeData.socialMedia) ? resumeData.socialMedia.map((campaign, index) => (
//           <div key={index} className="campaign-item">
//             <h3 >{campaign.platform || "Platform (e.g., Facebook, Instagram)"}</h3>
//             <p>{campaign.results || "Results (e.g., 10k followers increase)"}</p>
//           </div>
//         )) : <p>No social media campaigns added.</p>}
//       </div>
//     </div>
//   );
// }

// export default Template7;


import React, { useState, useEffect } from "react";
import "../../styles/Template7.css";
import { FaEnvelope, FaPhone, FaGraduationCap, FaTools, FaGlobe, FaUser } from "react-icons/fa";

function Template7({ resumeData }) {
  // ✅ Get Resume ID and Template Number
  const resumeId = resumeData.resume_id || `new-${Date.now()}`;
  const templateNumber = resumeData.templateNumber || "7";
  const storageKey = `resumeColor-${resumeId}-${templateNumber}`;

  console.log("🔹 Using Storage Key:", storageKey);
  console.log("📌 Resume ID:", resumeId, "| Template Number:", templateNumber);

  const [selectedColor, setSelectedColor] = useState("#2c3e50");
  const [showMessage, setShowMessage] = useState(false);

  // ✅ Load Color for This Resume
  useEffect(() => {
    const savedColor = localStorage.getItem(storageKey);
    console.log("🔄 Loaded color from storage:", savedColor);
    if (savedColor) {
      setSelectedColor(savedColor);
    }
  }, [storageKey]);

  // ✅ Save Color for This Resume Only
  const handleSaveColor = () => {
    console.log("💾 Saving color:", selectedColor, "for Key:", storageKey);
    localStorage.setItem(storageKey, selectedColor);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="template7 resume-container">
      
      {/* 🔹 Color Picker Section */}
      <div className="color-picker-container">
        <div 
          className="color-circle" 
          style={{ backgroundColor: selectedColor }} 
          onClick={() => document.getElementById(`colorInput-${resumeId}`).click()} 
        ></div>

        {/* Hidden Color Picker */}
        <input 
          type="color" 
          id={`colorInput-${resumeId}`} 
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

      {/* ✅ Header Section */}
      <div className="resume-header" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h1 style={{ color: selectedColor }} className="name">{resumeData.name || "Your Name"}</h1>
        <div className="contact-info">
          <p><FaEnvelope className="icon" /> {resumeData.email || "your@email.com"}</p>
          <p><FaPhone className="icon" /> {resumeData.phone || "Your Phone Number"}</p>
        </div>
      </div>

      {/* ✅ Summary Section */}
      {resumeData.summary && (
        <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}><FaUser className="icon" /> Summary</h2>
          <p className="summary-text">{resumeData.summary}</p>
        </div>
      )}

      {/* ✅ Work Experience */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}>📌 Work Experience</h2>
        {Array.isArray(resumeData.experience) ? resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobTitle || "Job Title"}</h3>
            <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
            <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
          </div>
        )) : <p>No experience added.</p>}
      </div>

      {/* ✅ Education Section */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}><FaGraduationCap className="icon" /> Education</h2>
        {Array.isArray(resumeData.education) && resumeData.education.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree || "Degree"}</h3>
              <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
            </div>
          ))
        ) : <p>No education added.</p>}
      </div>

      {/* ✅ Skills Section */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}><FaTools className="icon" /> Skills</h2>
        <div className="skills-list">
          {Array.isArray(resumeData.skills) && resumeData.skills.length > 0 ? (
            resumeData.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))
          ) : <p>No skills added.</p>}
        </div>
      </div>

      {/* ✅ Languages Section */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}><FaGlobe className="icon" /> Languages</h2>
        {Array.isArray(resumeData.languages) && resumeData.languages.length > 0 ? (
          resumeData.languages.map((lang, index) => (
            <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
          ))
        ) : <p>No languages added.</p>}
      </div>

      {/* ✅ Marketing Strategies */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}>📢 Marketing Strategies</h2>
        {Array.isArray(resumeData.marketingStrategies) ? resumeData.marketingStrategies.map((strategy, index) => (
          <div key={index} className="strategy-item">
            <h3>{strategy.strategy || "Strategy Name"}</h3>
            <p>{strategy.impact || "Impact (e.g., Increased engagement by 30%)"}</p>
          </div>
        )) : <p>No marketing strategies added.</p>}
      </div>

      {/* ✅ Social Media Campaigns */}
      <div className="resume-section" style={{ borderBottom: `3px solid ${selectedColor}` }}>
        <h2 style={{ color: selectedColor }}>📲 Social Media Campaigns</h2>
        {Array.isArray(resumeData.socialMedia) ? resumeData.socialMedia.map((campaign, index) => (
          <div key={index} className="campaign-item">
            <h3>{campaign.platform || "Platform (e.g., Facebook, Instagram)"}</h3>
            <p>{campaign.results || "Results (e.g., 10k followers increase)"}</p>
          </div>
        )) : <p>No social media campaigns added.</p>}
      </div>

    </div>
  );
}

export default Template7;
