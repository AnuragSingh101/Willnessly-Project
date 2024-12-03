// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blog/posts';  // Change this to your backend URL

// Get all posts
export const getAllPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts", error);
    }
};

// Create a post
export const createPost = async (post) => {
    try {
        const response = await axios.post(API_URL, post, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post", error);
    }
};

// Get a single post
export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post", error);
    }
};

// Update a post
export const updatePost = async (id, post) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, post, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating post", error);
    }
};

// Delete a post
export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting post", error);
    }
};
