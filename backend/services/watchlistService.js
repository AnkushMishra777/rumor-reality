const watchlist = new Set();

function getWatchlist() {
    return [...watchlist];
}

function addToWatchlist(symbol) {
    const normalized = String(symbol || '').trim().toUpperCase();

    if (!normalized) {
        return getWatchlist();
    }

    watchlist.add(normalized);
    return getWatchlist();
}

function removeFromWatchlist(symbol) {
    const normalized = String(symbol || '').trim().toUpperCase();

    if (!normalized) {
        return getWatchlist();
    }

    watchlist.delete(normalized);
    return getWatchlist();
}

module.exports = {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
};
