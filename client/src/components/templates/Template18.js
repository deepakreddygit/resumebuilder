import React from "react";

function Template18({ resumeData }) {
  const safe = (val) =>
    !val || val === "undefined" || val.length === 0 ? "Not Provided" : val;

  const formatLanguages = (languages) => {
    return languages?.map((lang) =>
      typeof lang === "object" && lang.language
        ? `${lang.language} (${lang.proficiency || "Basic"})`
        : lang
    ) || [];
  };

  return (
    <>
      <div className="template18">
        <aside className="sidebar">
          <h1 className="name">{safe(resumeData.name)}</h1>
          <h3 className="role">{resumeData.role?.replace("-", " ") || "Professional"}</h3>
          <div className="contact">
            <p><strong>Email:</strong><br />{safe(resumeData.email)}</p>
            <p><strong>Phone:</strong><br />{safe(resumeData.phone)}</p>
          </div>
        </aside>

        <main className="main-content">
          <section className="section">
            <h2>Summary</h2>
            <p>{safe(resumeData.summary)}</p>
          </section>

          {resumeData.experience?.length > 0 && (
            <section className="section">
              <h2>Work Experience</h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="entry">
                  <h4>{safe(exp.jobTitle)} at {safe(exp.company)}</h4>
                  <p className="small">{safe(exp.years)}</p>
                  <p>{safe(exp.responsibilities)}</p>
                </div>
              ))}
            </section>
          )}

          {resumeData.education?.length > 0 && (
            <section className="section">
              <h2>Education</h2>
              {resumeData.education.map((edu, i) => (
                <p key={i}><strong>{safe(edu.degree)}</strong> – {safe(edu.institution)} ({safe(edu.year)})</p>
              ))}
            </section>
          )}

          {resumeData.skills?.length > 0 && (
            <section className="section">
              <h2>Skills</h2>
              <ul className="list">
                {resumeData.skills.map((skill, i) => (
                  <li key={i}>{safe(skill)}</li>
                ))}
              </ul>
            </section>
          )}

          {resumeData.writingSamples?.length > 0 && (
            <section className="section">
              <h2>Published Works</h2>
              {resumeData.writingSamples.map((sample, i) => (
                <p key={i}><strong>{safe(sample.title)}</strong> – {safe(sample.link)}</p>
              ))}
            </section>
          )}

          {resumeData.writingStyles?.filter(ws => ws.trim()).length > 0 && (
            <section className="section">
              <h2>Writing Styles</h2>
              <ul className="list">
                {resumeData.writingStyles.map((style, i) => (
                  <li key={i}>{safe(style)}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="section">
            <h2>SEO Knowledge</h2>
            <p>{safe(resumeData.seoExperience)}</p>
          </section>

          {formatLanguages(resumeData.languages).length > 0 && (
            <section className="section">
              <h2>Languages</h2>
              <ul className="list">
                {formatLanguages(resumeData.languages).map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>

      <style>{`
        .template18 {
          display: flex;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          background: #ffffff;
          max-width: 1000px;
          margin: 40px auto;
          border: 1px solid #e0e0e0;
          box-shadow: 0 0 12px rgba(0,0,0,0.06);
        }

        .sidebar {
          background: #f4f6f8;
          padding: 30px 20px;
          width: 280px;
          border-right: 1px solid #ccc;
        }

        .name {
          font-size: 26px;
          margin: 0 0 10px;
          color: #2c3e50;
        }

        .role {
          font-size: 16px;
          color: #888;
          margin-bottom: 25px;
        }

        .contact p {
          font-size: 14px;
          margin: 10px 0;
        }

        .main-content {
          flex: 1;
          padding: 30px;
        }

        .section {
          margin-bottom: 30px;
        }

        .section h2 {
          font-size: 18px;
          color: #1e88e5;
          margin-bottom: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 4px;
        }

        .entry {
          margin-bottom: 15px;
        }

        .entry h4 {
          font-size: 16px;
          margin: 0;
          font-weight: 600;
        }

        .entry .small {
          font-size: 13px;
          color: #666;
          margin-bottom: 5px;
        }

        .list {
          padding-left: 20px;
        }

        .list li {
          margin-bottom: 5px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .template18 {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ccc;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export default Template18;
