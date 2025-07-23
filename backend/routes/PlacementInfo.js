const express = require('express');
const router = express.Router();
const Placements = require('../models/Placements');

// ✅ Route to save placement info
router.post('/', async (req, res) => {
  try {
    const { name, rollno, placed, company, skills, package: pkg } = req.body;

    if (!name || !rollno || !company || !skills || !pkg) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const info = new Placements({
      name,
      rollno,
      placed,
      company,
      skills: typeof skills === 'string' ? skills : skills.join(', '),
      package: pkg
    });

    await info.save();
    res.status(200).json({ message: "Placement info saved successfully" });

  } catch (err) {
    console.error("❌ Error saving placement info:", err);
    res.status(500).json({ message: "Failed to save placement info", error: err.message });
  }
});

// ✅ Route to recommend placements based on skill matching
router.post('/get-placement', async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "Skills must be a non-empty array" });
    }

    const userSkills = skills.map(skill => skill.trim().toLowerCase());
    const allPlacements = await Placements.find();
    const matchedPlacements = [];

    allPlacements.forEach(entry => {
      if (!entry.skills || typeof entry.skills !== 'string') return;

      const entrySkills = entry.skills.split(',').map(skill => skill.trim().toLowerCase());
      const matches = userSkills.filter(skill => entrySkills.includes(skill));
      const matchRatio = matches.length / entrySkills.length;

      if (matchRatio >= 0.5) {
        matchedPlacements.push({
          name: entry.name || "N/A",
          company: entry.company || "N/A",
          skills: entry.skills,
          package: entry.package || "N/A",
          matchPercent: (matchRatio * 100).toFixed(1) + "%"
        });
      }
    });

    res.status(200).json({ matchedPlacements });

  } catch (error) {
    console.error("❌ Error during skill matching:", error);
    res.status(500).json({ message: "Skill extraction or matching failed", error: error.message });
  }
});

module.exports = router;
