import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // State for form error
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Send a POST request to the backend API
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // Check for successful signup
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Error signing up. Please try again.');
                return;
            }

            // Redirect to login page on successful signup
            alert('User registered successfully!'); // Show success message
            navigate('/login'); // Navigate to the login page

            // Optionally reset form fields
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error('Error during signup:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div className="container" style={styles.container}>
                <div className="logo">
                    <img src="image/wellnessify_logo.jpg.png" alt="Wellnessify Logo" style={styles.logoImage} />
                </div>
                <h2 style={styles.h2}>Join Wellnessify Today!</h2>
                <p>Create your account to manage your health and access personalized remedies.</p>

                {error && <p style={styles.error}>{error}</p>}

                {/* Signup Form */}
                <form id="signupForm" onSubmit={handleSignup}>
                    <div className="input-group" style={styles.inputGroup}>
                        <label htmlFor="name" style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div className="input-group" style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div className="input-group" style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div className="input-group" style={styles.inputGroup}>
                        <label htmlFor="confirm-password" style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    {/* Signup Button */}
                    <button type="submit" className="signup-btn" style={styles.signupBtn}>Create Account</button>
                </form>

                <p style={styles.p}>Already have an account? <a href="/login" style={styles.link}>Login</a></p>
            </div>
        </div>
    );
};

// Styles for the components
const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh', // Set the height to 75vh
        backgroundColor: '#E8F8F5', // Light background for the entire page
        padding: '10px', // Padding for the page
    },
    container: {
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%', // Full width within its container
        maxWidth: '500px', // Max width of the container
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: '150px',
        marginBottom: '15px',
    },
    h2: {
        color: '#003366',
        marginBottom: '15px',
    },
    p: {
        color: '#333',
        marginBottom: '15px',
    },
    inputGroup: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '2px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '2px',
    },
    signupBtn: {
        backgroundColor: '#003366',
        color: 'white',
        padding: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    link: {
        color: '#ffcc33',
        textDecoration: 'none',
    },
};

export default Signup;
