import React from "react";

function Template6({ resumeData = {} }) {
  const styles = {
    resumeContainer: {
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      backgroundColor: "#0c2b43",
      color: "white",
      textAlign: "center",
      padding: "20px",
      borderRadius: "8px 8px 0 0",
    },
    headerTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    summary: {
      fontSize: "1rem",
      marginTop: "10px",
    },
    mainContent: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      padding: "30px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    leftColumn: {
      flex: "1",
      minWidth: "300px",
    },
    rightColumn: {
      flex: "1",
      minWidth: "300px",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: "#1e73be",
      borderBottom: "2px solid #1e73be",
      paddingBottom: "5px",
      marginBottom: "10px",
    },
    skillsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    badge: {
      border: "1px solid #1e73be",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "0.9rem",
    },
    experienceItem: {
      marginBottom: "15px",
    },
    experienceTitle: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    company: {
      fontSize: "0.9rem",
      fontWeight: "bold",
      color: "#555",
    },
    responsibilities: {
      paddingLeft: "20px",
    },
    contactInfo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginTop: "10px",
      flexWrap: "wrap",
    },
    responsive: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
    },
  };

  return (
    <div style={styles.resumeContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>{resumeData.name || "Your Name"}</h1>
        <p style={styles.summary}>{resumeData.summary || "Your Professional Summary"}</p>
        <div style={styles.contactInfo}>
          <span>{resumeData.phone || "Your Phone Number"}</span>
          <span>{resumeData.email || "your@email.com"}</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Education */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🎓 Education</h3>
            {(resumeData.education || []).length > 0 ? (
              resumeData.education.map((edu, index) => (
                <div style={styles.experienceItem} key={index}>
                  <h4>{edu.degree || "Degree"}</h4>
                  <p style={styles.company}>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
                </div>
              ))
            ) : <p>No education added.</p>}
          </section>

          {/* Skills */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🛠 Skills</h3>
            <div style={styles.skillsList}>
              {(resumeData.skills || []).length > 0 ? (
                resumeData.skills.map((skill, index) => (
                  <span style={styles.badge} key={index}>{skill}</span>
                ))
              ) : <p>No skills added.</p>}
            </div>
          </section>

    {/* Work Experience - Only Show if There is Data */}
{resumeData.experience &&
  resumeData.experience.length > 0 &&
  resumeData.experience.some((exp) => exp.jobTitle?.trim()) && (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>💼 Work Experience</h3>
      {resumeData.experience.map((exp, index) => 
        exp.jobTitle?.trim() ? (
          <div style={styles.experienceItem} key={index}>
            <h4>{exp.jobTitle}</h4>
            <p style={styles.company}>{exp.company || "Company Name"} ({exp.years || "Years"})</p>
            <ul style={styles.responsibilities}>
              {(Array.isArray(exp.responsibilities) ? exp.responsibilities : []).map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        ) : null // Skip rendering if job title is missing
      )}
    </section>
)}


          {/* Languages */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🌍 Languages</h3>
            <ul>
              {(resumeData.languages || []).length > 0 ? (
                resumeData.languages.map((lang, index) => (
                  <li key={index}>{lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}</li>
                ))
              ) : <p>No languages added.</p>}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Investments */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>💰 Investments</h3>
            {(resumeData.investments || []).length > 0 ? (
              resumeData.investments.map((inv, index) => (
                <p key={index}>{inv.type || "Investment Type"} - 💵 {inv.amount || "Amount"}</p>
              ))
            ) : <p>No investments added.</p>}
          </section>

          {/* Financial Tools */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📊 Financial Tools</h3>
            <div style={styles.skillsList}>
              {(resumeData.financialTools || []).length > 0 ? (
                resumeData.financialTools.map((tool, index) => (
                  <span style={styles.badge} key={index}>{tool.name || "Financial Tool"}</span>
                ))
              ) : <p>No financial tools added.</p>}
            </div>
          </section>

          {/* Budget & Risk Management */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📉 Budget & Risk Management</h3>
            <p>{resumeData.budgetExperience || "No budget experience provided."}</p>
          </section>

          {/* Leadership & Strategy */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🚀 Leadership & Strategy</h3>
            <p>{resumeData.leadershipExperience || "No leadership experience provided."}</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Template6;
