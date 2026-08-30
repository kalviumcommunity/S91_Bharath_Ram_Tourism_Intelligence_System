const Destination = require("../models/Destination");

// GET all destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch destinations",
      error: error.message,
    });
  }
};

// GET destination by ID
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch destination",
      error: error.message,
    });
  }
};
const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      message: "Destination created successfully",
      destination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create destination",
      error: error.message,
    });
  }
};
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      destination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update destination",
      error: error.message,
    });
  }
};
module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
};