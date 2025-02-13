import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getResumeById, saveResume, updateResume } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResumeBuilder.css";

import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";
import Template6 from "../components/templates/Template6";
import Template7 from "../components/templates/Template7";
import Template8 from "../components/templates/Template8";

function ResumeBuilder() {
  const { userId } = useContext(AuthContext);
  const { resumeId, templateNumber } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [{ jobTitle: "", company: "", years: "", responsibilities: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [{ skill: "" }],
    certifications: [{ title: "", issuer: "", year: "" }],
    projects: [{ title: "", description: "" }],
    languages: [{ language: "", proficiency: "" }],
  });

  useEffect(() => {
    if (resumeId) {
      getResumeById(resumeId)
        .then((data) => {
          if (data) setResumeData(data);
        })
        .catch(() => toast.error("Failed to load resume."));
    }
  }, [resumeId]);

  const handleChange = (e, index = null, section = null) => {
    const { name, value } = e.target;

    if (section) {
      const updatedSection = [...resumeData[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
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

  const handleSave = async () => {
    try {
      if (resumeId) {
        await updateResume(resumeId, resumeData);
      } else {
        await saveResume(userId, resumeData);
      }
      toast.success("Resume saved successfully!");
      navigate("/saved-resumes");
    } catch (error) {
      toast.error("Failed to save resume.");
    }
  };

  const renderTemplate = () => {
    switch (Number(templateNumber)) {
      case 1: return <Template1 resumeData={resumeData} />;
      case 2: return <Template2 resumeData={resumeData} />;
      case 3: return <Template3 resumeData={resumeData} />;
      case 4: return <Template4 resumeData={resumeData} />;
      case 5: return <Template5 resumeData={resumeData} />;
      case 6: return <Template6 resumeData={resumeData} />;
      case 7: return <Template7 resumeData={resumeData} />;
      case 8: return <Template8 resumeData={resumeData} />;
      default: return <Template1 resumeData={resumeData} />;
    }
  };

  return (
    <div className="resume-builder-container">
      <div className="resume-builder-content">

        {/* ✅ Left Side: Resume Inputs */}
        <div className="resume-inputs">
          <h4>Enter Your Details</h4>
          <input type="text" name="name" placeholder="Full Name" value={resumeData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} />
          <textarea name="summary" placeholder="Summary" value={resumeData.summary} onChange={handleChange}></textarea>

          {/* ✅ Work Experience Section */}
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
            <button className="add-btn" onClick={() => addField("experience", { jobTitle: "", company: "", years: "", responsibilities: "" })}>+ Add Experience</button>
          </div>

          {/* ✅ Education Section */}
          <div className="section-container">
            <h4>Education</h4>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="entry-box">
                <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, "education")} />
                <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, "education")} />
                <input type="text" name="year" placeholder="Year (e.g., 2023)" value={edu.year} onChange={(e) => handleChange(e, index, "education")} />
              </div>
            ))}
            <button className="add-btn" onClick={() => addField("education", { degree: "", institution: "", year: "" })}>+ Add Education</button>
          </div>

          {/* ✅ Skills Section */}
          <div className="section-container">
            <h4>Skills</h4>
            {resumeData.skills.map((skill, index) => (
              <input key={index} type="text" name="skill" placeholder="Skill (e.g., JavaScript)" value={skill.skill} onChange={(e) => handleChange(e, index, "skills")} />
            ))}
            <button className="add-btn" onClick={() => addField("skills", { skill: "" })}>+ Add Skill</button>
          </div>

              {/* ✅ Projects Section (Title + Role + Description) */}
              <div className="section-container">
            <h4>Projects</h4>
            {resumeData.projects.map((proj, index) => (
              <div key={index} className="entry-box">
                <input type="text" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleChange(e, index, "projects")} />
                <input type="text" name="role" placeholder="Your Role" value={proj.role} onChange={(e) => handleChange(e, index, "projects")} /> {/* ✅ New Field */}
                <textarea name="description" placeholder="Project Description" value={proj.description} onChange={(e) => handleChange(e, index, "projects")}></textarea>
              </div>
            ))}
            <button className="add-btn" onClick={() => addField("projects", { title: "", role: "", description: "" })}>+ Add Project</button>
          </div>

          {/* ✅ Certifications Section */}
          <div className="section-container">
            <h4>Certifications</h4>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="entry-box">
                <input type="text" name="title" placeholder="Certification Title" value={cert.title} onChange={(e) => handleChange(e, index, "certifications")} />
                <input type="text" name="issuer" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleChange(e, index, "certifications")} />
                <input type="text" name="year" placeholder="Year" value={cert.year} onChange={(e) => handleChange(e, index, "certifications")} />
              </div>
            ))}
            <button className="add-btn" onClick={() => addField("certifications", { title: "", issuer: "", year: "" })}>+ Add Certification</button>
          </div>

           {/* ✅ Languages Section */}
           <div className="section-container">
            <h4>Languages</h4>
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="entry-box">
                <input type="text" name="language" placeholder="Language" value={lang.language} onChange={(e) => handleChange(e, index, "languages")} />
                <input type="text" name="proficiency" placeholder="Proficiency (e.g., Fluent)" value={lang.proficiency} onChange={(e) => handleChange(e, index, "languages")} />
              </div>
            ))}
            <button className="add-btn" onClick={() => addField("languages", { language: "", proficiency: "" })}>+ Add Language</button>
          </div>

          {/* ✅ Save Resume Button */}
          <button className="save-btn" onClick={handleSave}>
            {resumeId ? "Update Resume" : "Save Resume"}
          </button>
        </div>

        {/* ✅ Right Side: Live Resume Preview */}
        {renderTemplate()}
      </div>
    </div>
  );
}

export default ResumeBuilder;
