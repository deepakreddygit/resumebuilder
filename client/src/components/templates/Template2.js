import React from "react";
import "../../styles/Template2.css";

function Template2({ resumeData = {} }) {
  return (
    <div className="template2 resume-container">
      {/* ✅ Header Section */}
      <header>
        <h1 id="name">{resumeData.name || "Your Name"}</h1>
        <p id="email">
          {resumeData.email || "your.email@example.com"} |{" "}
          <span id="phone">{resumeData.phone || "123-456-7890"}</span>
        </p>
        <p id="summary">{resumeData.summary || "A brief professional summary highlighting your key strengths and career goals."}</p>
      </header>

      {/* ✅ Work Experience Section */}
      <section>
        <h2>Work Experience</h2>
        {(resumeData.experience || []).map((exp, index) => (
          <div className="experience" key={index}>
            <div className="flex-container">
              <h3 id="job-title">{exp.jobTitle || "Python Developer"}</h3>
              <span className="years" id="job-years">{exp.years || "2020 - 2023"}</span>
            </div>
            <p><strong id="company">{exp.company || "Tech Solutions Inc."}</strong></p>
            <p id="job-responsibilities">{exp.responsibilities || "Developed REST APIs, optimized database queries, and collaborated with cross-functional teams."}</p>
          </div>
        ))}
      </section>

      {/* ✅ Education Section */}
      <section>
        <h2>Education</h2>
        {(resumeData.education || []).map((edu, index) => (
          <div className="education" key={index}>
            <div className="flex-container">
              <h3 id="degree">{edu.degree || "Master's in Computer Science"}</h3>
              <span className="years" id="grad-year">{edu.year || "2023"}</span>
            </div>
            <p><strong id="university">{edu.institution || "Kent State University"}</strong></p>
          </div>
        ))}
      </section>

      {/* ✅ Skills Section */}
      <section>
        <h2>Skills</h2>
        <ul id="skills">
          {(resumeData.skills || ["JavaScript", "React", "Node.js", "SQL & NoSQL Databases"]).map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* ✅ Certifications Section */}
      <section>
        <h2>Certifications</h2>
        {(resumeData.certifications || []).map((cert, index) => (
          <div className="certification" key={index}>
            <div className="flex-container">
              <h3 id="cert-title">{cert.title || "AWS Certified Developer"}</h3>
              <span className="years" id="cert-year">{cert.year || "2022"}</span>
            </div>
            <p><strong id="cert-issuer">{cert.issuer || "Amazon Web Services"}</strong></p>
          </div>
        ))}
      </section>

      {/* ✅ Projects Section */}
      <section>
        <h2>Projects</h2>
        {(resumeData.projects || []).map((project, index) => (
          <div className="project" key={index}>
            <h3 id="project-title">{project.title || "E-commerce Platform"}</h3>
            <p id="project-description">{project.description || "Developed a full-stack marketplace using React, Node.js, and MongoDB."}</p>
          </div>
        ))}
      </section>

      {/* ✅ Languages Section */}
      <section>
        <h2>Languages</h2>
        <ul id="languages">
          {(resumeData.languages || [{ language: "English", proficiency: "Fluent" }, { language: "Spanish", proficiency: "Intermediate" }]).map((lang, index) => (
            <li key={index}>{lang.language} - {lang.proficiency}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Template2;
