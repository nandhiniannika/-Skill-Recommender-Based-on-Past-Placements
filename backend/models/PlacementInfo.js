const mongoose = require('mongoose');

const placementInfoSchema = new mongoose.Schema({
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

// ✅ Use the correct variable name
module.exports = mongoose.model('PlacementInfo', placementInfoSchema);
