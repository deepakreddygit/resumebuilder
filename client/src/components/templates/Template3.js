import React from "react";
import "../../styles/Template3.css"; 

function Template3({ resumeData }) {
  return (
    <div className="resume-container">
      {/* Header Section */}
      <header>
        <h1 id="name">{resumeData.name || "Your Name"}</h1>
        <p id="email">
          {resumeData.email || "your.email@example.com"} |{" "}
          <span id="phone">{resumeData.phone || "123-456-7890"}</span>
        </p>
        <p id="summary">
          {resumeData.summary ||
            "A brief professional summary highlighting your key strengths and career goals."}
        </p>
      </header>

      {/* Work Experience */}
      <section>
        <h2>Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div className="experience" key={index}>
            <div className="flex-container">
              <h3 id="job-title">{exp.jobTitle || "Job Title"}</h3>
              <span className="years" id="job-years">
                {exp.years || "Years"}
              </span>
            </div>
            <p>
              <strong id="company">{exp.company || "Company Name"}</strong>
            </p>
            <p id="job-responsibilities">{exp.responsibilities || "Job Responsibilities"}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div className="education" key={index}>
            <div className="flex-container">
              <h3 id="degree">{edu.degree || "Degree"}</h3>
              <span className="years" id="grad-year">
                {edu.year || "Year"}
              </span>
            </div>
            <p>
              <strong id="university">{edu.institution || "Institution"}</strong>
            </p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2>Skills</h2>
        <ul id="skills">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill || "Skill"}</li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section>
        <h2>Certifications</h2>
        {resumeData.certifications.map((cert, index) => (
          <div className="certification" key={index}>
            <div className="flex-container">
              <h3 id="cert-title">{cert.title || "Certification Title"}</h3>
              <span className="years" id="cert-year">
                {cert.year || "Year"}
              </span>
            </div>
            <p>
              <strong id="cert-issuer">{cert.issuer || "Issuer"}</strong>
            </p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2>Projects</h2>
        {resumeData.projects.map((proj, index) => (
          <div className="project" key={index}>
            <h3 id="project-title">{proj.title || "Project Title"}</h3>
            <p id="project-description">{proj.description || "Project Description"}</p>
          </div>
        ))}
      </section>

      {/* Languages */}
      <section>
        <h2>Languages</h2>
        <ul id="languages">
          {resumeData.languages.map((lang, index) => (
            <li key={index}>
              {lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Template3;


