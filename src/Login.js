import React, { useState } from "react";
import './Loginsign.css'; 

import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    const authRequest = { username: email, password: password };
    try {
      const response = await fetch("http://localhost:8081/auth/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authRequest)
      });

      if (response.ok) {
        const token = await response.text();
        console.log("Generated Token:", token);

        localStorage.setItem("token", token);

        navigate('/ProductPage');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="forget-password">Lost Password <span>Click Here</span></div>
      <div className="submit-container">
        <div className="submit" onClick={handleLoginClick}>Login</div>
      </div>
    </div>
  );
};

export default Login;
