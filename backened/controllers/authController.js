// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Optionally return the created user's information
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Return the token and user information
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    const userId = req.user.userId; // Assuming you are using middleware to extract user ID from token

    try {
        // Find the user by ID
        const user = await User.findById(userId).select('-password'); // Exclude the password field

        if (!user) return res.status(404).json({ message: "User not found" });

        // Return the user's information
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving profile", error: err.message });
    }
};


// Update User Profile
exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.userId; // Assuming you are using middleware to extract user ID from token

    try {
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update the user fields
        if (name) user.name = name;
        if (email) user.email = email;

        // If a new password is provided, hash it and update
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user information
        await user.save();

        // Return the updated user information
        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};

// controllers/authController.js
exports.editProfile = async (req, res) => {
    const { name, email } = req.body; // Get new data from the request body
    const userId = req.user.userId; // Get the user ID from the token

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update user fields
        if (name) user.name = name; // Update name if provided
        if (email) user.email = email; // Update email if provided

        await user.save(); // Save changes to the database

        // Return the updated user information
        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};