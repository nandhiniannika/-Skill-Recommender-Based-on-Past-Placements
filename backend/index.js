const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/Skill_Recommendor";

// Route Imports
const studentAuthRoutes = require('./routes/studentAuth');
const skillExtractRoutes = require('./routes/skillExtract');
const placementRoutes = require('./routes/PlacementInfo'); // NEW

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// API Routes
app.use('/api/student', studentAuthRoutes);     // handles /register, /login
app.use('/api/skills', skillExtractRoutes);     // handles skill extraction from resume
app.use('/api/placement', placementRoutes);     // handles placement question answers

// MongoDB Connection
async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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
