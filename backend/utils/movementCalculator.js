function calculateMovement(price, previousClose) {
    const change = price - previousClose;

    const changePercent = (change / previousClose) * 100;

    const threshold = 5;

    let direction = "FLAT";

    if (changePercent > 0) {
        direction = "UP";
    } else if (changePercent < 0) {
        direction = "DOWN";
    }

    return {
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        movement: {
            isSignificant: Math.abs(changePercent) >= threshold,
            threshold,
            direction
        }
    };
}

module.exports = {
    calculateMovement
};