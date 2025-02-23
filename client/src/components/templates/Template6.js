import React from "react";
import "../../styles/Template6.css";

function Template6({ resumeData = {} }) {  
  return (
    <div className="resume-template">
      <div className="resume-header">
        <h1>{resumeData.name || "Your Name"}</h1>
        <p className="summary">{resumeData.summary || "Your professional summary..."}</p>
        <div className="contact-info">
          <p>📧 {resumeData.email || "your@email.com"}</p>
          <p>📞 {resumeData.phone || "Your Phone Number"}</p>
        </div>
      </div>

      {/* ✅ Work Experience */}
      <div className="resume-section">
        <h2>📌 Work Experience</h2>
        {(resumeData.experience || []).map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobTitle || "Job Title"}</h3>
            <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
            <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
          </div>
        ))}
      </div>

      {/* ✅ Education */}
      <div className="resume-section">
        <h2>🎓 Education</h2>
        {(resumeData.education || []).map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree || "Degree"}</h3>
            <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
          </div>
        ))}
      </div>

      {/* ✅ Finance & Management Skills */}
      <div className="resume-section">
        <h2>💰 Finance & Management Skills</h2>
        <div className="skills-list">
          {(resumeData.skills || []).map((skill, index) => (
            <span key={index} className="skill-badge">{skill || "Skill"}</span>
          ))}
        </div>
      </div>

      {/* ✅ Certifications (CFA, CPA, etc.) */}
      <div className="resume-section">
        <h2>📜 Certifications</h2>
        {(resumeData.certifications || []).map((cert, index) => (
          <div key={index} className="certification-item">
            <h3>{cert.title || "Certification Title"}</h3>
            <p>{cert.issuer || "Issuer"} ({cert.year || "Year"})</p>
          </div>
        ))}
      </div>

      {/* ✅ Financial Management Projects */}
      <div className="resume-section">
        <h2>📊 Finance Projects</h2>
        {(resumeData.projects || []).map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title || "Project Title"}</h3>
            <p>{project.description || "Project description..."}</p>
          </div>
        ))}
      </div>

      {/* ✅ Financial Tools & Analysis */}
      <div className="resume-section">
        <h2>📈 Financial Tools & Analysis</h2>
        {(resumeData.financialTools || []).map((tool, index) => (
          <p key={index}>{tool.name || "Financial Tool"}</p>
        ))}
      </div>

      {/* ✅ Investment Experience */}
      <div className="resume-section">
        <h2>💵 Investment Experience</h2>
        {(resumeData.investments || []).map((inv, index) => (
          <div key={index} className="investment-item">
            <h3>{inv.type || "Investment Type"}</h3>
            <p>💵 {inv.amount || "Investment Amount"} | 📅 {inv.years || "Years of Experience"}</p>
          </div>
        ))}
      </div>

      {/* ✅ Budget Management Experience */}
      <div className="resume-section">
        <h2>💼 Budget & Risk Management</h2>
        <p>{resumeData.budgetExperience || "Describe your experience in budget & risk management"}</p>
      </div>

      {/* ✅ Leadership & Strategic Planning */}
      <div className="resume-section">
        <h2>📌 Leadership & Strategy</h2>
        <p>{resumeData.leadershipExperience || "Describe your leadership experience and financial strategies"}</p>
      </div>

      {/* ✅ Languages */}
      <div className="resume-section">
        <h2>🌎 Languages</h2>
        {(resumeData.languages || []).map((lang, index) => (
          <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
        ))}
      </div>
    </div>
  );
}

export default Template6;
