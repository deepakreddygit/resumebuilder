import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/ResetPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { resetPassword } from "../api";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      setTokenValid(true); 
    } else {
      toast.error("Invalid or missing token.");
      setTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}[\]\\/+<>=~|_.,:;"'-]).{8,}$/;
  
    if (!passwordRegex.test(newPassword)) {
      toast.warn("Password must be at least 8 characters and include uppercase, lowercase, number & special character.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    const { ok, data, error } = await resetPassword(token, newPassword, confirmPassword);
  
    if (ok) {
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error(data?.error || error || "Failed to reset password.");
    }
  };
  

  if (!tokenValid) {
    return (
      <div className="login-page d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <h3>Invalid or expired link.</h3>
      </div>
    );
  }

  return (
    <div className="login-page d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="login-container row w-100 w-md-75">
        <div className="login-left col-12 col-md-6 p-4">
          <div className="login-box">
            <h2 className="text-center">Reset Password</h2>
            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="btn btn-success w-100 mt-3">Reset Password</button>
            </form>
          </div>
        </div>

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
