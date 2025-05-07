const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
