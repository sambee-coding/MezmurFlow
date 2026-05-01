import React from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Logo from "../assets/Logo.png";

function SignIn() {
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

        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <a href="#">Create Haven</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
