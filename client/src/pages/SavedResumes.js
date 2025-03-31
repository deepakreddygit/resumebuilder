import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserResumes, deleteResume } from "../api";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SavedResumes.css";


const isRecentlyUpdated = (timestamp) => {
  if (!timestamp) return false;
  const updatedDate = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - updatedDate;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours <= 72;
};

const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  // Parse as UTC
  const utcDate = new Date(timestamp + "Z"); // "Z" forces UTC

  // Convert to America/New_York time
  return utcDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};


const getRelativeTime = (timestamp) => {
  if (!timestamp) return "";

  const utcDate = new Date(timestamp + "Z"); // parse as UTC
  const now = new Date(); // local time (browser time)

  // Adjust `now` to Eastern Time (Ohio)
  const offset = -new Date().getTimezoneOffset() / 60;
  const easternOffset = -4; // EDT is UTC-4, EST is UTC-5 — adjust for daylight saving as needed
  const diffInMs = now - utcDate;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `Updated ${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days === 1) return "Updated yesterday";
  return `Updated ${days} days ago`;
};



function SavedResumes() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [savedBasicData, setSavedBasicData] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    getUserResumes(userId)
      .then((res) => {
        setResumes(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resumes. Please try again.");
        setLoading(false);
      });

    const resumeToast = localStorage.getItem("resumeToast");
    if (resumeToast) {
      toast.success(resumeToast, { autoClose: 3000 });
      localStorage.removeItem("resumeToast");
    }
  }, [userId, navigate]);

  const handleShowModal = (resumeId) => {
    setSelectedResumeId(resumeId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedResumeId) return;
    setShowModal(false);
  
    try {
     
      const result = await deleteResume(selectedResumeId, userId);
  
      if (result.error) {
        toast.error(`${result.error}`);
        return;
      }
  
      toast.success("Resume deleted successfully!", { autoClose: 3000 });
  

      setResumes((prevResumes) => prevResumes.filter((r) => r.resume_id !== selectedResumeId));
  

      if (result.updatedProfile) {
        setSavedBasicData(result.updatedProfile);
      } else {
        setSavedBasicData(null); 
      }
  
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume.");
    }
  };
  

  const handleEdit = (resume) => {
    if (!resume.resume_id || !resume.templateNumber) {
      toast.error("Template selection is missing!");
      return;
    }
    navigate(`/resume/edit/${resume.resume_id}/${resume.templateNumber}`);
  };

  const handlePreview = (resume) => {
    if (!resume.resume_id || !resume.templateNumber) {
      toast.error("Template selection is missing!");
      return;
    }
    navigate(`/resume-preview/${resume.resume_id}/${resume.templateNumber}`, {
      state: { resumeData: resume },
    });
  };

  // Role icons and names mapping
  const roleIcons = {
    "software-engineer": { icon: "💻", name: "Software Engineer" },
    "financial-manager": { icon: "📊", name: "Financial Manager" },
    "marketing-manager": { icon: "📢", name: "Marketing Manager" },
    "sales-manager": { icon: "📈", name: "Sales Manager" },
  };

  // Template names mapping
  const templateNames = {
    "1": "Modern",
    "2": "Professional",
    "3": "Creative",
    "4": "Elegant",
    "5": "Minimal",
    "6": "Compact",
    "7": "Stylish",
    "8": "Classic",
  };

  if (loading) return <div>Loading saved resumes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="saved-resumes-container">
      <h2 className="saved-resumes-title">Saved Resumes</h2>

      <div className="saved-resumes-grid">
        {resumes.length > 0 ? (
          resumes.map((resume, index) => {
            const roleData = roleIcons[resume.role] || { icon: "❓", name: "Unknown Role" };
            const templateName = templateNames[resume.templateNumber] || "Unknown Template";

            return (
              
              <div key={resume.resume_id} className="resume-card">
                <div className="resume-content">
                  {/* <h5 className="resume-name">{resume.name || `Resume ${index + 1}`}</h5> */}
                  <div className="resume-header">
  <h5 className="resume-name">{resume.name || `Resume ${index + 1}`}</h5>
  {resume.lastUpdated && (
    <span
      className="recent-badge"
      title={new Date(resume.lastUpdated + "Z").toLocaleString("en-US", {
        timeZone: "America/New_York",
      })}
    >
      {getRelativeTime(resume.lastUpdated)}
    </span>
  )}
</div>



                  <p className="resume-role">
                    <strong>{roleData.icon} {roleData.name}</strong>
                  </p>
                  {/* <p className="resume-template">
                    <strong>Template:</strong> {templateName}
                  </p> */}
                  <p className="resume-details"><strong>Phone:</strong> {resume.phone}</p>
                  <p className="resume-details"><strong>Summary:</strong> {resume.summary}</p>
                </div>

                <div className="resume-actions">
                  <button className="small-btn preview-btn" onClick={() => handlePreview(resume)}>
                    <FaEye className="icon" /> Preview
                  </button>
                  <button className="small-btn edit-btn" onClick={() => handleEdit(resume)}>
                    <FaEdit className="icon" /> Edit
                  </button>
                  <button className="small-btn delete-btn" onClick={() => handleShowModal(resume.resume_id)}>
                    <FaTrashAlt className="icon" /> Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center no-resumes-text">
            No resumes found. <Link to="/templates" className="create-new-link">Create a new one!</Link>
          </p>
        )}
      </div>


      <Modal 
  show={showModal} 
  onHide={() => setShowModal(false)} 
  centered 
  style={{ 
    backdropFilter: "blur(5px)", 
    transition: "opacity 0.3s ease-in-out"
  }}
>
  {/* Modal Header */}
  <Modal.Header 
    closeButton 
    style={{ 
      backgroundColor: "#f8f9fa", 
      borderBottom: "2px solid #dee2e6", 
      padding: "15px"
    }}
  >
    <Modal.Title 
      style={{ 
        fontWeight: "600", 
        fontSize: "18px", 
        color: "#333"
      }}
    >
      Confirm Delete
    </Modal.Title>
  </Modal.Header>

  {/* Modal Body */}
  <Modal.Body 
    style={{ 
      fontSize: "16px", 
      color: "#555", 
      padding: "20px", 
      textAlign: "center"
    }}
  >
    Are you sure you want to delete this resume?
  </Modal.Body>

  {/* Modal Footer */}
  <Modal.Footer 
    style={{ 
      borderTop: "2px solid #dee2e6", 
      padding: "15px", 
      display: "flex", 
      justifyContent: "flex-end"
    }}
  >
    {/* Cancel Button */}
    <Button 
      variant="secondary" 
      className="px-3" 
      onClick={() => setShowModal(false)} 
      style={{ 
        backgroundColor: "#6c757d", 
        color: "white", 
        fontWeight: "600", 
        padding: "8px 16px", 
        borderRadius: "5px", 
        border: "none", 
        transition: "all 0.3s ease", 
        cursor: "pointer"
      }}
    >
      Cancel
    </Button>

    {/* Delete Button */}
    <Button 
      variant="danger" 
      className="px-3 ms-2" 
      onClick={handleDelete} 
      style={{ 
        backgroundColor: "#dc3545", 
        color: "white", 
        fontWeight: "600", 
        padding: "8px 16px", 
        borderRadius: "5px", 
        border: "none", 
        transition: "all 0.3s ease", 
        cursor: "pointer", 
        marginLeft: "10px"
      }}
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}

export default SavedResumes;
