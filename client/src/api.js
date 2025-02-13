const API_BASE_URL = "http://localhost:5001";

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

// Get User Profile
export const getUserProfile = async (userId) => {
    console.log(`Fetching user data for userId: ${userId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("User Data Fetched:", data);
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { error: "Failed to load user data" };
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


// Delete a resume
export const deleteResume = async (resumeId) => {
    console.log(`Deleting resume: ${resumeId}`);
    try {
        const response = await fetch(`${API_BASE_URL}/resume/delete/${resumeId}`, {
            method: "DELETE",
        });

        const result = await response.json();
        console.log("Resume Delete Response:", result);
        return result;
    } catch (error) {
        console.error("Error deleting resume:", error);
        return { error: "Failed to delete resume" };
    }
};
