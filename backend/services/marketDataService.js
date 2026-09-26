const API_CONFIG = require("../config/apiConfig");
const providerSymbols = require("../data/providerSymbols");

async function getMarketData(symbol) {
    const appSymbol = symbol.toUpperCase();

    if (!API_CONFIG.alphaVantage.apiKey) {
        throw new Error("Alpha Vantage API key is not configured");
    }

    const providerMapping = providerSymbols[appSymbol];

    if (!providerMapping) {
        throw new Error(`No market provider mapping found for ${appSymbol}`);
    }

    const providerSymbol = providerMapping.alphaVantage;

    const url = new URL(API_CONFIG.alphaVantage.baseUrl);

    url.searchParams.append("function", "GLOBAL_QUOTE");
    url.searchParams.append("symbol", providerSymbol);
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

    const quote = data["Global Quote"];

    if (!quote || !quote["05. price"]) {
        throw new Error(
            `No market data returned for provider symbol ${providerSymbol}`
        );
    }

    return {
        symbol: appSymbol,
        providerSymbol,
        provider: "alphaVantage",

        price: Number(quote["05. price"]),
        previousClose: Number(quote["08. previous close"]),
        change: Number(quote["09. change"]),
        changePercent: Number(
            quote["10. change percent"].replace("%", "")
        )
    };
}

module.exports = {
    getMarketData
};