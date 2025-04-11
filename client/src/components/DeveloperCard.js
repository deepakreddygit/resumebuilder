import React from "react";
import useInViewAnimation from "../hooks/useInViewAnimation";
import "../styles/About.css";

const DeveloperCard = ({ image, name, role }) => {
  const [ref, inView] = useInViewAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`col-lg-4 col-md-6 col-sm-12 mb-5 text-center fade-slide-in ${inView ? "visible" : ""}`}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          marginBottom: "20px",
        }}
      />
      <h5 className="fw-bold mb-1" style={{ fontSize: "1.25rem" }}>{name}</h5>
      <p className="text-muted" style={{ fontSize: "1rem" }}>{role}</p>
    </div>
  );
};

export default DeveloperCard;
