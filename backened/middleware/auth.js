const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization');

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract the token from "Bearer <token>"
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract the token part after "Bearer"

        // Attach the user data to the request object
        req.user = decoded;
        next(); // Call the next middleware or controller
    } catch (err) {
        console.error("Error verifying token:", err); // Log the error for debugging
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
