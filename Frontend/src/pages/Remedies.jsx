import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Remedies = ({ setRemedies }) => {
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSymptoms(e.target.value);
    };

    const handleFetchRemedies = async (e) => {
        e.preventDefault();

        if (!symptoms) {
            setError('Please enter a symptom.');
            return;
        }

        try {
            const userName = localStorage.getItem('name');

            // Save the symptom to the backend
            await axios.post('http://localhost:5000/api/history/symptoms', {
                name: symptoms,
                userName,
            });

            // Fetch remedies based on the symptom
            const response = await axios.get(`http://localhost:5000/api/remedy/remedies?symptom=${symptoms}`);

            // Check if the response contains data
            if (Array.isArray(response.data)) {
                setRemedies(response.data); // Update the remedies state
                navigate('/remedies-list'); // Navigate to the remedies list
            } else {
                setError('Unexpected data format received.');
            }
        } catch (error) {
            console.error('Error fetching remedies:', error);
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
                        <input
                            id="symptoms"
                            name="symptoms"
                            type="text" // Change to type="text"
                            value={symptoms}
                            onChange={handleChange}
                            required
                            style={styles.input} // Update to use input styles
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '64vh',
        backgroundColor: '#E8F8F5',
        padding: '20px',
    },
    container: {
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        margin: 'auto',
    },
    logoImage: {
        width: '150px',
        marginBottom: '20px',
    },
    h2: {
        color: '#003366',
        marginBottom: '15px',
        fontFamily: 'Arial, sans-serif',
    },
    error: {
        color: '#FF6B6B',
        marginBottom: '10px',
        fontSize: '0.9rem',
    },
    form: {
        width: '100%',
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
    input: { // Style for input field
        width: '100%',
        padding: '10px',
        border: '1px solid #A8D8E7',
        borderRadius: '5px',
        fontSize: '1rem',
        fontFamily: 'Arial, sans-serif',
    },
    fetchBtn: {
        backgroundColor: '#003366',
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
        backgroundColor: '#003366',
        color: 'white',
        width: '100%',
        bottom: '0',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9rem',
    },
    link: {
        color: '#FFCC33',
        textDecoration: 'none',
    },
};

export default Remedies;
