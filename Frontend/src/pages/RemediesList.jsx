import React from 'react';

const RemediesList = ({ remedies }) => {
    // Ensure remedies is defined and is an array
    if (!remedies || remedies.length === 0) {
        return (
            <div style={styles.container}>
                <h2 style={styles.h2}>No Remedies Found</h2>
            </div>
        ); // Show a message when no remedies are available
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.h2}>Suggested Remedies</h2>
                <ul style={styles.list}>
                    {remedies.map((remedy, index) => (
                        <li key={index} style={styles.remedyItem}>
                            <h3 style={styles.remedyName}>{remedy.name}</h3>
                            <p><strong>Ingredients:</strong> {remedy.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {remedy.instructions}</p>
                            {remedy.contraindications && (
                                <p><strong>Contraindications:</strong> {remedy.contraindications}</p>
                            )}
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

// Inline styles for the component
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space between header, content, and footer
        height: '100vh', // Full viewport height
        backgroundColor: '#E8F8F5', // Light background for the entire page
        padding: '20px', // Padding for the page
    },
    container: {
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        width: '100%', // Full width within its container
        maxWidth: '600px', // Max width of the container
        textAlign: 'center',
        margin: 'auto', // Center container horizontally
        flex: '1', // Allow the container to grow and take available space
    },
    h2: {
        color: '#003366', // Darker blue for headings
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif', // Clean font
    },
    list: {
        listStyleType: 'none', // Remove default list styling
        padding: 0,
        margin: 0,
        textAlign: 'left', // Align text to the left for readability
    },
    remedyItem: {
        marginBottom: '20px',
        borderBottom: '1px solid #ccc', // Add a separator for clarity
        paddingBottom: '10px',
    },
    remedyName: {
        color: '#003366', // Darker color for remedy names
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

export default RemediesList;
