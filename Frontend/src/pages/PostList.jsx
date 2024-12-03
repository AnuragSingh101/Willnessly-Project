import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

    useEffect(() => {
        // Fetch posts from the backend
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blog/posts');
                console.log(response.data); // For debugging: Log the full response
                setPosts(response.data.posts); // Set posts to the array from response.data.posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        // Check the user's role from localStorage
        const checkAdminRole = () => {
            const role = localStorage.getItem('role'); // Retrieve role from localStorage
            setIsAdmin(role === 'admin'); // Set isAdmin to true if the role is 'Admin'
        };

        fetchPosts();
        checkAdminRole();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>All Posts</h1>

            {/* Conditionally render Add Post button for Admin users */}
            {isAdmin && (
                <Link to="/create">
                    <button style={styles.button}>Add Post</button>
                </Link>
            )}

            {/* List of posts */}
            <div style={styles.postsContainer}>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <Link to={`/posts/${post._id}`} key={post._id} style={styles.card}>
                            <h3 style={styles.title}>{post.title}</h3>
                            <p style={styles.content}>{post.content.substring(0, 100)}...</p> {/* Show a preview */}
                        </Link>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    button: {
        margin: '10px 0',
        padding: '10px 20px',
        backgroundColor: '#1abc9c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    postsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textDecoration: 'none',
        color: '#333',
    },
    title: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '10px',
    },
    content: {
        fontSize: '1rem',
        color: '#555',
    },
};

export default PostList;
