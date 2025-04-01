import axios from "axios";
const API_BASE_URL = "http://localhost:5001";
// const API_BASE_URL = "http://cassini.cs.kent.edu:8007";

// Signup
export const signupUser = async (userData) => {
    console.log("Signup API Triggered:", userData);
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log("Signup Response:", result);
        return result;
    } catch (error) {
        console.error("Signup API Error:", error);
        return { message: "An unexpected error occurred!" };
    }
};

// Login
export const loginUser = async (userData) => {
    console.log("Login API Triggered:", userData);
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log("Login Response:", result);
        return result;
    } catch (error) {
        console.error("Login API Error:", error);
        return { error: "An unexpected error occurred!" };
    }
};

// Fetch user profile information from backend
export const getUserProfile = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile/${userId}`);
      const data = response.data;
  
      console.log("Fetched Profile Data:", data); // Debugging Log
  
      return {
        name: data.name?.trim() || "",
        email: data.email?.trim() || "",
        phone: data.phone?.trim() || "No Phone Provided",
        summary: data.summary?.trim() || "No Summary Available",
        education: data.education || [],
        languages: data.languages || [],
        profileImage: data.profileImage || "/assets/images/default_profile.jpg",
      };
    } catch (error) {
      console.error("Error fetching profile data:", error.response || error);
      return {
        name: "",
        email: "",
        phone: "No Phone Provided",
        summary: "No Summary Available",
        education: [],
        languages: [],
        profileImage: "/assets/images/default_profile.jpg",
      };
    }
  };
  
  // Upload profile image to Cloudinary via backend
  export const uploadProfileImage = async (userId, formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/profile/${userId}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("Image Upload Response:", response.data);
      return response.data; // { profileImageUrl: "https://..." }
    } catch (error) {
      console.error("Error uploading profile image:", error.response || error);
      throw error;
    }
  };
  
  // Fetch basic user details (name, email)
  export const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/details/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error.response || error);
      throw error;
    }
  };

  // Delete profile image
export const deleteProfileImage = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/profile/${userId}/delete-image`);
      return response.data;
    } catch (error) {
      console.error("Error deleting profile image:", error.response || error);
      throw error;
    }
  };
  

// Save a resume
export const saveResume = async (userId, resumeData) => {
    console.log(`Saving resume for user: ${userId}`, resumeData);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/save/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resumeData),
        });

        const result = await response.json();
        console.log("Resume Save Response:", result);
        return result;
    } catch (error) {
        console.error("Error saving resume:", error);
        return { error: "Failed to save resume" };
    }
};

// Fetch all resumes for a user
export const getUserResumes = async (userId) => {
    console.log(`Fetching all resumes for user: ${userId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/all/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch resumes");
        }
        const resumes = await response.json();
        console.log("Fetched Resumes:", resumes);
        return resumes;
    } catch (error) {
        console.error("Error fetching resumes:", error);
        return [];
    }
};

// Fetch a single resume by ID (for editing)
export const getResumeById = async (resumeId) => {
    console.log(`Fetching Resume: ${resumeId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch resume");
        }
        const resume = await response.json();
        console.log("Fetched Resume:", resume);
        return resume;
    } catch (error) {
        console.error("Error fetching resume:", error);
        return null;
    }
};

// Update a resume
export const updateResume = async (resumeId, updatedData) => {
    console.log(`Updating Resume: ${resumeId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/update/${resumeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();
        console.log("✅ Resume Updated:", result);
        return result;
    } catch (error) {
        console.error("❌ Error updating resume:", error);
        return { error: "Failed to update resume" };
    }
};


// Improved Delete Resume API Call
export const deleteResume = async (resumeId, userId) => {
    console.log(`Deleting resume: ${resumeId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/delete/${resumeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Resume Delete Response:", result);

        if (!response.ok) {
            return { error: result.error || "Failed to delete resume" };
        }

        //  If deletion is successful, fetch the latest user profile
        const updatedProfileResponse = await fetch(`${API_BASE_URL}/user/profile/${userId}?t=${new Date().getTime()}`);
        const updatedProfile = await updatedProfileResponse.json();

        console.log("Updated Profile After Deletion:", updatedProfile);

        return { ...result, updatedProfile }; // ✅ Return updated profile data along with the response
    } catch (error) {
        console.error("Error deleting resume:", error);
        return { error: "Failed to delete resume" };
    }
};

// Submit a review for a template
export const submitReview = async (userId, templateNumber, reviewText) => {
    console.log(`Submitting review for Template ${templateNumber} by User ${userId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/review/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                templateNumber,
                reviewText
            }),
        });

        const result = await response.json();
        console.log("Review Submitted:", result);
        return result;
    } catch (error) {
        console.error("Error submitting review:", error);
        return { error: "Failed to submit review" };
    }
};

//  Fetch all reviews
export const getAllReviews = async () => {
    console.log("Fetching all template reviews...");
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const reviews = await response.json();
        console.log(" Reviews Fetched:", reviews);
        return reviews;
    } catch (error) {
        console.error(" Error fetching reviews:", error);
        return [];
    }
};

//  Update a review
export const updateReview = async (reviewId, userId, newText) => {
    console.log(`Updating review ${reviewId} for user ${userId}...`);
    try {
        const response = await fetch(`${API_BASE_URL}/review/update/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, reviewText: newText }),
        });

        const result = await response.json();
        console.log("✅ Review Updated:", result);
        return result;
    } catch (error) {
        console.error("❌ Error updating review:", error);
        return { error: "Failed to update review" };
    }
};

// Delete a review
export const deleteReview = async (reviewId, userId) => {
    console.log(`Deleting review ${reviewId} for user ${userId}...`);

    try {
        const response = await fetch(`${API_BASE_URL}/review/delete/${reviewId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId }),
        });

        const result = await response.json();
        console.log("✅ Review Deleted:", result);
        return result;
    } catch (error) {
        console.error("❌ Error deleting review:", error);
        return { error: "Failed to delete review" };
    }
};


// Change Password
export const changePassword = async (userId, currentPassword, newPassword, confirmNewPassword) => {
    console.log("Change Password API Triggered:", { userId, currentPassword });
    try {
        const response = await fetch(`${API_BASE_URL}/change-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                current_password: currentPassword,
                new_password: newPassword,
                confirm_new_password: confirmNewPassword,
            }),
        });

        const result = await response.json();
        console.log("Change Password Response:", result);
        return result;
    } catch (error) {
        console.error("Change Password API Error:", error);
        return { error: "An unexpected error occurred!" };
    }
};

//send forgot password email
export const sendForgotPasswordEmail = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
      return { ok: response.ok, data: result };
    } catch (error) {
      return { ok: false, error: "Server error. Please try again later." };
    }
  };
  
  // Reset Password API
export const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });
  
      const result = await response.json();
      return { ok: response.ok, data: result };
    } catch (error) {
      return { ok: false, error: "Server error. Please try again." };
    }
  };

