import React from "react";
import "../../styles/Template8.css";

function ResumeTemplate8({ resumeData }) {
  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="resume-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>{resumeData.name || "Your Name"}</h1>
      </div>

      <div className="body-section">
        {/* Sidebar (Left Section) */}
        <div className="sidebar">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>📧 {resumeData.email || "your@email.com"}</p>
            <p>📞 {resumeData.phone || "Your Phone Number"}</p>
          </div>

          <div className="skills">
            <h2>Skills</h2>
            {resumeData.skills?.length ? (
              <ul>
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills provided.</p>
            )}
          </div>

          <div className="languages">
            <h2>Languages</h2>
            {resumeData.languages?.length ? (
              <ul>
                {resumeData.languages.map((lang, index) => (
                  <li key={index}>
                    {lang.language} - {lang.proficiency}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No languages listed.</p>
            )}
          </div>
        </div>

        {/* Main Content (Right Section) */}
        <div className="main-content">
          <div className="profile">
            <h2>Summary</h2>
            <p>{resumeData.summary || "Provide a summary of your experience."}</p>
          </div>

          {/* Work Experience - Only Show if There is Data */}
{resumeData.experience?.length > 0 && (
  <div className="work-experience">
    <h2>Work Experience</h2>
    {resumeData.experience.map((exp, index) => (
      <div key={index} className="experience-entry">
        <h3>{exp.jobTitle || "Job Title"}</h3>
        <p className="company-name">
          {exp.company || "Company Name"} ({exp.years || "Years"})
        </p>
        <p>{exp.responsibilities || "List job responsibilities."}</p>
      </div>
    ))}
  </div>
)}


          <div className="education">
            <h2>Education</h2>
            {resumeData.education?.length ? (
              resumeData.education.map((edu, index) => (
                <div key={index} className="education-entry">
                  <h3>{edu.degree || "Degree"}</h3>
                  <p>{edu.institution || "Institution Name"} ({edu.year || "Year"})</p>
                </div>
              ))
            ) : (
              <p>No educational background listed.</p>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate8;
