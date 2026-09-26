
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stockRoutes = require("./routes/stockRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const historyRoutes = require("./routes/historyRoutes");
const marketTestRoutes = require("./routes/marketTestRoutes");
const symbolTestRoutes = require("./routes/symbolTestRoutes");
const newsTestRoutes = require("./routes/newsTestRoutes");
const marketOverviewRoutes = require("./routes/marketOverviewRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const providerHealthRoutes = require("./routes/providerHealthRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Rumor vs Reality Checker Backend is running"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "OK",
        service: "Rumor vs Reality Checker Backend"
    });
});

// Stock routes
app.use("/api/stocks", stockRoutes);

// Analysis routes
app.use("/api/analyze", analysisRoutes);

// History routes
app.use("/api/analysis/history", historyRoutes);

//markettest routes
app.use("/api/market-test", marketTestRoutes);
app.use("/api/market-overview", marketOverviewRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/provider-health", providerHealthRoutes);
app.use("/api/sentiment", sentimentRoutes);
//symbolTestRoutes

app.use("/api/symbol-test", symbolTestRoutes);

app.use("/api/news-test", newsTestRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
