import React from "react";
import "../styles/TipsPanel.css";

const tips = {
  summary: [
    "Write a 2–3 sentence professional summary.",
    "Highlight your key strengths and career goals.",
    "Avoid personal pronouns like 'I' or 'my'."
  ],
  experience: [
    "Use action verbs (e.g., 'Developed', 'Led').",
    "Quantify results where possible.",
    "Keep bullet points concise and impactful."
  ],
  education: [
    "Include full degree name, institution, and year.",
    "Mention relevant coursework or honors."
  ],
  skills: [
    "List job-relevant technical and soft skills.",
    "Avoid duplicating skills already shown in projects."
  ]
};

const TipsPanel = () => {
  return (
    <div className="tips-panel-form">
      <h3>💡 Resume Writing Tips</h3>

      <h4>📝 Summary</h4>
      <ul>{tips.summary.map((tip, i) => <li key={i}>{tip}</li>)}</ul>

      <h4>💼 Work Experience</h4>
      <ul>{tips.experience.map((tip, i) => <li key={i}>{tip}</li>)}</ul>

      <h4>🎓 Education</h4>
      <ul>{tips.education.map((tip, i) => <li key={i}>{tip}</li>)}</ul>

      <h4>🛠 Skills</h4>
      <ul>{tips.skills.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
    </div>
  );
};

export default TipsPanel;
