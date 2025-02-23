import React from "react";
import "../../styles/Template8.css";

function Template8({ resumeData }) {
  // ✅ Debugging: Log resumeData
  console.log("🟢 Template7 Rendered | Resume Data:", resumeData);

  if (!resumeData) {
    return <p>Loading...</p>;
  }

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

      {/* ✅ Work Experience (Ensure array exists) */}
      <div className="resume-section">
        <h2>📌 Work Experience</h2>
        {Array.isArray(resumeData.experience) ? resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobTitle || "Job Title"}</h3>
            <p className="company">{exp.company || "Company Name"} ({exp.years || "Years"})</p>
            <p className="responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
          </div>
        )) : <p>No experience added.</p>}
      </div>

      {/* ✅ Education */}
      <div className="resume-section">
        <h2>🎓 Education</h2>
        {Array.isArray(resumeData.education) ? resumeData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree || "Degree"}</h3>
            <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
          </div>
        )) : <p>No education added.</p>}
      </div>

      {/* ✅ Skills */}
      <div className="resume-section">
        <h2>🛠 Skills</h2>
        <div className="skills-list">
          {Array.isArray(resumeData.skills) ? resumeData.skills.map((skill, index) => (
            skill && <span key={index} className="skill-badge">{skill}</span>
          )) : <p>No skills added.</p>}
        </div>
      </div>

      {/* ✅ Certifications */}


      {/* ✅ Projects */}


      {/* ✅ Languages */}
      <div className="resume-section">
        <h2>🌎 Languages</h2>
        {Array.isArray(resumeData.languages) ? resumeData.languages.map((lang, index) => (
          <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
        )) : <p>No languages added.</p>}
      </div>

      {/* ✅ Marketing Strategies */}
      <div className="resume-section">
        <h2>📢 Marketing Strategies</h2>
        {Array.isArray(resumeData.marketingStrategies) ? resumeData.marketingStrategies.map((strategy, index) => (
          <div key={index} className="strategy-item">
            <h3>{strategy.strategy || "Strategy Name"}</h3>
            <p>{strategy.impact || "Impact (e.g., Increased engagement by 30%)"}</p>
          </div>
        )) : <p>No marketing strategies added.</p>}
      </div>

      {/* ✅ Social Media Campaigns */}
      <div className="resume-section">
        <h2>📲 Social Media Campaigns</h2>
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

export default Template8;
