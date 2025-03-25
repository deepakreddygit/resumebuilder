import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/ResetPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const userId = query.get("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}[\]\\/+<>=~|_.,:;"'-]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.warn("Password must be at least 8 characters, include uppercase, lowercase, number & special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(result.error || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="login-container row w-100 w-md-75">
        {/* Left Section - Reset Password Form */}
        <div className="login-left col-12 col-md-6 p-4">
          <div className="login-box">
            <h2 className="text-center">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="input-group password-group mt-3">
                <input 
                  type={passwordVisible ? "text" : "password"}  
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="New Password" 
                  required 
                  className="form-control"
                />
                <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="input-group mt-3">
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm New Password" 
                  required 
                  className="form-control"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success w-100 mt-3">Reset Password</button>
            </form>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="login-right col-12 col-md-6 p-4 d-flex align-items-center justify-content-center flex-column">
          <h1 className="text-center">Secure Your Account</h1>
          <p className="text-center">Choose a strong password that you haven't used before.</p>
          <img 
            src="/assets/images/illustrations/strong_password.png" 
            alt="Strong Password Illustration" 
            className="strong_password"
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
