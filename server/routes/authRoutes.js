const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const googleAuth = require("./googleAuth");

router.post("/register", register);
router.post("/login", login);

// Google Authentication
router.post("/google", googleAuth);

module.exports = router;