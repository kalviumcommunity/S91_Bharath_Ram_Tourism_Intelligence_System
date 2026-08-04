const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  travelType: String,
  budget: Number,
  visitDate: Date,

  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);