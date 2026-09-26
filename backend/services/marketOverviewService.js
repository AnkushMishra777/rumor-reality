const { getStockBySymbol } = require("./stockService");
const stocks = require("../data/stocks");

async function getMarketOverview() {
    const items = [];

    for (const stock of stocks) {
        try {
            const details = await getStockBySymbol(stock.symbol);

            if (!details) {
                continue;
            }

            items.push({
                symbol: details.symbol,
                name: details.name,
                market: details.market,
                price: details.price,
                changePercent: details.changePercent,
                movement: details.movement,
                dataSource: details.dataSource || "fallback"
            });
        } catch (error) {
            console.error(`Overview generation failed for ${stock.symbol}:`, error.message);
        }
    }

    const sorted = [...items].sort(
        (left, right) => Math.abs(right.changePercent) - Math.abs(left.changePercent)
    );

    return {
        market: "NSE",
        updatedAt: new Date().toISOString(),
        topMovers: sorted.slice(0, 5)
    };
}

module.exports = {
    getMarketOverview
};
