import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getResumeById, saveResume, updateResume } from "../api";
import "../styles/ResumePreview.css";


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
  const { resumeId, templateNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Store resume data and selected template
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templateNumber || "1");

  useEffect(() => {
    console.log("🟢 Preview Page Loaded. Params:", { resumeId, templateNumber });

    if (!templateNumber) {
      toast.error("❌ Template number is missing!");
      navigate("/templates");
      return;
    }

    if (location.state?.resumeData) {
      console.log("✅ Using Resume Data from Navigation State:", location.state.resumeData);
      setResumeData(location.state.resumeData);
    } else if (resumeId !== "new") {
      console.log(`🔄 Fetching Resume for Preview: ${resumeId}`);
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("✅ Fetched Resume Data for Preview:", data);
            setResumeData(data);
          } else {
            toast.error("❌ Resume not found.");
            navigate("/saved-resumes");
          }
        })
        .catch(() => {
          toast.error("❌ Error fetching resume.");
          navigate("/saved-resumes");
        });
    }
  }, [resumeId, templateNumber, navigate, location.state]);

  // Load the corresponding CSS file dynamically
  useEffect(() => {
    document.querySelectorAll("link[id^='template-css']").forEach((el) => el.remove());

    const link = document.createElement("link");
    link.id = `template-css-${selectedTemplate}`;
    link.rel = "stylesheet";
    link.href = `/styles/Template${selectedTemplate}.css`;
    document.head.appendChild(link);

    console.log(`🟢 Applied CSS: Template${selectedTemplate}.css`);

    return () => {
      link.remove();
    };
  }, [selectedTemplate]);

  // Update resume template in backend
  const handleSave = async () => {
    console.log("🔄 Saving Resume Data from Preview:", resumeData);

    if (!resumeData) {
      toast.error("❌ No resume data found.");
      return;
    }

    try {
      const updatedResume = { ...resumeData, templateNumber: selectedTemplate };

      if (resumeId && resumeId !== "new") {
        await updateResume(resumeId, updatedResume);
        toast.success("Resume updated successfully!");
      } else {
        await saveResume(userId, updatedResume);
        toast.success("Resume saved successfully!");
      }

      console.log("🔀 Redirecting to Saved Resumes...");
      navigate("/saved-resumes");
    } catch (error) {
      toast.error("❌ Failed to save resume.");
    }
  };

  // Render selected template
  const renderTemplate = () => {
    if (!resumeData) return <p>⏳ Loading Resume Data...</p>;

    console.log("🟢 Rendering Template:", selectedTemplate, resumeData);
    const templates = [Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8];
    const SelectedTemplate = templates[Number(selectedTemplate) - 1] || Template1;

    return <SelectedTemplate resumeData={resumeData} />;
  };

  return (
    <div className="resume-preview-container">
      <h2>Live Resume Preview</h2>

      {/* Template Selection Dropdown */}
      <div className="template-selector">
        <label htmlFor="template-select">Choose a Template:</label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => {
            setSelectedTemplate(e.target.value);
            navigate(`/resume-preview/${resumeId}/${e.target.value}`);
          }}
        >
          <option value="1">Template 1</option>
          <option value="2">Template 2</option>
          <option value="3">Template 3</option>
          <option value="4">Template 4</option>
          <option value="5">Template 5</option>
          <option value="6">Template 6</option>
          <option value="7">Template 7</option>
          <option value="8">Template 8</option>
        </select>
      </div>

      <div className="resume-preview">{renderTemplate()}</div>

      <button className="save-btn" onClick={handleSave}>
        {resumeId && resumeId !== "new" ? "Update Resume" : "Save Resume"}
      </button>
    </div>
  );
}

export default ResumePreview;
