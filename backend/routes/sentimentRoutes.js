const express = require("express");
const { getSentimentComparison } = require("../services/sentimentComparisonService");

const router = express.Router();

router.get("/compare", async (req, res) => {
    try {
        const symbols = String(req.query.symbols || "")
            .split(",")
            .map((symbol) => symbol.trim())
            .filter(Boolean);

        const comparison = await getSentimentComparison(symbols);

        return res.json({
            success: true,
            comparison
        });
    } catch (error) {
        console.error("Sentiment comparison error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to compare sentiment"
        });
    }
});

module.exports = router;
