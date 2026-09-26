const express = require("express");

const {
    getMarketData
} = require("../services/marketDataService");

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const data = await getMarketData(symbol);

        return res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error("Market data error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;