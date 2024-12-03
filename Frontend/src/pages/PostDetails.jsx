import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import edit and delete icons

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
    const { id } = useParams(); // To get the post id from the URL
    const navigate = useNavigate(); // To navigate programmatically

    useEffect(() => {
        // Fetch the post by id from the backend
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blog/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        // Check the user's role from localStorage
        const checkAdminRole = () => {
            const role = localStorage.getItem('role'); // Retrieve role from localStorage
            setIsAdmin(role === 'admin'); // Set isAdmin to true if the role is 'Admin'
        };

        fetchPost();
        checkAdminRole();
    }, [id]);

    // Function to delete the post
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/blog/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/'); // Redirect to the homepage after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Redirect to update form
    const handleUpdate = () => {
        navigate(`/update/${id}`);
    };

    if (!post) return <p>Loading...</p>;

    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Styling for the page
    const styles = {
        postDetailCard: {
            width: '80%',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        postDetailContainer: {
            textAlign: 'center',
        },
        title: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '20px',
        },
        content: {
            fontSize: '1rem',
            color: '#555',
            margin: '10px 0',
        },
        actionButtons: {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
        },
        actionButton: {
            backgroundColor: '#1abc9c',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        actionButtonHover: {
            backgroundColor: '#16a085',
        },
        deleteButton: {
            backgroundColor: '#e74c3c',
        },
        deleteButtonHover: {
            backgroundColor: '#c0392b',
        },
        contentWrapper: {
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.postDetailCard}>
            <div style={styles.postDetailContainer}>
                <h1 style={styles.title}>{post.title}</h1>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Created on:</strong> {formattedDate}</p>
                
                <div style={styles.contentWrapper}>
                    <p style={styles.content}>{post.content}</p>
                </div>

                {/* Conditionally render action buttons only for Admin users */}
                {isAdmin && (
                    <div style={styles.actionButtons}>
                        <button
                            style={{ ...styles.actionButton, ...styles.actionButtonHover }}
                            onClick={handleUpdate}
                        >
                            <FaEdit size={20} /> Edit
                        </button>
                        <button
                            style={{ ...styles.actionButton, ...styles.deleteButton, ...styles.deleteButtonHover }}
                            onClick={handleDelete}
                        >
                            <FaTrashAlt size={20} /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
    
export default PostDetail;
