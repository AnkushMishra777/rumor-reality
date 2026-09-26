const express = require("express");
const { getRealNews } = require("../services/newsProviderService");

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const news = await getRealNews(symbol);

        return res.json({
            success: true,
            count: news.length,
            news
        });

    } catch (error) {
        console.error("News provider error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;