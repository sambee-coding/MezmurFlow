const express = require("express");
const router = express.Router();
const mezmurController = require("../controllers/mezmurController");

// GET /api/mezmur?day=Monday&month=Tahsas&ethDay=12
router.get("/", mezmurController.getMezmurSelection);

module.exports = router;
