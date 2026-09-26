const analysisHistory = [];

function saveAnalysis(result) {
    const historyItem = {
        id: Date.now().toString(),
        symbol: result.stock.symbol,
        changePercent: result.stock.changePercent,
        status: result.verdict.status,
        confidence: result.verdict.confidence,
        createdAt: new Date().toISOString()
    };

    analysisHistory.unshift(historyItem);

    return historyItem;
}

function getAnalysisHistory() {
    return analysisHistory;
}

module.exports = {
    saveAnalysis,
    getAnalysisHistory
};