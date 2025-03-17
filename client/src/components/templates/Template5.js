import React from "react";

function Template5({ resumeData = {} }) {
  const styles = {
    resumeTemplate: {
      fontFamily: "'Poppins', sans-serif",
      maxWidth: "900px",
      margin: "0 auto",
      background: "#ffffff",
      padding: "40px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    resumeHeader: {
      textAlign: "center",
      marginBottom: "30px",
    },
    headerTitle: {
      fontSize: "40px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "5px",
      fontFamily: "'Montserrat', sans-serif",
      margin: "0",
      borderBottom: "2px solid #ddd",
      paddingBottom: "5px",
    },
    summary: {
      fontSize: "14px",
      color: "#444",
      maxWidth: "600px",
      margin: "0 auto",
      paddingTop: "20px",
      textAlign: "center",
    },
    resumeBody: {
      display: "flex",
      gap: "40px",
    },
    leftSection: {
      width: "35%",
      borderRight: "2px solid #ddd",
      paddingRight: "20px",
    },
    rightSection: {
      width: "65%",
      paddingLeft: "20px",
    },
    resumeSection: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      borderBottom: "2px solid #ddd",
      paddingBottom: "5px",
      marginBottom: "15px",
      textTransform: "uppercase",
    },
    text: {
      fontSize: "14px",
      color: "#444",
    },
    experienceItem: {
      marginBottom: "15px",
    },
    experienceTitle: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    company: {
      fontSize: "14px",
      color: "#666",
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
    },
    skillBadge: {
      background: "#000",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "20px",
      margin: "5px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.resumeTemplate}>
      {/* Header */}
      <div style={styles.resumeHeader}>
        <h1 style={styles.headerTitle}>{resumeData.name || "Your Name"}</h1>
        <p style={styles.summary}>{resumeData.summary || "Your professional summary..."}</p>
      </div>

      <div style={styles.resumeBody}>
        {/* Left Section */}
        <div style={styles.leftSection}>
          {/* Contact */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>📞 Contact</h2>
            <p><strong>Email:</strong> {resumeData.email || "your@email.com"}</p>
            <p><strong>Phone:</strong> {resumeData.phone || "Your Phone Number"}</p>
            <p><strong>Address:</strong> {resumeData.address || "Your Address"}</p>
          </div>

          {/* Investments */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>💰 Investments</h2>
            {(resumeData.investments || []).map((inv, index) => (
              <p key={index}>{inv.type || "Investment Type"} - 💵 {inv.amount || "Amount"}</p>
            ))}
          </div>

          {/* Financial Tools */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>📊 Financial Tools</h2>
            {(resumeData.financialTools || []).map((tool, index) => (
              <p key={index}>{tool.name || "Financial Tool"}</p>
            ))}
          </div>

          {/* Languages */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>🌍 Languages</h2>
            {(resumeData.languages || []).map((lang, index) => (
              <p key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</p>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          {/* Work Experience - Only Show if There is Data */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div style={styles.resumeSection}>
              <h2 style={styles.sectionTitle}>💼 Experiences</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} style={styles.experienceItem}>
                  <h3 style={styles.experienceTitle}>{exp.jobTitle || "Job Title"}</h3>
                  <p style={styles.company}>{exp.company || "Company Name"} ({exp.years || "Years"})</p>
                  <p style={styles.text}>{exp.responsibilities || "Job Responsibilities"}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>🎓 Education</h2>
            {(resumeData.education || []).map((edu, index) => (
              <div key={index} style={styles.experienceItem}>
                <h3 style={styles.experienceTitle}>{edu.degree || "Degree"}</h3>
                <p style={styles.company}>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>🛠 Skills</h2>
            <div style={styles.skillsList}>
              {(resumeData.skills || []).map((skill, index) => (
                <span key={index} style={styles.skillBadge}>{skill || "Skill"}</span>
              ))}
            </div>
          </div>

          {/* Budget & Risk Management */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>📉 Budget & Risk Management</h2>
            <p style={styles.text}>{resumeData.budgetExperience || "Describe your experience in budget & risk management"}</p>
          </div>

          {/* Leadership & Strategy */}
          <div style={styles.resumeSection}>
            <h2 style={styles.sectionTitle}>🚀 Leadership & Strategy</h2>
            <p style={styles.text}>{resumeData.leadershipExperience || "Describe your leadership experience and strategies"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template5;
