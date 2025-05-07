const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const mimeType = req.file.mimetype;

  if (mimeType !== 'application/pdf') {
    fs.unlink(filePath, () => {});
    return res.status(400).json({ error: 'Only PDF files are supported' });
  }

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:5001/extract-skills-file', formData, {
      headers: formData.getHeaders(),
    });

    res.json({ skills: response.data.skills });
  } catch (err) {
    console.error('Error during skill extraction:', err);
    res.status(500).json({ error: 'Skill extraction failed' });
  } finally {
    fs.unlink(filePath, () => {});
  }
});

module.exports = router;
