import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResumeById, getUserProfile, getUserResumes } from "../api"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResumeBuilder.css";
import { AuthContext } from "../context/AuthContext";
import { FaMagic, FaTimes } from "react-icons/fa";
import TipsPanel from "../components/TipsPanel";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function ResumeBuilder() {
  const { resumeId, templateNumber, role } = useParams();
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const location = useLocation();
  const [hasAnyResume, setHasAnyResume] = useState(false);


  const handleInputChange = () => {
    if (!isDirty) {
      console.log("[Change] User started typing");
      setIsDirty(true);
    }
  };
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        console.log("Triggering beforeunload due to unsaved changes");
        e.preventDefault();
        e.returnValue = "";
      }
    };
  
    const handlePopState = () => {
      if (isDirty) {
        console.log("🔙 Back button detected with unsaved changes");
        setShowExitModal(true);
        setPendingNavigation(true);
        window.history.pushState(null, "", location.pathname); // 👈 re-push current state
      } else {
        console.log("Back button pressed but no unsaved changes");
      }
    };
  
    // 👇 Required to enable popstate blocking
    window.history.pushState(null, "", window.location.href);
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, location.pathname]);
  

  // Confirmation Modal
  const ExitConfirmationModal = () => (
    <Modal
      show={showExitModal}
      onHide={() => {
        console.log("Modal closed without action");
        setShowExitModal(false);
      }}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Unsaved Changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have unsaved changes. Are you sure you want to leave this page?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            console.log("User chose to stay on the page");
            setShowExitModal(false);
          }}
        >
          Stay on Page
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            console.log("User confirmed to leave page");
            setShowExitModal(false);
            setIsDirty(false);
            navigate("/templates"); 
            // if (pendingNavigation) {
            //   navigate(-1);
            // }
          }}
        >
          Leave Anyway
        </Button>
      </Modal.Footer>
    </Modal>
  );
  





  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [], 
    education: [{ degree: "", institution: "", year: "" }], 
    skills: [""], 
    projects: [{ title: "", description: "" }], 
    certifications: [{ title: "", issuer: "", year: "" }], 
    marketingStrategies: [{ strategy: "", impact: "" }], 
    socialMedia: [{ platform: "", results: "" }], 
    investments: [{ type: "", amount: "", years: "" }], 
    financialTools: [{ name: "" }], 
    budgetExperience: "", 
    leadershipExperience: "", 
    // sales-manager-fields
    salesStrategies: [{ strategy: "", impact: "" }], 
    clientAcquisition: [{ method: "", successRate: "" }],
    revenueGrowth: [{ achievement: "" }],
    salesTools: [{ tool: "" }],
    negotiationExperience: [{ scenario: "" }],
    languages: [{ language: "", proficiency: "" }], 
    role: role || "software-engineer",
    templateNumber: templateNumber || "1",
  });

  // ✅ Correctly Declare the state for storing basic details
  const [savedBasicData, setSavedBasicData] = useState(null);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    summary: false,
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    marketingStrategies: [],
    socialMedia: [],
    investments: [],
    financialTools: [],
    budgetExperience: false,
    leadershipExperience: false,
    languages: [],
  });

  const handleBlur = (index, field, section = null) => {
    setTouched((prevTouched) => {
      if (section) {
        const updatedSection = prevTouched[section] ? [...prevTouched[section]] : [];
        if (!updatedSection[index]) {
          updatedSection[index] = {};
        }
        updatedSection[index] = { ...updatedSection[index], [field]: true };
        return { ...prevTouched, [section]: updatedSection };
      } else {
        return { ...prevTouched, [field]: true };
      }
    });
  };

  const handleGenerateSummary = async () => {
    if (!aiPrompt.trim()) {
      alert("Please enter a prompt for AI to generate a summary.");
      return;
    }
  
    setLoading(true);
  
    // Simulating AI Response (Replace this with an actual API call)
    setTimeout(() => {
      const mockResponse = `Generated Summary for: "${aiPrompt.trim()}"`;
  
      //  Remove "Generated Summary for:" and extract only the user input
      const cleanedText = mockResponse.replace(/^Generated Summary for: "?(.+?)"?$/, "$1");
  
      setGeneratedText(cleanedText); // ✅ Set only the cleaned text
      setLoading(false);
    }, 2000); // Simulate AI processing time
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setAiPrompt(""); // Reset input
    setGeneratedText(""); // Reset generated summary
  };

  // useEffect(() => {
  //   if (resumeId && resumeId !== "new") {
  //     getResumeById(resumeId)
  //       .then((data) => {
  //         if (data) {
  //           console.log("Resume Data Fetched:", data);
            
  //           // ✅ Directly update the resumeData state with fetched data
  //           setResumeData((prevData) => ({
  //             ...prevData,
  //             ...data,
  //             experience: Array.isArray(data.experience) ? data.experience : prevData.experience,
  //             education: Array.isArray(data.education) ? data.education : prevData.education,
  //             skills: Array.isArray(data.skills) ? data.skills : prevData.skills,
  //             projects: Array.isArray(data.projects) ? data.projects : prevData.projects,
  //             certifications: Array.isArray(data.certifications) ? data.certifications : prevData.certifications,
  //             marketingStrategies: Array.isArray(data.marketingStrategies) ? data.marketingStrategies : prevData.marketingStrategies,
  //             socialMedia: Array.isArray(data.socialMedia) ? data.socialMedia : prevData.socialMedia,
  //             investments: Array.isArray(data.investments) ? data.investments : prevData.investments,
  //             financialTools: Array.isArray(data.financialTools) ? data.financialTools : prevData.financialTools,
  //             languages: Array.isArray(data.languages) ? data.languages : prevData.languages,
  //             salesStrategies: Array.isArray(data.salesStrategies) ? data.salesStrategies : prevData.salesStrategies,
  //             clientAcquisition: Array.isArray(data.clientAcquisition) ? data.clientAcquisition : prevData.clientAcquisition,
  //             revenueGrowth: Array.isArray(data.revenueGrowth) ? data.revenueGrowth : prevData.revenueGrowth,
  //             salesTools: Array.isArray(data.salesTools) ? data.salesTools : prevData.salesTools,
  //             negotiationExperience: Array.isArray(data.negotiationExperience) ? data.negotiationExperience : prevData.negotiationExperience,
  //             role: data.role || prevData.role,
  //             templateNumber: data.templateNumber || prevData.templateNumber,
  //           }));
  //         } else {
  //           toast.error("❌ Failed to load resume.");
  //           navigate("/saved-resumes");
  //         }
  //       })
  //       .catch(() => toast.error("❌ Error fetching resume."));
  //   }
  
  //   // ✅ Fetch stored basic user details for autofill
  //   getUserProfile(userId)
  //     .then((profile) => {
  //       if (profile) {
  //         console.log("🔹 User Basic Info Fetched:", profile);
  
  //         // ✅ Store separately for autofill (without overriding resume editing)
  //         setSavedBasicData({
  //           name: profile.name || "",
  //           email: profile.email || "",
  //           phone: profile.phone || "",
  //           summary: profile.summary || "",
  //           education: Array.isArray(profile.education) ? profile.education : [],
  //           languages: Array.isArray(profile.languages) ? profile.languages : [],
  //         });
  //       }
  //     })
  //     .catch(() => console.log("No stored user profile found. User will enter manually."));
  // }, [resumeId, navigate, userId]);

  useEffect(() => {
    // 🔹 Fetch resume if editing
    if (resumeId && resumeId !== "new") {
      getResumeById(resumeId)
        .then((data) => {
          if (data) {
            console.log("Resume Data Fetched:", data);
  
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
              salesStrategies: Array.isArray(data.salesStrategies) ? data.salesStrategies : prevData.salesStrategies,
              clientAcquisition: Array.isArray(data.clientAcquisition) ? data.clientAcquisition : prevData.clientAcquisition,
              revenueGrowth: Array.isArray(data.revenueGrowth) ? data.revenueGrowth : prevData.revenueGrowth,
              salesTools: Array.isArray(data.salesTools) ? data.salesTools : prevData.salesTools,
              negotiationExperience: Array.isArray(data.negotiationExperience) ? data.negotiationExperience : prevData.negotiationExperience,
              role: data.role || prevData.role,
              templateNumber: data.templateNumber || prevData.templateNumber,
            }));
          } else {
            toast.error("❌ Failed to load resume.");
            navigate("/saved-resumes");
          }
        })
        .catch(() => toast.error("❌ Error fetching resume."));
    }
  
    // ✅ Fetch stored user profile (for autofill)
    getUserProfile(userId)
      .then((profile) => {
        if (profile) {
          console.log("🔹 User Basic Info Fetched:", profile);
  
          setSavedBasicData({
            name: profile.name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            summary: profile.summary || "",
            education: Array.isArray(profile.education) ? profile.education : [],
            languages: Array.isArray(profile.languages) ? profile.languages : [],
          });
        }
      })
      .catch(() => {
        console.log("No stored user profile found. User will enter manually.");
      });
  
    // ✅ Check if user has any resumes at all
    getUserResumes(userId).then((resumes) => {
      setHasAnyResume(resumes.length > 0); // ← New flag for autofill check
    });
  
  }, [resumeId, navigate, userId]);
  

  useEffect(() => {
    calculateProgress();
  }, [resumeData]);
  
  
  
  
  
  
  
  
  

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

  const removeField = (section, index) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const handlePreview = () => {
    const requiredFields = ["name", "email", "phone", "summary"];
    const missingFields = requiredFields.filter(field => !resumeData[field]?.trim());

    if (missingFields.length > 0) {
      toast.error(`Please fill out all required fields before previewing.`);
      return;
    }

    if (!resumeData.templateNumber) {
      toast.error("Template selection is missing!");
      return;
    }

    navigate(`/resume-preview/${resumeId || "new"}/${resumeData.templateNumber}`, {
      state: { resumeData }
    });
  };

  // const handleAutofillBasicDetails = () => {
  //   toast.dismiss();
  
  //   if (!savedBasicData || !savedBasicData.name?.trim() || !savedBasicData.email?.trim() || !savedBasicData.phone?.trim()) {
  //     toast.warning("No basic details found. Please create a resume first.", {
  //       toastId: `no-basic-data-warning-${Math.random()}`,
  //       autoClose: 2500,
  //     });
  
  //     setResumeData((prevData) => ({
  //       ...prevData,
  //       name: "",
  //       email: "",
  //       phone: "",
  //       summary: "",
  //       education: prevData.education,
  //       languages: prevData.languages,
  //     }));
  
  //     return;
  //   }
  
  //   console.log("🆕 Autofilling with saved basic details:", savedBasicData);
  
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     name: savedBasicData.name,
  //     email: savedBasicData.email,
  //     phone: savedBasicData.phone,
  //     summary: savedBasicData.summary || "",
  //     education: savedBasicData.education.length > 0 ? savedBasicData.education : prevData.education,
  //     languages: savedBasicData.languages.length > 0 ? savedBasicData.languages : prevData.languages,
  //   }));
  
  //   // 👇 mark form as dirty since autofill changed values
  //   handleInputChange();
  
  //   toast.success("Basic details autofilled!", {
  //     autoClose: 2000,
  //     toastId: `autofill-success-${Math.random()}`,
  //   });
  // };

  const handleAutofillBasicDetails = () => {
    toast.dismiss();
  
    if (
      !hasAnyResume || // ✅ new condition
      !savedBasicData ||
      !savedBasicData.name?.trim() ||
      !savedBasicData.email?.trim() ||
      !savedBasicData.phone?.trim()
    ) {
      toast.warning("No basic details found. Please create a resume first.", {
        toastId: `no-basic-data-warning-${Math.random()}`,
        autoClose: 2500,
      });
  
      setResumeData((prevData) => ({
        ...prevData,
        name: "",
        email: "",
        phone: "",
        summary: "",
        education: prevData.education,
        languages: prevData.languages,
      }));
  
      return;
    }
  
    setResumeData((prevData) => ({
      ...prevData,
      name: savedBasicData.name,
      email: savedBasicData.email,
      phone: savedBasicData.phone,
      summary: savedBasicData.summary || "",
      education: savedBasicData.education.length > 0 ? savedBasicData.education : prevData.education,
      languages: savedBasicData.languages.length > 0 ? savedBasicData.languages : prevData.languages,
    }));
  
    handleInputChange();
  
    toast.success("Basic details autofilled!", {
      autoClose: 2000,
      toastId: `autofill-success-${Math.random()}`,
    });
  };
  
  

  const calculateProgress = () => {
    let filled = 0;
    let total = 0;
  
    const checkFilled = (field) => {
      if (typeof field === "string") return field.trim() !== "";
      return !!field;
    };
  
    const requiredFields = [
      resumeData.name,
      resumeData.email,
      resumeData.phone,
      resumeData.summary,
    ];
  
    requiredFields.forEach((field) => {
      total++;
      if (checkFilled(field)) filled++;
    });
  
    // ✅ Education
    resumeData.education.forEach((edu) => {
      total += 3;
      if (checkFilled(edu.degree)) filled++;
      if (checkFilled(edu.institution)) filled++;
      if (checkFilled(edu.year)) filled++;
    });
  
    // ✅ Skills
    resumeData.skills.forEach((skill) => {
      total++;
      if (checkFilled(skill)) filled++;
    });
  
    // ✅ Languages
    resumeData.languages.forEach((lang) => {
      total += 2;
      if (checkFilled(lang.language)) filled++;
      if (checkFilled(lang.proficiency)) filled++;
    });
  
    // ✅ Software Engineer
    if (resumeData.role === "software-engineer") {
      resumeData.projects.forEach((proj) => {
        total += 2;
        if (checkFilled(proj.title)) filled++;
        if (checkFilled(proj.description)) filled++;
      });
  
      resumeData.certifications.forEach((cert) => {
        total += 3;
        if (checkFilled(cert.title)) filled++;
        if (checkFilled(cert.issuer)) filled++;
        if (checkFilled(cert.year)) filled++;
      });
    }
  
    // ✅ Marketing Manager
    if (resumeData.role === "marketing-manager") {
      resumeData.marketingStrategies.forEach((s) => {
        total += 2;
        if (checkFilled(s.strategy)) filled++;
        if (checkFilled(s.impact)) filled++;
      });
  
      resumeData.socialMedia.forEach((s) => {
        total += 2;
        if (checkFilled(s.platform)) filled++;
        if (checkFilled(s.results)) filled++;
      });
    }
  
    // ✅ Financial Manager
    if (resumeData.role === "financial-manager") {
      resumeData.investments.forEach((inv) => {
        total += 3;
        if (checkFilled(inv.type)) filled++;
        if (checkFilled(inv.amount)) filled++;
        if (checkFilled(inv.years)) filled++;
      });
  
      resumeData.financialTools.forEach((tool) => {
        total++;
        if (checkFilled(tool.name)) filled++;
      });
  
      total += 2;
      if (checkFilled(resumeData.budgetExperience)) filled++;
      if (checkFilled(resumeData.leadershipExperience)) filled++;
    }
  
    const percentage = Math.round((filled / total) * 100);
    setCompletionPercentage(percentage);
  };
  

  return (
    <div className="resume-builder-container">
       {ExitConfirmationModal()}
   <div className="resume-header-builder">
   <h2 className="resume-title" style={{ paddingTop: "10px" }}>Create Your Resume</h2>
   <div className="progress-bar-container">
  <div className="progress-bar-track">
    <div
      className="progress-bar-fill"
      style={{ width: `${completionPercentage}%` }}
    ></div>
  </div>
  <div className="progress-bar-text">
    {completionPercentage}% Complete
  </div>
</div>


   <div class="button-container" onClick={handleAutofillBasicDetails}>
  <button class="autofill-btn">Autofill</button>
</div>




</div>


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
    onChange={(e) => {
      handleChange(e);
      handleInputChange(); // 👈 Track unsaved changes
    }}
    onBlur={() => handleBlur(0, "name", "personalInfo")}
    className={
      touched.personalInfo?.[0]?.name && resumeData.name.trim() === ""
        ? "input-error"
        : ""
    }
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
    onChange={(e) => {
      handleChange(e);
      handleInputChange();
    }}
    onBlur={() => handleBlur(null, "email")}
    className={
      touched.email && resumeData.email.trim() === "" ? "input-error" : ""
    }
  />
  {touched.email && resumeData.email.trim() === "" && (
    <span className="error-text">Email is required</span>
  )}

  {/* Phone */}
  <label className="input-label">
    Phone <span className="required">*</span>
  </label>
  <input
    type="text"
    name="phone"
    placeholder="Enter your phone number"
    value={resumeData.phone}
    onChange={(e) => {
      handleChange(e);
      handleInputChange();
    }}
    onBlur={() => handleBlur(null, "phone")}
    className={
      touched.phone && resumeData.phone.trim() === "" ? "input-error" : ""
    }
  />
  {touched.phone && resumeData.phone.trim() === "" && (
    <span className="error-text">Phone number is required</span>
  )}

  {/* Summary Section */}
  <div className="summary-container">
    <label className="input-label">
      Summary <span className="required">*</span>
    </label>
    <div className="summary-wrapper">
      <textarea
        name="summary"
        placeholder="Enter a short summary"
        value={resumeData.summary}
        onChange={(e) => {
          handleChange(e);
          handleInputChange();
        }}
        onBlur={() => handleBlur(null, "summary")}
        className={`summary-textarea ${
          resumeData.summary.trim() === "" ? "input-error" : ""
        }`}
      />

      {/* AI Icon */}
      <span className="ai-icon" onClick={() => setShowPopup(!showPopup)}>
        <FaMagic />
      </span>

      {/* AI Popup */}
      {showPopup && (
        <div className="ai-popup">
          <div className="ai-popup-header">
            <h4>Generate Summary</h4>
            <FaTimes className="close-icon" onClick={() => setShowPopup(false)} />
          </div>

          {/* Prompt */}
          <textarea
            className="ai-input"
            placeholder="Enter a prompt"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />

          {loading ? (
            <button className="generate-btn" disabled>
              Generating...
            </button>
          ) : (
            <button className="generate-btn" onClick={handleGenerateSummary}>
              Generate
            </button>
          )}

          {/* Result */}
          {generatedText && (
            <div className="ai-response">
              <p>{generatedText}</p>
              <button
                className="use-btn"
                onClick={() => {
                  handleChange({
                    target: { name: "summary", value: generatedText },
                  });
                  handleInputChange();
                  setShowPopup(false);
                }}
              >
                Use This
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {touched.summary && resumeData.summary.trim() === "" && (
      <span className="error-text">Summary is required</span>
    )}
  </div>
</div>



{/* Work Experience Section */}
<div className="section-container">
  <h4>Work Experience</h4>

  {/* Only show the "Add Experience" button initially */}
  {resumeData.experience.length === 0 && (
    <button
      className="add-btn"
      onClick={() => setResumeData({
        ...resumeData, 
        experience: [{ jobTitle: "", company: "", years: "", responsibilities: "" }]
      })}
    >
      + Add Experience
    </button>
  )}

  {/* Show experience fields only if at least one exists */}
  {resumeData.experience.length > 0 &&
    resumeData.experience.map((exp, index) => (
      <div key={index} className="input-group">
        {/* Job Title */}
        <label>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          placeholder="Enter Job Title"
          value={exp.jobTitle}
          onChange={(e) => handleChange(e, index, "experience")}
        />

        {/* Company */}
        <label>Company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter Company Name"
          value={exp.company}
          onChange={(e) => handleChange(e, index, "experience")}
        />

        {/* Years of Experience */}
        <label>Years of Experience</label>
        <input
          type="text"
          name="years"
          placeholder="Years"
          value={exp.years}
          onChange={(e) => handleChange(e, index, "experience")}
        />

        {/* Responsibilities */}
        <label>Responsibilities</label>
        <textarea
          name="responsibilities"
          placeholder="Enter Responsibilities"
          value={exp.responsibilities}
          onChange={(e) => handleChange(e, index, "experience")}
        ></textarea>

        {/* Remove Experience Button */}
        <button
          className="remove-btn"
          onClick={() => removeField("experience", index)}
        >
          Remove Experience
        </button>
      </div>
    ))
  }

  {/* Show "Add Experience" button only when at least one field exists */}
  {resumeData.experience.length > 0 && (
    <button
      className="add-btn"
      onClick={() => addField("experience", { jobTitle: "", company: "", years: "", responsibilities: "" })}
    >
      + Add Experience
    </button>
  )}
</div>


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

      {/* Remove Button (Only for Additional Entries) */}
      {index > 0 && (
        <button 
          className="remove-btn" 
          onClick={() => removeField("education", index)}
        >
          Remove Education
        </button>
      )}
    </div>
  ))}

  {/* Add Education Button */}
  <button 
    className="add-btn" 
    onClick={() => addField("education", { degree: "", institution: "", year: "" })}
  >
    + Add Education
  </button>
</div>




{/* ✅ Skills (Common for all roles) */}
<div className="section-container">
  <h4>Skills <span className="required">*</span></h4>
  {resumeData.skills.map((skill, index) => (
  <div
    key={index}
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}
  >
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
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    />

    {touched.skills?.[index]?.skill && !skill.trim() && (
      <span className="error-text">Required</span>
    )}

    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("skills", index)}
      >
        Remove Skill
      </button>
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
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>
      Project Title <span className="required">*</span>
    </label>
    <input
      type="text"
      name="title"
      placeholder="Enter Project Title"
      value={proj.title}
      onChange={(e) => handleChange(e, index, "projects")}
      onBlur={() => handleBlur(index, "title", "projects")}
      className={touched.projects?.[index]?.title && !proj.title.trim() ? "input-error" : ""}
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
    {touched.projects?.[index]?.title && !proj.title.trim() && (
      <span className="error-text">Project Title is required</span>
    )}

    <label>
      Project Description <span className="required">*</span>
    </label>
    <textarea
      name="description"
      placeholder="Enter Project Description"
      value={proj.description}
      onChange={(e) => handleChange(e, index, "projects")}
      onBlur={() => handleBlur(index, "description", "projects")}
      className={
        touched.projects?.[index]?.description && !proj.description.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    ></textarea>
    {touched.projects?.[index]?.description && !proj.description.trim() && (
      <span className="error-text">Project Description is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("projects", index)}
      >
        Remove Project
      </button>
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
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>Certification Title <span className="required">*</span></label>
    <input
      type="text"
      name="title"
      placeholder="Enter Certification Title"
      value={cert.title}
      onChange={(e) => handleChange(e, index, "certifications")}
      onBlur={() => handleBlur(index, "title", "certifications")}
      className={touched.certifications?.[index]?.title && !cert.title.trim() ? "input-error" : ""}
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
    {touched.certifications?.[index]?.year && !cert.year.trim() && (
      <span className="error-text">Year is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("certifications", index)}
      >
        Remove Certification
      </button>
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
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>Strategy Name <span className="required">*</span></label>
    <input
      type="text"
      name="strategy"
      placeholder="Enter Strategy Name"
      value={strategy.strategy}
      onChange={(e) => handleChange(e, index, "marketingStrategies")}
      onBlur={() => handleBlur(index, "strategy", "marketingStrategies")}
      className={
        touched.marketingStrategies?.[index]?.strategy && !strategy.strategy.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      className={
        touched.marketingStrategies?.[index]?.impact && !strategy.impact.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    ></textarea>
    {touched.marketingStrategies?.[index]?.impact && !strategy.impact.trim() && (
      <span className="error-text">Impact description is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("marketingStrategies", index)}
      >
        Remove Strategy
      </button>
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
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>Platform <span className="required">*</span></label>
    <input
      type="text"
      name="platform"
      placeholder="Enter Platform (e.g., Facebook, Instagram)"
      value={campaign.platform}
      onChange={(e) => handleChange(e, index, "socialMedia")}
      onBlur={() => handleBlur(index, "platform", "socialMedia")}
      className={
        touched.socialMedia?.[index]?.platform && !campaign.platform.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      className={
        touched.socialMedia?.[index]?.results && !campaign.results.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    ></textarea>
    {touched.socialMedia?.[index]?.results && !campaign.results.trim() && (
      <span className="error-text">Results description is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("socialMedia", index)}
      >
        Remove Campaign
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("socialMedia", { platform: "", results: "" })}>
        + Add Campaign
      </button>
    </div>
  </>
)}



{/* Financial Manager Fields */}
{resumeData.role === "financial-manager" && (
  <>
    {/*Investments Section */}
    <div className="section-container">
      <h4>Investments <span className="required">*</span></h4>
      {resumeData.investments.map((inv, index) => (
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>Investment Type <span className="required">*</span></label>
    <input
      type="text"
      name="type"
      placeholder="Investment Type"
      value={inv.type}
      onChange={(e) => handleChange(e, index, "investments")}
      onBlur={() => handleBlur(index, "type", "investments")}
      className={
        touched.investments?.[index]?.type && !inv.type.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      className={
        touched.investments?.[index]?.amount && !inv.amount.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
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
      className={
        touched.investments?.[index]?.years && !inv.years.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
    {touched.investments?.[index]?.years && !inv.years.trim() && (
      <span className="error-text">Years of Experience is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("investments", index)}
      >
        Remove Investment
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("investments", { type: "", amount: "", years: "" })}>
        + Add Investment
      </button>
    </div>

    {/* Financial Tools Section */}
    <div className="section-container">
      <h4>Financial Tools <span className="required">*</span></h4>
      {resumeData.financialTools.map((tool, index) => (
  <div
    key={index}
    className="input-group"
    style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}
  >
    <label>Financial Tool <span className="required">*</span></label>
    <input
      type="text"
      placeholder="Financial Tool"
      name="name"
      value={tool.name}
      onChange={(e) => handleChange(e, index, "financialTools")}
      onBlur={() => handleBlur(index, "name", "financialTools")}
      className={
        touched.financialTools?.[index]?.name && !tool.name.trim()
          ? "input-error"
          : ""
      }
      style={{ padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
    {touched.financialTools?.[index]?.name && !tool.name.trim() && (
      <span className="error-text">Financial Tool is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("financialTools", index)}
      >
        Remove Tool
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("financialTools", { name: "" })}>
        + Add Financial Tool
      </button>
    </div>

    {/* Budget & Risk Management Section */}
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

    {/*Leadership & Strategy Section */}
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

{/*  Sales Manager Fields */}
{resumeData.role === "sales-manager" && (
  <>
    {/* Sales Strategies Section */}
    <div className="section-container">
      <h4>Sales Strategies <span className="required">*</span></h4>
      {resumeData.salesStrategies?.map((strategy, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Strategy Name <span className="required">*</span></label>
    <input
      type="text"
      name="strategy"
      placeholder="Enter Strategy Name"
      value={strategy.strategy}
      onChange={(e) => handleChange(e, index, "salesStrategies")}
      onBlur={() => handleBlur(index, "strategy", "salesStrategies")}
      className={
        touched.salesStrategies?.[index]?.strategy && !strategy.strategy.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
    {touched.salesStrategies?.[index]?.strategy && !strategy.strategy.trim() && (
      <span className="error-text">Strategy Name is required</span>
    )}

    <label>Impact <span className="required">*</span></label>
    <textarea
      name="impact"
      placeholder="Impact (e.g., Increased sales by 20%)"
      value={strategy.impact}
      onChange={(e) => handleChange(e, index, "salesStrategies")}
      onBlur={() => handleBlur(index, "impact", "salesStrategies")}
      className={
        touched.salesStrategies?.[index]?.impact && !strategy.impact.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    ></textarea>
    {touched.salesStrategies?.[index]?.impact && !strategy.impact.trim() && (
      <span className="error-text">Impact description is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("salesStrategies", index)}
      >
        Remove Strategy
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("salesStrategies", { strategy: "", impact: "" })}>
        + Add Strategy
      </button>
    </div>

    {/*  Client Acquisition Section */}
    <div className="section-container">
      <h4>Client Acquisition <span className="required">*</span></h4>
      {resumeData.clientAcquisition?.map((client, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Method <span className="required">*</span></label>
    <input
      type="text"
      name="method"
      placeholder="Enter Acquisition Method (e.g., Cold Calling, Networking)"
      value={client.method}
      onChange={(e) => handleChange(e, index, "clientAcquisition")}
      onBlur={() => handleBlur(index, "method", "clientAcquisition")}
      className={
        touched.clientAcquisition?.[index]?.method && !client.method.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
    {touched.clientAcquisition?.[index]?.method && !client.method.trim() && (
      <span className="error-text">Acquisition method is required</span>
    )}

    <label>Success Rate <span className="required">*</span></label>
    <textarea
      name="successRate"
      placeholder="Success Rate (e.g., Converted 30% leads)"
      value={client.successRate}
      onChange={(e) => handleChange(e, index, "clientAcquisition")}
      onBlur={() => handleBlur(index, "successRate", "clientAcquisition")}
      className={
        touched.clientAcquisition?.[index]?.successRate && !client.successRate.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    ></textarea>
    {touched.clientAcquisition?.[index]?.successRate && !client.successRate.trim() && (
      <span className="error-text">Success rate is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("clientAcquisition", index)}
      >
        Remove Method
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("clientAcquisition", { method: "", successRate: "" })}>
        + Add Acquisition Method
      </button>
    </div>

    {/*  Revenue Growth Achievements */}
    <div className="section-container">
      <h4>Revenue Growth Achievements <span className="required">*</span></h4>
      {resumeData.revenueGrowth?.map((growth, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Achievement <span className="required">*</span></label>
    <input
      type="text"
      name="achievement"
      placeholder="Enter Revenue Growth Achievement"
      value={growth.achievement}
      onChange={(e) => handleChange(e, index, "revenueGrowth")}
      onBlur={() => handleBlur(index, "achievement", "revenueGrowth")}
      className={
        touched.revenueGrowth?.[index]?.achievement && !growth.achievement.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
    {touched.revenueGrowth?.[index]?.achievement && !growth.achievement.trim() && (
      <span className="error-text">Achievement is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("revenueGrowth", index)}
      >
        Remove Achievement
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("revenueGrowth", { achievement: "" })}>
        + Add Revenue Achievement
      </button>
    </div>

    {/*  Sales Tools & Technologies */}
    <div className="section-container">
      <h4>Sales Tools & Technologies <span className="required">*</span></h4>
      {resumeData.salesTools?.map((tool, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Tool Name <span className="required">*</span></label>
    <input
      type="text"
      name="tool"
      placeholder="Enter Sales Tool (e.g., Salesforce, HubSpot)"
      value={tool.tool}
      onChange={(e) => handleChange(e, index, "salesTools")}
      onBlur={() => handleBlur(index, "tool", "salesTools")}
      className={
        touched.salesTools?.[index]?.tool && !tool.tool.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
    {touched.salesTools?.[index]?.tool && !tool.tool.trim() && (
      <span className="error-text">Tool name is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("salesTools", index)}
      >
        Remove Tool
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("salesTools", { tool: "" })}>
        + Add Sales Tool
      </button>
    </div>

    {/*  Negotiation Experience */}
    <div className="section-container">
      <h4>Negotiation Experience <span className="required">*</span></h4>
      {resumeData.negotiationExperience?.map((negotiation, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Scenario <span className="required">*</span></label>
    <textarea
      name="scenario"
      placeholder="Describe a negotiation scenario"
      value={negotiation.scenario}
      onChange={(e) => handleChange(e, index, "negotiationExperience")}
      onBlur={() => handleBlur(index, "scenario", "negotiationExperience")}
      className={
        touched.negotiationExperience?.[index]?.scenario && !negotiation.scenario.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    ></textarea>
    {touched.negotiationExperience?.[index]?.scenario && !negotiation.scenario.trim() && (
      <span className="error-text">Negotiation scenario is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button className="remove-button-style"
        onClick={() => removeField("negotiationExperience", index)}
      >
        Remove Scenario
      </button>
    )}
  </div>
))}

      <button className="add-btn" onClick={() => addField("negotiationExperience", { scenario: "" })}>
        + Add Negotiation Experience
      </button>
    </div>
  </>
)}



{/* Languages (Common for All Roles) */}
<div className="section-container">
  <h4>Languages <span className="required">*</span></h4>
  {resumeData.languages.map((lang, index) => (
  <div
    key={index}
    className="input-group"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "25px"
    }}
  >
    <label>Language <span className="required">*</span></label>
    <input
      type="text"
      name="language"
      placeholder="Language (e.g., English, Spanish)"
      value={lang.language}
      onChange={(e) => handleChange(e, index, "languages")}
      onBlur={() => handleBlur(index, "language", "languages")}
      className={
        touched.languages?.[index]?.language && !lang.language.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
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
      className={
        touched.languages?.[index]?.proficiency && !lang.proficiency.trim()
          ? "input-error"
          : ""
      }
      style={{
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
    {touched.languages?.[index]?.proficiency && !lang.proficiency.trim() && (
      <span className="error-text">Proficiency is required</span>
    )}

    {/* Remove Button */}
    {index > 0 && (
      <button
        style={{
          backgroundColor: "#D32F2F",
          color: "white",
          border: "none",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          marginTop: "10px"
        }}
        onClick={() => removeField("languages", index)}
      >
        Remove Language
      </button>
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
      // resumeData.experience.length === 0 ||
      // resumeData.experience.some(exp =>
      //   !exp.jobTitle?.trim() || !exp.company?.trim() || !exp.years?.trim() || !exp.responsibilities?.trim()
      // ) ||
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
