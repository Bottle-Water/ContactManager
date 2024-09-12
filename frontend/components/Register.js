import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import Navbar from './Navbar';

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // If credentials already taken, alert
    if(1===0) {
      // use better logic to figure out which specific one is already used
      alert("Credentials already taken.");
    } else {
      navigate("/");
    }
  };

  return (
    <>
    <Navbar />
      <div className="main-body">
        <form onSubmit={handleLogin}>
          <h1>Register an Account</h1>
          <div className="input-box">
            <input type="email" name="email" placeholder="Enter an Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="Enter a Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <ul>
              <li>Password Requirements:</li>
              <li>Must include one capital letter, one number, and one special character.</li>
              <li>Must be 6-20 characters long.</li>
            </ul>
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="create-account">
            <p>Already Have an Account?<Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;