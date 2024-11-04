import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Remedies = ({ setRemedies }) => {
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setSymptoms(e.target.value);
    };

    // Handle form submission
    const handleFetchRemedies = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        if (!symptoms) {
            setError('Please enter a symptom.');
            return;
        }
    
        try {
            // Retrieve the user's name from local storage
            const userName = localStorage.getItem('name'); // Replace 'userName' with the actual key you used
    
            // First, save the symptom to the backend
            const postResponse = await fetch('http://localhost:5000/api/history/symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: symptoms, userName }), // Include the name and symptom
            });
    
            if (!postResponse.ok) {
                const errorData = await postResponse.json();
                throw new Error(errorData.error || 'Error saving symptom. Please try again.');
            }
    
            // After saving, fetch remedies based on the symptom
            const fetchResponse = await fetch(`http://localhost:5000/api/remedy/remedies?symptom=${symptoms}`);
    
            if (!fetchResponse.ok) {
                throw new Error(`HTTP error! status: ${fetchResponse.status}`);
            }
    
            const data = await fetchResponse.json();
    
            // Check if the data is an array
            if (Array.isArray(data)) {
                setRemedies(data); // Set remedies to state
                navigate('/remedies-list'); // Navigate after setting remedies
            } else {
                console.error('Unexpected data format received:', data);
                setError('Unexpected data format received.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching remedies. Please try again.');
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <div className="logo">
                    <img src="image/wellnessify_logo.jpg.png" alt="Wellnessify Logo" style={styles.logoImage} />
                </div>
                <h2 style={styles.h2}>Get Remedies for Your Symptoms</h2>
                {error && <p style={styles.error}>{error}</p>}
                
                <form onSubmit={handleFetchRemedies} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="symptoms" style={styles.label}>Enter Your Symptoms:</label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            value={symptoms}
                            onChange={handleChange}
                            rows="4"
                            required
                            style={styles.textarea}
                        />
                    </div>
                    <button type="submit" style={styles.fetchBtn}>Get Remedies</button>
                </form>
            </div>
            <footer style={styles.footer}>
                <p style={styles.footerText}>By using this service, you agree to our <a href="#" style={styles.link}>Privacy Policy</a> and <a href="#" style={styles.link}>Terms of Service</a>.</p>
            </footer>
        </div>
    );
};

// Inline styles for the component
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'space-between', // Space between header, content, and footer
        height: '64vh', // Full viewport height
        backgroundColor: '#E8F8F5', // Light background for the entire page
        padding: '20px', // Padding for the page
    },
    container: {
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        width: '100%', // Full width within its container
        maxWidth: '400px', // Max width of the container
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
        flex: '1', // Allow the container to grow and take available space
        margin: 'auto', // Center container horizontally
    },
    logoImage: {
        width: '150px',
        marginBottom: '20px',
    },
    h2: {
        color: '#003366', // Darker blue for headings
        marginBottom: '15px',
        fontFamily: 'Arial, sans-serif', // Clean font
    },
    error: {
        color: '#FF6B6B', // Error message color
        marginBottom: '10px',
        fontSize: '0.9rem',
    },
    form: {
        width: '100%', // Full width
    },
    inputGroup: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #A8D8E7', // Light border
        borderRadius: '5px',
        resize: 'none', // Prevent resizing of the textarea
        fontSize: '1rem',
        fontFamily: 'Arial, sans-serif', // Clean font
    },
    fetchBtn: {
        backgroundColor: '#003366', // Primary button color
        color: 'white',
        padding: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    footer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#003366', // Footer color
        color: 'white',
        width: '100%',
        bottom: '0', // Stick to the bottom
    },
    footerText: {
        margin: '0', // Remove default margin
        fontSize: '0.9rem', // Slightly smaller font for the footer text
    },
    link: {
        color: '#FFCC33', // Accent color for links
        textDecoration: 'none',
    },
};

export default Remedies;
