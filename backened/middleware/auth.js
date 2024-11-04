// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token); // Log the token for debugging
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Split to get the token part
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err); // Log the error for debugging
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;
