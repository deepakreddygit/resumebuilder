import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import { FaLightbulb } from "react-icons/fa";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);

  const showAbout = location.pathname === "/login" || location.pathname === "/signup";
  const showLogin = location.pathname === "/about";
  const isResumeBuilderPage = location.pathname.includes("/resume-builder");

  const getRoleFromPath = () => {
    const match = location.pathname.match(/\/resume-builder\/(.+?)\//);
    return match ? match[1] : null;
  };

  const role = getRoleFromPath();

  const tipsByRole = {
    "software-engineer": [
      "Mention key programming languages and frameworks you specialize in — for example: JavaScript, React, Node.js, Python, or Java. Be specific about your tech stack.",
      "Highlight problem-solving or algorithmic thinking — such as optimizing performance, fixing production bugs, or building efficient systems.",
      "Include links to your GitHub, portfolio, or live projects to showcase real-world applications of your code. Recruiters love proof of hands-on work.",
      "Wherever possible, quantify your technical impact. For example: “Reduced load time by 30%” or “Automated deployment process saving 3 hours per week.”",
      "Mention your familiarity with version control tools like Git, and your experience with Agile/Scrum development practices."
    ],
  
    "financial-manager": [
      "Emphasize your ability to drive financial impact — such as improving forecasting accuracy, reducing operational costs, or optimizing cash flow.",
      "Mention financial tools and systems you've worked with like SAP, QuickBooks, Oracle, or advanced Excel modeling. This adds credibility to your technical skill set.",
      "Highlight regulatory compliance experience such as SOX, GAAP, or internal/external audits — especially if your work ensured zero exceptions or passed inspections.",
      "Quantify your work: “Managed $5M in annual budgets” or “Increased forecast accuracy by 15%.” Numbers make a strong impression.",
      "Include any financial certifications you hold — such as CMA, CPA, or CFA. They’re highly valued in senior finance roles."
    ],
  
    "marketing-manager": [
      "Describe marketing campaigns you've led, and quantify the results — for example: 'Increased lead generation by 45% through a targeted email campaign.'",
      "List tools and platforms you've used such as Google Analytics, HubSpot, Mailchimp, or Facebook/Instagram Ads Manager.",
      "Highlight your skills in both creative and analytical marketing — such as building content strategies, managing SEO/SEM, or running A/B tests.",
      "Include any leadership experience you have, like managing a marketing team, coordinating with vendors, or overseeing brand guidelines.",
      "Show versatility — if you’ve worked across social media, events, email, and content, mention that range to show your value as a full-stack marketer."
    ],
  
    "sales-manager": [
      "Showcase specific revenue growth or targets achieved — e.g., 'Exceeded quarterly sales targets by 20%' or 'Generated $1.2M in new business.'",
      "Mention your familiarity with CRM tools like Salesforce, Zoho CRM, or HubSpot — and how you used them to track pipeline and close deals.",
      "Talk about how you improve processes — like reducing the sales cycle time, increasing team efficiency, or improving customer retention.",
      "Demonstrate your leadership by mentioning team size managed, coaching or onboarding practices, and how you’ve motivated your team to hit goals.",
      "Include awards, incentives, or recognition — like 'Top Sales Manager Q1 2024' or 'President’s Club achiever.' These validate performance."
    ],
    "healthcare-professional": [
    "Highlight your clinical skills (e.g., phlebotomy, patient care, medical charting, or EHR systems like Epic or Cerner). Be specific to your specialization.",
    "Mention your healthcare certifications such as BLS, ACLS, CNA, or RN — and ensure you include issuing organizations and expiry dates if applicable.",
    "Describe your experience in direct patient care, treatment planning, or administrative support — especially in hospital, clinic, or elder care settings.",
    "Use metrics if possible: 'Assisted 50+ patients per shift' or 'Reduced patient intake time by 25% with streamlined documentation.'",
    "Show soft skills too — compassion, adaptability, communication, and handling high-stress situations are key traits in healthcare."
  ],
  "content-writer": [
    "Highlight your writing niches — e.g., marketing, wellness, tech, education — and the tone/style you excel in (technical, conversational, SEO, etc.).",
    "Include links to published works — blogs, articles, or web content — on platforms like Medium, company blogs, or publications.",
    "Showcase SEO experience: keyword research, meta descriptions, internal linking, and tools like SEMrush, Ahrefs, or Yoast.",
    "Mention tools you’ve used: WordPress, Grammarly, Google Docs, Trello, or content calendars — and how you’ve collaborated with marketing/design teams.",
    "Use quantifiable impact: 'Increased blog traffic by 40%' or 'Ranked top 3 on Google for 5 competitive keywords.' Results boost credibility."
  ]


  };
  

  const roleTips = tipsByRole[role] || [
    "Use action verbs like 'Led', 'Improved', 'Developed'",
    "Quantify your achievements wherever possible",
    "Keep the summary short and focused",
    "Tailor your resume to match the job description"
  ];

  const handleLogout = () => {
    setShowModal(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="top-nav navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              src="/assets/images/logos/Logo.png"
              alt="Resume Builder Logo"
              className="navbar-logo"
            />
          </div>

          {showAbout && (
  <Link
    to="/about"
    className="btn btn-outline-light"
    style={{
      marginLeft: "auto",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "8px",
      color: "white",
      border: "2px solid white",
      backgroundColor: "transparent",
      transition: "all 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#212529";
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "white";
    }}
  >
    About
  </Link>
)}


          {showLogin && (
            <Link
              to="/login"
              className="btn btn-outline-light"
              style={{
                marginLeft: "auto",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                border: "2px solid white",
                color: "white",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#333";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              Login
            </Link>
          )}

          {isResumeBuilderPage && (
            <button
              className="btn btn-outline-light"
              onClick={() => setShowTipsModal(true)}
              title="Writing Tips"
              style={{
                marginLeft: "auto",
                marginRight: "1rem",
                padding: "10px 14px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <FaLightbulb style={{ marginRight: "8px" }} /> Tips
            </button>
          )}

          {isAuthenticated && (
            <button
              className="btn btn-outline-light logout-btn"
              onClick={() => setShowModal(true)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "8px",
                border: "2px solid white",
                color: "white",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#333";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          )}
        </div>
      </nav>

      {/* Tips Modal */}
      <Modal
        show={showTipsModal}
        onHide={() => setShowTipsModal(false)}
        centered
        dialogClassName="tips-modal-style"
        backdrop="static"
        keyboard={true}
      >
        <Modal.Body className="text-center p-4">
          <div
            style={{
              animation: "fadeInZoom 0.4s ease",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
              padding: "35px 30px",
              margin: "0 auto",
              minWidth: "520px",
              maxWidth: "700px",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.8rem",
                marginBottom: "25px",
                color: "#333",
              }}
            >
              💡 Resume Writing Tips
            </h3>
            <ul
              style={{
                textAlign: "left",
                paddingLeft: "1.6rem",
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              {roleTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <Button
              onClick={() => setShowTipsModal(false)}
              style={{
                marginTop: "30px",
                padding: "10px 26px",
                fontWeight: "600",
                fontSize: "15px",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
              }}
            >
              Got it!
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Logout Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{
          backdropFilter: "blur(5px)",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f8f9fa",
            borderBottom: "2px solid #dee2e6",
            padding: "15px",
          }}
        >
          <Modal.Title
            style={{ fontWeight: "600", fontSize: "18px", color: "#333" }}
          >
            Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontSize: "16px",
            color: "#555",
            padding: "20px",
            textAlign: "center",
          }}
        >
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "2px solid #dee2e6",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "5px",
              border: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn-danger"
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "5px",
              border: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;