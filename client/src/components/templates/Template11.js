import React from "react";

function Template11({ resumeData }) {
  if (!resumeData) return <p className="loading-text">⏳ Loading Resume Data...</p>;

  return (
    <>
      <div className="resume-container">
        {/* Header */}
        <header className="resume-header">
          <h1>{resumeData.name || "Your Name"}</h1>
        </header>

        {/* Main Resume Body */}
        <div className="resume-content">
          {/* Sidebar */}
          <aside className="resume-sidebar">
            <section className="sidebar-section">
              <h2>CONTACT</h2>
              <p>{resumeData.email || "your@email.com"}</p>
              <p>{resumeData.phone || "Your Phone Number"}</p>
            </section>

            <section className="sidebar-section">
              <h2>EDUCATION</h2>
              {resumeData.education?.map((edu, index) => (
                <div key={index} className="education-item">
                  <p><strong>{edu.degree}</strong></p>
                  <p>{edu.institution}</p>
                  <p>{edu.year}</p>
                </div>
              ))}
            </section>

            <section className="sidebar-section">
              <h2>SKILLS</h2>
              <ul>
                {resumeData.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-section">
              <h2>LANGUAGES</h2>
              <ul>
                {resumeData.languages?.map((lang, index) => (
                  <li key={index}>{lang.language} ({lang.proficiency})</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-section">
              <h2>SALES TOOLS & TECH</h2>
              <ul>
                {resumeData.salesTools?.map((toolObj, index) => (
                  <li key={index}>{toolObj.tool}</li>
                ))}
              </ul>
            </section>

            <section className="sidebar-section">
              <h2>REVENUE GROWTH</h2>
              {resumeData.revenueGrowth?.length > 0 ? (
                resumeData.revenueGrowth.map((item, index) => (
                  <p key={index}>{item.achievement}</p>
                ))
              ) : (
                <p>No revenue growth achievements documented</p>
              )}
            </section>
          </aside>

          {/* Main Section */}
          <main className="resume-main">
            <section className="resume-section">
              <h2>PROFILE</h2>
              <p>{resumeData.summary || "Brief professional summary..."}</p>
            </section>

            <section className="resume-section">
              <h2>PROFESSIONAL EXPERIENCE</h2>
              {resumeData.experience?.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>{exp.jobTitle} | {exp.company}</h3>
                  <p className="date">{exp.years}</p>
                  <ul>
                    {Array.isArray(exp.responsibilities) ? (
                      exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))
                    ) : (
                      <p>{exp.responsibilities}</p>
                    )}
                  </ul>
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2 className="sales-strategies">SALES STRATEGIES</h2>
              {resumeData.salesStrategies?.map((strategy, index) => (
                <div key={index}>
                  <h3>{strategy.strategy}</h3>
                  <p>{strategy.impact}</p>
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2 className="client-acquisition">CLIENT ACQUISITION</h2>
              {resumeData.clientAcquisition?.map((client, index) => (
                <div key={index}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{client.method}</h3>
                  <p>{client.successRate}</p>
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2>NEGOTIATION EXPERIENCE</h2>
              {resumeData.negotiationExperience?.map((negotiation, index) => (
                <div key={index}>
                  <p>{negotiation.scenario}</p>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      {/* Inline CSS for Template11 */}
      <style>{`
        .resume-container {
          max-width: 900px;
          margin: 40px auto;
          background: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .resume-header {
          text-align: center;
          background: #333;
          color: white;
          padding: 20px;
          margin-bottom: 20px;
        }

        .resume-header h1 {
          margin: 0;
          font-size: 28px;
        }

        .resume-content {
          display: flex;
          gap: 20px;
        }

        .resume-sidebar {
          width: 30%;
          background: #f8f8f8;
          padding: 20px;
        }

        .sidebar-section h2 {
          font-size: 18px;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        .resume-main {
          width: 70%;
        }

        .resume-section {
          margin-bottom: 20px;
        }

        .resume-section h2 {
          font-size: 20px;
          color: #333;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
        }

        .experience-item h3 {
          font-size: 18px;
          margin: 5px 0;
        }

        .experience-item .date {
          font-size: 14px;
          color: gray;
        }

        .experience-item ul {
          padding-left: 20px;
        }

        .sales-strategies h2,
        .digital-marketing {
          font-size: 16px;
          font-weight: bold;
        }

        .client-acquisition {
          font-size: 16px !important;
          font-weight: 700 !important;
          font-family: 'Arial Black', Arial, sans-serif !important;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          font-size: 14px;
          background: #f8f8f8;
        }

        @media screen and (max-width: 768px) {
          .resume-content {
            flex-direction: column;
          }

          .resume-sidebar, .resume-main {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default Template11;
