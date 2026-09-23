const express = require("express");
const multer = require("multer");
const path = require("path");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  protect,
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;