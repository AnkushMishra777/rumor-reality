const {
    searchStocks,
    getStockBySymbol
} = require("../services/stockService");

function searchStockController(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const results = searchStocks(q);

        return res.json({
            success: true,
            stocks: results.map((stock) => ({
                symbol: stock.symbol,
                name: stock.name
            }))
        });

    } catch (error) {
        console.error("Stock search error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to search stocks"
        });
    }
}

async function getStockController(req, res) {
    try {
        const { symbol } = req.params;

        const stock = await getStockBySymbol(symbol);

        if (!stock) {
            return res.status(404).json({
                success: false,
                message: "Stock not found"
            });
        }

        return res.json(stock);

    } catch (error) {
        console.error("Get stock error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get stock"
        });
    }
}

module.exports = {
    searchStockController,
    getStockController
};