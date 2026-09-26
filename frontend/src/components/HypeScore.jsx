function HypeScore({ score = 0 }) {
  let label = "Low";

  if (score >= 67) {
    label = "High";
  } else if (score >= 34) {
    label = "Medium";
  }

  return (
    <div className="score-card">

      <p className="card-label">
        Hype Signal
      </p>

      <div className="score-number">
        {score}
        <small>/100</small>
      </div>

      <div className="hype-meter">
        <div
          className="hype-fill"
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <div className="hype-label">
        {label}
      </div>

      <p className="score-description">
        UI signal derived from the backend score.
      </p>

    </div>
  );
}

export default HypeScore;