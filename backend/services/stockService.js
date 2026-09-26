const stocks = require("../data/stocks");
const { calculateMovement } = require("../utils/movementCalculator");
const { getMarketData } = require("./marketDataService");

function buildHistory(price, previousClose) {
    const points = [];
    const totalPoints = 8;
    const stepValue = (price - previousClose) / totalPoints;
    const startingPoint = previousClose;

    for (let index = 0; index <= totalPoints; index += 1) {
        const pointPrice = startingPoint + (stepValue * index);
        const timeLabel = [
            "09:15",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00"
        ][index] || "13:00";

        points.push({
            time: timeLabel,
            price: Number(pointPrice.toFixed(2))
        });
    }

    points[points.length - 1] = {
        time: "13:00",
        price: Number(price.toFixed(2))
    };

    return points;
}

function searchStocks(query) {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
        return [];
    }

    return stocks.filter((stock) => {
        return (
            stock.symbol.toLowerCase().includes(searchTerm) ||
            stock.name.toLowerCase().includes(searchTerm)
        );
    });
}

async function getStockBySymbol(symbol) {
    const stock = stocks.find(
        (stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (!stock) {
        return null;
    }

    let marketData;

    try {
        marketData = await getMarketData(stock.symbol);
    } catch (error) {
        console.error(
            `Real market data failed for ${stock.symbol}:`,
            error.message
        );

        marketData = {
            price: stock.price,
            previousClose: stock.previousClose,
            change: stock.price - stock.previousClose,
            changePercent:
                ((stock.price - stock.previousClose) /
                    stock.previousClose) *
                100,
            provider: "fallback"
        };
    }

    const movementData = calculateMovement(
        marketData.price,
        marketData.previousClose
    );

    return {
        symbol: stock.symbol,
        name: stock.name,
        price: marketData.price,
        previousClose: marketData.previousClose,
        change: movementData.change,
        changePercent: movementData.changePercent,
        currency: stock.currency,
        market: stock.market,
        movement: movementData.movement,
        history: buildHistory(marketData.price, marketData.previousClose),
        dataSource: marketData.provider || "fallback"
    };
}

module.exports = {
    searchStocks,
    getStockBySymbol,
    buildHistory
};