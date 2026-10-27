const express = require("express");
const {
  generateDestinationDescription,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/destination-description",
  generateDestinationDescription
);

module.exports = router;