import { Search } from "lucide-react";

function StockSearch({
  query,
  setQuery,
  onSearch,
  loading,
}) {

  function handleSubmit(event) {

    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    onSearch();
  }

  return (
    <form
      className="search-section"
      onSubmit={handleSubmit}
    >

      <div className="search-box">

        <Search
          className="search-icon"
          size={21}
        />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search stock or ticker..."
        />

      </div>

      <button
        type="submit"
        className="investigate-button"
        disabled={loading}
      >
        {loading
          ? "Searching..."
          : "Investigate Stock"}

        <span>→</span>
      </button>

    </form>
  );
}

export default StockSearch;