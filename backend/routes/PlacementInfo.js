const express = require('express');
const router = express.Router();
const Placements = require('../models/Placements'); // adjust path if model is elsewhere

// POST /placements
router.post('/', async (req, res) => {
  try {
    const { rollno, placed, company, skills, package: pkg } = req.body;
    
    const info = new Placements({
      rollno,
      placed,
      company,
      skills,
      package: pkg
    });

    await info.save();
    res.status(200).json({ message: "Placement info saved successfully" });

  } catch (err) {
    console.error("Error saving placement info:", err);
    res.status(500).json({ message: "Failed to save placement info" });
  }
});

module.exports = router;
