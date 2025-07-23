const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
   rollno: { type: String, required: true },
  placed: { type: Boolean, required: true },
  company: { type: String },
  skills: { type: String },
  package: { type: String } // Keep as String if it's like "5 LPA"
});

module.exports = mongoose.models.Placements || mongoose.model("Placements", placementSchema);
