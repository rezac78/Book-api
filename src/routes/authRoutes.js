const express = require("express");
const authController = require("../controllers/authController.js");

const router = express.Router();
router.post("/", authController.Login);

module.exports = router;
