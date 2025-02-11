import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";  
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Auth.css";
import "../index.css";
import "../styles/Messages.css";
import { signupUser } from "../api"; 

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [messageStyle, setMessageStyle] = useState({});
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Validate password format
        if (!validatePassword(password)) {
            setMessage("Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.");
            setMessageStyle({ color: "red" });
            return;
        }
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            setMessageStyle({ color: "red" });
            return;
        }
    
        // Send signup request to backend
        const response = await signupUser({ name, email, password, confirmPassword });
    
        // Check the response from the backend
        if (response.message === "User created successfully!") {
            setMessage("Signup successful! Redirecting to login...");
            setMessageStyle({ color: "green" });
            setTimeout(() => navigate("/login"), 1500);
        } else {
            // Handle error if the user already exists
            if (response.message === "User already exists!") {
                setMessage("This email is already registered. Please use a different email.");
                setMessageStyle({ color: "red" });
            } else {
                // If any other error message occurs
                setMessage(response.message || "Error signing up!");
                setMessageStyle({ color: "red" });
            }
        }
    };
    
    
    

    return (
        <div className="auth-container">
            <div className="row w-100">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="fw-bold">The Ultimate Resume Builder</h1>
                    <p className="text-muted">
                        Build beautiful, recruiter-tested resumes in a few clicks! Our resume builder is powerful and easy to use.
                    </p>
                    <p className="text-muted">
                        Custom-tailor resumes for any job within minutes. Increase your interview chances and rise above the competition.
                    </p>
                </div>

                <div className="col-md-6">
                    <div className="card p-4 shadow position-relative">  
                        <h2 className="text-center">Signup</h2>

                        {/* Error Message Container */}
                        <div className="error-message-container">
                            {message && (
                                <div className="alert text-center" style={messageStyle}>
                                    {message}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="mb-3 position-relative">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <span className="eye-icon" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                        </form>
                        <div className="text-center mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
