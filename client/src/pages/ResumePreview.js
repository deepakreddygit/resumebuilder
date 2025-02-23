import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getResumeById, saveResume, updateResume } from "../api";
import "../styles/ResumePreview.css";

// Import all templates
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";
import Template7 from "../components/templates/Template7";
import Template8 from "../components/templates/Template8";

function ResumePreview() {
  const { userId } = useContext(AuthContext);
  const { resumeId: paramResumeId, templateNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState(paramResumeId && paramResumeId !== "new" ? paramResumeId : null);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templateNumber || "1");

  console.log("🔵 Component Rendered | Current resumeId:", resumeId, "| Template:", selectedTemplate);

  useEffect(() => {
    console.log("🟢 useEffect: Page Loaded. Params:", { paramResumeId, templateNumber });

    if (!templateNumber) {
      toast.error("❌ Template number is missing!");
      navigate("/templates");
      return;
    }

    if (location.state?.resumeData) {
      console.log("✅ Using Resume Data from Navigation State:", location.state.resumeData);
      setResumeData(location.state.resumeData);
      setResumeId(location.state.resumeData.resume_id);
    } else if (resumeId) {
      console.log(`🔄 Fetching Resume from API for ID: ${resumeId}`);
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("✅ API Response: Fetched Resume Data:", data);

            // ✅ Ensure required fields exist (prevents crashes)
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
            toast.error("❌ Resume not found.");
            navigate("/saved-resumes");
          }
        })
        .catch((error) => {
          console.error("❌ API Error Fetching Resume:", error);
          toast.error("❌ Error fetching resume.");
          navigate("/saved-resumes");
        });
    }
  }, [resumeId, templateNumber, navigate, location.state, paramResumeId]);

  if (!resumeData) {
    return <p>⏳ Loading Resume Data...</p>;
  }

  // Define templates grouped by roles
  const templatesByRole = {
    "software-engineer": [
      { id: "1", name: "Modern" },
      { id: "2", name: "Professional" },
      { id: "3", name: "Creative" },
    ],
    "financial-manager": [
      { id: "4", name: "Elegant" },
      { id: "5", name: "Minimal" },
      { id: "6", name: "Compact" },
    ],
    "marketing-manager": [
      { id: "7", name: "Stylish" },
      { id: "8", name: "Classic" },
    ],
  };

  // Get templates based on the role in resumeData
  const userRole = resumeData.role || "software-engineer";
  const availableTemplates = templatesByRole[userRole] || [];

  // Map template ID to component
  const templateComponents = {
    "1": Template1,
    "2": Template2,
    "3": Template3,
    "4": Template4,
    "5": Template5,
    "6": Template6,
    "7": Template7,
    "8": Template8,
  };

  const SelectedTemplate = templateComponents[selectedTemplate] || Template1;

  const handleSaveOrUpdate = async () => {
    console.log("🔄 Save/Update Triggered | Resume Data:", resumeData);

    if (!resumeData) {
      toast.error("❌ No resume data found.");
      return;
    }

    try {
      const updatedResume = { ...resumeData, templateNumber: selectedTemplate };

      if (resumeId && resumeId !== "new" && resumeId !== null) {
        console.log(`🟠 Updating resume with ID: ${resumeId}`);
        await updateResume(resumeId, updatedResume);
        toast.success("✅ Resume updated successfully!");
      } else {
        console.log("💾 Saving new resume...");
        const savedResume = await saveResume(userId, updatedResume);
        toast.success("✅ Resume saved successfully!");

        setResumeId(savedResume.resume_id);
        navigate(`/resume-preview/${savedResume.resume_id}/${selectedTemplate}`, {
          state: { resumeData: savedResume },
        });
      }

      console.log("🔀 Redirecting to Saved Resumes...");
      navigate("/saved-resumes");

    } catch (error) {
      console.error("❌ Save/Update Error:", error);
      toast.error("❌ Failed to save/update resume.");
    }
  };

  return (
    <div className="resume-preview-container">
      <h2 className="text-center">LIVE RESUME PREVIEW</h2>

      {/* 🔽 Role-Based Template Dropdown */}
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

      {/* 🔹 Resume Preview */}
      <div className="resume-preview">
        <SelectedTemplate resumeData={resumeData} />
      </div>

      <div className="text-center mt-4">
        <button className="save-btn" onClick={handleSaveOrUpdate}>
          {resumeId && resumeId !== "new" && resumeId !== null ? "Update Resume" : "Save Resume"}
        </button>

        <button className="btn btn-secondary" onClick={() => navigate("/saved-resumes")}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ResumePreview;
