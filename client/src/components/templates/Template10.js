import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Template10({ resumeData }) {
  if (!resumeData) return <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#555" }}>⏳ Loading Resume Data...</p>;

  const styles = {
    templateWrapper: {
      background: "#f5f7fa",
      padding: "40px",
      borderRadius: "10px",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      maxWidth: "1000px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: "20px",
    },
    leftSidebar: {
      background: "linear-gradient(135deg, #001f3f, #0048a3)",
      color: "#ffffff",
      padding: "25px",
      borderRadius: "10px",
      textAlign: "center",
      width: "35%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    rightContent: {
      background: "#ffffff",
      borderRadius: "10px",
      padding: "25px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      flex: "1",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    card: {
      borderRadius: "10px",
      background: "#ffffff",
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
      padding: "20px",
    },
    header: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "10px",
      letterSpacing: "1px",
      color: "#ffffff",
    },
    sectionHeader: {
      color: "#0048a3",
      fontSize: "20px",
      fontWeight: "bold",
      borderBottom: "2px solid #0048a3",
      paddingBottom: "5px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    icon: {
      fontSize: "20px",
    },
    list: {
      paddingLeft: "0",
      fontSize: "16px",
      listStyle: "none",
      margin: "0",
    },
    listItem: {
      padding: "5px 0",
      fontWeight: "500",
      color: "#444",
    },
    jobTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#222",
    },
    company: {
      fontSize: "16px",
      color: "#0048a3",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.templateWrapper}>
      <div style={styles.container}>
        {/* Left Sidebar */}
        <div style={styles.leftSidebar}>
          <h2 style={styles.header}>{resumeData.name || "Your Name"}</h2>
          <p>{resumeData.summary || "Brief professional summary..."}</p>


          <Card style={styles.card}>
            <Card.Body>
              <h4 style={styles.sectionHeader}>📞 Contact</h4>
              <p>📧 {resumeData.email || "your@email.com"}</p>
              <p>📞 {resumeData.phone || "Your Phone Number"}</p>
            </Card.Body>
          </Card>


          <Card style={styles.card}>
            <Card.Body>
              <h4 style={styles.sectionHeader}>💡 Skills</h4>
              <ul style={styles.list}>
                {resumeData.skills?.length > 0 ? (
                  resumeData.skills.map((skill, index) => <li key={index} style={styles.listItem}>✔ {skill}</li>)
                ) : (
                  <li style={styles.listItem}>No skills added</li>
                )}
              </ul>
            </Card.Body>
          </Card>

          {/* Languages */}
          <Card style={styles.card}>
            <Card.Body>
              <h4 style={styles.sectionHeader}>🌍 Languages</h4>
              <ul style={styles.list}>
                {resumeData.languages?.length > 0 ? (
                  resumeData.languages.map((lang, index) => (
                    <li key={index} style={styles.listItem}>{lang.language} - {lang.proficiency}</li>
                  ))
                ) : (
                  <li style={styles.listItem}>No languages added</li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </div>

        {/* Right Main Content */}
        <div style={styles.rightContent}>
          {/* Education */}
          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>🎓 Education</h2>
              {resumeData.education.map((edu, index) => (
                <p key={index}><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</p>
              ))}
            </Card.Body>
          </Card>

{resumeData.experience && resumeData.experience.length > 0 && (
  <Card style={styles.card}>
    <Card.Body>
      <h2 style={styles.sectionHeader}>💼 Work Experience</h2>
      {resumeData.experience.map((exp, index) => (
        <div key={index}>
          <h5 style={styles.jobTitle}>{exp.jobTitle || "Job Title"}</h5>
          <p style={styles.company}>{exp.company} | {exp.years}</p>
          <p>{exp.responsibilities}</p>
        </div>
      ))}
    </Card.Body>
  </Card>
)}


          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>📈 Revenue Growth Achievements</h2>
              {resumeData.revenueGrowth.map((achievement, index) => (
                <p key={index}>{achievement.achievement}</p>
              ))}
            </Card.Body>
          </Card>


          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>📊 Sales Strategies</h2>
              {resumeData.salesStrategies.map((strategy, index) => (
                <p key={index}><strong>{strategy.strategy}:</strong> {strategy.impact}</p>
              ))}
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>🎯 Client Acquisition</h2>
              {resumeData.clientAcquisition.map((client, index) => (
                <p key={index}><strong>{client.method}:</strong> {client.successRate}</p>
              ))}
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>🔧 Sales Tools & Technologies</h2>
              {resumeData.salesTools.map((tool, index) => <p key={index}>{tool.tool}</p>)}
            </Card.Body>
          </Card>


          <Card style={styles.card}>
            <Card.Body>
              <h2 style={styles.sectionHeader}>🤝 Negotiation Experience</h2>
              {resumeData.negotiationExperience.map((negotiation, index) => <p key={index}>{negotiation.scenario}</p>)}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Template10;
