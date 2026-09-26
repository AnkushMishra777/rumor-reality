const { getStockBySymbol } = require("./stockService");
const { getNewsForStock } = require("./newsService");
const { analyzeEvidence } = require("./evidenceService");
const { saveAnalysis } = require("./historyService");

function buildTimeline(stock, evidence, verdictStatus) {
    const timeline = [
        {
            time: "09:15",
            title: "Opening market context",
            description: `The market opened with ${stock.symbol} trading near ${stock.previousClose}.`,
            type: "NEWS"
        }
    ];

    if (evidence.officialCount > 0) {
        timeline.push({
            time: "09:45",
            title: "Official source identified",
            description: "A company or official update was found and included in the investigation.",
            type: "NEWS"
        });
    }

    if (evidence.newsCount > 0) {
        timeline.push({
            time: "10:30",
            title: "Independent coverage detected",
            description: "Additional reporting was found that supports or contextualizes the movement.",
            type: "NEWS"
        });
    }

    if (evidence.socialCount > 0) {
        timeline.push({
            time: "11:00",
            title: "Social chatter detected",
            description: "User-generated claims and discussion amplified attention around the event.",
            type: "SOCIAL"
        });
    }

    timeline.push({
        time: "12:00",
        title: `Investigation verdict: ${verdictStatus}`,
        description: "Available evidence was compared with the timing and size of the stock move.",
        type: "AI"
    });

    return timeline;
}

async function analyzeStock(symbol) {
    const stock = await getStockBySymbol(symbol);

    if (!stock) {
        throw new Error("Stock not found");
    }

    const news = await getNewsForStock(symbol);
    const evidence = analyzeEvidence(news);
    const evidenceItems = (evidence.normalizedNews || []).map((item) => ({
        ...item,
        status: item.status || "SUPPORTING"
    }));

    let status = "UNVERIFIED_RUMOR";
    let confidence = 45;
    let hypeScore = 60;

    const reasons = [];

    if (evidence.officialCount > 0) {
        status = "REAL_EVENT";
        confidence = 80;
        hypeScore = 30;
        reasons.push("Official source or company evidence found");
    }

    if (evidence.newsCount > 0) {
        confidence += 7;
        hypeScore -= 8;
        reasons.push("Independent news coverage found");
    }

    if (evidence.socialCount > 0) {
        hypeScore += 15;
        reasons.push("Social media discussion detected");
    }

    if (stock.movement.isSignificant) {
        reasons.push(
            `Significant ${stock.movement.direction.toLowerCase()} movement detected`
        );
    } else {
        reasons.push(
            "Price movement is below the significant-movement threshold"
        );
    }

    if (evidence.officialCount === 0 && evidence.newsCount > 0 && evidence.socialCount > 0) {
        status = "PARTIALLY_VERIFIED";
        confidence = 64;
        hypeScore = 52;
    }

    if (evidence.officialCount === 0 && evidence.newsCount === 0 && evidence.socialCount > 0) {
        status = "UNVERIFIED_RUMOR";
        confidence = 41;
        hypeScore = 83;
    }

    if (evidence.officialCount > 0 && evidence.socialCount > 0 && evidence.newsCount > 0) {
        status = "REAL_EVENT";
    }

    confidence = Math.min(95, Math.max(0, confidence));
    hypeScore = Math.min(100, Math.max(0, hypeScore));

    const claims = [];

    if (evidence.officialCount > 0) {
        claims.push({
            claim: "A company-related event or announcement is supported by an official source",
            status: "VERIFIED",
            confidence: 92
        });
    }

    if (evidence.newsCount > 0) {
        claims.push({
            claim: "Independent reporting adds context around the move",
            status: "PARTIALLY_VERIFIED",
            confidence: 74
        });
    }

    if (evidence.socialCount > 0) {
        claims.push({
            claim: "Social media discussion is contributing to attention around the stock",
            status: "PARTIALLY_VERIFIED",
            confidence: 68
        });
    }

    if (claims.length === 0) {
        claims.push({
            claim: "No strong evidence was identified for a confirmed event",
            status: "UNVERIFIED",
            confidence: 38
        });
    }

    const result = {
        stock: {
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            changePercent: stock.changePercent
        },

        movement: stock.movement,

        verdict: {
            status,
            confidence,
            hypeScore
        },

        claims,

        evidence: evidenceItems,

        reasons,

        timeline: buildTimeline(stock, evidence, status)
    };

    saveAnalysis(result);

    return result;
}

module.exports = {
    analyzeStock,
    buildTimeline
};