import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";  
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { loginUser } from "../api";  

function Login() {
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const data = await loginUser({ email, password });


    if (data.message === "Login successful!") {
      const { user, user_id, token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", user);
      localStorage.setItem("userId", user_id);

      login(user, user_id, token);

      console.log("User ID from loginUser:", user_id);  

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } else {
      setErrorMsg(data.error || "Invalid credentials!");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="login-container row w-100 w-md-75">
        {/* Left Section - Login Form */}
        <div className="login-left col-12 col-md-6 p-4">
          <div className="login-box">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email" 
                  required 
                  className="form-control"
                />
              </div>
              <div className="input-group password-group mt-3">
                <input 
                  type={passwordVisible ? "text" : "password"}  
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  required 
                  className="form-control"
                />
                <span 
                  className="eye-icon" 
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>

              {/* Error Message */}
              <div className="error-message-container mt-3">
                {errorMsg && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errorMsg}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>


        <div className="login-right col-12 col-md-6 p-4 d-flex align-items-center justify-content-center flex-column">
          <h1 className="text-center">Welcome Back!</h1>
          <p className="text-center">Log in to access your personalized resume builder. Create professional, recruiter-approved resumes in minutes!</p>
          <p className="text-center">Don't have an account? <Link to="/signup">Sign up now.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
