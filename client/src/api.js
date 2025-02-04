const API_BASE_URL = "http://localhost:5001";  

//signup
export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.error("Signup API error:", error);
        return { message: "An unexpected error occurred!" };
    }
};

//login
export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        return await response.json();
    } catch (error) {
        console.error("Login API error:", error);
        return { error: "An unexpected error occurred!" };
    }
};
