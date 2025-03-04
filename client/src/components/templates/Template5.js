import React from "react";
import "../../styles/Template5.css";

function Template5({ resumeData = {} }) {  
  return (
    <div className=" template5 resume-template">
      {/* Header */}
      <div className="resume-header">
        <h1>{resumeData.name || "Your Name"}</h1>
        <p className="summary">{resumeData.summary || "Your professional summary..."}</p>
      </div>

      <div className="resume-body">
        {/* Left Section */}
        <div className="left-section">
          {/* Contact */}
          <div className="resume-section">
            <h2>📞 Contact</h2>
            <p><strong>Email:</strong> {resumeData.email || "your@email.com"}</p>
            <p><strong>Phone:</strong> {resumeData.phone || "Your Phone Number"}</p>
            <p><strong>Address:</strong> {resumeData.address || "Your Address"}</p>
          </div>

          {/* Investments */}
          <div className="resume-section">
            <h2>💰 Investments</h2>
            {(resumeData.investments || []).map((inv, index) => (
              <p key={index}>{inv.type || "Investment Type"} - 💵 {inv.amount || "Amount"}</p>
            ))}
          </div>

          {/* Financial Tools */}
          <div className="resume-section">
            <h2>📊 Financial Tools</h2>
            {(resumeData.financialTools || []).map((tool, index) => (
              <p key={index}>{tool.name || "Financial Tool"}</p>
            ))}
          </div>

          {/* Languages */}
          <div className="resume-section">
            <h2>🌍 Languages</h2>
            {(resumeData.languages || []).map((lang, index) => (
              <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Work Experience */}
          <div className="resume-section">
            <h2>💼 Experiences</h2>
            {(resumeData.experience || []).map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.jobTitle || "Job Title"}</h3>
                <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
                <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="resume-section">
            <h2>🎓 Education</h2>
            {(resumeData.education || []).map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree || "Degree"}</h3>
                <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="resume-section">
            <h2>🛠 Skills</h2>
            <div className="skills-list">
              {(resumeData.skills || []).map((skill, index) => (
                <span key={index} className="skill-badge">{skill || "Skill"}</span>
              ))}
            </div>
          </div>

          {/* Budget & Risk Management */}
          <div className="resume-section">
            <h2>📉 Budget & Risk Management</h2>
            <p>{resumeData.budgetExperience || "Describe your experience in budget & risk management"}</p>
          </div>

          {/* Leadership & Strategy */}
          <div className="resume-section">
            <h2>🚀 Leadership & Strategy</h2>
            <p>{resumeData.leadershipExperience || "Describe your leadership experience and strategies"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template5;
