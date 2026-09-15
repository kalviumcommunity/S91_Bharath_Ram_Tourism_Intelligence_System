const express = require("express");
const router = express.Router();

const {
  createVisitor,
  getVisitors,
  getVisitorById
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createVisitor);

router.get("/", protect, getVisitors);

router.get("/:id", protect, getVisitorById);

module.exports = router;