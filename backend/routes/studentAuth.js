const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ✅ Register Student
router.post('/register', async (req, res) => {
  try {
    const { name, rollno, password, year } = req.body;

    const existing = await Student.findOne({ rollno });
    if (existing) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const student = new Student({ name, rollno, password, year });
    await student.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ Login Student
router.post('/login', async (req, res) => {
  try {
    const { rollno, password } = req.body;

    const student = await Student.findOne({ rollno });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        id: student._id,
        name: student.name,
        rollno: student.rollno,
        year: student.year
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
