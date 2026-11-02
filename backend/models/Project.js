const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ["Living Room", "Bedroom", "Kitchen", "Office", "Bathroom", "Other"]
  },
  description: { type: String, required: true, trim: true },
  budget: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true },
  imageUrl: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
