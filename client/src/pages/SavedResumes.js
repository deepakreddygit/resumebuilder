import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserResumes, deleteResume } from "../api";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SavedResumes.css";

function SavedResumes() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

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
      await deleteResume(selectedResumeId);
      toast.success("Resume deleted successfully!", { autoClose: 3000 });

      setResumes((prevResumes) => prevResumes.filter((r) => r.resume_id !== selectedResumeId));
    } catch (error) {
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
                  <h5 className="resume-name">{resume.name || `Resume ${index + 1}`}</h5>
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


      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this resume?</Modal.Body>
  <Modal.Footer className="d-flex justify-content-end">
    <Button variant="secondary" className="px-3" onClick={() => setShowModal(false)}>Cancel</Button>
    <Button variant="danger" className="px-3 ms-2" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>






    </div>
  );
}

export default SavedResumes;
