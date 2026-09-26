import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StockSearch from "../components/StockSearch";
import SearchResults from "../components/SearchResults";

import {
  searchStocks,
  getMarketOverview,
  getProviderHealth,
  getWatchlist,
  getSentimentComparison,
  addToWatchlist,
  removeFromWatchlist,
} from "../services/api";

function Home() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [overview, setOverview] = useState([]);

  const [overviewLoading, setOverviewLoading] = useState(true);

  const [providerHealth, setProviderHealth] = useState({
    alphaVantage: { status: "fallback", configured: false, fallbackMode: true },
    newsProvider: { status: "fallback", configured: false, fallbackMode: true },
  });

  const [watchlist, setWatchlist] = useState([]);

  const [sentimentData, setSentimentData] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOverview() {
      try {
        const data = await getMarketOverview();
        setOverview(data.topMovers || []);
      } catch (err) {
        setOverview([]);
      } finally {
        setOverviewLoading(false);
      }
    }

    async function loadProviderStatus() {
      try {
        const data = await getProviderHealth();
        setProviderHealth(data.providers || providerHealth);
      } catch (err) {
        setProviderHealth({
          alphaVantage: { status: "fallback", configured: false, fallbackMode: true },
          newsProvider: { status: "fallback", configured: false, fallbackMode: true },
        });
      }
    }

    async function loadWatchlist() {
      try {
        const data = await getWatchlist();
        const symbols = data.symbols || [];
        setWatchlist(symbols);

        if (symbols.length > 0) {
          const comparison = await getSentimentComparison(symbols);
          setSentimentData(comparison.comparison || []);
        } else {
          setSentimentData([]);
        }
      } catch (err) {
        setWatchlist([]);
        setSentimentData([]);
      }
    }

    loadOverview();
    loadProviderStatus();
    loadWatchlist();
  }, []);

  async function handleSearch() {

    setLoading(true);
    setError("");

    try {

      const data =
        await searchStocks(query);

      setResults(data.stocks || []);

    } catch (err) {

      setError(
        "Unable to search stocks."
      );

    } finally {

      setLoading(false);

    }
  }


  function handleSelect(stock) {

    navigate(
      `/investigate/${stock.symbol}`
    );

  }

  async function handleToggleWatchlist(symbol) {
    const trimmed = String(symbol || "").trim().toUpperCase();

    if (!trimmed) {
      return;
    }

    try {
      const isTracked = watchlist.includes(trimmed);
      const data = isTracked
        ? await removeFromWatchlist(trimmed)
        : await addToWatchlist(trimmed);

      const updatedSymbols = data.symbols || [];
      setWatchlist(updatedSymbols);

      if (updatedSymbols.length > 0) {
        const comparison = await getSentimentComparison(updatedSymbols);
        setSentimentData(comparison.comparison || []);
      } else {
        setSentimentData([]);
      }
    } catch (err) {
      setError("Unable to update watchlist.");
    }
  }


  return (
    <div className="app">

      <Navbar />

      <main>

        <HeroSection />

        <StockSearch
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading &&
          query.trim() !== "" &&
          results.length === 0 &&
          !error && (

            <div className="no-results">
              No matching stocks found.
            </div>

          )}

        <SearchResults
          results={results}
          watchlist={watchlist}
          onSelect={handleSelect}
          onToggleWatchlist={handleToggleWatchlist}
        />

        <section className="insights-panel">
          <div className="section-heading">
            <div>
              <h2>Signal Dashboard</h2>
              <p>Live provider status and tracked symbols.</p>
            </div>
          </div>

          <div className="insight-grid">
            <div className="status-card">
              <div className="status-label">Provider Health</div>
              <div className="provider-row">
                <span>Alpha Vantage</span>
                <strong className={providerHealth.alphaVantage?.fallbackMode ? "status-fallback" : "status-live"}>
                  {providerHealth.alphaVantage?.fallbackMode ? "Fallback" : "Live"}
                </strong>
              </div>
              <div className="provider-row">
                <span>News Feed</span>
                <strong className={providerHealth.newsProvider?.fallbackMode ? "status-fallback" : "status-live"}>
                  {providerHealth.newsProvider?.fallbackMode ? "Fallback" : "Live"}
                </strong>
              </div>
            </div>

            <div className="status-card">
              <div className="status-label">Watchlist</div>
              {watchlist.length === 0 ? (
                <div className="watch-empty">No tracked symbols yet.</div>
              ) : (
                <div className="watchlist-stack">
                  {watchlist.map((symbol) => (
                    <button
                      key={symbol}
                      className="watch-item"
                      onClick={() => navigate(`/investigate/${symbol}`)}
                    >
                      <span>{symbol}</span>
                      <small>Open</small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {sentimentData.length > 0 && (
          <section className="insights-panel">
            <div className="section-heading">
              <div>
                <h2>Sentiment Comparison</h2>
                <p>Cross-stock narrative strength across tracked names.</p>
              </div>
            </div>

            <div className="sentiment-grid">
              {sentimentData.map((item) => (
                <div key={item.symbol} className="sentiment-card">
                  <div className="sentiment-topline">
                    <span>{item.symbol}</span>
                    <span className={`sentiment-pill ${item.sentimentLabel}`}>
                      {item.sentimentLabel}
                    </span>
                  </div>
                  <strong>{item.sentimentScore}</strong>
                  <small>{item.summary}</small>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="market-overview">
          <div className="section-heading">
            <div>
              <h2>Market Snapshot</h2>
              <p>Top movers and notable price action.</p>
            </div>
          </div>

          {overviewLoading ? (
            <div className="loading-text">Loading market overview...</div>
          ) : overview.length === 0 ? (
            <div className="empty-state">Market overview is temporarily unavailable.</div>
          ) : (
            <div className="overview-grid">
              {overview.map((item) => (
                <button
                  key={item.symbol}
                  className="overview-card"
                  onClick={() => navigate(`/investigate/${item.symbol}`)}
                >
                  <div className="overview-topline">
                    <span>{item.symbol}</span>
                    <span className={item.changePercent >= 0 ? "positive" : "negative"}>
                      {item.changePercent >= 0 ? "+" : ""}
                      {Number(item.changePercent).toFixed(2)}%
                    </span>
                  </div>
                  <strong>{item.name}</strong>
                  <small>₹{Number(item.price).toFixed(2)}</small>
                </button>
              ))}
            </div>
          )}
        </section>

        <div className="home-footer">

          <span>
            AI-powered market information analysis
          </span>

          <span>
            Built for informed investigation
          </span>

        </div>

      </main>

    </div>
  );
}

export default Home;