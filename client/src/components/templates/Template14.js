import React from "react";

function Template14({ resumeData }) {
  const safe = (val) => {
    if (val === null || val === undefined) return "N/A";
    if (typeof val === "string") return val;
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
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
      <div className="template14-container">
        <div className="left-panel">
          <h1>{safe(resumeData.name)}</h1>
          <p><strong>Email:</strong> {safe(resumeData.email)}</p>
          <p><strong>Phone:</strong> {safe(resumeData.phone)}</p>

          <div className="section">
            <h2>Summary</h2>
            <p>{safe(resumeData.summary)}</p>
          </div>

          <div className="section">
            <h2>Professional Experience</h2>
            {resumeData.experience?.map((exp, index) => (
              <div key={index}>
                <p><strong>{safe(exp.jobTitle)}</strong> at {safe(exp.company)}</p>
                <p>{safe(exp.years)}</p>
                <p>{safe(exp.responsibilities)}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h2>Healthcare Experience</h2>
            {resumeData.healthcareExperience?.map((exp, i) => (
              <div key={i}>
                <p><strong>{safe(exp.role)}</strong> at {safe(exp.organization)}</p>
                <p>{safe(exp.duration)}</p>
                <p>{safe(exp.responsibilities)}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h2>Certifications</h2>
            {resumeData.certificationsHealthcare?.map((cert, i) => (
              <div key={i}>
                <p>{safe(cert.name)} - {safe(cert.issuedBy)} ({safe(cert.year)})</p>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          <div className="section">
            <h2>Education</h2>
            {resumeData.education?.map((edu, i) => (
              <div key={i}>
                <p><strong>{safe(edu.degree)}</strong></p>
                <p>{safe(edu.institution)}, {safe(edu.year)}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h2>Clinical Skills</h2>
            <ul>
              {resumeData.clinicalSkills?.map((skill, i) => (
                <li key={i}>{safe(skill)}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>Key Skills</h2>
            <ul>
              {resumeData.skills?.map((skill, i) => (
                <li key={i}>{safe(skill)}</li>
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
      </div>

      <style>{`
        .template14-container {
          display: flex;
          font-family: 'Helvetica Neue', sans-serif;
          max-width: 1000px;
          margin: auto;
          background: #f9f9f9;
          padding: 30px;
        }
        .left-panel {
          width: 65%;
          padding-right: 20px;
        }
        .right-panel {
          width: 35%;
          background: #e0f7fa;
          padding: 20px;
          border-radius: 8px;
        }
        h1 {
          color: #00796b;
          font-size: 28px;
          margin-bottom: 10px;
        }
        .section {
          margin-top: 25px;
        }
        .section h2 {
          font-size: 18px;
          color: #004d40;
          margin-bottom: 10px;
        }
        ul {
          margin-left: 20px;
        }
      `}</style>
    </>
  );
}

export default Template14;
