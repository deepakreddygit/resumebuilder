import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResumeById } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResumeBuilder.css";

function ResumeBuilder() {
  const { resumeId, templateNumber, role } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [{ jobTitle: "", company: "", years: "", responsibilities: "" }], //  Work Experience (Common)
    education: [{ degree: "", institution: "", year: "" }], //  Education (Common)
    skills: [""], // Software Engineer
    projects: [{ title: "", description: "" }], // Software Engineer
    certifications: [{ title: "", issuer: "", year: "" }], // Software Engineer
    marketingStrategies: [{ strategy: "", impact: "" }], // Marketing Manager
    socialMedia: [{ platform: "", results: "" }], // Marketing Manager
    investments: [{ type: "", amount: "", years: "" }], // Financial Manager
    financialTools: [{ name: "" }], // Financial Manager
    budgetExperience: "", // Financial Manager
    leadershipExperience: "", // Financial Manager
    languages: [{ language: "", proficiency: "" }], //  Languages (Common)
    role: role || "software-engineer",
    templateNumber: templateNumber || "1",
  });

  useEffect(() => {
    if (resumeId && resumeId !== "new") {
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("🔄 Setting Resume Data:", data);
            setResumeData((prevData) => ({
              ...prevData, 
              ...data, 
              experience: Array.isArray(data.experience) ? data.experience : prevData.experience,
              education: Array.isArray(data.education) ? data.education : prevData.education,
              skills: Array.isArray(data.skills) ? data.skills : prevData.skills,
              projects: Array.isArray(data.projects) ? data.projects : prevData.projects,
              certifications: Array.isArray(data.certifications) ? data.certifications : prevData.certifications,
              marketingStrategies: Array.isArray(data.marketingStrategies) ? data.marketingStrategies : prevData.marketingStrategies,
              socialMedia: Array.isArray(data.socialMedia) ? data.socialMedia : prevData.socialMedia,
              investments: Array.isArray(data.investments) ? data.investments : prevData.investments,
              financialTools: Array.isArray(data.financialTools) ? data.financialTools : prevData.financialTools,
              languages: Array.isArray(data.languages) ? data.languages : prevData.languages,
              role: data.role || prevData.role,
              templateNumber: data.templateNumber || prevData.templateNumber,
            }));
          } else {
            toast.error(" Failed to load resume."); 
            navigate("/saved-resumes");
          }
        })
        .catch(() => toast.error(" Error fetching resume."));
    }
  }, [resumeId, navigate, templateNumber, role]);

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
    setResumeData({ ...resumeData, [section]: [...resumeData[section], defaultValues] });
  };

  const handlePreview = () => {
    if (!resumeData.templateNumber) {
      toast.error("Template selection is missing!");
      return;
    }
    navigate(`/resume-preview/${resumeId || "new"}/${resumeData.templateNumber}`, { state: { resumeData } });
  };

  return (
    <div className="resume-builder-container">
      <h2 className="resume-title">Create Your Resume</h2>

      <div className="resume-inputs">
        <input type="text" name="name" placeholder="Full Name" value={resumeData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} />
        <textarea name="summary" placeholder="Summary" value={resumeData.summary} onChange={handleChange}></textarea>

        {/* ✅ Work Experience (Common for all roles) */}
        <div className="section-container">
          <h4>Work Experience</h4>
          {resumeData.experience.map((exp, index) => (
            <div key={index}>
              <input type="text" name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(e, index, "experience")} />
              <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, index, "experience")} />
              <input type="text" name="years" placeholder="Years" value={exp.years} onChange={(e) => handleChange(e, index, "experience")} />
              <textarea name="responsibilities" placeholder="Responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, index, "experience")}></textarea>
            </div>
          ))}
          <button className="add-btn" onClick={() => addField("experience", { jobTitle: "", company: "", years: "", responsibilities: "" })}>+ Add Experience</button>
        </div>

        {/* Education (Common for all roles) */}
        <div className="section-container">
          <h4>Education</h4>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, "education")} />
              <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, "education")} />
              <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, index, "education")} />
            </div>
          ))}
          <button className="add-btn" onClick={() => addField("education", { degree: "", institution: "", year: "" })}>+ Add Education</button>
        </div>

{/*  Skills (Common for all roles) */}
<div className="section-container">
  <h4>Skills</h4>
  {resumeData.skills.map((skill, index) => (
    <div key={index} className="skill-item">
      <input
        type="text"
        name="skill"
        placeholder="Enter a Skill"
        value={skill}
        onChange={(e) => {
          const updatedSkills = [...resumeData.skills];
          updatedSkills[index] = e.target.value;
          setResumeData({ ...resumeData, skills: updatedSkills });
        }}
      />
    </div>
  ))}
  <button className="add-btn" onClick={() => addField("skills", "")}>+ Add Skill</button>
</div>


        {/* ✅ Software Engineer Fields */}
{resumeData.role === "software-engineer" && (
  <>

    <div className="section-container">
      <h4>Projects</h4>
      {resumeData.projects.map((proj, index) => (
        <div key={index}>
          <input type="text" name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleChange(e, index, "projects")} />
          <textarea name="description" placeholder="Project Description" value={proj.description} onChange={(e) => handleChange(e, index, "projects")}></textarea>
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("projects", { title: "", description: "" })}>+ Add Project</button>
    </div>

    <div className="section-container">
      <h4>Certifications</h4>
      {resumeData.certifications.map((cert, index) => (
        <div key={index}>
          <input type="text" name="title" placeholder="Certification Title" value={cert.title} onChange={(e) => handleChange(e, index, "certifications")} />
          <input type="text" name="issuer" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleChange(e, index, "certifications")} />
          <input type="text" name="year" placeholder="Year" value={cert.year} onChange={(e) => handleChange(e, index, "certifications")} />
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("certifications", { title: "", issuer: "", year: "" })}>+ Add Certification</button>
    </div>
  </>
)}

{/* ✅ Marketing Manager Fields */}
{resumeData.role === "marketing-manager" && (
  <>
    <div className="section-container">
      <h4>Marketing Strategies</h4>
      {resumeData.marketingStrategies.map((strategy, index) => (
        <div key={index}>
          <input type="text" name="strategy" placeholder="Strategy Name" value={strategy.strategy} onChange={(e) => handleChange(e, index, "marketingStrategies")} />
          <textarea name="impact" placeholder="Impact (e.g., Increased engagement by 30%)" value={strategy.impact} onChange={(e) => handleChange(e, index, "marketingStrategies")}></textarea>
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("marketingStrategies", { strategy: "", impact: "" })}>+ Add Strategy</button>
    </div>

    <div className="section-container">
      <h4>Social Media Campaigns</h4>
      {resumeData.socialMedia.map((campaign, index) => (
        <div key={index}>
          <input type="text" name="platform" placeholder="Platform (e.g., Facebook, Instagram)" value={campaign.platform} onChange={(e) => handleChange(e, index, "socialMedia")} />
          <textarea name="results" placeholder="Results (e.g., 10k followers increase)" value={campaign.results} onChange={(e) => handleChange(e, index, "socialMedia")}></textarea>
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("socialMedia", { platform: "", results: "" })}>+ Add Campaign</button>
    </div>
  </>
)}

{/* ✅ Financial Manager Fields */}
{resumeData.role === "financial-manager" && (
  <>
    <div className="section-container">
      <h4>Investments</h4>
      {resumeData.investments.map((inv, index) => (
        <div key={index}>
          <input type="text" name="type" placeholder="Investment Type" value={inv.type} onChange={(e) => handleChange(e, index, "investments")} />
          <input type="text" name="amount" placeholder="Investment Amount" value={inv.amount} onChange={(e) => handleChange(e, index, "investments")} />
          <input type="text" name="years" placeholder="Years of Experience" value={inv.years} onChange={(e) => handleChange(e, index, "investments")} />
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("investments", { type: "", amount: "", years: "" })}>+ Add Investment</button>
    </div>

  
      {/* Financial Tools Section */}
      <div className="section-container">
        <h4>Financial Tools</h4>
        {resumeData.financialTools.map((tool, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Financial Tool"
              name="name"
              value={tool.name}
              onChange={(e) => handleChange(e, index, "financialTools")}
            />
          </div>
        ))}
        <button className="add-btn" onClick={() => addField("financialTools", { name: "" })}>
          + Add Financial Tool
        </button>
      </div>
    

    <div className="section-container">
      <h4>Budget & Risk Management</h4>
      <textarea name="budgetExperience" placeholder="Describe your experience in budget & risk management" value={resumeData.budgetExperience} onChange={handleChange}></textarea>
    </div>

    <div className="section-container">
      <h4>Leadership & Strategy</h4>
      <textarea name="leadershipExperience" placeholder="Describe your leadership experience and financial strategies" value={resumeData.leadershipExperience} onChange={handleChange}></textarea>
    </div>
  </>
)}

{/* ✅ Languages (Common for All Roles) */}
<div className="section-container">
  <h4>Languages</h4>
  {resumeData.languages.map((lang, index) => (
    <div key={index}>
      <input
        type="text"
        name="language"
        placeholder="Language (e.g., English, Spanish)"
        value={lang.language}
        onChange={(e) => handleChange(e, index, "languages")}
      />
      <input
        type="text"
        name="proficiency"
        placeholder="Proficiency Level (e.g., Fluent, Beginner)"
        value={lang.proficiency}
        onChange={(e) => handleChange(e, index, "languages")}
      />
    </div>
  ))}
  <button className="add-btn" onClick={() => addField("languages", { language: "", proficiency: "" })}>+ Add Language</button>
</div>

      </div>

      <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handlePreview}>Preview Resume</button>
          </div>
    </div>
  );
}

export default ResumeBuilder;
