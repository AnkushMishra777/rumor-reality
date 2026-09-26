function PriceCard({ stock }) {
  const positive = stock.changePercent >= 0;

  return (
    <div className="price-card">
      <div>
        <p className="card-label">Current Price</p>

        <h2>
          ₹{Number(stock.price).toFixed(2)}
        </h2>
      </div>

      <div
        className={
          positive
            ? "price-change positive"
            : "price-change negative"
        }
      >
        <div>
          <strong>
            {positive ? "+" : "-"}₹
            {Math.abs(stock.change).toFixed(2)}
          </strong>

          <span>
            {positive ? "+" : ""}
            {stock.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;