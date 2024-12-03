// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Ensure this path is correct
const remedy = require('./routes/remedyRoute')
const Symptom = require('./routes/symptomRoute');
const Post = require('./routes/postRoutes')

const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/remedy', remedy);

app.use('/api/history', Symptom);

app.use('/api/blog', Post);

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
