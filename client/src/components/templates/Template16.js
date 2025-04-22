import React from "react";

function Template16({ resumeData }) {
  const safeRender = (text) => {
    if (text === null || text === undefined || text === "") return "Not Provided";
    if (typeof text === "string") return text;
    if (typeof text === "object") return JSON.stringify(text);
    return String(text);
  };

  const formatLanguages = (languages) => {
    if (!languages || !languages.length) return [];
    return languages.map((lang) => {
      if (typeof lang === "string") return lang;
      if (typeof lang === "object" && lang.language && lang.proficiency) {
        return `${lang.language} (${lang.proficiency})`;
      }
      return JSON.stringify(lang);
    });
  };

  const formattedLanguages = formatLanguages(resumeData.languages);

  return (
    <>
      <div className="template16">
        <div className="header">
          <h1>{safeRender(resumeData.name)}</h1>
          <p>{safeRender(resumeData.email)} | {safeRender(resumeData.phone)}</p>
        </div>

        <div className="section">
          <h2>Summary</h2>
          <p>{safeRender(resumeData.summary)}</p>
        </div>

        {resumeData.experience?.length > 0 && (
          <div className="section">
            <h2>Work Experience</h2>
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <p><strong>{safeRender(exp.jobTitle)}</strong>, {safeRender(exp.company)}</p>
                <p><em>{safeRender(exp.years)}</em></p>
                <p>{safeRender(exp.responsibilities)}</p>
              </div>
            ))}
          </div>
        )}

        {resumeData.education?.length > 0 && (
          <div className="section">
            <h2>Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i}>
                <p><strong>{safeRender(edu.degree)}</strong> - {safeRender(edu.institution)} ({safeRender(edu.year)})</p>
              </div>
            ))}
          </div>
        )}

        {resumeData.skills?.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            <ul>
              {resumeData.skills.map((skill, i) => (
                <li key={i}>{safeRender(skill)}</li>
              ))}
            </ul>
          </div>
        )}

{resumeData.writingStyles?.filter(style => style.trim() !== "").length > 0 && (
  <div className="section">
    <h2>Writing Styles</h2>
    <ul>
      {resumeData.writingStyles
        .filter(style => style.trim() !== "")
        .map((style, i) => (
          <li key={i}>{safeRender(style)}</li>
        ))}
    </ul>
  </div>
)}
        <div className="section">
          <h2>SEO Knowledge</h2>
          <p>{safeRender(resumeData.seoExperience)}</p>
        </div>



        {formattedLanguages.length > 0 && (
          <div className="section">
            <h2>Languages</h2>
            <ul>
              {formattedLanguages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        .template16 {
          max-width: 900px;
          margin: 30px auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background: #fdfdfd;
          border-left: 6px solid #3498db;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 36px;
          color: #2c3e50;
        }
        .section {
          margin-top: 25px;
        }
        .section h2 {
          color: #2980b9;
          font-size: 20px;
          border-bottom: 2px solid #ecf0f1;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        p, li {
          font-size: 15px;
          line-height: 1.6;
          color: #444;
        }
        ul {
          margin-left: 20px;
        }
      `}</style>
    </>
  );
}

export default Template16;
