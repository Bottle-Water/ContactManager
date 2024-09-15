import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Register = () => {

  const [Login, setLogin] = useState("");
  const [password, setPassword] = useState("");


  const Register = async () => {
    const url = 'http://gerberknights3.xyz/LAMPAPI/AccountCreation.php';
  
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
      .then(response => response.json())
      .then(data => console.log( "response" + data));
  
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
};

const handleLogin = (e) => {
  e.preventDefault();
  Register();
};

  return (
    <>
      <div className="main-body">
        <form onSubmit={handleLogin}>
          <h1>Register an Account</h1>
          <div className="input-box">
            <input type="text" name="Login" placeholder="Enter a Username" required value={Login} onChange={(e) => setLogin(e.target.value)}/>
            <input type="password" name="password" placeholder="Enter a Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            {/* <ul>
              <li>Password Requirements:</li>
              <li>Must include one capital letter, one number, and one special character.</li>
              <li>Must be 6-20 characters long.</li>
            </ul> */}
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="create-account">
            <p>Already Have an Account? <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;