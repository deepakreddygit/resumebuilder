import React from "react";
import "../../styles/ResumeTemplate.css"; 
import "../../styles/Template2.css";

const Template2 = ({ resumeData }) => {
  if (!resumeData) return null;

  return (
    <div className="resume-template">
      {/* 🔹 Header Section */}
      <div className="resume-header">
        <h1>{resumeData.name || "Your Name"}</h1>
        <p>
          {resumeData.city && resumeData.state ? `${resumeData.city}, ${resumeData.state} • ` : ""}
          {resumeData.phone || "(555) 555-1234"} • {resumeData.email || "your-email@example.com"} <br />
          {resumeData.linkedin ? (
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">
              {resumeData.linkedin}
            </a>
          ) : "linkedin.com/in/your-name"}
        </p>
      </div>

      {/* 🔹 Professional Summary */}
      <p className="summary">
        <strong>Brief LinkedIn-style headline summarizing your abilities and top skills</strong>
      </p>

      {/* 🔹 Skills Section */}
      <h2>Top Skills</h2>
      <ul>
        {resumeData.skills.length > 0 ? (
          resumeData.skills.map((skill, index) => (
            <li key={index}>
              <strong>{skill.skill}</strong> - Add a brief explanation to provide context and depth.
            </li>
          ))
        ) : (
          <>
            <li><strong>Skill 1</strong> - Add a brief explanation to provide context.</li>
            <li><strong>Skill 2</strong> - This helps recruiters understand your expertise.</li>
            <li><strong>CRM</strong> - 4+ years leveraging Salesforce on a daily basis.</li>
          </>
        )}
      </ul>

      {/* 🔹 Work Experience */}
      <h2>Work Experience</h2>
      {resumeData.experience.length > 0 ? (
        resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <p>
              <strong>{exp.company || "Company Name"}, {exp.location || "Location"}</strong>
              <span className="years">{exp.years || "MM/YYYY - Present"}</span>
            </p>
            <p className="job-title"><strong>{exp.jobTitle || "Job Title"}</strong></p>
            <p>{exp.responsibilities || "Describe your key responsibilities and accomplishments."}</p>
          </div>
        ))
      ) : (
        <>
          <div className="experience-item">
            <p><strong>Company 4, Location</strong> <span className="years">MM/YYYY - Present</span></p>
            <p className="job-title"><strong>Job Title</strong></p>
            <p>Tailor your experience to the job description...</p>
          </div>
          <div className="experience-item">
            <p><strong>Company 3, Location</strong> <span className="years">MM/YYYY - Present</span></p>
            <p className="job-title"><strong>Job Title</strong></p>
            <p>Work the hard skills and keywords found in the job description...</p>
          </div>
          <div className="experience-item">
            <p><strong>Company 2, Location</strong> <span className="years">MM/YYYY - Present</span></p>
            <p className="job-title"><strong>Job Title</strong></p>
            <p>Recruiters like to see how you move from company to company...</p>
          </div>
        </>
      )}

      {/* 🔹 Education Section */}
      <h2>Education</h2>
      {resumeData.education.length > 0 ? (
        resumeData.education.map((edu, index) => (
          <p key={index}>
            <strong>{edu.degree || "Degree"}, {edu.graduationYear || "YYYY"}</strong> <br />
            {edu.institution || "College Name, Location"}
          </p>
        ))
      ) : (
        <p><strong>Degree, Graduation Year (YYYY)</strong>, College Name, Location</p>
      )}
    </div>
  );
};

export default Template2;
