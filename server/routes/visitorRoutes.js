const express = require("express");
const router = express.Router();

const {
  createVisitor,
  getVisitors,
  getVisitorById,
} = require("../controllers/visitorController");

router.post("/", createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitorById);

module.exports = router;