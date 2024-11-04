// src/components/ProfilePage.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard'; // Import the ProfileCard component

const PageContainer = styled.div`
    background: #f8f9fa; /* Light background color */
    min-height: 70vh; /* Full height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px; /* Padding for spacing */
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #1d3557; /* Dark blue from CareConnect theme */
    margin-bottom: 10px; /* Space below the title */
`;

const ErrorMessage = styled.div`
    color: #e63946; /* Error color */
    font-size: 1.2rem;
    margin: 10px; /* Space around the error message */
`;

const LoadingMessage = styled.div`
    font-size: 1.2rem;
    color: #343a40; /* Dark gray */
`;

const ProfilePage = () => {
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState(null); // State to hold error messages

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage
            
            try {
                const response = await fetch('http://localhost:5000/api/auth/profile', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the request
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text(); // Get the error response as text
                    throw new Error(errorData || 'Error fetching profile'); // Throw an error with the response text
                }

                const data = await response.json(); // Parse JSON response
                setUser(data.user); // Set user data
            } catch (err) {
                setError(err.message); // Set error message
            }
        };

        fetchProfile(); // Call the function to fetch the profile
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Render loading state, error messages, or user data
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (!user) return <LoadingMessage>Loading...</LoadingMessage>;

    return (
        <PageContainer>
            <Title>Profile Page</Title>
            <ProfileCard user={user} /> {/* Render the ProfileCard with user data */}
        </PageContainer>
    );
};

export default ProfilePage;
