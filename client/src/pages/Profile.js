import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile } from "../api";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!userId) {
      console.warn("User ID is missing! Redirecting back to the login screen.");
      navigate("/login");
      return;
    }

    console.log(`Fetching user profile for userId: ${userId}`);
    getUserProfile(userId)
      .then((data) => {
        console.log("🔹 User Profile Data:", data);
        setUserProfile({ name: data.name, email: data.email });
      })
      .catch((error) => {
        console.error(" Error fetching user profile:", error);
      });
  }, [userId, navigate]);

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <img
          src="/assets/images/default_profile.jpg"
          alt="Profile"
          className="profile-img"
        />
        <h5>{userProfile.name || "Unknown User"}</h5>
        <p><strong>Email:</strong> {userProfile.email || "N/A"}</p>

        {/* Button to View Saved Resumes */}
        <button className="view-resumes-btn" onClick={() => navigate("/saved-resumes")}>
          View Saved Resumes
        </button>
      </div>
    </div>
  );
}

export default Profile;
