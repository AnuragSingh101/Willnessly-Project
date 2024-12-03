import React from 'react';
import bgImage from 'D:/Project-willnessly/Frontend/src/assets/aboutUs.png'; // Adjust the path to your image file

const AboutUs = () => {
  return (
    <div style={{...styles.pageContainer, backgroundImage: `url(${bgImage})`}}>

      
      <div style={styles.content}>
        {/* About Wellnessify Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About Wellnessify</h2>
          <p style={styles.sectionText}>
            Wellnessify is a platform dedicated to promoting holistic health through personalized natural remedies. We aim to empower individuals to take control of their health and well-being using safe and natural solutions.
          </p>
        </section>

        {/* Our Mission Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            Wellnessify is dedicated to providing personalized, natural health remedies to help people live healthier lives. We believe in the power of nature and aim to make holistic wellness accessible to everyone.
          </p>
        </section>

        {/* Our Vision Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <p style={styles.sectionText}>
            Our vision is to become a trusted platform for natural healthcare, empowering individuals to take control of their well-being with safe, natural solutions. We strive to bridge the gap between modern healthcare and traditional natural remedies.
          </p>
        </section>

        {/* Our Team Section */}
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
    backgroundColor: '#e3f8f4', // Soft Teal background as fallback
    backgroundSize: 'cover', // Ensures the background image covers the full viewport
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
    minHeight: '100vh', // Full height of the screen
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Keeps content at the top
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
    fontSize: '2.8rem',
    color: '#8fd3f4', // Sky Blue for header title
  },
  content: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with opacity to allow background image to show
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f0f0f0', // Adds a subtle separation line between sections
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#333333', // Dark Slate for section titles
    fontSize: '2rem',
    marginBottom: '10px', // Adds space below the title
  },
  sectionText: {
    fontSize: '1.1rem',
    color: '#5a5a5a', // Medium Gray for section text
    lineHeight: '1.8', // More comfortable line-height for better readability
    textAlign: 'justify', // Justifies the text for a clean, professional look
  },
};

export default AboutUs;
