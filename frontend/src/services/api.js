const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const USE_MOCK_API = false;


// ===============================
// MOCK DATA
// ===============================

const stocks = [
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
  },
  {
    symbol: "INFY",
    name: "Infosys",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
  },
];

const mockStock = {
  symbol: "TATAMOTORS",
  name: "Tata Motors",
  price: 864.25,
  previousClose: 742.10,
  change: 122.15,
  changePercent: 16.46,
  currency: "INR",
  market: "NSE",

  movement: {
    isSignificant: true,
    threshold: 5,
    direction: "UP",
  },

  history: [
    { time: "09:15", price: 742 },
    { time: "09:30", price: 744 },
    { time: "10:00", price: 748 },
    { time: "10:30", price: 760 },
    { time: "11:00", price: 775 },
    { time: "11:30", price: 790 },
    { time: "12:00", price: 815 },
    { time: "12:30", price: 835 },
    { time: "13:00", price: 864 },
  ],
};

const mockAnalysis = {
  stock: mockStock,

  verdict: {
    status: "REAL_EVENT",
    confidence: 87,
    hypeScore: 32,
  },

  claims: [
    {
      claim:
        "Tata Motors announced a new manufacturing investment.",
      status: "VERIFIED",
      confidence: 92,
    },
  ],

  reasons: [
    "Official announcement found",
    "Independent news confirmation",
    "Event preceded price movement",
    "Social media exaggerated the claim",
  ],

  evidence: [
    {
      title:
        "Tata Motors announces new manufacturing investment",
      source: "Example Financial News",
      type: "NEWS",
      publishedAt: "2026-09-26T09:30:00Z",
      url: "https://example.com",
      status: "SUPPORTING",
    },
    {
      title:
        "Company confirms investment plans",
      source: "Company Announcement",
      type: "OFFICIAL",
      publishedAt: "2026-09-26T09:15:00Z",
      url: "https://example.com",
      status: "SUPPORTING",
    },
    {
      title:
        "Viral claim spreads across social media",
      source: "Social Media",
      type: "SOCIAL",
      publishedAt: "2026-09-26T11:00:00Z",
      url: "https://example.com",
      status: "CONTEXT",
    },
  ],

  timeline: [
    {
      time: "09:15",
      title: "Official announcement",
      description:
        "Company information becomes available.",
      type: "NEWS",
    },
    {
      time: "10:00",
      title: "Independent news reports event",
      description:
        "Financial news confirms the announcement.",
      type: "NEWS",
    },
    {
      time: "10:30",
      title: "Stock reaches +5%",
      description:
        "Significant movement threshold crossed.",
      type: "PRICE",
    },
    {
      time: "11:00",
      title: "Viral social claim",
      description:
        "Unverified version of the story begins spreading.",
      type: "SOCIAL",
    },
    {
      time: "11:30",
      title: "Stock reaches +16%",
      description:
        "Movement accelerates.",
      type: "PRICE",
    },
    {
      time: "12:00",
      title: "AI investigation",
      description:
        "Evidence is collected and claims are checked.",
      type: "AI",
    },
  ],
};


// ===============================
// API FUNCTIONS
// ===============================

export async function searchStocks(query) {

  if (USE_MOCK_API) {

    await delay(400);

    const q = query.trim().toUpperCase();

    return {
      stocks: stocks.filter(
        (stock) =>
          stock.symbol.includes(q) ||
          stock.name.toUpperCase().includes(q)
      ),
    };
  }

  const response = await fetch(
    `${API_BASE_URL}/api/stocks/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search stocks");
  }

  return response.json();
}


export async function getStock(symbol) {

  if (USE_MOCK_API) {

    await delay(500);

    return {
      ...mockStock,
      symbol,
      name:
        stocks.find(
          (stock) => stock.symbol === symbol
        )?.name || symbol,
    };
  }

  const response = await fetch(
    `${API_BASE_URL}/api/stocks/${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to get stock");
  }

  return response.json();
}


export async function analyzeStock(symbol) {

  if (USE_MOCK_API) {

    await delay(3000);

    return {
      ...mockAnalysis,
      stock: {
        ...mockAnalysis.stock,
        symbol,
        name:
          stocks.find(
            (stock) => stock.symbol === symbol
          )?.name || symbol,
      },
    };
  }

  const response = await fetch(
    `${API_BASE_URL}/api/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        symbol,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze stock");
  }

  return response.json();
}


export async function getAnalysisHistory() {

  const response = await fetch(
    `${API_BASE_URL}/api/analysis/history`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to get analysis history"
    );
  }

  return response.json();
}

export async function getMarketOverview() {
  const response = await fetch(
    `${API_BASE_URL}/api/market-overview`
  );

  if (!response.ok) {
    throw new Error("Failed to get market overview");
  }

  return response.json();
}

export async function getProviderHealth() {
  const response = await fetch(
    `${API_BASE_URL}/api/provider-health`
  );

  if (!response.ok) {
    throw new Error("Failed to get provider health");
  }

  return response.json();
}

export async function getWatchlist() {
  const response = await fetch(
    `${API_BASE_URL}/api/watchlist`
  );

  if (!response.ok) {
    throw new Error("Failed to get watchlist");
  }

  return response.json();
}

export async function getSentimentComparison(symbols = []) {
  const symbolQuery = Array.isArray(symbols) ? symbols.join(",") : "";
  const response = await fetch(
    `${API_BASE_URL}/api/sentiment/compare?symbols=${encodeURIComponent(symbolQuery)}`
  );

  if (!response.ok) {
    throw new Error("Failed to compare sentiment");
  }

  return response.json();
}

export async function addToWatchlist(symbol) {
  const response = await fetch(
    `${API_BASE_URL}/api/watchlist`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add to watchlist");
  }

  return response.json();
}

export async function removeFromWatchlist(symbol) {
  const response = await fetch(
    `${API_BASE_URL}/api/watchlist/${encodeURIComponent(symbol)}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove from watchlist");
  }

  return response.json();
}

function delay(ms) {
  return new Promise(
    (resolve) => setTimeout(resolve, ms)
  );
}