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

  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    console.log(" Preview Page Loaded. Params:", { resumeId, templateNumber });

    if (!templateNumber) {
      toast.error("Template number is missing!");
      navigate("/templates");
      return;
    }

    if (location.state?.resumeData) {
      console.log("Using Resume Data from Navigation State:", location.state.resumeData);
      setResumeData(location.state.resumeData);
    } else if (resumeId !== "new") {
      console.log(`Fetching Resume for Preview: ${resumeId}`);
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("Fetched Resume Data for Preview:", data);
            setResumeData(data);
          } else {
            toast.error("Resume not found.");
            navigate("/saved-resumes");
          }
        })
        .catch(() => {
          toast.error(" Error fetching resume.");
          navigate("/saved-resumes");
        });
    }
  }, [resumeId, templateNumber, navigate, location.state]);

  useEffect(() => {

    document.querySelectorAll("link[id^='template-css']").forEach((el) => el.remove());


    const link = document.createElement("link");
    link.id = `template-css-${templateNumber}`;
    link.rel = "stylesheet";
    link.href = `/styles/Template${templateNumber}.css`; 
    document.head.appendChild(link);

    console.log(`Applied CSS: Template${templateNumber}.css`);

    return () => {
      link.remove(); 
    };
  }, [templateNumber]);

  const handleSave = async () => {
    console.log("Saving Resume Data from Preview:", resumeData);

    if (!resumeData) {
      toast.error("No resume data found.");
      return;
    }

    try {
      if (resumeId && resumeId !== "new") {
        await updateResume(resumeId, resumeData);
        toast.success("Resume updated successfully!");
      } else {
        await saveResume(userId, resumeData);
        toast.success("Resume saved successfully!");
      }

      console.log("Redirecting to Saved Resumes...");
      navigate("/saved-resumes"); 
    } catch (error) {
      toast.error("Failed to save resume.");
    }
  };

  const renderTemplate = () => {
    if (!resumeData) return <p>⏳ Loading Resume Data...</p>;

    console.log("Rendering Template:", templateNumber, resumeData);
    const templates = [Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8];
    const SelectedTemplate = templates[Number(templateNumber) - 1] || Template1;

    return <SelectedTemplate resumeData={resumeData} />;
  };

  return (
    <div className="resume-preview-container">
      <h2>Live Resume Preview</h2>
      <div className="resume-preview">
        {renderTemplate()} 
      </div>
      <button className="save-btn" onClick={handleSave}>
        {resumeId && resumeId !== "new" ? "Update Resume" : "Save Resume"}
      </button>
    </div>
  );
}

export default ResumePreview;
