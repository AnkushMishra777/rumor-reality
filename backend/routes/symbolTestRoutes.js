const express = require("express");
const API_CONFIG = require("../config/apiConfig");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { keywords } = req.query;

        if (!keywords) {
            return res.status(400).json({
                success: false,
                message: "keywords query parameter is required"
            });
        }

        const url = new URL(API_CONFIG.alphaVantage.baseUrl);

        url.searchParams.append("function", "SYMBOL_SEARCH");
        url.searchParams.append("keywords", keywords);
        url.searchParams.append(
            "apikey",
            API_CONFIG.alphaVantage.apiKey
        );

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Alpha Vantage request failed: ${response.status}`
            );
        }

        const data = await response.json();

        if (data["Error Message"]) {
            throw new Error(data["Error Message"]);
        }

        if (data["Note"]) {
            throw new Error("Alpha Vantage API rate limit reached");
        }

        return res.json({
            success: true,
            results: data.bestMatches || []
        });

    } catch (error) {
        console.error("Symbol search error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;