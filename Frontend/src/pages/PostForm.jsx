import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Get userId from localStorage
    const getUserId = () => {
        const userId = localStorage.getItem('userId');  // Assuming userId is stored in localStorage
        return userId;
    };

    const userId = getUserId();  // Fetch the userId from localStorage

    // Fetch post for editing
    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/blog/posts/${id}`);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            };

            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content, author: userId }; // Pass userId in the request data
        try {
            if (id) {
                // Update post
                await axios.put(`http://localhost:5000/api/blog/posts/${id}`, postData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                // Create post
                await axios.post('http://localhost:5000/api/blog/posts/', postData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            navigate('/');  // Redirect to home page after submit
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <br />
                <button type="submit">{id ? 'Update' : 'Create'} Post</button>
            </form>
        </div>
    );
};

export default PostForm;
