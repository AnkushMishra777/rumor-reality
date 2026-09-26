const express = require("express");

const {
    searchStockController,
    getStockController
} = require("../controllers/stockController");

const router = express.Router();

router.get("/search", searchStockController);

router.get("/:symbol", getStockController);

module.exports = router;