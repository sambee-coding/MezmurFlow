import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css"; // Reusing the premium styles
import Logo from "../assets/Logo.png";

function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Welcome to the Haven! Please sign in with your new account.");
          navigate("/Commune");
        } else {
          alert(data.message);
        }
    } catch (err) {
        alert("Connection failed. Is the backend running?");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-glass-card">
        <div className="signin-header">
          <Link to="/"><img src={Logo} alt="Logo" className="signin-logo" /></Link>
          <h2>Create Haven</h2>
          <p>Join our spiritual community and start your journey</p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
                type="text" 
                placeholder="Abebe Balcha"
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input 
                type="email" 
                placeholder="name@example.com"
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
                type="password" 
                placeholder="••••••••"
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          <button type="submit" className="signin-btn">Create Haven</button>
        </form>
        <div className="signin-footer">
          <p>Already have an account? <Link to="/Commune">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
