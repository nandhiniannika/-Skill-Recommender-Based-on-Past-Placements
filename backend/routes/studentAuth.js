const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretkey'; // Use dotenv in production

// Student Login using roll number
router.post('/login', async (req, res) => {
  const { rollno } = req.body;

  try {
    const student = await Student.findOne({ rollno });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const token = jwt.sign({ studentId: student._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
