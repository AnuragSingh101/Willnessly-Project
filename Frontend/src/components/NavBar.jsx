// NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const NavBar = ({ theme = 'light' }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div style={theme === 'dark' ? styles.navBarDark : styles.navBarLight}>
      <div style={styles.header}>
        <img 
          src="wellnessifylogo.png" // Update with your logo's path
          alt="Wellnessify Logo" 
          style={styles.logo} 
        />
        <h1 style={styles.headerTitle}>Wellnessify</h1>
        <p style={styles.headerSubtitle}>Your Health, Our Care</p>
      </div>
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/aboutus" style={styles.navLink}>About Us</Link>
          {isLoggedIn && <Link to="/searchhistory" style={styles.navLink}>History</Link>}
        </div>
        <div style={styles.navRight}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" style={styles.iconLink}>
                <FaUser size={20} />
              </Link>
              <button onClick={handleLogout} style={styles.iconButton}>
                <FaSignOutAlt size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.navLink}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

// Styles for the dark theme
const styles = {
  navBarDark: {
    backgroundColor: '#2C3E50', // Dark background
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Arial', sans-serif",
    color: '#ECF0F1', // Light text color
  },
  navBarLight: {
    backgroundColor: '#ECF0F1', // Light background
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Arial', sans-serif",
    color: '#2C3E50', // Dark text color
  },
  header: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  logo: {
    height: '80px',
    width: 'auto',
    borderRadius: '10px',
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  headerSubtitle: {
    fontSize: '1rem',
    color: '#BDC3C7',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  navLeft: {
    display: 'flex',
    gap: '1rem',
  },
  navRight: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  iconLink: {
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  iconButton: {
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};

// Hover effect for links and button
styles.navLink[':hover'] = styles.iconLink[':hover'] = styles.iconButton[':hover'] = {
  backgroundColor: '#1ABC9C', // Lighter color on hover
  color: '#FFFFFF',
};

export default NavBar;
