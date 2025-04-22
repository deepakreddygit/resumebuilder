import React from "react";

function Template13({ resumeData }) {
  if (!resumeData)
    return <p className="loading-text">⏳ Loading Resume Data...</p>;

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

  const safeRender = (data) => {
    if (data === null || data === undefined) return "No details provided";
    if (typeof data === "string") return data;
    if (typeof data === "object") return JSON.stringify(data);
    return String(data);
  };

  const formattedLanguages = formatLanguages(resumeData.languages);

  return (
    <>
      <div className="template-wrapper">
        <div className="container">
          <div className="main-content">
            <h1 className="name">{resumeData.name || "Your Name"}</h1>

            <div className="section">
              <h2>PROFILE</h2>
              <p>{safeRender(resumeData.summary)}</p>
            </div>

            <div className="section">
              <h2>PROFESSIONAL EXPERIENCE</h2>
              {resumeData.experience?.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h4>{safeRender(exp.jobTitle)} | {safeRender(exp.company)}</h4>
                  <p className="date">{safeRender(exp.years)}</p>
                  <p>{safeRender(exp.responsibilities)}</p>
                </div>
              ))}
            </div>

            {resumeData.role === "healthcare-professional" && (
              <>
                <div className="section">
                  <h2>HEALTHCARE EXPERIENCE</h2>
                  {resumeData.healthcareExperience?.map((exp, index) => (
                    <div key={index}>
                      <h3>{exp.role} | {exp.organization}</h3>
                      <p>{exp.duration}</p>
                      <p>{exp.responsibilities}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="sidebar">
            <div className="sidebar-section">
              <h4>CONTACT</h4>
              <p>{resumeData.email}</p>
              <p>{resumeData.phone}</p>
            </div>

            <div className="sidebar-section">
              <h4>EDUCATION</h4>
              {resumeData.education?.map((edu, index) => (
                <div key={index}>
                  <p><strong>{edu.degree}</strong></p>
                  <p>{edu.institution}</p>
                  <p>{edu.year}</p>
                </div>
              ))}
            </div>

            <div className="sidebar-section">
              <h4>KEY SKILLS</h4>
              <ul>
                {resumeData.skills?.map((skill, index) => (
                  <li key={index}>{safeRender(skill)}</li>
                ))}
              </ul>
            </div>

            {formattedLanguages.length > 0 && (
              <div className="sidebar-section">
                <h4>LANGUAGES</h4>
                <ul>
                  {formattedLanguages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            )}

            {resumeData.role === "healthcare-professional" && (
              <>
                {resumeData.clinicalSkills?.length > 0 && (
                  <div className="sidebar-section">
                    <h4>CLINICAL SKILLS</h4>
                    <ul>
                      {resumeData.clinicalSkills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {resumeData.certificationsHealthcare?.length > 0 && (
                  <div className="sidebar-section">
                    <h4>CERTIFICATIONS</h4>
                    {resumeData.certificationsHealthcare.map((cert, i) => (
                      <div key={i}>
                        <p><strong>{cert.name}</strong></p>
                        <p>{cert.issuedBy}</p>
                        <p>{cert.year}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        .template-wrapper { max-width: 1000px; margin: auto; background: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .container { display: flex; flex-direction: row; min-height: 100vh; }
        .main-content { width: 65%; padding: 30px; background: #fff; }
        .sidebar { width: 35%; background: #c8e6c9; padding: 30px; }
        .name { font-size: 24px; color: #1b5e20; font-weight: bold; border-bottom: 1px solid #1b5e20; margin-bottom: 15px; padding-bottom: 5px; }
        .section, .sidebar-section { margin-bottom: 25px; padding-bottom: 8px; border-bottom: 1px solid #1b5e20; }
        .section h2, .sidebar-section h4 { font-size: 16px; color: #1b5e20; text-transform: uppercase; margin-bottom: 10px; }
        .experience-item { margin-bottom: 10px; }
        .job-header h4 { font-size: 15px; font-weight: bold; color: #333; }
        .date { color: #1b5e20; font-style: italic; }
        ul { list-style: disc; margin-left: 20px; }
        li { font-size: 14px; margin-bottom: 5px; }
        @media (max-width: 768px) {
          .container { flex-direction: column; }
          .main-content, .sidebar { width: 100%; }
        }
      `}</style>
    </>
  );
}

export default Template13;
