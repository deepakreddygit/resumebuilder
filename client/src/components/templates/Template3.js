import React from "react";

const Template3 = ({ resumeData }) => {
  if (!resumeData) return <p>⏳ Loading Resume Data...</p>;

  // Inline styles
  const styles = {
    resumeContainer: {
      maxWidth: "900px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Arial', sans-serif",
    },
    resumeHeader: {
      textAlign: "center",
      paddingBottom: "20px",
    },
    profileName: {
      fontSize: "32px",
      margin: "0",
    },
    contactInfo: {
      marginTop: "10px",
      fontSize: "14px",
    },
    contactInfoSpan: {
      display: "block",
      marginBottom: "5px",
    },
    section: {
      marginBottom: "20px",
    },
    sectionHeader: {
      background: "brown",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
    },
    entry: {
      padding: "10px",
      background: "#f9f9f9",
      borderLeft: "5px solid brown",
      marginTop: "10px",
      borderRadius: "5px",
    },
    entryTitle: {
      fontSize: "16px",
      color: "#333",
      fontWeight: "bold",
    },
    entryText: {
      margin: "5px 0",
      fontSize: "14px",
      color: "#666",
    },
    list: {
      paddingLeft: "20px",
      margin: "10px 0",
    },
    listItem: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "5px",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
    },
    leftColumn: {
      flex: "1",
      minWidth: "250px",
    },
    rightColumn: {
      flex: "2",
      minWidth: "400px",
    },
  };

  return (
    <div style={styles.resumeContainer}>
      {/* Header Section */}
      <div style={styles.resumeHeader}>
        <h1 style={styles.profileName}>{resumeData.name || "Your Name"}</h1>
        <div style={styles.contactInfo}>
          <span style={styles.contactInfoSpan}>
            📧 {resumeData.email || "your@email.com"}
          </span>
          <span style={styles.contactInfoSpan}>
            📞 {resumeData.phone || "Your Phone Number"}
          </span>
        </div>
      </div>

      {/* Resume Content */}
      <div style={styles.resumeBody}>
        <div style={styles.row}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            {/* Education Section */}
            <div style={styles.section}>
              <h4 style={styles.sectionHeader}>EDUCATION</h4>
              {resumeData.education?.length > 0 ? (
                resumeData.education.map((edu, index) => (
                  <div key={index} style={styles.entry}>
                    <strong style={styles.entryTitle}>
                      {edu.program || "Degree"}
                    </strong>
                    <p style={styles.entryText}>{edu.institution || "Institution Name"}</p>
                    <p style={styles.entryText}>{edu.year || "Year"}</p>
                  </div>
                ))
              ) : (
                <p>No education added</p>
              )}
            </div>

              {/* Skills Section */}
              <div style={styles.section}>
              <h4 style={styles.sectionHeader}>SKILLS</h4>
              <ul style={styles.list}>
                {(resumeData.skills || ["JavaScript", "React", "Node.js", "SQL & NoSQL Databases"]).map((skill, index) => (
                  <li key={index} style={styles.listItem}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Professional Development */}
            <div style={styles.section}>
              <h4 style={styles.sectionHeader}>PROFESSIONAL DEVELOPMENT</h4>
              {resumeData.projects?.length > 0 ? (
                resumeData.projects.map((dev, index) => (
                  <div key={index} style={styles.entry}>
                    <strong style={styles.entryTitle}>
                      {dev.title || "Development Title"}
                    </strong>
                    <p style={styles.entryText}>{dev.description || "Description"}</p>
                  </div>
                ))
              ) : (
                <p>No professional development added</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* Summary */}
            <div style={styles.section}>
              <h4 style={styles.sectionHeader}>PROFESSIONAL SUMMARY</h4>
              <p style={styles.entryText}>{resumeData.summary || "Brief professional summary..."}</p>
            </div>

            {/* Work Experience */}
            <div style={styles.section}>
              <h4 style={styles.sectionHeader}>WORK EXPERIENCE</h4>
              {resumeData.experience?.length > 0 ? (
                resumeData.experience.map((job, index) => (
                  <div key={index} style={styles.entry}>
                    <strong style={styles.entryTitle}>
                      {job.jobTitle || "Job Title"}
                    </strong>{" "}
                    - {job.company || "Company Name"}
                    <p style={styles.entryText}>{job.years || "Years"}</p>
                    <p style={styles.entryText}>{job.responsibilities || "Job Responsibilities"}</p>
                  </div>
                ))
              ) : (
                <p>No work experience added</p>
              )}
            </div>

            {/* Certifications */}
            <div style={styles.section}>
              <h4 style={styles.sectionHeader}>CERTIFICATIONS</h4>
              {resumeData.certifications?.length > 0 ? (
                resumeData.certifications.map((cer, index) => (
                  <div key={index} style={styles.entry}>
                    <strong style={styles.entryTitle}>
                      {cer.title || "Certification Title"}
                    </strong>
                    <p style={styles.entryText}>{cer.issuer || "Issuer Name"}</p>
                    <p style={styles.entryText}>{cer.year || "Year"}</p>
                  </div>
                ))
              ) : (
                <p>No certifications added</p>
              )}
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
