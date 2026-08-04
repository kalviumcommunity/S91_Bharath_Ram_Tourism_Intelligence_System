const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  category: String,
  description: String,
});

module.exports = mongoose.model("Destination", destinationSchema);