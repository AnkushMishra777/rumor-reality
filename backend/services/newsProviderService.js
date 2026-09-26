const API_CONFIG = require("../config/apiConfig");
const providerSymbols = require("../data/providerSymbols");

async function getRealNews(symbol) {
    const appSymbol = symbol.toUpperCase();

    if (!API_CONFIG.alphaVantage.apiKey) {
        throw new Error("Alpha Vantage API key is not configured");
    }

    const providerMapping = providerSymbols[appSymbol];

    if (!providerMapping) {
        throw new Error(`No news provider mapping found for ${appSymbol}`);
    }

    const providerSymbol = providerMapping.alphaVantage;

    const url = new URL(API_CONFIG.alphaVantage.baseUrl);

    url.searchParams.append(
        "function",
        "NEWS_SENTIMENT"
    );

    url.searchParams.append(
        "tickers",
        providerSymbol
    );

    url.searchParams.append(
        "limit",
        "10"
    );

    url.searchParams.append(
        "apikey",
        API_CONFIG.alphaVantage.apiKey
    );

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Alpha Vantage news request failed: ${response.status}`
        );
    }

    const data = await response.json();

    if (data["Error Message"]) {
    throw new Error(data["Error Message"]);
}

if (data["Note"]) {
    throw new Error(
        "Alpha Vantage API rate limit reached"
    );
}

if (data["Information"]) {
    throw new Error(
        `Alpha Vantage information: ${data["Information"]}`
    );
}

    if (!data.feed) {
    console.error(
        "Alpha Vantage news response:",
        JSON.stringify(data, null, 2)
    );

    throw new Error(
        "No news data returned by Alpha Vantage"
    );
}

    return data.feed.map((article) => ({
        title: article.title,
        source: article.source,
        type: "NEWS",
        publishedAt: article.time_published,
        url: article.url,
        summary: article.summary || "",
        sentiment: article.overall_sentiment_label || null,
        sentimentScore: article.overall_sentiment_score || null
    }));
}

module.exports = {
    getRealNews
};