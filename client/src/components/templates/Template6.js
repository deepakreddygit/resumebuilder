import React from "react";
import "../../styles/Template6.css";

function Template6({ resumeData = {} }) {  
  return (
    <div className="template6 resume-container">
      {/* Header Section */}
      <header className="header">
        <h1>{resumeData.name || "Your Name"}</h1>
        <p className="summary">{resumeData.summary || "Your Professional Summary"}</p>
        <div className="contact-info">
          <span>{resumeData.phone || "Your Phone Number"}</span>
          <span>{resumeData.email || "your@email.com"}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Education */}
          <section className="section education">
            <h3 className="section-title">🎓 Education</h3>
            {(resumeData.education || []).length > 0 ? (
              resumeData.education.map((edu, index) => (
                <div className="education-item" key={index}>
                  <h4>{edu.degree || "Degree"}</h4>
                  <p className="institution">{edu.institution || "Institution"} ({edu.year || "Year"})</p>
                </div>
              ))
            ) : <p>No education added.</p>}
          </section>

          {/* Skills */}
          <section className="section skills">
            <h3 className="section-title">🛠 Skills</h3>
            <div className="skills-list">
              {(resumeData.skills || []).length > 0 ? (
                resumeData.skills.map((skill, index) => (
                  <span className="skill-badge" key={index}>{skill}</span>
                ))
              ) : <p>No skills added.</p>}
            </div>
          </section>

          {/* Experience */}
          <section className="section experience">
            <h3 className="section-title">💼 Work Experience</h3>
            {(resumeData.experience || []).length > 0 ? (
              resumeData.experience.map((exp, index) => (
                <div className="experience-item" key={index}>
                  <h4>{exp.jobTitle || "Job Title"}</h4>
                  <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
                  <ul className="responsibilities">
                    {(Array.isArray(exp.responsibilities) ? exp.responsibilities : []).map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : <p>No work experience added.</p>}
          </section>

          {/* Languages */}
          <section className="section languages">
            <h3 className="section-title">🌍 Languages</h3>
            <ul>
              {(resumeData.languages || []).length > 0 ? (
                resumeData.languages.map((lang, index) => (
                  <li key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</li>
                ))
              ) : <p>No languages added.</p>}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Investments */}
          <section className="section investments">
            <h3 className="section-title">💰 Investments</h3>
            {(resumeData.investments || []).length > 0 ? (
              resumeData.investments.map((inv, index) => (
                <p key={index}>{inv.type || "Investment Type"} - 💵 {inv.amount || "Amount"}</p>
              ))
            ) : <p>No investments added.</p>}
          </section>

          {/* Financial Tools */}
          <section className="section financial-tools">
            <h3 className="section-title">📊 Financial Tools</h3>
            <div className="tools-list">
              {(resumeData.financialTools || []).length > 0 ? (
                resumeData.financialTools.map((tool, index) => (
                  <span className="tool-badge" key={index}>{tool.name || "Financial Tool"}</span>
                ))
              ) : <p>No financial tools added.</p>}
            </div>
          </section>

          {/* Budget & Risk Management */}
          <section className="section budget">
            <h3 className="section-title">📉 Budget & Risk Management</h3>
            <p>{resumeData.budgetExperience || "No budget experience provided."}</p>
          </section>

          {/* Leadership & Strategy */}
          <section className="section leadership">
            <h3 className="section-title">🚀 Leadership & Strategy</h3>
            <p>{resumeData.leadershipExperience || "No leadership experience provided."}</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Template6;
