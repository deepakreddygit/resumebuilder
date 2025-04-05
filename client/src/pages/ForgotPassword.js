import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { sendForgotPasswordEmail } from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, data, error } = await sendForgotPasswordEmail(email);

    if (ok) {
      toast.success("Reset link sent! Check your email.");
    } else {
      toast.error(data?.error || error || "Something went wrong.");
    }
  };
  return (
    <div
      className="login-page d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
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
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Send Reset Link
              </button>
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
