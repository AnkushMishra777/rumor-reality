const express = require("express");
const { getMarketOverview } = require("../services/marketOverviewService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const overview = await getMarketOverview();

        return res.json({
            success: true,
            ...overview
        });
    } catch (error) {
        console.error("Market overview error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load market overview"
        });
    }
});

module.exports = router;
