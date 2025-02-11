import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import TemplatePage from "./pages/TemplatePage";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext"; 
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    console.log("App.js - Loaded Auth Data from localStorage:");
    console.log("Token:", token);
    console.log("User Name:", userName);
    console.log("User ID:", userId);

    if (token && userName && userId) {
      console.log("User is authenticated!");
    } else {
      console.log("User is not authenticated!");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, userName, userId } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppContent Rendered");
    console.log("User ID from AuthContext:", userId);  // Log the userId from AuthContext

    if (isAuthenticated && location.pathname === "/") {
      console.log("User is authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, userId, location.pathname, navigate]);

  return (
    <div className="app-container">
      {isAuthenticated && !["/login", "/signup"].includes(location.pathname) && <Sidebar />}
      <div className="content-container">
        <Navbar userName={userName} />
        <Routes>
          <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Signup />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
          <Route path="/templates" element={isAuthenticated ? <Templates /> : <Navigate replace to="/login" />} />
          <Route path="/template/:templateNumber" element={isAuthenticated ? <TemplatePage /> : <Navigate replace to="/login" />} />
          <Route path="/profile/:userId" element={isAuthenticated ? <Profile /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
