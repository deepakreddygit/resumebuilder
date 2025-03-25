import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        const { user_id } = result;
        toast.success("Email verified! Redirecting...");
        setTimeout(() => {
          navigate(`/reset-password?user_id=${user_id}`);
        }, 1000);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="login-container row w-100 w-md-75">
        <div className="login-left col-12 col-md-6 p-4">
          <div className="login-box">
            <h2 className="text-center">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group mt-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-warning w-100 mt-3">Submit</button>
            </form>
          </div>
        </div>

        <div className="login-right col-12 col-md-6 p-4 d-flex align-items-center justify-content-center flex-column">
          <h1 className="text-center">Reset Your Password</h1>
          <p className="text-center">We'll help you set a new one securely.</p>
          <div className="forgot_password">
            <img 
              src="/assets/images/illustrations/forgot_password.png" 
              alt="Forgot Password Illustration" 
              className="forgot_password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
