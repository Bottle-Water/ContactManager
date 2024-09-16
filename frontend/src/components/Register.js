import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Register = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const Register = async () => {
    const url = 'http://gerberknights3.xyz/LAMPAPI/AccountCreation.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ FirstName, LastName, Login, Password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      // Redirect to login page or show success message
    } catch (error) {
      console.error('Error adding contact:', error);
      // Show error message to the user
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Register();
  };

  return (
    <div className="main-body">
      <form onSubmit={handleRegister}>
        <h1>Register an Account</h1>
        <div className="input-box">
          <div className='name-box'>
            <input 
            type="text"
            name="FirstName"
            placeholder="Enter First Name"
            required
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Enter Last Name"
            required
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>
          <input
            type="text"
            name="Login"
            placeholder="Enter a Username"
            required
            value={Login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="create-account">
          <p>
            Already Have an Account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
