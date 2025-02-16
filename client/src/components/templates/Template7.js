import React from "react";
import "../../styles/Template7.css";


function Template7({ resumeData }) {
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

      <div className="resume-section">
        <h2>📌 Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobTitle || "Job Title"}</h3>
            <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
            <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h2>🎓 Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree || "Degree"}</h3>
            <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h2>🛠 Skills</h2>
        <div className="skills-list">
          {resumeData.skills.map((skill, index) => (
            skill.skill && <span key={index} className="skill-badge">{skill.skill}</span>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h2>📜 Certifications</h2>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="certification-item">
            <h3>{cert.title || "Certification Title"}</h3>
            <p>{cert.issuer || "Issuer"} ({cert.year || "Year"})</p>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h2>🚀 Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title || "Project Title"}</h3>
            <p>{project.description || "Project description..."}</p>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h2>🌎 Languages</h2>
        {resumeData.languages.map((lang, index) => (
          <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
        ))}
      </div>
    </div>
  );
}

export default Template7;
