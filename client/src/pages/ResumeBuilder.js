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
    experience: [{ jobTitle: "", company: "", years: "", responsibilities: "" }], 
    education: [{ degree: "", institution: "", year: "" }], 
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

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    summary: false,
    experience: [],
    education: [],
    skills: [],
    // Software Engineer Fields
    projects: [],
    certifications: [],
    // Marketing Manager Fields
    marketingStrategies: [],
    socialMedia: [],
    // Financial Manager Fields
    investments: [],
    financialTools: [],
    budgetExperience: false,
    leadershipExperience: false,
    // Languages Fields
    languages: []
  });
  

  const handleBlur = (index, field, section = null) => {
    setTouched((prevTouched) => {
      if (section) {
        // Handling dynamic sections (e.g., personalInfo[0].name)
        const updatedSection = prevTouched[section] ? [...prevTouched[section]] : [];
  
        if (!updatedSection[index]) {
          updatedSection[index] = {};
        }
  
        updatedSection[index] = { ...updatedSection[index], [field]: true };
  
        return { ...prevTouched, [section]: updatedSection };
      } else {
        // Handling standalone fields (e.g., email, phone, summary)
        return { ...prevTouched, [field]: true };
      }
    });
  };
  
  
  
  
  
  

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
    // List of required fields
    const requiredFields = ["name", "email", "phone", "summary"];
  
    // Check if any required field is empty
    const missingFields = requiredFields.filter(field => !resumeData[field]?.trim());
  
    if (missingFields.length > 0) {
      toast.error(`❌ Please fill out all required fields before previewing.`);
      return;
    }
  
    if (!resumeData.templateNumber) {
      toast.error("❌ Template selection is missing!");
      return;
    }
  
    // ✅ Allow navigation only if all fields are filled
    navigate(`/resume-preview/${resumeId || "new"}/${resumeData.templateNumber}`, {
      state: { resumeData }
    });
  };
  

  return (
    <div className="resume-builder-container">
      <h2 className="resume-title">Create Your Resume</h2>

      <div className="resume-inputs">
      <div className="section-container">
  {/* Full Name */}
  <label className="input-label">
    Full Name <span className="required">*</span>
  </label>
  <input
    type="text"
    name="name"
    placeholder="Enter your full name"
    value={resumeData.name}
    onChange={handleChange}
    onBlur={() => handleBlur(0, "name", "personalInfo")} // Dynamic section handling
    className={touched.personalInfo?.[0]?.name && resumeData.name.trim() === "" ? "input-error" : ""}
/>
  {touched.personalInfo?.[0]?.name && resumeData.name.trim() === "" && (
    <span className="error-text">Full Name is required</span>
  )}

  {/* Email */}
  <label className="input-label">
    Email <span className="required">*</span>
  </label>
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    value={resumeData.email}
    onChange={handleChange}
    onBlur={() => handleBlur(null, "email")} // Fix: No index, no section
    className={touched.email && resumeData.email.trim() === "" ? "input-error" : ""}
/>
  {touched.email && resumeData.email.trim() === "" && <span className="error-text">Email is required</span>}

  {/* Phone */}
  <label className="input-label">
    Phone <span className="required">*</span>
  </label>
  <input
    type="text"
    name="phone"
    placeholder="Enter your phone number"
    value={resumeData.phone}
    onChange={handleChange}
    onBlur={() => handleBlur(null, "phone")} // Fix: No index, no section
    className={touched.phone && resumeData.phone.trim() === "" ? "input-error" : ""}
/>
  {touched.phone && resumeData.phone.trim() === "" && <span className="error-text">Phone number is required</span>}

  {/* Summary */}
  <label className="input-label">
    Summary <span className="required">*</span>
  </label>
  <textarea
    name="summary"
    placeholder="Enter a short summary"
    value={resumeData.summary}
    onChange={handleChange}
    onBlur={() => handleBlur(null, "summary")} // Fix: No index, no section
    className={touched.summary && resumeData.summary.trim() === "" ? "input-error" : ""}
/>
  {touched.summary && resumeData.summary.trim() === "" && <span className="error-text">Summary is required</span>}
</div>




{/* ✅ Work Experience (Common for all roles) */}
<div className="section-container">
  <h4>Work Experience <span className="required">*</span></h4>
  {resumeData.experience.map((exp, index) => (
    <div key={index} className="input-group">
      
      {/* Job Title */}
      <label>Job Title <span className="required">*</span></label>
      <input
        type="text"
        name="jobTitle"
        placeholder="Enter Job Title"
        value={exp.jobTitle}
        onChange={(e) => handleChange(e, index, "experience")}
        onBlur={() => handleBlur(index, "jobTitle", "experience")}
        className={touched.experience?.[index]?.jobTitle && !exp.jobTitle.trim() ? "input-error" : ""}
      />
      {touched.experience?.[index]?.jobTitle && !exp.jobTitle.trim() && (
        <span className="error-text">Job Title is required</span>
      )}

      {/* Company */}
      <label>Company <span className="required">*</span></label>
      <input
        type="text"
        name="company"
        placeholder="Enter Company Name"
        value={exp.company}
        onChange={(e) => handleChange(e, index, "experience")}
        onBlur={() => handleBlur(index, "company", "experience")}
        className={touched.experience?.[index]?.company && !exp.company.trim() ? "input-error" : ""}
      />
      {touched.experience?.[index]?.company && !exp.company.trim() && (
        <span className="error-text">Company is required</span>
      )}

      {/* Years of Experience */}
      <label>Years of Experience <span className="required">*</span></label>
      <input
        type="text"
        name="years"
        placeholder="Years"
        value={exp.years}
        onChange={(e) => handleChange(e, index, "experience")}
        onBlur={() => handleBlur(index, "years", "experience")}
        className={touched.experience?.[index]?.years && !exp.years.trim() ? "input-error" : ""}
      />
      {touched.experience?.[index]?.years && !exp.years.trim() && (
        <span className="error-text">Years of Experience is required</span>
      )}

      {/* Responsibilities */}
      <label>Responsibilities <span className="required">*</span></label>
      <textarea
        name="responsibilities"
        placeholder="Enter Responsibilities"
        value={exp.responsibilities}
        onChange={(e) => handleChange(e, index, "experience")}
        onBlur={() => handleBlur(index, "responsibilities", "experience")}
        className={touched.experience?.[index]?.responsibilities && !exp.responsibilities.trim() ? "input-error" : ""}
      ></textarea>
      {touched.experience?.[index]?.responsibilities && !exp.responsibilities.trim() && (
        <span className="error-text">Responsibilities are required</span>
      )}

    </div>
  ))}
  <button className="add-btn" onClick={() => addField("experience", { jobTitle: "", company: "", years: "", responsibilities: "" })}>
    + Add Experience
  </button>
</div>


<br/>

{/* ✅ Education (Common for all roles) */}
<div className="section-container">
  <h4>Education <span className="required">*</span></h4>
  {resumeData.education.map((edu, index) => (
    <div key={index} className="input-group">
      
      {/* Degree */}
      <label>Degree <span className="required">*</span></label>
      <input
        type="text"
        name="degree"
        placeholder="Enter Degree"
        value={edu.degree}
        onChange={(e) => handleChange(e, index, "education")}
        onBlur={() => handleBlur(index, "degree", "education")}
        className={touched.education?.[index]?.degree && !edu.degree.trim() ? "input-error" : ""}
      />
      {touched.education?.[index]?.degree && !edu.degree.trim() && (
        <span className="error-text">Degree is required</span>
      )}

      {/* Institution */}
      <label>Institution <span className="required">*</span></label>
      <input
        type="text"
        name="institution"
        placeholder="Enter Institution"
        value={edu.institution}
        onChange={(e) => handleChange(e, index, "education")}
        onBlur={() => handleBlur(index, "institution", "education")}
        className={touched.education?.[index]?.institution && !edu.institution.trim() ? "input-error" : ""}
      />
      {touched.education?.[index]?.institution && !edu.institution.trim() && (
        <span className="error-text">Institution is required</span>
      )}

      {/* Year of Completion */}
      <label>Year of Completion <span className="required">*</span></label>
      <input
        type="text"
        name="year"
        placeholder="Enter Year"
        value={edu.year}
        onChange={(e) => handleChange(e, index, "education")}
        onBlur={() => handleBlur(index, "year", "education")}
        className={touched.education?.[index]?.year && !edu.year.trim() ? "input-error" : ""}
      />
      {touched.education?.[index]?.year && !edu.year.trim() && (
        <span className="error-text">Year of Completion is required</span>
      )}
    </div>
  ))}

  {/* Add Education Button */}
  <button className="add-btn" onClick={() => addField("education", { degree: "", institution: "", year: "" })}>
    + Add Education
  </button>
</div>


{/* ✅ Skills (Common for all roles) */}
<div className="section-container">
  <h4>Skills <span className="required">*</span></h4>
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
        onBlur={() => handleBlur(index, "skill", "skills")}
        className={touched.skills?.[index]?.skill && !skill.trim() ? "input-error" : ""}
      />
      {touched.skills?.[index]?.skill && !skill.trim() && (
        <span className="error-text">Required</span>
      )}
    </div>
  ))}

  {/* Add Skill Button */}
  <button className="add-btn" onClick={() => addField("skills", "")}>+ Add Skill</button>
</div>




{/* ✅ Software Engineer Fields */}
{resumeData.role === "software-engineer" && (
  <>
    {/* ✅ Projects Section */}
    <div className="section-container">
      <h4>Projects <span className="required">*</span></h4>
      {resumeData.projects.map((proj, index) => (
        <div key={index} className="input-group">
          <label>Project Title <span className="required">*</span></label>
          <input
            type="text"
            name="title"
            placeholder="Enter Project Title"
            value={proj.title}
            onChange={(e) => handleChange(e, index, "projects")}
            onBlur={() => handleBlur(index, "title", "projects")}
            className={touched.projects?.[index]?.title && !proj.title.trim() ? "input-error" : ""}
          />
          {touched.projects?.[index]?.title && !proj.title.trim() && (
            <span className="error-text">Project Title is required</span>
          )}

          <label>Project Description <span className="required">*</span></label>
          <textarea
            name="description"
            placeholder="Enter Project Description"
            value={proj.description}
            onChange={(e) => handleChange(e, index, "projects")}
            onBlur={() => handleBlur(index, "description", "projects")}
            className={touched.projects?.[index]?.description && !proj.description.trim() ? "input-error" : ""}
          ></textarea>
          {touched.projects?.[index]?.description && !proj.description.trim() && (
            <span className="error-text">Project Description is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("projects", { title: "", description: "" })}>
        + Add Project
      </button>
    </div>

    {/* ✅ Certifications Section */}
    <div className="section-container">
      <h4>Certifications <span className="required">*</span></h4>
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="input-group">
          <label>Certification Title <span className="required">*</span></label>
          <input
            type="text"
            name="title"
            placeholder="Enter Certification Title"
            value={cert.title}
            onChange={(e) => handleChange(e, index, "certifications")}
            onBlur={() => handleBlur(index, "title", "certifications")}
            className={touched.certifications?.[index]?.title && !cert.title.trim() ? "input-error" : ""}
          />
          {touched.certifications?.[index]?.title && !cert.title.trim() && (
            <span className="error-text">Certification Title is required</span>
          )}

          <label>Issuer <span className="required">*</span></label>
          <input
            type="text"
            name="issuer"
            placeholder="Enter Issuer (e.g., Coursera, Microsoft)"
            value={cert.issuer}
            onChange={(e) => handleChange(e, index, "certifications")}
            onBlur={() => handleBlur(index, "issuer", "certifications")}
            className={touched.certifications?.[index]?.issuer && !cert.issuer.trim() ? "input-error" : ""}
          />
          {touched.certifications?.[index]?.issuer && !cert.issuer.trim() && (
            <span className="error-text">Issuer is required</span>
          )}

          <label>Year <span className="required">*</span></label>
          <input
            type="text"
            name="year"
            placeholder="Enter Year of Certification"
            value={cert.year}
            onChange={(e) => handleChange(e, index, "certifications")}
            onBlur={() => handleBlur(index, "year", "certifications")}
            className={touched.certifications?.[index]?.year && !cert.year.trim() ? "input-error" : ""}
          />
          {touched.certifications?.[index]?.year && !cert.year.trim() && (
            <span className="error-text">Year is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("certifications", { title: "", issuer: "", year: "" })}>
        + Add Certification
      </button>
    </div>
  </>
)}



{/* ✅ Marketing Manager Fields */}
{resumeData.role === "marketing-manager" && (
  <>
    {/* ✅ Marketing Strategies Section */}
    <div className="section-container">
      <h4>Marketing Strategies <span className="required">*</span></h4>
      {resumeData.marketingStrategies.map((strategy, index) => (
        <div key={index} className="input-group">
          <label>Strategy Name <span className="required">*</span></label>
          <input
            type="text"
            name="strategy"
            placeholder="Enter Strategy Name"
            value={strategy.strategy}
            onChange={(e) => handleChange(e, index, "marketingStrategies")}
            onBlur={() => handleBlur(index, "strategy", "marketingStrategies")}
            className={touched.marketingStrategies?.[index]?.strategy && !strategy.strategy.trim() ? "input-error" : ""}
          />
          {touched.marketingStrategies?.[index]?.strategy && !strategy.strategy.trim() && (
            <span className="error-text">Strategy Name is required</span>
          )}

          <label>Impact <span className="required">*</span></label>
          <textarea
            name="impact"
            placeholder="Impact (e.g., Increased engagement by 30%)"
            value={strategy.impact}
            onChange={(e) => handleChange(e, index, "marketingStrategies")}
            onBlur={() => handleBlur(index, "impact", "marketingStrategies")}
            className={touched.marketingStrategies?.[index]?.impact && !strategy.impact.trim() ? "input-error" : ""}
          ></textarea>
          {touched.marketingStrategies?.[index]?.impact && !strategy.impact.trim() && (
            <span className="error-text">Impact description is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("marketingStrategies", { strategy: "", impact: "" })}>
        + Add Strategy
      </button>
    </div>

    {/* ✅ Social Media Campaigns Section */}
    <div className="section-container">
      <h4>Social Media Campaigns <span className="required">*</span></h4>
      {resumeData.socialMedia.map((campaign, index) => (
        <div key={index} className="input-group">
          <label>Platform <span className="required">*</span></label>
          <input
            type="text"
            name="platform"
            placeholder="Enter Platform (e.g., Facebook, Instagram)"
            value={campaign.platform}
            onChange={(e) => handleChange(e, index, "socialMedia")}
            onBlur={() => handleBlur(index, "platform", "socialMedia")}
            className={touched.socialMedia?.[index]?.platform && !campaign.platform.trim() ? "input-error" : ""}
          />
          {touched.socialMedia?.[index]?.platform && !campaign.platform.trim() && (
            <span className="error-text">Platform is required</span>
          )}

          <label>Results <span className="required">*</span></label>
          <textarea
            name="results"
            placeholder="Results (e.g., 10k followers increase)"
            value={campaign.results}
            onChange={(e) => handleChange(e, index, "socialMedia")}
            onBlur={() => handleBlur(index, "results", "socialMedia")}
            className={touched.socialMedia?.[index]?.results && !campaign.results.trim() ? "input-error" : ""}
          ></textarea>
          {touched.socialMedia?.[index]?.results && !campaign.results.trim() && (
            <span className="error-text">Results description is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("socialMedia", { platform: "", results: "" })}>
        + Add Campaign
      </button>
    </div>
  </>
)}



{/* ✅ Financial Manager Fields */}
{resumeData.role === "financial-manager" && (
  <>
    {/* ✅ Investments Section */}
    <div className="section-container">
      <h4>Investments <span className="required">*</span></h4>
      {resumeData.investments.map((inv, index) => (
        <div key={index} className="input-group">
          <label>Investment Type <span className="required">*</span></label>
          <input
            type="text"
            name="type"
            placeholder="Investment Type"
            value={inv.type}
            onChange={(e) => handleChange(e, index, "investments")}
            onBlur={() => handleBlur(index, "type", "investments")}
            className={touched.investments?.[index]?.type && !inv.type.trim() ? "input-error" : ""}
          />
          {touched.investments?.[index]?.type && !inv.type.trim() && (
            <span className="error-text">Investment Type is required</span>
          )}

          <label>Investment Amount <span className="required">*</span></label>
          <input
            type="text"
            name="amount"
            placeholder="Investment Amount"
            value={inv.amount}
            onChange={(e) => handleChange(e, index, "investments")}
            onBlur={() => handleBlur(index, "amount", "investments")}
            className={touched.investments?.[index]?.amount && !inv.amount.trim() ? "input-error" : ""}
          />
          {touched.investments?.[index]?.amount && !inv.amount.trim() && (
            <span className="error-text">Amount is required</span>
          )}

          <label>Years of Experience <span className="required">*</span></label>
          <input
            type="text"
            name="years"
            placeholder="Years of Experience"
            value={inv.years}
            onChange={(e) => handleChange(e, index, "investments")}
            onBlur={() => handleBlur(index, "years", "investments")}
            className={touched.investments?.[index]?.years && !inv.years.trim() ? "input-error" : ""}
          />
          {touched.investments?.[index]?.years && !inv.years.trim() && (
            <span className="error-text">Years of Experience is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("investments", { type: "", amount: "", years: "" })}>
        + Add Investment
      </button>
    </div>

    {/* ✅ Financial Tools Section */}
    <div className="section-container">
      <h4>Financial Tools <span className="required">*</span></h4>
      {resumeData.financialTools.map((tool, index) => (
        <div key={index} className="input-group">
          <label>Financial Tool <span className="required">*</span></label>
          <input
            type="text"
            placeholder="Financial Tool"
            name="name"
            value={tool.name}
            onChange={(e) => handleChange(e, index, "financialTools")}
            onBlur={() => handleBlur(index, "name", "financialTools")}
            className={touched.financialTools?.[index]?.name && !tool.name.trim() ? "input-error" : ""}
          />
          {touched.financialTools?.[index]?.name && !tool.name.trim() && (
            <span className="error-text">Financial Tool is required</span>
          )}
        </div>
      ))}
      <button className="add-btn" onClick={() => addField("financialTools", { name: "" })}>
        + Add Financial Tool
      </button>
    </div>

    {/* ✅ Budget & Risk Management Section */}
    <div className="section-container">
      <h4>Budget & Risk Management <span className="required">*</span></h4>
      <label>Describe your experience in budget & risk management</label>
      <textarea
        name="budgetExperience"
        placeholder="Describe your experience in budget & risk management"
        value={resumeData.budgetExperience}
        onChange={handleChange}
        onBlur={() => handleBlur(null, "budgetExperience")}
        className={touched.budgetExperience && !resumeData.budgetExperience.trim() ? "input-error" : ""}
      ></textarea>
      {touched.budgetExperience && !resumeData.budgetExperience.trim() && (
        <span className="error-text">This field is required</span>
      )}
    </div>

    {/* ✅ Leadership & Strategy Section */}
    <div className="section-container">
      <h4>Leadership & Strategy <span className="required">*</span></h4>
      <label>Describe your leadership experience and financial strategies</label>
      <textarea
        name="leadershipExperience"
        placeholder="Describe your leadership experience and financial strategies"
        value={resumeData.leadershipExperience}
        onChange={handleChange}
        onBlur={() => handleBlur(null, "leadershipExperience")}
        className={touched.leadershipExperience && !resumeData.leadershipExperience.trim() ? "input-error" : ""}
      ></textarea>
      {touched.leadershipExperience && !resumeData.leadershipExperience.trim() && (
        <span className="error-text">This field is required</span>
      )}
    </div>
  </>
)}


{/* ✅ Languages (Common for All Roles) */}
<div className="section-container">
  <h4>Languages <span className="required">*</span></h4>
  {resumeData.languages.map((lang, index) => (
    <div key={index} className="input-group">
      <label>Language <span className="required">*</span></label>
      <input
        type="text"
        name="language"
        placeholder="Language (e.g., English, Spanish)"
        value={lang.language}
        onChange={(e) => handleChange(e, index, "languages")}
        onBlur={() => handleBlur(index, "language", "languages")}
        className={touched.languages?.[index]?.language && !lang.language.trim() ? "input-error" : ""}
      />
      {touched.languages?.[index]?.language && !lang.language.trim() && (
        <span className="error-text">Language is required</span>
      )}

      <label>Proficiency Level <span className="required">*</span></label>
      <input
        type="text"
        name="proficiency"
        placeholder="Proficiency Level (e.g., Fluent, Beginner)"
        value={lang.proficiency}
        onChange={(e) => handleChange(e, index, "languages")}
        onBlur={() => handleBlur(index, "proficiency", "languages")}
        className={touched.languages?.[index]?.proficiency && !lang.proficiency.trim() ? "input-error" : ""}
      />
      {touched.languages?.[index]?.proficiency && !lang.proficiency.trim() && (
        <span className="error-text">Proficiency is required</span>
      )}
    </div>
  ))}
  <button className="add-btn" onClick={() => addField("languages", { language: "", proficiency: "" })}>
    + Add Language
  </button>
</div>



      </div>

      <div className="d-flex justify-content-center">
  <button
    className="btn btn-primary"
    onClick={handlePreview}
    disabled={
      !resumeData.name?.trim() ||
      !resumeData.email?.trim() ||
      !resumeData.phone?.trim() ||
      !resumeData.summary?.trim() ||
      // Work Experience
      resumeData.experience.length === 0 ||
      resumeData.experience.some(exp =>
        !exp.jobTitle?.trim() || !exp.company?.trim() || !exp.years?.trim() || !exp.responsibilities?.trim()
      ) ||
      // Education
      resumeData.education.length === 0 ||
      resumeData.education.some(edu =>
        !edu.degree?.trim() || !edu.institution?.trim() || !edu.year?.trim()
      ) ||
      // Languages
      resumeData.languages.length === 0 ||
      resumeData.languages.some(lang =>
        !lang.language?.trim() || !lang.proficiency?.trim()
      ) ||
      // Role-Specific Fields
      (resumeData.role === "software-engineer" && (
        resumeData.projects.length === 0 ||
        resumeData.projects.some(proj => !proj.title?.trim() || !proj.description?.trim()) ||
        resumeData.certifications.length === 0 ||
        resumeData.certifications.some(cert => !cert.title?.trim() || !cert.issuer?.trim() || !cert.year?.trim())
      )) ||
      (resumeData.role === "financial-manager" && (
        resumeData.investments.length === 0 ||
        resumeData.investments.some(inv => !inv.type?.trim() || !inv.amount?.trim() || !inv.years?.trim()) ||
        resumeData.financialTools.length === 0 ||
        resumeData.financialTools.some(tool => !tool.name?.trim()) ||
        !resumeData.budgetExperience?.trim() ||
        !resumeData.leadershipExperience?.trim()
      )) ||
      (resumeData.role === "marketing-manager" && (
        resumeData.marketingStrategies.length === 0 ||
        resumeData.marketingStrategies.some(strategy => !strategy.strategy?.trim() || !strategy.impact?.trim()) ||
        resumeData.socialMedia.length === 0 ||
        resumeData.socialMedia.some(campaign => !campaign.platform?.trim() || !campaign.results?.trim())
      ))
    }
  >
    Preview Resume
  </button>
</div>

    </div>
  );
}

export default ResumeBuilder;
