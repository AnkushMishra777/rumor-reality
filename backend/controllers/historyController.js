const {
    getAnalysisHistory
} = require("../services/historyService");

function getHistoryController(req, res) {
    try {
        const analyses = getAnalysisHistory();

        return res.json({
            analyses
        });

    } catch (error) {
        console.error("History error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get analysis history"
        });
    }
}

module.exports = {
    getHistoryController
};