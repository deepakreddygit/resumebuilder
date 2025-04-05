import React from "react";
import { Accordion, Container } from "react-bootstrap";
import "../styles/Help.css";

function Help() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        background: "#eaf4ff",
        padding: "30px 0"
      }}
    >
      <Container style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: "600" }}>
          🛟 Help & Support
        </h2>

        <Accordion  defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header >🔐 How do I reset my password?</Accordion.Header>
            <Accordion.Body>
              Go to the login page → click on "Forgot Password" → follow the email instructions.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>📝 How do I edit a saved resume?</Accordion.Header>
            <Accordion.Body>
              Visit “Saved Resumes” and click ✏️ Edit below the resume you want to update.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>📥 How can I download my resume?</Accordion.Header>
            <Accordion.Body>
              On “Saved Resumes,” click the 📥 Download button to save as a PDF in A4 format.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>📧 How do I get support?</Accordion.Header>
            <Accordion.Body>
              You can email us at <strong>proresume1111@gmail.com</strong> or go to your Profile and reach out from there.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* ⬇️ End-user support section */}
        <div
          className="help-footer-box mt-5 p-4 text-center"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            border: "1px solid #e2e2e2",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >
          <h5>💬 Need more help?</h5>
          <p style={{ fontSize: "15px", color: "#555" }}>
            We’re here to help! Reach out via email or share your thoughts in our quick feedback form.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <a
              href="mailto:proresume1111@gmail.com"
              className="btn btn-primary"
              style={{ minWidth: "180px" }}
            >
              📧 Contact Support
            </a>

            <a
              href="https://forms.gle/fSCubmXBpRJJZRmx5" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ minWidth: "180px" }}
            >
              📝 Submit Feedback
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Help;
