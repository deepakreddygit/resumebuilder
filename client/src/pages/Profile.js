import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";


function Profile() {
  const navigate = useNavigate();
  const { userId, userName } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Profile Component Loaded");
  console.log("User ID from AuthContext:", userId);

  useEffect(() => {
    if (!userId) {
      console.warn("User ID is missing! Redirecting to login...");
      navigate("/login");
      return;
    }

    console.log(`Fetching user data from API: http://localhost:5001/user/${userId}`);

    axios
      .get(`http://localhost:5001/user/${userId}`)
      .then((response) => {
        console.log("User data fetched from API:", response.data);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
      });
  }, [userId, navigate]);

  if (loading) return <div className="loading">Loading user profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <h1 className="text-center mb-4">Profile Information</h1>
      <div className="row justify-content-center">
        {/* Profile Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card">
          <img
  src={userData.profilePicture || "/assets/images/default_profile.jpg"}
  alt="Profile"
  className="card-img-top rounded-circle mx-auto mt-4"
  style={{ width: "150px", height: "150px", objectFit: "cover" }}
/>


            <div className="card-body">
              <h5 className="card-title text-center">{userData.name || userName}</h5>
              <p className="card-text">
                <strong>Email:</strong> {userData.email || "N/A"}
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
