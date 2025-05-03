const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/Skill_Recommendor";

// Connect to MongoDB
async function connectToMongo() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully!");

        // Drop 'users' collection if it exists
        const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (collections.length > 0) {
            await mongoose.connection.dropCollection('users');
            console.log("🗑️ 'users' collection deleted.");
        }

        // Create placeholder collection to keep DB visible
        const Placeholder = mongoose.model('Placeholder', new mongoose.Schema({ temp: String }));
        await Placeholder.create({ temp: "hold" });

    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
