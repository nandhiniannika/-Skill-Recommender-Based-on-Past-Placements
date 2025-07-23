const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },             // 👈 Added name field
  rollno: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  year: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
