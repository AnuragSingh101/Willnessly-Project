import React, { useEffect, useState } from 'react';

const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([]); // State to store symptoms

    // Fetch symptoms from the backend
    const fetchSymptoms = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/history/symptoms');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSearchHistory(data); // Store the fetched data
        } catch (error) {
            console.error('Error fetching symptoms:', error);
        }
    };

    useEffect(() => {
        fetchSymptoms(); // Call fetchSymptoms on component mount
    }, []);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.h2}>Search History</h2>
                <ul style={styles.list}>
                    {searchHistory.map((item) => (
                        <li key={item._id} style={styles.historyItem}>
                            <strong>Symptom:</strong> {item.name}
                            <br />
                            <strong>Date:</strong> {new Date(item.dateEntered).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
            <footer style={styles.footer}>
                <p style={styles.footerText}>
                    By using this service, you agree to our <a href="#" style={styles.link}>Privacy Policy</a> and <a href="#" style={styles.link}>Terms of Service</a>.
                </p>
            </footer>
        </div>
    );
};

// Inline styles for the component with light theme
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space between header, content, and footer
        height: '100vh', // Full viewport height
        backgroundColor: '#ffffff', // Clean White for the background
        padding: '20px', // Padding for the page
    },
    container: {
        background: '#f1f1f1', // Light Gray for the container background
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        width: '100%', // Full width within its container
        maxWidth: '600px', // Max width of the container
        textAlign: 'center',
        margin: 'auto', // Center container horizontally
        flex: '1', // Allow the container to grow and take available space
    },
    h2: {
        color: '#0077b6', // Calm Blue for headings
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif', // Clean font
    },
    list: {
        listStyleType: 'none', // Remove default list styling
        padding: 0,
        margin: 0,
        textAlign: 'left', // Align text to the left for readability
    },
    historyItem: {
        marginBottom: '20px',
        borderBottom: '1px solid #ccc', // Light border for separation
        paddingBottom: '10px',
        textAlign: 'left', // Align text to the left
    },
    footer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#0077b6', // Calm Blue for footer background
        color: 'white',
        width: '100%',
        bottom: '0', // Stick to the bottom
    },
    footerText: {
        margin: '0', // Remove default margin
        fontSize: '0.9rem', // Slightly smaller font for the footer text
    },
    link: {
        color: '#00b4d8', // Soft Green for links
        textDecoration: 'none',
    },
};

export default SearchHistory;
