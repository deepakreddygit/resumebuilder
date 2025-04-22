import React from "react";

function Template17({ resumeData }) {
  const safeRender = (val) => {
    if (!val || val === "undefined") return "Not Provided";
    if (typeof val === "string") return val;
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  const formatLanguages = (languages) => {
    if (!languages?.length) return [];
    return languages.map((lang) => (
      typeof lang === "object" && lang.language
        ? `${lang.language} (${lang.proficiency || "Basic"})`
        : lang
    ));
  };

  const filteredWritingStyles = resumeData.writingStyles?.filter(style => style?.trim() !== "");
  const filteredSamples = resumeData.writingSamples?.filter(sample => sample?.title?.trim());

  return (
    <>
      <div className="template17-container">
        <div className="topbar">
          <h1>{safeRender(resumeData.name)}</h1>
          <h3>{resumeData.role?.replace("-", " ") || "Professional"}</h3>
        </div>

        <div className="content">
          <div className="sidebar">
            <div className="block">
              <h2>Contact</h2>
              <p>{safeRender(resumeData.email)}</p>
              <p>{safeRender(resumeData.phone)}</p>
            </div>

            {resumeData.skills?.length > 0 && (
              <div className="block">
                <h2>Skills</h2>
                <ul>
                  {resumeData.skills.map((skill, i) => (
                    <li key={i}>{safeRender(skill)}</li>
                  ))}
                </ul>
              </div>
            )}

            {formatLanguages(resumeData.languages)?.length > 0 && (
              <div className="block">
                <h2>Languages</h2>
                <ul>
                  {formatLanguages(resumeData.languages).map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="main">
            <div className="block">
              <h2>Summary</h2>
              <p>{safeRender(resumeData.summary)}</p>
            </div>

            {resumeData.experience?.length > 0 && (
              <div className="block">
                <h2>Work Experience</h2>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="sub-block">
                    <h4>{safeRender(exp.jobTitle)} at {safeRender(exp.company)}</h4>
                    <p><em>{safeRender(exp.years)}</em></p>
                    <p>{safeRender(exp.responsibilities)}</p>
                  </div>
                ))}
              </div>
            )}

            {resumeData.education?.length > 0 && (
              <div className="block">
                <h2>Education</h2>
                {resumeData.education.map((edu, i) => (
                  <p key={i}><strong>{safeRender(edu.degree)}</strong> - {safeRender(edu.institution)} ({safeRender(edu.year)})</p>
                ))}
              </div>
            )}

            {filteredSamples?.length > 0 && (
              <div className="block">
                <h2>Published Works</h2>
                {filteredSamples.map((s, i) => (
                  <p key={i}><strong>{safeRender(s.title)}</strong> - {safeRender(s.link)}</p>
                ))}
              </div>
            )}

            {filteredWritingStyles?.length > 0 && (
              <div className="block">
                <h2>Writing Styles</h2>
                <ul>
                  {filteredWritingStyles.map((style, i) => (
                    <li key={i}>{style}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="block">
              <h2>SEO Knowledge</h2>
              <p>{safeRender(resumeData.seoExperience)}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .template17-container {
          font-family: 'Segoe UI', Tahoma, sans-serif;
          background: #f4f6f8;
          color: #333;
          padding: 0;
          max-width: 1000px;
          margin: auto;
          border-radius: 8px;
          overflow: hidden;
        }

        .topbar {
          background: #1e88e5;
          color: #fff;
          padding: 20px 30px;
          text-align: center;
        }

        .topbar h1 {
          font-size: 32px;
          margin-bottom: 5px;
        }

        .topbar h3 {
          font-weight: 400;
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: row;
        }

        .sidebar {
          width: 30%;
          background: #e3f2fd;
          padding: 20px;
        }

        .main {
          width: 70%;
          padding: 20px 30px;
        }

        .block {
          margin-bottom: 30px;
        }

        .block h2 {
          font-size: 18px;
          color: #1976d2;
          margin-bottom: 10px;
          border-bottom: 2px solid #bbdefb;
          padding-bottom: 4px;
        }

        .sub-block {
          margin-bottom: 10px;
        }

        ul {
          margin-left: 20px;
        }

        li {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .content {
            flex-direction: column;
          }
          .sidebar, .main {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default Template17;
