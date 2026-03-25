const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    medium: { type: String, enum: ["Digital", "Analog"], required: true },
    artDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artwork", artworkSchema);
