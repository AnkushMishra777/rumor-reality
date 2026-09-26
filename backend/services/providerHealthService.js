function getProviderHealth() {
    const alphaVantageConfigured = Boolean(process.env.ALPHA_VANTAGE_API_KEY);

    return {
        alphaVantage: {
            status: alphaVantageConfigured ? 'ready' : 'fallback',
            configured: alphaVantageConfigured,
            fallbackMode: !alphaVantageConfigured
        },
        newsProvider: {
            status: alphaVantageConfigured ? 'ready' : 'fallback',
            configured: alphaVantageConfigured,
            fallbackMode: !alphaVantageConfigured
        }
    };
}

module.exports = {
    getProviderHealth
};
