const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Placement = require('../models/placements'); // Ensure package is in schema

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    // Step 1: Call Python backend
    const { data } = await axios.post('http://localhost:5001/extract-skills-file', formData, {
      headers: formData.getHeaders(),
    });

    const technicalSkills = (data.skills.technical_skills || []).map(skill => skill.toLowerCase());

    // Step 2: Match placements
    const allPlacements = await Placement.find({});
    const matchedPlacements = allPlacements
      .filter(entry => entry.skills.some(skill => technicalSkills.includes(skill.toLowerCase())))
      .map(entry => ({
        name: entry.name,
        company: entry.company,
        skills: entry.skills,
        package: entry.package
      }));

    res.json({
      extractedSkills: data.skills,
      matchedPlacements
    });

  } catch (err) {
    console.error('❌ Error during skill extraction or matching:', err);
    res.status(500).json({ error: 'Skill extraction or matching failed' });
  } finally {
    fs.unlink(filePath, () => {}); // Clean up
  }
});


module.exports = router;
