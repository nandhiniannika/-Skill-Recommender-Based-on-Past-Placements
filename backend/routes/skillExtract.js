const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Placement = require('../models/placements'); // Assuming you have a Mongoose model

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = req.file.path;

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    // Step 1: Extract skills from the PDF
    const { data } = await axios.post('http://localhost:5001/extract-skills-file', formData, {
      headers: formData.getHeaders(),
    });

    const extractedSkills = [...(data.skills.technical_skills || []), ...(data.skills.soft_skills || [])];

    // Step 2: Find matching placements from DB
    const allPlacements = await Placement.find({});
    const matched = allPlacements.filter(entry =>
      entry.skills.some(skill => extractedSkills.includes(skill))
    );

    res.json({
      extractedSkills,
      matchedPlacements: matched
    });

  } catch (err) {
    console.error('Error during skill extraction:', err);
    res.status(500).json({ error: 'Skill extraction or matching failed' });
  } finally {
    fs.unlink(filePath, () => {});
  }
});

module.exports = router;
