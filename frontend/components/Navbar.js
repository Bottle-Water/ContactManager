import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
            <Link to="/">
                <h2>UCF Contact Manager</h2>
            </Link>
        </div>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/Register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;