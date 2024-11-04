import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>About Wellnessify</h1>
      </header>
      
      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            Wellnessify is dedicated to providing personalized, natural health remedies to help people live healthier lives. We believe in the power of nature and aim to make holistic wellness accessible to everyone.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <p style={styles.sectionText}>
            Our vision is to become a trusted platform for natural healthcare, empowering individuals to take control of their well-being with safe, natural solutions. We strive to bridge the gap between modern healthcare and traditional natural remedies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Team</h2>
          <p style={styles.sectionText}>
            We are a group of healthcare enthusiasts, naturopaths, and tech professionals committed to providing reliable, research-based natural remedies. Our team is passionate about promoting a healthier world through nature.
          </p>
        </section>
      </div>
    </div>
  );
};

// Styles for a light, health-themed color palette
const styles = {
  pageContainer: {
    fontFamily: "'Arial', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#e3f8f4', // Soft Teal background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#f8f9fa', // White Smoke background for header
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontFamily: "'Pacifico', cursive",
    margin: '0',
    fontSize: '2.5rem',
    color: '#8fd3f4', // Sky Blue for header title
  },
  content: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#ffffff', // White background for content sections
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#333333', // Dark Slate for section titles
    fontSize: '1.8rem',
  },
  sectionText: {
    fontSize: '1rem',
    color: '#5a5a5a', // Medium Gray for section text
    lineHeight: '1.6',
  },
};

export default AboutUs;
