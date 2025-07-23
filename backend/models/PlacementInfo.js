const mongoose = require('mongoose');

const placementInfoSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  placed: { type: Boolean, required: true },
  company: { type: String },
  skills: { type: String },
  package: { type: String } // Keep as String if it's like "5 LPA"
});

// ✅ Use the correct variable name
module.exports = mongoose.model('PlacementInfo', placementInfoSchema);
