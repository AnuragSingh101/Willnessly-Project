import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form submission

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check for successful login
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error logging in. Please try again.');
                return;
            }

            const data = await response.json();

            // Store token, user ID, and role in localStorage
            localStorage.setItem('token', data.token); // Store the JWT token
            localStorage.setItem('userId', data.user.id); // Store the user ID
            localStorage.setItem('role', data.user.role); // Store the user role

            // Navigate to the remedies page
            navigate('/remedies');
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <div className="logo">
                    <img src="image/wellnessify_logo.jpg.png" alt="Wellnessify Logo" style={styles.logo} />
                </div>
                <h2 style={styles.headerTitle}>Wellnessify Login</h2>
                <form id="loginForm" onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Email</label>
                        <input
                            type="email"
                            id="username"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                    <button type="submit" style={styles.button}>Login</button>
                    <p style={styles.text}>
                        Don't have an account? <a href="/signup" style={styles.link}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

// Styles for the CareConnect theme
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#E8F8F5', // Background color to match the theme
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        background: '#FFFFFF',
        padding: '50px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '350px',
        textAlign: 'center',
    },
    logo: {
        width: '150px',
        marginBottom: '20px',
    },
    headerTitle: {
        color: '#2980B9',
        marginBottom: '15px',
        fontFamily: "'Pacifico', cursive",
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
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: '#2980B9',
        color: 'white',
        padding: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
    text: {
        color: '#333',
        marginBottom: '20px',
    },
    link: {
        color: '#ffcc33',
        textDecoration: 'none',
    },
};

export default Login;
