const Post = require('../models/Post'); // Assuming the Post model is in the models directory
const Comment = require('../models/Comment');

// Create a new blog post
const createPost = async (req, res) => {
    try {
        // Destructure the incoming request body
        const { title, content, author } = req.body;

        // Check if required fields are provided
        if (!title || !content || !author) {
            return res.status(400).json({
                message: 'Title, content, and author are required'
            });
        }

        // Create a new post instance
        const newPost = new Post({
            title,
            content,
            author,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Save the new post to the database
        await newPost.save();

        // Send back the created post as a response
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        });
    } catch (error) {
        console.error('Error creating post:', error);  // Log the error for debugging
        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
};

// Controller to get all posts
const getAllPosts = async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();

        // If no posts are found, return a 404 response
        if (posts.length === 0) {
            return res.status(404).json({
                message: 'No posts found'
            });
        }

        // Send back the list of posts
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: posts
        });
    } catch (error) {
        console.error('Error fetching posts:', error);  // Log the error for debugging
        res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    }
};

// Controller to get a particular post by ID
// Backend controller example
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log(post.createdAt);  // Debugging line
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller to update a post by ID
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body;

        if (!title && !content) {
            return res.status(400).json({
                message: 'Title or content is required to update the post'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title,
                content,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.status(200).json({
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error('Error updating post:', error); // Log the full error for debugging
        res.status(500).json({
            message: 'Error updating post',
            error: error.message // Send the error message in the response
        });
    }
};

// Controller to delete a post by ID
const deletePost = async (req, res) => {
    try {
        // Get the post ID from the request parameters
        const postId = req.params.id;

        // Find and delete the post by its ID
        const deletedPost = await Post.findByIdAndDelete(postId);

        // If no post is found, return a 404 response
        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        // Send back a success message
        res.status(200).json({
            message: 'Post deleted successfully',
            post: deletedPost
        });
    } catch (error) {
        console.error('Error deleting post:', error);  // Log the error for debugging
        res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
};

// Controller to add a comment to a post
// const addComment = async (req, res) => {
//     const { content } = req.body;  // Get the comment content
//     const postId = req.params.id;   // Get the post ID from the URL
//     const userId = req.user.id;     // Assuming the user ID is available from authentication

//     if (!content) {
//         return res.status(400).json({ message: 'Comment content is required' });
//     }

//     try {
//         // Create and save the new comment
//         const newComment = await Comment.create({
//             content,
//             author: userId,
//             postId
//         });

//         // Add the comment ID to the post's comments array
//         await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

//         // Respond with the added comment
//         res.status(201).json({ message: 'Comment added successfully', comment: newComment });
//     } catch (error) {
//         console.error('Error adding comment:', error);
//         res.status(500).json({ message: 'Error adding comment', error: error.message });
//     }
// };


// Export the controller functions
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    // likePost,
    // addComment,
};
