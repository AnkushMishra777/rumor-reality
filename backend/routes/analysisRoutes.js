const express = require("express");

const {
    analyzeStockController
} = require("../controllers/analysisController");

const router = express.Router();

router.post("/", analyzeStockController);

module.exports = router;