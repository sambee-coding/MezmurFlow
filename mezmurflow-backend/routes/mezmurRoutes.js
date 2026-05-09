const express = require("express");
const router = express.Router();
const mezmurController = require("../controllers/mezmurController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/mezmur?day=Monday&month=Tahsas&ethDay=12
router.get("/", authMiddleware, mezmurController.getMezmurSelection);

module.exports = router;
