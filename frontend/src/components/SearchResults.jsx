import { ArrowRight } from "lucide-react";

function SearchResults({
  results,
  watchlist,
  onSelect,
  onToggleWatchlist,
}) {

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="search-results">

      <div className="results-title">
        Matching stocks
      </div>

      {results.map((stock) => {
        const tracked = watchlist.includes(String(stock.symbol).toUpperCase());

        return (
          <div key={stock.symbol} className="result-item">
            <button
              type="button"
              className="result-main"
              onClick={() => onSelect(stock)}
            >
              <div>
                <div className="stock-name">
                  {stock.name}
                </div>

                <div className="stock-symbol">
                  {stock.symbol}
                </div>
              </div>

              <div className="result-action">
                Analyze
                <ArrowRight size={16} />
              </div>
            </button>

            <button
              type="button"
              className={`watch-toggle ${tracked ? "active" : ""}`}
              onClick={() => onToggleWatchlist(stock.symbol)}
            >
              {tracked ? "Remove" : "Track"}
            </button>
          </div>
        );
      })}

    </div>
  );
}

export default SearchResults;