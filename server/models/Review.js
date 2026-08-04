const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
  },

  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  },

  rating: Number,
  comment: String,
});

module.exports = mongoose.model("Review", reviewSchema);