import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles.css';

const Home = () => {
  const [Login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (Login === "bob@gmail.com" && password === "password") {
  //     navigate("/contact_list");
  //     setErrMsg('');
  //   }
  //   else {
  //     console.error('Incorrect Login Credentials');
  //     setErrMsg('Invalid Username or Password.');
  //   };
  // };
    const Home = async () => {
      const url = 'http://gerberknights3.xyz/LAMPAPI/AccountLogin.php';
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          // body: JSON.stringify({ Login, password})
          body: JSON.stringify({ Login, Password: password})
  
        })
        // .then(response => response.json())
        // .then(data => console.log( "response" + data));
        // used await instead of then, both work
        const data = await response.json();
        console.log("response", data);
        
        // checks to make sure its a created account
        if (data.id > 0) {
          navigate("/contact_list");
        } else {
          setErrMsg(data.error || 'Invalid Username or Password');
        }
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
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
