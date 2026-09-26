const { mockNews } = require("../data/mockData");
const { getRealNews } = require("./newsProviderService");

async function getNewsForStock(symbol) {
    const normalizedSymbol = symbol.toUpperCase();

    try {
        const realNews = await getRealNews(normalizedSymbol);

        if (realNews && realNews.length > 0) {
            console.log(
                `Using real news for ${normalizedSymbol}: ${realNews.length} articles`
            );

            return realNews;
        }

        console.log(
            `No real news found for ${normalizedSymbol}. Using fallback news.`
        );

    } catch (error) {
        console.error(
            `Real news failed for ${normalizedSymbol}:`,
            error.message
        );

        console.log(
            `Using fallback news for ${normalizedSymbol}.`
        );
    }

    return mockNews[normalizedSymbol] || [];
}

module.exports = {
    getNewsForStock
};