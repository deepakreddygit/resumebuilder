import React from "react";

function Template12({ resumeData }) {
  if (!resumeData)
    return <p className="loading-text">⏳ Loading Resume Data...</p>;

  const formatLanguages = (languages) => {
    if (!languages || !languages.length) return [];
    return languages.map((lang) => {
      if (typeof lang === "string") return lang;
      if (typeof lang === "object") {
        try {
          if (lang.language && lang.proficiency) {
            return `${lang.language} (${lang.proficiency})`;
          }
          const parsed = JSON.parse(JSON.stringify(lang));
          if (parsed.language && parsed.proficiency) {
            return `${parsed.language} (${parsed.proficiency})`;
          }
        } catch (e) {
          return JSON.stringify(lang);
        }
      }
      return String(lang);
    });
  };

  const formatTools = (tools) => {
    if (!tools || !tools.length) return [];
    return tools.map((tool) => {
      if (typeof tool === "string") return tool;
      if (typeof tool === "object") {
        try {
          if (tool.tool) return tool.tool;
          const parsed = JSON.parse(JSON.stringify(tool));
          if (parsed.tool) return parsed.tool;
        } catch (e) {
          return JSON.stringify(tool);
        }
      }
      return String(tool);
    });
  };

  const safeRender = (data) => {
    if (data === null || data === undefined) return "No details provided";
    if (typeof data === "string") return data;
    if (typeof data === "object") return JSON.stringify(data);
    return String(data);
  };

  const formattedLanguages = formatLanguages(resumeData.languages);
  const formattedTools = formatTools(resumeData.salesTools);

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
                  <div className="job-header">
                    <h4>
                      {safeRender(exp.jobTitle)} | {safeRender(exp.company)}
                    </h4>
                    <p className="date">{safeRender(exp.years)}</p>
                  </div>
                  {Array.isArray(exp.responsibilities) ? (
                    <ul>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{safeRender(resp)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{safeRender(exp.responsibilities)}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="section">
              <h2>SALES STRATEGIES</h2>
              {resumeData.salesStrategies?.map((item, index) => (
                <div key={index}>
                  <h3>{item.strategy}</h3>
                  <p>{item.impact}</p>
                </div>
              ))}
            </div>

            <div className="section">
              <h2>CLIENT ACQUISITION</h2>
              {resumeData.clientAcquisition?.map((item, index) => (
                <div key={index}>
                  <h3>{item.method}</h3>
                  <p>{item.successRate}</p>
                </div>
              ))}
            </div>

            <div className="section">
              <h2>NEGOTIATION EXPERIENCE</h2>
              {resumeData.negotiationExperience?.map((item, index) => (
                <div key={index}>
                  <p>{item.scenario}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar">
            <div className="sidebar-section">
              <h4>CONTACT</h4>
              <p>{resumeData.email}</p>
              <p>{resumeData.phone}</p>
              <p>{resumeData.location}</p>
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

            {formattedTools.length > 0 && (
              <div className="sidebar-section">
                <h4>SALES TOOLS</h4>
                <ul>
                  {formattedTools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}

            {resumeData.revenueGrowth?.length > 0 && (
              <div className="sidebar-section">
                <h4>REVENUE GROWTH</h4>
                <ul>
                  {resumeData.revenueGrowth.map((item, i) => (
                    <li key={i}>{item.achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline Styles for Template12 */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        .template-wrapper { max-width: 1000px; margin: auto; background: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .container { display: flex; flex-direction: row; min-height: 100vh; }
        .main-content { width: 65%; padding: 30px; background: #fff; }
        .sidebar { width: 35%; background: #f7c9c9; padding: 30px; }
        .name { font-size: 24px; color: #6a0136; font-weight: bold; border-bottom: 1px solid #6a0136; margin-bottom: 15px; padding-bottom: 5px; }
        .section, .sidebar-section { margin-bottom: 25px; padding-bottom: 8px; border-bottom: 1px solid #6a0136; }
        .section h2, .sidebar-section h4 { font-size: 16px; color: #6a0136; text-transform: uppercase; margin-bottom: 10px; }
        .experience-item { margin-bottom: 10px; }
        .job-header h4 { font-size: 15px; font-weight: bold; display: inline; color: #333; }
        .date { color: #6a0136; font-style: italic; }
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

export default Template12;
