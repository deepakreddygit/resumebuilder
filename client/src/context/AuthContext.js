import React, { createContext, useState, useEffect } from "react";

// Create AuthContext to manage user authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // If a token exists, user is authenticated
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || "";
  });

  // This effect checks the token, userName, and userId on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");

    console.log("AuthContext Loaded:");
    console.log("Token:", token);
    console.log("Stored User Name:", storedUser);
    console.log("Stored User ID:", storedUserId);

    if (token && storedUser && storedUserId) {
      setIsAuthenticated(true);
      setUserName(storedUser);
      setUserId(storedUserId);
    } else {
      setIsAuthenticated(false);
      setUserName("");
      setUserId("");
    }
  }, []);

  // Login function updates context and localStorage
  const login = (userName, userId, token) => {
    console.log("Login Function Triggered:");
    console.log("Received User Name:", userName);
    console.log("Received User ID:", userId);
    console.log("Received Token:", token);

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);

    setIsAuthenticated(true);
    setUserName(userName);
    setUserId(userId);
  };

  // Logout function clears context and localStorage
  const logout = () => {
    console.log("Logging Out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    setIsAuthenticated(false);
    setUserName("");
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
