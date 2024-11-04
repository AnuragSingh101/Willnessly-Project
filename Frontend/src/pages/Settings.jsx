import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing user data)
    localStorage.removeItem('loggedInUser'); // Example: clearing user data
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
      </div>

      <div style={styles.settingsContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Option</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Profile Settings</td>
              <td style={styles.td}><a href="/myprofile" style={styles.link}>Edit Profile</a></td>
            </tr>
            <tr>
              <td style={styles.td}>Notifications</td>
              <td style={styles.td}><a href="#notifications" style={styles.link}>Manage Notifications</a></td>
            </tr>
            <tr>
              <td style={styles.td}>Privacy Settings</td>
              <td style={styles.td}><a href="#privacy" style={styles.link}>Update Privacy</a></td>
            </tr>
            <tr>
              <td style={styles.td}>Account Security</td>
              <td style={styles.td}><a href="#security" style={styles.link}>Change Password</a></td>
            </tr>
            <tr>
              <td style={styles.td}>Log Out</td>
              <td style={styles.td}>
                <button style={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f1f1f1',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
  },
  settingsContainer: {
    margin: '20px auto',
    width: '80%',
    maxWidth: '600px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#333',
    color: 'white',
  },
  td: {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  link: {
    color: '#003366',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoutBtn: {
    padding: '10px',
    backgroundColor: '#ff4c4c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
  },
};

export default Settings;
