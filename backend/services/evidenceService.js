function normalizeEvidenceStatus(type) {
    if (type === "OFFICIAL") {
        return "SUPPORTING";
    }

    if (type === "SOCIAL") {
        return "CONTEXT";
    }

    return "SUPPORTING";
}

function normalizeEvidenceItems(news = []) {
    return news.map((item) => ({
        ...item,
        type: item.type || "NEWS",
        status: item.status || normalizeEvidenceStatus(item.type)
    }));
}

function analyzeEvidence(news) {
    const normalizedNews = normalizeEvidenceItems(news);

    const officialSources = normalizedNews.filter(
        (item) => item.type === "OFFICIAL"
    );

    const newsSources = normalizedNews.filter(
        (item) => item.type === "NEWS"
    );

    const socialSources = normalizedNews.filter(
        (item) => item.type === "SOCIAL"
    );

    return {
        officialSources,
        newsSources,
        socialSources,
        officialCount: officialSources.length,
        newsCount: newsSources.length,
        socialCount: socialSources.length,
        normalizedNews
    };
}

module.exports = {
    analyzeEvidence,
    normalizeEvidenceStatus,
    normalizeEvidenceItems
};