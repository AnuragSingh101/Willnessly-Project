import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpeg'; // Import the logo

const NavBar = ({ theme = 'light' }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  return (
    <div style={{ position: 'relative', padding: '5px 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {/* Logo and Title Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={logo} 
          alt="Wellnessify Logo" 
          style={{ height: '50px', width: 'auto' }} // Reduced logo height
        />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Wellnessify</h1> {/* Smaller font size */}
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'gray' }}>Your Health, Our Care</p> {/* Smaller subtitle */}
        </div>
      </div>

      {/* Center Navigation Links */}
      <nav style={{ textAlign: 'center', margin: '10px 0' }}> {/* Reduced top/bottom margin */}
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/aboutus" style={navLinkStyle}>About Us</Link>
        {isLoggedIn && <Link to="/remedies" style={navLinkStyle}>Remedies</Link>}
        {isLoggedIn && <Link to="/searchhistory" style={navLinkStyle}>History</Link>}
        {!isLoggedIn && <Link to="/login" style={navLinkStyle}>Login</Link>}
        {!isLoggedIn && <Link to="/signup" style={navLinkStyle}>Sign Up</Link>}
      </nav>

      {/* Profile and Logout Buttons */}
      {isLoggedIn && (
        <div style={{ position: 'absolute', top: '5px', right: '20px', display: 'flex', gap: '10px' }}>
          <Link to="/profile" style={iconButtonStyle}>
            <FaUser size={18} /> {/* Smaller icon */}
          </Link>
          <button onClick={handleLogout} style={iconButtonStyle}>
            <FaSignOutAlt size={18} /> {/* Smaller icon */}
          </button>
        </div>
      )}
    </div>
  );
};


const navLinkStyle = {
  textDecoration: 'none',
  margin: '0 10px', 
  fontSize: '0.9rem', 
  fontWeight: '500',
  color: '#333',
  padding: '5px 10px', 
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

const iconButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '5px', 
  borderRadius: '5px',
  color: '#333',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

navLinkStyle[':hover'] = {
  backgroundColor: '#1abc9c',
  color: '#fff',
};

iconButtonStyle[':hover'] = {
  backgroundColor: '#1abc9c',
  color: '#fff',
};

export default NavBar;
