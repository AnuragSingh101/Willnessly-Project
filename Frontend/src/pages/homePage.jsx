// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem('token');
    
    if (token) {
      // User is logged in; navigate to the remedies page
      navigate('/remedies');
    } else {
      // User is not logged in; navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Wellnessify</h1>
        <p style={styles.subtitle}>Your Pathway to Better Health</p>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Find the Right Remedy</h2>
          <p style={styles.description}>Describe your symptoms, and we’ll suggest suitable remedies.</p>
          <form id="symptom-form" onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              id="symptoms"
              name="symptoms"
              placeholder="e.g., headache, fatigue"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Get Remedies</button>
          </form>
        </div>
      </main>
    </div>
  );
};

// Styles with theme colors
const styles = {
  pageContainer: {
    fontFamily: "'Arial', sans-serif",
    color: "#333333", // Dark Gray for primary text
    backgroundColor: "#ffffff", // Clean White for background
    height: "72vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#0077b6", // Calm Blue for header
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666666", // Medium Gray for subtitle text
  },
  mainContent: {
    width: "100%",
    maxWidth: "600px",
    padding: "1rem",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#f1f1f1", // Light Gray for form background
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#0077b6", // Calm Blue for headings
    marginBottom: "1rem",
  },
  description: {
    color: "#666666", // Medium Gray for description
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #f1f1f1", // Light Gray for input border
    marginBottom: "1rem",
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    color: "#ffffff", // White text on button
    backgroundColor: "#00b4d8", // Soft Green for primary button
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default HomePage;
