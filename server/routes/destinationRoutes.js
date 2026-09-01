const express = require("express");

const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;