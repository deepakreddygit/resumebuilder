import React, { useEffect } from "react";
import "../styles/About.css";
import useInViewAnimation from "../hooks/useInViewAnimation";
import DeveloperCard from "../components/DeveloperCard";

const teamMembers = [
  { name: "Deepak", image: "/assets/images/team/dev1.jpg", role: "Frontend Developer" },
  { name: "Monisha", image: "/assets/images/team/dev2.jpeg", role: "Backend Developer" },
  { name: "Meenakshi", image: "/assets/images/team/dev1.jpg", role: "UI/UX Designer" },
  { name: "Varshini", image: "/assets/images/team/dev1.jpg", role: "AI Integration Lead" },
  { name: "Siva", image: "/assets/images/team/dev1.jpg", role: "Testing & QA" },
  { name: "Jaswini", image: "/assets/images/team/dev1.jpg", role: "Project Manager" },
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visionRef, visionInView] = useInViewAnimation();
  const [textRef, textInView] = useInViewAnimation();
  const [imgRef, imgInView] = useInViewAnimation();

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        marginTop: "70px",
        paddingBottom: "100px",
      }}
    >
      <h1 className="text-center mb-4 fw-bold">
        About Pro Resume
      </h1>

    </div>
  );
};

export default About;
