const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Optional now: a Google-only account never sets this
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows many docs with no email without violating uniqueness
      lowercase: true,
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
