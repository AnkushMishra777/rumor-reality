const stocks = require("../data/stocks");
const { getNewsForStock } = require("./newsService");

function normalizeLabel(score) {
    if (score > 0.2) return "positive";
    if (score < -0.2) return "negative";
    return "neutral";
}

function scoreToSummary(score, symbol) {
    if (score > 0.2) {
        return `${symbol} is seeing a more positive narrative with recent supportive coverage.`;
    }
    if (score < -0.2) {
        return `${symbol} is seeing a more negative narrative with cautionary or critical coverage.`;
    }
    return `${symbol} sentiment is mixed or broadly neutral with limited directional signal.`;
}

async function getSentimentComparison(symbols) {
    const requested = Array.isArray(symbols) ? symbols : [];

    const results = await Promise.all(
        requested.map(async (symbol) => {
            const normalized = String(symbol || "").trim().toUpperCase();
            const stock = stocks.find((entry) => entry.symbol.toUpperCase() === normalized);

            if (!stock) {
                return {
                    symbol: normalized,
                    sentimentScore: 0,
                    sentimentLabel: "neutral",
                    summary: `${normalized} was not found in the market watchlist.`
                };
            }

            const articles = (await getNewsForStock(normalized)) || [];
            const sentimentScore = articles.reduce((score, article) => {
                const text = `${article.title || ""} ${article.source || ""}`.toLowerCase();
                const local = text.includes("positive") || text.includes("growth") || text.includes("strong") || text.includes("announce") || text.includes("upgrade")
                    ? 0.15
                    : text.includes("risk") || text.includes("drop") || text.includes("warning") || text.includes("concern") || text.includes("delay")
                        ? -0.15
                        : 0;
                return score + local;
            }, 0) / Math.max(articles.length, 1);

            const label = normalizeLabel(sentimentScore);

            return {
                symbol: normalized,
                name: stock.name,
                sentimentScore: Number(sentimentScore.toFixed(2)),
                sentimentLabel: label,
                summary: scoreToSummary(sentimentScore, normalized)
            };
        })
    );

    return results;
}

module.exports = {
    getSentimentComparison
};
