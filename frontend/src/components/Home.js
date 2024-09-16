import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles.css';

const Home = () => {
  const [Login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

    const Home = async () => {
      const url = 'http://gerberknights3.xyz/LAMPAPI/AccountLogin.php';
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({ Login, Password: password})
  
        })

        // used await instead of then, both work
        const data = await response.json();
        console.log("response", data);
        
        if (data.id > 0) {
          localStorage.setItem('userID', data.id); // adds userID to the local storage so we can use it on other pages
          navigate("/contact_list");
        } else {
          setErrMsg(data.error || 'Invalid Username or Password');
        }
      } catch (error) {
        console.error('Error adding contact:', error);
        setErrMsg('Invalid Username or Password.');
      }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Home();  
  };

  // resets error message
  const handleUsernameChange = (e) => {
    setLogin(e.target.value);
    setErrMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrMsg("");
  };

  return (
    <>
      <div className="main-body">
        <div className="welcome-text">
          <h1>Welcome to the UCF Contact Manager</h1>
        </div>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" 
              name="Login" 
              placeholder="Username" 
              required 
              value={Login} 
              onChange={handleUsernameChange} 
            />
            <input type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={password} 
              onChange={handlePasswordChange}
              />

          </div>
          {errMsg && (<p style={{ color:"red" }}>{errMsg}</p>)}
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
