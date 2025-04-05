import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getResumeById, saveResume, updateResume } from "../api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/ResumePreview.css";

// Template components
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";
import Template7 from "../components/templates/Template7";
import Template8 from "../components/templates/Template8";
import Template9 from "../components/templates/Template9";
import Template10 from "../components/templates/Template10";
import Template11 from "../components/templates/Template11";
import Template12 from "../components/templates/Template12";

// CSS for templates
import "../styles/Template1.css";
import "../styles/Template2.css";
import "../styles/Template3.css";
import "../styles/Template4.css";
import "../styles/Template5.css";
import "../styles/Template6.css";
import "../styles/Template7.css";
import "../styles/Template8.css";
import "../styles/Template9.css";
import "../styles/Template10.css";
import "../styles/Template11.css";
import "../styles/Template12.css";

const templateComponents = {
  "1": Template1,
  "2": Template2,
  "3": Template3,
  "4": Template4,
  "5": Template5,
  "6": Template6,
  "7": Template7,
  "8": Template8,
  "9": Template9,
  "10": Template10,
  "11": Template11,
  "12": Template12,
};

function ResumePreview() {
  const { userId } = useContext(AuthContext);
  const { resumeId: paramResumeId, templateNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState(paramResumeId && paramResumeId !== "new" ? paramResumeId : null);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templateNumber || "1");

  const resumeRef = useRef();

  useEffect(() => {
    if (!templateNumber) {
      toast.error("❌ Template number is missing!");
      navigate("/templates");
      return;
    }

    if (location.state?.resumeData) {
      setResumeData(location.state.resumeData);
      setResumeId(location.state.resumeData.resume_id);
    } else if (resumeId) {
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            const safeData = {
              ...data,
              experience: data.experience || [],
              education: data.education || [],
              skills: data.skills || [],
              certifications: data.certifications || [],
              projects: data.projects || [],
              languages: data.languages || [],
              marketingStrategies: data.marketingStrategies || [],
              socialMedia: data.socialMedia || [],
              role: data.role || "software-engineer",
              templateNumber: data.templateNumber || "1",
            };
            setResumeData(safeData);
            setResumeId(data.resume_id);
          } else {
            toast.error(" Resume not found.");
            navigate("/saved-resumes");
          }
        })
        .catch((error) => {
          console.error(" API Error Fetching Resume:", error);
          toast.error("Error fetching resume.");
          navigate("/saved-resumes");
        });
    }
  }, [resumeId, templateNumber, navigate, location.state, paramResumeId]);

  if (!resumeData) {
    return <p>⏳ Loading Resume Data...</p>;
  }

  const templatesByRole = {
    "software-engineer": [
      { id: "1", name: "Modern Professional" },
      { id: "2", name: "Modern Minimalist" },
      { id: "3", name: "Creative" },
    ],
    "financial-manager": [
      { id: "4", name: "Modern Finance Resume" },
      { id: "5", name: "Modern Icon-Based Finance Resume" },
      { id: "6", name: "Modern Infographic Finance Resume" },
    ],
    "marketing-manager": [
      { id: "7", name: "Strategic Marketing Resume" },
      { id: "8", name: "Minimalist Marketing Resume" },
      { id: "9", name: "Creative Marketing Resume" },
    ],
    "sales-manager": [  
      { id: "10", name: "Creative Sales Manager Resume" },
      { id: "11", name: "Professional Sales Strategist Resume" },
      { id: "12", name: "Modern Sales Manager Resume" },
    ],
  };

  const userRole = resumeData.role || "software-engineer";
  const availableTemplates = templatesByRole[userRole] || [];
  const SelectedTemplate = templateComponents[selectedTemplate] || Template1;

  const handleSaveOrUpdate = async () => {
    if (!resumeData) {
      toast.error(" No resume data found.");
      return;
    }

    try {
      const updatedResume = { ...resumeData, templateNumber: selectedTemplate };

      if (resumeId && resumeId !== "new" && resumeId !== null) {
        await updateResume(resumeId, updatedResume);
        toast.success("Resume updated successfully!");
      } else {
        const savedResume = await saveResume(userId, updatedResume);
        toast.success("Resume saved successfully!");

        setResumeId(savedResume.resume_id);
        navigate(`/resume-preview/${savedResume.resume_id}/${selectedTemplate}`, {
          state: { resumeData: savedResume },
        });
      }

      navigate("/saved-resumes");
    } catch (error) {
      console.error(" Save/Update Error:", error);
      toast.error("Failed to save/update resume.");
    }
  };

  const handleDownload = async () => {
    const element = resumeRef.current;

    if (!element) {
      toast.error("Resume preview not found.");
      return;
    }

    window.scrollTo(0, 0);
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.name || "resume"}.pdf`);
  };

  return (
    <div className="resume-preview-container">
      <h2 className="text-center" style={{ marginTop: "30px", marginBottom: "20px", fontWeight: "600", color: "#333", textTransform: "uppercase", letterSpacing: "1px" }}>
        LIVE RESUME PREVIEW
      </h2>

      <div className="template-selector">
        <p className="text-center"><strong>Choose a Template:</strong></p>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="form-select"
        >
          {availableTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name} Template
            </option>
          ))}
        </select>
      </div>

      <div className="resume-preview" ref={resumeRef}>
        <SelectedTemplate resumeData={resumeData} />
      </div>

      <div className="text-center mt-4">
        <button
          className="preview-page-save-btn"
          onClick={handleSaveOrUpdate}
          style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", marginRight: "10px" }}
        >
          {resumeId && resumeId !== "new" && resumeId !== null ? "Update Resume" : "Save Resume"}
        </button>

        <button
          onClick={handleDownload}
          style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;



