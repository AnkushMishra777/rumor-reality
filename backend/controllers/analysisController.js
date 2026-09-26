const { analyzeStock } = require("../services/analysisService");

async function analyzeStockController(req, res) {
    try {
        const { symbol } = req.body;

        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: "Stock symbol is required"
            });
        }

        const result = await analyzeStock(symbol);

        return res.json(result);

    } catch (error) {
        console.error("Analysis error:", error);

        if (error.message === "Stock not found") {
            return res.status(404).json({
                success: false,
                message: "Stock not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to analyze stock"
        });
    }
}

module.exports = {
    analyzeStockController
};