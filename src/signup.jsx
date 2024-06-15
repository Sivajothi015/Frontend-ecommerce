import React, { useState } from "react";
import './Loginsign.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    const userInfo = { name, email, password };
    try {
      const response = await fetch("http://localhost:8081/auth/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
      });

      if (response.ok) {
        alert("Sign Up successfully");
        setAction("Sign Up");
      } else {
        alert("Sign Up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign Up failed");
    }
  };

  const handleLoginClick = () => {
    if (action === "Sign Up") {
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt=""/>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      {action === "Sign Up" ? null : (
        <div className="forget-password">Lost Password <span>Click Here</span></div>
      )}
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUpClick}>SignUp</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleLoginClick}>Login</div>
      </div>
    </div>
  );
};

export default Signup;
