const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/Skill_Recommendor";

// Routes
const studentAuthRoutes = require('./routes/studentAuth');
const skillExtractRoutes = require('./routes/skillExtract');

// Middleware
app.use(express.json());

// API Routes
app.use('/api/student', studentAuthRoutes);
app.use('/api/skills', skillExtractRoutes);

// MongoDB Connection
async function connectToMongo() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully!");

    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

connectToMongo();

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Skill Recommendation Server is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
