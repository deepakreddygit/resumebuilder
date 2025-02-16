import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Template1.css";

function Template1({ resumeData }) {
  if (!resumeData) return <p>⏳ Loading Resume Data...</p>;

  return (
    <Container className="resume-template mt-5">
      <Row>
        {/* Left Section - Sidebar */}
        <Col md={4} className="resume_left p-4">
          {/* Profile Header */}
          {/* Profile Header */}
          <div className="text-center profile-header">
            <h2 className="profile-name">{resumeData.name || "Your Name"}</h2> {/* ✅ Fixed Name Visibility */}
            <p className="profile-summary">{resumeData.summary || "Brief professional summary..."}</p>
          </div>
         

          {/* Contact Information */}
          <Card className="contact-card p-3">
            <Card.Body>
              <h4>Contact</h4>
              <div className="contact-info">
                <span>📧 {resumeData.email || "your@email.com"}</span>
                <span>📞 {resumeData.phone || "Your Phone Number"}</span>
              </div>
            </Card.Body>
          </Card>

          {/* Skills Section */}
          <Card className="skills-card p-3">
            <Card.Body>
              <h4>Skills</h4>
              <ul className="list-unstyled">
                {resumeData.skills?.length > 0 ? (
                  resumeData.skills.map((skill, index) => <li key={index}>• {skill}</li>)
                ) : (
                  <li>No skills added</li>
                )}
              </ul>
            </Card.Body>
          </Card>

          {/* Certifications */}
          <Card className="certifications-card p-3">
            <Card.Body>
              <h4>Certifications</h4>
              <ul className="list-unstyled">
                {resumeData.certifications?.length > 0 ? (
                  resumeData.certifications.map((cert, index) => (
                    <li key={index} className="certification-entry">
                      <strong>{cert.title || "Certification Title"}</strong> - {cert.issuer || "Issuer"} ({cert.year || "Year"})
                    </li>
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
              <ul className="list-unstyled">
                {resumeData.languages?.length > 0 ? (
                  resumeData.languages.map((lang, index) => (
                    <li key={index}>
                      {lang.language || "Language"} - {lang.proficiency || "Proficiency Level"}
                    </li>
                  ))
                ) : (
                  <li>No languages added</li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Section - Main Content */}
        <Col md={8} className="resume_right p-4">
          {/* Work Experience */}
          <Card className="experience-card p-3">
            <Card.Body>
              <h2>Work Experience</h2>
              {resumeData.experience?.length > 0 ? (
                resumeData.experience.map((exp, index) => (
                  <div key={index} className="work-item">
                    <h5>{exp.jobTitle || "Job Title"} - {exp.company || "Company Name"}</h5>
                    <p className="text-muted">{exp.years || "Years"}</p>
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
              {resumeData.education?.length > 0 ? (
                resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h5>{edu.degree || "Degree"}</h5>
                    <p>{edu.institution || "Institution"} ({edu.year || "Year"})</p>
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
              {resumeData.projects?.length > 0 ? (
                resumeData.projects.map((proj, index) => (
                  <div key={index} className="project-item">
                    <h5>{proj.title || "Project Title"}</h5>
                    <p>{proj.description || "Project Description"}</p>
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
