const Visitor = require("../models/Visitor");

// CREATE visitor
const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create visitor",
      error: error.message,
    });
  }
};

// GET all visitors
const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();

    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitor",
      error: error.message,
    });
  }
};

module.exports = {
  createVisitor,
  getVisitors,
  getVisitorById,
};