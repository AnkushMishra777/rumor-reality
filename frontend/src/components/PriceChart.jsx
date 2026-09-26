import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriceChart({ data = [] }) {
  return (
    <div className="dashboard-card">

      <div className="section-heading">
        <div>
          <h2>Price Movement</h2>
          <p>Available historical movement</p>
        </div>

        <span className="chart-label">
          PRICE
        </span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#0f172a"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default PriceChart;