import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import Profile from "./pages/Profile";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./pages/ResumePreview";
import SavedResumes from "./pages/SavedResumes";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./pages/NotFound"; 
import Help from "./pages/Help";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App.js - Loading Auth Data from localStorage...");
    setTimeout(() => {
      setLoading(false);
    }, 500); //simulate loading time 
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
  const { isAuthenticated, userName } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppContent Rendered");

    if (isAuthenticated && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isAuthenticated === null) return <div>Loading user data...</div>; // Prevent rendering if auth state is unknown

  return (
    <div className="app-container">
      {isAuthenticated && !["/login", "/signup"].includes(location.pathname) && <Sidebar />}
      <div className="content-container">
        <Navbar userName={userName} />
        <Routes>
          {/* 🔹 Public Routes */}
          <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Signup />} />
          <Route path="/forgot-password" element={isAuthenticated ? <Navigate replace to="/login" /> : <ForgotPassword />} /> 
          <Route path="/reset-password"  element={isAuthenticated ? <Navigate replace to="/login" /> : <ResetPassword />} />
          <Route path="/help" element={<Help />} />

          {/* 🔹 Protected Routes (Require Authentication) */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/profile/:userId" element={<Profile />} />

              {/* ✅ Resume Builder - Supports Multiple Roles & Templates */}
              <Route path="/resume-builder/:role/:templateNumber" element={<ResumeBuilder />} />
              <Route path="/resume/edit/:resumeId/:templateNumber?" element={<ResumeBuilder />} />

              {/* ✅ Resume Preview - Uses resumeId Instead of Role */}
              <Route path="/resume-preview/:resumeId/:templateNumber?" element={<ResumePreview />} />

              {/* ✅ Saved Resumes Page */}
              <Route path="/saved-resumes" element={<SavedResumes />} />
            </>
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}

          {/* 🔹 Catch-All for Unknown Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ✅ Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
