const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
  },
  rollno: {
    type: String,
    required: true
  },
  placed: {
    type: Boolean,
    default: false
  },
  company: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  package: {
    type: String,
    required: false
  }
});

// ✅ Avoid model overwrite error during hot-reload or reimport
module.exports = mongoose.models.Placements || mongoose.model('Placements', placementSchema);
