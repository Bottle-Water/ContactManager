import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles.css';
import Navbar from "./Navbar";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "bob@gmail.com" && password === "password") {
      navigate("/contact_list");
    } else {
      alert("Invalid Login, Please Try Again!");
    }
  };

  return (
    <>
    <Navbar />
      <div className="main-body">
        <div className="welcome-text">
          <h1>Welcome to the UCF Contact Manager</h1>
        </div>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="create-account">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
