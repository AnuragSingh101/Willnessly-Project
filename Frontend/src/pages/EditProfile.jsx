// src/components/EditProfile.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    width: 100%;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

const EditProfile = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // Update user state
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', { // Use the correct endpoint
                method: 'PUT', // Update method
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // Send updated user data
            });
    
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Error updating profile');
            }
    
            alert('Profile updated successfully!'); // Success message
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <FormContainer>
            <h1>Edit Profile</h1>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <Button type="submit">Save Changes</Button>
            </form>
        </FormContainer>
    );
};

export default EditProfile;
