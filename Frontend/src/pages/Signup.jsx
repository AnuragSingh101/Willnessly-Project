import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // For API calls

const Signup = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user', // Default role
    });

    // State for error messages
    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, role } = formData;

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // API call to register the user
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                role, // Include role
            });

            if (response.status === 201) {
                alert('User registered successfully!');
                navigate('/login'); // Redirect to login page
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Error signing up. Please try again.');
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <img src="image/wellnessify_logo.jpg.png" alt="Wellnessify Logo" style={styles.logoImage} />
                <h2 style={styles.h2}>Join Wellnessify</h2>
                <p>Create your account to access personalized health management tools.</p>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSignup} style={styles.form}>
                    <div style={styles.inputGroup}>
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

                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
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

                    <div style={styles.inputGroup}>
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

                    <div style={styles.inputGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="role" style={styles.label}>Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.signupBtn}>Sign Up</button>
                </form>

                <p style={styles.footer}>
                    Already have an account? <a href="/login" style={styles.link}>Login</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#E8F8F5',
    },
    container: {
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    logoImage: {
        width: '150px',
        marginBottom: '15px',
    },
    h2: {
        color: '#003366',
        marginBottom: '15px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    signupBtn: {
        backgroundColor: '#003366',
        color: '#fff',
        padding: '10px',
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    footer: {
        marginTop: '15px',
    },
    link: {
        color: '#003366',
        textDecoration: 'none',
    },
};

export default Signup;
