const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  skills: { type: [String], required: true },
  package: { type: String, required: true }
});

const Placements = mongoose.model('Placements', placementSchema);

module.exports = Placements;
