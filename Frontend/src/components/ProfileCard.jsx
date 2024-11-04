// src/components/ProfileCard.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CardContainer = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
    position: relative; /* Position for absolute icon placement */
`;

const Avatar = styled.div`
    background: #e0e0e0;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto 15px;
`;

const Name = styled.h2`
    font-size: 1.5rem;
    margin: 10px 0;
`;

const Email = styled.p`
    font-size: 1rem;
    color: #555;
`;

const CreatedAt = styled.p`
    font-size: 0.9rem;
    color: #888;
`;

const EditIcon = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
        color: #007bff; /* Change color on hover */
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

const ProfileCard = ({ user }) => {
    const navigate = useNavigate(); // Hook to navigate to other pages

    const handleEditClick = () => {
        navigate('/edit-profile'); // Navigate to edit profile page
    };

    return (
        <CardContainer>
            <EditIcon onClick={handleEditClick}>
                {/* Edit Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 17.25V21h3.75l13.13-13.13-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.42 1.42 3.75 3.75 1.42-1.42z" />
                </svg>
            </EditIcon>
            <Avatar>{/* You can put an image here if needed */}</Avatar>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
            <CreatedAt>Account Created: {new Date(user.createdAt).toLocaleDateString()}</CreatedAt>
        </CardContainer>
    );
};

export default ProfileCard;
