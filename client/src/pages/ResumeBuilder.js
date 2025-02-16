
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getResumeById } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResumeBuilder.css";

function ResumeBuilder() {
  // const { userId } = useContext(AuthContext);
  const { resumeId, templateNumber } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [{ jobTitle: "", company: "", years: "", responsibilities: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [""],
    certifications: [{ title: "", issuer: "", year: "" }],
    projects: [{ title: "", description: "" }],
    languages: [{ language: "", proficiency: "" }],  // ✅ Languages Section Added
    templateNumber: templateNumber || "1", 
  });

  useEffect(() => {
    console.log("ResumeBuilder Mounted. Params:", { resumeId, templateNumber });

    if (resumeId) {
      console.log(`Fetching Resume Data for ID: ${resumeId}`);
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("Fetched Resume Data:", data);
            setResumeData(data);
          } else {
            toast.error("Failed to load resume.");
            navigate("/saved-resumes");
          }
        })
        .catch(() => toast.error("Error fetching resume."));
    }
  }, [resumeId, navigate, templateNumber]);

  const handleChange = (e, index = null, section = null) => {
    const { name, value } = e.target;
  
    if (section) {
      const updatedSection = [...resumeData[section]];
  
      if (section === "skills") {
        // ✅ Fix: Ensure `skills` are stored as strings, not objects
        updatedSection[index] = value;
      } else {
        updatedSection[index] = { ...updatedSection[index], [name]: value };
      }
  
      setResumeData({ ...resumeData, [section]: updatedSection });
    } else {
      setResumeData({ ...resumeData, [name]: value });
    }
  };
  

  const addField = (section, defaultValues) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], defaultValues],
    });
  };

  const handlePreview = () => {
    if (!resumeData.templateNumber) {
      toast.error("Template selection is missing!");
      return;
    }

    console.log("🔄 Sending Resume Data to Preview:", resumeData);
    navigate(`/resume-preview/${resumeId || "new"}/${resumeData.templateNumber}`, {
      state: { resumeData: { ...resumeData } },
    });
  };

  return (
    <div className="resume-builder-container">
      <h2 className="resume-title">Create Your Resume</h2>

      {/* ✅ Resume Inputs */}
      <div className="resume-inputs">
        <h4>Enter Your Details</h4>
        <input type="text" name="name" placeholder="Full Name" value={resumeData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} />
        <textarea name="summary" placeholder="Summary" value={resumeData.summary} onChange={handleChange}></textarea>

        {/* ✅ Work Experience */}
        <div className="section-container">
          <h4>Work Experience</h4>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="entry-box">
              <input type="text" name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(e, index, "experience")} />
              <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, index, "experience")} />
              <input type="text" name="years" placeholder="Years (e.g., 2019-2022)" value={exp.years} onChange={(e) => handleChange(e, index, "experience")} />
              <textarea name="responsibilities" placeholder="Job Responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, index, "experience")}></textarea>
            </div>
          ))}
          <button onClick={() => addField("experience", { jobTitle: "", company: "", years: "", responsibilities: "" })}>+ Add Experience</button>
        </div>

        {/* ✅ Education */}
        <div className="section-container">
          <h4>Education</h4>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="entry-box">
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, "education")} />
              <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, "education")} />
              <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, index, "education")} />
            </div>
          ))}
          <button onClick={() => addField("education", { degree: "", institution: "", year: "" })}>+ Add Education</button>
        </div>

        {/* ✅ Projects Section */}
<div className="section-container">
  <h4>Projects</h4>
  {resumeData.projects.map((proj, index) => (
    <div key={index} className="entry-box">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={proj.title}
        onChange={(e) => handleChange(e, index, "projects")}
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={proj.description}
        onChange={(e) => handleChange(e, index, "projects")}
      ></textarea>
    </div>
  ))}
  <button onClick={() => addField("projects", { title: "", description: "" })}>+ Add Project</button>
</div>


 {/* ✅ Skills */}
<div className="section-container">
  <h4>Skills</h4>
  {resumeData.skills.map((skill, index) => (
    <input
      key={index}
      type="text"
      placeholder="Skill (e.g., JavaScript)"
      value={skill || ""}
      onChange={(e) => handleChange(e, index, "skills")}
    />
  ))}
  <button onClick={() => addField("skills", "")}>+ Add Skill</button>
</div>


        {/* ✅ Certifications */}
        <div className="section-container">
          <h4>Certifications</h4>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="entry-box">
              <input type="text" name="title" placeholder="Certification Title" value={cert.title} onChange={(e) => handleChange(e, index, "certifications")} />
              <input type="text" name="issuer" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleChange(e, index, "certifications")} />
              <input type="text" name="year" placeholder="Year" value={cert.year} onChange={(e) => handleChange(e, index, "certifications")} />
            </div>
          ))}
          <button onClick={() => addField("certifications", { title: "", issuer: "", year: "" })}>+ Add Certification</button>
        </div>

        {/* ✅ Languages Section */}
        <div className="section-container">
          <h4>Languages</h4>
          {resumeData.languages.map((lang, index) => (
            <div key={index} className="entry-box">
              <input type="text" name="language" placeholder="Language" value={lang.language} onChange={(e) => handleChange(e, index, "languages")} />
              <input type="text" name="proficiency" placeholder="Proficiency Level (e.g., Fluent)" value={lang.proficiency} onChange={(e) => handleChange(e, index, "languages")} />
            </div>
          ))}
          <button onClick={() => addField("languages", { language: "", proficiency: "" })}>+ Add Language</button>
        </div>
      </div>

      <button className="preview-btn" onClick={handlePreview}>Preview Resume</button>
    </div>
  );
}

export default ResumeBuilder;

