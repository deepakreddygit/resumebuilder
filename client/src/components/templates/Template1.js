import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Template1.css";

function Template1({ resumeData }) {
  if (!resumeData) return <p>⏳ Loading Resume Data...</p>;

  // Ensure all fields are initialized properly
  const experience = resumeData.experience || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const certifications = resumeData.certifications || [];
  const projects = resumeData.projects || [];
  const languages = resumeData.languages || [];

  return (
    <Container className="resume-template template1 mt-5">
      <Row className="no-gutters">
        {/* Left Sidebar */}
        <Col md={4} className="resume_left p-4">
          {/* Profile Header */}
          <div className="profile-header text-center">
            <h2 className="profile-name">{resumeData.name || "Your Name"}</h2>
            <p className="profile-summary">{resumeData.summary || "Brief professional summary..."}</p>
          </div>

          {/* Contact Information */}
          <Card className="contact-card p-3">
            <Card.Body>
              <h4>Contact</h4>
              <p>📧 {resumeData.email || "your@email.com"}</p>
              <p>📞 {resumeData.phone || "Your Phone Number"}</p>
            </Card.Body>
          </Card>

          {/* Skills Section */}
          <Card className="skills-card p-3">
            <Card.Body>
              <h4>Skills</h4>
              <ul>
                {skills.length > 0 ? skills.map((skill, index) => <li key={index}>✔ {skill}</li>) : <li>No skills added</li>}
              </ul>
            </Card.Body>
          </Card>

          {/* Certifications */}
          <Card className="certifications-card p-3">
            <Card.Body>
              <h4>Certifications</h4>
              <ul>
                {certifications.length > 0 ? (
                  certifications.map((cert, index) => (
                    <li key={index}><strong>{cert.title}</strong> - {cert.issuer} ({cert.year})</li>
                  ))
                ) : (
                  <li>No certifications added</li>
                )}
              </ul>
            </Card.Body>
          </Card>

          {/* Languages */}
          <Card className="languages-card p-3">
            <Card.Body>
              <h4>Languages</h4>
              <ul>
                {languages.length > 0 ? (
                  languages.map((lang, index) => (
                    <li key={index}>{lang.language} - {lang.proficiency}</li>
                  ))
                ) : (
                  <li>No languages added</li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Main Content */}
        <Col md={8} className="resume_right p-4">
          {/* Work Experience */}
          <Card className="experience-card p-3">
            <Card.Body>
              <h2>Work Experience</h2>
              {experience.length > 0 ? (
                experience.map((exp, index) => (
                  <div key={index} className="work-item">
                    <h5>{exp.jobTitle || "Job Title"} - {exp.company || "Company Name"}</h5>
                    <p className="years">{exp.years || "Years"}</p>
                    <p>{exp.responsibilities || "Job Responsibilities"}</p>
                  </div>
                ))
              ) : (
                <p>No work experience added</p>
              )}
            </Card.Body>
          </Card>

          {/* Education */}
          <Card className="education-card p-3">
            <Card.Body>
              <h2>Education</h2>
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h5>{edu.degree}</h5>
                    <p>{edu.institution} ({edu.year})</p>
                  </div>
                ))
              ) : (
                <p>No education added</p>
              )}
            </Card.Body>
          </Card>

          {/* Projects */}
          <Card className="projects-card p-3">
            <Card.Body>
              <h2>Projects</h2>
              {projects.length > 0 ? (
                projects.map((proj, index) => (
                  <div key={index} className="project-item">
                    <h5>{proj.title}</h5>
                    <p>{proj.description}</p>
                  </div>
                ))
              ) : (
                <p>No projects added</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Template1;
