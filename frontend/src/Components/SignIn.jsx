import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./SignIn.css";
import Logo from "../assets/Logo.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in...", email);

    try {
        const response = await fetch(`${API_URL}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            login(data.user, data.token);
            navigate("/DaySelector");
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error("Sign in failed:", err);
    }
};

  return (
    <div className="signin-container">
      <div className="signin-glass-card">
        <div className="signin-header">
          <Link to="/">
            <img src={Logo} alt="MezmurFlow Logo" className="signin-logo" />
          </Link>
          <h2>Welcome Back</h2>
          <p>Enter your details to continue your spiritual journey</p>
        </div>

        <form className="signin-form"  onSubmit={onHandleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} placeholder="name@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}} placeholder="••••••••" required />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn" >Sign In</button>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <Link to="/Haven">Create Haven</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
