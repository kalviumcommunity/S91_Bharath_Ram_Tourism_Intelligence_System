const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  travelType: {
    type: String,
    required: true,
  },

  budget: {
    type: Number,
    required: true,
  },

  visitDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);