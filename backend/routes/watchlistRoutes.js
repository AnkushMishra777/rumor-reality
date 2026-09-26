const express = require("express");
const {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
} = require("../services/watchlistService");

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        symbols: getWatchlist()
    });
});

router.post("/", (req, res) => {
    const { symbol } = req.body || {};

    if (!symbol) {
        return res.status(400).json({
            success: false,
            message: "Symbol is required"
        });
    }

    return res.json({
        success: true,
        symbols: addToWatchlist(symbol)
    });
});

router.delete("/:symbol", (req, res) => {
    const { symbol } = req.params;

    return res.json({
        success: true,
        symbols: removeFromWatchlist(symbol)
    });
});

module.exports = router;
