const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    country: {
      type: String,
      required: true
    },

    travelType: {
      type: String,
      required: true
    },

    budget: {
      type: Number,
      required: true
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);