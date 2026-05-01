import React from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Logo from "../assets/Logo.png";
import { useState } from "react";

function SignIn() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onHandleSubmit = (e) =>{
        e.preventDefault();
        console.log(email, password);

        try{
            const response = await fetch('http://localhost:5000/api/auth/signin',{
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({email,password});
                
                
                
        });
        const data = await response.json();
        console.log("server responeded with data:",data);    if (response.ok) {
            alert("Success! You are signed in.");
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error("Shipping failed:", err);
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
          <p>Don't have an account? <a href="#">Create Haven</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
