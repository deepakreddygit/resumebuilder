import React from "react";
import "../../styles/Template9.css";

function ResumeTemplate9({ resumeData }) {
  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="template-9 resume-container">
      {/* Header Section */}
      <div className="header">
        <h1>{resumeData.name || "Emily Brooklyn"}</h1>
        {/* <p className="job-title">{resumeData.jobTitle || "Administrative Assistant"}</p> */}
      </div>

      <div className="body">
        {/* Left Side (Shaded Section) */}
        <div className="main-content">
          {/* Professional Summary */}
          <div className="section">
            <h2>SUMMARY</h2>
            <p>{resumeData.summary || "Provide a summary of your experience."}</p>
          </div>

                {/* Work Experience - Only Show if There is Data */}
{resumeData.experience?.length > 0 && (
  <div className="section">
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

          {/* Marketing Strategies */}
          <div className="section">
            <h2>MARKETING STRATEGIES</h2>
            {resumeData.marketingStrategies?.length > 0 ? (
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

          {/* Social Media Campaigns */}
          <div className="section">
            <h2>SOCIAL MEDIA CAMPAIGNS</h2>
            {resumeData.socialMedia?.length > 0 ? (
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

        {/* Right Side (Contact, Education, Languages) */}
        <div className="sidebar">
          {/* Contact Section */}
          <div className="section">
            <h2>CONTACT</h2>
            <p>📧 {resumeData.email || "your@email.com"}</p>
            <p>📞 {resumeData.phone || "Your Phone Number"}</p>
            {/* <p>📍 {resumeData.location || "Your Location"}</p> */}
          </div>

          {/* Education Section */}
          <div className="section">
            <h2>EDUCATION</h2>
            {resumeData.education?.map((edu, index) => (
              <div key={index}>
                <h3>{edu.degree || "Degree"}</h3>
                <p>{edu.institution || "Institution Name"}</p>
                <p>{edu.year || "Year"}</p>
              </div>
            ))}
          </div>

          <div className="section">
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


          {/* Languages Section */}
          <div className="section">
            <h2>LANGUAGES</h2>
            {resumeData.languages?.length > 0 ? (
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
      </div>
    </div>
  );
}

export default ResumeTemplate9;
