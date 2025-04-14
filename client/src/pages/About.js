import React, { useEffect } from "react";
import "../styles/About.css";
import useInViewAnimation from "../hooks/useInViewAnimation";
import DeveloperCard from "../components/DeveloperCard";

const teamMembers = [
  { name: "Deepak", image: "/assets/images/team/dev1.jpg", role: "Frontend Developer" },
  { name: "Monisha", image: "/assets/images/team/dev2.jpeg", role: "Backend Developer" },
  { name: "Meenakshi", image: "/assets/images/team/dev3.JPG", role: "UI/UX Designer" },
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

      {/* Vision & Mission */}
      <section className="mb-5">
        <div className="row text-center justify-content-center">
          <div
            ref={visionRef}
            className={`col-md-8 fade-slide-in ${visionInView ? "visible" : ""}`}
          >
            <blockquote className="blockquote fs-5 fst-italic text-muted mb-4">
              "A well-crafted resume doesn't just showcase your experience, it tells your story."
            </blockquote>
            <h4 className="fw-bold">Our Vision</h4>
            <p className="text-muted">
              To empower individuals with a simple, intelligent platform that helps them confidently take the next step in their career journey.
            </p>
            <h4 className="fw-bold mt-4">Our Mission</h4>
            <p className="text-muted">
              To build a user-friendly, AI-enhanced resume creation tool that simplifies resume writing,
              fosters creativity, and enhances the job-seeking experience — all for free.
            </p>
          </div>
        </div>
      </section>

      {/* Core Concept */}
      <section className="mb-5">
        <div className="row align-items-center" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            ref={textRef}
            className={`col-md-6 fade-left ${textInView ? "visible" : ""}`}
          >
            <p className="fs-6 text-muted" style={{ lineHeight: "1.8" }}>
              <strong>  Pro Resume</strong> is more than just a tool — it’s your personal career companion.
              Designed with simplicity, accessibility, and efficiency in mind, our platform helps individuals
              from all walks of life create modern, recruiter-ready resumes without any cost.
              <br /><br />
              Whether you're a student entering the job market, a professional exploring new opportunities,
              or someone looking to refresh your career profile, Resume Builder makes the process intuitive
              and stress-free. Our goal is to eliminate the complexity of traditional resume formatting and
              replace it with a seamless, guided experience.
              <br /><br />
              With customizable templates, AI-powered suggestions (coming soon!), and a real-time
              live preview, our application gives you the confidence to present your skills and experience
              with clarity and style.
              <br /><br />
              Developed by passionate Computer Science students and guided by mentors, our project is rooted
              in innovation and practical impact.
            </p>
          </div>
          <div
            ref={imgRef}
            className={`col-md-6 text-center fade-right ${imgInView ? "visible" : ""}`}
          >
            <img
              src="/assets/images/team-discussion.png"
              alt="Team Discussion"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </section>

      {/* Professors */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Our Professors</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mb-4">
            <img src="/assets/images/team/professor1.jpg" alt="Professor 1" className="rounded-circle shadow" width="160" height="160" />
            <h5 className="mt-3 mb-1">Dr. Professor One</h5>
            <p className="text-muted">Capstone Mentor</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <img src="/assets/images/team/professor2.jpg" alt="Professor 2" className="rounded-circle shadow" width="160" height="160" />
            <h5 className="mt-3 mb-1">Dr. Professor Two</h5>
            <p className="text-muted">Technical Advisor</p>
          </div>
        </div>
      </section>

      {/* Developers */}
      <section>
        <h2 className="text-center mb-4">Meet the Developers</h2>
        <div className="row justify-content-center">
          {teamMembers.map((member, index) => (
            <DeveloperCard
              key={index}
              image={member.image}
              name={member.name}
            //   role={member.role}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
