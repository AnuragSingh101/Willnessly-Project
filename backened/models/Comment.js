const mongoose = require('mongoose');

// Define the Comment Schema
const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Content of the comment
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model for the comment's author
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to the Post model to associate the comment with a post
    createdAt: { type: Date, default: Date.now } // Timestamp when the comment was created
});

// Define and export the Comment model
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
