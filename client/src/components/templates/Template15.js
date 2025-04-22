import React from "react";

function Template15({ resumeData }) {
  const safeRender = (text) => {
    if (text === null || text === undefined) return "Not Provided";
    if (typeof text === "string") return text;
    if (typeof text === "object") return JSON.stringify(text);
    return String(text);
  };

  const formatLanguages = (languages) => {
    if (!languages || !languages.length) return [];
    return languages.map((lang) => {
      if (typeof lang === "string") return lang;
      if (typeof lang === "object") {
        if (lang.language && lang.proficiency) {
          return `${lang.language} (${lang.proficiency})`;
        }
        return JSON.stringify(lang);
      }
      return String(lang);
    });
  };

  const formattedLanguages = formatLanguages(resumeData.languages);

  return (
    <>
      <div className="template15">
        <div className="header">
          <h1>{safeRender(resumeData.name)}</h1>
          <p>{safeRender(resumeData.email)} | {safeRender(resumeData.phone)}</p>
        </div>

        <div className="section">
          <h2>Profile</h2>
          <p>{safeRender(resumeData.summary)}</p>
        </div>

        <div className="section">
          <h2>Professional Experience</h2>
          {resumeData.experience?.map((exp, i) => (
            <div key={i}>
              <p><strong>{safeRender(exp.jobTitle)}</strong>, {safeRender(exp.company)}</p>
              <p><em>{safeRender(exp.years)}</em></p>
              <p>{safeRender(exp.responsibilities)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Healthcare Experience</h2>
          {resumeData.healthcareExperience?.map((exp, i) => (
            <div key={i}>
              <p><strong>{safeRender(exp.role)}</strong>, {safeRender(exp.organization)}</p>
              <p><em>{safeRender(exp.duration)}</em></p>
              <p>{safeRender(exp.responsibilities)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Education</h2>
          {resumeData.education?.map((edu, i) => (
            <div key={i}>
              <p><strong>{safeRender(edu.degree)}</strong> - {safeRender(edu.institution)} ({safeRender(edu.year)})</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Certifications</h2>
          {resumeData.certificationsHealthcare?.map((cert, i) => (
            <p key={i}>{safeRender(cert.name)} - {safeRender(cert.issuedBy)} ({safeRender(cert.year)})</p>
          ))}
        </div>

        <div className="section">
          <h2>Clinical Skills</h2>
          <ul>
            {resumeData.clinicalSkills?.map((skill, i) => (
              <li key={i}>{safeRender(skill)}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Key Skills</h2>
          <ul>
            {resumeData.skills?.map((skill, i) => (
              <li key={i}>{safeRender(skill)}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Languages</h2>
          <ul>
            {formattedLanguages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .template15 {
          max-width: 900px;
          margin: 30px auto;
          font-family: Georgia, serif;
          padding: 40px;
          background: #ffffff;
          box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2c3e50;
          font-size: 32px;
          margin-bottom: 5px;
        }
        .section {
          margin-top: 25px;
        }
        .section h2 {
          color: #34495e;
          font-size: 20px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        p, li {
          font-size: 15px;
          margin-bottom: 5px;
        }
        ul {
          margin-left: 20px;
        }
      `}</style>
    </>
  );
}

export default Template15;
