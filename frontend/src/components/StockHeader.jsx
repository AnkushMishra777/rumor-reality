import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StockHeader({ stock }) {
  const navigate = useNavigate();

  return (
    <div className="stock-header">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="stock-title">
        <h1>{stock.name}</h1>
        <p>{stock.symbol}</p>
      </div>

      <div className="market-badge">
        {stock.market}
      </div>
    </div>
  );
}

export default StockHeader;