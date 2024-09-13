import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles.css';
import Navbar from "./Navbar";

const Home = () => {
  const [Login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (Login === "bob@gmail.com" && password === "password") {
      navigate("/contact_list");
    };
  };
    const Home = async () => {
      const url = 'http://gerberknights3.xyz/LAMPAPI/AccountLogin.php';
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({ Login, password})
  
        })
        .then(response => response.json())
        .then(data => console.log( "response" + data));
    
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error adding contact:', error);
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
            <input type="text" name="Login" placeholder="Username" required value={Login} onChange={(e) => setLogin(e.target.value)} />
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
