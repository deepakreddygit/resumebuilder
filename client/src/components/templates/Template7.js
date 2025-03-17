import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaGraduationCap, FaTools, FaGlobe, FaUser } from "react-icons/fa";

function Template7({ resumeData = {} }) {
  // Initialize session key at the top level
  const storedSessionKey = sessionStorage.getItem("sessionKey");
  const initialSessionKey = storedSessionKey || Date.now().toString();

  const [sessionKey, setSessionKey] = useState(initialSessionKey);
  const [selectedColor, setSelectedColor] = useState("#2c3e50");
  const [showMessage, setShowMessage] = useState(false);

  // Store session key if not already set
  useEffect(() => {
    if (!storedSessionKey) {
      sessionStorage.setItem("sessionKey", initialSessionKey);
      setSessionKey(initialSessionKey);
    }
  }, [storedSessionKey, initialSessionKey]);

  // Retrieve stored color
  const storageKey = `resumeColor-7-Session-${sessionKey}`;

  useEffect(() => {
    const savedColor = localStorage.getItem(storageKey);
    if (savedColor) {
      setSelectedColor(savedColor);
    }
  }, [storageKey]);

  // Save selected color
  const handleSaveColor = () => {
    localStorage.setItem(storageKey, selectedColor);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div style={styles.container}>
      {/* ✅ Color Picker */}
      <div style={styles.colorPickerContainer}>
        <div
          style={{ ...styles.colorCircle, backgroundColor: selectedColor }}
          onClick={() => document.getElementById(`colorInput-7`).click()}
        ></div>
        <input
          type="color"
          id="colorInput-7"
          style={styles.hiddenColorInput}
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <button style={styles.saveButton} onClick={handleSaveColor}>Save</button>
        {showMessage && <span style={styles.message}>✔ Color Updated!</span>}
      </div>

      {/* ✅ Header */}
      <div style={{ ...styles.header, borderBottom: `3px solid ${selectedColor}` }}>
        <h1 style={{ color: selectedColor }}>{resumeData.name || "Your Name"}</h1>
        <div style={styles.contactInfo}>
          {resumeData.email && <p><FaEnvelope style={styles.icon} /> {resumeData.email}</p>}
          {resumeData.phone && <p><FaPhone style={styles.icon} /> {resumeData.phone}</p>}
        </div>
      </div>

      {/* ✅ Summary */}
      {resumeData.summary && (
        <div style={{ ...styles.section, borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}><FaUser style={styles.icon} /> Summary</h2>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {/* ✅ Work Experience (Only if data exists) */}
      {resumeData.experience?.length > 0 && (
        <div style={{ ...styles.section, borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}>📌 Work Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <h3>{exp.jobTitle || "Job Title"}</h3>
              <p>{exp.company || "Company Name"} ({exp.years || "Years"})</p>
              {exp.responsibilities && <p>{exp.responsibilities}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Education */}
      {resumeData.education?.length > 0 && (
        <div style={{ ...styles.section, borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}><FaGraduationCap style={styles.icon} /> Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={styles.educationItem}>
              <h3>{edu.degree || "Degree"}</h3>
              <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
            </div>
          ))}
        </div>
      )}

<div className="marketing">
            <h2>Marketing Strategies</h2>
            {resumeData.marketingStrategies?.length ? (
              resumeData.marketingStrategies.map((strategy, index) => (
                <div key={index} className="strategy-entry">
                  <h3>{strategy.strategy || "Strategy Name"}</h3>
                  <p>{strategy.impact || "Impact (e.g., Increased engagement by 30%)"}</p>
                </div>
              ))
            ) : (
              <p>No marketing strategies provided.</p>
            )}
          </div>

          <div className="social-media">
            <h2>Social Media Campaigns</h2>
            {resumeData.socialMedia?.length ? (
              resumeData.socialMedia.map((campaign, index) => (
                <div key={index} className="campaign-entry">
                  <h3>{campaign.platform || "Platform (e.g., Facebook, Instagram)"}</h3>
                  <p>{campaign.results || "Results (e.g., 10k followers increase)"}</p>
                </div>
              ))
            ) : (
              <p>No social media campaigns listed.</p>
            )}
          </div>

      {/* ✅ Skills */}
      {resumeData.skills?.length > 0 && (
        <div style={{ ...styles.section, borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}><FaTools style={styles.icon} /> Skills</h2>
          <div style={styles.skillsList}>
            {resumeData.skills.map((skill, index) => (
              <span key={index} style={styles.skillBadge}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Languages */}
      {resumeData.languages?.length > 0 && (
        <div style={{ ...styles.section, borderBottom: `3px solid ${selectedColor}` }}>
          <h2 style={{ color: selectedColor }}><FaGlobe style={styles.icon} /> Languages</h2>
          {resumeData.languages.map((lang, index) => (
            <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Inline Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "850px",
    margin: "30px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
  },
  header: {
    textAlign: "center",
    paddingBottom: "15px",
    marginBottom: "20px",
    flexDirection: "column",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px"
  },
  icon: {
    marginRight: "5px"
  },
  section: {
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "6px",
    marginBottom: "15px"
  },
  experienceItem: {
    marginBottom: "10px"
  },
  educationItem: {
    marginBottom: "10px"
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  skillBadge: {
    background: "#2c3e50",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px"
  },
  colorPickerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  },
  colorCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "2px solid #333",
    cursor: "pointer"
  },
  hiddenColorInput: {
    display: "none"
  },
  saveButton: {
    padding: "6px 14px",
    border: "none",
    background: "#2c3e50",
    color: "white",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  message: {
    color: "green",
    fontWeight: "bold",
    marginLeft: "10px"
  }
};

export default Template7;
