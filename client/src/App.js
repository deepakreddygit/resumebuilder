// import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Templates from "./pages/Templates";
// import TemplatePage from "./pages/TemplatePage";
// import Profile from "./pages/Profile";
// import ResumeBuilder from "./pages/ResumeBuilder";
// import ResumePreview from "./pages/ResumePreview";
// import SavedResumes from "./pages/SavedResumes";
// import { AuthContext } from "./context/AuthContext";
// import { AuthProvider } from "./context/AuthContext";
// import "./App.css";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("App.js - Loading Auth Data from localStorage...");

//     setTimeout(() => {
//       setLoading(false);
//     }, 500); // Simulate loading time (optional)
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// function AppContent() {
//   const { isAuthenticated, userName } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("AppContent Rendered");

//     if (isAuthenticated && location.pathname === "/") {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [isAuthenticated, location.pathname, navigate]);

//   if (isAuthenticated === null) return <div>Loading user data...</div>; // Prevent rendering if auth state is unknown

//   return (
//     <div className="app-container">
//       {isAuthenticated && !["/login", "/signup"].includes(location.pathname) && <Sidebar />}
//       <div className="content-container">
//         <Navbar userName={userName} />
//         <Routes>
//           <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
//           <Route path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login />} />
//           <Route path="/signup" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Signup />} />

//           {/* Protected Routes */}
//           {isAuthenticated ? (
//             <>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/templates" element={<Templates />} />
//               <Route path="/template/:templateNumber" element={<TemplatePage />} />
//               <Route path="/profile/:userId" element={<Profile />} />

//               {/* ✅ Resume Builder - Supports Multiple Templates */}
//               <Route path="/resume-builder/:templateNumber" element={<ResumeBuilder />} />
//               <Route path="/resume/edit/:resumeId/:templateNumber?" element={<ResumeBuilder />} />

//               <Route path="/resume-preview" element={<ResumePreview />} />

//               {/* ✅ Saved Resumes Page */}
//               <Route path="/saved-resumes" element={<SavedResumes />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate replace to="/login" />} />
//           )}
//         </Routes>

//         {/* ✅ Place ToastContainer Here (Only Load Once) */}
//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import TemplatePage from "./pages/TemplatePage";
import Profile from "./pages/Profile";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./pages/ResumePreview";
import SavedResumes from "./pages/SavedResumes";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App.js - Loading Auth Data from localStorage...");
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading time (optional)
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
          <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Signup />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/template/:templateNumber" element={<TemplatePage />} />
              <Route path="/profile/:userId" element={<Profile />} />

              {/* ✅ Resume Builder - Create & Edit Resumes */}
              <Route path="/resume-builder/:templateNumber" element={<ResumeBuilder />} />
              <Route path="/resume/edit/:resumeId/:templateNumber?" element={<ResumeBuilder />} />

              {/* ✅ Resume Preview - Uses URL Params */}
              <Route path="/resume-preview/:resumeId/:templateNumber" element={<ResumePreview />} />

              {/* ✅ Saved Resumes Page */}
              <Route path="/saved-resumes" element={<SavedResumes />} />
            </>
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}
        </Routes>

        {/* ✅ Place ToastContainer Here (Only Load Once) */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
