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
