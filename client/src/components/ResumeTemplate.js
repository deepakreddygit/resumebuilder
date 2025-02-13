import React from "react";
import templates from "./templates"; // Import all templates

const ResumeTemplate = ({ resumeData, templateNumber }) => {
  const SelectedTemplate = templates[templateNumber] || templates[1]; // Default to Template 1

  return <SelectedTemplate resumeData={resumeData} />;
};

export default ResumeTemplate;
